# Ebb case study media

Media for `/works/ebb` (`site/src/data/ebbContent.ts`). Refreshed 2026-11-10 from the
submitted build's source in the iOS Simulator; raw screens and provenance are in
`02-assets/ebb-captures-2026-11-10/`. Missing files render as framed placeholders with
the expected path, so the page stays usable.

| Filename | Where | Content |
| --- | --- | --- |
| `hero.png` | Header | Home (15 turned back, 9 went in, "Add an app") beside the Tide pause, "Three breaths, then in." |
| `02-product-four-frames.png` | What Ebb is | TikTok launching, the Tide pause, "Turned back." |
| `video.MP4` + `video_bg.png` | How it works | The real intercept loop, recorded on a phone, over the watercolor field. Still shows the pre-November pen; re-record on the device to update |
| `06-toll-vs-mark.png` | Visual system | "TikTok is armed.", "Turned back.", Home |
| `07-intercept-screen.png` | Visual system | The Tide pause with the Rev 7 pen |
| `breath-patterns-six.mp4` / `.webm` / `-poster.png` | Breath patterns | Six patterns playing one pause in step, 3 × 2: Tide, Ruling, Comb; Bezel, Hatch, Ripple. Cut from `screen-time/Marketing/BreathPatterns/01–06` with the deck's crop boxes. 13.6 s, 2318 × 766 |
| `setup-taps-loop.mp4` / `.webm` / `-poster.png` + `video_bg.png` | Setup guide | The new setup flow: iOS 26 guide pictures 5–7 (Run Immediately, Next, New Blank Automation). 13.8 s, portrait 1206 × 2622, over the watercolor like the intercept loop |
| `setup-pictures-ios26.png` | Setup guide | All ten iOS 26 setup pictures, Reduce Motion stills |

The plates with phones keep their original compositions; only the screens inside the
phones were replaced, measured inside each bezel. Plates made in the refresh but not
used are in `02-assets/ebb-captures-2026-11-10/plates-not-used/`.

## Export guidance

- Keep stills as lossless PNG because they contain UI and text.
- Export stills at roughly 1400–2000px wide for crisp retina display.
- Keep screenshots in full color. Do not add a baked-in border or shadow; the
  site supplies the editorial plate treatment.
- Export video silent and short enough to loop cleanly. The page plays a video only
  while it is in view, and never for visitors who ask for reduced motion.
- Captions carry no "fig. NN" numbers. Update caption and alt text in
  `site/src/data/ebbContent.ts` when a composition changes.
