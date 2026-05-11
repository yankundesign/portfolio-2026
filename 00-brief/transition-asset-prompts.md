# Desk → Canvas Transition — Asset Prompts

*May 2026 · Companion to `prd-desk-canvas-transition.md`*

Two new assets needed (plus one optional). All must align pixel-for-pixel to the existing notebook geometry — the transition's seamlessness depends on it.

The two-color discipline holds: dark navy ink (`#16265e`) and warm cream paper (`#f4f1ea`). No greens, no warm browns beyond the existing `--paper-shadow` tan.

---

## Asset 1 — Front cover, isolated (the rotating piece)

**Purpose:** This is the layer that rotates. During the transition, it spins around the spine on the left edge while the open-spread layer fades in beneath it. Must be cut so the spine is the leftmost edge of the image (so `transform-origin: left center` pivots correctly).

**File:** `site/public/transition/notebook-cover-front.png`

**Dimensions:** Match the existing `notebook.png` cover proportions exactly. Approximately 340×500 pixels at desk render size, but generate at 2× (680×1000) for retina sharpness.

**Style:** The front cover of the existing field notebook — dark navy cloth-bound surface with the printed paper label `FIELD NOTEBOOK / VOL. V — COMPOSITIONS FOR COMPLEX SYSTEMS`. **Critically:** no spine visible at the left edge — the cover should be cropped flush with the spine so it can pivot cleanly. Transparent background, alpha-cut precisely to the cover shape. The bottom-right corner can have a subtle elastic strap if the original asset shows it; otherwise omit (the strap stays on the open spread).

**Prompt for ChatGPT/image-gen:**

