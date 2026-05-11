# Desk Asset Prompts

*April 2026 · Companion to `prd-desk-density.md`*

Five new ephemera assets to generate for the desk material density pass. Plus three small material-treatment SVGs that stay inline.

All assets honor the two-color discipline: ink blue (`#16265e`) and paper cream (`#f4f1ea`) tones only. Engraved/etched line work is the dominant rendering style. No greens, no warms beyond `--paper-shadow` (`#ddd6c2`).

---

## Asset 1 — Architectural / engineering sketch on graph paper

**Purpose:** Centerpiece of the "behind the notebook" treatment. Tucked behind/beside the notebook cover, held by the elastic strap or a binder clip. Provides a *working sketch* register — sketchy, in-progress, with visible construction lines — which pairs against Asset 2's *finished, engraved* postage illustration. Two different drawing registers (working drawing vs. polished print) is the intent; they should not look like the same illustration tradition.

**File:** `site/public/desk/architectural-sketch.png` (or .webp)

**Dimensions:** ~600×800 px, transparent background

**Style:** Hand-drawn pencil/ink sketch of a single precision instrument — for example, a draftsman's compass / dividers, a sextant, a theodolite or surveyor's level, a set of nested calipers, a folding parallel rule, a brass pocket sundial, or a mechanical mechanism cross-section (gears, pulleys, a clock movement). Subject matter is functional / scientific / draftsman's tool, **not decorative or domestic**. Architectural / engineering working-sketch register: visible construction lines (faint dashed or dotted lines running vertically/horizontally from key points of the object showing the geometry was constructed against a grid), small dimension marks or measurement notations at the side, possibly tiny pencil annotations at the margins (illegible at this scale). The drawing should feel *in progress* — slightly sketchy, with confident but not photorealistic line work, NOT the polished engraved style of a botanical specimen plate. Drawn on a rectangular fragment of cream graph paper (visible grid behind the drawing, ~5mm squares, very faint blue). The paper is intact — a complete rectangle with all four corners present. Edges are clean — either carefully cut or *gently* hand-torn so they read as deliberate, slightly soft, but never jagged or ragged. No deckle, no missing corners, no tear-outs. Small typeset annotation below the drawing in tiny mono caps (e.g., `FIG. 12 · INSTRUMENT STUDY` or `FIG. 12 · COMPASS, ELEVATION`).

**Prompt for ChatGPT/image-gen:**

