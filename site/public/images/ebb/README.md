# Ebb case study media

Drop the final Ebb case-study media in this folder using the exact names
below. Missing files render as framed placeholders with the expected path, so
the page remains usable while the case study is assembled.

## Files used by the current page

| Filename | Content |
| --- | --- |
| `hero.png` | Header overview image, ideally the intercept, home record, and calm-room states |
| `01-actual-week.png` | Real screen-time data from the week that prompted Ebb |
| `02-product-four-frames.png` | Open → pause → choose → see the mark land |
| `03-intercept-loop.webm` | Preferred silent loop of the real intercept flow |
| `03-intercept-loop.mp4` | MP4 fallback for the same silent loop |
| `06-toll-vs-mark.png` | Conventional progress bar versus Ebb's accumulating mark |
| `07-intercept-screen.png` | Final intercept screen, uncropped |

The WebM and MP4 are two encodings of one visual slot. Supplying either one is
enough; supplying both provides the best browser coverage.

The simplified five-section case study no longer renders the system-flow,
Shortcuts-setup, copy-variant, or AI-process plates. Those filenames remain
available for a future build-notes page, but are not required for `/works/ebb`.

## Export guidance

- Keep the five stills as lossless PNG because they contain UI and text.
- Export stills at roughly 1400–2000px wide for crisp retina display.
- Keep screenshots in full color. Do not add a baked-in border or shadow; the
  site supplies the editorial plate treatment.
- Export the video silent, without autoplay audio, and keep it short enough to
  loop cleanly. The page disables autoplay when reduced motion is requested.
- Update the matching caption and alt text in
  `site/src/data/ebbContent.ts` if the final composition differs from the slot
  description.
