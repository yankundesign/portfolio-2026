# Notebook asset prompts: Archive

Written November 11, 2026, for regenerating the notebook images used by the homepage prototypes (`01`, `1.1`) and, later, the live notebook transition.

## Why new images

The current set (`site/public/plate/notebook.webp`, `transition/notebook-cover-front.webp`, `canvas/open-notebook.webp`) shows three different notebooks:

- The band is painted into the cover, so it swings open with it.
- The inside of the cover is a page with a binder clip.
- The cover is a different shape from the page it lands on, so it stretches about 14% as it opens.

See `studies/notebook-audit.jpg`.

The prototypes now draw the Archive cover in code. These prompts replace the parts that still come from images, and add a better cloth texture for the code-built cover.

## Shared rules (add to every prompt)

- **View:** straight top-down orthographic product shot, camera exactly perpendicular, no perspective, no tilt.
- **Background:** isolated object on a transparent background (PNG with alpha). No cast shadow outside the object; the site adds its own.
- **Light:** one soft key light from the upper left at 45°, low contrast. No specular hotspots.
- **Colours:**
  - Cloth: deep navy, close to `#142350` (shadows near `#0a132f`).
  - Paper: warm off-white, close to `#f4f1ea`.
  - Nothing else. No other colours, logos, stickers or props.
- **Text:** none. All type is set live on the site.
- **Output:** at least 2× the target size. You crop and resize to the exact pixels below afterwards.

**Negative prompt (all images):**

> text, letters, logo, brand, label, sticker, elastic band, strap, binder clip, paper clip, tape, pen, hands, table, wood, perspective, angled view, dramatic lighting, vignette, lens blur, cast shadow, watermark

---

## 1 · Book-cloth texture, seamless *(most useful; do this first)*

Replaces the CSS-generated weave in `.ar-cloth`.

**Prompt:**

> Seamless tileable texture of fine bookbinding cloth, tight linen weave, deep navy blue (#142350), very fine regular warp and weft threads with occasional subtle slubs, matte, evenly lit flat scan, no lighting gradient, no vignette, no folds, no seams, photographic macro, 2048 × 2048.

- **Target:** `cloth-navy.webp`, 1024 × 1024, tileable on all four edges.
- **Check:** tile it 3 × 3 at 100% zoom. There should be no visible seams and no repeating blotches.
- **Thread scale:** about 3–4 px per thread at 1024 px. The cover shows it at about 0.7×.

## 2 · Inside front cover (endpaper)

This is what you see as the cover swings, and it's the spread's left page once the book is open. It should be the inside of a cover, not a page.

**Prompt:**

> Top-down orthographic view of the inside of a hardcover notebook's front board, lying flat: a plain warm off-white endpaper (#f4f1ea, subtle laid-paper texture) pasted onto the board, with a thin 2–3% margin of deep navy book cloth turned over the edges on the top, bottom and outer (left) edge, and the hinge gutter on the right edge. Square corners on the hinge side, softly rounded corners on the outer side. Clean, new, no writing, no bookplate, no stains.

- **Target:** `inside-cover.webp`, exactly 1604 × 2170 px. That's the board measured in the current spread's right half (x 1617–3221, y 71–2241 of 3234 × 2255).
- **Orientation:** hinge on the right edge (it mirrors the front board).
- **Optional later:** a small ex-libris stamp, set as live text or SVG, not generated.

## 3 · Open spread, v2

Replaces `canvas/open-notebook.webp` so that the left page is the inside cover from prompt 2.

**Prompt:**

> Top-down orthographic view of an open hardcover notebook lying flat, spread exactly 180°. Left side: the inside of the front cover, an off-white endpaper pasted onto a navy cloth board with the cloth turned over the edges. Right side: the first page of a thick block of warm off-white pages (#f4f1ea), blank, with the page edges visible as a thin stepped fore-edge on the right and bottom. A thin navy ribbon bookmark runs down the centre gutter and hangs slightly past the bottom edge. Navy cloth board edge visible around the whole spread. No writing, no clip, no tape, no elastic band.

**Target:** `open-notebook-v2.webp`, exactly 3234 × 2255 px, with the same geometry as today:

| Part | x (px) | y (px) |
| --- | --- | --- |
| Spine / gutter | 1617 | |
| Right board | 1617–3221 | 71–2241 |
| Left board (mirror) | 17–1617 | 71–2241 |

**Check:** lay `inside-cover.webp` over the left half (x 17–1617). It should match edge for edge, because the swinging cover's back face and the left page are the same image.

## 4 · Archive front cover, photographic *(optional)*

Only needed if you prefer a photographed cover to the code-built one. The code-built cover keeps the type live and sharp; a photo looks more real but bakes the title in.

**Prompt:**

> Top-down orthographic product photo of a closed hardcover notebook, front board only, deep navy linen book cloth (#142350), blind-debossed (no foil, no ink) small italic serif title area recessed into the cloth near the upper third, subtle hinge groove running vertically about 5% in from the left spine edge, square spine edge on the left, softly rounded corners on the right, very slight board thickness visible, no label, no elastic band.

- **Target:** `cover-archive.webp`, exactly 1604 × 2170 px, the same box as prompt 2 mirrored, with the hinge on the left.
- **Deboss text:** to get a real "Field Notebook" impression, generate without text and set the type in code. Generated lettering is rarely clean.

## 5 · Ribbon tail *(optional)*

The code-built ribbon works. Generate only if it looks too flat next to the photographed spread.

**Prompt:**

> Single thin satin ribbon bookmark tail, deep navy (#1b2f74), hanging straight down, end cut in an inverted V, soft sheen, isolated on transparent background, top-down.

**Target:** `ribbon.webp`, 40 × 280 px.

---

## How each one plugs in

| File | Where it goes |
| --- | --- |
| `cloth-navy.webp` | `shared/base.css` → `.ar-cloth`: replace the gradients and noise with `url(cloth-navy.webp)`, `background-size: 512px`. |
| `inside-cover.webp` | `shared/base.css` → `.bk-back`: use this image instead of half of the spread, placed on the board's box (top 3.15%, height 96.25%, right-aligned to the hinge). |
| `open-notebook-v2.webp` | `shared/book.js` → the `.bk-pages` image. Since the geometry is unchanged, no other code changes. |
| `cover-archive.webp` | `shared/book.js` → the archive `.bk-front` gets an `<img>` under the live deboss text. |

Put the files in `03-prototype-explore/homepage-awwwards/assets/` while testing. Nothing goes into `site/public/` until a direction is approved.
