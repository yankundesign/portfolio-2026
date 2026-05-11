# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio for Yankun, a senior product designer. The site is built around a **desk-and-notebook** metaphor with three layers:

1. **Desk scene** (homepage) — an angled, perspective view of a workspace surface with physical objects: a notebook (→ works), a folded paper (→ resume), and a personal object (→ about). Objects are draggable. The desk *is* the navigation — no nav bar.
2. **Canvas / works** (works) — opening the notebook reveals a 12-column editorial plate where projects sit as hand-composed plates with museum-label captions. Same plate system as the desk's 8-col grid, denser column count. Static asymmetry comes from column-span variation, aspect-ratio variation, and vertical baseline alignment within row tracks. Rotation is available as an interaction and compositional tool when it earns its place (e.g., hover enlarge, peeking artifacts). Vertically scrollable spread.
3. **Project detail** (case study) — clicking a project cluster zooms in and opens a vertical-scroll editorial layout. Long-form, well-paced, freed from the two-page spread constraint.

The portfolio itself is a product demonstration.

**Design evolution:** Field Notebook was selected over Liner Notes. The paginated book format was then replaced with the desk + canvas + vertical scroll model to make the experience more interactive and less like a digital magazine. See `00-brief/decisions-log.md` and `00-brief/prd-homepage-desk.md` / `00-brief/prd-notebook-canvas.md` for full rationale.

The Field Notebook prototype (in `03-prototype-explore/`) established the visual language. That language (colors, typography, editorial plates, grain) is locked. The display format has evolved beyond it.

## Design source of truth

`00-brief/vibe-guideline.md` is the canonical reference for all visual and voice decisions. Consult it before making any design, styling, or copy decisions.

Key constraints from the guideline:
- Two-color palette only: ink blue (`--ink: #16265e`) on warm off-white (`--paper: #f4f1ea`)
- Typography: Fraunces (display + body), JetBrains Mono (metadata), Caveat (marginalia placeholder)
- No CSS frameworks, no Tailwind, no component libraries — plain CSS with design tokens is part of the craft demonstration
- Motion is weighted and paper-like. Respect `prefers-reduced-motion`. No scroll-jacking. The canvas has shallow spatial depth (not parallax in the scroll-hijacking sense)
- 12-column grid (1280px max, 24px gutter, 60px margin) for canvas and project detail pages. Desk uses an 8-col plate grid. The plate chrome (column rulings, plate metadata, register marks, fig captions) is shared across all surfaces — same system, different column counts.

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

Deploy target: Vercel or Cloudflare Pages, root directory `site/`, build output `dist/`.

TypeScript strict mode for all code. Self-hosted fonts (woff2) with `font-display: swap`.

## Architecture (site/src/)

Per `00-brief/architecture-plan.md`:

- `styles/` — `tokens.css` (design tokens), `reset.css`, `typography.css`, `global.css`
- `components/desk/` — Desk scene: `DeskScene.tsx` (3D perspective container), `NotebookCover.tsx`, `ResumePaper.tsx`, `AboutObject.tsx`, `DeskSurface.tsx`
- `components/canvas/` — 12-col editorial plate (works): `Canvas.tsx` (grid container with intro paragraph + section captions), `ProjectCard.tsx` (column-spanned plate + museum-label caption), `MetaCard.tsx` (currently + colophon, fixed bottom-right)
- `components/project/` — Project detail (vertical scroll): `ProjectHeader.tsx`, `ProjectBody.tsx`, `MetricDisplay.tsx`, `PullQuote.tsx`, `Credits.tsx`
- `components/shared/` — Reusable: `EditorialPlate.tsx`, `Marginalia.tsx`, `StickyNote.tsx`, `Grain.tsx`, `Transition.tsx`
- `interactions/` — React hooks: `useDraggable.ts`, `usePanCanvas.ts`, `useDeskToCanvas.ts`, `useCanvasToProject.ts`, `useImageOverlay.ts`, `useReducedMotion.ts`
- `routes/` — Route components that wire together components and data
- `data/projects.ts` — Project metadata (titles, dates, credits, cluster positions)
- CSS Modules (`*.module.css`) for component-scoped styles

Components organized by concern: `desk/` for the homepage scene, `canvas/` for the works pinboard, `project/` for case study detail, `shared/` for reusable pieces. Interactions are React hooks.

## v1 scope

**In:** Desk scene homepage (notebook object functional, resume + about as placeholders), canvas (12-col editorial plate) with four project plates — CHAI, Control Hub Agentic, Write-like-Webex, SAP Fieldglass — full CHAI case study (vertical scroll), stubbed case studies for the other three, two journal pages, colophon, 404 page.

Note: Smart Search was retired from the canvas in v0.7. It remains a *proof beat inside* the CHAI case study (`smartSearch` in `chaiContent.ts`); it is no longer a top-level project.

**Out:** Essays/writing section, side projects, contact form (email link only), dark mode, resume page content, about-me page content.

## Hard rules

- No placeholder lorem ipsum — stub with real titles and short real paragraphs, or flag as needing content
- No AI-generated prose for case studies — content in `01-content/` is written by Yankun
- Screenshots are full-color editorial plates (1px ink border, mono caption below) — never duotoned, never full-bleed
- Handwriting font (Caveat) is a v1 placeholder — will be replaced with real handwriting before ship
- Marginalia is 2–6 words max, never more than 2 per screen
- The desk-to-canvas portal transition is the signature moment — invest craft here
- Canvas cards live on a 12-col editorial plate. Positions are hand-composed via column spans + row tracks in `data/projects.ts`, never computed by a layout algorithm. No off-grid placement at rest.
- The canvas's static compositional asymmetry comes from column-span variation, aspect-ratio variation, and vertical baseline alignment within row tracks. Cards sit axis-aligned by default. Rotation is permitted when it earns its place — e.g., a plate tilting up on hover, an artifact peeking out — but is never the default static layout move. Scattered placement and graph paper backgrounds remain retired.
