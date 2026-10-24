# CHAI hover preview — v6 cover

6s loop for the CHAI plate, rebuilt for the v6 cover
(`site/public/canvas/mockups/chai-v6.png`). It starts and ends on that cover,
so the hover crossfade and the loop point don't show.

Same beats and camera language as `../scene.html`:
hold on cover (0–0.4s) → push into the answer, report behind softens, bars
collapse and regrow, logo turns (0.4–2.35s) → glide down to the report, answer
in front softens, report bars rise (2.35–4.75s) → pull back to the cover
(4.75–6s).

What differs from the original pipeline:

- The layers are the cover's own vector rebuilds (`chai-components.js`, drawn
  in p2/p3's pixel space and checked against those PNGs), so bars and logo
  animate directly — no `prep.py` inpainting or bar-less plates.
- The EOL timeline and location pins beats are gone: the v6 cover keeps that
  part of the report hidden (the timeline card still carries lorem ipsum).
- The camera stays inside the 1920×1200 cover, because the v6 layers run off
  its right and bottom edges.
- Subframes render at 1920×1200 and are Lanczos-scaled to 1280×800, the same
  path the still takes, so frame 0 matches the cover.

## Rebuild

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1920,1200 \
  --allow-file-access-from-files --screenshot="$PWD/bg.png" "file://$PWD/cover.html#bg"   # paper + grain only
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1920,1200 \
  --allow-file-access-from-files --screenshot="$PWD/cover-src.png" "file://$PWD/cover.html"   # = chai-v6.png
PIPE=1 node render.mjs all frames60   # 2880 subframes at 480fps → README shutter → 360 frames
ffmpeg -framerate 60 -i frames60/f%03d.png -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an chai-v6-preview.webm
ffmpeg -framerate 60 -i frames60/f%03d.png -c:v libx264 -preset veryslow -crf 23 -tune animation -pix_fmt yuv420p -movflags +faststart -an chai-v6-preview.mp4
```

`render.mjs` is a Node port of `../render.py` using `site/node_modules/playwright-core`
and the system Chrome; `node render.mjs 0,1.9,3.8 stills` renders single
moments for checking.
