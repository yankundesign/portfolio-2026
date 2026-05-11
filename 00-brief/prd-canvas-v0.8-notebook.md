# PRD: Canvas v0.8 — Open Notebook

*April 2026 · v0.8.1 — Architecture locked*

> Replaces the v0.7 12-column editorial plate with an open-notebook spread layout. Single-spread, single-section (WORKS only). Closing the notebook is the only navigation back. No tabs, no within-canvas section switching.

---

## Summary

When the user clicks `OPEN IT` on the desk, the notebook *opens* — and what they see *is* that opened notebook. The canvas surface (works route) is a centered open spread with four project rows arranged 2 + 2 across the two pages. The metaphor pays off literally: open the notebook to see the work; close it to return to the desk.

This is **not** a return to the v0.4-retired paginated-book model. The site is still desk → canvas → project. Only the canvas surface has changed.

The early v0.8 plan included a tab system (`WORKS / ABOUT / NOTES / CONTACT`), bio paragraph in the left margin, journal-page thumbnails, and a `CURRENTLY` sticky on the spread. **All of that is cut.** The notebook is for WORKS, period. About lives at `/about` (reached from the desk). The colophon / `currently` / `this site shipped in 2 weeks` lines stay on the desk's chrome and the canvas's chrome only — not duplicated inside the notebook.

---

## What stays from v0.7

- Desk → canvas → project three-layer structure
- The four projects: CHAI, Control Hub Agentic, Write-like-Webex, SAP Fieldglass
- Project detail (vertical scroll) unchanged — keep clean, content carries the surface
- `EditorialPlate` chrome wrapping the canvas (column numbers, register marks, plate metadata, format readout, currently / site-build chrome lines)
- Two-color discipline (ink + paper)
- Voice rules unchanged
- Material-integrity rule and refined attachment rule (Decisions Log 2026-04-29)

## What changes in v0.8.1

- The 12-column grid surface inside the plate is replaced by an **open notebook spread** centered on the canvas
- Project cards transform from "editorial plate cards on a grid" into **list rows on the notebook pages** (image left, text right per row), four total — two per page
- **CHAI loses hero status.** All four projects are equal-weighted on the spread. Trade accepted: simpler composition wins over visual hierarchy here; CHAI's depth still comes through in its case study
- The intro / meta-card / bio content from the v0.7 density spec is **cut from the canvas surface entirely** — the colophon stays on chrome, the about content lives at `/about`, the journal pages are cut from v1

## What is explicitly out

- **No tabs.** No `WORKS / ABOUT / NOTES / CONTACT` tab strip on the notebook. The notebook is single-section.
- **No within-canvas navigation.** No section switching, no page-flip, no other notebook spreads.
- **No bio paragraph in the left margin.** Margin only carries the close affordance.
- **No `CURRENTLY` sticky inside the notebook.** Already on the desk chrome.
- **No top navigation bar.** The desk is the navigation.
- **No hero headline on the notebook spread.** The page header is small and editorial, not a tagline.
- **No journal pages in v0.8.** `On Search` and `On Endings` cut from v1. Revisit in v2 if the architecture finds room.
- **No realistic 3D page-curl shaders.** Open-notebook surface is composed flat with subtle paper-shadow depth.

---

## Layout

The notebook is **centered** on the canvas plate, opened to a two-page spread. The plate's underlying 12-column grid is the layout discipline; the notebook spans roughly columns 3–10 (8 columns wide), leaving a **left margin** (cols 1–2) and a **right margin** (cols 11–12) for the close affordance and the thoughts sticky note respectively.

### Anatomy of the spread

**Left page** (verso — cols 3–6 of the canvas grid):

- **Page header** at top — small mono caps section label + brief heading. Content TBD; placeholder treatment is two stacked text bars (one shorter, one longer).
- **Two project rows**, stacked vertically. Each row is one project (~120–160px tall). Anatomy per row:
  - Mockup thumbnail on the left (~50% of card width, square or 4:3 aspect)
  - Title (Fraunces, ~22–26px)
  - One-line description (Fraunces 14–16px italic)
  - Project number / category tag (mono caps, ~10–11px, top of the text column)

**Right page** (recto — cols 7–10 of the canvas grid):

- **Page header** at top — same treatment as left page
- **Two project rows** with same anatomy

Total: **4 projects on one spread.** Order TBD; recommend CHAI top-left (still first in reading order even without size hierarchy), then Agentic top-right, WLW bottom-left, SAP bottom-right.

### Notebook physical chrome (visible)

