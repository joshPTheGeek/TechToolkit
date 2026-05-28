(() => {
  const THEME_KEY = "techtoolkit.theme";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalize(value) {
    return String(value || "").toLowerCase();
  }

  function getStoredTheme() {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark") {
      return raw;
    }
    return null;
  }

  function detectPreferredTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    return nextTheme;
  }

  function initTheme() {
    return applyTheme(getStoredTheme() || detectPreferredTheme());
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    return applyTheme(current === "dark" ? "light" : "dark");
  }

  function getThemeLabel() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    return current === "dark" ? "Switch to Light" : "Switch to Dark";
  }

  function iconSvg(type) {
    const icons = {
      home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>',
      index: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2 4h10v2H7zm0 4h10v2H7zm0 4h6v2H7z"/></svg>',
      categories: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zm9 0h7v5h-7zM4 13h5v7H4zm7 5h9v2h-9zm2-5h7v2h-7z"/></svg>',
      cheatsheet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 1.5V9h4.5M8 12h8v2H8zm0 4h8v2H8z"/></svg>',
      method: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10v2H4zm0 5h10v2H4zm0 5h7v2H4zM17 5l4 4-4 4-1.4-1.4 1.6-1.6H13V8h4.2l-1.6-1.6z"/></svg>',
      brand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 6v6c0 5.1 3.4 9.7 8 11 4.6-1.3 8-5.9 8-11V6zM9 12l2 2 4-4"/></svg>'
    };
    return icons[type] || "";
  }

  function navLink(path, label, currentPage) {
    const active = currentPage === path ? "active" : "";
    const type = path === "home.html"
      ? "home"
      : path === "index.html"
        ? "index"
        : path === "categories.html"
          ? "categories"
          : path === "troubleshooting-method.html"
            ? "method"
            : "cheatsheet";
    return `<a class="nav-link ${active}" href="${path}">${iconSvg(type)}<span>${label}</span></a>`;
  }

  function renderNav(currentPage) {
    return `
      <nav class="site-nav" aria-label="Primary">
        <a class="brand" href="home.html">${iconSvg("brand")}<span>TechToolkit</span></a>
        <div class="nav-links">
          ${navLink("home.html", "Home", currentPage)}
          ${navLink("index.html", "Index", currentPage)}
          ${navLink("categories.html", "Categories", currentPage)}
          ${navLink("troubleshooting-method.html", "Method", currentPage)}
          ${navLink("cheatsheet.html", "Cheat Sheet", currentPage)}
        </div>
        <button id="theme-toggle" class="theme-toggle" type="button">${getThemeLabel()}</button>
      </nav>
    `;
  }

  function bindThemeToggle() {
    const button = document.getElementById("theme-toggle");
    if (!button) {
      return;
    }
    button.addEventListener("click", () => {
      toggleTheme();
      button.textContent = getThemeLabel();
    });
  }

  window.TechToolkit = {
    escapeHtml,
    normalize,
    initTheme,
    applyTheme,
    toggleTheme,
    getThemeLabel,
    renderNav,
    bindThemeToggle
  };
})();
