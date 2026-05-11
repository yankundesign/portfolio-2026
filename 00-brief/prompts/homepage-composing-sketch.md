# Prompt: Homepage v0.2 refinement — flat-lay, composing, ambient light

*For Claude Code · 2026-04-19 · Refinement of the existing React desk scene*

---

## What you're doing

Refining the **existing** homepage desk scene in `site/src/` to implement PRD v0.2. Three substantive shifts in this pass:

1. Remove drag-and-drop entirely.
2. Convert the scene from perspective / tilt to flat-lay.
3. Add first pass of composing-on-load, ambient light, and notebook breathing.

**This is a refinement of existing code, not a new build.** The routes, components, tokens, and styles already exist. You are modifying what's there — not writing a standalone HTML prototype.

---

## Read first, in this order

1. `00-brief/prd-homepage-desk.md` — v0.2, authoritative for this work.
2. `00-brief/decisions-log.md` — the 2026-04-19 "Homepage v0.2" entry.
3. `00-brief/vibe-guideline.md` — visual system.
4. `.claude/rules/design-tokens.md` and `.claude/rules/code-style.md`.
5. The existing files listed under "Files in scope" below. Read them before editing any of them.

---

## Files in scope

**Edit:**
- `site/src/routes/DeskRoute.tsx`
- `site/src/routes/DeskRoute.module.css`
- `site/src/components/desk/DeskSurface.tsx`
- `site/src/components/desk/DeskSurface.module.css`
- `site/src/components/desk/NotebookCover.tsx`
- `site/src/components/desk/NotebookCover.module.css`
- `site/src/components/desk/ResumePaper.tsx` and `.module.css`
- `site/src/components/desk/AboutObject.tsx` and `.module.css`
- `site/src/styles/tokens.css` — add tokens if new eases / durations needed

**Create:**
- `site/src/components/desk/AmbientLight.tsx` and `.module.css`
- `site/src/components/desk/Pen.tsx` and `.module.css`

**Delete (if unused after refactor):**
- `site/src/interactions/useDraggable.ts`

Current state to know going in: `DeskSurface.module.css` has `perspective: 2400px` on `.wrapper` and `transform: rotateX(20deg)` on `.plane` — both go. `DeskRoute.module.css` has a simple staggered `dropIn` entrance (400ms, 0/150/300ms delays) — gets expanded to the full composing sequence. `useDraggable.ts` is used by all three desk object components — removals are coordinated. `DeskRoute.tsx` uses viewport-math positioning with a resize listener — this gets replaced by a stage-relative layout.

---

## Scope of this pass

### 1. Remove drag-and-drop

- Strip `useDraggable` usage from `NotebookCover`, `ResumePaper`, `AboutObject`. They each accept a `position` prop (or read from a stage-relative layout) and render statically.
- Remove drag-related CSS: `cursor: grabbing`, `touch-action: none` where it was drag-specific (keep it on objects that still benefit from it for hover stability), any `.dragging` state styles.
- Delete `useDraggable.ts` if nothing else imports it.
- In `DeskRoute.tsx`, drop the `useState(getPositions)` + `resize` listener. Object positions become a const or are handled via CSS inside a centered stage.

### 2. Convert to flat-lay

- `DeskSurface.module.css`: remove `perspective` from `.wrapper` and `rotateX(20deg)` from `.plane`. The plane is now a flat container.
- Introduce a **stage** layer inside the desk surface — `max-width: 1280px`, horizontally centered, full height. Objects are positioned relative to the stage, not the viewport. The desk surface still fills the viewport; at wider widths the surface bleeds to the edges while the stage stays centered.
- Replace the current `.wrapper` radial gradient with a warmer paper-fiber surface: inline SVG noise as a data URL, layered over a warm solid base. Use existing `--paper` tones, or propose one new token (`--desk` or `--paper-desk`) if needed — **ask Yankun before adding a new token**.
- Add a faint edge vignette on the outer viewport (inset `box-shadow` or an overlay layer with a radial gradient mask).

### 3. Composing-on-load animation

Expand `DeskRoute.module.css` to match the PRD timing table. Each object gets its own keyframe and easing — do not reuse one curve for all three.

| t (ms) | What happens |
|---|---|
| 0–400 | Stage and ambient light fade in. Desk surface empty. |
| 400–900 | Notebook drops from ~30px above with a subtle squash-and-settle (spring-like ease). |
| 700–1100 | CV paper drifts in from ~15px offset + slight initial rotation (~3°), settling into final position. |
| 1000–1400 | About card slides in from the right edge. |
| 1300–1700 | Label's handwritten sub-title ("Compositions for Complex Systems") draws itself (SVG `stroke-dasharray`). |
| 1700–2200 | Pen rolls into place across the notebook corner (translate + rotate). |
| Total | ~2.2s |

Document each ease as a CSS custom property in `tokens.css` (e.g. `--ease-drop`, `--ease-drift`, `--ease-slide`). Store durations and delays as tokens too.

### 4. Ambient light

New `AmbientLight` component. A positioned element with a radial gradient, heavy `filter: blur()`, warm tint. Upper-left area of the stage. CSS keyframe slowly animates opacity or scale over ~8s (0.85 ↔ 1.0). **No cursor tracking in this pass.**

Audit drop shadows on all three objects (and the pen) so they lean consistently toward the lower-right — away from this light source.

