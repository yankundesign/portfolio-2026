# Fidget toy references

*Collected 2026-04-19 · for the "desk fidget" moment on the homepage*

## What the best examples have in common

- **One thing, done well.** Never a suite of toys. One mechanic, with a short 3–8 second engagement window.
- **Tactile physics over clever ideas.** Elastic drag, spring return, momentum-based spin. The math of it has to be right before the visual.
- **Restraint in the visuals.** The interaction earns the attention. Neon glitch, chiptune sound, and emoji payoffs read as try-hard.
- **Quiet placement.** On editorial sites, the fidget sits in a corner or at the fold — punctuation, not headline.

What to steal: elastic drag + spring return is the single highest-payoff mechanic in this survey. Pure spinners are less satisfying than spinners with *weight* (momentum, slow decel, slight wobble).

---

## 1. Pure fidget / toy sites

**Neal.fun** — [neal.fun](https://neal.fun)
Single-purpose interactive pages. Philosophy: minimal interface, maximum delight in one mechanic.

**Tim Holman · Toy Collection** — [tholman.com](https://tholman.com)
Veteran creative engineer. Musical Toys, Ant Toys, Optical Toys — each a self-contained interaction, modeling "one thing, done well."

**Paper Planes** — [paperplanes.world](https://paperplanes.world)
Fold, throw, and track a paper airplane across a 3D globe. Active Theory. Drag-and-release gesture with real consequence (trajectory).

**BigJobby Pop-It** — [bigjobby.com/toys/pop-it](https://bigjobby.com/toys/pop-it/)
Browser pop-it simulator. Soft pop, tactile feedback, infinite reuse. Direct translation of a physical fidget.

## 2. Tactile moments on editorial / portfolio sites

**Bruno Simon** — [bruno-simon.com](https://bruno-simon.com)
Drive a miniature car around the portfolio (Three.js). Benchmark for "the portfolio IS the interaction." Probably too much for our needs, but the physics quality is the bar.

**Active Theory** — [activetheory.net](https://activetheory.net)
Hover a project tile, neighbors drop 2px — a rack-focus effect. Weight-conscious, doesn't demand attention.

**Lusion** — [lusion.co](https://lusion.co)
WebGL studio portfolio. Tile hovers bloom into 60fps trailers. Restraint + responsiveness = delight.

**Josh W. Comeau · Animation articles** — [joshwcomeau.com/animation](https://joshwcomeau.com/animation/)
Small illustrative interactions embedded in essays. Shows how a fidget can also teach.

## 3. CodePen / Codrops demos

**Fidget spinner with motion blur** — [codepen.io/artyom-ivanov/pen/gRmXwv](https://codepen.io/artyom-ivanov/pen/gRmXwv)
CSS/SVG spinner, draggable, velocity-responsive. Motion blur on fast spin is the key move.

**Elastic stack (Codrops)** — [tympanus.net/codrops/2013/11/12/elastic-stack-elastic-dragging-interaction](https://tympanus.net/codrops/2013/11/12/elastic-stack-elastic-dragging-interaction/)
Drag the top card, others follow elastically. Snap back on release. No heavy library.

**Playful drag interactions (Codrops)** — [tympanus.net/codrops/2015/07/08/playful-interaction-for-draggable-elements](https://tympanus.net/codrops/2015/07/08/playful-interaction-for-draggable-elements/)
Elements morph with drag position. Snap back with bounce.

**Wobble** — [codepen.io/neave/pen/yLNaLMw](https://codepen.io/neave/pen/yLNaLMw)
Deformable surface that returns smoothly. Weight and return are the whole trick.

**Fidget spinner 3.0** — [codepen.io/DavidBendahan/pen/zzOogK](https://codepen.io/DavidBendahan/pen/zzOogK)
Click-to-spin with momentum and decel. Useful reference for the physics of deceleration.

## 4. Kinetic type / micro-interactions

**Spring physics, friendly intro** — [joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)
Mass, tension, friction — interactive sliders. Use as a parameter reference.

**3D button** — [joshwcomeau.com/animation/3d-button](https://www.joshwcomeau.com/animation/3d-button/)
Single elegant hover: button stretches and the tips pull inward. One microinteraction, fully resolved.

**Hakim El Hattab · sketch toys** — [hakim.se](https://hakim.se)
Kinetic drawing tools with gravity and friction. Constraint makes play feel grounded.

---

## Candidate objects for the desk

Ranked against: fits the two-color palette, fits the Field Notebook metaphor, builds in a reasonable time.

**A. A pencil or pen you can roll** *(strongest candidate)*
The pen already exists in the scene. Give it momentum. Click-and-drag rolls it across the lower-right of the notebook; release and it coasts with decel. Hover proximity nudges it. Natural, not explained, no new object. Pairs with the pen already in the composing sequence.

**B. A coin or token, stamped ink-blue**
Sits on the desk, spins when dragged. Motion blur on fast spin. Engraved with a monogram or "YK · 2026." Cheeky — a designer's coin flip.

**C. A stretched-paperclip**
Paperclip on the desk surface. Drag the end — it elongates elastically, snaps back with a small ting (visual only, no sound). Physical, unexpected, uses almost zero new assets.

**D. An elastic band across the notebook**
The cover already has an elastic. Make it pluckable. Drag it sideways and release — it twangs back with a 2px jitter. Zero new objects. Highest "already lives here" score.

**E. A marble or ball with inertia**
Roll it across the desk. Settles into a corner. Pairs with option D (the elastic catches it if you aim well).

## Current lean

**D (elastic band) + A (pen roll)**, both on existing objects, both reinforce "this desk is still being used." Neither adds a new object. The elastic pluck is the more surprising of the two; the pen roll is the more physical. Could ship D first and add A in a later pass.
