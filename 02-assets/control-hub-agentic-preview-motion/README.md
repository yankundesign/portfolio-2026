# Control Hub Agentic hover preview — source (v2)

6s loop at 60fps, 1280×800, for the fig. 02 plate on the canvas. It starts and
ends on `cover-src.png` (identical to `site/public/canvas/mockups/control-hub-agentic.png`),
so the hover crossfade and the loop point don't show.

Everything that changes is cut from the cover itself: the check, the blue
in-progress arc, the grey idle ring, the three status lines ("Complete",
"In progress", "Not started") and the blue and grey connectors. No re-typed UI,
so every state matches the cover pixel for pixel.

Beats, all inside the Assistant:
- 0–0.4s: hold on the cover. Step 3's arc is already spinning.
- 0.4–1.7s: push into the step list. Step 3 completes (1.3s); the connector
  wipes blue to step 4.
- 1.5–2.9s: step 4 runs, then completes (2.7s).
- 3.4–4.0s: glide up to the top of the list while the run resets
  (3.6s): step 1 in progress, the rest not started, connectors grey.
- 4.15–4.9s: the run replays: step 1 completes, step 2 runs and completes,
  step 3 starts — the cover's state.
- 4.7–6.0s: pull back to the cover.

Status lines dip through the empty card between words so two never overlap.
The arc spins one turn every 1.1s, so it is back at its cover angle at 6.0s.

## Rebuild

No Python, PIL, Playwright or Homebrew ffmpeg needed. Swift (AVFoundation)
writes the H.264 MP4; Playwright's bundled ffmpeg (VP8 only) writes the WebM.

```sh
swiftc -O render.swift -o /tmp/agentic-render
/tmp/agentic-render cover-src.png out          # out/control-hub-agentic-preview.mp4 + out/jpg/*.jpg
cat out/jpg/f*.jpg > out/all.mjpeg
FF=~/Library/Caches/ms-playwright/ffmpeg-1011/ffmpeg-mac
$FF -f image2pipe -c:v mjpeg -framerate 60 -i file:out/all.mjpeg \
  -c:v libvpx -b:v 1800k -crf 6 -qmin 2 -qmax 40 -deadline best -cpu-used 0 \
  -auto-alt-ref 1 -lag-in-frames 16 -pix_fmt yuv420p -an -y file:out/control-hub-agentic-preview.webm
cp out/control-hub-agentic-preview.{mp4,webm} ../../site/public/canvas/previews/
```

If the cover changes, re-measure the step column first (circle centres at
x 349, rows 415/503/591/679 on the 1920×1200 cover) — the sprite crops in
`render.swift` depend on them.

`v1/` holds the previous loop (agents-era screens, Python + Playwright pipeline)
and its rendered MP4/WebM.