- Cover edges visible on both sides (dark navy cloth wraps around)
- **Elastic strap** running vertically through the gutter
- Center binding crease (subtle vertical shadow at the gutter)
- **Brass binder clip** at the top-left edge clipping the spread to the cover (refined-rule compliant: clip is genuinely holding paper)
- **Washi tape strip** across the top binding (material moment, also doing structural work)
- Page edge stack visible on the right side (other pages of the notebook implied; reads as a real book with depth)
- Soft drop shadow under the spread on the desk plate

### Side margins (outside the notebook)

**Left margin** (cols 1–2):

- A single small `close →` affordance in mono caps + arrow, at vertical mid-page. Clicking returns to the desk. **This is the entire navigation back.** No other content in the left margin.

**Right margin** (cols 11–12):

- A `THOUGHTS` sticky note pinned with washi tape at the top, with a handwritten pull-quote in Caveat-equivalent — small (~10–12 words). Voice-matched, not LinkedIn prose. Includes a small stamp / postmark mark below for material weight (per the meta-card material vocabulary from the desk pass).
- The sticky note is the canvas's marginalia entry; counts toward the ≤2-marginalia rule. Combined with the desk's `OPEN IT` and polaroid `About me`, the site is at 3 total marginalia entries across all surfaces — within scope for the multi-surface read.

---

## Closing the notebook = navigating back

The `close →` affordance in the left margin is the **only** way back to the desk from the canvas. No browser-back hijack, no escape-key handler required (browser-back works as a fallback). Clicking `close` should ideally:

- Animate the notebook closing (cover lifts back over) — same choreography as the desk → canvas open transition, played in reverse
- Routes back to `/`

Since the open transition is the signature moment, the close transition should match it for symmetry. v0.8.1 build can ship with a simple cross-fade if the reverse-cover animation isn't ready in time, then upgrade.

---

## What carries over from v0.7's density spec

The 2026-04-28 canvas density work mostly retires with v0.8.1:

| v0.7 element | v0.8.1 destination |
|---|---|
| Intro paragraph (typographic island) | **Cut.** Page headers on the notebook pages do this work, smaller. |
| Meta card (7 material moves) | **Cut.** Colophon lives on chrome; CURRENTLY on chrome. |
| Running header | Stays — `EditorialPlate` chrome holds it |
| Running footer | Stays — same |
| Section dingbat above `WORKS FROM 2023–2026` | **Cut.** Notebook page header replaces it. |
| Hairline-and-fleuron sectional break between rows | **Cut.** Replaced by the gutter / spread structure. |
| Corner register marks | Stays — chrome still carries them |
| Marginal note `← the long one` near CHAI | **Cut.** CHAI no longer has hero status; calling it out as "the long one" doesn't fit the equal-weight composition. |
| Pull-quote at plate scale | **Cut.** Lives in the right-margin THOUGHTS sticky instead. |
| Journal-page thumbnails | **Cut from v1.** |
| Fig-detail callout from CHAI | Lives in the project detail page (CHAI vertical scroll), not on canvas |
| Type specimen plate | Stayed cut |
| Sketch plate | Stayed cut |

The v0.7 density work is therefore **almost entirely superseded** by v0.8.1. The notebook surface absorbs what density was needed; the rest was solving a problem (the 12-col plate reads thin) that the new layout doesn't have.

---

## Mobile

Open notebook spread is the hardest layout to make work on a phone. v1 scope already defers mobile canvas to week 2; that deferral still holds. Acceptable v1 fallbacks:

- Single-page-at-a-time view (show only one notebook page at a time, swipe between)
- Or: plain mobile fallback (single-column project list with editorial chrome, no notebook visual on phones)

Pick one in week 2; don't block v0.8.1 desktop work on this.

---

## Implementation

### Components

New components in `site/src/components/canvas/`:

- `NotebookSpread.tsx` + `.module.css` — the centered open notebook surface; renders as a layered SVG/HTML composition (cover edges, page surfaces, binding crease, strap, page-edge stack, brass clip + washi tape at top)
- `NotebookPage.tsx` + `.module.css` — single page slot, renders left or right page content (header + 2 project rows)
- `ProjectRow.tsx` + `.module.css` — the project list row format used inside the page (mockup left, title + description right)
- `CanvasMarginNote.tsx` + `.module.css` — the right-margin THOUGHTS sticky with handwritten pull-quote, washi tape, and stamp
- `CanvasCloseButton.tsx` + `.module.css` — the left-margin `close →` affordance

Existing components to update or retire:

