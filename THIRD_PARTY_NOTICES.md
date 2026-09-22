# Third-party notices

## half-life-screen

- Upstream: https://github.com/arlagonix/half-life-screen
- Reviewed revision: `8b5913b0dc1727d9ed003e2c599d812cf1092985`
- Author: Alexander Gorbunov (arlagonix)
- License: MIT
- Copyright (c) 2023 Alexander Gorbunov

The original copyright, permission notice and disclaimer are preserved verbatim in
`LICENSE` and `public/licenses/half-life-screen-MIT.txt`. The latter is included
in the deployed website at `/licenses/half-life-screen-MIT.txt`.

This website directly adapts the upstream source files listed below:

| Upstream file | Adaptation in this repository |
| --- | --- |
| `src/pages/HalfLifeScreen/index.tsx` | Same component location; background, left title, vertical menu and chosen-window composition. Personal navigation replaces game actions. |
| `src/pages/HalfLifeScreen/index.module.scss` | Same location; full-screen backdrop, left alignment, 14px vertical menu and 8px spacing retained; typography and placement adjusted for personal content. |
| `src/components/Modal/index.tsx` | Same location; react-draggable title-handle wrapper, header, close control and child content; adds nodeRef, bounds, resize recovery and dialog semantics. |
| `src/components/Modal/index.module.scss` | Same location; window flex structure, blackBox, custom scrollbar, header and button-group styles; opaque olive skin, square bevel borders replace rounded translucent gray. |
| `src/components/Button/index.tsx` | Same location; original prop API, clsx, disabled logic and button structure, with explicit button type. |
| `src/components/Button/index.module.scss` | Same location; original 1px bevel and reversed pressed state, dimensions and layout; colors and font adapted. |
| `src/components/Modal/SettingsModal/TabsList.tsx` | Same location; Graphics/Audio selector generalized into reusable category buttons. |
| `src/components/Modal/SettingsModal/index.module.scss` | Same location; original raised active tab, borders, panel layout and spacing; olive colors and system fonts. |

All personal content, Console command handling, content modules, CSS background
scene, favicon, routing entry points, tests and deployment configuration are new
or adapted from the pre-existing personal site. Modifications are documented in
`docs/UPSTREAM_REVIEW.md`.

## Excluded assets and trademarks

No upstream game screenshots, chapter images, achievement icons, background
images, Valve video/logo, Half-Life logo, music, sound effects or bundled fonts
are redistributed in this repository or its deploy artifact. The original
abstract background is CSS geometry and a CSS texture, not a game screenshot.
The JZ favicon and monogram are original. Tahoma/Verdana are requested as
locally installed system fonts; no font binaries are served.

Half-Life, GoldSrc and Valve names are used only to describe the visual reference.
This personal website is not affiliated with or endorsed by Valve.

## Runtime dependencies

npm dependencies retain their own notices in the installed packages:
React / React DOM (MIT), clsx (MIT), react-draggable (MIT).
Vite preserves legal comments in generated bundles. Exact versions and transitive
dependencies are recorded in `package-lock.json`.
