# PRD: Notebook Interior — Canvas / Pinboard

*April 2026 · v0.5 · Refinement pass after first build*

---

## Summary

Opening the notebook reveals a **single-viewport canvas** — a graph-paper surface with objects pinned to it. All objects are visible at once, no panning. There are two types of objects:

1. **Poster card** — a large, static, typographic card (bookplate + thesis statement). Not interactive. Positioned on the left side of the canvas. This is the arrival moment — it establishes who Yankun is and what the portfolio is about before the eye moves to the work.
2. **Project cards** — clickable cards with screenshot, title, and impact line. Positioned to the right and around the poster card.

Everything lives on the same surface. The poster card is bigger than any project card but uses the same container language (border, background, padding) so it feels like part of the collection — a large card pinned alongside smaller ones, not a separate panel.

No panning. No infinite canvas. No split layout. One surface, one viewport.

---

## The canvas

### Dimensions & bounds

The canvas fills **one viewport** (`100vw × 100vh`). All objects (poster card + project cards) are visible without scrolling or panning. Positions are defined as **percentage offsets** so the layout adapts to different browser sizes (1280px through 1920px). Below 1024px wide, the layout needs a separate treatment (week-2 scope).

The background is `--paper` with a **graph-paper grid** — thin ruled lines (horizontal + vertical) at 40px intervals using `--ink-faint`. The standard grain texture overlays on top.

### No panning, no zoom

The previous prototype used a 3200×1800px pannable canvas. This is replaced with a viewport-fitted layout. The `usePanCanvas` hook is removed. Cursor is default (pointer), not grab/grabbing.

---

## Poster card

The poster card is a **non-interactive container** on the canvas. It uses the same visual language as the project cards (border, background, padding) but is larger and contains typographic content instead of a screenshot.

### Size & position

- Width: ~420–480px (roughly 1.5–2× a standard project card, slightly wider than the featured project card)
- Positioned on the **left side** of the canvas, roughly vertically centered
- It's the first thing the eye hits, then the gaze moves right to the project cards

### Container

- Background: `--paper-soft` (same as standard project cards — the poster is part of the collection, not a special class)
- Border: 1px `--ink`
- Padding: 24px (more generous than the 12px on project cards, since the content is typographic)

### Content, top to bottom

1. **Page metadata** — JetBrains Mono caption, flex row. Left: `INSIDE FRONT COVER · VOL. V`. Right: `YK · 001`.
2. **Bookplate** — a bordered sub-card inside the poster, centered. 1px `--ink` border, ~16px padding. Contains:
   - `— THIS NOTEBOOK BELONGS TO —` in JetBrains Mono caption, tracked 0.1em, centered
   - `Yankun` in Caveat (`--font-hand`), ~44–52px, centered
   - `San Francisco, 2021 – present` in Fraunces italic, ~14px, centered
3. **Thesis statement** — the poster moment. Fraunces Display, ~36–44px. Mixes bold uppercase and italic on separate lines. Placeholder copy (Yankun will rewrite): `I MAKE THE INVISIBLE` (bold) / `handleable.` (italic). The typographic treatment matters as much as the words.
4. **Page number** — JetBrains Mono caption, bottom-left of container: `p. 02`

### Behavior

- Not clickable, not focusable. It's a static typographic object.
- Participates in the entrance stagger animation (appears first, before project cards).
- `aria-hidden="false"` — screen readers should read the text content.

---

## Project cards

Every project uses **one unified card format** with a visible container. Cards sit axis-aligned by default — squared-up rectangles on the grid. The montage feeling comes from asymmetric placement and container backgrounds. Rotation is reserved for interaction states that earn it (e.g., hover enlarge), not used as a static layout move.

### Card anatomy

Each card is a **container panel** with content inside:

1. **Container** — rectangular panel with 1px `--ink` border and 12px padding. Two background treatments:
   - **Featured card (CHAI):** `--ink` background, `--paper` text (inverted — the loudest project card on the canvas)
   - **Standard cards:** `--paper-soft` background, `--ink` text
2. **Metadata bar** — top edge of the container, inside padding. JetBrains Mono caption. Figure number left-aligned (`fig. 01`), year right-aligned (`2024–2025`).
3. **Screenshot plate** — below metadata bar, full container width (minus padding). 16:10 aspect ratio. 1px ink rule border (standard) or 1px `--paper` border (featured/inverted). Two sizes:
   - **Featured:** container ~380px wide (screenshot fills ~356px)
   - **Standard:** container ~240px wide (screenshot fills ~216px)
4. **Title** — below screenshot, Fraunces. 28–32px for featured, 20–24px for standard. Color inherits from container.
5. **Impact line** — below title, JetBrains Mono caption, tracked. Short phrase. Color: `--ink-soft` on standard, `--paper-soft` on featured.