- `Canvas.tsx` — keeps `EditorialPlate` chrome wrapper; **removes** the v0.7 grid + intro paragraph + section captions + project plate slots; mounts `<NotebookSpread />` at center, plus `<CanvasCloseButton />` and `<CanvasMarginNote />` in the side margins
- `MetaCard.tsx` — **retire.** Its content is now on chrome only; the inside-notebook `CURRENTLY` is cut. Component can be deleted from the canvas surface (still referenced from project detail if applicable; check before deleting).
- `ProjectCard.tsx` — **retire from canvas.** No longer used here. Could be repurposed as `ProjectRow` if useful, or deleted.
- `SpotlightDotGrid.tsx` — keep or retire. Probably retire — the notebook fills enough of the surface that the dot grid won't be visible.

### Data

- `data/projects.ts` schema:
  - **Drop:** `colStart`, `colSpan`, `gridRow`, `alignVertical`, `aspect` (v0.7 grid placement). All four projects render in equal rows; no per-project layout data needed.
  - **Add:** `mockup` (small thumbnail path), `category` (mono caps tag for the row), `order` (1–4 for spread placement)
  - **Drop:** `projectGroups` export entirely (the spread is the grouping)
  - **Drop:** `size` field (`featured` / `main` / `standard` no longer applies — all equal)

### Tokens

Possibly add tokens for:
- Notebook cover (cloth navy — slightly different from `--ink`?)
- Strap (slightly darker than cover)
- Page edge (`--paper-shadow`-derived)
- Binding crease shadow

### Choreography

Two transitions to design:

- **Open** (desk → canvas): cover lift + portal. Already in scope as the signature moment.
- **Close** (canvas → desk): cover lower (reverse of open). v0.8.1 can ship with a cross-fade fallback if the reverse animation isn't ready; upgrade later.

Both transitions respect `prefers-reduced-motion` with a dignified static fallback (cross-fade, not instant cut).

---

## Implementation tracks

### Track A — Sketch lock-in (one more pass)

Lock the open questions below before any code is written:
- Notebook identity moves (page numbers, section labels, marginalia *inside* the spread). Yankun's mockup shows the page header bars but doesn't yet specify what those headers say.
- Order of projects on the spread (recommend CHAI top-left, then reading-order)
- Project row layout: image left + text right confirmed; alternating L/R image position rejected (consistency wins)

### Track B — Build (after Track A locks)

1. Build `NotebookSpread` shell with cover edges, strap, binding crease, page edge stack, clip + washi as static elements
2. Build `NotebookPage` slot + `ProjectRow` row component
3. Build `CanvasCloseButton` and `CanvasMarginNote` for the side margins
4. Wire `Canvas.tsx` — keep `EditorialPlate`, drop v0.7 grid, mount notebook spread + side margin elements
5. Update `data/projects.ts` schema; remove obsolete fields
6. Implement close transition (cross-fade for v1; cover-lower upgrade later)
7. Mobile fallback (week 2)
8. Retire dead components: `MetaCard`, `SpotlightDotGrid`, `ProjectCard` (if not repurposed)

---

## Open questions (small, non-blocking)

1. **Notebook page headers — what do they say?** Each page header in Yankun's mockup is two stacked text bars suggesting a small section label + brief heading. Recommend: left page top reads `NOTE / 001 — WORKS` (mono caps small) over a one-line italic Fraunces description (`A short collection of works in AI, enterprise, and content systems.`). Right page top reads `SELECTED WORKS` (mono caps, no description below). Keeps the notebook reading like a real notebook without hero-headline drift.
2. **Right-margin THOUGHTS pull-quote text.** Yankun's mockup uses a placeholder. Voice-matched real text needed before build. ≤12 words. Recommend something like: *"The work is in the spread, not the cover."* — but Yankun should write the real one.
3. **Close transition.** Cross-fade for v0.8.1 ship, with reverse-cover-lower upgrade in a follow-up?

---

## Out of scope (deferred or cut)

- Mobile canvas layout (week 2)
- Page-flip mechanics (no need with single spread)
- Tab navigation (cut)
- Journal pages on canvas (cut from v1)
- Bio paragraph in left margin (cut)
- `CURRENTLY` sticky inside notebook (cut — already on chrome)
- Per-row hover affordances on project rows (cursor cue + 1px rule treatment — defer until rows are in)
- Reverse-cover-lower close animation (defer; cross-fade in v0.8.1)

---

**Source:** Conversation 2026-04-29. References: ChatGPT-generated mood image (`Option 2` open-notebook spread); Yankun's two iterative low-fi mockups of the canvas spread (the second adding `close →` left margin and `THOUGHTS` sticky note in right margin). Architecture decisions locked in this session.
