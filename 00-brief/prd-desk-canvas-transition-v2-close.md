# PRD: Canvas → Desk Transition v2 — "shut it, set it down"

*2026-09-30 · motion redesign of the notebook close. Companion to `prd-desk-canvas-transition-v2.md`; replaces its §9 ("minimum port"). The open is not touched.*

Implementation handoff. Scope:

- `site/src/components/transition/NotebookTransition.tsx` + `.module.css` (`runClose`, two content containers)
- `site/src/components/desk/NotebookCover.tsx` + `.module.css` (landing mode)
- `site/src/routes/CanvasRoute.tsx`, `site/src/components/canvas/ProjectPlate.tsx` (data attributes only)
- `site/src/interactions/usePlateProofReveal.ts` (export `markRevealSeen`)

No new dependencies, no new assets. The v2 layer model, geometry helpers and light controller are reused as they are.

---

## 1. What is wrong today

Found by pausing the close timeline and stepping it at 1440×900 (recipe in §9).

| # | Timecode | What the frame shows | Why it hurts |
|---|---|---|---|
| 1 | t=0.00s | The overlay's blank pages cover the canvas in one frame. All four plates and the pager vanish. | A hard cut on the first frame. The notebook empties itself before it closes. |
| 2 | t=0.10s | A blank open notebook at two-thirds size floats over the full-size canvas. The plates are visible again around it; the wash is only 27% opaque. | Two notebooks. The same flaw the open had, mirrored. |
| 3 | t=0.20s | Travel is 89% done (`expo.out`); the cover has moved 15°. At edge-on (t=0.36s) the book is already at desk size. | Shrink first, then fold. The whole fold plays at 351px wide, so the cover closing is barely readable. |
| 4 | t=0.28s | Wash fully opaque. A small open book sits alone on blank paper. The desk then fades in at rest scale. | No camera move. The open leans in; the close just cross-fades the world. |
| 5 | t=0.66–1.24s | The book is closed and in place by 0.66s. Then a 16px drop (0.20s), a hold (0.08s) and a fade (0.24s). | 580ms of nothing, with pointer events blocked the whole time. The desk feels locked after the notebook has visibly landed. |
| 6 | t=0.31–0.50s | The desk's own notebook is hidden by a `requestAnimationFrame` after `navigate`, with a fallback at 0.50s. In my background-tab run the rAF never fired and both notebooks were on screen at 0.46s. | Not deterministic. It depends on React committing the route within one frame. |
| 7 | deep link to `/works`, then close | The book lands at the fallback rect: 15px low and 3% small against the real slot. The desk is in its `paper` phase, so the plate is blank. By the code, the notebook then disappears with the overlay and returns about a second later in the make-ready reveal. | Anyone arriving from a shared `/works` link sees the worst version. A window resize while on `/works` causes the same stale-rect miss. |
| 8 | whole swing | `power2.inOut`: the cover lands as softly as it lifts. | A book does not close like it opens. There is no "shut". |

---

## 2. Concept

**The cover shuts over the work, the camera pulls back, and the real notebook is set down.**

The three v2 rules hold: one object, hide by geometry, camera move instead of object zoom. Close adds three of its own:

1. **The plates stay in the book.** Nothing leaves the page. The left plates ride up on the inside of the cover and it closes over the right ones.
2. **Endings cascade.** The cover shuts (0.62s), the book arrives (0.70s), the notebook settles (0.90s). On open the cover is the last thing moving; on close it is the first thing finished.
3. **The desk owns the landing.** The overlay hands off to the real desk notebook while it is still lifted, and the real element sets itself down. This is the open's pre-lift in reverse, and it frees input 540ms sooner.

Close runs 0.90s against the open's 1.14s. Opening is the reveal; closing is dismissal.

---

## 3. The score

`T0` = click on close, or Escape. There is no pre-roll. Times in seconds.

