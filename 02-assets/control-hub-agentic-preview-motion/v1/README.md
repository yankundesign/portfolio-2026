# Control Hub Agentic hover preview — source

6s loop for the fig. 02 plate. It starts and ends on `cover-src.png` (identical to
`site/public/canvas/mockups/control-hub-agentic.png`), so the hover crossfade and
the loop point don't show.

Beats, all inside the one Cloud Control window:
- 0–1.2s: hold, then push into the plan. "Yes, go ahead" is selected.
- 1.2–2.1s: the five steps check off in order.
- 2.25–3.25s: pull back as the AI agents page slides in; cards settle in a cascade.
- 3.25–4.3s: agent detail; On-demand and Schedule tick on.
- 4.3–5.35s: Overview; push into the prompt as it types itself.
- 5.35–6s: the plan answers top-down and the camera returns to the cover.

## Rebuild

```sh
python3 prep.py                          # layers/: clean bg, empty agents page + card sprites, checkbox + prompt sprites
SUBFPS=480 python3 render.py all frames  # Playwright, 2880 subframes at 1280×800
VF="tmix=frames=4,select='eq(mod(n\,8)\,3)',setpts=N/60/TB,format=yuv420p"
ffmpeg -framerate 480 -i frames/f%05d.png -vf "$VF" -r 60 -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -an control-hub-agentic-preview.webm
ffmpeg -framerate 480 -i frames/f%05d.png -vf "$VF" -r 60 -c:v libx264 -preset veryslow -crf 23 -tune animation -movflags +faststart -an control-hub-agentic-preview.mp4
```

`plan.png` sits at exactly 0.5× in the cover window at (211,161). The other screens
fit that window's 2996×1754 unit space by width (agents, detail) or with a dark
fill below (overview).
