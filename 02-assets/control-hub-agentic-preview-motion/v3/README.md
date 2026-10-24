# Control Hub Agentic hover preview — v3 (stack cover)

6s loop at 60fps, 1280×800, for the Agentic plate. It starts and ends on the
stack cover (`site/public/canvas/mockups/control-hub-agentic-stack.png`,
reproduced exactly by `cover.html`), so the hover crossfade and the loop
point don't show.

The cover: prototypes 01 → 05 as an exploded isometric stack, 05 on top.
Every slab is the real case-study PNG from `site/public/images/control-hub-agentic/`,
scaled down and only edge-cropped. The backdrop (`agentic-bg.png`) is the soft
gradient reconstructed from the previous cover's surround.

Beats (keys in `KT`):
- 0–0.35s: hold on the cover.
- 0.35–1.45s: push into prototype 05; the stack eases apart.
- 1.45–4.45s: glide down through 04 · 03 · 02 to 01, 0.75s each. As the
  camera reaches a prototype, the slab above lifts away to reveal it; slabs
  away from the focus soften slightly.
- 4.45–6.0s: pull back to the cover as the stack closes.

The camera, zoom and focus all follow one C1 Hermite path through the keys:
velocity is continuous, the camera eases to 45% of cruise speed at each
prototype (`DWELL`) instead of stopping, turns smoothly at 05 and 01, and
only rests on the cover. `node analyze.mjs` reports per-frame on-screen speed
and acceleration; the current path peaks at ~31 px/frame and ~2 px/frame².
(The first cut stepped from slab to slab and jumped ~670 px in one frame at
each change — that's the check to rerun after editing the keys.)

## Rebuild

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --hide-scrollbars --force-device-scale-factor=2 --window-size=1920,1200 \
  --allow-file-access-from-files --screenshot="$PWD/cover@2x.png" "file://$PWD/cover.html"
ffmpeg -i cover@2x.png -vf scale=1920:1200:flags=lanczos cover-src.png        # = the canvas still
PIPE=1 DSF=2 SUBFPS=480 node render.mjs all frames60   # 2880 subframes at 2× → 180° shutter → 360 frames (~20 min)
ffmpeg -framerate 60 -start_number 1 -i frames60/f%03d.png -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an control-hub-agentic-stack-preview.webm
ffmpeg -framerate 60 -start_number 1 -i frames60/f%03d.png -c:v libx264 -preset veryslow -crf 23 -tune animation -pix_fmt yuv420p -movflags +faststart -an control-hub-agentic-stack-preview.mp4
```

`node playback-check.mjs` hovers the CHAI and Agentic plates on the running
dev server in a visible Chrome window and reports repaints and dropped frames
per second (both should read ~60 and 0). Measure in a visible window only:
a hidden or background tab throttles video and reports heavy drops that
aren't real.

`render.mjs` drives `scene.html` with the playwright-core in `site/node_modules`
and the system Chrome; `node render.mjs 0,2.9,4.3 stills` renders single
moments for checking. The encode settings match the CHAI loop's README.

`../README.md` and `../render.swift` are the previous (v2) loop for the old
single-window cover.
