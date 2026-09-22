# Upstream review and migration decisions

Reviewed on 2026-09-16, before adaptation.

## Sources

- Repository: https://github.com/arlagonix/half-life-screen
- Revision: `8b5913b0dc1727d9ed003e2c599d812cf1092985`
- License: MIT, Copyright (c) 2023 Alexander Gorbunov. Permission allows reuse,
  modification and distribution subject to retaining the copyright, permission
  notice and disclaimer. The original text is copied without modification.
- The upstream README calls this **Half-Life 2 Starting Screen**. It is not a
  Half-Life 1 implementation. The requested GoldSrc changes therefore include
  square, opaque, olive dialogs and system Tahoma/Verdana rather than the
  upstream rounded, blurred gray dialogs and bundled fonts.

## Structure and implementation inspected

| Location | Purpose and migration decision |
| --- | --- |
| `src/App.tsx`, `index.tsx`, `index.html`, `index.scss`, `fonts.scss` | App starts with an intro, then Valve video, then lazy-loaded menu. Replace intro/video with direct personal menu entry. Remove all font embeds. |
| `src/pages/HalfLifeScreen/` | Main menu, background gallery, background audio. Reuse menu composition and style rules; replace gallery/audio with original CSS geometry. |
| `src/components/Modal/` | `react-draggable` wrapper; NewGame, LoadGame, Achievement, Settings, ExitGame dialogs. Reuse wrapper and styles; personal modules replace game-specific dialog content. |
| `src/components/Button/` | Shared beveled button with disabled state. Directly retained and recolored. |
| `src/components/Modal/SettingsModal/` | Graphics/Audio tabs and controls. Generalize tab selector; retain raised tab SCSS. |
| `Checkbox`, `Radiobutton`, `NewGameCard`, `SaveCard`, `Achievement`, `Spinner` | Game-related controls/cards and loading UI. Inspected; not imported. Personal lists and native accessible checkboxes replace them. |
| `src/hooks/` | Random image indexes, localStorage settings and language switching. Not needed without the image/audio settings. |
| `src/localization/` | English/Russian i18next resources with a custom conversion function. Replace game strings with centralized Chinese/English personal content. |
| `src/utils/` | Audio loading/playback, external links, game image mapping. No audio or game image utilities copied. |
| `src/assets/`, `public/`, `docs/results/` | Game media, fonts, screenshots, icons. None copied into the destination; upstream screenshots were inspected locally to compare actual controls. |
| `vite.config.ts`, TS/ESLint configs, package files | Vite 4, React 18, TS 5 and SCSS CSS Modules. Keep the architecture, update tooling and remove unnecessary plugins. |
| `.github/workflows/main.yml` | Original separate lint, test, build, deploy jobs. Replace with current Pages actions and browser tests. |
| `.github/dependabot.yml` | Daily npm updates with 128 PR limit. Replace with monthly npm/Actions checks and a smaller limit. |

## Dependency decisions

Upstream runtime dependencies: `react`, `react-dom`, `clsx`, `react-draggable`,
`i18next`, `react-i18next`, `tsparticles`, `react-tsparticles`.

Keep React 18, React DOM, clsx and react-draggable. Remove i18next, particles and
audio/media code. Keep TypeScript and Sass; update Vite, React plugin and ESLint
tooling. Replace the old single utility test with Playwright checks of routing,
dialogs, commands, mobile overflow, content navigation and empty states.
`package-lock.json` records the exact installed versions. No backend, API key,
analytics, CDN script, or external font request is required at runtime.

## Why React/SCSS (option A)

Keeping the source component structure preserves the actual template's behavior
and SCSS mechanics. A static-HTML rewrite would discard the working draggable
window and component implementation. Vite builds six HTML entry points sharing
one JS/CSS bundle; hosting remains entirely static.

The five public routes each have an actual `index.html`. Navigation uses native
links and full page loads. There is no SPA history dependency and no fake-200
fallback. A genuine `404.html` displays a recovery screen for missing records.
The static test server intentionally does not implement SPA fallback.

## Visual mapping

- Keep full-screen background, left heading, left vertical menu, small labels,
  lightweight hover, floating draggable window, close button, raised tabs and
  beveled buttons.
- Change menu labels to HOME / LIFE / STUDY / PROJECTS / ABOUT / CONSOLE.
- Move menu down and keep the content window to its right so personal text does
  not cover navigation. Smaller screens stack the same menu above the window.
- Set Tahoma/Verdana/system fallbacks, mostly 10–14px text, orange `#ff9c00`,
  olive panel `#4c5844` and inset `#303a2b`.
- Remove upstream rounded corners and backdrop blur; use 1px light/dark borders.
- Replace game artwork with original low-contrast CSS architecture and texture.

## Content integrity

Preserve the existing site's name, role, interests, languages, first daily log
and study topics. The existing email, CV, Project Alpha, Old Experiment and
Summer Notes were placeholders. Do not invent contact details, completed work,
travel, photos or papers: show unavailable fields and empty archive categories.
The learning checklist is a session-local scratch list, labeled accordingly.

## Deployment handoff

The existing repository uses legacy Pages deployment from `main:/`. This change
requires **Settings → Pages → Source → GitHub Actions** before merging, then the
included workflow builds and deploys `dist/`. Verified permissions for the
available CLI account `DoWhatULove0121`: `pull=true`, `push=false`, `admin=false`.
A fork PR is therefore the publication route; the repository owner must perform
the one-time Pages setting change and merge. CI never deploys PRs or forks.
