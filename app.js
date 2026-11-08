(() => {
<<<<<<< HEAD
  "use strict";

  const { profile, projects, templateMode } = window.PORTFOLIO;
  const $ = (selector) => document.querySelector(selector);
  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const safeUrl = (value) => {
    if (!value) return null;
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  };
  const externalLink = (label, url, className = "") => {
    const href = safeUrl(url);
    if (!href) return null;
    const link = create("a", className, label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };
  const email = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(profile.email) ? profile.email : "";

  document.querySelectorAll("[data-profile]").forEach((element) => {
    const value = profile[element.dataset.profile];
    if (typeof value === "string") element.textContent = value;
  });
  document.title = `${profile.name} — Roblox Developer`;
  $("#code-name").textContent = JSON.stringify(profile.name);
  if (!templateMode) {
    $("#template-bar").hidden = true;
    $("#about-template-note").hidden = true;
    $("meta[name='description']").content = `${profile.name} — Roblox developer. ${profile.intro}`;
  }
  $("#sample-notice").hidden = !projects.some((project) => project.sample);
  for (const [label, url] of [["GitHub ↗", profile.githubUrl], ["Roblox profile ↗", profile.robloxUrl]]) {
    const link = externalLink(label, url);
    if (link) $("#profile-links").append(link);
  }
  if (!$("#profile-links").children.length) $("#profile-links").hidden = true;

  const menu = $(".menu-toggle");
  const navigation = $("#navigation");
  const closeMenu = () => {
    navigation.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
  };
  menu.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu();
      menu.focus();
    }
  });

  // These original diagrams are conceptual covers, not screenshots of shipped games.
  const covers = {
    quest: '<div class="quest-diagram"><div class="diagram-node"><strong>NPC</strong><small>Quest giver</small></div><span class="diagram-connector"></span><div class="diagram-node"><strong>Dialogue</strong><small>Choose a path</small></div><span class="diagram-connector lower"></span><div class="diagram-node"><strong>Reward</strong><small>Complete quest</small></div></div>',
    arena: `<div class="arena-art">${'<span class="arena-tile"></span>'.repeat(9)}</div>`,
    inventory: '<div class="inventory-art"><div class="inventory-top"><span>INVENTORY</span><span>8 SLOTS</span></div><div class="inventory-slots"><span>⚔</span><span>◇</span><span>⌁</span><span>✧</span><span>⬡</span><span></span><span></span><span></span></div></div>',
  };
  const dialog = $("#project-dialog");
  function showProject(project) {
    $("#dialog-category").textContent = `${project.categoryLabel} / ${project.subtitle}`;
    $("#dialog-title").textContent = project.title;
    $("#dialog-summary").textContent = project.summary;
    $("#dialog-body").replaceChildren();
    for (const [heading, value] of [
      ["My contribution", project.role], ["The challenge", project.challenge],
      ["The approach", project.approach], ["Proof of work", project.evidence], ["The result", project.result],
    ]) {
      if (!value) continue;
      const section = create("section");
      section.append(create("h3", "", heading), create("p", "", value));
      $("#dialog-body").append(section);
    }
    $("#dialog-links").replaceChildren();
    for (const [label, url] of [["Watch demo ↗", project.demoUrl], ["View code ↗", project.codeUrl], ["Play on Roblox ↗", project.gameUrl]]) {
      const link = externalLink(label, url);
      if (link) $("#dialog-links").append(link);
    }
    $("#dialog-note").hidden = !project.sample;
    $("#dialog-note").textContent = "Example project — this is a case-study template, not a claim of completed work. Replace the prompts with your own project details and evidence.";
    dialog.showModal();
    dialog.scrollTop = 0;
  }
  $(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });

  function renderProjects(filter = "all") {
    const visible = projects.filter((project) => filter === "all" || project.category === filter);
    const container = $("#projects");
    container.replaceChildren();
    for (const project of visible) {
      const article = create("article", "project-card");
      const button = create("button", "project-button");
      button.type = "button";
      button.setAttribute("aria-label", `View ${project.subtitle}: ${project.title}`);
      button.setAttribute("aria-haspopup", "dialog");
      const coverKey = Object.hasOwn(covers, project.cover) ? project.cover : "quest";
      const cover = create("div", `project-cover cover-${coverKey}`);
      const imageUrl = project.imageUrl && (safeUrl(project.imageUrl) || (/^assets\/[\w./-]+$/.test(project.imageUrl) ? project.imageUrl : null));
      if (imageUrl) {
        const image = create("img", "project-image");
        image.src = imageUrl;
        image.alt = project.imageAlt || project.subtitle;
        image.loading = "lazy";
        cover.append(image);
      } else {
        cover.innerHTML = covers[coverKey];
        cover.setAttribute("aria-hidden", "true");
        cover.append(create("span", "cover-label", project.subtitle.toUpperCase()));
        const caption = create("div", "cover-caption");
        caption.append(create("span", "", "CONCEPT ILLUSTRATION"), create("span", "", "LUAU / ROBLOX"));
        cover.append(caption);
      }
      cover.append(create("span", "cover-arrow", "↗"));
      const meta = create("div", "project-meta");
      meta.append(create("span", "", project.categoryLabel.toUpperCase()));
      if (project.sample) meta.append(create("span", "sample-pill", "EXAMPLE PROJECT"));
      button.append(cover, meta, create("h3", "", project.title), create("p", "project-subtitle", project.subtitle));
      button.addEventListener("click", () => showProject(project));
      const tags = create("div", "project-tags");
      for (const tag of project.tags) tags.append(create("span", "", tag));
      article.append(button, tags);
      container.append(article);
    }
    if (!visible.length) container.append(create("p", "empty-state", "No projects in this category yet. Select All work to see the other projects."));
    $("#project-count").textContent = `${String(visible.length).padStart(2, "0")} PROJECT${visible.length === 1 ? "" : "S"}`;
    $("#all-count").textContent = projects.length;
  }
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((filter) => {
      filter.classList.toggle("active", filter === button);
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    renderProjects(button.dataset.filter);
  }));
  renderProjects();

  const demoButton = $("#play-demo");
  const demoSteps = [
    ["Player spawned", "01 / 03", "The player enters the world."],
    ["Quest accepted", "02 / 03", "A choice starts the next interaction."],
    ["Reward unlocked", "03 / 03", "Loop complete. Ready for another adventure."],
  ];
  function setDemoStep(index) {
    const [label, count, description] = demoSteps[index];
    $("#world-label").textContent = label;
    $(".playground-top > .mono").textContent = count;
    $("#demo-status").textContent = description;
    $(".playground").dataset.step = index;
    document.querySelectorAll(".demo-track span").forEach((step, stepIndex) => step.classList.toggle("current", index === stepIndex));
  }
  demoButton.addEventListener("click", async () => {
    demoButton.disabled = true;
    demoButton.textContent = "Running…";
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 1000;
    for (let step = 0; step < demoSteps.length; step++) {
      setDemoStep(step);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    demoButton.textContent = "↻ Replay";
    demoButton.disabled = false;
  });

  const channels = $("#contact-channels");
  if (email || profile.discord) channels.replaceChildren();
  if (email) {
    const link = create("a", "contact-link", `${email} ↗`);
    link.href = `mailto:${email}`;
    channels.append(link);
  }
  if (profile.discord) {
    const handle = create("span", "contact-link", `Discord: ${profile.discord}`);
    channels.append(handle);
  }
  const briefForm = $("#brief-form");
  briefForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!briefForm.reportValidity()) return;
    const data = new FormData(briefForm);
    const name = data.get("name").trim();
    const details = data.get("details").trim();
    if (!name || details.length < 20) {
      const field = !name ? briefForm.elements.name : briefForm.elements.details;
      field.setCustomValidity(!name ? "Please enter your name or handle." : "Please describe your project in at least 20 characters.");
      field.reportValidity();
      return;
    }
    const brief = ["ROBLOX PROJECT BRIEF", "", `Name: ${name}`, `Project type: ${data.get("type")}`, "", "Project details:", details, "", `Budget: ${data.get("budget").trim() || "To be discussed"}`, `Timeline: ${data.get("timeline").trim() || "Flexible"}`].join("\n");
    $("#brief-output").value = brief;
    $("#brief-result").hidden = false;
    $("#brief-feedback").textContent = "Your brief is ready. Copy or download it to share. Nothing has been sent.";
    if (email) {
      $("#email-brief").hidden = false;
      $("#email-brief").href = `mailto:${email}?subject=${encodeURIComponent(`Roblox project — ${name}`)}&body=${encodeURIComponent(brief)}`;
    }
    $("#brief-output").focus();
  });
  for (const field of [briefForm.elements.name, briefForm.elements.details]) {
    field.addEventListener("input", () => field.setCustomValidity(""));
  }
  briefForm.addEventListener("input", (event) => {
    if (event.target.id === "brief-output") return;
    $("#brief-result").hidden = true;
  });
  $("#copy-brief").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("#brief-output").value);
      $("#brief-feedback").textContent = "Copied. Paste your brief into a message when you're ready.";
    } catch {
      $("#brief-output").focus();
      $("#brief-output").select();
      $("#brief-feedback").textContent = "Automatic copy is unavailable. Your brief is selected; press Ctrl+C or Command+C, or download it.";
    }
  });
  $("#download-brief").addEventListener("click", () => {
    const blob = new Blob([$("#brief-output").value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = create("a");
    link.href = url;
    link.download = "roblox-project-brief.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("#brief-feedback").textContent = "Download requested. Share the text file with your project message.";
=======
  'use strict';

  const config = globalThis.PORTFOLIO_CONTENT;
  // Preserve the static page if the configuration script fails to load.
  if (!config) return;
  const { profile, settings, labels } = config;
  const page = document.body.dataset.page || 'home';
  const scriptPath = document.currentScript?.getAttribute('src') || `${page === 'home' ? './' : '../'}app.js`;
  const siteBase = scriptPath.slice(0, scriptPath.lastIndexOf('/') + 1);
  const projectEntries = globalThis.PORTFOLIO_PROJECTS;
  if (!Array.isArray(projectEntries)) return;
  const projects = projectEntries.filter((project) => project.published !== false);
  const links = config.navigation.filter((item) => item.visible !== false);
  const featured = settings.featuredProjectIds.length ? settings.featuredProjectIds.map((id) => projects.find((project) => project.id === id)).filter(Boolean) : projects.slice(0, config.home.work.limit);
  const allCategory = config.portfolio.allCategory;
  const categories = [allCategory, ...new Set([...config.portfolio.categories, ...projects.map((project) => project.category)])];
  let selectedCategory = allCategory;
  let visibleCount = settings.initialProjectCount;
  let returnFocus = null;
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
  const variables = {
    name: profile.name, discord: profile.discord,
    questionCount: config.faq.groups.reduce((count, group) => count + group.questions.length, 0),
    reviewCount: config.reviews.items.length, projectCount: projects.length,
  };
  const format = (value, extra = {}) => String(value ?? '').replace(/{{(\w+)}}/g, (match, key) => String(({ ...variables, ...extra })[key] ?? match));
  const text = (value, extra) => escapeHTML(format(value, extra));
  const rich = (value) => String(value ?? '').replace(/{{(\w+)}}/g, (match, key) => escapeHTML(variables[key] ?? match));
  const route = (name) => name === 'home' ? '/' : `/${name}/`;
  const resource = (value) => /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value) ? value : `/${String(value).replace(/^\//, '')}`;
  const pageLabel = (id) => links.find((item) => item.page === id)?.label || config.pages[id]?.label || id;
  const arrow = '<span class="arrow" aria-hidden="true">→</span>';
  const discordIcon = '<svg class="discord-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.7 5.1a18 18 0 0 0-4.4-1.4l-.5 1a16 16 0 0 0-5.6 0l-.5-1a18 18 0 0 0-4.4 1.4C1.5 9.2.7 13.2 1.1 17.1a18 18 0 0 0 5.4 2.7l1.1-1.9-1.7-.8.4-.3a13 13 0 0 0 11.4 0l.4.3-1.7.8 1.1 1.9a18 18 0 0 0 5.4-2.7c.5-4.5-.8-8.4-3.2-12ZM8.5 14.6c-1 0-1.7-.9-1.7-2s.7-2 1.7-2 1.8.9 1.7 2c0 1.1-.7 2-1.7 2Zm7 0c-1 0-1.7-.9-1.7-2s.7-2 1.7-2 1.8.9 1.7 2c0 1.1-.7 2-1.7 2Z"/></svg>';

  function siteHTML(markup) {
    return markup.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_, attribute, target) => {
      const hashIndex = target.indexOf('#');
      let pathname = hashIndex < 0 ? target : target.slice(0, hashIndex);
      const hash = hashIndex < 0 ? '' : target.slice(hashIndex);
      if (!pathname || pathname.endsWith('/')) pathname += 'index.html';
      return `${attribute}="${siteBase}${pathname}${hash}"`;
    });
  }
  function contactButton(label = labels.message, classes = 'button', withHandle = true) {
    return `<button class="${classes}" data-contact>${discordIcon}<span>${text(label)}</span>${withHandle ? `<span class="button-handle">${text(profile.discord)}</span>` : ''}<span class="sr-only"> ${text(labels.onDiscord)}</span></button>`;
  }
  function heading(id) {
    const item = config.pages[id];
    return `<header class="page-heading container"><span class="eyebrow">${text(item.kicker)}</span><h1>${rich(item.headingHtml)}</h1><p class="page-subtitle">${rich(item.descriptionHtml)}</p></header>`;
  }
  function sectionHead(title, note = '') {
    return `<div class="section-head"><h2>${text(title)}</h2>${note ? `<span class="mono">${text(note)}</span>` : ''}</div>`;
  }
  function tags(items) {
    return `<ul class="tag-list">${items.map((item) => `<li>${text(item)}</li>`).join('')}</ul>`;
  }
  function pageCTA() {
    return `<div class="page-cta"><div><h2>${text(config.callToAction.title)}</h2><p>${text(config.callToAction.description)}</p></div>${contactButton(labels.startProject)}</div>`;
  }
  function door(href, note, title) {
    return `<a class="section-door" href="${text(href)}"><span class="mono">${text(note)}</span><b>${text(title)}</b>${arrow}</a>`;
  }
  function proofCards(items) {
    return `<div class="proof-grid">${items.map((item) => `<article class="proof-item"><span class="eyebrow">${text(item.label)}</span><h3>${text(item.title)}</h3><p>${text(item.description)}</p>${item.page ? `<a class="text-link" href="${route(item.page)}">${text(item.linkLabel)} ${arrow}</a>` : ''}</article>`).join('')}</div>`;
  }
  function avatar(extraClass = '') {
    return `<img class="avatar ${extraClass}" src="${text(resource(profile.avatar))}" alt="${text(profile.avatarAlt)}" width="136" height="136">`;
  }
  function renderHeader() {
    document.getElementById('site-header').innerHTML = siteHTML(`
      <div class="container nav-inner"><div class="brand-side"><a class="brand" href="/" aria-label="${text(profile.name)} home">${text(profile.name)}<span class="brand-star" aria-hidden="true">✦</span></a></div>
      <nav class="desktop-nav" aria-label="Main navigation">${links.filter((item) => item.inHeader !== false).map((item) => `<a class="nav-link${page === item.page ? ' active' : ''}" ${page === item.page ? 'aria-current="page"' : ''} href="${route(item.page)}">${text(item.label)}</a>`).join('')}
      <button class="hire-link" data-contact>${discordIcon}<span>${text(labels.hire)}</span></button><button class="menu-toggle" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button></nav></div>`);
  }
  function renderFooter() {
    const item = config.footer;
    document.getElementById('site-footer').innerHTML = siteHTML(`
      <div class="container"><div class="studio-footer"><div class="footer-identity"><a class="brand" href="/">${text(profile.name)}<span class="brand-star" aria-hidden="true">✦</span></a><p>${text(item.description)}</p></div><div class="footer-pages"><h2>${text(item.navigationTitle)}</h2><nav aria-label="Footer">${links.map((link)=>`<a href="${route(link.page)}">${text(link.label)}</a>`).join('')}</nav></div><div class="footer-reach"><h2>${text(item.contactTitle)}</h2><button class="footer-contact" data-contact>${text(profile.discord)} <span aria-hidden="true">↗</span></button><p>${text(item.note)}</p></div></div><div class="footer-baseline"><span>${text(profile.name)} / ${new Date().getFullYear()}</span><a href="#site-header">${text(item.backToTop)} ↑</a></div></div>`);
  }
  function projectCard(project, index = 0) {
    return `<article class="project-row${index === 0 ? ' is-featured' : ''}${project.image ? '' : ' text-only'}">${project.image ? `<button class="project-picture" data-project="${text(project.id)}" aria-label="${text(labels.projectPreview)}: ${text(project.title)}"><img src="${text(resource(project.image))}" alt="${text(project.imageAlt)}" width="960" height="540" loading="lazy"><span class="project-open" aria-hidden="true">↗</span></button>` : `<span class="project-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>`}<div class="project-summary"><p class="project-type">${text(project.category)}${project.scope ? ` <span aria-hidden="true">/</span> ${text(project.scope)}` : ''}</p><h3><button class="project-title" data-project="${text(project.id)}">${text(project.title)}</button></h3><p>${text(project.summary)}</p>${project.role ? `<p class="project-role"><span>${text(labels.contribution)}</span> ${text(project.role)}</p>` : ''}<button class="project-read" data-project="${text(project.id)}">${text(labels.breakdown)} <span aria-hidden="true">↗</span></button></div></article>`;
  }
  function reviewCard(review) {
    const rating = Number.isFinite(review.rating) ? `<span class="review-rating" aria-label="${review.rating} out of 5">${review.rating.toFixed(1)} / 5</span> · ` : '';
    return `<article class="quote-card"><p>${text(review.text)}</p><span class="mono">${rating}${review.url ? `<a class="text-link" href="${text(resource(review.url))}" target="_blank" rel="noopener noreferrer">${text(review.author)} ↗</a>` : text(review.author)}${review.role ? ` / ${text(review.role)}` : ''}</span></article>`;
  }
  function emptyProjects(title, description) {
    const item = config.home.work;
    if (!settings.showProjectPlaceholders) return `<div class="project-empty"><p class="empty-title">${text(title)}</p>${description ? `<p>${text(description)}</p>` : ''}</div>`;
    return `<article class="work-template" aria-label="${text(item.slotLabel)}"><div class="template-media" aria-hidden="true"><span class="template-index">01</span><span class="template-corner">16:9</span><span class="template-caption">${text(item.slotLabel)}</span></div><div class="template-copy"><p class="eyebrow">${text(item.slotLabel)}</p><h3>${text(item.slotTitle)}</h3><p>${text(item.slotDescription)}</p><dl><dt>${text(item.slotRoleLabel)}</dt><dd>${text(item.slotRole)}</dd></dl><p class="template-status">${text(title)}</p></div></article>`;
  }
  function home() {
    const item = config.home;
    const enabled = settings.homeSections;
    const board = item.board;
    return `<section class="studio-hero"><div class="container studio-hero-grid"><div class="studio-intro"><p class="hero-kicker"><span aria-hidden="true"></span>${text(item.profileNote)}</p><h1><span class="hero-greeting">${text(item.greeting)}</span><span class="hero-name">${text(profile.name)}<span class="name-period">.</span></span></h1><div class="hero-writing">${item.introduction.map((paragraph)=>`<p>${text(paragraph)}</p>`).join('')}</div><div class="hero-actions">${contactButton(labels.message,'button hero-button',false)}<a class="button ghost" href="/portfolio/">${text(item.workLabel)} <span aria-hidden="true">↗</span></a></div><dl class="hero-facts">${item.facts.map((fact)=>`<div><dt>${text(fact.label)}</dt><dd>${text(fact.value)}</dd></div>`).join('')}</dl></div>
      <aside class="focus-board" aria-labelledby="focus-title"><div class="focus-art"><img src="${text(resource(profile.avatar))}" alt="${text(profile.avatarAlt)}" width="568" height="568"><span>${text(board.imageLabel)}</span></div><div class="focus-content"><header><h2 id="focus-title">${text(board.title)}</h2><p>${text(board.description)}</p></header><ul>${board.items.map((item)=>`<li><h3>${text(item.title)}</h3><p>${text(item.detail)}</p></li>`).join('')}</ul><a class="focus-link" href="/services/"><span>${text(board.linkLabel)}</span><span aria-hidden="true">↗</span></a><p class="focus-footnote">${text(board.footerNote)}</p></div></aside></div></section>
      <nav class="container page-rail" aria-label="Explore the site"><p>${text(item.directory.title)}</p>${item.directory.items.map((link)=>`<a href="${route(link.page)}"><strong>${text(link.label)}<span aria-hidden="true">↗</span></strong><span>${text(link.description)}</span></a>`).join('')}</nav>
      ${enabled.projects ? `<section class="studio-section"><div class="container"><div class="studio-heading"><div><p class="section-label">01 / ${text(pageLabel('portfolio'))}</p><h2>${text(item.work.title)}</h2></div><a class="section-link" href="/portfolio/">${text(item.work.linkLabel)} <span aria-hidden="true">↗</span></a></div><div class="project-list home-work">${featured.length ? featured.map(projectCard).join('') : emptyProjects(item.work.emptyTitle,item.work.emptyDescription)}</div></div></section>` : ''}
      ${enabled.workflow ? `<section class="studio-section workflow-section"><div class="container"><div class="studio-heading"><div><p class="section-label">02 / GDD</p><h2>${text(item.workflow.title)}</h2></div><a class="section-link" href="/services/">${text(item.workflow.linkLabel)} <span aria-hidden="true">↗</span></a></div><ol class="workflow-line">${config.services.process.map((step,index)=>`<li><span class="workflow-number">${String(index+1).padStart(2,'0')}</span><h3>${text(step.title)}</h3><p>${text(step.description)}</p></li>`).join('')}</ol></div></section>` : ''}
      ${enabled.notes && item.notes.items.length ? `<section class="studio-section"><div class="container"><div class="studio-heading"><h2>${text(item.notes.title)}</h2></div><ul class="personal-notes">${item.notes.items.map((note)=>`<li>${text(note)}</li>`).join('')}</ul></div></section>` : ''}
      ${enabled.contact ? `<section class="container studio-contact-wrap"><div class="studio-contact"><div><p class="section-label">${text(item.contact.eyebrow)}</p><h2>${text(item.contact.title)}</h2><p>${text(item.contact.description)}</p></div><div class="contact-actions">${contactButton(item.contact.buttonLabel,'button',false)}<a href="/services/">${text(item.contact.secondaryLabel)} <span aria-hidden="true">↗</span></a></div><span class="contact-star" aria-hidden="true">✦</span></div></section>` : ''}`;
  }
  function portfolio() {
    const item = config.portfolio;
    return `${heading('portfolio')}<div class="container work-archive">${projects.length > 0 && categories.length > 2 ? `<div class="filter-bar" role="group" aria-label="Filter projects">${categories.map((category) => `<button class="filter-button" data-filter="${text(category)}" aria-pressed="${category === selectedCategory}">${text(category)}</button>`).join('')}</div>` : ''}<div class="project-list" id="project-grid"></div><div class="load-more-row"><button class="button ghost" id="load-more">${text(labels.loadMore)}</button><p class="mono" id="project-count" role="status" aria-live="polite"></p></div></div>`;
  }
  function services() {
    const item = config.services;
    return `${heading('services')}<div class="container reading-width"><section class="gdd-process"><h2>${text(item.processTitle)}</h2><ol class="gdd-steps">${item.process.map((step) => `<li><h3>${text(step.title)}</h3><p>${text(step.description)}</p></li>`).join('')}</ol></section>${item.groups.map((group) => `<section class="service-menu"><h2>${text(group.title)}</h2>${group.cards.map((card) => `<article><div><h3>${text(card.title)}</h3><p>${text(card.description)}</p></div><span>${text(card.price)}</span></article>`).join('')}</section>`).join('')}${pageCTA()}</div>`;
  }
  function highlightedCode() {
    return config.proof.code.split('\n').map((line) => line.trimStart().startsWith('--')
      ? `<span class="code-comment">${escapeHTML(line)}</span>`
      : escapeHTML(line).replace(/\b(local|function|return|or|nil|if|then|end)\b/g, '<span class="code-keyword">$1</span>')).join('\n');
  }
  function proof() {
    const item = config.proof;
    return `${heading('proof')}<div class="container"><section class="page-section">${sectionHead(item.codeTitle, item.codeNote)}<article class="code-card"><div class="code-card-head"><div><span class="eyebrow accent">${text(item.codeKicker)}</span><h3>${text(item.moduleTitle)}</h3></div><span class="mono muted">${text(labels.codeExample)}</span></div><p>${text(item.description)}</p><div class="code-toolbar"><span>${text(item.filename)}</span><button id="copy-code">${text(labels.copyCode)}</button></div><pre><code>${highlightedCode()}</code></pre>${item.sourceUrl ? `<a class="text-link" href="${text(resource(item.sourceUrl))}" target="_blank" rel="noopener noreferrer">${text(labels.source)} ↗</a>` : ''}<p class="copy-status" id="code-status" role="status" aria-live="polite"></p></article></section><section class="page-section">${sectionHead(item.evidenceTitle, item.evidenceNote)}${proofCards(item.items)}</section>${pageCTA()}</div>`;
  }
  function about() {
    const item = config.about;
    return `${heading('about')}<div class="container reading-width"><div class="about-writing"><div class="prose">${item.paragraphs.map((paragraph) => `<p>${text(paragraph)}</p>`).join('')}<button class="project-read" data-contact>${text(labels.message)} ↗</button></div><aside class="about-margin">${avatar()}<ul>${item.facts.map((fact) => `<li>${text(fact)}</li>`).join('')}</ul></aside></div></div>`;
  }
  function reviews() {
    const item = config.reviews;
    return `${heading('reviews')}<div class="container"><section class="page-section">${sectionHead(item.sectionTitle, format(labels.reviews, { total: item.items.length }))}${item.items.length ? `<div class="quote-grid">${item.items.map(reviewCard).join('')}</div>` : `<div class="empty-state"><div class="empty-icon" aria-hidden="true">“</div><h3>${text(item.emptyTitle)}</h3><p>${text(item.emptyDescription)}</p><a class="button ghost" href="/portfolio/">${text(item.emptyButton)} ${arrow}</a></div>`}</section>${pageCTA()}</div>`;
  }
  function studios() {
    const item = config.clients;
    const rows = item.items.length ? item.items.map((client, index) => {
      const content = `<span class="mono">${String(index + 1).padStart(2, '0')}</span><div><h3>${text(client.name)}</h3><p>${text(client.description)}</p></div><span class="tag">${text(client.detail)}</span>`;
      return client.url ? `<a class="client-row" href="${text(resource(client.url))}" target="_blank" rel="noopener noreferrer">${content}</a>` : `<div class="client-row">${content}</div>`;
    }).join('') : item.emptyRows.map((row, index) => `<div class="client-row"><span class="mono">${String(index + 1).padStart(2, '0')}</span><div><h3>${text(row.title)}</h3><p>${text(row.description)}</p></div><span class="tag">${text(item.emptyLabel)}</span></div>`).join('');
    return `${heading('studios')}<div class="container"><section class="page-section">${sectionHead(item.sectionTitle, item.items.length ? format(labels.collaborations, { total: item.items.length }) : item.emptyNote)}<div class="client-list">${rows}</div></section>${pageCTA()}</div>`;
  }
  function faq() {
    return `${heading('faq')}<div class="container">${config.faq.groups.map((group) => `<section class="page-section">${sectionHead(group.title, format(labels.questions, { total: group.questions.length }))}<div class="faq-list">${group.questions.map((item) => `<details><summary>${text(item.question)}</summary><p>${text(item.answer)}</p></details>`).join('')}</div></section>`).join('')}${pageCTA()}</div>`;
  }
  function terms() {
    const item = config.terms;
    return `${heading('terms')}<div class="container"><div class="terms-layout"><aside class="table-of-contents"><h2>${text(item.contentsTitle)}</h2>${item.sections.map((section) => `<a href="#${text(section.id)}">${text(section.title)} ${arrow}</a>`).join('')}<a href="#questions">${text(item.questionsLabel)} ${arrow}</a></aside><div>${item.sections.map((section, index) => `<section class="term-section" id="${text(section.id)}"><span class="eyebrow">${String(index + 1).padStart(2, '0')} / ${text(item.sectionLabel)}</span><h2>${text(section.title)}</h2><h3>${text(section.subtitle)}</h3><p>${text(section.description)}</p><div class="term-callout"><strong>${text(section.calloutTitle)}</strong><p>${text(section.calloutDescription)}</p></div></section>`).join('')}<section class="term-section" id="questions"><span class="eyebrow">${text(item.contactKicker)}</span><h2>${text(item.contactTitle)}</h2><p>${text(item.contactDescription)}</p><div class="button-row">${contactButton(item.contactButton)}</div></section></div></div>${pageCTA()}</div>`;
  }
  function renderDialogs() {
    const item = config.contact;
    document.body.insertAdjacentHTML('beforeend', siteHTML(`<dialog id="project-dialog" aria-labelledby="project-dialog-title"><button class="dialog-close" aria-label="Close project" data-close>×</button><div id="project-dialog-content"></div></dialog><dialog class="contact-dialog" id="contact-dialog" aria-labelledby="contact-title"><button class="dialog-close" aria-label="Close contact" data-close>×</button><div class="dialog-body"><span class="eyebrow">${text(item.kicker)}</span><h2 id="contact-title">${rich(item.headingHtml)}</h2><p>${text(item.description)}</p><div class="contact-username"><strong id="discord-username">${text(profile.discord)}</strong><button class="copy-button" id="copy-discord">${text(labels.copyUsername)}</button></div><a class="button" href="${text(resource(profile.discordUrl))}" target="_blank" rel="noopener noreferrer">${discordIcon}${text(labels.openDiscord)} <span aria-hidden="true">↗</span></a><div class="copy-status" id="contact-status" role="status" aria-live="polite"></div></div></dialog><dialog class="mobile-menu" id="mobile-menu" aria-label="Navigation menu"><div class="mobile-menu-header"><a class="brand" href="/">${text(profile.name)}</a><button class="dialog-close" aria-label="Close menu" data-close>×</button></div><nav aria-label="Mobile navigation"><span class="eyebrow">${text(labels.menu)}</span>${[{page:'home', label:labels.home}, ...links].map((link) => `<a href="${route(link.page)}" ${page === link.page ? 'class="active" aria-current="page"' : ''}>${text(link.label)}</a>`).join('')}${contactButton(labels.startProject, 'button', false)}</nav></dialog>`));
  }
  function updateProjects() {
    const grid = document.getElementById('project-grid');
    if (!grid) return;
    const filtered = projects.filter((project) => selectedCategory === allCategory || project.category === selectedCategory);
    grid.innerHTML = siteHTML(filtered.length ? filtered.slice(0, visibleCount).map(projectCard).join('') : emptyProjects(projects.length ? config.portfolio.emptyCategory : config.portfolio.emptyTitle, projects.length ? '' : config.portfolio.emptyDescription));
    document.getElementById('project-count').textContent = projects.length ? format(labels.projectCount, { visible: Math.min(visibleCount, filtered.length), total: filtered.length }) : '';
    document.getElementById('load-more').hidden = visibleCount >= filtered.length;
    document.querySelectorAll('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === selectedCategory)));
  }
  function openDialog(dialog, trigger = document.activeElement) {
    if (!returnFocus) returnFocus = trigger;
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
  }
  function openProject(id, trigger) {
    const project = projects.find((entry) => entry.id === id);
    if (!project) return;
    document.getElementById('project-dialog-content').innerHTML = siteHTML(`${project.image ? `<img class="dialog-image" src="${text(resource(project.image))}" alt="${text(project.imageAlt)}" width="960" height="540">` : ''}<div class="dialog-body"><span class="eyebrow">${text(project.category)}${project.scope ? ` / ${text(project.scope)}` : ''}</span><h2 id="project-dialog-title">${text(project.title)}</h2><p>${text(project.summary)}</p>${project.role ? `<h3>${text(labels.contribution)}</h3><p>${text(project.role)}</p>` : ''}${project.tags?.length ? tags(project.tags) : ''}${project.challenge ? `<h3>${text(labels.technicalQuestion)}</h3><p>${text(project.challenge)}</p>` : ''}${project.approach ? `<h3>${text(labels.approach)}</h3><p>${text(project.approach)}</p>` : ''}<div class="button-row">${project.demoUrl ? `<a class="button ghost" href="${text(resource(project.demoUrl))}" target="_blank" rel="noopener noreferrer">${text(labels.viewDemo)} ↗</a>` : ''}${project.videoUrl ? `<a class="button ghost" href="${text(resource(project.videoUrl))}" target="_blank" rel="noopener noreferrer">${text(labels.watchVideo)} ↗</a>` : ''}</div>${project.source?.label ? `<p class="art-credit">${text(labels.source)}: ${project.source.url ? `<a class="text-link" href="${text(resource(project.source.url))}" target="_blank" rel="noopener noreferrer">${text(project.source.label)} ↗</a>` : text(project.source.label)}</p>` : ''}</div>`);
    openDialog(document.getElementById('project-dialog'), trigger);
  }
  async function copyText(value, status) {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      status.textContent = labels.copied;
    } catch {
      // Keep copying available in local previews and browsers without clipboard permission.
      const input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.cssText = 'position:fixed;left:-9999px;top:0';
      const activeElement = document.activeElement;
      const owner = activeElement?.closest('dialog') || document.body;
      owner.append(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      activeElement?.focus();
      status.textContent = copied ? labels.copied : labels.copyManually;
    }
  }

  document.title = format(config.pages[page].title);
  renderHeader();
  renderFooter();
  const pages = { home, portfolio, services, proof, about, reviews, studios, faq, terms };
  document.getElementById('main').innerHTML = siteHTML((pages[page] || home)());
  renderDialogs();
  updateProjects();

  document.addEventListener('click', (event) => {
    const target = event.target.closest('button, a');
    if (!target) return;
    if (target.hasAttribute('data-contact')) {
      target.closest('dialog')?.close();
      document.getElementById('contact-status').textContent = '';
      openDialog(document.getElementById('contact-dialog'), target);
    } else if (target.dataset.project) {
      openProject(target.dataset.project, target);
    } else if (target.hasAttribute('data-close')) {
      target.closest('dialog').close();
    } else if (target.classList.contains('menu-toggle')) {
      target.setAttribute('aria-expanded', 'true');
      openDialog(document.getElementById('mobile-menu'), target);
    } else if (target.hasAttribute('data-filter')) {
      selectedCategory = target.dataset.filter;
      visibleCount = settings.initialProjectCount;
      updateProjects();
    } else if (target.id === 'load-more') {
      const previousCount = visibleCount;
      visibleCount += settings.loadMoreStep;
      updateProjects();
      document.getElementById('project-grid').children?.[previousCount]?.querySelector('.project-title')?.focus();
    } else if (target.id === 'copy-discord') {
      void copyText(profile.discord, document.getElementById('contact-status'));
    } else if (target.id === 'copy-code') {
      void copyText(config.proof.code, document.getElementById('code-status'));
    }
  });
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) {
        document.documentElement.classList.remove('dialog-open');
        if (returnFocus?.isConnected) returnFocus.focus();
        returnFocus = null;
      }
      document.querySelector('.menu-toggle').setAttribute('aria-expanded', String(document.getElementById('mobile-menu').open));
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
>>>>>>> 3fdc246 (update)
  });
})();
