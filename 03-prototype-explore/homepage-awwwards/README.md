# Homepage, five ways

Prototype exploration, November 11, 2026. Not deployed; nothing in `site/` changed.

Brief: rethink the homepage, aim for an award-level first impression for hiring managers, and keep the notebook opening as the key experience. The cat roulette may go. CV and About may shrink or change form. Show taste in visuals, type, layout, spacing and motion.

Open `index.html` through the `prototypes` launch config (port 5199, served from the repo root):
`http://localhost:5199/03-prototype-explore/homepage-awwwards/`

Keys 1–5 switch directions. N shows each page's notes.

## Method

Each direction followed the reference-led loop:

1. Name the page's job.
2. Pick three references from `~/google-interview/theme/inspirations/`, mixing editorial, system and product sources.
3. Look at them side by side. The study sheets are in `studies/`.
4. Take one move from each reference: a principle, never a copied graphic, palette or typeface.
5. Build the direction.
6. Compare it with the live homepage in `studies/before-after.jpg`, which shows the live site top-left and the five directions after it.

## What all five share

- **One notebook.** `shared/book.js` uses the geometry of `site/src/components/transition/NotebookTransition`: the cover is hinged at the spine, the back of the cover is the left half of the spread, and the lighting comes from a single angle value. Each page places the closed book by giving it an empty "slot" box. Pages choreograph two values:
  - `t`: the camera
  - `p`: the cover
- **Inside the book.** A contents page and a plate for the six current projects, with titles and subtitles from `site/src/data/projects.ts`.
- **Type.** Fraunces for display and text, pushed through its optical-size, weight, SOFT and WONK axes. JetBrains Mono for labels. Caveat once, in 04.
- **Colour.** Ink and paper only.
- **Reduced motion.** Every open and close becomes a 240ms cross-fade.

## Directions

### 01 · Monograph

**Job:** make the name and the notebook the whole first impression.

| Reference | Move |
| --- | --- |
| Way of Living | One object at real scale; its shadow falls away from the cursor, like a lamp. |
| Maiskaia Alla | An expressive title in a quiet frame; the notebook stands in front of the name. |
| Obys | Poster-size name, 11px for everything else, nothing in between. |

**Motion:**
- Letters rise out of their lines.
- Weight and softness swell under the cursor.
- On open, the name parts as the cover swings.

**CV and About:** rows in a four-line index.

### 02 · Index

**Job:** show the range of work at a glance, then let the notebook confirm it.

| Reference | Move |
| --- | --- |
| Stameska | Visible structure: column rulings, a ruled header, register ticks around the object. |
| Lens | An index with three type levels; each row previews its project. |
| Upstream | The project screen is the hero, shown on the notebook's own page. |

**Motion:**
- Hovering a title lifts the cover on a spring to about 72°, revealing that project's plate inside.
- Switching titles flicks the cover.

**CV and About:** one mono line under the index.

### 03 · Drawing

**Job:** show the architect's eye by measuring the object before it opens.

| Reference | Move |
| --- | --- |
| Okta iconography | The rule beside the form: dimension and extension lines next to the notebook. |
| Modern | Line drawing and finished object together; the photo develops inside its construction. |
| Cohere | One governing idea generates the system; the drawing's title block is the navigation. |

**Motion:**
- The lines draw on, then the notebook develops from top to bottom.
- Construction lines follow the cursor.
- A plan detail shows the cover swinging like a door, tracking the real angle before the camera moves in.

**CV and About:** title-block cells.

### 04 · Peel

**Job:** make opening the notebook a gesture you perform.

| Reference | Move |
| --- | --- |
| Jaz Mingo editorial portfolio | Physical evidence: the résumé is tucked under the cover, a photo held by the band. |
| Trato | One handwritten note inside a disciplined layout. |
| Emil Kowalski, Sonner | One behaviour done carefully: the cover follows the hand, resists, and decides by distance and speed. |

**CV and About:** the tucked sheet slides out. The polaroid fans into four photos.

### 05 · Sentence

**Job:** introduce Yankun in one sentence whose nouns are the navigation.

