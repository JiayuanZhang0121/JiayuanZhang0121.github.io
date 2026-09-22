# Validation

Validated locally on Windows using Node.js 24.12.0 and installed Chrome.
The CI workflow uses Node.js 22 and Playwright Chromium on Ubuntu.

- `npm run lint`: passed, zero warnings.
- `npm run build`: passed, including TypeScript.
- Build inspection: five real route entries plus `404.html`; all HTML asset
  references resolve; upstream MIT license is preserved in the deployed output;
  deployed notices match the source; no upstream game media/font binaries.
- Playwright: 9 passed, 1 intentionally skipped (desktop dragging test on mobile).
- Direct access and refresh: `/`, `/life/`, `/study/`, `/projects/`, `/about/`.
- Internal navigation and license links return HTTP 200.
- Unknown routes return HTTP 404 and render a working HOME link.
- No browser runtime errors or horizontal overflow at desktop/mobile sizes.
- Console: tilde/backquote and Escape, status/help/clear, history, focus restore,
  and literal rendering of HTML-like input (no HTML execution).
- Content: archive open/back, empty categories, study checklist, project status
  filters and window close/reopen.
- Desktop window dragging stays inside its stage.
- Actual screenshots of all five pages, console and mobile home are stored in
  `docs/previews/` and were visually inspected. The mobile footer is in normal
  document flow so it does not cover the content.
- npm installation audit reported 0 vulnerabilities.

Chromium's download endpoint timed out locally, so local browser checks used the
installed Chrome via `PLAYWRIGHT_CHANNEL=chrome`. CI installs Chromium normally.

Publication limitation: the authenticated account has no target-repository push
or admin permission. A fork PR delivers the change; production deployment cannot
be verified until the owner selects GitHub Actions as the Pages source and merges.
