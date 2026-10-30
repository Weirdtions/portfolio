(() => {
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
  });
})();
