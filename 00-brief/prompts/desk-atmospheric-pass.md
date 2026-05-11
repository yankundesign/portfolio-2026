# Desk page — atmospheric pass

Three small additions to the desk page (`/`). Each is independently shippable; combined they give the desk room presence and one piece of explicit wayfinding, inspired by the framing on hle.io.

Plan-first, per project rules: read the source-of-truth files below, propose a plan with file paths and per-task implementation choices, wait for confirmation, then execute.

## Source of truth (read first, in order)

1. `00-brief/vibe-guideline.md` — visual + voice canonical
2. `CLAUDE.md` — project overview and hard rules
3. `.claude/rules/code-style.md` — stack and code conventions
4. `.claude/rules/voice.md` — copy rules
5. `.claude/rules/design-tokens.md` — tokens to use exactly
6. `00-brief/decisions-log.md` — most recent first; pay attention to:
   - 2026-04-25 watercolor wash entry (the existing atmospheric pattern on the notebook)
   - 2026-04-26 about page entry (item 5 confirms Caveat retired in v0.4 — all annotation is JetBrains Mono now)

## Hard constraints (do not violate)

- Plain CSS Modules. No Tailwind, no CSS-in-JS, no component libraries.
- Two-color palette only: `--ink` family on `--paper` family. No grays, no accent colors.
- Typography per `tokens.css`: Fraunces (display + body), JetBrains Mono (chrome + annotation). **Do not use Caveat** — retired in v0.4.
- All motion respects `prefers-reduced-motion` with dignified static fallback.
- Lighthouse 95+ target. Don't introduce continuous-paint loops.
- No new dependencies without asking first.
- No placeholder lorem ipsum. Use the exact strings I give below.

## Files you will likely touch

- `site/src/routes/DeskRoute.tsx`
- `site/src/routes/DeskRoute.module.css`
- Possibly `site/src/components/shared/EditorialPlate.tsx` (only if needed for the through-line — see task 1)
- New components live in `site/src/components/desk/` and follow the existing naming pattern (`PascalCase.tsx` + `PascalCase.module.css`)

## Files for context (do not modify)

- `site/src/components/shared/EditorialPlate.tsx` + `.module.css` — chrome wrapper; the four corners are already taken by plate metadata, GRID SYSTEM block, format/date, and currently/site-build lines. The desk surface lives inside `.content`.
- `site/src/components/desk/NotebookCover.tsx` — already renders a `<WatercolorWash>` on hover; the notebook is the page's hero object.

---

## Task 1 — Through-line on the desk surface

**Goal.** Add my positioning sentence as a quiet typographic element on the desk, not as plate chrome. It should read like a margin note, not a hero headline.

**Copy (use exactly):**

```
// I make complex, invisible systems handleable.
```

**Style.**

- The `//` prefix renders in JetBrains Mono caps, tracked at `--chrome-tracking`, color `--ink-soft`, opacity `--chrome-opacity`. Same register as the plate's mono captions.
- The sentence body renders in Fraunces, 300 weight, italic, 18px, line-height 1.45, color `--ink-soft`.
- The line sits low-contrast and small. It must not read as a headline.

**Placement.**

- Anchored bottom-left of the desk content area, beneath the `.scene` grid, **above** the plate's bottom-meta zone. It should not collide with the GRID SYSTEM meta block that EditorialPlate already renders in the bottom-left chrome corner.
- Single line if it fits the column width; otherwise two lines with a clean break after the prefix or after "complex,".
- Margin-top from the scene baseline: ~24–32px. Don't crowd the slots.

**Implementation hint.** The cleanest path is to render it as a sibling of `<div className={styles.scene}>` inside `DeskRoute.tsx`, styled in `DeskRoute.module.css`. Avoid adding a new EditorialPlate prop unless the chrome layout forces it.

**Accessibility.** Plain text, in DOM, screen-reader visible. Not aria-hidden.

---

## Task 2 — Hand-drawn arrow + mono caption pointing at the notebook

**Goal.** One always-on wayfinding mark that says "this is the entry point." Marginalia doing a UI job.

**Copy (use exactly):**

```
open it
```

Lowercase. Mono caps tracked. No period.

**Style.**

- Caption: JetBrains Mono, 11px (`--text-caption`), letter-spacing `--chrome-tracking`, color `--ink-soft` at `--chrome-opacity`. Uppercased via CSS so the source stays lowercase.
- Arrow: inline SVG, hand-drawn feel, stroke `var(--ink)`, stroke-width `1.4px`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. Slight wobble in the path so it doesn't read as machined. Length ~80–120px in viewport units.
- Combined element opacity: `0.6` so it reads as marginal annotation, not UI.

