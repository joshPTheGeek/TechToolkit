(() => {
  const shared = window.TechToolkit || {};
  const app = document.getElementById("tier2-troubleshooting-method-app");
  if (!app) {
    return;
  }

  if (shared.initTheme) {
    shared.initTheme();
  }

  const methodSteps = [
    {
      title: "1) Identify the Problem",
      goal: "Gather facts before touching settings.",
      actions: [
        "Question the user and identify recent changes.",
        "Determine scope: single user, single site, or widespread.",
        "Document symptoms, timestamps, and exact error messages."
      ]
    },
    {
      title: "2) Establish a Theory of Probable Cause",
      goal: "Build a plausible root-cause shortlist.",
      actions: [
        "Start with obvious causes (cables, credentials, power, outages).",
        "Use known-good comparisons and baseline behavior.",
        "List competing hypotheses before making changes."
      ]
    },
    {
      title: "3) Test the Theory",
      goal: "Prove or disprove quickly with minimal risk.",
      actions: [
        "Run targeted tests (ping, logs, service checks, permissions).",
        "Change one variable at a time to preserve causality.",
        "If theory fails, loop back and pick the next probable cause."
      ]
    },
    {
      title: "4) Plan and Implement the Fix",
      goal: "Resolve safely and with rollback awareness.",
      actions: [
        "Assess impact and confirm change window if needed.",
        "Implement least-disruptive fix first.",
        "Use escalation path when risk exceeds scope."
      ]
    },
    {
      title: "5) Verify Full System Functionality",
      goal: "Ensure the issue is truly resolved.",
      actions: [
        "Validate primary symptom is gone.",
        "Run related checks (performance, security, dependent services).",
        "Ask user to confirm normal workflow restored."
      ]
    },
    {
      title: "6) Document Findings and Preventive Actions",
      goal: "Create reusable operational knowledge.",
      actions: [
        "Record root cause, fix steps, and verification evidence.",
        "Document commands run and configuration changes.",
        "Add prevention notes (monitoring, patching, user guidance)."
      ]
    }
  ];

  const decisionChecklist = [
    "Can this change impact other users/services?",
    "Do I have a rollback path before I proceed?",
    "Am I preserving logs/evidence needed for escalation?",
    "Did I verify success from both technician and user perspective?"
  ];

  app.innerHTML = `
    ${shared.renderNav ? shared.renderNav("troubleshooting-method.html") : ""}

    <section class="panel hero">
      <p class="badge">Fundamentals</p>
      <h1>IT Specialist Troubleshooting Method</h1>
      <p class="summary">A practical 6-step process for consistent, low-risk incident resolution.</p>
    </section>

    <section class="panel">
      <h2>Standard 6-Step Workflow</h2>
      <div class="method-grid">
        ${methodSteps
          .map(
            (step) => `
              <article class="method-card">
                <h3>${step.title}</h3>
                <p class="small-muted"><strong>Goal:</strong> ${step.goal}</p>
                <ul>
                  ${step.actions.map((action) => `<li>${action}</li>`).join("")}
                </ul>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="panel">
      <h2>Change-Risk Quick Check</h2>
      <ul class="method-checklist">
        ${decisionChecklist.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="panel">
      <h2>Reference Links</h2>
      <div class="button-grid">
        <a class="button-link" href="index.html">Open Scenario Index</a>
        <a class="button-link" href="cheatsheet.html">Open Cheat Sheet</a>
      </div>
    </section>
  `;

  if (shared.bindThemeToggle) {
    shared.bindThemeToggle();
  }
})();
