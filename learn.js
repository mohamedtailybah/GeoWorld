/* ============================================================
   LEARN.JS — "The Briefing Room"
   Self-contained political-geography module. Builds its own
   overlay, owns its own event listeners, and never touches
   app.js, data.js, or any #view-* / .tabbtn elements from the
   main app. Safe to include on any page that has a
   #learnLauncher button and the LEARN_* data arrays loaded.
   ============================================================ */

(function () {
  "use strict";

  const SECTIONS = [
    { id: "overview", label: "Overview", accent: "ovw" },
    { id: "foundations", label: "Foundations", accent: "fnd" },
    { id: "boundaries", label: "Boundaries", accent: "bnd" },
    { id: "systems", label: "Systems", accent: "sys" },
    { id: "orgs", label: "Alliances", accent: "org" },
    { id: "theories", label: "Theories", accent: "geo" },
    { id: "electoral", label: "Electoral", accent: "elec" },
    { id: "resources", label: "Resources", accent: "res" },
    { id: "disputes", label: "Disputes", accent: "dis" },
    { id: "empires", label: "Empires", accent: "emp" },
    { id: "dark", label: "Dark Chapters", accent: "drk" },
    { id: "debrief", label: "Debrief", accent: "deb" }
  ];

  /* Small original outline glyphs (24x24, stroke=currentColor) — one per
     tab, drawn in-house rather than borrowed, so nothing here reproduces
     a real organization's trademarked emblem. */
  const TAB_ICONS = {
    ovw: '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>',
    fnd: '<circle cx="12" cy="12" r="8.5"/><path d="M3.7 12h16.6"/><path d="M12 3.5c3 3.3 3 13.7 0 17c-3-3.3-3-13.7 0-17z"/>',
    bnd: '<line x1="5" y1="4" x2="5" y2="20" stroke-dasharray="3 3"/><line x1="12" y1="4" x2="12" y2="20" stroke-dasharray="3 3"/><line x1="19" y1="4" x2="19" y2="20" stroke-dasharray="3 3"/>',
    sys: '<path d="M3 10l9-6l9 6"/><path d="M5 10v9M10 10v9M14 10v9M19 10v9"/><path d="M3 20.5h18"/>',
    org: '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
    geo: '<circle cx="12" cy="12" r="8.5"/><path d="M14.7 9.3l-2 5.4-5.4 2 2-5.4z"/>',
    elec: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 12.3l2 2l4-4.3"/>',
    res: '<path d="M12 3.2c4 5 6.8 8.3 6.8 11.6a6.8 6.8 0 0 1-13.6 0c0-3.3 2.8-6.6 6.8-11.6z"/>',
    dis: '<path d="M12 3.2l9.3 16.8H2.7z"/><line x1="12" y1="9.5" x2="12" y2="14"/><circle cx="12" cy="16.8" r="0.15" fill="currentColor" stroke="currentColor" stroke-width="2"/>',
    emp: '<path d="M4 18.5h16l-1.2-8.2-3.8 3-3-6.3-3 6.3-3.8-3z"/><line x1="4" y1="20.5" x2="20" y2="20.5"/>',
    drk: '<path d="M10.2 10h3.6v9.3h-3.6z"/><path d="M12 3.2c1.7 2.4 2.3 4.1 0 6.6c-2.3-2.5-1.7-4.2 0-6.6z"/>',
    deb: '<rect x="6" y="4" width="12" height="17" rx="2"/><rect x="9" y="2" width="6" height="3" rx="1"/><path d="M9 12.3l2 2l4-4.3"/>'
  };

  /* Original abstract emblems for each alliance/org — deliberately NOT
     reproductions of the real flags or seals (which are protected), just
     a distinct in-house glyph per organization so each is recognizable
     at a glance. */
  const ORG_ICONS = {
    un: '<circle cx="12" cy="12" r="8"/><ellipse cx="12" cy="12" rx="8" ry="3.2"/><line x1="12" y1="4" x2="12" y2="20"/>',
    eu: '<polygon points="12,4 19,8 19,16 12,20 5,16 5,8" fill="none"/><polygon points="12,8.5 15.2,10.3 15.2,13.7 12,15.5 8.8,13.7 8.8,10.3" fill="none"/>',
    nato: '<path d="M12 3.5l7 3v5.2c0 4.6-3 7.7-7 8.8c-4-1.1-7-4.2-7-8.8V6.5z"/>',
    au: '<circle cx="12" cy="12" r="3.6"/><line x1="12" y1="2.5" x2="12" y2="5.6"/><line x1="12" y1="18.4" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5.6" y2="12"/><line x1="18.4" y1="12" x2="21.5" y2="12"/><line x1="5.6" y1="5.6" x2="7.7" y2="7.7"/><line x1="16.3" y1="16.3" x2="18.4" y2="18.4"/><line x1="18.4" y1="5.6" x2="16.3" y2="7.7"/><line x1="7.7" y1="16.3" x2="5.6" y2="18.4"/>',
    asean: '<line x1="6" y1="6" x2="6" y2="18"/><line x1="10" y1="4" x2="10" y2="18"/><line x1="14" y1="4" x2="14" y2="18"/><line x1="18" y1="6" x2="18" y2="18"/><rect x="4.5" y="10.5" width="15" height="3" rx="1"/>',
    oas: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="9.2" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="14.8" cy="14" r="1" fill="currentColor" stroke="none"/>',
    "arab-league": '<path d="M15.5 4.5a8 8 0 1 0 0 15a6.3 6.3 0 1 1 0-15z"/>',
    commonwealth: '<circle cx="8.2" cy="12" r="4.2"/><circle cx="15.8" cy="12" r="4.2"/>',
    opec: '<path d="M12 3.2c3.2 4 5.4 6.7 5.4 9.4a5.4 5.4 0 0 1-10.8 0c0-2.7 2.2-5.4 5.4-9.4z"/>',
    g7: '<circle cx="12" cy="12" r="9"/><text x="12" y="16" font-size="9.5" font-family="IBM Plex Mono, monospace" text-anchor="middle" fill="currentColor" stroke="none">7</text>',
    g20: '<circle cx="12" cy="12" r="9"/><text x="12" y="15.5" font-size="7.5" font-family="IBM Plex Mono, monospace" text-anchor="middle" fill="currentColor" stroke="none">20</text>',
    wto: '<line x1="12" y1="3.5" x2="12" y2="18"/><line x1="4.5" y1="7" x2="19.5" y2="7"/><path d="M4.5 7l-2.3 5.2a2.6 2.6 0 0 0 4.6 0z"/><path d="M19.5 7l-2.3 5.2a2.6 2.6 0 0 0 4.6 0z"/><line x1="8.5" y1="20.5" x2="15.5" y2="20.5"/>'
  };

  function tabIcon(accent) {
    const inner = TAB_ICONS[accent] || "";
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${inner}</svg>`;
  }

  const SECTION_INTRO = {
    overview: null,
    foundations: "The basic vocabulary of political geography — states, nations, and the spatial oddities of enclaves, exclaves, and forward capitals.",
    boundaries: "How borders get their shape, and the invisible lines UNCLOS draws out at sea.",
    systems: "Ways a country can organize who governs it, how power is checked, and how it can shift up, down, or apart.",
    orgs: "The alliances and blocs that countries join to pool leverage, trade, and security — supranationalism in practice.",
    theories: "The classical theories that explain why certain patches of the map matter more than their size suggests.",
    electoral: "How the shape of a voting district can decide an election before a single vote is cast.",
    resources: "Rivers, minerals, and old colonial lines that still quietly drive today's disputes.",
    disputes: "Contested ground where two or more states claim the same line on the map.",
    empires: "The empires whose rise and collapse quietly drew most of today's borders.",
    dark: "Ten of the deadliest political failures of the modern era — presented factually, for the mechanisms behind them, not for shock.",
    debrief: null
  };

  let state = { section: "overview", openCard: null, quiz: null };

  const CAT_META = {
    fnd: { label: "Foundations", cls: "lrn-fnd" },
    bnd: { label: "Boundaries", cls: "lrn-bnd" },
    sys: { label: "Systems", cls: "lrn-sys" },
    org: { label: "Alliances", cls: "lrn-org" },
    geo: { label: "Theories", cls: "lrn-geo" },
    elec: { label: "Electoral", cls: "lrn-elec" },
    res: { label: "Resources", cls: "lrn-res" },
    dis: { label: "Disputes", cls: "lrn-dis" },
    emp: { label: "Empires", cls: "lrn-emp" },
    drk: { label: "Dark Chapters", cls: "lrn-drk" }
  };

  function gradeLabel(pct) {
    if (pct >= 90) return "Distinction — you could brief someone else on this cold.";
    if (pct >= 75) return "Strong pass — a real command of the material, with a few gaps.";
    if (pct >= 60) return "Pass — the basics are there; the missed ones below are worth a second look.";
    if (pct >= 40) return "Borderline — worth another pass through the weaker topics before retesting.";
    return "Needs a full review — work through each section, then retake the debrief.";
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  /* Reuses the host app's own country list (data.js) to show a real flag
     next to a country name wherever one appears in this module — no
     network calls beyond the flagcdn.com host the app already uses, and
     nothing breaks if data.js isn't present (older embeds, standalone
     copies): it just falls back to plain text. */
  let _countryMap = null;
  function countryMap() {
    if (_countryMap) return _countryMap;
    _countryMap = {};
    if (typeof COUNTRIES !== "undefined" && Array.isArray(COUNTRIES)) {
      COUNTRIES.forEach((c) => {
        if (c && c.country && c.iso2) _countryMap[c.country.toLowerCase()] = c.iso2;
      });
    }
    return _countryMap;
  }
  function flagTag(name) {
    const code = countryMap()[String(name).toLowerCase().trim()];
    return code ? `<img class="lrn-flag" src="https://flagcdn.com/w40/${code}.png" alt="" loading="lazy">` : "";
  }

  function buildShell() {
    const overlay = el("div", "lrn-overlay");
    overlay.id = "learn-overlay";
    overlay.innerHTML = `
      <div class="lrn-header">
        <div class="lrn-headtext">
          <div class="lrn-kicker">Political geography</div>
          <h2>The Briefing Room</h2>
        </div>
        <button class="lrn-close" aria-label="Close">&times;</button>
      </div>
      <div class="lrn-tabs" id="lrnTabs"></div>
      <div class="lrn-body" id="lrnBody"></div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector(".lrn-close").addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });

    const tabWrap = overlay.querySelector("#lrnTabs");
    SECTIONS.forEach((s) => {
      const b = el("button", "lrn-tab lrn-" + s.accent, `${tabIcon(s.accent)}<span>${s.label}</span>`);
      b.dataset.section = s.id;
      b.addEventListener("click", () => setSection(s.id));
      tabWrap.appendChild(b);
    });

    return overlay;
  }

  function openOverlay() {
    let overlay = document.getElementById("learn-overlay");
    if (!overlay) overlay = buildShell();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    render();
  }

  function closeOverlay() {
    const overlay = document.getElementById("learn-overlay");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function setSection(id) {
    state.section = id;
    state.openCard = null;
    if (id === "debrief" && !state.quiz) startQuiz();
    render();
  }

  function render() {
    const tabs = document.querySelectorAll(".lrn-tab");
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.section === state.section));

    const body = document.getElementById("lrnBody");
    body.innerHTML = "";
    const introText = state.section === "debrief"
      ? `${LEARN_QUIZ.length} questions across every section above. No notes — see what actually stuck, then read the full report.`
      : SECTION_INTRO[state.section];
    if (introText) body.appendChild(el("p", "lrn-intro", introText));

    if (state.section === "overview") renderOverview(body);
    else if (state.section === "foundations") renderTermGrid(body, LEARN_FOUNDATIONS, "fnd");
    else if (state.section === "boundaries") renderBoundaries(body);
    else if (state.section === "systems") renderTermGrid(body, LEARN_SYSTEMS, "sys");
    else if (state.section === "orgs") renderOrgs(body);
    else if (state.section === "theories") renderTheories(body);
    else if (state.section === "electoral") renderElectoral(body);
    else if (state.section === "resources") renderTermGrid(body, LEARN_RESOURCES, "res");
    else if (state.section === "disputes") renderDisputes(body);
    else if (state.section === "empires") renderEmpires(body);
    else if (state.section === "dark") renderDark(body);
    else if (state.section === "debrief") renderQuiz(body);

    body.scrollTop = 0;
  }

  /* ---------------- Overview hub ---------------- */
  const SECTION_COUNTS = {
    foundations: () => LEARN_FOUNDATIONS.length,
    boundaries: () => LEARN_BOUNDARY_TYPES.length + LEARN_MARITIME_ZONES.length,
    systems: () => LEARN_SYSTEMS.length,
    orgs: () => LEARN_ORGS.length,
    theories: () => LEARN_THEORIES.length + LEARN_WORLDSYSTEM.length,
    electoral: () => LEARN_ELECTORAL.length,
    resources: () => LEARN_RESOURCES.length,
    disputes: () => LEARN_DISPUTES.length,
    empires: () => LEARN_EMPIRES.length,
    dark: () => LEARN_DARK.length
  };

  function renderOverview(body) {
    const totalTopics = Object.keys(SECTION_COUNTS).length;
    const head = el("div", "lrn-overview-head");
    head.innerHTML = `
      <p class="lrn-intro" style="margin-bottom:16px;">One tap got you here. From this hub, every part of political geography — vocabulary, borders, power, alliances, theory, elections, resources, disputes, empires, and history's worst failures — is one more tap away.</p>
      <div class="lrn-overview-stats">
        <div class="lrn-ov-stat"><span class="lrn-ov-num">${totalTopics}</span><span class="lrn-ov-lbl">Topics</span></div>
        <div class="lrn-ov-stat"><span class="lrn-ov-num">${LEARN_QUIZ.length}</span><span class="lrn-ov-lbl">Debrief questions</span></div>
        <div class="lrn-ov-stat"><span class="lrn-ov-num">${LEARN_ORGS.length}</span><span class="lrn-ov-lbl">Alliances</span></div>
      </div>
    `;
    body.appendChild(head);

    const grid = el("div", "lrn-overview-grid");
    SECTIONS.filter((s) => s.id !== "overview").forEach((s) => {
      const count = SECTION_COUNTS[s.id] ? SECTION_COUNTS[s.id]() : (s.id === "debrief" ? LEARN_QUIZ.length : null);
      const card = el("button", `lrn-ov-card lrn-${s.accent}`);
      card.innerHTML = `
        <span class="lrn-ov-icon">${tabIcon(s.accent)}</span>
        <span class="lrn-ov-title">${s.label}</span>
        <span class="lrn-ov-blurb">${s.id === "debrief" ? "Test everything you've read." : SECTION_INTRO[s.id]}</span>
        ${count !== null ? `<span class="lrn-ov-count">${count} ${s.id === "debrief" ? "questions" : "entries"}</span>` : ""}
      `;
      card.addEventListener("click", () => setSection(s.id));
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  /* ---------------- Generic term-card grid (Foundations, Systems, Theories, Resources) ---------------- */
  function renderTermGrid(body, data, accentCls) {
    const grid = el("div", "lrn-card-grid");
    data.forEach((item) => {
      const open = state.openCard === item.id;
      const card = el("div", `lrn-card lrn-${accentCls}` + (open ? " open" : ""));
      const hasMore = item.trait || item.examples;
      card.innerHTML = `
        <div class="lrn-card-head">
          <span class="lrn-pill lrn-${accentCls}">${item.tag}</span>
          <h3>${item.name}</h3>
        </div>
        <p class="lrn-def">${item.def}</p>
        ${hasMore ? `
        <div class="lrn-more">
          ${item.trait ? `<p class="lrn-trait"><em>${item.trait}</em></p>` : ""}
          ${item.examples ? `<div class="lrn-chips">${item.examples.map((c) => `<span class="lrn-chip">${flagTag(c)}${c}</span>`).join("")}</div>` : ""}
        </div>
        <button class="lrn-toggle">${open ? "Show less" : (item.examples ? "Show examples" : "Show more")}</button>` : ""}
      `;
      if (hasMore) {
        card.querySelector(".lrn-toggle").addEventListener("click", () => {
          state.openCard = open ? null : item.id;
          render();
        });
      }
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  /* ---------------- Orgs ---------------- */
  function renderOrgs(body) {
    const list = el("div", "lrn-org-list");
    LEARN_ORGS.forEach((o) => {
      const row = el("div", "lrn-org");
      const iconInner = ORG_ICONS[o.id];
      const mark = iconInner
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${iconInner}</svg>`
        : o.abbr;
      row.innerHTML = `
        <div class="lrn-org-mark">${mark}</div>
        <div class="lrn-org-main">
          <div class="lrn-org-top">
            <h3>${o.name}</h3>
            <span class="lrn-org-year">Est. ${o.founded}</span>
          </div>
          <div class="lrn-org-stats">
            <span>${o.members} members</span>
            <span class="lrn-dot-sep">&middot;</span>
            <span>${o.hq}</span>
          </div>
          <p class="lrn-def">${o.purpose}</p>
          <p class="lrn-fact"><span class="lrn-fact-mark"></span>${o.fact}</p>
        </div>
      `;
      list.appendChild(row);
    });
    body.appendChild(list);
  }

  /* ---------------- Boundaries & maritime law ---------------- */
  function renderBoundaries(body) {
    body.appendChild(el("div", "lrn-report-subhead", "Boundary types"));
    renderTermGrid(body, LEARN_BOUNDARY_TYPES, "bnd");

    body.appendChild(el("div", "lrn-report-subhead", "Maritime zones (UNCLOS)"));
    const bar = el("div", "lrn-zonebar");
    LEARN_MARITIME_ZONES.forEach((z) => {
      const seg = el("div", "lrn-zone-seg");
      seg.style.flex = z.flex;
      seg.style.background = z.color;
      seg.innerHTML = `<span class="lrn-zone-name">${z.name}</span><span class="lrn-zone-dist">${z.distance}</span>`;
      bar.appendChild(seg);
    });
    body.appendChild(bar);

    const legend = el("div", "lrn-zone-legend");
    LEARN_MARITIME_ZONES.forEach((z) => {
      const row = el("div", "lrn-zone-legend-row");
      row.innerHTML = `<span class="lrn-zone-dot" style="background:${z.color}"></span><p class="lrn-def">${z.rights}</p>`;
      legend.appendChild(row);
    });
    body.appendChild(legend);
  }

  /* ---------------- Geopolitical theories & world-systems ---------------- */
  function renderTheories(body) {
    renderTermGrid(body, LEARN_THEORIES, "geo");

    body.appendChild(el("div", "lrn-report-subhead", "World-systems analysis (Wallerstein)"));
    const tiers = el("div", "lrn-tier-list");
    LEARN_WORLDSYSTEM.forEach((t) => {
      const row = el("div", "lrn-tier");
      row.innerHTML = `
        <div class="lrn-tier-top">
          <h3>${t.name}</h3>
          <span class="lrn-tier-pct">~${t.pct}%</span>
        </div>
        <div class="lrn-tier-bar-track"><div class="lrn-tier-bar-fill" style="width:${t.pct * 2}%"></div></div>
        <p class="lrn-def">${t.def}</p>
        <div class="lrn-chips">${t.examples.map((c) => `<span class="lrn-chip">${flagTag(c)}${c}</span>`).join("")}</div>
      `;
      tiers.appendChild(row);
    });
    body.appendChild(tiers);
    body.appendChild(el("p", "lrn-dark-note", "Tier shares above are illustrative, not precise measurements of the world economy."));
  }

  /* ---------------- Electoral geography ---------------- */
  function buildDistrictSVG(pattern) {
    const cell = 26, gap = 3, cols = 6;
    const colors = ["#5A7DA6", "#D9A24F"];
    const w = cols * (cell + gap) - gap;
    const rowsTotal = pattern.length / cols;
    const h = rowsTotal * (cell + gap) - gap;
    let rects = "";
    pattern.forEach((v, i) => {
      const col = i % cols, row = Math.floor(i / cols);
      const x = col * (cell + gap), y = row * (cell + gap);
      rects += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="4" fill="${colors[v]}"/>`;
    });
    let outlines = "";
    const districts = rowsTotal / 2;
    for (let d = 0; d < districts; d++) {
      const y = d * 2 * (cell + gap);
      const dh = 2 * cell + gap;
      outlines += `<rect x="-2" y="${y - 2}" width="${w + 4}" height="${dh + 4}" rx="7" fill="none" stroke="#C9A227" stroke-width="2.5"/>`;
    }
    return `<svg viewBox="0 0 ${w} ${h}" class="lrn-district-svg" role="img" aria-label="District diagram">${rects}${outlines}</svg>`;
  }

  function renderElectoral(body) {
    const list = el("div", "lrn-card-grid");
    LEARN_ELECTORAL.forEach((item) => {
      const open = state.openCard === item.id;
      const card = el("div", "lrn-card lrn-elec" + (open ? " open" : ""));
      const hasVisual = !!item.pattern;
      card.innerHTML = `
        <div class="lrn-card-head">
          <span class="lrn-pill lrn-elec">${item.tag}</span>
          <h3>${item.name}</h3>
        </div>
        <p class="lrn-def">${item.def}</p>
        ${hasVisual ? `<div class="lrn-district-wrap">${buildDistrictSVG(item.pattern)}</div><p class="lrn-district-caption">${item.caption}</p>` : ""}
        <div class="lrn-more">
          ${item.trait ? `<p class="lrn-trait"><em>${item.trait}</em></p>` : ""}
          ${item.examples ? `<div class="lrn-chips">${item.examples.map((c) => `<span class="lrn-chip">${flagTag(c)}${c}</span>`).join("")}</div>` : ""}
        </div>
        <button class="lrn-toggle">${open ? "Show less" : "Show more"}</button>
      `;
      card.querySelector(".lrn-toggle").addEventListener("click", () => {
        state.openCard = open ? null : item.id;
        render();
      });
      list.appendChild(card);
    });
    body.appendChild(list);
    const legend = el("div", "lrn-district-legend");
    legend.innerHTML = `<span><i style="background:#5A7DA6"></i> Majority party</span><span><i style="background:#D9A24F"></i> Opposition</span><span class="lrn-district-legend-note">Gold outlines mark district boundaries</span>`;
    body.appendChild(legend);
  }

  /* ---------------- Disputes ---------------- */
  const STATUS_CLASS = { "Active": "hot", "Frozen": "cold", "Resolved (2023)": "done" };
  function statusClass(s) { return STATUS_CLASS[s] || (s.startsWith("Resolved") ? "done" : "cold"); }

  function renderDisputes(body) {
    const filters = el("div", "lrn-filters");
    ["All", "Active", "Frozen", "Resolved"].forEach((f) => {
      const b = el("button", "lrn-filter" + (((state.disputeFilter || "All") === f) ? " active" : ""), f);
      b.addEventListener("click", () => { state.disputeFilter = f; render(); });
      filters.appendChild(b);
    });
    body.appendChild(filters);

    const list = el("div", "lrn-case-list");
    const active = state.disputeFilter || "All";
    LEARN_DISPUTES
      .filter((d) => active === "All" || d.status.startsWith(active))
      .forEach((d) => {
        const card = el("div", "lrn-case");
        const partyChips = d.parties.split(",").map((p) => p.trim())
          .map((p) => `<span class="lrn-party">${flagTag(p)}${p}</span>`).join("");
        card.innerHTML = `
          <div class="lrn-case-top">
            <h3>${d.name}</h3>
            <span class="lrn-status lrn-status-${statusClass(d.status)}">${d.status}</span>
          </div>
          <div class="lrn-party-row">${partyChips}</div>
          <div class="lrn-case-meta">${d.region}</div>
          <p class="lrn-def">${d.summary}</p>
          ${d.boundaryType ? `<span class="lrn-chip lrn-bnd-tag">${d.boundaryType}</span>` : ""}
        `;
        list.appendChild(card);
      });
    body.appendChild(list);
  }

  /* ---------------- Empires ---------------- */
  function renderEmpires(body) {
    const line = el("div", "lrn-timeline");
    LEARN_EMPIRES.forEach((emp) => {
      const item = el("div", "lrn-tl-item");
      item.innerHTML = `
        <div class="lrn-tl-dot"></div>
        <div class="lrn-tl-content">
          <div class="lrn-tl-span">${emp.span}</div>
          <h3>${emp.name}</h3>
          <p class="lrn-tl-reach">${emp.reach}</p>
          <p class="lrn-def">${emp.legacy}</p>
        </div>
      `;
      line.appendChild(item);
    });
    body.appendChild(line);
  }

  /* ---------------- Dark Chapters ---------------- */
  function renderDark(body) {
    const note = el("p", "lrn-dark-note",
      "These events are presented as history, not as entertainment — the aim is to understand the political conditions that made each one possible.");
    body.appendChild(note);

    const list = el("div", "lrn-chapter-list");
    LEARN_DARK.forEach((c) => {
      const card = el("div", "lrn-chapter");
      card.innerHTML = `
        <div class="lrn-chapter-top">
          <h3>${c.name}</h3>
          <span class="lrn-chapter-era">${c.era}</span>
        </div>
        <div class="lrn-chapter-toll">Estimated toll: ${c.toll}</div>
        <p class="lrn-def">${c.summary}</p>
        <p class="lrn-chapter-mech"><span class="lrn-chapter-k">Mechanism —</span> ${c.mechanism}</p>
        <p class="lrn-chapter-mech"><span class="lrn-chapter-k">Legacy —</span> ${c.legacy}</p>
      `;
      list.appendChild(card);
    });
    body.appendChild(list);
  }

  /* ---------------- Debrief quiz ---------------- */
  function startQuiz() {
    const order = LEARN_QUIZ.map((_, i) => i).sort(() => Math.random() - 0.5);
    state.quiz = { order, idx: 0, score: 0, answered: false, picked: null, done: false, responses: [] };
  }

  function renderQuiz(body) {
    const q = state.quiz;
    if (!q) { startQuiz(); return renderQuiz(body); }

    if (q.done) {
      body.appendChild(buildReport(q));
      return;
    }

    const item = LEARN_QUIZ[q.order[q.idx]];
    const wrap = el("div", "lrn-quiz");
    wrap.innerHTML = `
      <div class="lrn-quiz-progress">Question ${q.idx + 1} of ${LEARN_QUIZ.length} &nbsp;&middot;&nbsp; Score ${q.score}</div>
      <p class="lrn-quiz-q">${item.q}</p>
      <div class="lrn-quiz-opts"></div>
      <button class="lrn-quiz-next" style="display:none;">Next</button>
    `;
    const optsWrap = wrap.querySelector(".lrn-quiz-opts");
    item.options.forEach((opt, i) => {
      const b = el("button", "lrn-quiz-opt", opt);
      b.addEventListener("click", () => {
        if (q.answered) return;
        q.answered = true;
        q.picked = i;
        const correct = i === item.a;
        if (correct) q.score++;
        q.responses.push({
          cat: item.cat,
          correct: correct,
          question: item.q,
          chosen: item.options[i],
          correctText: item.options[item.a]
        });
        renderQuizFeedback();
      });
      optsWrap.appendChild(b);
    });
    body.appendChild(wrap);

    function renderQuizFeedback() {
      const opts = wrap.querySelectorAll(".lrn-quiz-opt");
      opts.forEach((b, i) => {
        b.disabled = true;
        if (i === item.a) b.classList.add("correct");
        else if (i === q.picked) b.classList.add("wrong");
      });
      const nextBtn = wrap.querySelector(".lrn-quiz-next");
      nextBtn.style.display = "block";
      nextBtn.textContent = (q.idx + 1 === LEARN_QUIZ.length) ? "See results" : "Next";
      nextBtn.addEventListener("click", () => {
        if (q.idx + 1 === q.order.length) {
          q.done = true;
        } else {
          q.idx++;
          q.answered = false;
          q.picked = null;
        }
        render();
      });
    }
  }

  function buildReport(q) {
    const total = LEARN_QUIZ.length;
    const pct = Math.round((q.score / total) * 100);

    const byCat = {};
    Object.keys(CAT_META).forEach((c) => { byCat[c] = { total: 0, correct: 0 }; });
    q.responses.forEach((r) => {
      byCat[r.cat].total++;
      if (r.correct) byCat[r.cat].correct++;
    });

    const wrap = el("div", "lrn-report");

    const head = el("div", "lrn-report-head");
    head.innerHTML = `
      <div class="lrn-score">${pct}%</div>
      <div class="lrn-score-frac">${q.score} of ${total} correct</div>
      <p class="lrn-def lrn-grade-text">${gradeLabel(pct)}</p>
    `;
    wrap.appendChild(head);

    wrap.appendChild(el("div", "lrn-report-subhead", "By topic"));
    const bars = el("div", "lrn-report-bars");
    Object.keys(CAT_META).forEach((c) => {
      const b = byCat[c];
      const p = b.total ? Math.round((b.correct / b.total) * 100) : 0;
      const row = el("div", "lrn-bar-row");
      row.innerHTML = `
        <span class="lrn-bar-label">${CAT_META[c].label}</span>
        <span class="lrn-bar-track"><span class="lrn-bar-fill ${CAT_META[c].cls}" style="width:${p}%"></span></span>
        <span class="lrn-bar-val">${b.correct}/${b.total}</span>
      `;
      bars.appendChild(row);
    });
    wrap.appendChild(bars);

    const missed = q.responses.filter((r) => !r.correct);
    wrap.appendChild(el("div", "lrn-report-subhead", missed.length ? `Missed questions (${missed.length})` : "Missed questions"));
    if (missed.length === 0) {
      wrap.appendChild(el("p", "lrn-def", "None — every question was answered correctly."));
    } else {
      const list = el("div", "lrn-review-list");
      missed.forEach((r) => {
        const item = el("div", "lrn-review-item");
        item.innerHTML = `
          <span class="lrn-pill ${CAT_META[r.cat].cls}">${CAT_META[r.cat].label}</span>
          <p class="lrn-review-q">${r.question}</p>
          <p class="lrn-review-line lrn-wrong-line">Your answer: ${r.chosen}</p>
          <p class="lrn-review-line lrn-correct-line">Correct answer: ${r.correctText}</p>
        `;
        list.appendChild(item);
      });
      wrap.appendChild(list);
    }

    const restart = el("button", "lrn-restart", "Run it again");
    restart.addEventListener("click", () => { startQuiz(); render(); });
    wrap.appendChild(restart);

    return wrap;
  }

  /* ---------------- Init ---------------- */
  function init() {
    const launcher = document.getElementById("learnLauncher");
    if (launcher) launcher.addEventListener("click", openOverlay);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
