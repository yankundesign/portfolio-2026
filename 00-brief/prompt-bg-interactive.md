# Prompt — Desk background: dot grid + hidden marginalia

Paste this into Claude Code from the repo root. The prototype at `03-prototype-explore/bg-interactive.html` is the behavior spec — open it in a browser first to feel the interaction before you start coding.

---

Implement the interactive desk background from `03-prototype-explore/bg-interactive.html` in the real app. Two behaviors layered behind the existing desk objects:

1. **Bullet-journal dot grid** — printed on the paper, yields around the cursor, eases back to rest
2. **Hidden marginalia** — handwritten notes that fade in when the cursor is near, invisible otherwise

Both sit behind the notebook, resume, about, pen, and cat. They must not interfere with any existing object interactions.

## What to build

Two new components in `site/src/components/desk/`:

- `DeskDotGrid.tsx` + `DeskDotGrid.module.css` — `<canvas>` that draws the dot grid and runs the repulsion/ease loop
- `DeskMarginalia.tsx` + `DeskMarginalia.module.css` — the handwritten notes with proximity-based opacity

One new hook in `site/src/interactions/`:

- `useCursorPosition.ts` — returns cursor `x`/`y` as mutable refs (not React state — we don't want re-renders at 60fps). Both components read from the same refs in their own RAF loops.

Wire both into `DeskScene.tsx`. Layer order from bottom to top: paper grain → dot grid → marginalia → desk objects → vignette. The dot grid sits under the objects so they feel like they're resting on the paper.

## Behavior spec (match the prototype exactly)

**Dot grid:**
- `<canvas>`, sized to viewport × `devicePixelRatio`, rebuilt on resize (150ms debounce)
- Grid spacing 28px, centered in viewport
- Ink-blue dots, radius 1.25px, alpha 0.22 (tunable)
- Each dot has a home position. Within 140px of the cursor it's pushed radially outward; push strength = `(1 - dist/140)² × 42px`
- Current position eases toward target at 0.12 per frame — this mass/lag is the whole charm, don't tighten it

**Marginalia:**
- Nine notes + one hand-drawn arrow SVG, positioned by viewport percentage
- Three typographic variants:
  - Caveat (default handwriting) — "open me →", "still drying", "hello!", "no title yet", "↓ fold"
  - Fraunces italic 300 — "tuesday morning", "ink + paper"
  - JetBrains Mono, tracked caps — "apr 2026 · yk", "field notes — 01"
- Default opacity 0. Within 180px of the cursor, fade to `min(0.92, t² × 1.1)` where `t = 1 - dist/180`
- Real text in the DOM (screen readers read it). Only the decorative SVG arrow gets `aria-hidden`
- Positions, rotations, and content live in a data array inside the component — don't over-abstract into a separate file yet

All the exact tuning constants (spacing, radius, alpha, repel radius, max push, ease) are at the top of the prototype's script. Copy them verbatim, then surface them as named constants at the top of each component so I can tune later.

## Constraints

- Use design tokens from `site/src/styles/tokens.css`. Never hardcode `#16265e` or `#f4f1ea` or any color.
- CSS Modules only. No Tailwind. No runtime CSS-in-JS.
- Strict TypeScript. Components take no required props (all props optional with sensible defaults).
- Respect `prefers-reduced-motion` using the existing `useReducedMotion` hook:
  - Dot grid: renders static, no repulsion, no easing. Still visible.
  - Marginalia: sits at ~50% opacity, no proximity reveal.
- Cross-fade into the reduced-motion state, don't hard-cut — per the guideline, reduced-motion fallbacks should be dignified, not instant.
- Don't add dependencies. Canvas 2D + `requestAnimationFrame` + CSS is enough. Do not pull in Framer Motion for this.
- No intro tease — the prototype briefly reveals all marginalia on load for review legibility. That's prototype-only. In production, the interaction is discovered. Confirm with me if you disagree.
- Don't copy the prototype's HUD panel or the manual reduced-motion toggle button. Prototype-only UI.
- Don't copy the prototype's placeholder desk objects — the real `DeskScene` already has them.

## Accessibility

- Canvas has `aria-hidden="true"` and `role="presentation"` — it's decorative
- Marginalia text is real (not SVG), so screen readers read it. Keep it short and specific per the voice rules
- Color contrast is already fine (ink on paper, WCAG AA)
- Canvas must not block pointer events on the objects behind it — `pointer-events: none` on the canvas element

## Performance

- 60fps on a retina 1440×900 display, no jank
- Canvas rebuilds on resize only (debounced), not every frame
- Use a single RAF loop per component; don't nest RAFs
- Don't call `setState` inside the RAF loop

## Done criteria

- Opening the real app side-by-side with the prototype, the dot grid + marginalia behavior is indistinguishable
- `npm run build` passes with no warnings
- No new entries in `package.json`
- Toggling `prefers-reduced-motion` at the OS level produces the static fallback with a soft cross-fade in and out
- No regressions on existing desk object interactions (drag, hover, entrance choreography)

## After you're done

Add a short entry to `00-brief/decisions-log.md`:

- What was added (two components, one hook)
- Any tuning constants you nudged from the prototype defaults, and why
- Any accessibility or perf tradeoffs worth future-me remembering

## Reference files

- Behavior source of truth: `03-prototype-explore/bg-interactive.html`
- Existing desk scene to extend: `site/src/components/desk/DeskScene.tsx`, `DeskSurface.tsx`
- Code style rules: `.claude/rules/code-style.md`
- Design tokens: `.claude/rules/design-tokens.md`
- Full visual system: `00-brief/vibe-guideline.md`
- Voice rules (for the marginalia copy, if you need to add or rewrite any): `.claude/rules/voice.md`

## How to work

Small commits. Dot grid first, verified visually, then marginalia. Ask before deviating from the prototype on anything that isn't covered above.