| Track | Target | From → to | Start | Dur | Ease |
|---|---|---|---|---|---|
| Chrome | close button, running footer | `visibility: hidden` | 0 | — | — |
| Swing | proxy θ, via the light controller | 180° → 0° | 0.00 | 0.62 | `CustomEase "0.45,0,0.65,1"` |
| Wash in | `.background` opacity | 0 → 1 | 0.00 | 0.10 | `none` |
| Route swap | `markRevealSeen()`, `navigate('/')` | | 0.10 | — | — |
| Camera | proxy `q` | 0 → 1 | 0.10 | 0.60 | `CustomEase "0.5,0,0.2,1"` |
| Wash out | `.background` opacity | 1 → 0 | max(0.16, desk adopted) | 0.40 | `power1.inOut` |
| Shadow R | `.shadowRight` opacity | 1 → 0 | 0.40 | 0.25 | `power1.in` |
| Pages off | `.pages` opacity | 1 → 0 | 0.56 | 0.06 | `none` |
| Handoff | unhide desk notebook, hide `.book`, state → `idle` | | 0.70 | — | — |
| Set-down | real desk notebook CSS vars → rest | | 0.70 | 0.20 | `power2.out` |

Delete from `runClose`: the `y - 16` lift, the `land` tween, the 80ms hold and the 240ms root fade.

Perceptual targets, in priority order:

1. The cover is visibly lifted (≥ 8°) within 100ms of the click, and the chrome is gone on frame 1.
2. There is never more than one notebook on screen, and never a blank spread.
3. Edge-on falls near 0.33s with the book at about half its travel (roughly three-quarters size). The fold is read large.
4. The last 20° take 100–140ms. It shuts; it does not float and it does not bounce.
5. Endings arrive in order: shut, arrive, down, 80–200ms apart.
6. The desk accepts input at 0.70s.

The starting values land at: 8° at about 100ms, edge-on at 54% of the swing, last 20° in about 125ms, camera 99% complete when the cover shuts.

---

## 4. Camera

Drive the pull-back from one proxy so the desk can join mid-flight without inserting tweens.

```ts
// q: 0 = open spread at identity, 1 = desk pose
const camera = { q: 0 };
let pose = computeBookStartPose(D, S, E);          // D = cached desk rect, for now
let push = { x: Ec.x - Dc.x, y: Ec.y - Dc.y, scale: E.height / D.height };
let stage: HTMLElement | null = null;

function applyCamera() {
  const q = camera.q;
  if (!stage) adoptDesk();
  setBook({ x: pose.x * q, y: pose.y * q,
            scaleX: 1 + (pose.scaleX - 1) * q, scaleY: 1 + (pose.scaleY - 1) * q });
  if (stage) setStage({ x: push.x * (1 - q), y: push.y * (1 - q),
                        scale: 1 + (push.scale - 1) * (1 - q) });
}
```

`adoptDesk()` runs from `applyCamera` until it succeeds:

1. Find `[data-transition-stage="desk"]`. If it is not in the DOM yet, return.
2. Measure the live notebook rect with `readSourceRect('notebook')` **before** writing any transform to the stage. Call `cacheDeskRect`.
3. Recompute `pose` and `push` from the live rect. Set the stage's `transformOrigin` to the notebook centre and `will-change: transform`.
4. Add the wash-out tween to the timeline at `Math.max(0.16, timeline.time())`.

This fixes findings 4, 6 and 7 together:

- The desk scales down from the pushed-in pose in exact lockstep with the book, the reverse of the open's lean-in.
- The landing target is always the live rect, so a missing or stale cache cannot produce a miss. In the common case the live rect equals the cache and nothing visibly changes.
- The wash cannot lift before the desk exists.

Use `gsap.quickSetter` for both targets. Clear the stage's `transform`, `transformOrigin` and `willChange` in `finally`, as the open does.

**First-visit reveal.** Export `markRevealSeen` from `usePlateProofReveal.ts` and call it immediately before `navigate('/')`. The close is the desk's entrance; the make-ready reveal must not play after it. The desk then mounts in the `ready` phase, so none of the plate's own reveal tweens run under the camera move.

---

## 5. Handoff and set-down

**`NotebookCover` landing mode.** When the component mounts and the transition state is `closing`:

