(() => {
  const shared = window.TechToolkit || {};
  const app = document.getElementById("tier2-home-app");
  const scenarios = window.TIER2_SCENARIOS || [];
  if (!app) {
    return;
  }

  if (shared.initTheme) {
    shared.initTheme();
  }

  const categories = [...new Set(scenarios.map((item) => item.category))].sort();
  const featured = [...scenarios]
    .sort((a, b) => (a.title || "").localeCompare(b.title || ""))
    .slice(0, 6);

  app.innerHTML = `
    ${shared.renderNav ? shared.renderNav("home.html") : ""}
    <section class="panel hero">
      <p class="badge">Tier 2 Ready</p>
      <h1>TechToolkit Troubleshooting Hub</h1>
      <p class="summary">Premium, fast-reference workflows for endpoint, network, identity, and Mac/Windows support incidents.</p>
      <div class="hero-illustration" aria-hidden="true">
        <svg viewBox="0 0 560 140" role="img">
          <defs>
            <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stop-color="#60a5fa"></stop>
              <stop offset="100%" stop-color="#22d3ee"></stop>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="560" height="140" rx="18" fill="url(#g1)" opacity="0.14"></rect>
          <circle cx="80" cy="70" r="32" fill="none" stroke="url(#g1)" stroke-width="8"></circle>
          <path d="M64 70h32M80 54v32" stroke="url(#g1)" stroke-width="8" stroke-linecap="round"></path>
          <rect x="154" y="38" width="110" height="64" rx="10" fill="none" stroke="url(#g1)" stroke-width="6"></rect>
          <path d="M174 58h70M174 75h52" stroke="url(#g1)" stroke-width="6" stroke-linecap="round"></path>
          <rect x="306" y="34" width="180" height="72" rx="14" fill="none" stroke="url(#g1)" stroke-width="6"></rect>
          <path d="M330 56h132M330 76h94" stroke="url(#g1)" stroke-width="6" stroke-linecap="round"></path>
        </svg>
      </div>
      <div class="button-grid" style="margin-top: 14px;">
        <a class="button-link" href="index.html">Open Scenario Index</a>
        <a class="button-link" href="categories.html">Browse by Categories</a>
        <a class="button-link" href="troubleshooting-method.html">Troubleshooting Method</a>
        <a class="button-link" href="cheatsheet.html">Open Cheat Sheet</a>
      </div>
    </section>

    <section class="panel">
      <h2>Library Snapshot</h2>
      <div class="chip-row">
        <span class="chip">${scenarios.length} total scenarios</span>
        <span class="chip">8 checklist items each</span>
        <span class="chip">${categories.length} primary categories</span>
      </div>
    </section>

    <section class="panel">
      <h2>Featured Quick Launch</h2>
      <ol class="quick-list">
        ${featured
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
          .join("")}
      </ol>
    </section>
  `;

  if (shared.bindThemeToggle) {
    shared.bindThemeToggle();
  }
})();
