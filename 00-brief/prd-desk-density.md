# PRD: Desk — Material Density Pass

*April 2026 · v0.5 · Asset additions and material treatments for the existing 5-object desk*

---

## Summary

The desk plate is structurally locked: 5 objects (notebook, CV, about polaroid, pen, roulette) on a 12-column plate inside `EditorialPlate` chrome. This pass adds **material density and craft** without changing the desk's composition, navigation model, or layout. Two parallel moves:

1. **Material treatment of the existing 5 objects** — bring everything up to the polaroid's level of care. Patina, edge wear, soft drop shadow, dog-ears where appropriate.
2. **Supporting ephemera** — a small set of new material assets (botanical sketch on graph paper clipped with a binder clip, postage with cancel mark, fabric swatch, blueprint fragment, etc.) integrated into the desk surface *around* the 5 navigation objects, never *on top of* them.

Driven by reference exploration on 2026-04-29. Refined material-integrity rule applies: tape, clips, pins are OK *when the object they're attached to reads as physical and the attachment is doing visible structural work in the fiction.* (See Decisions Log 2026-04-28 / 2026-04-29.)

This is not a redesign. The desk → canvas → project flow, the v0.4 deadpan register, the editorial plate chrome, and the ≤2-marginalia rule are all unchanged.

---

## What stays

- 5-object structure: notebook (→ /works), CV card (→ /cv), about polaroid (→ /about), pen (prop), cat roulette (personal tell)
- `EditorialPlate` chrome — column numbers, register marks at 4 corners, plate metadata, format readout, currently / site-build chrome lines
- `DeskLight` directional wash
- `DeskWayfinder` (`OPEN IT` + curved arrow → notebook)
- Watercolor wash on notebook hover
- `Grain` overlay
- v0.4 deadpan register: no composing animation, no parallax-without-tilt, no ambient breathing
- ≤2-marginalia rule: wayfinder (`OPEN IT`) + handwritten `About me` on the polaroid = at cap. **No additional handwritten marginalia.**

## What changes

Material treatments + supporting ephemera. Detailed below.

## What is explicitly out

- No top navigation bar (`WORK / ABOUT / RESUME / PLAY`). The desk is the navigation.
- No hero headline (`Design is how I think...` etc.). No hero sections per hard rules.
- No "featured projects" strip on the homepage. That's the canvas's job.
- No bio paragraph anywhere on the desk. Bio belongs on the canvas side notes (v0.8) or About page.
- No new handwritten marginalia. At cap.
- No coffee ring, no pencil shavings, no "studio at midnight" props. Specific gimmicks beget generic moodboards.
- No tape strips or binder clips that aren't visibly holding something. Refined rule holds.

---

## Material treatments — per object

### Notebook cover (existing)

Already strong (cloth-bound dark navy, paper label `FIELD NOTEBOOK · VOL. V — COMPOSITIONS FOR COMPLEX SYSTEMS`, elastic strap, watercolor wash on hover).

Add:
- **Strap shadow refinement.** A soft drop shadow under the elastic band so it reads as a 3D thing on the cover, not a flat decal. ~2px y-offset, low blur, ink at ~12% opacity.
- **Elastic strap holding a torn paper sketch** *behind/beside the notebook.* This is the integration hook for the new botanical-sketch-on-graph-paper asset (see Asset List below). The sketch is held against the desk by the strap (or peeking from under the cover at the right edge, just above where the strap wraps). Tape/clip-style attachment that fits the refined rule: the strap is genuinely holding the sketch.
- **Optional: a `VOL. V` blind-stamp embossing on the lower-right of the cover.** Subtle, cream-on-cream, no fill. If it competes with the existing label, kill it.

