(() => {
  const THEME_KEY = "techtoolkit.theme";
  const shared = window.TechToolkit || {};
  const scenarioSlug = window.SCENARIO_SLUG;
  const scenarios = window.TIER2_SCENARIOS || [];
  const scenario = scenarios.find((item) => item.slug === scenarioSlug);

  function initTheme() {
    if (shared.initTheme) {
      shared.initTheme();
      return;
    }
    const saved = localStorage.getItem(THEME_KEY);
    const fallback =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const theme = saved === "dark" || saved === "light" ? saved : fallback;
    applyTheme(theme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    localStorage.setItem(THEME_KEY, theme === "dark" ? "dark" : "light");
  }

  function toggleTheme() {
    if (shared.toggleTheme) {
      shared.toggleTheme();
      return;
    }
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function themeLabel() {
    if (shared.getThemeLabel) {
      return shared.getThemeLabel();
    }
    const current = document.documentElement.getAttribute("data-theme") || "light";
    return current === "dark" ? "Switch to Light" : "Switch to Dark";
  }

  function renderNav() {
    if (shared.renderNav) {
      return shared.renderNav("");
    }
    return `
      <nav class="site-nav" aria-label="Primary">
        <a class="brand" href="home.html">TechToolkit</a>
        <div class="nav-links">
          <a class="nav-link" href="home.html">Home</a>
          <a class="nav-link" href="index.html">Index</a>
          <a class="nav-link" href="categories.html">Categories</a>
          <a class="nav-link" href="cheatsheet.html">Cheat Sheet</a>
        </div>
        <button id="theme-toggle" class="theme-toggle" type="button">${themeLabel()}</button>
      </nav>
    `;
  }

  if (!scenario) {
    document.body.innerHTML = `
      <main class="app-shell">
        ${renderNav()}
        <section class="panel">
          <h1>Scenario Not Found</h1>
          <p>The selected troubleshooting scenario could not be loaded.</p>
          <p><a href="index.html">Return to troubleshooting index</a></p>
        </section>
      </main>
    `;
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        toggleTheme();
        themeToggle.textContent = themeLabel();
      });
    }
    return;
  }

  const storageKey = `tier2.scenario.${scenario.slug}`;
  let state = loadState();
  initTheme();

  function loadState() {
    const fallbackTasks = Object.fromEntries(
      scenario.checklist.map((task) => [task.id, { checked: false, note: "" }])
    );
    const fallback = { search: "", tasks: fallbackTasks };
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw);
      const mergedTasks = { ...fallbackTasks };
      Object.keys(mergedTasks).forEach((taskId) => {
        const current = parsed.tasks && parsed.tasks[taskId] ? parsed.tasks[taskId] : {};
        mergedTasks[taskId] = {
          checked: Boolean(current.checked),
          note: typeof current.note === "string" ? current.note : ""
        };
      });
      return {
        search: typeof parsed.search === "string" ? parsed.search : "",
        tasks: mergedTasks
      };
    } catch (error) {
      console.error("Unable to parse saved scenario state", error);
      return fallback;
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function getProgressPercent() {
    const total = scenario.checklist.length;
    const done = scenario.checklist.filter((task) => state.tasks[task.id]?.checked).length;
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }

  function matchesQuery(task, query) {
    if (!query) {
      return true;
    }
    const target = `${task.title} ${task.details}`.toLowerCase();
    return target.includes(query.toLowerCase());
  }

  function render() {
    const progress = getProgressPercent();
    const searchQuery = state.search.trim().toLowerCase();
    const filteredTasks = scenario.checklist.filter((task) => matchesQuery(task, searchQuery));

    document.body.innerHTML = `
      <main class="app-shell">
        ${renderNav()}
        <header class="panel page-header">
          <a class="back-link" href="index.html">Back to Index</a>
          <div class="header-row">
            <div>
              <p class="badge">${scenario.category}</p>
              <h1>${scenario.title}</h1>
              <p class="summary">${scenario.summary}</p>
            </div>
            <div class="action-row">
              <button id="print-btn" type="button">Print</button>
              <button id="reset-btn" class="danger-btn" type="button">Reset</button>
            </div>
          </div>
          <div class="progress-wrap">
            <div class="progress-label">
              <span>Progress</span>
              <span>${progress}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${progress}%"></div>
            </div>
          </div>
          <label class="search-wrap">
            <span>Search checklist</span>
            <input id="search-input" type="search" value="${escapeHtml(
              state.search
            )}" placeholder="Filter tasks by keyword..." />
          </label>
        </header>

        <section class="panel">
          <h2>Troubleshooting Checklist (8 Steps)</h2>
          ${
            filteredTasks.length === 0
              ? '<p class="empty-state">No checklist items match your search.</p>'
              : filteredTasks
                  .map((task, index) => {
                    const taskState = state.tasks[task.id] || { checked: false, note: "" };
                    return `
                      <article class="task-card ${taskState.checked ? "task-complete" : ""}">
                        <div class="task-header">
                          <label class="checkbox-wrap">
                            <input data-action="toggle-task" data-task-id="${task.id}" type="checkbox" ${
                              taskState.checked ? "checked" : ""
                            } />
                            <span>${index + 1}. ${task.title}</span>
                          </label>
                        </div>
                        <p class="task-details">${task.details}</p>
                        <label class="note-label">
                          Notes
                          <textarea data-action="edit-note" data-task-id="${task.id}" rows="3" placeholder="Add observations, command output, or findings...">${escapeHtml(
                            taskState.note
                          )}</textarea>
                        </label>
                      </article>
                    `;
                  })
                  .join("")
          }
        </section>

        <section class="panel tips-panel">
          <h2>Extra Pro Tips</h2>
          <ul>
            ${scenario.proTips.map((tip) => `<li>${tip}</li>`).join("")}
          </ul>
        </section>
      </main>
    `;

    bindEvents();
  }

  function bindEvents() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        toggleTheme();
        themeToggle.textContent = themeLabel();
      });
    }

    const resetBtn = document.getElementById("reset-btn");
    const printBtn = document.getElementById("print-btn");
    const searchInput = document.getElementById("search-input");

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const confirmed = window.confirm(
          "Reset this scenario checklist and clear all notes?"
        );
        if (!confirmed) {
          return;
        }
        localStorage.removeItem(storageKey);
        state = loadState();
        render();
      });
    }

    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        state.search = event.target.value;
        saveState();
        render();
      });
    }

    document.querySelectorAll('[data-action="toggle-task"]').forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const taskId = event.target.getAttribute("data-task-id");
        state.tasks[taskId].checked = event.target.checked;
        saveState();
        render();
      });
    });

    document.querySelectorAll('[data-action="edit-note"]').forEach((textarea) => {
      textarea.addEventListener("input", (event) => {
        const taskId = event.target.getAttribute("data-task-id");
        state.tasks[taskId].note = event.target.value;
        autoResizeTextarea(event.target);
        saveState();
      });
      autoResizeTextarea(textarea);
    });
  }

  function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
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
