# PRD: Homepage — Desk Scene

*April 2026 · v0.4 · Swiss editorial plate register — current*

> **Status:** v0.4 supersedes v0.3.x. The Swiss editorial-plate section below is the current spec. The v0.3.2 content is preserved below as history and should not be implemented from. When in doubt, this section wins.

---

## v0.4 — Swiss editorial plate

### Thesis

The homepage is no longer "studio at midnight, paused mid-work." It is an **editorial plate** — a printed specimen sheet, in the register of a Swiss modernist product catalog or a Pentagram editorial layout. The scene is still a desk with objects; the wrapper around it changes. Information-forward, gridded, deadpan, type-led. Every object snaps to the column grid. The chrome — plate metadata, column numbers, register marks, grid-system label, `fig.` captions — is visible and load-bearing, not decorative.

The feeling is: a published plate in a book of design specimens, where each object is numbered, captioned, and placed for the reader's benefit. The portfolio's voice stays personal (the Currently slot, the Yogurt Roulette, the writing in case studies). The *frame* becomes impersonal on purpose. That tension is the register.

**The reconciliation with the Field Notebook spine:** the objects on the desk are still field-notebook objects (notebook, cards, pen, roulette). The wrapper around them is editorial plate. "Field-notebook objects presented as editorial plate specimens" is the through-line.

### What changes from v0.3.x

Scrap:
- The "scene assembles over 2.5 seconds" composing sequence. Objects appear already placed, aligned to the grid, on load.
- Ambient light (the warm highlight rectangle with cursor-reactive drift). The plate register doesn't admit atmospheric lighting.
- Parallax without tilt. Objects sit on the grid. They don't drift.
- Cover-lifts-on-hover, elastic-slackens, notebook breathing, CV corner-curl, per-object micro-personalities. Objects are static.
- The cursor-reactive dot grid repulsion. The background grid is now plate ruling, not a bullet-journal pattern.
- Hidden marginalia proximity reveal. Marginalia (if any survives) becomes typeset mono in the chrome, not handwritten reveals.
- The specimen card that pops above the roulette after a spin.
- Caveat handwriting anywhere — removed from tokens and rules.
- The tipped-in paper label card on the notebook cover. The label is printed directly on the cover in the asset.
- Folded-paper CV, handwritten "about" card. Both become flat typeset editorial cards.

Keep:
- Two-color palette: `--ink` / `--paper` and softer variants.
- Fraunces + JetBrains Mono. (Caveat goes.)
- The five desk objects: notebook (→ works), CV card (→ /cv), about card (→ placeholder), pen (prop, non-interactive), Yogurt Roulette (personal tell).
- The notebook → canvas portal transition. This is still the signature moment.
- The Yogurt Roulette interaction — but deadpan (see *Interaction model* below).

### Chrome system (the whole site inherits this)

The editorial-plate chrome extends beyond the homepage. Canvas, CV, and case study pages all render inside the same `EditorialPlate` wrapper. Each page supplies its own plate metadata; the chrome geometry is identical.

Chrome elements, all rendered on every page:

- **Top-left plate meta** — three small mono lines, `--ink-soft` at 70% opacity.
  - Line 1: `EDITORIAL PLATE — 0N` (plate number per page; the desk is `01`).
  - Line 2: plate title, e.g., `DESK OBJECTS` on homepage, `WORKS` on canvas, `CURRICULUM VITAE` on /cv.
  - Line 3: `SYSTEM: 8 COLUMN GRID` (or the grid system that page uses).
