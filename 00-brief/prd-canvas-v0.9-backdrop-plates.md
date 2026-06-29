# PRD: Canvas v0.9 — Notebook Backdrop + Floating Editorial Plates

*2026-06-14 · v0.9 · Refined plan, pre-build. Supersedes the canvas surface defined in `prd-canvas-v0.8-notebook.md` / `prd-notebook-canvas.md`.*

---

## Goal

Keep the opened notebook as a full-browser background stage, but free the project cards from the notebook's two page slots. Cards become independent, larger, scrollable editorial plates laid *over* the notebook. The notebook scales to viewport height and crops against the top and bottom edges. CHAI regains hero weight. Each plate leads with its outcome, carries a status chip, and reads as a frosted glassine sleeve that clarifies on interaction.

This is the answer to four problems in the shipped v0.8.1 canvas: the forced 2×2 symmetry, the single-viewport (no-scroll) spread, the buried metrics, and the absence of status signals.

---

## What changes from v0.8.1 (and what that reverses)

v0.8.1 locked the canvas as a centered open-notebook spread with four equal-weighted projects printed *inside* two page slots (`NotebookSpread` → `NotebookPage` → `ProjectRow`). v0.9 reverses two of those calls deliberately:

- **Notebook becomes a backdrop, not a container.** Cards no longer live in page slots; they float on the paper over a fixed, cropped notebook image. The notebook is staging and texture, not a frame.
- **CHAI regains hero status.** v0.8.1 accepted equal weighting "for compositional simplicity." v0.9 restores hierarchy — CHAI is the clear primary plate.

Both reversals are logged in `decisions-log.md` (2026-06-14). What carries over unchanged: the two-color system, Fraunces/JetBrains Mono type, the SpotlightDotGrid + Grain background, the close-affordance navigation loop, and the desk→canvas transition *contract* (see §3).

---

## Locked decisions (resolved with Yankun before build)