Skip:
- Dog-ear (cloth-bound notebooks don't dog-ear; would read as wrong).
- Postal stamp on the cover (competes with the existing label).

### CV card (existing — thinnest object on the desk)

Currently a clean cream rectangle with mono text. Highest-leverage place for material work.

Add:
- **Paper-soft fill** (`--paper-soft`, #ebe6d9) instead of the current paper.
- **Subtle `--paper-shadow` drop shadow** so it sits *on* the desk.
- **Soft dog-ear at the top-right corner** exposing a sliver of the desk surface beneath. ~12px dog-ear, very gentle curl.
- **One small material mark in a corner** — pick exactly one of:
  - Faint blind-stamp embossing reading `2026` (subtle, cream-on-cream)
  - Small ink-stamp / circular date-cancel mark (must look real ink — irregular density, slightly off-axis)
  - Thumbtack at the top edge (ONLY if the card is depicted as pinned to the desk; the tack must read as a real metal tack with shadow)
- **Background sheet behind the CV card** — a fabric swatch tucked under the right edge, peeking out by ~30%. Adds material variety (paper on fabric on desk = three textures stacked).

### About polaroid (existing — already the "bar")

Don't touch. It's the level we're bringing the others up to.

Possibly add:
- A second smaller polaroid (or photo-corner mounted print) layered behind the existing one, only ~25% visible. Different image. Adds depth without changing the navigation object.

### Pen (existing — prop)

Currently a flat black silhouette of a Leuchtturm pen.

Add:
- **Slight ink-darkening at the nib tip.** Reads as "used," not "manufactured."
- **Soft drop shadow** under the pen body.

Skip:
- Ink stain on the desk near the nib (gimmick, slides into "studio at midnight" cosplay).
- Brand label embellishment beyond what already exists.

### Cat roulette (existing — personal tell)

Currently a clean paper disc with engraved cat illustrations and a `CAT ROULETTE — SPIN` center label.

Add:
- **Edge wear / soft deckle** on the paper disc circumference. Reads as a real cut-out disc, not a vector circle.
- **Faint ink fingerprint smudge** near the pointer (one, not many). Must look like real ink — irregular, tonal, not flat.
- **Soft drop shadow** under the disc.

Skip:
- Tape attaching the disc to the desk (it's depicted as a free-standing fidget; doesn't need attachment).
- Decorative ephemera *on* the disc face (would compete with the cat illustrations).

---

## Supporting ephemera — new assets to generate

These are material props integrated into the desk surface to add density. They are **not** navigation objects. They sit in the negative space around the 5 navigation objects, partially overlapping or tucked behind, never on top.

Composition principles:

- **Don't compete with navigation objects.** Ephemera lives in margins / under / behind, never centered or visually dominant.
- **Each must be doing visible structural work in the fiction.** A torn sketch is clipped to the notebook by the binder clip. A postage stamp is on a real envelope corner that's tucked under the CV card. A fabric swatch is laid down with the CV card on top of it. **Nothing floats.**
- **Honor the two-color discipline.** Every asset uses `--ink` blue and `--paper` cream tones. No greens, no warms beyond the existing paper-shadow tan. Engraved/etched line work in ink blue is the dominant rendering style.
- **Restraint.** Five new ephemera assets MAX for v0.5. Tempting to add more; resist. Stop at five.

The five (in priority order):

1. **Botanical sketch on graph paper, clipped with a binder clip.** Centerpiece of the "behind the notebook" composition. Tucked behind/beside the notebook cover, the binder clip clipping it to the notebook's elastic strap area.
2. **Postage stamp with botanical illustration + postal cancel mark overlapping it.** Small. Sits at the upper-right area, near the CV card. Reads as torn from an envelope corner.
3. **Fabric swatch (gray + blue, deckle edge).** Sits under the CV card, peeking out ~30% from beneath.
4. **Blueprint fragment with technical drawing (architectural plan, navigation diagram, or schematic).** Tucked at the right margin near the pen, partially under another element. Adds technical-drawing vocabulary alongside the botanical sketch.
5. **Sticky note (non-handwritten — typeset on a torn-edge cream rectangle with a single mono caps phrase like `WIP` or `SAMPLE`).** This does *not* count toward the marginalia cap because it's typeset, not handwritten. Sits as a small material prop somewhere in negative space.

(Detailed prompts and dimensions in `00-brief/desk-asset-prompts.md`.)

---

## Layout integration

The 5 navigation objects keep their current desk slots:

- Roulette: cols 1–3 (left)
- Notebook: cols 5–8 (center)
- CV card: cols 10–12 (right, top)
- About polaroid: cols 10–11 (right, middle)
- Pen: col 12 (right, bottom)

Ephemera placement:

- Botanical sketch + binder clip: behind the notebook, peeking out at the upper-right edge of the cover. Cols 7–9, vertically overlapping the notebook's top edge.
- Postage + cancel: cols 9–10, between the notebook and the CV card, near the top.
- Fabric swatch: under the CV card. Cols 10–12, vertically aligned with the CV card.
- Blueprint fragment: cols 11–12, lower than the CV card, partially behind the pen.
- Sticky note: free placement — somewhere in cols 4–6, low, integrated with the roulette area or the negative space between roulette and notebook.

Z-order, bottom to top: desk surface → fabric swatch / blueprint fragment → sticky note → polaroid back / postage → navigation objects (notebook, CV, polaroid, pen, roulette) → binder clip / strap (the things doing the holding).

---

## Implementation

New components:

- `site/src/components/desk/Ephemera.tsx` + `.module.css` — wrapper component that mounts the five ephemera assets at their slot positions. Pure presentational, no props.
- Per-asset components if needed for hover/interaction (none planned for v0.5; ephemera is non-interactive).

Asset files:
- `site/public/desk/botanical-sketch.png` (or .webp)
- `site/public/desk/postage-stamp.png`
- `site/public/desk/fabric-swatch.png`
- `site/public/desk/blueprint-fragment.png`
- `site/public/desk/sticky-note.png`

Plus binder clip as inline SVG (small, simple geometry, programmatic).

Existing components to update:

- `NotebookCover.tsx` — strap shadow refinement, optional VOL. V emboss. The botanical-sketch integration is handled by `Ephemera.tsx` z-positioning, not by the cover itself.
- `ResumePaper.tsx` — paper-soft fill, drop shadow, dog-ear, corner mark. Possibly thumbtack.
- `Pen.tsx` — nib darkening, drop shadow.
- `CatRoulette.tsx` — edge wear, fingerprint smudge, drop shadow.

`DeskRoute.tsx` — mount `<Ephemera />` after `<DeskLight />` and before `.scene`, OR within `.scene` so ephemera placement participates in the slot grid. Pick whichever makes z-ordering and slot alignment cleanest in implementation.

---

## Open questions

1. **Thumbtack on the CV card** — yes / no? Pin makes the card read as "pinned to the desk" which fits the desk metaphor well, but adds another small artifact in the busy upper-right zone. Recommend: try without first; add if the card still reads thin.
2. **Second polaroid layered behind the about polaroid** — yes / no? Adds depth but risks the photo-stack reading as "stock photo collage." Recommend: hold for v0.5, add only if there's a real second photo to use.
3. **Sticky-note phrase.** `WIP`, `SAMPLE`, `DRAFT`, `XX` — pick one, or skip the asset entirely. The note is the most droppable of the five if scope tightens.
4. **The `2 WEEK` typo in the chrome line** — fix to `2 WEEKS` in this pass.

---

## Out of scope (deferred)

- Mobile-specific desk layout (week 2).
- Animation on the new ephemera (v0.4 deadpan; nothing animates).
- Per-ephemera hover/inspection states.
- Replacing the watercolor wash language across other objects (existing follow-up from 2026-04-25 entry; separate decision).

---

**Source:** Conversation 2026-04-29. References: ChatGPT-generated mood images shared in chat (`Option 1` flat-lay desk, asset crops). Refined material-integrity rule per Decisions Log 2026-04-28 / 2026-04-29.
