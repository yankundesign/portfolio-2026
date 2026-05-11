# PRD: About Page

*April 2026 · v0.1 · Initial spec*

---

## Summary

The About page is the third surface in the system, after the desk (homepage) and the canvas (works). It opens when the user picks up the polaroid object on the desk. The content is short — ~95 words, three paragraphs — because the CV, the case studies, the polaroid caption, and the colophon are already doing biography, work, personality, and craft-story respectively. The About has one job: the paragraph that ties them together.

The page is a **viewport-fitted editorial plate** in the same chrome system as the desk and canvas (plate metadata, register marks, column ruling, bleed frame). On the plate sits a single hero polaroid — the same object lifted from the desk — with three short text paragraphs to its right. A casual scatter of three secondary polaroids occupies the lower band of the page. All four polaroids are photo placeholders; image windows stay ink blue until real photos go in.

No scroll. One composition. The polaroid does the interaction work.

---

## Why this concept

- **Continues the desk metaphor.** The polaroid lifted from the desk lands on a fresh page. Same physical object, scaled up. The user has "picked it up."
- **Distinct from canvas and CV.** Canvas = editorial plates of work. CV = Mary Kim typographic editorial. About = plate + photo + short copy. Three different formats, one shared chrome system.
- **One object carries the interactivity.** Flip, tilt, hover-lift. The page itself stays quiet because the polaroid is the vehicle.
- **Honors the v0.4 plate register.** No handwriting. All annotations and captions are JetBrains Mono. Consistent with decisions-log item 5.

---

## Layout

12-column grid, viewport-fitted, no scroll. Same chrome as canvas (plate meta top-left/right, column numbers across the top, register marks at corners + center, bleed frame, plate meta bottom-left/right).

```
┌──────────────────────────────────────────────────────────────────┐
│ EDITORIAL PLATE — 03    [columns 1 … 12]    FORMAT: W × H PX     │
│ ABOUT                                       DATE: 26 / 04 / 2026  │
│ SYSTEM: 12 COLUMN GRID                                            │
│  ┼ ─────────────────────────────────────────────────── ┼          │
│                                                                   │
│   [HERO POLAROID]        I work on systems where the surface is   │
│    cols 2–5              small and the underneath is enormous —   │
│    ~340px tall           admin tools, AI assistants, the kind of  │
│    flips on click        software with a thousand settings and    │
│    tilts on cursor       no front door…                           │
│                                                                   │
│    fig. 06 — about       [three short paragraphs, cols 7–11,     │
│                          Fraunces 22 / 1.5]                      │
│                                                                   │
│                                                                   │
│        ┌─────┐                  ┌─────┐                          │
│        │     │   ┌─────┐        │     │                          │
│        │ P2  │   │     │        │ P4  │                          │
│        │     │   │ P3  │        │     │                          │
│        └──┬──┘   │     │        └─────┘                          │
│      fig. 07     └─────┘       fig. 09                           │
│                  fig. 08                                          │
│  ┼ ─────────────────────────────────────────────────── ┼          │
│ GRID SYSTEM                              YANKUNUX@GMAIL.COM →     │
│ COLUMNS: 12                              TURN POLAROID FOR NOTES  │
│ GUTTER: 24 PX                                                     │
│ MARGIN: 60 PX                                                     │
└──────────────────────────────────────────────────────────────────┘
```

---

## Hero polaroid

### Source

Same polaroid asset as the desk, scaled up. Image window remains ink blue (`#16265e`) — this is the photo placeholder. Tape pinned at the top-left corner. Slight in-plane rotation (~3°).

### Size & position

- **Height:** ~340px (roughly 2× the desk version)
- **Columns:** 2–5
- **Vertical:** centered in the upper two-thirds of the plate

### Caption strip

Bottom of the polaroid (the cream caption strip on the print itself). Typeset, not handwritten — `--font-mono`, 11px, `--ink-soft`, tracked 0.1em, slightly off-center. Content: `SELF-PORTRAIT · 2026`. (Replaces the earlier "Caveat handwriting" plan; honors the no-handwriting decision.)

### Figure caption (below the polaroid, on the page)

Standard plate caption: `fig. 06 — about` in `--font-mono`, 11px, `--ink-soft`. Hairline above and below.

### Interactions

