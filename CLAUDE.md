# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio for Yankun, a senior product designer. The site is built around one object, the **Field Notebook**, in three layers:

1. **Homepage** (`/`, "01 · Monograph"):
   - The name "Yankun / *Wang*" is set at poster scale in Fraunces, and each letter's weight and softness follow the cursor.
   - The Field Notebook, a 3D book, stands in front of the name. It tilts toward the cursor, and its shadow falls away from it, as if the cursor were a lamp.
   - A four-line index sits beside it: Works, Résumé (PDF), About, Email. It answers the cursor like the page around it:
     - Its rules are strings, like the top rule: crossing one plucks it, and a fast sweep strums all five.
     - Each label's letters swell under the cursor, like the name.
     - The row's rule inks outward from where the cursor came in.
     - Each arrow moves the way it points.
     - Pointing at Works cracks the notebook's cover.
   - The notebook *is* the navigation: there is no nav bar.
2. **Works** (`/works`): the same notebook, open.
   - The left page holds the contents, one ruled row per project, each with a one-line caption under its title.
   - Pointing at a row turns it into a solid object: a navy band with the row stamped on it in paper, which slides from row to row.
   - The right page shows the plates as a contact sheet until the reader points at a title. Then that one plate grows out of its thumbnail with its notes: a summary, at most two figures, and a facts line on the page's foot (`notes` in `data/projects.ts`).
   - `/` and `/works` are one route, `HomeRoute`. The URL decides whether the book is open, and the book animates between the two.
   - On phones (≤ 900px) the works page is a single-column list.
3. **Project detail** (`/works/:slug`, the case study): a vertical-scroll editorial layout, long-form and well paced.

The portfolio itself is a product demonstration.

**Design evolution:**
- Field Notebook was selected over Liner Notes.
- The paginated book was replaced by the desk + canvas + vertical scroll model.
- In November 2026 the desk and canvas were replaced by the Monograph homepage and the open-notebook works page.

See `00-brief/decisions-log.md` (2026-11-11 entries). The prototypes and the asset prompts are in `03-prototype-explore/homepage-awwwards/`. `prd-homepage-desk.md` and `prd-notebook-canvas.md` describe the retired desk and canvas.

The Field Notebook prototype (in `03-prototype-explore/`) established the visual language. That language (colors, typography, editorial plates, grain) is locked. The display format has evolved beyond it.

## Design source of truth

`00-brief/vibe-guideline.md` is the canonical reference for all visual and voice decisions. Consult it before making any design, styling, or copy decisions.

Key constraints from the guideline:
- Two-color palette only: ink blue (`--ink: #16265e`) on warm off-white (`--paper: #f4f1ea`)
- Typography: Fraunces (display + body), JetBrains Mono (metadata), Caveat (marginalia placeholder)
- No CSS frameworks, no Tailwind, no component libraries — plain CSS with design tokens is part of the craft demonstration
- Motion is weighted and paper-like. Respect `prefers-reduced-motion`: the notebook's open and close become a short cross-fade. No scroll-jacking.
- 12-column grid (1280px max, 24px gutter, 60px margin) for the homepage and project detail pages.
- Notebook cover ("Settle"):
  - Paper-coloured type stamped on navy cloth: "Field Notebook", "Selected work", "2020–2026".
  - One line, a damped spring that draws itself in.
  - No edition number, no "Vol.", no name on the cover: the homepage already sets the name at poster scale.

## Repository structure

Design assets and planning live at the root. The deployable site lives in `site/`.

- `00-brief/` — Design briefs, vibe guideline, architecture plan (not deployed)
- `01-content/` — Raw case study writing as markdown drafts (not deployed)
- `02-assets/` — Design assets: illustrations, exports, source files (not deployed)
- `03-prototype-explore/` — Early HTML prototype explorations (not deployed, reference only)
- `04-reference/` — Visual references: Mary Kim zine, Jackie Zhang, type specimen (not deployed)
- `site/` — The Vite + React project (deployable)

## Build and development

The site uses **Vite + React + TypeScript** as a single-page application.

