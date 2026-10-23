# PRD: Desk → Canvas Transition v2 — "one book, one gesture"

*2026-09-30 · motion redesign of the notebook open. Supersedes the choreography in `prd-desk-canvas-transition.md`; the event bus, state machine and reduced-motion contract stay.*

Implementation handoff. Everything here is scoped to:

- `site/src/components/transition/NotebookTransition.tsx` + `.module.css` (most of the work)
- `site/src/components/desk/NotebookCover.tsx` + `.module.css` (trigger)
- `site/src/routes/CanvasRoute.tsx` (one constant), `site/src/components/shared/EditorialPlate.tsx` (one data attribute)
- `site/src/interactions/gsap.ts` (register `CustomEase`), `site/src/styles/tokens.css` (perspective token)

No new dependencies. No new bitmap assets.

---

## 1. What is wrong today

Found by pausing the GSAP timeline and stepping it at 1440×900 (recipe in §11).

| # | Timecode | What the frame shows | Why it hurts |
|---|---|---|---|
| 1 | t=0.42s | Two notebooks. The overlay cover has flown right and grown 1.5×; the desk's own notebook is still in its slot, ghosting under the paper wash. | The object teleports. The viewer sees a copy leave, not the notebook move. |
| 2 | t=0.42s | Travel is 71% done (`expo.out`), rotation is 5% done (`power2.inOut`). | Two gestures in series: a UI zoom, then a flip. "Open" is not the first thing that happens. |
| 3 | t=0.60s | The whole open spread, both pages, is already about 40% opaque and clearly readable while the cover is at only −34°. | A closed notebook is sitting on top of an already-open one. The reveal is an opacity fade unrelated to the cover. The payoff is spent before the cover moves. |
| 4 | t=0.74s | At −92° the cover is a 1px white line. | No board thickness, so the object vanishes at its most dramatic angle. |
| 5 | t=0.86–1.21s | The inside of the cover is a cool grey card with a wireframe box. It lands inset from the left page (531px wide against a 640px board), then dissolves. | The inside face is a different object from the page it lands on: wrong colour, wrong size, placeholder art. A hardcover does not dissolve. |
| 6 | whole swing | Cover luminance is constant. No shadow crosses the page. | Light sells a hinge, more than perspective does. Without it the rotation reads as a CSS card flip. |
| 7 | click → 0.46s | Button pre-lift (180ms), then overlay lift (220ms), then a hold (60ms), before the hinge starts. | 460ms of lifting. The click feels laggy. |
| 8 | takeover frame | Desk notebook is tilted up to 5.5° by `useObjectTilt`; the overlay cover is flat. Hinge origin is the image box's left edge, but the visible board starts 7.2% in. | A pop at takeover, and the cover swings around a point outside the book. |

Root cause of 1, 3 and 5: the overlay is three unrelated pictures (cover, spread, wash) cross-faded on independent clocks. The fix is structural, not a retime.

---

## 2. Concept

**The camera leans in while the cover opens. Nothing that belongs to the book ever fades.**

Three rules:

1. **One object.** The desk notebook is hidden the frame the overlay takes over. The inside of the cover *is* the left page of the spread, using the same bitmap. The page block under the cover *is* the right half of the spread.
2. **Reveal by geometry.** Pages become visible because the cover moved off them. Opacity is reserved for the desk leaving and the overlay handing off.
3. **Camera move, not object zoom.** The desk scales in lockstep with the book, so the notebook never leaves the desk. This is the "camera pushes in" from the original portal brief.

Timing gets shorter: touchdown at 1.14s from click (was 1.40s), first plate at 1.20s (was 1.63s).

---

## 3. Layer model

Replace the three sibling layers with one book group.