| Reference | Move |
| --- | --- |
| Off the Record | An oversized serif; hierarchy comes from roman versus italic. |
| Perplexity (Smith & Diction) | The identity is the interaction: the notebook in the sentence is the real book. |
| Rauno Freiberg, Craft | Small, inspectable details: the page tilts, the photos fan, the clock's colon ticks. |

**CV and About:** "page" and "the rest" in the sentence.

## Placeholders and open questions

- **Copy.** Homepage lines are placeholders for Yankun to rewrite, especially the sentence in 05 and the photo labels in 04 ("Outside", "Building").
- **Links.** Contents and About links point to the live site.
- **Dimensions.** The 148 × 210 × 16 mm figures in 03 are drawing annotation, not real notebook measurements.
- **Desktop only.** Built against 1440 × 900. Mobile is not designed.
- **Inside the book.** The opened state is the same contents spread in all five. The live site hands off to `/works` instead.

## Round 2 (November 11, 2026)

**Feedback:** 01 chosen, with the Archive cover. Remove "Currently…" and "Designed and built with…" from the homepage. The pre-selected first project inside the book read as a mistake. The close control was too far from the book. Also try a version that keeps the live grid.

- **Archive cover.** Built in code (`cover: 'archive'` in `shared/book.js`): book cloth, a blind-debossed title, a ribbon tail. It has the same shape as the spread's right-hand board (1604 × 2170 px), so it no longer stretches as it opens. Used by 01 and 1.1.
- **The stray line.** The hairline beside the notebook was the cover-thickness strip, visible edge-on at rest. It now sits on the board's measured edge and only shows while the cover turns.
- **Contents.** Nothing is selected by default. The right page shows all six plates. Pointing at a title draws that row's rule in ink, swaps its year for "Read →" and shows that one plate. Nothing shifts or turns italic.
- **Close.** A Close tab slides out from under the book's fore-edge. Clicking the paper around the book closes it too (the cursor shows "Close ×" there), and Esc still works. The top-centre pill is gone.
- **1.1 · Monograph on the grid** (`01-1-monograph-grid.html`). 01 on the live plate: bleed frame, register marks, numbered 12-column ruling, and `useWaveGrid` ported to `shared/wavegrid.js`. The name locks to columns 1 and 12, the column under the cursor lights its number, and the notebook sends a ring through the paper as it opens and lands.
- **Image prompts.** `asset-prompts.md` has prompts for the cloth texture, the inside cover, a clean spread and an optional photographed cover, with exact pixel sizes.

## Round 3 (November 11, 2026)

- **Cover legibility.** The blind (navy-on-navy) title failed contrast. The title is still pressed into a recessed panel but is now filled with paper colour: about 12.4:1 for the title and 8.7:1 for the small lines. The small lines render at about 12px at the cover's resting size. The cover is `aria-hidden`, since the slot's label already names it.
- **1.1 index.** The four pages are no longer ruled rows crossed by column rules, which read as a table. They're captions in columns 1–4, each hanging from a short ink tick on its column rule. Pointing at one draws its underline and lifts that column's paper.

## Round 4 (November 11, 2026): decision

- **Decision.** Yankun chose **01 Monograph**, not 1.1. It's logged in `00-brief/decisions-log.md`.
- **Generated Archive images** (`assets/`), wired into the shared book with `cover: 'archive'`:
  - **Cover:** `cover-archive.webp` with the live paper-coloured title on top.
  - **Spread:** `open-notebook-v2.webp`, whose left half is the inside of the cover.
  - **Ribbon:** `ribbon.webp`.
  - **Board edge:** `cloth-navy.webp`, seen only while the cover turns.
  - **Not needed:** `inside-cover.webp`, because it's an exact crop of the spread's left half, which the code already uses as the back of the cover.
- **Checks:** 01 closed, three moments of the swing, and open, at 2×, with no errors and no failed requests. Open and close pass on every page, with and without reduced motion.

## Round 5 (November 11, 2026): cover variants

"Yankun Wang" is off the cover, and the cover's title, content, tags and visual are rethought five ways. `covers.html` shows all five side by side. In 01, switch with the A–E buttons in the bar, `?cover=a…e`, or the [ and ] keys.