```bash
cd site
npm install
npm run dev          # Local dev server (Vite HMR)
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

TypeScript strict mode for all code. Self-hosted fonts (woff2) with `font-display: swap`.

## Deploy

Live at **https://yankun.design** (also `https://yankun-portfolio.pages.dev`). Hosted on Cloudflare Pages, project `yankun-portfolio`. DNS is at Cloudflare.

**Deploys are manual.** Cloudflare's dashboard "Connect to Git" flow has a known OAuth pairing bug on this account — the GitHub App installs cleanly, but Cloudflare's callback fails to pair, so there is no auto-deploy on `git push`. Every deploy goes through Wrangler from local.

### Workflow

After making changes, from the repo root:

```bash
cd site
npm run build
npx wrangler pages deploy dist --project-name=yankun-portfolio --branch=main --commit-dirty=true
cd ..
git add .
git commit -m "<your message>"
git push
```

Build + Wrangler ships the live site. `git push` updates the GitHub repo. They are independent — running one does not trigger the other. Order is not strict, but deploying before pushing is the cleaner habit: a failed build gets fixed before a commit lands.

### Wrangler auth

First-time use opens a browser OAuth flow to Cloudflare; stays logged in ~30 days. If `wrangler` reports `Failed to fetch auth token`, run the command again — it retries via OAuth automatically.

### Future fix

Retry the dashboard git-connect flow occasionally — the OAuth bug tends to clear after several days. Pages → yankun-portfolio → Settings → Builds & deployments → "Connect to Git." If it succeeds, auto-deploy on push starts working and the Wrangler step becomes optional. If it errors, a GitHub Actions workflow with a Cloudflare API token is the backup. Decisions captured in `00-brief/decisions-log.md` under the 2026-05-10 entry.

## Image assets

Images in `site/public/` use two formats depending on usage:

**WebP at q=85** for the notebook (`notebook/`: cover board, open spread, ribbon) and other textures or hero objects. These load on the homepage, so weight matters.
- The cover is 1200px wide (it is never shown wider than about 540 CSS px).
- The full-size generated PNGs live in `03-prototype-explore/homepage-awwwards/assets/`. They are not deployed and not in git.

**PNG** for `canvas/mockups/*` (the project plates on the works page) and `images/*` (case study screenshots). These are kept lossless so text and fine UI stay crisp at zoom.

Each mockup also has a light copy in `canvas/thumbs/` (640px-wide WebP at q=85, same name). The works page's contact sheet shows the copies; the full PNG loads for the raised plate once the book is first opened, and for the phone list. A new mockup needs its copy made too (`mockupThumb` in `data/projects.ts`).

Where an older WebP has its original PNG beside it in `site/public/`, that PNG is kept so you can revert: swapping `.webp` for `.png` in the source is a one-line change.

When adding a new image:
- Mockup tile, case study screenshot, anything where pixel fidelity at zoom matters → PNG
- Anything else (textures, plates, illustrations, hero objects) → WebP at q=85

## Architecture (site/src/)

- `styles/`: `tokens.css` (design tokens), `reset.css`, `typography.css`, `global.css`.
- `routes/HomeRoute.tsx`: the homepage and the works page, mounted for both `/` and `/works` (see `App.tsx`). It stays mounted across the two so the notebook can animate between them. It holds the name, the index, the About photo, and the URL-to-book sync. Esc closes the book.
- `components/notebook/`:
  - `Notebook.tsx`: the 3D book (pages, cover, shadows, ribbon, Close tab, click-outside-to-close).
  - `SettleCover.tsx`: the front board.
  - `NotebookContents.tsx`: the works spread.
  - `MobileContents.tsx`: the works list on phones.