```
.root                      perspective; fixed; unchanged role
  .background              paper wash (unchanged)
  .book                    box = final spread rect. The ONLY element that carries the camera push.
    .shadowRight           static-blur shadow plate under the right board
    .shadowLeft            static-blur shadow plate under the left board
    .pages                 <img open-notebook.webp>, clip-path: inset(0 0 0 50%) until touchdown
    .pageShadow            shadow the cover casts on the right page
    .gutter                existing .spineShadow, now inside .book
    .cover                 box = right half of .book; hinge = its left edge
      .coverFront          closed-cover <img> + .frontShade
      .coverBack           left half of open-notebook.webp + .backShade
      .coverEdge           board thickness strip
```

CSS for the new pieces (all percentages are derived in §4 and need no JS):

```css
.book        { position: absolute; transform-origin: 0 0; transform-style: preserve-3d; }
.pages       { position: absolute; inset: 0; width: 100%; height: 100%; clip-path: inset(0 0 0 50%); }
.cover       { position: absolute; left: 50%; top: 0; width: 50%; height: 100%;
               transform-origin: 0 50%; transform-style: preserve-3d; }
.coverFront  { position: absolute; left: -8.2%; top: -1.23%; width: 114.2%; height: 104.75%;
               backface-visibility: hidden; isolation: isolate; }
.coverFront img { width: 100%; height: 100%; object-fit: fill; }   /* fill, not contain */
.coverBack   { position: absolute; inset: 0; backface-visibility: hidden; isolation: isolate;
               background: url('/canvas/open-notebook.webp') 0 0 / 200% 100% no-repeat;
               transform: rotateY(180deg); }
.coverEdge   { position: absolute; left: 99.14%; top: 3.1%; height: 96.5%; width: 1.2%;
               margin-left: -0.6%; background: var(--ink); transform: rotateY(90deg); }
```

Notes:

- `.coverBack` at −180° lands exactly on the left half of `.pages`: same image, same box. At touchdown remove the clip and hide `.cover` in the same frame, and nothing changes on screen.
- Delete the wireframe `.coverBack::before/::after` and its gradient background.
- `.pages` and `.coverBack` each need the same 18% paper scrim the route applies in `CanvasRoute.module.css .backdrop::after`. Without it the final handoff shifts tone.
- Move the drop-shadow off the images and onto `.shadowRight` / `.shadowLeft` (a clipped image clips its own filter shadow). Target the route's value: `0 12px 28px` ink at 16%.
- **Never animate `opacity`, `filter` or `clip-path` on `.book` or `.cover` during the swing.** Any of them forces `transform-style: flat` and kills the perspective. Fade the children or `.root` instead.

---

## 4. Geometry

Measured from the alpha channel of both assets:

```ts
// Fractions of the closed-cover image box (947×1380) occupied by the visible book
const COVER_BOARD = { left: 0.0718, top: 0.0413, right: 0.9398, bottom: 0.9630 };
// Fractions of the spread box (3234×2255) occupied by the right-hand board
const RIGHT_BOARD = { left: 0.5, top: 0.0310, right: 0.9957, bottom: 0.9965 };
```

The closed book must sit exactly where the right board of the spread is. Mapping `COVER_BOARD` onto `RIGHT_BOARD` gives the end-pose rect of the closed-cover image (`S` = `computeCanvasSpreadRect()`):

```ts
function computeCoverEndRect(S: TransitionRect): TransitionRect {
  return {
    left:   S.left + 0.4590 * S.width,
    top:    S.top  - 0.0123 * S.height,
    width:  0.5711 * S.width,
    height: 1.0475 * S.height,
  };
}
```

This replaces `computeOpenCoverRect`, which undersizes the cover (531px against a 640px board at 1440×900) and is the cause of finding 5.

**Book start pose.** `D` = measured desk notebook rect, `E` = `computeCoverEndRect(S)`. `.book` is laid out at `S` and starts at:

