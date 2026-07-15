# wzhang.xyz — CLAUDE.md

## What This Is
Personal website for William Zhang, hosted on GitHub Pages at wzhang.xyz. Pure HTML/CSS/JS — no framework, no build tool, no dependencies. All pages are self-contained or use shared extracted files.

## Stack & Hosting
- Static HTML/CSS/JS only
- GitHub Pages (CNAME → wzhang.xyz), deploys from `main`. A push to `main` publishes the live site.
- Repo: github.com/wzhang99/wzhangxyz-website
- No package.json, no bundler, no server

## Architecture

### Shared files (extracted — done)
Shared styles and JS live in two files that every page links:
- `shared.css` — all shared styles (base, nav, breadcrumb, buttons, cursor, sprite classes, page-content layout)
- `sprite-engine.js` — the bug/anteater animation system
- Each page uses `<link rel="stylesheet" href="shared.css">` and `<script src="sprite-engine.js"></script>`
- Pages nested in a subfolder (e.g. `activities/<project>/`) reach these with `../../shared.css` / `../../sprite-engine.js`
- `shared.css` references sprites via `url('sprites/...')`, which resolves relative to the CSS file (root), so sprites work from any page depth

### Page structure
- `index.html` — landing page: centered two-column layout, name left / nav right. No breadcrumb.
- Interior pages: header (site name left, nav right) → **breadcrumb** → `.page-content`
- **Breadcrumb** (`.breadcrumb`, replaces the old `.page-title`): `home > section [> page]`. Ancestor
  segments are clickable links; the current page is plain grey. Landing page has none. On every interior page.

### Sprite system
Every page has an interactive bug/anteater feature:
- "bug" button (bottom right): click to enter placement mode, click screen to spawn animated bugs
- "clear" button: places an anteater that hunts and eats bugs
- Sprites are SVG spritesheets in `sprites/`: `hand_spritesheet.svg`, `anteater_spritesheet_small.svg`, `bug_spritesheet_recolor.svg`
- Keep this feature on all pages unless explicitly told otherwise

## Folder & URL conventions
- **Pages are flat at the root** as `<section>.html` (about.html, work.html, thesis.html, ...). This
  keeps clean public URLs (wzhang.xyz/thesis.html) — thesis is conceptually a child of writing but is a
  clean root file.
- **Section assets / sub-pages live in a clean-named folder** matching the section: `about/`, `writing/`,
  `activities/`. These were renamed from the old `content - <section>/` folders — folder-name spaces
  produced ugly `%20` public URLs, so clean names → clean URLs. (Empty `content - reading/`, `content - work/`,
  `content - activities/` were deleted.)
- A **multi-page sub-project** gets its own nested folder, e.g. `activities/manhattan-gps-watch/` with an
  `index.html` + sibling pages; the parent page links to `.../index.html`.

## Design System
- Background: `#000`
- Primary text: `#fff`
- Secondary/muted text: `#777`
- Accent/links: `#5ecfca` (teal), hover `#8ddeda`
- Breadcrumb: 12px; links teal `#5ecfca`, separator `>` in `#555`, current segment `#777`
- Font: `'Courier New', Courier, monospace`, 12px
- Nav underline offset: 2px
- Interior page padding: `48px 60px 48px 200px` (leaves room for fixed left name)
- Mobile breakpoint: 600px
- **Text is selectable** everywhere; `user-select: none` is applied only during bug placement (`body.placing`)

## Pages & Content Plan

### `index.html` — Landing
- Tagline: TBD (`<!-- tagline -->` placeholder)
- Email: TBD (`<!-- wzhang at wzhang dot xyz -->`)
- Nav: about · work · side quests (dropdown: reading, writing, thoughts, activities)

### `about.html`
- Bio + photo (`about/IMG_2273.jpeg`) + links (thesis). Has real content. Do not fabricate.

### `work.html` — stub (content will be provided; do not fabricate)
### `reading.html` — stub (book list; format TBD)
### `writing.html` — entries; links to `thesis.html` (`.writing-entry` pattern)
### `thoughts.html` — stub (diary-style short takes)

### `activities.html`
- Catch-all for things outside work/writing: physics projects, hobbies, side projects, etc.
- Entry format mirrors `writing.html`: `.activity-entry` (title link + right-aligned `.activity-meta`).
- Multi-page projects live in a clean subfolder `activities/<project>/`.
- Current entries: **manhattan gps watch** → `activities/manhattan-gps-watch/`

## Manhattan GPS Watch (activities entry)
- A GPS-watch software prototype: turns a live GPS coordinate into the Manhattan cross street you're on
  (plus neighborhood, Alphabet City letters, and "the suburbs" when off-island). A step toward an actual
  F-91W-style wristwatch.
- **Developed in a SEPARATE repo** (`…/Personal/manhattan-gps-watch`). Only the built, self-contained
  pages are copied here — do NOT develop the watch logic inside this website repo.
- Pages under `activities/manhattan-gps-watch/`:
  - `index.html` — project page (description + links), site-styled with breadcrumb.
  - `demo.html` — interactive Leaflet/OpenStreetMap map: draggable pin + the watch readout, grid overlay,
    locate-me. Pulls Leaflet + map tiles from the network (needs a connection).
  - `live.html` — full-screen live-GPS readout for a phone. Auto-starts GPS on load (no intro/Start
    screen), auto-scales the big readout to fit any screen width. Fully self-contained (model + coastline
    embedded).

## Tone & Voice
- Public-facing: needs to work for professionals, friends, and internet strangers
- Aim: professional credibility with charm, quirkiness, and humor
- Avoid: politically charged language, anything that could read as offensive or careless
- The retro aesthetic (black screen, monospace, pixel sprites) already signals personality — writing doesn't need to overcompensate
- Em dashes without surrounding spaces (`word—word`)

## Content Workflow
- William provides content by uploading documents, pasting text, or answering questions
- Never fabricate biographical details, job history, or opinions
- When adding content, match the existing voice of surrounding text
- Ask if tone or structure is unclear before writing

## Personal / untracked files (do NOT commit)
- `about/` and `writing/` hold personal files that are intentionally **untracked** and must never be
  `git add`-ed: resume, photos, drafts (e.g. `about/Zhang_Resume.pdf`, `about/about_draft.txt`,
  `writing/ideas for stuff i could put here.txt`, the compressed thesis PDF).
- The ONLY tracked assets in those folders: `about/IMG_2273.jpeg`, `writing/2022_Zhang_William_Physics_Thesis.pdf`.
- `archive (inactive do not reference)/` is an untracked inactive archive — leave it alone.
- When committing, stage intended files explicitly and verify personal files stay untracked.

## Learnings
- Folder names with spaces become `%20` in public URLs → always use clean folder names.
- Browser geolocation requires https; GitHub Pages provides it, so `activities/manhattan-gps-watch/live.html`
  works when hosted (it would NOT work opened as a local `file://`).
- The map demo needs a network connection (Leaflet CDN + OpenStreetMap tiles).

## Pending / Placeholders
- Tagline + email on `index.html`
- `work.html`, `reading.html`, `thoughts.html` content bodies are still stubs