- In a layout effect, set `visibility: hidden` on `.notebookBody` and write the lifted pose to the button: `--object-lift-y: -14px`, `--object-scale: 1.025`, `--object-shadow-y: 24px`, `--object-edge-opacity: 0`. Add a `.landing` class with the same `transition: none` rule as `.opening`.
- These are the values the open's pre-lift ends on. The overlay measures the lifted rect in `adoptDesk()`, so the book arrives lifted with no extra code.
- Remove the rAF hide and the 0.50s fallback from `runClose`. The element is hidden before its first paint.

**Handoff at 0.70s**, in one synchronous tick inside the overlay:

1. `deskVisual.style.visibility = ''`
2. `gsap.set(book, { visibility: 'hidden' })`
3. `transitionTo('idle')`, which drops `.rootActive` and frees pointer events

A hard swap, like the open's takeover. The two covers differ by under half a pixel at this pose (measured: 544.1 vs 544.5 left, 350.7 vs 350.9 wide). If a seam shows, fade `.root` over 60ms instead.

**Set-down.** `NotebookCover` listens for the state event directly on `window`, not through React state, so it starts in the same frame. On `idle` while in landing mode, tween the five variables to rest over 0.20s `power2.out` (`--object-edge-opacity` back to `0.78`), then remove `.landing` and clear the inline variables so hover works again. The cast shadow tightens as the notebook comes down, because the shadow already reads those variables.

---

## 6. The plates stay in the book

At `T0`, snapshot what is on the pages and put it on the overlay's surfaces.

**Mark the sources.** Add `data-book-content` to each plate `<article>` and to the pager wrapper in `CanvasRoute`.

**Two containers** in the overlay:

```css
.pagesContent { position: absolute; inset: 0; z-index: 1; }          /* inside .pages, above its scrim */
.backContent  { position: absolute; left: 0; top: 0; width: 200%; height: 100%; z-index: 0; }
                                                                       /* inside .coverBack, above its scrim, below .backShade */
.coverBack    { overflow: hidden; }
.pagesContent *, .backContent * { animation: none !important; transition: none !important; }
```

`.pages` is already clipped to the right half and `.coverBack` shows book-local x from 0 to 50%, so both containers take the **full** set of clones in book-local coordinates and each surface shows its own half.

**Snapshot:**

```ts
function snapshotBookContent(S: TransitionRect): DocumentFragment {
  const fragment = document.createDocumentFragment();
  document.querySelectorAll<HTMLElement>('[data-book-content]').forEach((el) => {
    const r = el.getBoundingClientRect();
    const clone = el.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('video, [data-paper-mesh]').forEach((n) => n.remove());
    clone.removeAttribute('data-paper-bending');
    Object.assign(clone.style, {
      position: 'absolute', margin: '0', maxWidth: 'none',
      left: `${r.left - S.left}px`, top: `${r.top - S.top}px`,
      width: `${r.width}px`, height: `${r.height}px`,
      animation: 'none', transform: 'none',
    });
    fragment.append(clone);
  });
  return fragment;
}
```

Append one copy to `.pagesContent` and a `cloneNode(true)` of it to `.backContent`. Empty both with `replaceChildren()` at handoff and in `finally`.

Rules:

- **Desktop spread only** (`min-width: 1101px`). Below that the plates are a single column that straddles the spine, and a hinge would tear them. Use the fallback.
- **Fallback:** no clones; fade `.root` from 0 to 1 over 100ms at `T0`, so the plates dissolve into blank pages while the cover starts to lift. Also use it if a plate is still mid-entrance (computed opacity below 1).
- Removing the `<video>` leaves the still mockup, which is the loop's first frame.
- The clones lose their route ancestors. If captions shift, copy the computed `font` and `color` of the plates' parent onto the two containers.
- The light controller needs no change: `.backShade` and `.pageShadow` already sit above the content, so the plates darken with the page.

---

## 7. Guardrails

- **Reduced motion and sub-768px:** unchanged 240ms cross-fade. Call `markRevealSeen()` there too.
- Do not animate `opacity`, `filter` or `clip-path` on `.book` or `.cover` during the swing (v2 rule). The fallback fade is on `.root`, which is safe.
- Mid-flight intents stay dropped. The lock now ends at 0.70s.
- If the route never mounts (navigation blocked), `adoptDesk()` never succeeds: end the timeline at 0.70s anyway, hide the book, and clear the wash.
- Escape while a plate is bent or playing its preview is covered by the mesh and video removal in §6.
- `visibility` on the desk notebook, the stage transform and both content containers are restored in `finally`.