```ts
const sx = D.width / E.width;
const sy = D.height / E.height;
const x  = D.left - S.left - (E.left - S.left) * sx;
const y  = D.top  - S.top  - (E.top  - S.top)  * sy;
// gsap.set(book, { x, y, scaleX: sx, scaleY: sy }) → tween to { x: 0, y: 0, scaleX: 1, scaleY: 1 }
```

At 1440×900: `sx 0.476, sy 0.542, x 188, y 177`.

Two things to know:

- **The anchor moves from the desk rect to the final rect.** This reverses the v1.4 decision. Reason: the end frame is 2× larger and is where the eye rests, so it gets transform identity and a crisp raster. The start frame is a downscale (clean) and is in motion from frame 1.
- **`sx ≠ sy`.** The closed asset's board aspect is 0.646 and the open asset's right board is 0.736, so the cover stretches 14% horizontally over the push. It starts at its true aspect (matches the desk) and the stretch accumulates while the cover is foreshortening, so it is not readable. The pages share the transform but are hidden behind the cover until it lifts.

**Desk camera match.** Add `data-transition-stage="desk"` to the `EditorialPlate` root (`.plate`). The overlay tweens it with the same duration and ease as the book:

```ts
const Dc = centre(D), Ec = centre(E);
gsap.set(stage, { transformOrigin: `${Dc.x - stageRect.left}px ${Dc.y - stageRect.top}px` });
// tween to: { x: Ec.x - Dc.x, y: Ec.y - Dc.y, scale: E.height / D.height }
```

Position and vertical scale are exactly in lockstep with the book (both are linear in the same eased progress). `html, body` are already `overflow: hidden`, so the scaled plate cannot produce scrollbars. I found no `position: fixed` descendants in the desk components (a transform would re-anchor them); confirm before shipping.

**Perspective.** The cover is now 640px wide, so at 1600px the edge-on frame would be 1.67× book height and leave the viewport. Set `--transition-perspective: 260svh` (edge-on ≈ 1.38×). Tunable 220–320svh.

---

## 5. The score

`T0` = the frame the overlay takes over, 160ms after click. Times in seconds from `T0`.

| Track | Target | From → to | Start | Dur | Ease |
|---|---|---|---|---|---|
| Takeover | desk `.notebookBody` | `visibility: hidden` | 0 | — | — |
| Push | `.book` | start pose → identity | 0.00 | 0.88 | `CustomEase "0.5,0,0.1,1"` |
| Push | desk stage | identity → camera match | 0.00 | 0.88 | same |
| Swing | proxy `p` 0 → 1, `θ = 180·p` | `.cover` rotationY 0 → −180 | 0.04 | 0.94 | `CustomEase "0.45,0,0.4,1"` |
| Wash | `.background` opacity | 0 → 1 | 0.08 | 0.38 | `power1.inOut` |
| Pages on | `.pages` opacity | 0 → 1 | 0.10 | 0.08 | `none` |
| Shadow R | `.shadowRight` opacity | 0 → 1 | 0.10 | 0.40 | `power1.out` |
| Route swap | `navigate('/works')` | | 0.50 | — | — |
| Touchdown | unclip `.pages`, hide `.cover` | | 0.98 | — | — |
| Handoff | `.root` opacity | 1 → 0 | 0.98 | 0.18 | `power2.out` |

Delete the overlay's own lift (`y: -16`), the −5° pre-rotation and the 60ms hold. The anticipation is the ease-in of the swing.

Perceptual targets, in priority order. Tune the numbers until these hold:

1. The camera is visibly moving within 80ms of `T0`, and the cover is visibly cracked (≥ 8°) within 200ms.
2. Edge-on (90°) falls at 40–45% of the swing, while the camera is still drifting (push 70–85% complete). Opening and approaching overlap; neither finishes first.
3. The last 20° take 220–280ms. Shorter slaps, longer floats.
4. The camera is at rest at least 80ms before touchdown. The cover is the last thing moving.
5. The desk is still partly visible, and visibly scaling, for the first ~300ms.