- `components/project/`: project detail (vertical scroll, plate and reading layouts). Control Hub Workflows (slug `control-hub-agentic`, project 01) and the Control Hub AI Assistant (`chai`, 02) use the notebook layout: shared pieces in `NotebookCase.tsx` and `NotebookCase.module.css` (running head, opener, chapter marks, a four-step type scale), and every screen on a board (`ClothBoard.tsx`): the cover's navy cloth for dark screens, paper for light artwork with its own mat or labels. Pages: `ControlHubAgenticNotebook.tsx`, `ChaiNotebook.tsx`. Their v3 pages stay at `?v=3`; references in `00-brief/references/agentic-case-study-v4/`.
- `components/shared/`: reusable pieces (`Grain`, `FigCaption`, ink filters, the wash tuner).
- `interactions/`:
  - `notebookEngine.ts`: a plain class that drives the book. It works from two numbers, camera `t` and cover `p`, and writes transforms straight to the DOM.
  - `useNotebook.ts`: the thin hook around the engine.
  - Plain classes for per-frame work:
    - `monographPointer.ts`: the homepage's lamp, tilt, name, rule and “Open →”.
    - `monographIndex.ts`: the homepage index (its strings, letters and ink), run from the pointer's frame loop.
    - `pluckedLine.ts`: a hairline that rings like a string when the cursor crosses it (the top rule and the index's rules).
    - `cursorLabel.ts`: labels that replace the cursor.
    - `plateFlight.ts`: the works plate that grows from its thumbnail.
    - `contentsStamp.ts`: the navy band on the works contents.
  - Hooks:
    - Pointer and selection: `useMonographPointer`, `useTrailingPeek`, `useContentsSelection`, `useContentsStamp`, `useFollowLabel`, `usePlateFlight`, `usePlateLoop`.
    - Helpers: `useInputModality`, `useMediaQuery`.
  - `useReducedMotion`.
  - `motion.ts`: easing and tween.
- `data/projects.ts`: project metadata (titles, years, subtitles, mockups, external links). `data/notebook.ts`: the notebook's geometry and asset paths.
- CSS Modules (`*.module.css`) for component-scoped styles.

Engine-style animation code lives in plain classes, not in hook bodies. The strict React hooks lint rules reject refs read or written during render.

## v1 scope

**In:**
- Monograph homepage with the Field Notebook.
- Works page (the open notebook). The contents list `contents` from `data/projects.ts`: every project not marked `inContents: false`. The contact sheet shows every project. Build with AI is a plate on the sheet, unnumbered, with no contents row; on phones it comes last in the list, unnumbered.
- Case studies.
- CV page.
- About page.
- Journal pages.
- Colophon.
- 404 page.

Note: Smart Search was retired from the canvas in v0.7. It remains a *proof beat inside* the CHAI case study (`smartSearch` in `chaiContent.ts`); it is no longer a top-level project.

**Out:** Essays/writing section, side projects, contact form (email link only), dark mode, resume page content, about-me page content.

## Hard rules

- No placeholder lorem ipsum — stub with real titles and short real paragraphs, or flag as needing content
- No AI-generated prose for case studies — content in `01-content/` is written by Yankun
- Screenshots are full-color editorial plates (1px ink border, mono caption below) — never duotoned, never full-bleed
- Handwriting font (Caveat) is a v1 placeholder — will be replaced with real handwriting before ship
- Marginalia is 2–6 words max, never more than 2 per screen
- The notebook opening is the signature moment — invest craft here.
- Works page:
  - Nothing is pre-selected; a highlighted default reads as a mistake.
  - Pointing at a row never moves its left edges. The row becomes the navy band, and its title grows a little from its left edge.
  - Each row has a one-line caption (`caption` in `data/projects.ts`, about 50 characters at most), in Yankun's words.
  - The raised plate's notes use only real figures and Yankun's words, from the case study or the live project. Never invent a metric.
  - No "FIG." labels.
  - Mono labels are at least 11px.
- Close controls attach to the thing they close (the tab on the book's fore-edge, the paper around it, Esc), never a distant button.
- Graphic devices (lines, patterns, marks) follow one stated construction rule (geometry, physics, a grid). Random-looking gestures are out.
- Prototypes in `03-prototype-explore/` must work when opened straight from disk (`file://`): plain `<script src>`, no ES module imports, no image masks.
