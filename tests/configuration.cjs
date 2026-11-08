const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { fileURLToPath } = require('node:url');

const root = path.resolve(__dirname, '..');
const contentSource = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const projectSource = fs.readFileSync(path.join(root, 'projects.js'), 'utf8');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const pages = ['home', 'portfolio', 'proof', 'services', 'about', 'studios', 'reviews', 'terms', 'faq'];

// These tests exercise the template and generated markup, not browser layout.
function fixtureProject(id, overrides = {}) {
  return { id, title: `Project ${id}`, category: 'Backend', scope: 'Server',
    role: 'Fixture contribution.', summary: 'A fixture project for configuration checks.',
    image: '', imageAlt: '', challenge: 'Fixture problem.', approach: 'Fixture approach.',
    tags: ['Luau'], demoUrl: '', videoUrl: '', source: { label: '', url: '' },
    published: true, ...overrides };
}
function render(page, change = () => {}, options = {}) {
  const nodes = Object.fromEntries(['site-header', 'site-footer', 'main', 'project-dialog-content', 'project-dialog'].map((id) => [id, {
    innerHTML: '', textContent: '', hidden: false, showModal() { this.open = true; },
  }]));
  if (page === 'portfolio') {
    for (const id of ['project-grid', 'project-count', 'load-more']) nodes[id] = { innerHTML: '', textContent: '', hidden: false };
  }
  const listeners = {};
  let dialogs = '';
  const document = {
    title: '',
    body: { dataset: { page }, insertAdjacentHTML: (_, html) => { dialogs += html; } },
    documentElement: { classList: { add() {}, remove() {} } },
    currentScript: { getAttribute: () => page === 'home' ? './app.js' : '../app.js' },
    getElementById: (id) => nodes[id] || null,
    querySelectorAll: () => [],
    addEventListener: (name, handler) => { listeners[name] = handler; },
  };
  const context = vm.createContext({ document, Date });
  if (options.content !== false) vm.runInContext(contentSource, context);
  if (options.projects !== false) vm.runInContext(projectSource, context);
  if (options.content === false || options.projects === false) {
    nodes.main.innerHTML = '<h1>Static fallback content</h1>';
    nodes['site-header'].innerHTML = '<nav>Static navigation</nav>';
  } else change(context.PORTFOLIO_CONTENT, context.PORTFOLIO_PROJECTS);
  vm.runInContext(source, context);
  return { nodes, document, dialogs, click(properties) {
    const button = { dataset: {}, id: '', hasAttribute: () => false, classList: { contains: () => false }, ...properties };
    listeners.click({ target: { closest: () => button } });
  } };
}