---

## 8. Build order and checks

Each phase is shippable.

**Phase 1 — score and camera (findings 3, 4, 5, 6, 7, 8).** Camera proxy and `adoptDesk()`, new swing ease, wash retime, navigate at 0.10s, `markRevealSeen`, landing mode, handoff at 0.70s, delete the tail. Use the §6 fallback fade for the plates.
- Check: at any paused time after 0.16s the desk is visible and larger than rest; it reaches rest scale with the book.
- Check: at edge-on the book is clearly bigger than the desk notebook.
- Check: hovering the CV at 0.75s shows its hover state.
- Check: clear `sessionStorage`, load `/works` directly, close. The book lands on the real slot on a fully drawn desk, and no make-ready reveal follows.
- Check: open, resize the window on `/works`, close. No jump at handoff.

**Phase 2 — plates stay in the book (findings 1, 2).** Data attributes, containers, snapshot.
- Check: pause at `T0 + 0.001`; toggling `.root` visibility changes no pixels on the pages.
- Check: at 45° of lift the left plates are foreshortened and shaded with the inside cover; the right plates sit under the retreating page shadow.
- Check: close from spread 2 (`?page=2`).

**Phase 3 — polish.** Tune against the §3 targets. Compare `.shadowRight` fading out with the desk cast shadow coming in; they should cross without a dark double. Hide the chrome on frame 1: mark the close button and running footer with `data-canvas-chrome` and have the overlay set `visibility: hidden` on them at `T0`, since waiting for React state costs a frame.

**Phase 4 — Back button (optional).** Today browser Back from `/works` cuts straight to the desk. When the location effect sees `open` → `/` that the overlay did not initiate, run the close with the wash starting at 1, no clones, no `navigate`, and the desk adopted immediately. Do it in a layout effect so the desk is never painted bare. This is the same animation minus its first 100ms.

**Phase 5 — QA and docs.** 768, 1024, 1100, 1101, 1280, 1440, 1920, 2560. Reduced motion. Decisions-log entry. Update the header comment in `NotebookTransition.tsx`.

---

## 9. Frame-step recipe

Dev server, browser console, starting on `/works` after a normal open:

```js
const { gsap } = await import('/src/interactions/gsap.ts');
window.dispatchEvent(new CustomEvent('notebook:close'));
const tl = gsap.globalTimeline.getChildren(false, false, true).find((t) => 'fold' in t.labels);
tl.pause();
tl.time(0.33);   // scrub
```

Keep a `fold` label at 0 in the new timeline so this keeps working. Scrubbing past the route swap navigates for real; give React a moment before reading the desk. Run the test in a foreground tab: in a background tab `requestAnimationFrame` does not fire, which is how finding 6 showed up.

---

## 10. Tuning knobs

| Knob | Start | Range | Effect |
|---|---|---|---|
| Swing ease | `0.45,0,0.65,1` | x1 0.35–0.6 | higher x1 = slower peel off the page |
| | | x2 0.5–0.75 | higher x2 = harder shut |
| Swing duration | 0.62s | 0.55–0.72 | weight of the cover |
| Camera delay | 0.10s | 0.06–0.16 | how long the fold is seen at full size |
| Camera ease | `0.5,0,0.2,1` | x2 0.1–0.35 | lower x2 = longer glide into the slot |
| Wash out | 0.40s | 0.30–0.50 | how early the desk reads |
| Set-down | 0.20s | 0.16–0.26 | weight of the landing |

---

## 11. Decisions to confirm

- **Closing from a deep link skips the first-visit make-ready reveal.** Recommended: the close is a better entrance than a second animation stacked after it.
- **The plates stay on the page during close but are placed fresh on every open.** Recommended as is: tipping prints in is the open's payoff, and closing over them is the close's.
- **Back-button close** (Phase 4) is optional and can ship later.