> A photograph of just the front cover of a dark navy cloth-bound hardcover notebook, viewed straight on from above (no perspective tilt). The cover is flush at the left edge — no spine visible, no curvature, just the front face of the cover ending cleanly at the leftmost pixel of the image. Centered on the cover is a printed paper label with a thin border, reading "FIELD NOTEBOOK" in serif type at top, then a thin horizontal rule, then "VOL. V — COMPOSITIONS FOR COMPLEX SYSTEMS" in smaller mono caps. The cloth texture of the cover is visible. Two-color palette: dark navy (#16265e) for the cloth, warm cream (#f4f1ea) for the label paper. Transparent background — only the cover. Resolution 680x1000 pixels. The cover should occupy the full image width (left edge to right edge) and most of the height with a small margin top/bottom.

**Critical constraint:** The leftmost edge of the image MUST be the spine edge of the cover. No bleed, no shadow extending past the left edge. The CSS `transform-origin: left center` pivots around (0, 50%), so anything past the left edge would create a visible offset during rotation.

---

## Asset 2 — Closed notebook (re-cut if needed)

**Purpose:** Used at the start of the transition before the cover lifts. Should match the existing desk notebook visually, but cropped consistently with Asset 1 so they layer cleanly.

**File:** `site/public/transition/notebook-closed.png`

**Dimensions:** Same as Asset 1 (or wider if including any spine edge wrap).

**Style:** Identical to the existing `notebook.png` on the desk — same dark navy cover, same paper label, same proportions. The difference: this version is the *transition-layer source*, sized and aligned to match Asset 1 exactly. If the existing `notebook.png` is already pixel-aligned with how you'll cut Asset 1, just copy it to `transition/notebook-closed.png` and skip generation.

**Prompt for ChatGPT/image-gen** (only if generating fresh):

> A photograph of a complete closed dark navy cloth-bound hardcover notebook, viewed straight on from above (no perspective tilt). The full notebook is visible: front cover, spine on the left edge (subtle but present), and a hint of pages stacked on the right edge. Centered on the cover is a printed paper label reading "FIELD NOTEBOOK / VOL. V — COMPOSITIONS FOR COMPLEX SYSTEMS". An elastic strap wraps around the right side, vertical. Two-color palette: dark navy and warm cream. Transparent background. Resolution 680x1000 pixels. The notebook fills most of the image with a small margin around it.

**Critical constraint:** This image's cover face must align exactly to Asset 1's cover when overlaid. If Asset 1 is at `left: X, top: Y, width: W, height: H` of the closed-notebook image, the alignment math must be exact — otherwise the cover layer will visibly jump when the transition begins.

---

## Asset 3 — Open notebook spread

**Status:** Already exists at `site/public/canvas/open-notebook.png`. No regeneration needed.

This is the destination state — what's revealed when the cover finishes rotating. Used by the transition layer beneath the rotating cover.

---

## Asset 4 (optional) — Inside-of-cover (the back face of the rotating cover)

**Purpose:** Without this, when the cover rotates past 90°, `backface-visibility: hidden` makes it disappear. That's acceptable but loses richness. With this asset, the cover's BACK face shows the inside of the hardcover — typically a cream endpaper with maybe a small bookplate or "from the library of..." mark.

**File:** `site/public/transition/notebook-cover-back.png`

**Dimensions:** Same as Asset 1.

**Style:** The interior face of the front cover — cream endpaper, possibly with a small typographic mark or bookplate. Could include: a small ex-libris-style stamp (`Y.W.`), a thin printed border, or a date stamp. Restrained — the cover-back is briefly visible during the rotation, so detail is wasted.

**Prompt for ChatGPT/image-gen:**

> A photograph of the inside face of a notebook front cover, lying flat (not curved), viewed straight on. The surface is cream-colored endpaper with subtle paper texture. Centered in the upper portion: a small circular ink stamp, dark navy ink, slightly off-axis, reading "Y.W. — RESEARCH · ITERATE · BUILD — EST. 2020" arranged in a circle. Below the stamp, in tiny mono caps, a fragment of typed text reading "VOL. V". Two-color palette: dark navy ink and warm cream paper. Transparent background. Resolution 680x1000 pixels.

**Decision:** Recommend **skip Asset 4 for v1**. The cover disappearing past 90° is a clean visual; adding the back-face is craft polish, not load-bearing. Revisit if v1 transition feels too abrupt at the cover-flip moment.

---

## Generation workflow

1. **Asset 2 first** (closed notebook for transition layer). Generate or copy from existing `notebook.png`. This sets the geometry.
2. **Asset 1 second** (front cover isolated). Open Asset 2 in Photoshop, alpha-cut to just the cover face, ensure left edge is flush with the spine.
3. **Asset 4 optional** — only generate if the v1 transition needs more weight at the cover-flip beat.

Total generation budget: ~1–2 hours if you have the existing notebook PNG to reference.

---

## What NOT to generate

- No animated GIFs or sequences — the animation is in CSS/Framer Motion, the assets are static frames
- No book illustrations with multiple pages visible — Asset 3 (open spread) is a single specific spread, not a stack of pages
- No 3D-rendered cover with built-in lighting — the lighting comes from the desk's `DeskLight` and the canvas's `SpotlightDotGrid`. Flat photo-realism only
- No bleed past the spine edge on Asset 1 — the rotation pivot relies on the spine being at x=0 of the image

---

## Pixel-alignment checklist

Before shipping the transition:

- [ ] Open `notebook-closed.png` and `notebook-cover-front.png` side by side at 100% zoom
- [ ] Confirm the cover face in Asset 2 matches Asset 1 in size, position, label placement, and edge alignment
- [ ] Confirm Asset 1's leftmost pixel is the spine edge (no transparent gap, no shadow extending past)
- [ ] Cross-fade test: place Asset 1 on top of Asset 3 (open spread), align cover position to where the *closed* cover would be on the spread, fade Asset 3 in beneath while rotating Asset 1 — verify no visible jump

---

**Source:** Conversation 2026-05-01. Companion to `00-brief/prd-desk-canvas-transition.md`. Asset cuts will be done by Yankun (manual Photoshop work, not AI generation, since precise alpha-cutting matters more than aesthetic regeneration here).