**Placement.**

- Position absolutely within `.scene` (or as a scene-overlay), pointing toward the notebook (which lives at `grid-column: 3 / 7`, bottom-aligned).
- Arrow originates from off to the side (e.g. above-left of the notebook), curves down and right, head terminating with a small arrowhead aimed at the notebook cover near its top edge.
- Caption sits adjacent to the arrow's tail (origin), not at the head. Reading order: caption → eye follows arrow → notebook.

**Behavior.**

- Always visible. **Not hover-revealed.** This is the affordance label for first-time visitors.
- `pointer-events: none` on the wrapper so it never intercepts clicks on the notebook button.
- Honor `prefers-reduced-motion`: no animation needed since this is static, but make sure no transitions get added by accident.

**Voice rule.** Per `.claude/rules/voice.md`, marginalia is 2–6 words max and never more than 2 per screen. This counts as the desk's one marginalia entry. Don't add others in this pass.

**File.** Create `site/src/components/desk/DeskWayfinder.tsx` + `DeskWayfinder.module.css`. Mount once inside `DeskRoute.tsx`.

---

## Task 3 — Atmospheric directional light on the desk surface

**Goal.** Give the desk room presence. A soft directional wash across the surface, as if a desk lamp or window sat off-frame to the upper-left. The notebook should naturally read as the lit thing on the desk.

**Style.**

- A static, very subtle radial or linear gradient applied as a non-interactive overlay across the desk content area.
- Direction: lighter at upper-left, falling off toward the lower-right. This is *not* a vignette around the edges; it's directional light.
- Use the existing palette only:
  - Warm pool side (upper-left): `--paper-soft` or `--paper`-derived lighter wash, tinted *down*, not up — paper doesn't glow. Aim for a hint of `--paper-shadow` complement, not luminance.
  - Cooler/darker side (lower-right): a low-opacity `rgba(22, 38, 94, 0.04–0.06)` ink wash. Imperceptible until you remove it.
- Total contrast across the gradient: ~5–8% max. If it's "obvious," it's wrong.
- No animation. Static gradient.

**Placement.**

- Sits within `EditorialPlate`'s `.content` slot, behind `.scene` (z-index below slots).
- `pointer-events: none`.
- Must not interfere with the watercolor wash on the notebook (which lives inside the notebook button itself; this directional light is the always-on resting state on the desk surface, the wash is a hover bloom on the notebook).
- `position: absolute; inset: 0;` inside the content area, with the gradient as a `background-image`.

**Reduced motion.** Not animated, so no behavior change needed. Just confirm no transitions are introduced.

**File.** Create `site/src/components/desk/DeskLight.tsx` + `DeskLight.module.css`. Mount once at the top of the children block in `DeskRoute.tsx`, before `.scene`. Component is presentational and takes no props for v1.

**Tunability.** Even though it takes no props now, define the gradient stops and angles using CSS custom properties on `:root` in the module (e.g., `--desk-light-angle`, `--desk-light-warm`, `--desk-light-cool`) so I can tune in DevTools without re-editing the component.

---

## Verification

After implementation, before declaring done:

1. Run `npm run -w site typecheck` (or the project's typecheck script — check `site/package.json`). Must pass clean.
2. Run `npm run -w site dev` and visually confirm at the desk URL (`/`):
   - Through-line reads as a margin note, not a headline. Not crowding plate chrome.
   - Arrow + caption is unmistakably pointing at the notebook. Caption reads "OPEN IT" in mono caps. Notebook click still works (arrow doesn't block it).
   - Desk has a felt sense of light — but I should *not* be able to point at it and say "there's a gradient there." If it's obvious, dial it down.
3. Toggle `prefers-reduced-motion` in devtools; nothing should animate or change.
4. Tab through the page; focus order is unchanged. The wayfinder is decorative and shouldn't appear in the tab order.
5. Lighthouse desktop audit on `/`: performance ≥ 95, accessibility ≥ 95.

## Logging

Add one entry to `00-brief/decisions-log.md` (most recent at top) summarizing what was added and why. Mention this is the second deliberate atmospheric effect added back since the v0.4 deadpan call (the watercolor wash being the first), and that the arrow is the desk's first marginalia per the voice rule. Keep it factual, no marketing language.

## Out of scope

- Don't change the notebook, CV, about, pen, or roulette components.
- Don't touch EditorialPlate's chrome layout.
- Don't add a clock / time-of-day marker (that's a separate task).
- Don't introduce a real-handwriting font; mono is the annotation register in v0.4+.
- Don't add hover states, micro-interactions, or motion to any of these three additions.
