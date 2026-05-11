# PRD: Desk → Canvas Transition (the open-the-notebook moment)

*May 2026 · v1.0 — the signature transition*

> The notebook on the desk visually opens into the canvas. This is the site's signature moment. Per `portfolio-scope.md` and `architecture-plan.md`: "The desk-to-canvas portal transition is the signature moment — invest craft here."

---

## Summary

When the user clicks `OPEN IT` on the desk, the notebook lifts, its cover rotates open around the left spine, and the open notebook spread expands to fill the canvas viewport. The URL changes to `/works` mid-animation. Total duration ~800ms. The reverse plays on `close →` from the canvas.

The transition is the literal payoff of the metaphor: you see the notebook on the desk, you click "open it," and the notebook actually opens. No fade-to-route-change. No spinner. The cover swings open like a real book.

Tech: a single full-screen overlay component (`NotebookTransition`) handles the choreography using **Framer Motion** for the position/size morph and **CSS 3D** (`perspective` + `rotateY`) for the cover rotation. Routes change through `AnimatePresence` so both surfaces stay mounted during the transition.

---

## What this transition replaces

- Current behavior: clicking the notebook navigates instantly to `/works`. The closed notebook is replaced by the canvas with no continuity.
- v0.7 plan referenced "View Transitions API" as a future pass; this PRD supersedes that plan with a Framer Motion approach (broader browser support, more control over the cover rotation choreography).

---

## Choreography — beat by beat

Total duration: **800ms** desktop, with timing variations per beat.

| Beat | Time | What happens |
|---|---|---|
| 1. Wind-up | 0–80ms | Closed notebook lifts ~12px off the desk surface. Soft drop shadow deepens. The "I'm being picked up" beat — quiet but felt. |
| 2. Cover rotation begins | 80–460ms | Front cover starts rotating open via `rotateY(-180deg)` around the left spine. Easing: `cubic-bezier(0.34, 1.0, 0.64, 1)` — physical paper deceleration with slight overshoot. Cover passes through 90° at ~270ms. |
| 3. Position + size morph | 100–600ms | Notebook center translates from desk slot position to canvas-centered position. Width scales from desk-notebook size (~340px) to canvas-spread size (~1000px). Aspect ratio shifts from portrait (closed) to landscape (open spread). Same easing curve as cover. |
| 4. Interior reveal | 200–500ms | The open-notebook spread image cross-fades in beneath the rotating cover. By the time the cover passes 90°, the interior is at full opacity. |
| 5. Background cross-fade | 100–600ms | Desk plate (DeskLight + chrome) fades out; canvas plate (chrome + dot grid + side margin elements) fades in. ~400ms cross-fade. |
| 6. Cover settles flat | 460–600ms | Cover at -180°, lying flat behind the open spread. `backface-visibility: hidden` ensures it disappears from view. |
| 7. URL update | ~400ms (midpoint) | `navigate('/works')` fires at the midpoint of the animation. By then the visual is mostly canvas; the route change is invisible. |
| 8. Settle | 600–800ms | Final easing as the canvas content (project rows, side margins) finishes fading in. THOUGHTS sticky and `close →` button appear last. |

The reverse (canvas → desk via `close →`) plays the same beats backward, with one tweak: the close transition is faster (~600ms total) because closing should feel snappier than opening — opening is the reveal, closing is dismissal.

---

## Visual concept

