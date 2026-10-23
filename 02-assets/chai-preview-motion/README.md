# CHAI hover preview — source

6s loop for the CHAI plate on the canvas. It starts and ends on `cover-src.png`
(the plate mockup), so the hover crossfade and the loop point don't show.

Beats: hold on cover (0–0.4s) → push into the conversation panel, logo turns,
bars regrow (0.4–2.35s) → glide to the expanded report, bars rise, EOL timeline
fills dot by dot, location pins ripple (2.35–4.75s) → pull back to the cover (4.75–6s).

## Rebuild

```sh
python3 prep.py                     # layers/: clean bg, bar-less charts, timeline + logo sprites
SUBFPS=480 python3 render.py all frames   # Playwright, 2880 subframes at 1280×800
VF="tmix=frames=4,select='eq(mod(n\,8)\,3)',setpts=N/60/TB,format=yuv420p"   # 180° shutter at 60fps
ffmpeg -framerate 480 -i frames/f%05d.png -vf "$VF" -r 60 -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -an chai-preview.webm
ffmpeg -framerate 480 -i frames/f%05d.png -vf "$VF" -r 60 -c:v libx264 -preset veryslow -crf 23 -tune animation -movflags +faststart -an chai-preview.mp4
```

`p1.png`, `p2.png`, `p3.png` are the 2× panel screens; they sit at exactly 0.5×
on the cover at (85,234), (397,234), (710,403).
