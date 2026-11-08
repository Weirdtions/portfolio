const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Generate static content from the same configuration used by the browser.
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const contentSource = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const projectSource = fs.readFileSync(path.join(root, 'projects.js'), 'utf8');
const themeSource = fs.readFileSync(path.join(root, 'theme.css'), 'utf8');
const pages = ['home', 'portfolio', 'proof', 'services', 'about', 'studios', 'reviews', 'terms', 'faq'];
const configuration = vm.createContext({});
vm.runInContext(contentSource, configuration, { filename: 'content.js', timeout: 1000 });
vm.runInContext(projectSource, configuration, { filename: 'projects.js', timeout: 1000 });
const config = configuration.PORTFOLIO_CONTENT;
const entries = configuration.PORTFOLIO_PROJECTS;
if (!Array.isArray(entries)) throw new Error('projects.js: PORTFOLIO_PROJECTS must be an array.');
const projects = entries.filter((project) => project.published !== false);
const fail = (message) => { throw new Error(`content.js: ${message}`); };
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const variables = {
  name: config.profile.name,
  discord: config.profile.discord,
  questionCount: config.faq.groups.reduce((count, group) => count + group.questions.length, 0),
  reviewCount: config.reviews.items.length,
  projectCount: projects.length,
};
const format = (value) => String(value ?? '').replace(/{{(\w+)}}/g, (match, key) => String(variables[key] ?? match));
function unique(items, label) {
  if (items.some((item) => !item || !/^[a-z][a-z0-9-]*$/.test(item))) fail(`${label} must use lowercase IDs without spaces.`);
  if (new Set(items).size !== items.length) fail(`${label} must be unique.`);
}
function checkFile(value, label) {
  if (/^https?:\/\//.test(value)) return;
  const filename = path.resolve(root, String(value).replace(/^\//, ''));
  if (!filename.startsWith(root + path.sep) || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) fail(`${label} does not point to a file: ${value}`);
}
if (!config.profile.name.trim() || !config.profile.discord.trim()) fail('profile.name and profile.discord cannot be empty.');
for (const key of ['initialProjectCount', 'loadMoreStep']) {
  if (!Number.isInteger(config.settings[key]) || config.settings[key] < 1) fail(`settings.${key} must be a positive integer.`);
}
unique(entries.map((project) => project.id), 'Project IDs');
unique(config.terms.sections.map((section) => section.id), 'Term section IDs');
if (config.terms.sections.some((section) => section.id === 'questions')) fail('The term ID "questions" is reserved for the contact section.');
const projectIds = new Set(projects.map((project) => project.id));
for (const id of config.settings.featuredProjectIds) {
  if (!projectIds.has(id)) fail(`Unknown project ID "${id}" in featuredProjectIds.`);
}
checkFile(config.profile.avatar, 'profile.avatar');
checkFile(config.profile.favicon, 'profile.favicon');
for (const project of projects) {
  if (!project.title?.trim() || !project.summary?.trim()) fail(`Project "${project.id}" needs a title and summary.`);
  if (project.image) checkFile(project.image, `Project "${project.id}" image`);
}
for (const item of config.navigation) {
  if (!pages.includes(item.page)) fail(`Unknown page route: ${item.page}`);
}
for (const review of config.reviews.items) {
  if (review.rating != null && (!Number.isFinite(review.rating) || review.rating < 0 || review.rating > 5)) fail('Review ratings must be numbers between 0 and 5.');
}

const output = [];
for (const page of pages) {
  if (!config.pages[page]?.title || !config.pages[page]?.description) fail(`Missing title or description in pages.${page}.`);
  const filename = path.join(root, page === 'home' ? 'index.html' : `${page}/index.html`);
  let html = fs.readFileSync(filename, 'utf8');
  const scriptPath = html.match(/<script[^>]+src="([^"]*\bapp\.js)"/)?.[1];
  if (!scriptPath) throw new Error(`Missing application script: ${filename}`);
  const ids = ['site-header', 'site-footer', 'main'];
  if (page === 'portfolio') ids.push('project-grid', 'project-count', 'load-more');
  const nodes = Object.fromEntries(ids.map((id) => [id, {
    innerHTML: '', textContent: '', hidden: false,
  }]));
  const document = {
    body: { dataset: { page }, insertAdjacentHTML() {} },
    currentScript: { getAttribute: () => scriptPath },
    getElementById: (id) => nodes[id] || null,
    querySelectorAll: () => [],
    addEventListener() {},
  };
  const context = vm.createContext({ document, Date });
  vm.runInContext(contentSource, context, { filename: 'content.js', timeout: 1000 });
  vm.runInContext(projectSource, context, { filename: 'projects.js', timeout: 1000 });
  vm.runInContext(source, context, { filename: 'app.js', timeout: 1000 });

  if (page === 'portfolio') {
    nodes.main.innerHTML = nodes.main.innerHTML
      .replace('<div class="project-list" id="project-grid"></div>',
        `<div class="project-list" id="project-grid">${nodes['project-grid'].innerHTML}</div>`)
      .replace(/(<p\b[^>]*\bid="project-count"[^>]*>)[\s\S]*?<\/p>/,
        `$1${escapeHTML(nodes['project-count'].textContent)}</p>`);
    if (nodes['load-more'].hidden) {
      nodes.main.innerHTML = nodes.main.innerHTML.replace('id="load-more"', 'id="load-more" hidden');
    }
  }
  for (const [id, tag] of [['site-header', 'header'], ['main', 'main'], ['site-footer', 'footer']]) {
    const pattern = new RegExp(`(<${tag}\\b[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</${tag}>)`);
    if (!pattern.test(html)) throw new Error(`Missing ${id}: ${filename}`);
    html = html.replace(pattern, (_, opening, closing) => `${opening}${nodes[id].innerHTML}${closing}`);
  }
  const prefix = page === 'home' ? './' : '../';
  const favicon = /^https?:\/\//.test(config.profile.favicon) ? config.profile.favicon : prefix + config.profile.favicon.replace(/^\//, '');
  const faviconType = ({ '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon' })[path.extname(config.profile.favicon.split('?')[0]).toLowerCase()];
  const themeColor = themeSource.match(/--bg:\s*(#[a-f\d]{6})\s*;/i)?.[1] || '#0d0f18';
  html = html
    .replace(/<html lang="[^"]*">/, `<html lang="${escapeHTML(config.settings.language)}">`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHTML(format(config.pages[page].title))}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${escapeHTML(format(config.pages[page].description))}">`)
    .replace(/<meta name="theme-color" content="[^"]*">/, `<meta name="theme-color" content="${themeColor}">`)
    .replace(/<link rel="icon"[^>]*>/, () => `<link rel="icon"${faviconType ? ` type="${faviconType}"` : ''} href="${escapeHTML(favicon)}">`)
    .replace(/(<a class="skip-link"[^>]*>)[\s\S]*?(<\/a>)/, (_, opening, closing) => opening + escapeHTML(config.labels.skip) + closing)
    .replace(/<noscript>[\s\S]*?<\/noscript>/, () => `<noscript><p>${escapeHTML(config.labels.noScript)}</p></noscript>`);
  output.push({ filename, html: html.replace(/^[\t ]+$/gm, '') });
}

// Write only after every page has rendered, preserving the previous HTML on failure.
for (const { filename, html } of output) {
  fs.writeFileSync(filename, html);
  console.log(`Rendered ${path.relative(root, filename)}`);
}
console.log(`Updated ${output.length} pages for ${config.profile.name}.`);