A book opening on a flat surface, viewed from above-and-slightly-tilted (the desk's existing 3D perspective, ~6° off horizontal). The cover hinges on the left spine. The interior is revealed as the cover swings up, over, and away. The notebook simultaneously moves from its desk position to the canvas center and grows to spread size.

Reference: an actual hardcover notebook opening. Not a flip-book page-turn (that's a different gesture). Not a "cover slides off" (that's not how books work). A real **hinge rotation** around the spine.

---

## Tech approach

A single `NotebookTransition` overlay component handles the choreography. It mounts at the app root level (above route content) and renders only during the transition. Routes still change normally — the overlay just provides the animation between them.

### Why an overlay (not Framer Motion `layoutId` shared elements)

`layoutId`-based shared element transitions are clean when the elements live inside route content, but they get complex when the source and destination have radically different geometries (closed notebook portrait → open spread landscape) and when assets need to swap mid-animation. An overlay gives us:
- Full control over both the cover rotation and the position/size morph
- A single source of truth for timing across all beats
- Clean handoff: overlay is shown during transition, hidden once the destination route renders
- Routes don't need to know about the transition

### Component structure

```
<App>
  <Routes>
    <Route path="/" element={<DeskRoute />} />
    <Route path="/works" element={<CanvasRoute />} />
  </Routes>
  <NotebookTransition />  {/* Overlay, mounted at root, listens to route changes */}
</App>
```

### Framer Motion responsibilities

- `motion.div` for the notebook wrapper — animated `width`, `height`, `x`, `y` for the position/size morph
- `useAnimation` controls for orchestrating the multi-beat sequence
- `AnimatePresence` to keep the overlay mounted during the transition

### CSS 3D responsibilities

- `perspective: 1600px` on the wrapper
- `transform-style: preserve-3d` on the cover layer
- `transform: rotateY(...)` on the cover, hinged at `transform-origin: left center`
- `backface-visibility: hidden` on the cover so it disappears when rotated past 90°

### Asset switching mid-animation

The trickiest detail. We need to seamlessly transition from "closed notebook PNG" to "open notebook PNG" without a visible jump. Strategy:

1. At rest on desk: render `notebook-closed.png` as a single image
2. When transition starts: split into two layers
   - Below: `notebook-open.png` (the full open spread) — opacity 0 at start
   - Above: `notebook-cover-front.png` (just the front cover, isolated) — fully opaque at start, rotating
3. As cover rotates from 0° → 90°, fade `notebook-open.png` from opacity 0 → 1
4. As cover passes 90°, `backface-visibility: hidden` makes it disappear
5. By 90° completion, `notebook-open.png` is fully visible underneath

The user sees: closed notebook → cover lifts, opens, reveals the spread underneath → cover swings flat against the back and disappears → open spread is now the dominant view. No visible asset swap.

---

## Asset requirements

Three new assets needed beyond what exists. Detailed prompts in `00-brief/transition-asset-prompts.md`.

| # | Asset | What it is | New or existing |
|---|---|---|---|
| 1 | `site/public/transition/notebook-closed.png` | Closed navy notebook (front cover view), transparent background, slight perspective tilt to match the desk's existing notebook | **NEW** — re-cut or re-render of existing `notebook.png`; must match perspective and size of current desk asset |
| 2 | `site/public/transition/notebook-cover-front.png` | Just the front cover, isolated, with the spine on the LEFT edge of the image (so rotation pivots correctly). Transparent background, alpha-cut to the cover shape only | **NEW** — Photoshop cut from `notebook-closed.png` |
| 3 | `site/public/canvas/open-notebook.png` | Open notebook spread, already in place from the canvas v0.8.1 build | **EXISTING** |

Optionally (if rotation reveals look flat):

| # | Asset | What it is |
|---|---|---|
| 4 | `notebook-cover-back.png` | The inside of the front cover (cream paper, possibly with a small bookplate or label) — visible during rotation between 90° and 180°. Without this, the rotated cover shows its `backface-visibility: hidden` and just disappears, which is acceptable but less rich |

---

## Component breakdown

New files in `site/src/components/transition/`:

- `NotebookTransition.tsx` + `.module.css` — the overlay component. Listens to route changes via React Router. Triggers the choreography on detected `/` ↔ `/works` transitions. Renders the notebook composition (closed + cover layer + open spread layer) and animates them.
- `useTransitionState.ts` — interaction hook that manages the transition state machine (`idle | opening | open | closing`), exposes the current beat to consumers, and handles route timing.

Modified files:

- `site/src/App.tsx` — mount `<NotebookTransition />` at root, wrap routes in `<AnimatePresence mode="wait">`
- `site/src/components/desk/NotebookCover.tsx` — on click, instead of immediately calling `navigate('/works')`, dispatch a custom event `notebook:open` (or use a context) that the overlay listens for. The overlay then runs the animation AND triggers the navigation at the midpoint.
- `site/src/components/canvas/CanvasCloseButton.tsx` — same pattern, dispatch `notebook:close`.

New CSS variables (add to `site/src/styles/tokens.css`):

```css
--transition-duration-open: 800ms;
--transition-duration-close: 600ms;
--transition-ease-paper: cubic-bezier(0.34, 1.0, 0.64, 1);
--transition-perspective: 1600px;
```

Dependency: install `framer-motion@^11`. Add to `site/package.json`.

---

## Timing curves

The whole transition uses one easing curve: `cubic-bezier(0.34, 1.0, 0.64, 1)`. Slight overshoot at the end mimics paper settling. Apply to:
- Cover rotation
- Position morph
- Size scale
- Interior fade

Background cross-fade uses `cubic-bezier(0.4, 0.0, 0.2, 1)` (no overshoot, just smooth cross).

---

## Reduced motion fallback

When `prefers-reduced-motion: reduce`:
- No 3D rotation
- No cover lift
- Simple 240ms cross-fade between the closed notebook (desk) and the open spread (canvas)
- URL changes immediately
- Total fallback duration: 240ms

The fallback should feel deliberate and quiet, not abrupt — same easing as the cross-fade in the main animation.

---

## Performance considerations

- The cover rotation runs on `transform` (composited, GPU). 60fps target on retina laptops.
- Position + size morph also `transform` + `width/height` — `width/height` triggers layout, which is expensive. Consider using `scale()` instead of `width` change, with a precomputed scale factor based on desk-notebook size vs canvas-spread size.
- Pre-load `notebook-cover-front.png` and `open-notebook.png` on the desk route mount so they're cached when the transition fires.
- Reduce `image-rendering: -webkit-optimize-contrast` on the rotating cover to avoid blur during rotation on lower-DPI screens.
- Avoid `box-shadow` animations during the transition — use `filter: drop-shadow` and animate only opacity if a shadow change is needed.

---

## Reverse transition (canvas → desk)

Triggered by:
- Click on `close →` button
- Press `Escape` (already handled in `CanvasRoute.tsx`)
- Browser back button (need to detect and animate)

Plays the open animation in reverse:
- Cover unfolds from 180° back to 0°
- Notebook size shrinks from canvas spread to desk slot size
- Position morphs back to desk position
- Background cross-fades canvas → desk
- URL updates at midpoint

Faster total duration (~600ms) — closing is dismissal, doesn't need the same reveal weight.

---

## Open questions

1. **Browser back button.** When the user navigates back via browser controls instead of `close →`, do we still play the reverse animation? Recommend: yes, intercept `popstate` events when the user is on `/works` and trigger the close transition. Adds complexity but makes the experience consistent.
2. **Mid-transition navigation.** What happens if the user clicks `OPEN IT`, then clicks again before the animation finishes (or hits browser back)? Recommend: queue the latest intent, complete the current animation, then play the new one. Don't interrupt mid-animation — it'll look broken.
3. **First-load on `/works` directly.** If a visitor hits `/works` directly (deep link), there's no animation — just renders the canvas. Should the desk briefly appear and play the open transition? Recommend: no — direct loads skip the transition entirely; it's a returning-visitor / share-link affordance.
4. **`notebook-cover-back.png` (asset 4 above).** Worth the asset work, or accept that `backface-visibility: hidden` makes the cover disappear cleanly past 90°?

---

## Out of scope

- Page-flip transitions inside the notebook (cut from v1)
- Animating other navigation transitions (`/about`, `/cv`, `/works/:slug`) — keep those as standard route changes for v1
- Sound design (paper rustle, etc.) — interesting but out of scope; revisit in v2 if the transition feels too silent
- Mobile transition — different gesture set; defer to mobile pass in week 2

---

## Effort estimate

| Phase | Estimate |
|---|---|
| Asset prep (cover-front cut from closed notebook, optional cover-back) | ~2 hours |
| `NotebookTransition` component build | ~6–8 hours |
| Choreography tuning (curves, timing, weights) | ~3–4 hours |
| Reverse transition | ~2 hours |
| Reduced motion + accessibility pass | ~1 hour |
| Browser back button handling | ~2 hours |
| Edge cases (mid-transition navigation, deep links) | ~2 hours |
| Performance pass (preloading, profiling, fallbacks) | ~2 hours |
| **Total** | **~20–24 hours** of focused work, ~2.5–3 working days |

This is the single biggest motion investment in v1. Per the scope: this is where craft budget concentrates.

---

**Source:** Conversation 2026-05-01. References: `portfolio-scope.md` ("Signature transitions: desk → canvas portal"), `architecture-plan.md`, `prd-canvas-v0.8-notebook.md` (which deferred this transition pending the canvas's open-notebook layout being in place). Now that the canvas's static open spread exists, the transition can connect the two surfaces.
