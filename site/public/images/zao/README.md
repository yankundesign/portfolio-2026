# ZAO case-study evidence

Rendered from ZAO's local code on October 12, 2026 using
`02-assets/zao-case-study/render.mjs`. The source is the same React components,
token CSS, fonts, and measured anatomy used by https://zaoui.dev.

All four assets are 3360 pixels wide: a 1120 CSS-pixel composition rendered
at 3× device pixel density directly to lossless PNG. There is no intermediate
JPEG, screenshot enlargement, or image resampling. Workspace renders use
56px framing; component plates use 64px framing. Documentation headings,
the docs navigation, and development overlays are excluded. The Button
diagram is framed from its SVG drawing bounds, with the source part names
as a compact legend. Component geometry, colors, text and sample data remain
the actual ZAO source. See `render-manifest.json` for the source commit,
pixel dimensions, and file sizes.

- `workspace.png`: the North workspace in Built view, Su dark, Ink seal.
- `parts.png`: the same workspace in Parts view, Su light, Ink seal.
- `button-anatomy.png`: the live Button anatomy and its measured parts.
- `two-readers.png`: the landing page's UI and agent-guidance comparison.

Case-study copy comes from ZAO's current BRIEF.md, study/STUDY.md,
docs/components/button.md, and live landing page. The short introduction
uses the outline approved in the portfolio chat. Agent manifests, validator,
and comparative evaluations remain planned.
