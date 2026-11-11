# Archive notebook assets

Generated November 11, 2026 with the built-in image generator using [asset-prompts.md](../asset-prompts.md).

[Preview all five](preview.jpg) · [Exact generation prompts and crop recipes](generation-prompts.json)

| Asset | Dimensions | Files |
| --- | --- | --- |
| Navy book cloth | 1024 × 1024 | [WebP](cloth-navy.webp) · [PNG](cloth-navy.png) |
| Inside front cover | 1604 × 2170 | [WebP](inside-cover.webp) · [PNG](inside-cover.png) |
| Open spread | 3234 × 2255 | [WebP](open-notebook-v2.webp) · [PNG](open-notebook-v2.png) |
| Archive front cover | 1604 × 2170 | [WebP](cover-archive.webp) · [PNG](cover-archive.png) |
| Ribbon tail | 40 × 280 | [WebP](ribbon.webp) · [PNG](ribbon.png) |

WebP exports use quality 85. PNG counterparts preserve alpha and lossless pixels after resizing; native generated PNGs are in `originals/`. Cloth is opaque; the four isolated assets retain transparency. All surfaces are blank for live typography.

The inside cover is an exact crop of the normalized spread's left board. Its box is x=13–1617, y=71–2241. The prompt document's x=17 start would produce a 1600px board; x=13 gives the specified matching 1604px width.

Two limitations remain: the generator returned smaller native images than the requested 2× working resolution, so the book assets and selected cloth crop are upscaled to their exact target dimensions. The cloth's [3 × 3 repeat check](qa/cloth-3x3.jpg) still shows faint vertical joins after a targeted revision and crop alignment; it is not fully seamless.

[Validation results](qa/validation.json) include dimensions, alpha checks and the exact inside-cover/spread match. These assets have not been wired into the prototypes or copied to `site/public/`.