1. **Frosted sleeve, monochrome.** Plates read as translucent glassine sleeves: the mockup sits softened behind a paper-toned frost at rest, then clarifies and lifts on hover/focus. Strictly `--paper` + `--ink`. **No tint, no gradient bloom** — we take the *material and behavior* of sulfuric-acid paper, not the colored print of the reference samples. (Alternatives rejected: tinted frost — breaks the two-color lock and drifts toward generic AI-gradient; chrome-only glassine — weaker, doesn't give the plates their identity.)
2. **Outcome-first.** The metric/outcome is the loudest non-title line on each plate. Per the guideline, a metric highlight may use ink-blue at heavier weight — that is the one sanctioned emphasis.
3. **Status chips.** Every plate carries a typographic mono-caps status pill (`SHIPPED`, `FULL CASE STUDY`, `IN PROGRESS`, `EARLIER WORK`) with a 1px ink rule. No icons (guideline: UI chrome is typographic).
4. **Notebook as deliberate stage, not wallpaper.** At least one or two plates must *acknowledge* the backdrop — cross the center fold, cast a soft shadow into the crease — so the notebook reads as intentional staging rather than a random photo behind content.

---

## Architecture — split background from content

Refactor `/works` into two layers. The notebook image becomes background-only; content scrolls over it.

```
CanvasRoute
├─ NotebookBackdrop        fixed, full-height open-notebook image, non-interactive
│                          carries data-transition-source="spread"
├─ CanvasCloseButton       above content, unchanged affordance
├─ ProjectIndexCanvas      scrollable 12-column editorial layout
│   ├─ CanvasIntro         note / section caption (cols 1–5)
│   └─ ProjectPlate ×4     featured | main | standard variants
└─ SpotlightDotGrid + Grain
```

`NotebookSpread` (image + two page slots) is retired from this route. Its image becomes `NotebookBackdrop`; its `NotebookPage` / `ProjectRow` children are replaced by `ProjectPlate`.

Likely files:
- `site/src/routes/CanvasRoute.tsx` + `CanvasRoute.module.css`
- `site/src/components/canvas/NotebookSpread.tsx` → `NotebookBackdrop.tsx` (or repurpose)
- `site/src/components/canvas/ProjectPlate.tsx` + `ProjectPlate.module.css` (new; replaces `ProjectRow` on canvas)
- `site/src/components/canvas/NotebookPage.tsx` — retired from this route
- `site/src/data/projects.ts`
- `site/src/components/transition/NotebookTransition.tsx`

---

## 3. Transition contract — the highest-risk integration point

The desk→canvas transition rotates the desk's notebook cover open and lands it on the canvas spread geometry. **This is the only thing in the redesign that can actually break.** Two endpoints must stay in agreement:

- **Open** (fires from desk): lands the cover on `computeOpenCoverRect(computeCanvasSpreadRect())`.
- **Close** (fires from `/works`): reads `readSourceRect('spread') ?? computeCanvasSpreadRect()`.

Required work:

1. **Move `data-transition-source="spread"` onto `NotebookBackdrop`.** Close measures this element; if it's missing or wrong, the close animation has no target.
2. **Rewrite `computeCanvasSpreadRect()`** to the new full-height geometry so open and close agree:
   ```
   height = 100svh (or near)
   width  = height * SPREAD_ASPECT          // SPREAD_ASPECT = 2600/1812 ≈ 1.435
   left   = (vw - width) / 2                 // horizontally centered; may be negative (crop)
   top    = (vh - height) / 2 ≈ 0            // crops top/bottom when width > vw forces scale
   ```
3. **Keep the page-ratio constants stable** (`SPREAD_PAGE_TOP_RATIO`, `SPREAD_PAGE_BOTTOM_RATIO`, `SPREAD_LEFT_PAGE_WIDTH_RATIO`). They're ratios *of* the spread rect, so the binding-half target scales correctly with the larger rect — the spine stays at the rect's horizontal center.
4. **Watch the "balloon" case.** With a larger-than-viewport rect, the rotating cover endpoint is also larger than viewport. Verify it doesn't read as a zoom-out-from-nothing on close. If it does, cap the *effective* rect used for the cover endpoint to a sensible max while letting the backdrop image itself crop freely.
5. **Test open AND close** at every breakpoint — the plan must not validate open alone.

---

## 4. Scroll behavior

`/works` scrolls again. **No parallax** (guideline bans it): the backdrop is `position: fixed` and *does not move* — a held stage, not a parallax layer. Do not add any scroll-speed offset.

```
.canvas
  min-height: 100svh
  overflow-x: hidden
  overflow-y: auto
  background: var(--paper)

NotebookBackdrop
  position: fixed
  inset: 0
  height: 100svh
  width: auto (height * SPREAD_ASPECT), centered
  pointer-events: none
  z-index: 0

ProjectIndexCanvas (content)
  position: relative
  z-index: 2
  max-width: 1280px
  margin: 0 auto
  padding-block: enough to float clear of the notebook crop
  12-column grid, 24px gutter, 60px margin (desktop tokens)
```

**Contrast guard:** full-color screenshots and ink text must stay legible over the notebook photo. Add a subtle paper wash / scrim between backdrop and content, or let the backdrop fade toward center, so WCAG AA holds. Verify against the busiest region of the notebook image.

---

## 5. `ProjectPlate` component — frosted sleeve

Replaces `ProjectRow`. Size variants map to the existing tier ladder (`size: 'featured' | 'main' | 'standard'`):

- `featured` — CHAI. Large hero plate, strongest outcome treatment.
- `main` — Control Hub Agentic.
- `standard` — Build with AI, SAP Fieldglass.

Each plate renders:
```
status chip        mono-caps pill, 1px ink rule
fig number + year
title              Fraunces display (size by variant)
context sentence   one line, Fraunces
outcome / proof    loudest non-title line; ink-blue heavier weight
role               museum-label caption
mockup image       inside the frosted sleeve
hover affordance   "open case study" cue on hover/focus
```

### Frosted-sleeve behavior

- **At rest:** mockup sits behind a `--paper`-toned translucent veil (`backdrop-filter: blur(...)` + low-opacity paper). Softened, not hidden.
- **On hover/focus:** frost recedes to 0, the full-color plate snaps clear with its 1px ink rule, the card lifts. This *is* the guideline's hover-enlarge / paper-lift gesture.

### Accessibility guardrails (non-negotiable)

- The reveal fires on **keyboard focus**, not hover only.
- `prefers-reduced-motion`: **cross-fade** the frost, no lift (mirrors the existing reduced-motion posture in `ProjectRow`).
- **No hidden desktop-only proof** (scope rule): title, status chip, and outcome live on **paper, outside** the frosted area — always legible, never behind the veil.
- On **mobile/touch** (no hover): frost defaults light enough to read the mockup without interaction, or resolves on scroll-into-view.

### Performance

`backdrop-filter` blur is the one thing that can dent the Lighthouse-95 target. Four plates is fine. Keep blur off any scroll-driven property; bake the resting blur and animate only opacity where possible. Profile if the canvas feels heavy.

---

## 6. Data schema — extend, don't duplicate

`projects.ts` already has `size`, `canvasTier`, `canvasOutcome`, `canvasContext`, `mockup`, `role`, `year`, `impact`. **Do not add a parallel `canvasStatus` / `canvasProofs` / `canvasImageSize` set on top of these.** Consolidate:

- Rename `canvasTier` → `canvasStatus` (it already holds "Full case study", "AI direction", "Earlier enterprise" — these become the status chip).
- Add `canvasTags: string[]` (e.g., `["Enterprise AI", "Cisco Webex", "Shipped"]`).
- Promote `canvasOutcome` to `canvasProofs: string[]` (first entry is the headline metric, e.g. `"3% → 18% adoption"`; allow a second like `"86% no-result drop"`).
- **Reuse `size`** for plate weight; do not introduce `canvasImageSize` unless image-crop genuinely diverges from card weight (it doesn't today).
- Retire the dead 12-col placement fields (`colStart`, `colSpan`, `gridRow`, `alignVertical`) that the v0.8.1 spread already superseded — or repurpose them for the §7 layout if we choose data-driven placement.

---

## 7. Editorial layout (desktop, 12-col)

Loose plates over the notebook, intentionally asymmetric, CHAI dominant:

```
Intro note      cols 1–5

CHAI            cols 1–8,  hero plate, strongest outcome treatment
Agentic         cols 8–12, offset lower/right          (note: 12-col max — span to 12, not 13)
Build with AI   cols 2–6,  medium
SAP Fieldglass  cols 7–12, medium-wide
```

Plates may cross the center fold or extend past page boundaries — that's the "laid over a notebook" intent, not a bug. At least one crossing should be deliberate per locked decision #4.

---

## 8. Responsive

- **Desktop:** full notebook backdrop, cropped by viewport. 12-col scrollable layout. CHAI hero.
- **Tablet:** 8-col (or softened 12-col). Notebook stays as background texture. Plates wider, less staggered.
- **Mobile:** single-column plate list. Notebook backdrop faint/cropped, or disabled if it hurts readability. All project info present — no hidden desktop-only proof.

**Consolidate the fallback.** CanvasRoute currently renders a separate `.fallback` single-column list *alongside* the spread. Fold that into the responsive single-column behavior of `ProjectPlate` so there is **one** content path, not two to maintain.

---

## 9. Motion

- Notebook transition lands into the full-height backdrop (§3).
- Plates enter with the existing staggered "placed on paper" choreography (carry the `rowPlace`-style entrance; keep the `CONTENT_ENTER_DELAY_AFTER_TRANSITION` handoff so no empty frame shows).
- Hover/focus lifts the plate and clears the frost; can reveal a proof note.
- Respect `prefers-reduced-motion` throughout.

---

## 10. Verification

After implementation:
- `npm run build` — clean, no type errors (`tsc --noEmit`).
- Desktop checks: `1440×1000`, `1280×720`, `1728×1117`.
- Mobile check: `390×844`.
- Verify:
  - notebook touches/crops top and bottom;
  - plates are not clipped by old page bounds;
  - page scroll works; backdrop stays fixed (no parallax drift);
  - **close transition still returns to desk cleanly** (open AND close tested);
  - CHAI reads as the clear primary project;
  - frost clears on hover *and* keyboard focus; reduced-motion cross-fades;
  - outcome metric and status chip legible on paper over the busiest part of the notebook (WCAG AA);
  - Lighthouse 95+ holds with `backdrop-filter` in play.

---

## Open questions (resolve during build)

1. **Backdrop legibility treatment** — paper scrim vs. center-fade vs. lowered backdrop opacity. Pick whichever passes contrast with the least loss of notebook material.
2. **Data-driven vs. CSS-driven placement** — keep §7 layout in CSS (simpler, fewer fields) or revive the column fields in `projects.ts` for data-driven placement. Lean CSS unless a second project set is coming.
3. **Frost strength on mobile** — exact resting blur/opacity that reads without hover. Tune in device check.

---

## Build sequencing (recommended)

1. New `ProjectPlate` (frosted sleeve, status chip, outcome-first) + consolidated data shape, on a scrollable `/works` with a static `NotebookBackdrop`. Ship and review the *content* layer first.
2. Wire the transition geometry last (§3) and verify open + close at all four breakpoints.
3. Log the build outcome + any deviations in `decisions-log.md`.
