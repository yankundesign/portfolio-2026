# Motion & Interaction Plan

*May 2026 · desk → canvas → project detail*

## Current read

The project already has the right architecture for the signature moment:

- `/` renders the desk; `/works` renders the open notebook canvas; `/works/:slug` renders project detail.
- `NotebookCover` and `CanvasCloseButton` dispatch transition intents instead of navigating directly.
- `NotebookTransition` owns the desk ↔ canvas overlay, measures the source notebook/spread, runs the WAAPI choreography, and changes route mid-animation.
- The current canvas is the v0.8 open-notebook spread, using `ProjectRow` cards rather than the older 12-column `ProjectCard` plate component.

The main gap is not direction. It is continuity from the opened notebook into project detail: project rows currently navigate instantly.

## Research takeaways

- Keep the desk → canvas transition custom. Native View Transitions are useful for route continuity, but this signature moment needs real CSS 3D hinge motion: `perspective`, `transform-style: preserve-3d`, `rotateY`, and `backface-visibility`.
- Use View Transitions or a FLIP-style overlay for canvas → project. This transition is a better fit for shared element motion than the notebook hinge because the object can be treated as a flat editorial plate moving closer to the reader.
- Treat `prefers-reduced-motion` as a separate choreography, not as a broken version of the default. Replace zoom, pan, and rotation with a short paper crossfade and preserve route/focus continuity.
- Keep `will-change` scoped to the active motion window. Persistent `will-change` on large elements is a performance smell.

Primary references:

- MDN: `Document.startViewTransition()` and the View Transition API
- React Router: `viewTransition` navigation and `useViewTransitionState`
- Motion: shared layout / FLIP layout animation guidance
- MDN: `prefers-reduced-motion`, `perspective`, `transform-style`, `backface-visibility`, `will-change`

Visual references:

- Local Swiss modernist plate reference: register marks and object-as-specimen framing.
- Maryvi Kim: numbered project rhythm and confident portfolio index pacing.
- Jackie Zhang / Codrops process article: concept-first pruning and tactile-but-restrained interaction.
- Museum label references: short identification metadata plus one concise interpretive beat.
- Chrome View Transition demos: thumbnail-to-detail continuity.
- Local layout captures: editorial pacing and image scale ladder for project detail.

## Phase 1 — notebook open/close polish

Target: make the notebook opening feel like a physical object, not a route mask.

Implementation notes:

- Keep the existing WAAPI overlay.
- Keep using the desk notebook asset as the rotating cover so the start/end frame matches the desk pixels exactly.
- Add a subtle spine-shadow layer during the 20%-75% window of the rotation. It should darken the binding, not look like a drop shadow effect.
- Scope heavy `will-change` declarations to `.rootActive` so they only apply during transition.
- Keep open slower than close. Open should read as reveal; close as dismissal with a small landing beat.
- Maintain the reduced-motion path as a 240ms paper crossfade.

Acceptance checks:

- No visible jump between desk notebook and overlay cover.
- No visible jump between overlay spread and real canvas spread.
- Closing lands on the cached desk rect.
- Reduced motion has no 3D rotation, large zoom, or large pan.

## Phase 2 — canvas hover refinement

Target: the canvas should feel like handling a mounted specimen card.

Recommended interaction:

- Keep the current row lift and back-label reveal, but reduce the screenshot bloom from `scale(2)` to a smaller inspected-object scale. The current bloom risks feeling digital and can occlude neighboring content.
- Add a small rule/arrow response inside the project row rather than a generic button highlight. The arrow can extend 3-5px on hover; the title can gain a 1px underline rule.
- Keep the dimming of non-hovered rows, but cap it around 55%-65% opacity. At 40%, the canvas can feel disabled rather than focused.
- Add pointer-down feedback: `translateY(-3px)` from hover, then return to the hover lift. This confirms click without adding a spring.
- On keyboard focus, reveal the same drawer content as hover and keep a strong editorial outline.

Reduced motion:

- Disable lift, tilt, drawer slide, and image scale.
- Keep text reveal and focus outline.
- Keep non-hover row dimming as an instant opacity/filter state.

## Phase 3 — project row → project detail

Target: clicking a row should feel like pulling that plate closer, then entering the project essay.

Recommended technical path:

1. Start with React Router View Transitions as progressive enhancement.
2. Use `navigate(path, { viewTransition: true })` for row click and `<Link viewTransition>` for back-to-works.
3. Assign temporary `view-transition-name`s only during active navigation, using `useViewTransitionState`.
4. Pair the row mockup with the first project detail plate or header visual.
5. Pair the row title/figure number with the project header title/figure number.
6. If the browser lacks View Transition support, fall back to the existing instant navigation plus route entrance fade.

CSS choreography:

- Old canvas row: fade non-selected rows to 0 and let the clicked plate scale toward the detail header.
- New project detail: first header block fades in after the shared element settles.
- Duration: 600-760ms.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for the plate movement; simple ease-out for opacity.

Avoid:

- Full-page zooms.
- Scroll-jacking.
- Elastic/spring easing.
- Page-turn animation for project detail. The click is a zoom into a case study, not another book gesture.

## Phase 4 — canvas composition pass

Target: make the opened notebook page scan as a curated works surface, not four equal navigation rows.

Changes to consider:

- Make CHAI visually dominant through row height, mockup size, or left-page placement, not extra color.
- Let the right page carry the two smaller works as a tighter pair, with a stronger mono caption spine.
- Add one very small page-level status note, such as `SELECTED WORKS · 2021-2026`, but avoid a nav bar or explanatory text.
- Audit the row text size and overflow at 1280px, 1440px, and narrow desktop. The current row system depends on available page width.

## Definition of done

- Desk → canvas and canvas → desk feel continuous in both directions.
- Canvas rows have purposeful hover and focus states without decorative motion.
- Project row → detail navigation preserves spatial context.
- Reduced-motion users get dignified crossfades and no large spatial movement.
- `npm run build` passes.
- Browser verification covers `/`, `/works`, `/works/chai`, close, Escape, and back-to-works.
