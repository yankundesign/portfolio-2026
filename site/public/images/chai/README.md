# CHAI case study images

Drop editorial-plate screenshots here. The `ChaiProject` component reads them
from these paths (see `site/src/data/chaiContent.ts`). Missing images render a
dashed-frame placeholder with the expected path — the page doesn't break.

## Expected files

| filename                | caption                                                 | used in                    |
|-------------------------|---------------------------------------------------------|----------------------------|
| `chai-1-0.png`          | fig. 01 · CHAI v1.0 — the empty state offered three canned prompts; the answer state returned a numbered procedure | Beat 1 · Opening   |
| `smart-search.png`      | fig. 02 · smart search with contextual tunnel           | Proof I                    |
| `report-kickoff.png`    | fig. 03 · report kickoff with AI insights toggle        | Proof II                   |
| `report-delivered.png`  | fig. 04 · report delivered with analysis in place       | Proof II                   |
| `devices-clustering.png`| fig. 05 · multi-signal embedding clusters               | Proof III                  |
| `devices-embed.png`     | fig. 06 · CHAI on the device page                       | Proof III                  |

## Formats

- PNG or WebP. Reasonable dimensions (~1400–2000px wide for retina).
- Keep full color — the editorial-plate treatment is never duotoned (hard rule).
- No drop shadow baked in. The `EditorialPlate` component handles the frame
  (1px ink rule + paper-soft fill + soft shadow) via CSS.

## To update captions or add new figures

Edit `site/src/data/chaiContent.ts` — the `figures` export.