The starting values in the table land at: 8° at 180ms, edge-on at 44% with the push 82% done, last 20° in about 270ms, camera at rest 100ms before touchdown.

`.pages` is held at opacity 0 for the first 100ms only so the rounded-corner mismatch between the two assets cannot show at the takeover frame. This is the one sanctioned fade on the book.

---

## 6. Light

Drive everything from the swing proxy's `onUpdate` with `gsap.quickSetter`, so light can never drift from the angle. `θ` in degrees, 0–180. Transform and opacity only.

| Element | Looks like | Value |
|---|---|---|
| `.frontShade` | cloth turning away from the lamp | opacity `0.45 · sin θ`, for θ ≤ 90 |
| `.backShade` | endpaper leaving its own shadow as it lies down | opacity `0.32 · sin θ`, for θ ≥ 90 |
| `.pageShadow` | cover's shadow retreating into the gutter | `scaleX = clamp(cos θ + 0.35·sin θ, 0, 1)` from the spine; opacity `0.34 · sin θ` |
| `.gutter` | crease deepening mid-turn | opacity `0.5 + 0.5 · sin θ`, then fades with the handoff |
| `.shadowLeft` | contact shadow collapsing on touchdown | `scaleX = max(0, −cos θ)` from the spine; opacity ramps 0 → 1 across θ 100 → 180 |

Styling:

- Shades are `var(--ink)` with `mix-blend-mode: multiply`, inside the `isolation: isolate` face. Multiply darkens navy cloth without a new colour token. If blending misbehaves inside the 3D context in Safari, fall back to `color-mix(in srgb, var(--ink) 60%, black)` at the same opacities.
- `.backShade` and `.pageShadow` are horizontal gradients, darkest at the spine.
- `.pageShadow` reads as the page being uncovered by light from the fore-edge toward the gutter. This is the single most important shadow; build it first.
- `.shadowLeft` ends identical to the route backdrop's drop-shadow, so touchdown and handoff are seamless.

---

## 7. Trigger (`NotebookCover.tsx`)

Replace the 60ms + 120ms pre-lift with one 160ms `power2.out` tween that also squares the notebook to camera:

- `--object-tilt-x`, `--object-tilt-y` → `0deg` (fixes the tilted-to-flat pop, finding 8)
- `--object-lift-y` → `-14px`, `--object-scale` → `1.025`, `--object-shadow-y` → `24px`
- fade the `::before` / `::after` page-edge pseudo-elements to 0 through a new `--object-edge-opacity` variable, so they do not blink out at takeover
- ignore `pointermove` tilt writes once the click lands

The overlay then measures `[data-transition-visual-source="notebook"]` as it does today and hides that element. The cast shadow stays on the desk and scales away with it.

Optional: a 2px press on `:active` (scale 0.992, shadow tightens) so the pointer-down is felt before the lift.

---

## 8. Handoff to the canvas

- With the scrim and shadow plates matched, the overlay's last frame equals the route's backdrop. The 180ms `.root` fade is then a safety net, not a visible beat.
- `CONTENT_ENTER_DELAY_AFTER_TRANSITION`: **560 → 360**. The route mounts at `T0+0.50`; the first plate should start at touchdown + 60ms (`T0+1.04`), and `ProjectPlate.module.css` adds its own 180ms. The plates land on the page the cover just laid down, with no empty-notebook beat.
- Close button and footer delays hang off the same variable and need no change.

---

## 9. Close

Open and close share the DOM, so close must be ported in the same change.

Minimum port: same layers, start at the open end state (`.book` identity, `.cover` −180°, `.pages` clipped again in the first frame), reuse the existing close timings, land on the desk rect, and keep the current settle and fade. Use the same proxy-driven light.

Skip the desk camera match on close for this pass. The desk route remounts mid-flight and runs its own proof-reveal, so matching it is a separate task.

---