| | Title | Content | Tags | Visual |
| --- | --- | --- | --- | --- |
| **A · Stamp** | Selected Work | Six projects | 2020–2026 | The recessed panel, retitled |
| **B · Index** | Selected work | All six titles | 01–06, 2020–2026 | The contents on the cover, ruled like the page inside |
| **C · Numeral** | Selected work | “06” | AI products, Enterprise, Design systems | An outlined numeral runs off the bottom edge |
| **D · Tooled** | Selected Work | — | 2020 – 2026, old-style figures | A bookbinder's double frame, letterspaced capitals, one ornament |
| **E · Ruled** | Work | Six pressed columns | 01–06 at the column heads | The site's grid pressed into the cloth |

**Accessibility.** Every word is paper-coloured on the cloth (title about 12.4:1, small lines about 8.7:1). Pressed frames and rules are decoration only. The smallest text measures at least 11.5px on screen at the cover's resting size in 01.

"Vol. V" is dropped, since nothing in the work explains what the five counts.

## Round 6 (November 11, 2026): brand-led covers

The brief was to design the notebook the way a brand designer would. Eight references (Blueprint Notebook, Atlas Garden, a patterned notebook mockup, a white elastic notebook, Frame, Fulget, Sira, Kajecik) are on `studies/covers-round2-refs.jpg`. Behance blocks automated reading, so the two case studies were read in the browser.

**Brand platform**

- **Name:** the object is called Field Notebook.
- **Edition:** No. 06, one per project, rising as projects are added.
- **Idea:** complex systems, made handleable. It's shown, never written.
- **Material:** the generated navy cloth, ink and paper only.

| | Device | Reference move |
| --- | --- | --- |
| **F · Plate** | Exploded drawing of six planes, keyed a–f; ruler on the spine edge; measured grid; title block | Blueprint Notebook, Kajecik |
| **G · Library** | “F.N” monogram, section index I–IV, large serif lines | Atlas Garden |
| **H · Line** | One line: a knot of three crossing loops that leaves as the straight line under the title; it draws itself in | Fulget |
| **I · Monolith** | “Field” at full height, metadata at the corners | Frame |
| **J · Module** | One tile (a square with two quarter-arcs); turned at random it tiles into connected paths, and the tile is the mark | Patterned notebook, Kajecik |

- **Comparison and default:** `covers.html` shows round 2 above round 1, and 01 now opens on H.
- **Legibility:** every word measures at least 11.5px at the cover's resting size.
- **Checks:** pages load from disk and from localhost with no errors.
- **H's line** took four drafts. The first two read as the numeral “2” or “9”, the third as a magnifying glass, and an oscillator version came out jagged. The final version uses hand-placed points smoothed into a spline.

## Round 7 (November 11, 2026): one line, one rule

**Feedback:** Yankun liked the line (H), but it felt too random to read as a thoughtful design. Remove “No. 06”, and try five more line options.

- **No. 06 is gone everywhere.** It was on F, G, H and I. F's label now reads “Plate I”.
- **Five line covers (K–O).** Each line follows one stated rule. The type frame is identical on all five, except that M's title sits right, on the calm part of its curve. Each line draws itself in.

| | Rule |
| --- | --- |
| **K · Loop** | One cursive loop: four tangent-continuous curves, then a straight run under the title. |
| **L · Knot** | An exact 3:2 Lissajous (x = cos 3t, y = sin 2t); the last strand leaves along its tangent into the baseline. |
| **M · Settle** | A damped spring, y = e^(−4.4u)·cos(2π·3.2u), plotted until flat. |
| **N · Iterations** | One wave, scaled down by the same curve over six lines; the last is straight. |
| **O · Route** | An orthogonal path with one corner radius: three rows, each 8 units shorter, six stations, then one long straight run. |

**Fixes along the way:**

- Moved K's loop off the title.
- Shrank and lowered L's knot so its exit is short.
- Replaced M's bouncing ball, whose bounces read as spikes, with a spring curve.
- Smoothed N's waves so they don't read as audio.
- Rerouted O so its last vertical misses the title.
- Renamed the variant classes to `ln-*`, because the comparison page's `.k` style was leaking into cover K.

**Defaults and checks:** `covers.html` shows K–O first, and 01 opens on L. Every word measures at least 11.5px at resting size. Pages load from disk and localhost with no errors.