- **Top-right plate meta** — two small mono lines, `--ink-soft` at 70% opacity.
  - Line 1: `FORMAT: [W] × [H] PX` (viewport format descriptor).
  - Line 2: `DATE: DD / MM / YYYY` (today's date, or last-edited).
- **Column number row** — across the top, just below the plate meta. Small mono numerals (`1` through `8` on homepage) aligned to each column's centerline. Connected by tick marks to faint vertical ruling lines that descend through the content area.
- **Register marks** — crosshair-in-circle SVG marks (technical register-mark vocabulary from offset printing) positioned at the four corners of the content area and at the top-center and bottom-center. Ink at `--rule-plate-strong`. Decorative but mean it.
- **Bleed frame** — a faint full-width dashed or solid rule at `--rule-plate`, describing the plate's content bounds, 60px inside the viewport on desktop.
- **Bottom-left plate meta** — small mono lines: `GRID SYSTEM / COLUMNS: 8 / GUTTER: 24 PX / MARGIN: 60 PX` (the real grid system of the page).
- **Bottom-right plate meta** — page-specific annotation. On the homepage, two small mono lines replace the generic annotation:
  - Line 1: `CURRENTLY — [one sentence]` (reused from the canvas meta card slot per `portfolio-scope.md`).
  - Line 2: `THIS SITE · DESIGNED AND SHIPPED IN 1 WEEK WITH CLAUDE CODE. COLOPHON →`.
  - Other pages can show `ALL OBJECTS ALIGNED TO GRID`, `PAGES 01 / 12`, or similar deadpan annotations.
- **`fig. 0N — name` captions** — each object gets a small mono caption beneath it, aligned to its column, with a short horizontal ink rule between the caption and the object. The caption is the object's affordance — hovering the object underlines the caption, not the object itself. The caption is also the hit area extension: tab-focus lands on the object, but the label under it is read as the text equivalent.

### Objects on the desk (v0.4)

All objects are generated as illustrated assets (raster first, traced to SVG). The render register for every object except the cats is **flat Swiss graphic**: solid planes of color, no hatching, no engraving, no stippling, no gradients, no photographic highlights, no drop shadows. The cats on the Yogurt Roulette disc are the one deliberate exception — engraved/stippled specimen-plate style — the single textural contrast in the composition.

Column assignments on the 8-column desktop grid:

| Object | Columns | Caption |
|---|---|---|
| Yogurt Roulette | 1–2 | `fig. 05 — yogurt roulette` |
| Notebook | 3–5 (center, 3 cols) | `fig. 01 — field notebook` |
| CV card | 6–8 (upper right) | `fig. 02 — cv` |
| About card | 6–7 (lower right, under CV) | `fig. 03 — about` |
| Pen | 7–8 (lower right, next to about) | `fig. 04 — pen` |

Fig. numbering is stable (01 notebook, 02 cv, 03 about, 04 pen, 05 roulette) and inherited from the specimen-plate convention: the primary object is fig. 01, adjacent editorial matter follows, the personal tell gets the last number.

**01 Notebook.** Flat deep ink-blue cover with gently rounded corners. A paper-colored rectangular label is printed on the upper third of the cover: `FIELD NOTEBOOK` in tight mono, a thin rule, `VOL. V — COMPOSITIONS FOR COMPLEX SYSTEMS` beneath. A subtle elastic band on the right edge. No cloth texture, no engraving, no highlights. Click → canvas (portal transition, see below).

**02 CV card.** Landscape warm-paper card with flat paper color. Typeset entirely in ink blue: `CURRICULUM VITAE` label, thin rule, then `YANKUN WANG / SENIOR PRODUCT DESIGNER / — / HELLO@YANKUN.INFO / — / SAN FRANCISCO, CA` in left-aligned mono. Click → `/cv`.

**03 About card.** Smaller portrait warm-paper card. Typeset: `ABOUT` label, thin rule, then a 3–4 line short block in mono, with one word emphasized in bold. Click → placeholder route (v1 stub).

**04 Pen.** A single thin fineliner drawn as flat graphic — solid ink-blue barrel, small clip, fine nib, tiny reversed-out mono label `0.5 FINELINER` on the barrel. Lies horizontally in column 7–8, under the about card. Non-interactive prop.

**05 Yogurt Roulette.** Circular paper disc, 160mm diameter on the column grid. Thin outer rule, ink-triangle pointer at 12 o'clock, eight equal pie segments divided by radial ink rules. Each segment contains a small **engraved-style** hand-drawn Yogurt in a different pose — this is the single textural element in the composition, the deliberate break from the Swiss flatness. A small circular central label with a tiny metal rivet reads `CAT ROULETTE / — SPIN —` in tight mono. Click → disc rotates precisely to the next random pose, lands, the `fig. 05` caption updates with the pose name (`— lounging`, `— sleeping`, etc.). No disc scale-up. No specimen card. No overshoot on land. No handwritten caption underneath — that copy is gone.

### Interaction model (v0.4)

Deadpan. Stillness is the whole effect.

- **On load:** no composing sequence. The plate appears, already printed. A single 240ms crossfade on the content area lands the scene. Reduced motion: instant.
- **Hover on an object:** the `fig. 0N — name` caption beneath the object gets a 1px ink rule underline, 160ms ease-out. The object itself doesn't move. The affordance is typographic.
- **Focus on an object:** 1.5px ink rule outline, 2px offset, on the object's bounding box.
- **Click on the notebook:** the signature portal transition. The cover lifts off the plate and the canvas fades up behind it (600–800ms, `--ease-unfold`). The plate chrome *does not* fade — it updates in place (plate number 01 → 02, title `DESK OBJECTS` → `WORKS`, fig. captions swap). This continuity is what makes the editorial-plate metaphor land across pages: the reader is turning plate leaves in one bound book, not teleporting between scenes. Reverse: ESC or a close affordance reverses the cover-and-chrome gesture.
- **Click on CV card:** 240ms crossfade, chrome updates, `/cv` loads inside the plate.
- **Click on about card:** same, to the placeholder route.
- **Click on the Yogurt Roulette:** the disc rotates to the next pose. One precise gesture: 600ms, `--ease-out`, single rotation (180°–420° range depending on target pose), no scale, no overshoot. The caption updates. Click is disabled during rotation.
- **Parallax, ambient light, cursor-reactive marginalia, idle-state reveals:** all gone. The plate is still.

### Typography in the chrome

All chrome text uses `--font-mono` (JetBrains Mono), `--text-caption` (11px), tracked 0.12–0.18em depending on hierarchy, `--ink-soft` at 60–80% opacity. Uppercase for labels, mixed-case only for data strings (dates, email addresses, filenames). Caveat is fully removed; no handwriting anywhere on the page.

### Responsive

Plate chrome adapts:
- **Desktop (≥1280px):** full chrome — column numbers, all four corner blocks, register marks at 6 positions.
- **Tablet (768–1279px):** column number row hides. Corner blocks keep plate meta + format/date + grid-system + annotation. Register marks reduce to 4 corners only.
- **Mobile (<768px):** further simplification. Plate number + title in a top bar. Single bottom bar with date + annotation. No column numbers, no register marks. Objects stack vertically; `fig.` captions sit above each object. The desk metaphor degrades to "plate of objects, read top-to-bottom."

Mobile detail deferred to implementation. Known hard problem.

### Accessibility

- Every interactive object has `role="button"` and a descriptive `aria-label` ("Open notebook to view projects").
- The `fig.` caption is the visual affordance AND the text equivalent; screen readers read the caption as the label.
- Tab order: notebook → CV → about → roulette. Pen is excluded from tab order (prop, not a portal).
- Enter / Space activates the focused object.
- Focus state: 1.5px ink rule, 2px offset.
- `prefers-reduced-motion`:
  - Portal transition becomes a 240ms crossfade (chrome still updates in place).
  - Roulette rotation becomes instant; caption updates with a 240ms crossfade.
  - No other motion remains to reduce.
- All color contrast meets WCAG AA.

### Scaffold delivered in this pass

- `00-brief/prd-homepage-desk.md` v0.4 section (this one).
- `00-brief/decisions-log.md` v0.4 entry with the seven decisions.
- `site/src/styles/tokens.css` — `--rule-plate`, `--rule-plate-strong` chrome tokens added.
- `site/src/components/shared/EditorialPlate.tsx` + `.module.css` — chrome wrapper. Not yet wired into routes.
- `site/src/components/shared/FigCaption.tsx` + `.module.css` — `fig. 0N — name` caption.

### Not yet done (follow-ups, sequenced)

1. Generated assets land in `site/public/plate/` (or similar): `notebook.png`, `cv-card.png`, `about-card.png`, `pen.png`, `roulette.png`, and eight individual `yogurt/{pose}.png` files. Trace to SVG at rebuild time.
2. Re-skin the desk objects: `NotebookCover`, `ResumePaper`, `AboutObject`, `Pen`, `CatRoulette` render the new assets at their column-grid positions. Delete or deprecate `AmbientLight`, `DeskDotGrid`, `DeskMarginalia`, the composing keyframes in `DeskRoute.module.css`, and the Caveat font import.
3. Wire `EditorialPlate` into `DeskRoute`. Confirm the chrome reads against the new objects before extending.
4. Extend `EditorialPlate` to `CanvasRoute`, `CvRoute`, `ProjectRoute`. Each supplies its own plate meta. The chrome geometry stays identical; only the values change.
5. Rework the notebook → canvas portal so chrome updates in place (plate meta transitions value, not position).
6. Update `.claude/rules/design-tokens.md` (drop Caveat row, add plate tokens), `00-brief/vibe-guideline.md` (drop handwriting tier, drop marginalia handwritten variant), and `CLAUDE.md` project-overview paragraph (reframe: editorial plate presenting field-notebook objects).
7. Write the `CURRENTLY — …` sentence. One line, 10–14 words, first-person, concrete. (Needs Yankun's input.)
8. Reduced-motion + accessibility pass.
9. Visual QA against `04-reference/swiss-modernist.png`.

### Resolutions (2026-04-24)

1. **Canvas column count.** 12 columns on canvas. Homepage stays 8. Each page supplies its own `grid` prop to `EditorialPlate`; the chrome geometry renders the right column count automatically.
2. **Notebook → canvas portal.** Plate metadata **snaps**. The cover-lift gesture still animates (600–800ms). The chrome values (plate number, title, column count, grid-system label) swap instantly at the midpoint of the cover lift. No typographic crossfade on 11px mono.
3. **Roulette stays on the desk.** It remains `fig. 05` in column 1–2. Its interaction goes deadpan per v0.4 (precise rotation, no scale, no specimen card, no overshoot). The personal-tell move doesn't migrate into the chrome.
4. **Homepage CV card renders the generated asset verbatim.** The card on the desk shows the real typeset content (name, role, email, location) as printed in the generated asset. It is both a visible specimen and the click target for `/cv`.
5. **Currently line.** `CURRENTLY — Building something fun.` Short, first-person-adjacent, unpolished. Holds the slot; swap later.

### Open (new, minor)

- Exact chrome-swap timing for the portal transition (40% of cover lift? 50%?). Tune when wiring.
- Whether the plate's column numbering on the homepage stays at 8 or matches canvas at 12 for visual continuity across the portal. Lean: keep 8 on homepage (matches the generated reference), accept the jump to 12 on canvas as legible — the reader understands they've turned a plate.

---

## v0.3.2 — Historical (superseded by v0.4 above)

*April 2026 · v0.3.2 · Cat Roulette: label outside disc, specimen card reveal, default caption*

---

## Summary

The homepage is a desk, not a page. The visitor arrives at a composed workspace — objects placed with care, a light catching them from the side, a sense of someone having just been there. Each object is a portal into a section of the portfolio. There is no navigation bar. The desk *is* the navigation.

The feeling: you walked into a studio at midnight. The work was paused, not finished. Something invites you to open it.

**v0.3.1 changes from v0.3:** The pen moves back to the right side of the desk as a prop — it is no longer the roulette's pointer. The roulette gains its own integrated pointer: a small ink triangle notched into the static frame at 12 o'clock, aiming inward at the selected segment.

**v0.3 changes from v0.2:** A Cat Roulette is added to the left of the notebook to balance the composition and carry one personal tell. Fidget-toy research (`00-brief/references/fidget-toys.md`) informs the spin behavior. See `00-brief/decisions-log.md` for rationale.

**v0.2 changes from v0.1:** Perspective/angled-desk dropped in favor of flat-lay. Drag-and-drop removed. Interactivity promoted from "delight layer" to design pillar. Mr. Panda's Psychologically Safe Portfolio added as reference for technique (not aesthetic).

---

## View & composition

The desk is rendered as a **flat-lay** — straight overhead view, like editorial flat-lay photography. No CSS 3D perspective, no `rotateX`, no tilt.

Depth comes from three non-tilt sources: layered drop shadows, small z-offsets between objects, and subtle cursor-based parallax drift.

**Why flat-lay.** The v0.1 angled view couldn't pay for itself without extensive depth cues (desk edges, lighting direction, shadow consistency, prop density). Flat-lay commits to the object-ness of the scene without needing the 3D illusion, and matches the zine / field-notebook register better. The reference is Kinfolk-style overhead object photography, not a simulated desk.

**Stage.** The composition lives inside a max-width 1280px stage, centered horizontally. The warm desk surface fills the full viewport; the stage stays centered and sized consistently at any window width. On very wide screens, the surface bleeds to the edges around the stage — not a gutter.

**Material.** Paper-fiber / linen grain on the desk surface, distinct from the document paper used in case studies. Subtle — only visible on close inspection. A faint vignette at the outer edges suggests the scene is framed, not infinite.

---

## Objects on the desk

Three primary objects plus one secondary prop.

### 1. The notebook → Works

A closed field notebook — ink-blue cover, elastic band, label card ("FIELD NOTEBOOK · VOL. V · Compositions for Complex Systems"), name in Fraunces, mono foot. The cover treatment from `03-prototype-explore/Field-Notebook.html` is the starting reference. This is the hero object — largest, most central, visually loudest.

**Interaction:** Click to open. See *Transitions → Desk → notebook* below. This is the signature moment of the whole site.

### 2. A folded paper → CV / background

A sheet of paper, folded in half or with a single corner curl. Sits upper-right of the notebook, not overlapping. Mono "CV" label visible.

**Status: Placeholder for v1.** Click routes to a minimal placeholder page via a 240ms fade. Full unfold animation deferred.

### 3. A small card → About me

A cream-paper card with handwritten "about" in Caveat. Sits lower-right of the notebook. Smaller than the CV. Deliberately quiet.

**Status: Placeholder for v1.** Click routes to a minimal placeholder.

### 4. An ink pen (secondary prop)

A thin ink pen lies diagonally near the lower-right corner of the notebook (`left: 52%`, `top: 64%`, `rotate(-32deg)`). It is not a portal and not the roulette's pointer — it's a desk object that balances the right side of the composition near the notebook.

v0.3 briefly tried the pen as the roulette's pointer; v0.3.1 reverts that. The pen reads better as a prop on the desk than as a dedicated UI device, and the roulette is clearer with its own integrated pointer (see object #5 below). The pen no longer participates in the notebook-opening transition.

### 5. Cat Roulette → personal tell (new in v0.3, refined v0.3.2)

A vertical module on the left side of the desk (`left: 14%`, disc vertically centered). The module stacks: a mono label, a specimen card (appears after first spin), the 160×160px spinnable disc, and a handwritten caption.

**Label:** `FIG. II — YOGURT ROULETTE` in JetBrains Mono, 11px, tracked 0.18em, uppercase, `var(--ink-soft)`, opacity 0.7. Sits above the specimen card area. Replaces the previous curved `<textPath>` inside the disc frame.

**Disc:** Static frame — outer ink rule, faint inner ring, small ink triangle at 12 o'clock as the integrated pointer. Beneath the frame sits the rotating wheel, carrying six hand-drawn poses of Yogurt (my British Shorthair). Radial dividers separate the six segments; a small ink pivot at center.

**Poses (six):** `lounge`, `feed`, `caught`, `belly`, `yarn`, `sleep`. One pose per 60° segment. Captions in cat-first-person voice: "long mode: engaged," "where is the food," "this is my chair now," "belly access: granted," "the yarn lost," "currently unavailable."

**Caption:** Caveat handwriting below the disc. Before first click: "roll for yogurt" (call to interact). After first click: shows `...` during spin, then the selected pose's cat-voice label. `aria-live="polite"`.

**Interaction (updated v0.3.2):**
- Click the disc. Disc scales to 1.15× over 300ms. Wheel spins 3–5 full rotations (3s total, `cubic-bezier(0.17, 0.67, 0.12, 0.99)`), landing on a pose that is *not* the current one.
- On land (t=3s): disc scales back to 1×. A specimen card appears above the disc (500ms, `--ease-unfold`, slight overshoot) showing the selected cat at 200px inside a bordered paper card with a mono caption `fig. 0N · yogurt`. The selected segment in the wheel drops to 25% opacity.
- Handwritten caption crossfades to the pose's cat-voice label.
- On re-click: specimen card fades out (240ms), all segments restore to full opacity, new spin begins.
- Button is disabled mid-spin. Hover: disc lifts 3px with a deeper shadow. Focus: 2px ink outline, 6px offset, circular.

**Specimen card anatomy:** 240px wide, `var(--paper)` background, 1px `var(--ink)` border, 12px padding. Cat image at 200px with `mix-blend-mode: multiply`. Below: mono caption `fig. 0N · yogurt` (10px, tracked 0.12em). Slight rotation `rotate(-1.5deg)`. Drop shadow. Not interactive — the disc is the only clickable thing.

**Reduced motion:** no disc scale, no wheel spin, no overshoot on specimen card. On click: segment dims instantly, specimen card fades in 240ms, caption swaps 240ms. All semantics unchanged.

**Entrance:** drops in at 1200ms in the composing sequence with a small overshoot. The pen lands separately at 1900ms on the right side of the desk.

**Why this object:** the desk read right-weighted (notebook center, resume and about at the right edge) with empty paper on the left. A fidget-toy object there restores balance and gives the scene one personal tell. A cat roulette is specific to me, self-aware, and impossible to mistake for generic SaaS. See `00-brief/references/fidget-toys.md` for the research and `00-brief/decisions-log.md` for the decision.

**Assets:** six hand-drawn PNGs live at `site/public/cats/{pose}.png`, one per pose id. They render via `<img>` inside the roulette and use `mix-blend-mode: multiply` so the white backgrounds drop out against the paper-colored disc.

### Future props (not for v1, scaffolded in the structure)

- A coffee ring stain (pure decoration)
- A paperclip
- A small stamp
- A stack of index cards

Documented for later. Do not add in v1 — the craft budget goes into the four signature moves and the notebook transition.

---

## Interactivity as a design pillar

This replaces the v0.1 "Draggable objects" section. Drag-and-drop is removed.

Interactivity is a first-class design concern, not a delight layer. The homepage must feel *authored and alive* — a scene someone is in the middle of making. The rule: every motion earns its place, and the sum never overwhelms.

### The four signature moves

**1. Composing on load.** The scene assembles in front of the visitor over ~2.5 seconds. The desk is empty at t=0. Objects arrive one at a time, each with its own entrance and easing:

- Notebook drops from above with a subtle squash-and-settle (400–900ms).
- CV paper drifts down at a slight angle, landing asymmetrically (700–1100ms).
- About card slides in from the right edge (1000–1400ms).
- Cat roulette drops in on the left with a small overshoot (1200–1900ms).
- The label card's handwritten sub-title draws itself via SVG path animation (1300–1700ms).
- The pen rolls in from the right and settles diagonally near the notebook's lower-right corner (1900–2400ms).
- Marginalia in a corner (if present) writes itself last.

The feeling is watching someone set their desk up — not a choreographed reveal, a composition being made. Timings overlap; the rhythm is organic, not sequenced.

**2. Ambient light.** A warm highlight rectangle sits on the desk, as if from an off-screen lamp. The source is fixed (upper-left), consistent across all object shadows. Light breathes slowly in intensity (±10% over ~8 seconds). On cursor movement, the highlight subtly shifts — not a flashlight, more like turning your head toward a window. This is the keystone mood move.

**3. Object micro-personalities.** Each object has one behavior that makes it feel alive without feeling animated:

| Object | Personality |
|---|---|
| Notebook | Breathes 1–2px every ~6s. Elastic has faint tension. On hover: elastic slackens 1%, cover lifts 4px with deeper shadow. Patient but poised. |
| CV paper | Subtle curl at one corner. Cursor proximity flattens it; springs back when cursor leaves. |
| About card | A single soft crease from being folded once. Never moves. The shy one — that *is* its personality. |
| Ink pen | Right-side desk prop, lies diagonally near the notebook's lower-right corner. Does not move once settled. |
| Cat roulette | Idle-still. Click spins the wheel 5.2s and lands on a new Yogurt pose; caption crossfades. Integrated ink-triangle pointer at 12 o'clock marks the selection. Button disabled mid-spin. |
| Wordmark ("Yankun") | *Optional* — Fraunces `opsz` variable axis animates between ~100 and ~144 over ~10s. Include only if the perf budget allows. |

**4. Parallax without tilt.** On cursor movement, objects drift a few pixels at differential rates — notebook barely (~2px range), CV paper more (~5px), pen most (~8px). Drop shadows shift counter. Creates depth without tilt. This is the flat-lay equivalent of perspective.

### Hover and click

Hover on any clickable object: deeper shadow, 2–4px rise, 160ms ease-out. No tooltip. The personality *is* the affordance.

Click: notebook opens (see transitions). CV and About route to minimal placeholders via 240ms fade.

### Deferred — polish-pass material, not v1

- Idle reveal: after 30s of no cursor activity, a whispered marginalia fades in at the margin
- Cursor ink trail
- A coffee-ring stain that appears once per session in a random corner
- Label text that rewrites itself mid-visit

Document, do not build. These live here for reference.

---

## Transitions

### Landing → desk (composing)

See *Composing on load* above. ~2.5s total. With `prefers-reduced-motion`, the stagger is removed — all objects appear in a single 480ms crossfade.

### Desk → notebook (the signature moment)

The portfolio's signature transition. Most of the craft budget lives here. It has to feel *earned*.

Sequence (~1000–1200ms, one continuous gesture):

1. Click the notebook cover.
2. Cover lifts off the page — translateZ with a deepening shadow — 300ms, `--ease-unfold`.
3. As the cover passes ~40% of its lift, pages / canvas underneath come into focus — the canvas view fades up from behind where the cover was, 400ms crossfade with a gentle scale-up.
4. Cover continues rising out of frame.
5. Canvas fills the viewport.

The roulette and pen on the left fade out gently as the canvas takes over — they are part of the desk, not the canvas.

Reverse (canvas → desk): an exit gesture (close button or ESC) reverses the sequence. Canvas fades back, cover lowers into place, roulette and pen fade back in.

### Desk → CV or About

Stub for v1. Simple 240ms fade to a placeholder page. No unfold, no flip.

---

## Responsive

The stage is max-width 1280px, centered. Desk surface fills the viewport at any width; the stage with objects stays centered and consistently sized. Wide screens do not stretch the composition — surrounding desk just bleeds further.

Below 1024px: scale the stage proportionally. Below 768px: reflow objects vertically, maintain the flat-lay treatment. Composing animation still plays with reduced complexity. Cursor-dependent interactions (parallax, ambient-light tracking, pen-on-approach) fall back to touch-appropriate alternatives or are dropped cleanly.

Detailed mobile spec deferred to implementation. Known hard problem.

---

## Accessibility

- Each interactive object has `role="button"` and a descriptive `aria-label` ("Open notebook to view projects")
- Tab order: notebook → CV → about
- Enter / Space activates the focused object
- `prefers-reduced-motion`:
  - Composing stagger removed — single 480ms crossfade
  - Parallax disabled
  - Ambient light renders static, no breathing
  - Breathing wordmark disabled
  - Notebook-opening transition becomes a straight crossfade
  - Pen-rolls-off on click still plays (it's part of the navigation, not ambient)
- Focus states: 1.5px ink rule, 2px offset
- All text meets WCAG AA contrast
- Marginalia handwriting always has a real text equivalent for screen readers

---

## Technical notes

- Single React route (`/` → `DeskRoute`)
- Flat-lay — no `perspective` or `rotateX` on the stage
- Depth via `box-shadow`, `filter: drop-shadow`, and small z-offsets
- Composing animation: CSS keyframes with staggered delays, or Web Animations API for per-object finesse
- Ambient light: a positioned element with a radial gradient and heavy `filter: blur()`. Intensity animated via CSS; cursor influence via a `mousemove` listener updating a CSS custom property
- Parallax: single `mousemove` listener on the stage updates `--parallax-x` / `--parallax-y` custom properties. Each object reads them with its own `--parallax-weight`
- Micro-personalities: CSS keyframes and pseudo-elements where possible. Pen-on-approach needs JS (distance calc from cursor)
- Label handwriting draw-in: inline SVG with `stroke-dasharray` / `stroke-dashoffset` animation
- All motion respects `prefers-reduced-motion`
- **No new dependencies** without confirming with Yankun. Plain CSS + Web Animations API only

---

## Reference

**Mr. Panda's Psychologically Safe Portfolio** — referenced for *technique*, not aesthetic.

What we're borrowing: objects with personality, the authored-by-hand feel, discoverable rewards, pop-up-book-style layered depth.

What we're leaving: the whimsical / cartoon register, the scroll-journey structure, the kid's-notebook vibe.

Yankun's desk is Mr. Panda's toolkit in a different voice — editorial, literary, two-color, Fraunces-set. Studio at midnight, not kid's adventure. The translation matters: the same techniques in a different tonal register produce a different kind of site.

---

## Open questions

1. **Scene material** — exact paper-fiber or linen grain for the desk surface. Needs a small exploration with a few variants.
2. **Pen style** — modernist straight pen, vintage fountain pen, or thin ballpoint? Affects the visual register.
3. **Marginalia copy** — what does the hand-drawn corner line say? Voice question, not system question. Proposed: a short reflective fragment that rotates per-visit (e.g. "april. three months in.", "still cutting the welcome modal.", "the canvas is almost right.").
4. **Wordmark breathing (opsz)** — include in v1 or defer? Depends on perf profiling once the rest is in place.
5. **Idle-state easter eggs** — confirmed deferred, but worth a revisit before ship.