const rowCount = (html) => (html.match(/class="project-row\b/g) || []).length;

test('all routes retain the brand, headings and static content', () => {
  for (const page of pages) {
    const result = render(page);
    assert.match(result.nodes['site-header'].innerHTML, /Weirdtions/);
    assert.match(result.nodes['site-footer'].innerHTML, /Weirdtions/);
    assert.match(result.document.title, /Weirdtions/);
    assert.match(result.nodes.main.innerHTML, /<h1/);
    assert.doesNotMatch(result.nodes.main.innerHTML, /{{\w+}}/);
    const filename = path.join(root, page === 'home' ? 'index.html' : `${page}/index.html`);
    assert.match(fs.readFileSync(filename, 'utf8'), /<main[^>]*>[\s\S]*?<h1/);
  }
});

test('the restored broad structure has no invented projects, decorative statistics or review slots', () => {
  const result = render('home');
  assert.match(result.nodes.main.innerHTML, /backend/);
  assert.match(result.nodes.main.innerHTML, /GDD/);
  assert.equal(rowCount(result.nodes.main.innerHTML), 0);
  assert.doesNotMatch(result.nodes.main.innerHTML, /class="(?:board|stat|quote-card)|REVIEW SLOT|combat\.webp|One scope/);
  assert.match(result.nodes.main.innerHTML, /class="container studio-hero-grid"/);
  assert.match(result.nodes.main.innerHTML, /class="focus-board"/);
  assert.match(result.nodes.main.innerHTML, /class="container page-rail"/);
  assert.match(result.nodes.main.innerHTML, /class="workflow-line"/);
  assert.doesNotMatch(result.nodes.main.innerHTML, /class="container personal-layout"/);
  assert.doesNotMatch(result.nodes['site-header'].innerHTML, />Reviews<|>Clients<|>Proof<|>Terms</);
  const portfolio = render('portfolio');
  assert.match(portfolio.nodes['project-grid'].innerHTML, /No project notes yet/);
  assert.equal(portfolio.nodes['load-more'].hidden, true);
});

test('the empty project layout is explicit, optional and replaced by real work', () => {
  const empty = render('home');
  assert.match(empty.nodes.main.innerHTML, /class="work-template"/);
  assert.match(empty.nodes.main.innerHTML, /Empty project template/);
  const simple = render('home', (config) => { config.settings.showProjectPlaceholders = false; });
  assert.doesNotMatch(simple.nodes.main.innerHTML, /class="work-template"/);
  const filled = render('home', (config, projects) => { projects.push(fixtureProject('player-data')); });
  assert.doesNotMatch(filled.nodes.main.innerHTML, /class="work-template"/);
  assert.match(filled.nodes.main.innerHTML, /Project player-data/);
});

test('missing content or project scripts preserve the static fallback', () => {
  for (const options of [{ content: false }, { projects: false }]) {
    const result = render('home', () => {}, options);
    assert.equal(result.nodes.main.innerHTML, '<h1>Static fallback content</h1>');
    assert.equal(result.nodes['site-header'].innerHTML, '<nav>Static navigation</nav>');
    assert.equal(result.dialogs, '');
  }
});

test('personal text, services and notes can be edited without changing renderer code', () => {
  const home = render('home', (config) => {
    config.profile.name = 'Nova "Star" <3';
    config.home.notes.items = ['A personal note.'];
  });
  assert.match(home.nodes.main.innerHTML, /Nova &quot;Star&quot; &lt;3/);
  assert.match(home.nodes.main.innerHTML, /A personal note\./);
  const pricing = render('services', (config) => {
    config.services.groups = [{ title: 'Backend work', cards: [{ title: 'Data system', description: 'Fixture scope.', price: 'Custom quote' }] }];
  });
  assert.match(pricing.nodes.main.innerHTML, /Custom quote/);
  const about = render('about', (config) => { config.about.paragraphs = ['A customized biography.']; });
  assert.match(about.nodes.main.innerHTML, /A customized biography\./);
  const proof = render('proof', (config) => { config.proof.code = 'print("<script>")'; });
  assert.match(proof.nodes.main.innerHTML, /&lt;script&gt;/);
});

test('projects from the separate file populate Home and Work while drafts stay hidden', () => {
  const change = (config, projects) => projects.push(fixtureProject('one'), fixtureProject('two'), fixtureProject('draft', { published: false }));
  const home = render('home', change);
  assert.equal(rowCount(home.nodes.main.innerHTML), 2);
  assert.doesNotMatch(home.nodes.main.innerHTML, /Project draft/);
  const portfolio = render('portfolio', change);
  assert.equal(rowCount(portfolio.nodes['project-grid'].innerHTML), 2);
  portfolio.click({ dataset: { project: 'draft' } });
  assert.equal(portfolio.nodes['project-dialog'].open, undefined);
  const manual = render('home', (config, projects) => {
    change(config, projects);
    config.settings.featuredProjectIds = ['two'];
  });
  assert.equal(rowCount(manual.nodes.main.innerHTML), 1);
  assert.match(manual.nodes.main.innerHTML, /Project two/);
  assert.doesNotMatch(manual.nodes.main.innerHTML, /Project one/);
});

test('categories, pagination and reset use the published project list', () => {
  const result = render('portfolio', (config, projects) => {
    config.settings.initialProjectCount = 3;
    config.settings.loadMoreStep = 2;
    projects.push(...Array.from({ length: 7 }, (_, index) => fixtureProject(`entry-${index}`)), fixtureProject('new-category', { category: 'Data' }));
  });
  const count = () => rowCount(result.nodes['project-grid'].innerHTML);
  assert.equal(count(), 3);
  result.click({ id: 'load-more' });
  assert.equal(count(), 5);
  result.click({ hasAttribute: (name) => name === 'data-filter', dataset: { filter: 'Data' } });
  assert.equal(count(), 1);
  assert.equal(result.nodes['load-more'].hidden, true);
  result.click({ hasAttribute: (name) => name === 'data-filter', dataset: { filter: 'All' } });
  assert.equal(count(), 3);
});

test('project notes support contribution, demo links and missing images', () => {
  const result = render('portfolio', (config, projects) => {
    projects.push(fixtureProject('data', { demoUrl: 'https://example.com/game', videoUrl: 'https://example.com/video' }));
  });
  result.click({ dataset: { project: 'data' } });
  const html = result.nodes['project-dialog-content'].innerHTML;
  assert.match(html, /Fixture contribution/);
  assert.match(html, /https:\/\/example.com\/game/);
  assert.match(html, /https:\/\/example.com\/video/);
  assert.doesNotMatch(html, /class="dialog-image"/);
  assert.equal(result.nodes['project-dialog'].open, true);
});

test('generated links resolve as direct files, root HTTP and subdirectory HTTP', () => {
  for (const page of pages) {
    const relative = page === 'home' ? 'index.html' : `${page}/index.html`;
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    assert.match(html, /src="(?:\.\/|\.\.\/)projects\.js"/);
    assert.match(html, /href="(?:\.\/|\.\.\/)theme\.css"/);
    for (const origin of [`file://${root}/`, 'http://localhost:8000/', 'http://localhost:8000/preview/']) {
      const base = new URL(relative, origin);
      for (const [, link] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        const url = new URL(link, base);
        if (url.protocol !== 'file:' && url.hostname !== 'localhost') continue;
        let filename;
        if (url.protocol === 'file:') filename = fileURLToPath(url);
        else {
          let pathname = decodeURIComponent(url.pathname);
          if (origin.endsWith('/preview/')) {
            assert.ok(pathname.startsWith('/preview/'), `${page}: escaped preview root`);
            pathname = pathname.slice('/preview/'.length);
          }
          filename = path.join(root, pathname);
        }
        assert.ok(fs.existsSync(filename), `${page}: missing ${link} at ${origin}`);
        if (url.hash && filename.endsWith('.html')) {
          assert.ok(fs.readFileSync(filename, 'utf8').includes(`id="${url.hash.slice(1)}"`), `${page}: missing anchor ${link}`);
        }
      }
    }
  }
});

test('the generator includes new projects and preserves HTML after invalid edits', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'weirdtions-config-'));
  try {
    for (const entry of ['app.js', 'content.js', 'projects.js', 'theme.css', 'scripts', 'assets', ...pages.map((page) => page === 'home' ? 'index.html' : page)]) {
      fs.cpSync(path.join(root, entry), path.join(temporary, entry), { recursive: true });
    }
    const context = {};
    vm.runInNewContext(contentSource, context);
    context.PORTFOLIO_CONTENT.profile.name = 'Customized Name';
    const save = () => fs.writeFileSync(path.join(temporary, 'content.js'), `globalThis.PORTFOLIO_CONTENT = ${JSON.stringify(context.PORTFOLIO_CONTENT)};`);
    const generate = () => vm.runInNewContext(fs.readFileSync(path.join(temporary, 'scripts/render-pages.cjs'), 'utf8'), {
      require, __dirname: path.join(temporary, 'scripts'), console: { log() {} },
    });
    save();
    fs.writeFileSync(path.join(temporary, 'projects.js'), `globalThis.PORTFOLIO_PROJECTS = ${JSON.stringify([fixtureProject('player-data', { image: 'assets/avatar.jpg' }), fixtureProject('draft', { published: false, image: 'assets/missing.jpg' })])};`);
    generate();
    const snapshots = pages.map((page) => {
      const filename = path.join(temporary, page === 'home' ? 'index.html' : `${page}/index.html`);
      const html = fs.readFileSync(filename, 'utf8');
      assert.match(html, /Customized Name/);
      if (['home', 'portfolio'].includes(page)) assert.match(html, /Project player-data/);
      assert.doesNotMatch(html, /Project draft/);
      return { filename, html };
    });
    context.PORTFOLIO_CONTENT.settings.featuredProjectIds = ['missing-project'];
    save();
    assert.throws(generate, /Unknown project ID/);
    for (const snapshot of snapshots) assert.equal(fs.readFileSync(snapshot.filename, 'utf8'), snapshot.html);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('the dark palette keeps text, links and dialog buttons readable', () => {
  const theme = fs.readFileSync(path.join(root, 'theme.css'), 'utf8');
  const colors = Object.fromEntries([...theme.matchAll(/--([\w-]+):\s*(#[a-f\d]{6})\s*;/gi)].map((match) => [match[1], match[2]]));
  const luminance = (hex) => hex.slice(1).match(/../g).map((pair) => parseInt(pair, 16) / 255)
    .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
    .reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0);
  for (const [foreground, background] of [['ink', 'surface'], ['soft', 'surface'], ['muted', 'surface'], ['accent', 'bg'], ['accent-secondary', 'surface'], ['cream', 'bg'], ['soft', 'board-bg'], ['muted', 'board-bg'], ['surface-deep', 'cream'], ['button-text', 'fill'], ['button-text', 'action-hover']]) {
    const [light, dark] = [luminance(colors[foreground]), luminance(colors[background])].sort((a, b) => b - a);
    const ratio = (light + 0.05) / (dark + 0.05);
    assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
  }
});
