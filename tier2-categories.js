(() => {
  const shared = window.TechToolkit || {};
  const app = document.getElementById("tier2-categories-app");
  const scenarios = window.TIER2_SCENARIOS || [];
  if (!app) {
    return;
  }

  if (shared.initTheme) {
    shared.initTheme();
  }

  function hasTag(scenario, tag) {
    const tags = Array.isArray(scenario.tags) ? scenario.tags : [];
    return tags.includes(tag);
  }

  function inferHardware(scenario) {
    const text = `${scenario.category} ${scenario.title}`.toLowerCase();
    return (
      hasTag(scenario, "hardware") ||
      /hardware|peripherals|input devices|battery|screen|monitor|dock|power|drive|boot/.test(text)
    );
  }

  function inferSoftware(scenario) {
    return hasTag(scenario, "software") || !inferHardware(scenario);
  }

  function inferWindows(scenario) {
    const text = `${scenario.category} ${scenario.title} ${scenario.summary}`.toLowerCase();
    return (
      hasTag(scenario, "windows") ||
      /windows|bitlocker|outlook|rdp|office|entra|onedrive|sharepoint|wsus|ntlm|kerberos/.test(text)
    );
  }

  function inferMac(scenario) {
    const text = `${scenario.category} ${scenario.title} ${scenario.summary}`.toLowerCase();
    return (
      hasTag(scenario, "mac") ||
      /mac|filevault|keychain|time machine|jamf|exchange|802.1x|esim/.test(text)
    );
  }

  function byTitle(a, b) {
    return (a.title || "").localeCompare(b.title || "");
  }

  const grouped = {
    Hardware: scenarios.filter(inferHardware).sort(byTitle),
    Software: scenarios.filter(inferSoftware).sort(byTitle),
    Windows: scenarios.filter(inferWindows).sort(byTitle),
    "Mac OS": scenarios.filter(inferMac).sort(byTitle)
  };

  const nativeCategories = [...new Set(scenarios.map((scenario) => scenario.category))].sort();

  app.innerHTML = `
    ${shared.renderNav ? shared.renderNav("categories.html") : ""}

    <section class="panel hero">
      <p class="badge">Grouped Navigation</p>
      <h1>Scenario Categories</h1>
      <p class="summary">Browse by troubleshooting domain, platform, and technology category.</p>
    </section>

    <section class="panel">
      <h2>Core Groups</h2>
      <div class="category-grid">
        ${Object.entries(grouped)
          .map(
            ([name, list]) => `
              <article class="category-card">
                <h3>${name} <span class="small-muted">(${list.length})</span></h3>
                <ul>
                  ${list.map((scenario) => `<li><a href="${scenario.slug}.html">${scenario.title}</a></li>`).join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="panel">
      <h2>All Native Categories</h2>
      <div class="category-grid">
        ${nativeCategories
          .map((category) => {
            const list = scenarios.filter((scenario) => scenario.category === category).sort(byTitle);
            return `
              <article class="category-card">
                <h3>${category} <span class="small-muted">(${list.length})</span></h3>
                <ul>
                  ${list.map((scenario) => `<li><a href="${scenario.slug}.html">${scenario.title}</a></li>`).join("")}
                </ul>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;

  if (shared.bindThemeToggle) {
    shared.bindThemeToggle();
  }
})();
