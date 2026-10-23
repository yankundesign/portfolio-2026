# Ebb hover preview — source

6s loop for the fig. 03 plate. It starts and ends on `cover-src.png`, which is
`site/public/canvas/mockups/ebb.png`, so the hover crossfade and the loop point
don't show. The whole scene takes two slow breaths across the loop (page scale
1 → 1.012 → 1), and the painting drifts slightly slower than the phones.

Beats:
- 0–1.4s: hold, then settle onto the intercept phone. The left phone softens.
- 1.3–2.3s: "Turn back" underline takes the weight of a tap. The wave folds
  leftward into a single new mark on the line.
- 2.2–3.9s: glide to the record. The newest black mark drops in and a breath
  runs along the tick line, left to right.
- 3.9–6s: back to the intercept, where three breaths draw again with the red
  point riding the tip. Pull out to the cover.

## Rebuild

```sh
python3 prep.py                           # layers/: phone cut-outs, filled painting, wave + record patches
python3 render.py 0 test                  # writes scene_built.html
for k in 0 1 2 3; do python3 render_part.py $((k*720)) $(((k+1)*720)) & done; wait   # 2880 subframes
VF="tmix=frames=4,select='eq(mod(n\,8)\,3)',setpts=N/60/TB,format=yuv420p"
ffmpeg -framerate 480 -i frames/f%05d.png -vf "$VF" -r 60 -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -an ebb-preview.webm
ffmpeg -framerate 480 -i frames/f%05d.png -vf "$VF" -r 60 -c:v libx264 -preset veryslow -crf 23 -tune animation -movflags +faststart -an ebb-preview.mp4
```

`prep.py` reads the cover as `site-cover.png`; copy `cover-src.png` to that name first.