No sticky notes, no wobbly circles, no subtitle. Those live in project detail pages.

### Card hover

On hover: card lifts 4px (`translateY(-4px)`), gains a subtle drop shadow (`0 6px 12px rgba(22, 38, 94, 0.12)`), and a small arrow icon appears at the bottom-right. The hover signals "this is clickable."

### Canvas composition

All objects (poster card + project cards) are positioned using **percentage-based coordinates** (`left: %`, `top: %`) relative to the viewport. Cards are axis-aligned at rest; rotation is reserved for purposeful interaction states.

| Object | Type | Size | Background | Position (approx) |
|--------|------|------|-----------|-------------------|
| Poster card | poster | ~450px wide | `--paper-soft` | left, vertically centered |
| fig. 01 · Control Hub AI | featured | ~380px wide | `--ink` (inverted) | center-right, upper area |
| fig. 02 · Smart Search | standard | ~240px wide | `--paper-soft` | right, upper area |
| fig. 03 · Write-like-Webex | standard | ~240px wide | `--paper-soft` | center, lower area |
| fig. 04 · SAP Fieldglass | standard | ~240px wide | `--paper-soft` | right, lower area |

Positions are hand-tuned. The poster card anchors the left. CHAI (featured, inverted) is the dominant project card to its right. Standards are scattered in the remaining space — no two at the same Y-coordinate, no even spacing. The composition flows left-to-right: statement → featured work → other work.

### Journal entries & colophon (parked)

Removed from the canvas for now. Projects only.

---

## Visual composition principles

The canvas must not look like a grid portfolio. Principles:

1. **Left-to-right flow.** Poster card anchors the left. Featured project sits center-right. Standards fill the remaining space. The eye reads: who → best work → more work.
2. **Three-tier size hierarchy.** Poster card (largest, ~500px+) → featured project card (~380px, inverted, 2px border) → standard project cards (220–260px, varied). Each tier is visually distinct through size, color, and border weight.
3. **Slight rotation (±1–2°).** Cards are tilted just enough to feel hand-placed. Not enough to feel chaotic. The rotation breaks the mechanical precision of the grid.
4. **Cards as objects.** Every card has a visible container (background + border). They sit on the graph paper like specimen cards pinned to a board.
5. **Responsive graph-paper ground.** Ruled grid across the full canvas, `--ink-faint`. On card hover, nearby grid lines brighten subtly (opacity 0.08 → 0.15) — the surface reacts like real paper under pressure.
6. **Page-level typography.** Running header (`WORKS · VOL. V`) and page number at canvas margins in JetBrains Mono, `--ink-muted`. Reinforces the notebook-page metaphor.
7. **One hand-drawn mark.** A single SVG element on the canvas — an underline, arrow, or bracket near the poster card. Ink blue, 1.2–1.6px stroke, round caps, slightly imperfect path. One only. It breaks the mechanical precision and signs the composition.
8. **Negative space.** Open grid-paper between cards is intentional. The emptiness matters.
9. **No decorative clutter beyond the single mark.** No tape, pins, sticky notes, or connector lines at this level.

---

## Transitions

### Desk → Canvas (entering the notebook)

This is the signature transition. It should feel like a portal — crossing a threshold into a different space.

**Sequence:**
1. User clicks the notebook on the desk
2. Notebook cover begins swinging open (3D rotation, 600ms, `--ease-unfold`)
3. As cover passes ~45°, the camera pushes forward — desk scales away, notebook edges move past the viewport
4. Brief moment of the paper-colored interior filling the screen (100–200ms)
5. Canvas content fades in with stagger: large clusters first, then smaller ones, then environmental details. Artifacts within each cluster settle into place (subtle drop + ease-out, as if pinned to the board)
6. Camera drift settles at default position
7. Total transition: ~1000–1400ms

**Reduced motion fallback:** Cover opens (simplified, less 3D). Crossfade from desk to canvas view (300ms). No stagger, no drift.

### Canvas → Project (diving in)

**Sequence:**
1. User clicks a project cluster (any artifact in the cluster is a valid click target)
2. The clicked cluster scales up — camera zooms toward it smoothly
3. Other clusters and canvas elements fade out and drift away (parallax-like, at different speeds based on distance from clicked cluster)
4. The cluster elements rearrange/dissolve into the project detail header
5. Project detail view (vertical scroll) loads in as the transition completes
6. Total transition: ~600–800ms

**Reverse (back to canvas):**
1. User clicks a back button, presses ESC, or uses browser back
2. Project view fades, camera pulls back
3. Canvas re-emerges — clusters settle back into position
4. ~600–800ms

