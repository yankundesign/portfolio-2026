# ZAO case-study asset renderer

Start the existing ZAO docs app locally, then run from the portfolio root:

```sh
node 02-assets/zao-case-study/render.mjs
```

The renderer uses ZAO's installed Playwright and Chromium. It loads the
actual local components in a fresh headless browser, waits for fonts and
the measured anatomy, applies export-only framing, and writes 3× lossless
PNGs to `site/public/images/zao/`. It does not modify the ZAO repository.

Defaults are the sibling `../design-system` checkout and
`http://127.0.0.1:3000`. Set `ZAO_SOURCE_REPO` or `ZAO_SOURCE_URL` to use a
different local checkout or docs port. `render-manifest.json` records the
source commit and final dimensions. Rendering fails if an expected source
component is unavailable or an export falls below 3360 pixels wide.
