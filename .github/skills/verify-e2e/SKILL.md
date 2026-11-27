---
name: verify-e2e
description: Verifies the Angular project's Playwright E2E workflow in headed Chromium with visible slow-motion interactions.
user-invocable: true
---

# Verify E2E

Run from the repository root.

1. Inspect `playwright.config.ts` and `package.json` before execution. Confirm Chromium is configured with `headless: false`, `launchOptions.slowMo` is enabled, `test:e2e` runs Playwright in headed mode, and `webServer` starts the Angular application.
2. If any required setting or script is missing, report what is missing without changing files. Do not run headless or alter the Playwright configuration.
3. Run exactly `npm run test:e2e`. Let the configured `webServer` start Angular; do not start a separate server.
4. Wait for the command to finish and inspect its output and relevant failure details. Report passed and failed test counts. For failures, summarize the relevant error, likely cause, and recommended fix; do not apply fixes.
5. Claim success only when the command completes successfully.

Do not modify application source code, E2E tests, Playwright configuration, or other Skills and Agent configurations.