**Reduced motion fallback:** Crossfade between canvas and project view (300ms).

### Canvas → Journal entry

Same pattern as project, but lighter. The journal page element zooms to fill, becomes the reading view. Simpler because there's only one element (no cluster to dissolve).

### Canvas → Colophon

Same as journal. Small element zooms to fill.

---

## Project detail view (vertical scroll)

Once inside a project, the experience is a **vertical scroll** — a well-paced editorial layout freed from the two-page spread constraint.

### Structure for a full case study (CHAI)

The page scrolls vertically with these content sections:

1. **Header** — project title, subtitle, metadata (year, collaborators, outcome). Not a "hero section" — just clear information at the top. Metadata inline or as a credits line, not in a résumé box.
2. **Opening** — lead with a specific moment or observation (per voice guidelines). Body large (22px) for the first paragraph.
3. **Process section** — what didn't work, explorations, pivots. Editorial plates (screenshots with captions), pull quotes, sticky-note callouts for process artifacts. Marginalia in the margins (2–6 words, max 2 per screen).
4. **Solution section** — what shipped, how it works. Larger plates, possibly a sequence of screens.
5. **Outcome** — metrics and impact. The "3% → 18%" moment. Display type for the number, context in body text.
6. **Credits** — collaborator names, inline, not a grid.

No defined "sections" with headers like "Problem / Process / Solution / Outcome." The essay flows. Section breaks are visual (a horizontal rule, extra whitespace, a pull quote) not labeled.

### Structure for a stub

A single-screen or short-scroll view:
- Title + metric
- One paragraph summary
- One editorial plate
- A note: "Full case study coming" or similar — honest, not apologetic

### Layout

- Max width: 720px for body text (reading column)
- Plates can break wider (up to 960px or full content width for impact)
- Pull quotes span wider than body column
- Marginalia sits outside the text column (on wider screens) or inline (on narrow screens)
- Generous vertical spacing between sections (120–160px)

---

## State management

- **Canvas position:** stored in React state (not persisted). Returning to canvas from a project restores last position.
- **Current view:** URL-driven via React Router. `/` = desk, `/works` = canvas, `/works/chai` = project detail, `/journal/on-search` = journal, `/colophon` = colophon.
- **Animations:** CSS transforms + Web Animations API first. Framer Motion only if CSS/WAAPI feel limited.

---

## Accessibility

- Tab cycles through project cards in order (CHAI first, then standards). Poster card is not in the tab order (not interactive).
- Each project card is a focusable region with `role="link"` and descriptive `aria-label` (title + impact line)
- Poster card text is real text, readable by screen readers (not `aria-hidden`)
- `prefers-reduced-motion`: entrance animations become instant (no stagger, no drift)
- Focus states: 1.5px ink rule, offset 2px (per code-style rules)

---

## Technical approach

- Canvas container is `100vw × 100vh`, `position: relative`, no overflow scrolling, no panning.
- `usePanCanvas` hook is **removed**.
- Graph-paper background on the canvas: CSS `background-image` using two `linear-gradient` layers (horizontal + vertical 1px lines) at 40px intervals, colored `var(--ink-faint)`.
- All objects (poster card + project cards) are `position: absolute` with percentage-based `left` and `top` values.
- New component: `PosterCard.tsx` in `src/components/canvas/`. Pure presentational — bookplate, thesis statement, page metadata. Not interactive, not focusable.
- Card component: `ProjectCard.tsx` (replaces `ProjectCluster.tsx`). Takes `size: 'featured' | 'standard'` prop. Featured renders with `--ink` background and `--paper` text; standard renders with `--paper-soft` background and `--ink` text. Container has 1px `--ink` border and 12px padding.
- `data/projects.ts` schema: `canvasPosition` uses `{ left: string; top: string }` (CSS percentage strings). `status` renamed to `size`. `outcome` renamed to `impact`. New fields: `figNumber: number`.
- Transition between canvas and project detail: zoom + fade for v1. `startViewTransition` API as progressive enhancement.

---

## Open questions

1. **Mobile layout:** Below 1024px, the viewport-fitted layout won't work. Likely: poster card becomes a header, project cards stack vertically. Week-2 scope.
2. **Thesis statement copy:** Placeholder until Yankun writes the final statement. The typographic treatment (weight mixing, line breaks) should be designed even with placeholder text.
3. **Card image content:** Screenshots are placeholders in v1. When real screenshots arrive, visual weight may shift — positions may need re-tuning.
4. **Canvas↔project morph:** Zoom + fade is simpler than the previous cluster-dissolve concept. Revisit if it feels flat.