1. **Cursor tilt.** ±4° 3D transform on each axis, damped follow of the cursor position. Same hook as the desk's tactile hover.
2. **Flip on click.** Click (or Enter when focused) flips the polaroid on the Y-axis, 600ms, `cubic-bezier(0.4, 0.0, 0.2, 1)`. The back is blank cream paper with one typeset annotation block (see *Back of polaroid* below). Click again to flip back.
3. **Hover lift.** ~6px Z-translate + 1.02 scale on hover, 160ms ease-out. Combines additively with the cursor tilt.

### Back of polaroid

The back is cream paper (`--paper`) with a single block of typeset annotation, top-left. Three lines, mono:

```
LOC.   SAN FRANCISCO, CA
DATE   APRIL 2026
NOTE   [one real fragment from Yankun]
```

Replaces the previously-proposed Caveat handwritten note. Reads as a darkroom print stamp on the back of a developed photo. The `NOTE` line needs Yankun's real one-line annotation (open question).

---

## Polaroid coda (scatter)

Three smaller polaroids at the bottom of the page, dropped in a casual scatter — same physical metaphor as photos thrown down on a desk page.

### Spec

- **Count:** 3. More starts to feel like a hobby grid; fewer reads thin.
- **Size:** 180–220px tall. Clearly secondary to the hero (~340px).
- **Rotation:** different per polaroid, e.g., −6°, +3°, −1°. Hand-laid, not symmetrical.
- **Position:** cols 4–12, lower band of the plate. Each polaroid slightly overlapping its neighbor like a stack pushed apart by a thumb.
- **Tape:** vary tape position (top-left, top-right, top-center) so they don't read as identical units.
- **Image window:** ink blue placeholder, same as the hero. All four windows stay ink blue until real photos go in.
- **Caption strip on each polaroid:** typeset mono, 9–10px, 2–4 word fragment per polaroid.

### Caption voice

Captions are fragments, not labels. Per voice rules, the captions should NOT categorize the polaroids ("I love X"). They are date/place fragments, like film-roll metadata.

- ✓ `STUDIO 2 · 2010`
- ✓ `SF · APR 2026`
- ✓ `FIRST REVIEW`
- ✗ `ARCHITECTURE SCHOOL` ← reads like a folder name
- ✗ `ME COOKING` ← hobby-list energy
- ✗ `TRAVELING` ← LinkedIn

### Figure captions (below each polaroid, on the page)

`fig. 07`, `fig. 08`, `fig. 09` in mono, same treatment as fig. 06.

### Interactions

- **Cursor tilt.** Same as the hero — ±4° 3D transform damped to cursor position. The whole bottom band feels alive when the user moves through it.
- **Hover lift.** ~6px Z-translate + 1.03 scale + small drop shadow on hover, 160ms ease-out. Like picking the polaroid up off the page.
- **z-index on hover.** The hovered polaroid jumps to the top of the stack so it's never partially hidden under another.
- **No flip in v1.** The flip interaction stays exclusive to the hero polaroid. Coda polaroids are visual + tactile only.

---

## Page text

Three short paragraphs, Fraunces 22 / 1.5, cols 7–11. From `01-content/about.md` (Draft A):

> I work on systems where the surface is small and the underneath is enormous — admin tools, AI assistants, the kind of software with a thousand settings and no front door. Most of what I do is making that underneath legible. CHAI is the work I'd point at first.
>
> I came to product design from architecture. I kept the part about thinking in floor plans. I let go of the part where you wait eight years to see anything stand up.
>
> I'm in San Francisco, looking for a small team where design and build aren't different jobs.

No header above the copy. The plate's own `ABOUT` plate-meta label does the work of a heading.

No marginalia in v1. Per v0.4, marginalia is typeset mono in the chrome only — no inline annotations.

---

## Transitions

### Desk → About

The hero polaroid is a single DOM element animated from its desk position to its about-page position (FLIP technique — same node, layout transition). ~700ms paper ease (`cubic-bezier(0.4, 0.0, 0.2, 1)`). Page chrome and text fade in 200ms after the polaroid lands. The three coda polaroids drop in with a 60ms stagger, each fading + translating up 8px (200ms).

### About → Desk

Reverse. Coda polaroids fade out first (staggered, fastest first), then page chrome and text, then the hero polaroid animates back to its desk position.

### Reduced motion

- Cross-fade between desk and about (no FLIP, no stagger).
- Click on hero polaroid swaps front/back with a 200ms opacity fade instead of a flip.
- No cursor tilt anywhere.
- Polaroids stay at their resting rotation; no hover lift.

---

## Accessibility

