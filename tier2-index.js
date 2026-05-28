(() => {
  const shared = window.TechToolkit || {};
  const scenarios = [...(window.TIER2_SCENARIOS || [])].sort((a, b) =>
    (a.title || "").localeCompare(b.title || "")
  );
  const app = document.getElementById("tier2-index-app");
  if (!app) {
    return;
  }

  if (shared.initTheme) {
    shared.initTheme();
  }

  let query = "";

  function normalize(text) {
    if (shared.normalize) {
      return shared.normalize(text);
    }
    return String(text || "").toLowerCase();
  }

  function scenarioMatches(scenario, search) {
    if (!search) {
      return true;
    }
    const target = normalize(
      `${scenario.title} ${scenario.category} ${scenario.summary} ${(scenario.proTips || []).join(" ")}`
    );
    return target.includes(search);
  }

  function render() {
    const normalizedQuery = normalize(query).trim();
    const filtered = scenarios.filter((scenario) => scenarioMatches(scenario, normalizedQuery));

    app.innerHTML = `
      ${shared.renderNav ? shared.renderNav("index.html") : ""}

      <header class="panel hero">
        <p class="badge">Quick Lookup</p>
        <h1>Alphabetical Scenario Index</h1>
        <p>Single-column keyword list optimized for rapid scanning and search.</p>
        <label class="search-wrap index-search">
          <span>Search scenarios and keywords</span>
          <input id="scenario-search" type="search" value="${escapeHtml(
            query
          )}" placeholder="Try: vpn, exchange, filevault, printer..." />
        </label>
        <p class="small-muted">${filtered.length} of ${scenarios.length} scenarios shown</p>
      </header>

      <section class="panel">
        <h2>Scenario Titles (A-Z)</h2>
        <ol class="quick-list">
          ${
            filtered.length === 0
              ? '<p class="empty-state">No scenarios matched your search.</p>'
              : filtered
                  .map(
                    (scenario) => `
                    <li class="quick-list-item">
                      <a href="${scenario.slug}.html">
                        <span>${scenario.title}</span>
                        <span class="chip">${scenario.category}</span>
                      </a>
                    </li>
                  `
                  )
                  .join("")
          }
        </ol>
      </section>

      <section class="panel">
        <h2>Legacy Utilities</h2>
        <div class="button-grid">
          <a class="button-link" href="slowcomputer.html">Slow PC Diagnostic</a>
          <a class="button-link" href="networkdiagnostics.html">Network Troubleshooter</a>
          <a class="button-link" href="malwarefix.html">Malware Cleanup Flow</a>
        </div>
      </section>
    `;

    if (shared.bindThemeToggle) {
      shared.bindThemeToggle();
    }

    const searchInput = document.getElementById("scenario-search");
    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        query = event.target.value;
        render();
      });
    }
  }

  function escapeHtml(value) {
    if (shared.escapeHtml) {
      return shared.escapeHtml(value);
    }
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  render();
})();