## 10. Guardrails

- **Reduced motion:** unchanged 240ms paper cross-fade. The new layers stay `display: none` under `.reducedMotion`.
- **Narrow viewports:** below 768px the right board is mostly off-screen. Check 390×844 and, if the hinge does not read, route sub-768px through the reduced path.
- **Compositor only.** No per-frame `filter`, `width/height`, `box-shadow` or `clip-path` animation. Blurs are static and rasterised once. `will-change: transform` only under `.rootActive`, and on the desk stage only for the duration of the push.
- **Raster:** the closed-cover asset (947px wide) is upscaled about 1.5× on a 2× display at the end of the push. It is past 60° by then. Do not swap in the PNG.
- Mid-flight clicks stay dropped (`isRunningRef`), as today.
- Restore the desk notebook's `visibility` and the stage transform in the timeline's cleanup path.

---

## 11. Build order and checks

Each phase is shippable. Stop after any of them.

**Phase 1 — one object (fixes findings 1, 3, 5, 8).** Layer model, geometry, `.coverBack` as the left page, clip and unclip, hide the desk notebook, hinge at the board edge. Keep the old timings.
- Check: pause at any time; there is never more than one notebook on screen.
- Check: at −180°, toggling `.cover` visibility changes no pixels.
- Check: left of the spine is blank paper until the cover sweeps over it.

**Phase 2 — the score (findings 2, 7).** New timeline, `CustomEase`, desk camera match, trigger rewrite, plate delay.
- Check: the five perceptual targets in §5.
- Check: at `T0+0.25` the desk grid lines are visibly larger than at rest and still legible.

**Phase 3 — light (finding 6).** Proxy-driven shades and shadow plates.
- Check: step 0 → 180° in 15° increments; no shade is visible at 0° or 180°.

**Phase 4 — polish (finding 4).** `.coverEdge`, the `:active` press, perspective tuning.

**Phase 5 — close port,** then reduced-motion and breakpoint QA at 390, 768, 1024, 1280, 1440, 1920 and 2560. Add a decisions-log entry (it must record the v1.4 anchor reversal) and update the header comments in `NotebookTransition.tsx` / `.module.css`.

**Frame-step recipe** (dev server, browser console):

```js
const { gsap } = await import('/src/interactions/gsap.ts');
window.dispatchEvent(new CustomEvent('notebook:open'));
const tl = gsap.globalTimeline.getChildren(false, false, true).at(-1);
tl.pause();
tl.time(0.42);   // scrub; tl.labels lists the beats
```

Dispatching the event skips the button pre-lift. Click the notebook to test the full path, and run it at `gsap.globalTimeline.timeScale(0.2)` for a slow-motion pass.

---

## 12. Tuning knobs

| Knob | Start | Range | Effect |
|---|---|---|---|
| Push ease | `0.5,0,0.1,1` | x1 0.3–0.6 | lower x1 = camera leaves sooner |
| Swing ease | `0.45,0,0.4,1` | x2 0.25–0.5 | lower x2 = longer, softer landing |
| Swing duration | 0.94s | 0.85–1.05 | weight of the cover |
| Swing delay | 0.04s | 0–0.10 | how much "lean in" leads "open" |
| Perspective | 260svh | 220–320 | drama of the edge-on frame |
| Front shade peak | 0.45 | 0.3–0.55 | contrast of the turn |
| Page shadow reach | 0.35 | 0.2–0.5 | implied lamp angle |

---

## 13. Not in this pass

- **Elastic band.** The closed asset has the band on the fore-edge; the open asset has it at the spine. A band-release beat before the swing would be the best anticipation available, but it needs a band-less cover and a separate band strip. Asset work, deferred.
- **Matched-aspect cover asset.** Re-cutting the closed cover to a 0.736 board aspect would remove the 14% stretch.
- **Desk camera match on close**, sound, and page-turn transitions inside the notebook.