> A rectangular sheet of cream graph paper, photographed from directly above on a flat surface. The paper is intact — a complete rectangle with all four corners present. Edges are clean and deliberate, as if the paper was carefully torn or cut from a sketchbook with care; edges may be subtly soft but are NOT jagged, ragged, or deckled, and no corners are missing. On the paper is a hand-drawn pencil-and-ink working sketch of a single precision instrument — for example a draftsman's compass with adjustable extension arm, a sextant with its arc and sighting telescope, a brass theodolite on a tripod, a set of nested machinist calipers, or a cross-section of a small clockwork mechanism showing gears and escapement. The subject is functional and mechanical, NOT decorative, NOT a vessel, NOT a lamp, NOT a piece of furniture. Render the drawing as a draftsman's working sketch, NOT a finished botanical specimen plate: visible faint dashed construction lines run vertically from key points of the object showing the geometry was constructed against the grid; small tick marks and tiny pencil dimension notations appear at the side margins. The line work is confident and architectural, hatching for shading where appropriate, but slightly sketchy — clearly in-progress, not a finished print. Drawing rendered in dark navy ink (#16265e). The graph paper background has a faint pale blue 5mm grid. A tiny typewriter-style caption near the bottom of the paper reads "FIG. 12 — INSTRUMENT STUDY" in monospace caps. Two-color palette only: dark navy ink and warm cream paper. No other colors. No background — the paper sits on transparent. Photographic realism with subtle paper grain texture. Resolution 600x800 pixels. Square-on overhead view, no perspective.

**Integration:** Mounted at cols 7–9 in the desk slot grid, behind the notebook (z-order below). Visible portion peeks above the notebook's top edge by ~80–120px. Held in place by the binder clip (Asset 6, inline SVG) at the visible top corner.

**Why this register pairs well with the rest of the desk:** The engraved botanical on Asset 2's postage stamp is a *finished, printed* artifact — a small piece of polished commercial illustration. The architectural sketch on Asset 1 is the opposite: a working artifact, in-progress, with the construction marks still visible. Together they show two *kinds* of drawing — one finished, one in progress — which echoes the desk's broader register (a workspace, where finished things and in-progress things share the surface). The blueprint fragment (Asset 4) is yet a third register: precise white-on-navy technical drawing, mechanically reproduced. Three drawing registers, no two alike.

---

## Asset 2 — Postage stamp with botanical illustration + cancel mark

**Purpose:** Small ephemera near the CV card area. Reads as torn from a real envelope corner. Provides a postal/material moment that reinforces the "field notebook" vocabulary.

**File:** `site/public/desk/postage-stamp.png`

**Dimensions:** ~240×320 px, transparent background

**Style:** A real-feeling postage stamp with perforated edges (the actual zigzag perforation, not a vector approximation). Stamp depicts an engraved botanical illustration in dark navy ink on cream paper — could be a small sprig of leaves, a wheat stalk, or a similar simple botanical motif. Denomination "15" in the upper-left corner in classic stamp typography. A circular postal cancel mark (with partially-legible ink-stamp text — date, city — irregular density, slightly off-axis, partially covering the stamp) overlays it. Stamp slightly rotated (~3–5° clockwise), as if torn from an envelope.

**Prompt for ChatGPT/image-gen:**

> A vintage postage stamp photographed from directly above on a flat cream surface. The stamp has classic perforated edges (small zigzag holes). On the stamp: an engraved 19th-century-style botanical illustration of a sprig of leaves, rendered in dark navy ink (#16265e) on cream paper. The denomination "15" appears in the upper-left corner in serif type. A circular postal cancellation mark — dark navy ink, irregular density (some areas darker, some lighter), slightly off-axis — partially overlays the stamp. The cancel mark has barely-legible text suggesting a date and city. The stamp is slightly rotated about 4 degrees clockwise. Two-color palette: dark navy and cream. No other colors. Transparent background — only the stamp. Photographic realism with subtle paper texture and the perforation edges visible. Resolution 240x320 pixels. Square-on overhead view.

**Integration:** Mounted at cols 9–10, between the notebook and the CV card, near the top edge of the desk plate. No attachment fiction needed — it reads as a torn corner laid on the desk.

---

## Asset 3 — Fabric swatch composition (layered pieces, varying sizes)

**Purpose:** Material variety. Sits *under* the CV card to add textile texture below the paper texture. Signals craft attention without competing for visual weight. Asymmetric layered composition — not a single 50/50 split — to feel like real swatches collected and laid down on a surface, not a single sample card.

**File:** `site/public/desk/fabric-swatch.png`

**Dimensions:** ~420×320 px, transparent background

**Style:** Two or three small fabric swatches of *clearly different sizes*, layered loosely on top of each other. Composition: a larger swatch underneath (the "base," roughly 70–80% of the asset's footprint) in one color/texture, with one or two smaller swatches (~30–40% the size of the base) layered on top at slight offsets. Color allocation is asymmetric — the dominant base color should occupy maybe 60–70% of the visible area, with the accent color(s) on top covering a much smaller portion. All swatches have woven texture clearly visible. Edges of each swatch are softly deckled / hand-cut / frayed — the swatches are real fabric pieces, not stamped rectangles. The layered arrangement is loose and slightly off-axis, like swatches just placed down rather than precisely aligned.

**Prompt for ChatGPT/image-gen:**

> A small composition of two or three fabric swatches photographed from directly above on a flat surface. The swatches are clearly different sizes: a larger base swatch underneath in textured warm gray linen, roughly the dominant footprint of the composition, with one (or two) smaller accent swatches in dark navy blue (#16265e) linen layered loosely on top of it. The smaller swatches each cover roughly 25–35% the area of the base; they are NOT the same size as the base. Total color allocation should feel asymmetric — gray dominant, navy accent — NOT a 50/50 split, NOT a seamed two-tone single piece. The smaller swatches sit at slight off-axis angles, as if just placed down. All edges of every swatch are softly frayed or hand-cut with subtle loose threads visible at corners. Both fabrics show clear visible weave texture. Photographic realism, soft directional light from upper-left, gentle drop-shadow under the top swatches showing the layering depth. Two-color palette: warm gray, deep navy. No background — transparent around the entire composition. Resolution 420x320 pixels. Square-on overhead view.

**Integration:** Mounted at cols 10–12, vertically under the CV card slot. Z-order below the CV card. Visible portion peeks out from under the CV card by ~30% of the swatch area.

---

## Asset 4 — Blueprint fragment

**Purpose:** Adds technical-drawing vocabulary alongside the botanical (Asset 1). Reads as a real blueprint corner, partially torn.

**File:** `site/public/desk/blueprint-fragment.png`

**Dimensions:** ~360×420 px, transparent background

**Style:** A *complete rectangular sheet* of true blueprint paper — deep navy blue background (`#16265e`-ish, slightly desaturated) with white/cream technical drawing on it. The drawing should be a simple architectural plan, mechanical schematic, or navigation diagram (compass rose with bearings, a small floor plan, a circular dial with markings, etc.) — abstract enough that no specific real-world structure is recognizable. Lines are precise and thin (white on navy). Includes a few hand-written technical annotations in white ink at the margins. Edges are clean and intact — all four corners present, no tearing, no missing portions. Edges may be subtly soft or show slight aging at the very edge, but the rectangle is whole.

**Prompt for ChatGPT/image-gen:**

> A complete rectangular sheet of vintage blueprint paper photographed from directly above on a flat surface. The blueprint paper is intact — a complete rectangle with all four corners present. Edges are clean and deliberate; they may be subtly soft or show very slight aging at the very edge, but the sheet is NOT torn, NOT ragged, NOT missing any corners. The blueprint background is a deep navy blue, slightly desaturated. On the blueprint, in white/cream ink, is a precise technical drawing — a circular navigation chart with compass bearings and concentric measurement rings, with thin white lines and small white text annotations at the margins. Photographic realism with subtle paper grain. Two-color palette: deep navy blue and cream/white. Transparent background — only the blueprint sheet. Resolution 360x420 pixels. Square-on overhead view.

**Integration:** Mounted at cols 11–12, lower than the CV card, partially behind the pen. Z-order below the pen.

---

## Asset 5 — Sticky note (typeset, not handwritten)

**Purpose:** Small material prop in negative space. Critically: **typeset, not handwritten**, so it does not consume the marginalia budget (currently at cap with `OPEN IT` + `About me`).

**File:** `site/public/desk/sticky-note.png`

**Dimensions:** ~280×220 px, transparent background

**Style:** A small rectangular cream-paper note (NOT a yellow Post-it — keeps the two-color discipline). Slightly torn/irregular edges on at least one side. A single short phrase printed on it in dark navy mono caps, no handwriting: `WIP`, `SAMPLE`, or `DRAFT XX`. Small piece of cream washi tape at one corner attaching it to the desk. Subtle paper texture and shadow.

**Prompt for ChatGPT/image-gen:**

> A small rectangular cream-paper note photographed from directly above on a flat surface. The paper has subtly irregular edges on the right and bottom (torn or hand-cut). A single short phrase is printed in dark navy ink in monospaced typewriter capitals: "WIP". A small piece of pale cream washi tape at the upper-left corner attaches the note to the desk surface (the tape is visible, slightly crumpled, with very subtle texture). Soft directional shadow from the upper-left suggests the note has slight thickness. Two-color palette: dark navy ink and cream paper, plus the very-pale-cream washi tape. No other colors. Transparent background around the note (but include the washi tape on top). Resolution 280x220 pixels. Square-on overhead view.

**Integration:** Mounted somewhere in cols 4–6, low, in the negative space between the roulette and the notebook. Tape attaches it to the desk surface (refined-rule compliant: tape is doing visible structural work).

---

## Asset 6 — Binder clip (inline SVG)

**Purpose:** Holds the botanical sketch (Asset 1) in place at the upper-right of the notebook composition. Doing visible structural work.

**File:** Inline SVG component in `site/src/components/desk/Ephemera.tsx`

**Dimensions:** ~32×40 px

**Style:** A simple, schematic representation of a black metal binder clip (the standard office kind with the two folded-up wire handles). Rendered in dark navy `--ink` (#16265e) for body, paper-shadow tan for highlights. Minimal detail — just enough that it reads as "binder clip" at small size.

**SVG approach:**

- Trapezoidal body (dark ink fill)
- Two thin curved wire handles folded up (1.2px stroke, ink color)
- Small highlight stroke at the top edge (paper-shadow color, 0.4 opacity)
- Tiny circular pivots at each side where the wire meets the body

Implement directly in the Ephemera component. No image asset needed — this is small enough for inline SVG and benefits from being crisp at any zoom level.

---

## Asset 7 — Drop shadow + grain + dog-ear treatments (CSS / SVG, not image assets)

**Purpose:** Material treatment for the existing 5 navigation objects per `prd-desk-density.md`.

**Implementation:** All in component CSS or inline SVG.

- **Drop shadows** for notebook strap, CV card, polaroid, pen, roulette: `box-shadow` or `filter: drop-shadow()` using `--paper-shadow` color at low opacity
- **Dog-ear** for CV card: SVG path overlay at top-right corner, fill `--paper`, stroke 0.5px `--ink-muted`, with a small triangle of `--paper-shadow` showing the underside
- **Edge wear** for roulette disc: SVG path with slightly-irregular circle (a near-circle path with subtle deviation from perfect roundness, ~1–2px radius variance)
- **Fingerprint smudge** for roulette near pointer: small inline SVG with irregular ellipse, blur filter, `--ink` at 0.15 opacity
- **VOL. V emboss** for notebook cover (optional): SVG text overlay, fill `--paper`, stroke 0.5px `--paper-shadow`, very subtle

No image assets needed for these.

---

## Asset 8 — Second polaroid (deferred)

**Status:** Listed in `prd-desk-density.md` Open Question #2 as a "yes if there's a real second photo to use." Skip for v0.5 unless a real photo is available.

**If generated later:** A second polaroid layered behind the existing about polaroid, ~25% visible. Different image (a sketch in a notebook close-up, an indoor scene, a graphic abstract — *not* another ocean photo, that would feel themed). Same polaroid format as the existing about object.

---

## Generation workflow recommendation

1. Generate Assets 1–5 in ChatGPT (or whatever image generator works best). Use the prompts verbatim. Tweak palette match to confirm hex values are honored (the references show some variance; you may need to ask for "navy = #16265e specifically" in followups).
2. For each generated asset, manually crop tightly to remove background, ensure transparent PNG (or .webp with alpha).
3. Drop into `site/public/desk/` with the filenames above.
4. For Asset 6 (binder clip), implement inline SVG in `Ephemera.tsx`.
5. For Asset 7 (treatments), implement in component CSS / inline SVG inside the existing components.
6. Iterate: a first round of all 5 ephemera plus the treatments lands together → review in context → tighten any that feel off.

Generation budget: ~30–60 minutes per asset assuming ~3 generations + one accepted version each. Total ~2.5–5 hours of generation work. Drop assets that don't reach quality after 5 generations rather than forcing them.

---

## What NOT to generate

- No vector-tape clipart (use real torn-paper textures or SVG with shadow if tape is needed)
- No vector-binder-clip clipart that floats decoratively (the inline SVG attaches to a real torn paper)
- No coffee rings, pencil shavings, eraser bits, or other "studio at midnight" props
- No ticket stubs that aren't from real events (or skip ticket stubs entirely)
- No fake handwritten notes (handwriting budget is at cap; only the existing wayfinder + polaroid `About me` are allowed)
- No additional cat illustrations beyond what's already on the roulette (don't theme the desk with cats)
- No Yankun's actual photo (no portrait — would change the register)

---

**Source:** Conversation 2026-04-29. Companion to `00-brief/prd-desk-density.md` and `00-brief/prd-canvas-v0.8-notebook.md`.