- All polaroids have `role="button"` semantics where interactive (hero is interactive; coda v1 is decorative — image alt only).
- Hero polaroid is keyboard-focusable. Enter / Space triggers the flip. Focus state: 1.5px ink rule, 2px offset.
- Back-of-polaroid annotation is real text in the DOM (not baked into an image), so screen readers read both states.
- Coda polaroids are decorative in v1 — `aria-hidden="true"` with empty `alt=""`. Promote to interactive only when v2 gives them content.
- Page text uses `rem` units. Color contrast meets WCAG AA at the chosen sizes.
- `TURN POLAROID FOR NOTES` hint copy is a real DOM string in the bottom-right plate meta, not a tooltip.

---

## Components & hooks

```
components/about/
  AboutPage.tsx          — route, plate chrome wrapper, layout
  AboutPolaroidHero.tsx  — large polaroid, flip + cursor tilt
  AboutPolaroidBack.tsx  — back-of-polaroid annotation block
  AboutPolaroidCoda.tsx  — small polaroid for the scatter (3 instances)
  AboutText.tsx          — three-paragraph copy block

interactions/
  useFlip.ts             — flip state, keyboard handler, reduced-motion fallback
  reuse: useDraggable's tilt subset, useReducedMotion
```

Reuse the existing `EditorialPlate` chrome wrapper. Plate metadata: `EDITORIAL PLATE — 03 / ABOUT / SYSTEM: 12 COLUMN GRID` top-left.

---

## Routing

`/about` — add to the React Router config alongside `/cv`. Linked from the desk's polaroid object (already labelled `fig. 03 — about`).

---

## Photo placeholder strategy

Four photo windows in v1:

1. Hero polaroid image window
2. Coda polaroid 1 image window
3. Coda polaroid 2 image window
4. Coda polaroid 3 image window

All four stay ink blue (`#16265e`) until real photos arrive. When a real photo goes in, replace the CSS background of that window only — no markup change. Each window keeps the subtle emulsion-grain texture from the source PNG.

---

## Out of scope (v1)

- A second photo format (non-polaroid, e.g., torn-edge print). Start with all polaroids for visual coherence; add format variation in v2 only if the page reads monotonous.
- Coda polaroid flip / lightbox enlarge. Flip stays exclusive to the hero in v1.
- Marginalia on the page. Per v0.4 chrome rules — typeset mono only, no inline annotation.
- Mobile layout. Deferred with the broader v1 mobile decision.
- Real photos in any window. The window placeholders are the v1 deliverable; photos land later.
- Scroll behavior. Page is one viewport-fitted composition; if content grows past viewport, that's a v2 conversation.

---

## Open questions

1. **Back-of-polaroid `NOTE` line.** Needs one real fragment from Yankun. Examples to react to: `THE FRONT-DOOR PROBLEM` / `BUILDING THE NEXT THING` / `NO TITLE YET`. What's the line?
2. **Scatter caption fragments.** Three real date/place fragments, one per coda polaroid. Examples to react to: `STUDIO 2 · 2010` / `SF · APR 2026` / `FIRST REVIEW`. What are the real ones?
3. **Scatter count.** 3 feels right; 4 would give more visual rhythm but risks crowding. Hold at 3?
4. **Contact line at bottom-right.** Email only (`YANKUNUX@GMAIL.COM →`), or email + one social handle?
5. **Polaroid hint copy.** `TURN POLAROID FOR NOTES` in the bottom-right plate meta — necessary scaffolding, or trust hover discovery? Recommend keeping; the affordance is non-obvious without it.
6. **Coda interaction in v2.** Should the coda polaroids ever be flippable / clickable, or stay decorative permanently? Decision for later; flag now.

---

## Build sequence (suggested)

1. **Route + chrome.** Add `/about` route. Wire `EditorialPlate` chrome with About plate metadata. Stub layout grid.
2. **Hero polaroid (no interactions).** Render the hero polaroid asset with its caption strip and figure caption. Verify column placement.
3. **Hero flip.** Build `useFlip` hook. Wire click + Enter. Implement reduced-motion fallback.
4. **Hero cursor tilt.** Wire the tilt subset of `useDraggable`. Verify damping feels paper-like.
5. **Page text.** Wire the three-paragraph copy block from `01-content/about.md`.
6. **Coda polaroids.** Render three smaller polaroids with rotations, tape positions, and figure captions. Hover lift + cursor tilt.
7. **Desk → About transition.** FLIP-style layout transition for the hero polaroid identity across routes. Stagger coda entrance.
8. **A11y pass.** Keyboard, screen reader, focus states, reduced-motion fallback.
9. **Screenshot review with Yankun.** Confirm before merging.