### 5. Pen

New `Pen` component. Inline SVG — thin ink-blue capsule with a slightly darker tip. Lies diagonally across the notebook's lower-right corner. Static final position. Its entrance is part of the composing sequence (1700–2200ms). **No proximity interaction this pass.**

### 6. Notebook breathing

1–2px vertical drift, ~6s sinusoidal period, starts after composing completes (~2.2s initial delay). CSS keyframe on the notebook wrapper. Must be barely perceptible.

### 7. Handwriting draw-in on the label

Currently the label card's handwritten text is static Caveat. Convert it to animate in, playing during 1300–1700ms of composing.

Preferred: inline SVG with hand-drawn paths animated via `stroke-dasharray` / `stroke-dashoffset`. Higher craft, more work.

Acceptable fallback: keep Caveat as the rendered type, but animate each word in sequence via a `clip-path` wipe (still reads as "being written"). Choose based on your budget — **ask Yankun which is preferred** if uncertain.

### 8. Reduced motion

All new animations respect `prefers-reduced-motion: reduce`:

- Composing stagger collapses to a single 480ms crossfade (all objects appear together).
- Notebook breathing disabled.
- Ambient light static — no opacity animation.
- Handwriting appears instantly (or fades in).
- Pen appears in place.

The existing `useReducedMotion` hook can be extended or the CSS media query used directly — use whichever is cleaner for each concern.

---

## Out of scope this pass

Explicitly **not** included:

- Cursor parallax (objects drifting on `mousemove`)
- Cursor-aware ambient light (light warming toward cursor)
- Pen rolling on cursor proximity
- CV paper corner curl detail
- About card crease detail
- Fraunces `opsz` breathing on the "Yankun" wordmark
- Notebook-opening transition refinement (click → canvas signature moment)
- Idle-state easter eggs
- Mobile / below-1024px responsive polish

These are tracked in the PRD as future passes. Do not build them here.

---

## Hard rules

- **No new dependencies.** If you think one is required, stop and ask Yankun.
- **No CSS frameworks, no Tailwind, no component libraries, no icon libraries.**
- **TypeScript strict.** Props as interfaces, exported alongside their component.
- **Two colors.** `--ink`, `--paper`, and their documented variants. Propose a new token only if essential and get Yankun's sign-off.
- **Tokens, not hardcoded values.** Colors, durations, eases, offsets all go through tokens.
- **`prefers-reduced-motion`** respected for every new animation.
- **No placeholder lorem.** Real strings throughout: "Yankun", "designer, enterprise AI", "VOLUME V · 2021—2026", "FIELD NOTEBOOK · VOL. V", "Compositions for Complex Systems", "CV", "about".
- **Inline SVG only.** No new image assets for pen, light, grain, or vignette.
- **Plain CSS Modules.** No CSS-in-JS.

---

## Acceptance criteria

Run `npm run dev` from `site/`, open the homepage:

1. No tilt. The scene is a straight flat-lay, no perspective.
2. No drag. Clicking and holding an object does nothing except show a hover state. No grab cursor.
3. Hover on the notebook produces a subtle lift + deeper shadow.
4. The scene composes on load with a clear rhythm — objects arrive one at a time, each with its own easing, not all together.
5. The notebook drop has weight — squash-and-settle is perceptible.
6. The label's handwritten sub-title draws itself during the composing sequence at a believable pen speed.
7. After composing completes, the notebook is breathing. You have to look to see it.
8. A warm ambient light in the upper-left gives the scene a time-of-day feel. All object shadows lean toward the lower-right consistently.
9. A pen lies across the notebook's lower-right corner.
10. The scene stays centered in a stage at browser widths from 1024px to 1920px. Desk surface bleeds to the edges outside the stage.
11. DevTools → Rendering → `prefers-reduced-motion: reduce` cleanly removes the stagger, breathing, light animation, and handwriting draw. Nothing flashes or glitches.
12. `useDraggable.ts` is deleted if no longer imported, or explicitly noted as kept-for-future-reference with a comment.
13. `npm run build` succeeds without new warnings.

---

## How to work

1. Read the PRD, decisions log, vibe guideline, code-style rules, and every file listed under "Files in scope" before writing any code.
2. Write a **short plan** (a few paragraphs) describing the diff you intend to make across the files. Share it with Yankun before starting edits if anything feels ambiguous.
3. Land changes in stages. Recommended order:
   - Remove drag and convert to flat-lay. Ship to a stable static scene.
   - Add ambient light layer.
   - Expand composing animation to match the timing table.
   - Add notebook breathing.
   - Add handwriting draw-in.
   - Add pen.
   - Reduced-motion audit.
4. Keep commits focused — one logical change per commit.
5. After the first working build that meets acceptance criteria 1–9, **stop and ask Yankun to review in the browser** before polishing timings further.

## Questions to ask Yankun before starting, if ambiguous

- Is a new `--desk` color token acceptable, or keep the desk surface to existing tokens only?
- Preferred pen style: modernist straight pen, vintage fountain pen, or thin ballpoint?
- Handwriting draw-in: full SVG path animation (more craft) or Caveat with `clip-path` wipe (faster)? Which do you prefer for v1?
- Any of the existing `NotebookCover` label / foot / elastic treatments that should change as part of this pass, or keep them exactly as-is?
