# wzhang.xyz — CLAUDE.md

## What This Is
Personal website for William Zhang, hosted on GitHub Pages at wzhang.xyz. Pure HTML/CSS/JS — no framework, no build tool, no dependencies. All pages are self-contained or use shared extracted files.

## Stack & Hosting
- Static HTML/CSS/JS only
- GitHub Pages (CNAME set to wzhang.xyz)
- No package.json, no bundler, no server

## Architecture

### Refactoring target
The current codebase duplicates a large CSS block and the entire sprite-engine JS across every page. These should be extracted into:
- `shared.css` — all shared styles (base, nav, buttons, cursor, sprite classes, page-content layout)
- `sprite-engine.js` — the bug/anteater animation system
- Each page then uses `<link rel="stylesheet" href="shared.css">` and `<script src="sprite-engine.js"></script>`

**Note**: `style.css` exists but is from an abandoned design direction (white background, Georgia font). It is not used anywhere and should be deleted.

### Page structure
- `index.html` — landing page: centered two-column layout, name left / nav right
- Interior pages: fixed site name left, fixed nav right, scrollable `.page-content` in the middle

### Sprite system
Every page has an interactive bug/anteater feature:
- "bug" button (bottom right): click to enter placement mode, click screen to spawn animated bugs
- "clear" button: places an anteater that hunts and eats bugs
- Sprites are SVG spritesheets in `sprites/`: `hand_spritesheet.svg`, `anteater_spritesheet_small.svg`, `bug_spritesheet_recolor.svg`
- Keep this feature on all pages unless explicitly told otherwise

## Design System
- Background: `#000`
- Primary text: `#fff`
- Secondary/muted text: `#777`
- Accent/links: `#5ecfca` (teal), hover `#8ddeda`
- Font: `'Courier New', Courier, monospace`, 12px
- Nav underline offset: 2px
- Interior page padding: `48px 60px 48px 200px` (leaves room for fixed left name)
- Mobile breakpoint: 600px

## Pages & Content Plan

### `index.html` — Landing
- Tagline: TBD (placeholder comment exists)
- Email: TBD (currently commented out as `wzhang at wzhang dot xyz`)
- Nav: about · work · side quests (dropdown: reading, writing, thoughts, activities)

### `about.html`
- Bio, photo, and personal text
- Content will be provided via uploaded documents and Q&A — do not fabricate

### `work.html`
- Professional history, current role, relevant projects/deals
- Content will be provided — do not fabricate

### `reading.html`
- Book list with ratings and notes
- Possibly integrated with Goodreads — TBD
- Format TBD; likely table or list with title, rating, brief note

### `writing.html`
- Published pieces, articles, thesis, prose, poetry
- Each entry should link out or display inline as appropriate
- Content will be provided

### `thoughts.html`
- Diary-style, short-form hot takes and observations
- Closer to a blog than an essay page
- Entries are brief; tone can be casual within the site's overall voice

### `activities.html`
- Catch-all for things outside work/writing: meditation retreat, travel, physics projects, sports, hobbies, motorcycle riding, etc.
- Format flexible — could be a list, cards, or narrative entries

## Tone & Voice
- Public-facing: needs to work for professionals, friends, and internet strangers
- Aim: professional credibility with charm, quirkiness, and humor
- Avoid: politically charged language, anything that could read as offensive or careless
- The retro aesthetic (black screen, monospace, pixel sprites) already signals personality — writing doesn't need to overcompensate

## Content Workflow
- William will provide content by uploading documents, pasting text, or answering questions
- Never fabricate biographical details, job history, or opinions
- When adding content, match the existing voice of surrounding text
- Ask if tone or structure is unclear before writing

## Pending / Placeholders
- Tagline on `index.html` (`<!-- tagline -->`)
- Email on `index.html` (`<!-- wzhang at wzhang dot xyz -->`) — display once decided
- All page content bodies are empty stubs
- Goodreads integration for reading list: TBD
