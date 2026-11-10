# Ebb hover preview — November 2026 cover

**Live since 2026-11-10.** Same 6 s scene as the parent folder (camera, beats, timing
unchanged), rebuilt on `site/public/canvas/mockups/ebb.png`: Home (15 / 9, "Add an app") and the Tide
pause "Three breaths, then in." with the Rev 7 pen. Output:
`site/public/canvas/previews/ebb-preview.{webm,mp4}` (rename `encode.py`'s
`ebb-next-preview.*` outputs to that).

What changed from the parent:
- `prep.py` — in-screen coordinates re-measured on the new cover: wave 1186–1368 ×
  712–762 (pen starts at 1188, seal at 1362, 723), baseline 754, new mark one tick pitch
  past the last history tick (1193.5), Turn back underline 1045–1113 at y 970, eleven
  record marks. The wave patch is sampled from the empty field ahead of the pen
  (x 1378), so the folded-away area keeps the faint baseline.
- `scene.html` — reads those values from `meta.json` instead of hard-coded numbers.
- `render.py`, `render_part.py` — launch the installed Chrome with an sRGB profile.
- `encode.py` — the parent README's two ffmpeg lines.

## Rebuild

Needs Pillow, NumPy, SciPy and Playwright (Python). From this folder:

```sh
cp cover-src.png site-cover.png
python3 prep.py
python3 render.py 0 test
mkdir -p frames; for k in 0 1 2 3; do python3 render_part.py $((k*720)) $(((k+1)*720)) & done; wait
python3 encode.py .
```

First frame vs. the tile: 38.4 dB PSNR, the same as the live pair, so the hover
crossfade stays invisible.
