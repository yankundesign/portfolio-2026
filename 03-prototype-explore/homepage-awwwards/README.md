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

## Round 8 (November 11, 2026): craft pass

**Ask:** Bring more craft in. Add visual and motion detail to the homepage, and refine how the works page shows the projects: fonts, images, interactions. Look at the inspirations again.

**Prototype:** `craft.html`, which is 01 as it ships today (the Settle cover, the live works spread). Fifteen details are layered on top, each with its own switch. The panel sits bottom-right; “All off” is the shipped site. The switches are kept in the URL (`?off=h2,w6`), so a mix can be shared.

**Idea:** the line is the motion. The cover's damped spring becomes the site's motion language, because a gesture repeated everywhere becomes the identity (Rizzle).

| | Detail | Rule or source |
| --- | --- | --- |
| H1 | Settle easing | The cover's spring, gentled to a 7% overshoot: 1 − e^(−6.5u)·cos(2π·1.25u), sampled into CSS `linear()`. |
| H2 | Plucked rule | The top-bar hairline rings where the cursor crosses it, using the cover's own constants in time: e^(−4.4t)·cos(2π·3.2t). |
| H3 | Line-first intro | The hairline draws, the name rises, then the notebook drops and settles (Ponder). |
| H4 | Ribbon pendulum | The ribbon tail is a damped pendulum; the book's tilt moves its pivot. |
| H5 | Cracked cover + Open | The cover lifts about 5°, and “Open →” follows the cursor, mirroring “Close ×” (Sonner). |
| H6 | Index rules | The homepage index draws its rule like the contents rows; no italic swap. |
| H7 | Local time | San Francisco time, colon breathing (Rauno). |
| W1 | Status line | Each entry's `canvasStatus`, verbatim. |
| W2 | Proof on the plate | The headline `canvasProofs` line in Fraunces. The subtitle drops where it only restates the proof (Ebb). |
| W3 | Motion previews | The existing preview loops for CHAI, Agentic and Ebb. |
| W4 | Plate grows from its thumbnail | FLIP from the thumbnail's own frame, and back on leave (NM Art & Design). |
| W5 | Read marks | A one-stroke pencil tick beside entries already opened, remembered in this browser. |
| W6 | Page turn | The right page's paper (measured on the spread) turns over; underneath is the case study's title page. |
| W7 | Arrow keys + folios | ↑ ↓ through the contents; *i* and *ii* in the outer corners. |
| W8 | Margin note | One Caveat note, “start here”, inside the 2–6-word marginalia rule. |

**Changed from the proposal:** the open spread already has a ribbon painted down its spine, so a second sliding ribbon (W5) would have doubled it. Read marks replace it. The running heads in W7 were dropped because the page kickers already do that job.

**Checks:** Pages load from disk and localhost. The test covers the intro, the pluck, the hover, opening, pointing at rows, video, leaving, the page turn, read marks, the arrow keys and Esc, with no page errors. Reduced motion falls back to the cross-fade, with no video, pluck or pendulum. “All off” matches the shipped spread.

**Content flags:** Ebb's headline proof is the first half of its subtitle. SAP Fieldglass's proof reads “vender” in `site/src/data/projects.ts`; the prototype shows “vendor”.

## Round 9 (November 11, 2026): keep W4, fix it; study recent.design

**Feedback:** Yankun approved the homepage details. On the works page they kept only W4, the plate that grows from its thumbnail, and sent a recording where it felt buggy.

**What the recording showed:**

1. **Hidden thumbnails reacted.** The plate rose over thumbnails that were invisible but still hoverable, so it jumped between projects under the pointer.
2. **A ghost plate.** The return animation was cancelled before the plate faded, so a full-size plate faded out on top of the sheet.
3. **Early caption.** The caption appeared at full position while the frame was still small, so text landed on the thumbnails.
4. **Jumps on interruption.** Pointing again mid-flight restarted from the wrong place.

**Rebuild (`craft.html`):**

- **The other works details are gone.** Only W4 is left; switching it off gives the shipped behaviour.
- **States:**
  - Lift: the thumbnail's own frame becomes the flyer, and the other plates step back.
  - Open: the flyer lands on the settle curve, and the caption follows 260 ms later.
  - Swap: pointing at another title cross-fades the picture in a frame that stays put.
  - Return: the caption leaves first, the frame flies home, and the sheet comes back as it lands.
- **The flight animates the frame's box in px** (left, top, width, height), not a scale, so the 1px ink rule stays 1px.
- **Every flight starts from the frame's current on-screen box,** so an interruption turns around smoothly.
- **Landing is a same-frame swap:** the thumbnail appears and the flyer hides. Nothing fades on top.
- **Thumbnail hover only marks its title** in the contents.
- **Return targets are measured from the thumbnail's offset in the sheet.** While a thumbnail is scaled, Chrome makes it its frame's offsetParent, so the frame's own offsets read 0, 0. That is why the first rebuild flew everything home to the top-left.
- **Checks:** a replay of the recording's moves (lift, swap, leave, interrupt mid-return, thumbnail hover, fast scrub, grace re-entry, Esc) on disk and localhost. The frame turns around from 240 to 278 px wide with no jump, lands clean (hidden, no animations, nothing lifted), and there are no errors.

**References: recent.design, Web.** I scanned the 155 newest posts and sampled the motion of 13. The eight that share this site's register are Matthew Yu's sketchbook hero, Sam Cheng's lanyard, *The weight of paper* (stamps), *Physical Texture Web*, *Text Selection Flowers*, Deimos, the Inkwell footer and *404 Tracing Paper*. What they teach:

- **Focus by blur.** The object stays sharp; the name and the unchosen items go soft (Matthew Yu, Deimos, stamps).
- **Physics you can hold.** The object can be grabbed, swings, and settles (Sam Cheng; the string-physics watch).
- **Inspect at real resolution.** A loupe shows paper, ink and fine UI only up close (stamps, *Physical Texture Web*).
- **State the rule on the page; let motion run backwards** (*Text Selection Flowers*).
- **Time as a ruler.** A year-by-year lifeline ruled under each subject (Deimos).
- **Play belongs in the margins.** Footers and 404s invite play (Inkwell, *Tracing Paper*).

**Left out on purpose:** WebGL shaders, liquid glass, dark rooms, and gradient blobs. They are outside the two-colour paper register.

**Later the same round:** Yankun asked for a different blue on “Open →” so it stands out from the notebook. The ink pill (#16265e) sat on cloth averaging #101c3b and vanished. It is now `--ink-lift` #3049a6: ink's hue (227°) at a lighter weight, with a soft shadow. Paper type on it is 7.0:1. A brighter #3958c6 was tried and passed over, because it drifts toward cobalt.

## Round 10 (November 11, 2026): matching close controls; plate refinements

**Ask:** Make the Close button match “Open →”. Refine the plates: spacing, image size, fonts, borders.

**Close controls:** the fore-edge tab and the “Close ×” label now use `--ink-lift`, like “Open →”. Hovering the tab presses it to ink.

**Measured at 1440 × 900** (1 cqh = 7.56 px; each plate is 194 px wide):

- **The two pages didn't share lines.** The plates started at 19 cqh while the contents' top rule sat at 27.2. The last caption ended at 85.1, and the foot at 93.
- **Captions were ragged.** Some broke onto two lines, and they were tracked at 0.06em, half the mono on the left page (0.12em).
- **The edge was inconsistent.** Four of the six screenshots are dark and merged into the 1px ink rule; the two light ones got a hard edge.
- **Hover cropped.** The 3.5% zoom cut off the screenshots' edges.

**Four switches (Plates group in `craft.html`):**

| | Change | Result |
| --- | --- | --- |
| P1 | One horizon | The sheet and the grown plate start on the contents' top rule (27.19 cqh on both pages). Rows space out so the last caption ends on the foot line (93). |
| P2 | Tipped-in plates | A 0.6 cqh paper mat sits inside the 1px ink rule, with a faint shadow. The image keeps its 1920 × 1200 shape, uncropped. The flying frame carries the same mat. |
| P3 | Captions in the contents' voice | The number is mono at 0.12em; the title is Fraunces at 1.8 cqh (2.1 cqh on the grown plate). All six fit on one line. |
| P4 | Lift, don't zoom | Hovering lifts a plate 0.5 cqh with a deeper shadow; the screenshot isn't scaled. |

**Image size:** at two columns, a plate's width is set by the page. A bigger plate would need another layout, such as one large plate and five small. I didn't try one: the sheet's job is the overview, and the grown plate is the large view.

**Checks:** the measurements above. Screenshots of the sheet, a hover, mid-flight and the grown plate. The plate replay still lands exactly on the thumbnail (212 px, 194 px wide), with no errors from disk.

**Feedback the same round:** Yankun disliked the border and the layout. Keep the plates where they were and bring the contents down to meet them. The mat and the full ink rule were too heavy, with too much space between rule and image. P3 and P4 are fine.

- **P1 is now “Top-aligned pages”.** The plates stay at 7.5 cqh under the page top (19 cqh on the book). The contents title is trimmed to its caps (`text-box: trim-both cap alphabetic`), so the top of the C sits on the plates' top line at 19 cqh on both pages. A 5.8 cqh margin keeps the old space from its baseline to the list's top rule. The block moves down 2.7 cqh.
- **P2 is now “Hairline edge”.** The rule is ink at 20% (`--ink-muted`), the same hairline as the contents rows, flush to the image. There is no mat or shadow. The flying plate uses the same rule.
- **Checks:** both tops measure 19 cqh, confirmed with a guide line. The plate replay lands on the thumbnail, with no errors.

## Round 11 (November 11, 2026): a smooth intro at 60 fps

**Feedback:** “The loading feels like a glitch.” Yankun sent a screen recording.

**What the recording and a cold-load capture showed:**

1. **Letter fragments for about 0.6 s.** Letters waited 110% below their line, but the line's clip reaches 0.3 em below it (for the g), so their tops showed. They now wait at 140%.
2. **The plain name flashed on a cold load.** It painted once, fully set, before the script split it into letters. The lines now stay hidden until they are split.
3. **The intro started before the fonts.** `document.fonts.ready` resolved at 26 ms, before the font stylesheet arrived at 137 ms. The intro now waits for the faces themselves (`document.fonts.load`, with a 2.5 s cap).
4. **“kun” flashed bold.** Before the first real pointer move, the name effect used a default cursor at the centre of the screen. The effect now stays off until the intro has landed and the pointer has moved, then fades in over 400 ms.
5. **A grey ghost notebook.** It faded in over 500 ms, and navy at partial opacity on paper reads as grey. It now becomes opaque in about 40 ms while it is already coming down, then settles. The lift and shadow start when it appears, not before.
6. **A pause.** The name waited 560 ms for the rule. Now the rule draws in 0–700 ms, the name rises from 200 ms, the notebook arrives at 520 ms, and the index follows at 950 ms.

**Per-frame work (Chrome profile, 1440 × 900 at 2×):**

| | Before | After |
| --- | --- | --- |
| Intro, layout passes / time | 752 / 151 ms | 89 / 3 ms |
| Frames over 25 ms while the intro is visible | 2 | 0 (the two left are at page load, before anything shows) |
| Pointer moving, layout passes per frame | about 9 | 1 |
| Pointer moving, main-thread time over 2.5 s | 1,478 ms | 591 ms |
| Idle, main-thread time over 2 s | 227 ms | 88 ms |

**Causes and fixes:**

- **Layout thrash.** The loop read each letter's box right after writing the previous letter's weight. Letter centres are now measured once (after the intro, and on resize), and the loop only writes.
- **The lamp repainted a full-screen gradient** every frame, and the cursor position was written on the page root, which restyled the whole page. The lamp is now a fixed-size light moved by `transform`.
- **The book's shadow re-rasterised its blur** whenever the radius changed. It now keeps one blur radius; lifting changes only its opacity and offset.
- **`shared/book.js` wrote its lighting variables on `.bk`,** which restyled everything inside the book each frame. They now go on the two shadows and the ribbon that read them. This applies to every prototype that uses the module.
- **Idle frames did work.** Each part now writes only when its value changes: the ribbon pendulum, the plucked rule, and the About photo.
- **Layers.** Letters and the notebook layer keep their own GPU layers, so a weight change re-rasterises one letter and nothing is demoted when the intro ends (that demotion was a 33 ms hitch). Each name line has `contain: layout style`.

**The live site has the same loop pattern:** `site/src/interactions/useMonographPointer.ts` reads letter boxes inside the write loop and writes `--mx` on the root.

**Checks:** a frame capture of a cold load, the profile above, the plate flight replay (lands clean), open and Esc, and reduced motion. No errors from disk.

**Later the same round: the labels are the cursor.** Yankun asked that “Open →” replace the cursor over the notebook instead of trailing a hand pointer.

- Over the notebook the system cursor is hidden (fine pointers only, and not while the book is open). The pill is centred on the pointer, so its middle is the hotspot.
- It grows in on the settle curve (scale 0.6 → 1) and presses to 0.88 on mousedown.
- “Close ×” over the paper around the open book does the same, so the pair matches.
- It works under reduced motion too (no peek, no scale). If the book closes under a pointer that isn't moving, the pill comes back by itself, so the cursor never disappears.
- **Checked:** both labels sit exactly on the pointer (offset 0, 0), the press state works, and there are no errors.

**Later the same round: the cursor no longer jumps.** Yankun's recording said “it feels like it suddenly jumped from somewhere.” A per-frame trace showed why.

- **The pill flew in from the top-left.** Its position lived in `transform` and its size in the separate `scale` property. The browser applies `scale` on top of `transform`, so a pill at scale 0.6 (later 0.35) was drawn at that fraction of its coordinates, then flew 355–550 px to the pointer as it grew, and back as it shrank. The position is now in `translate` with `transform-origin: 0 0` and centring in `transform`, so it scales about its own centre on the pointer. The pill is now 3–9 px from the pointer throughout, which is the deliberate 30 ms follow.
- **It froze at the book's edge on leaving.** It faded where the pointer left while the arrow moved on, so for a moment there were two cursors. It now keeps following while it shrinks (to 0.35) and fades (150 ms), so it collapses into the arrow. Arriving, it grows out of the pointer with an ease-out and no overshoot.
- **The tilt snapped at the edge.** Crossing into the book switched the tilt factor from 3 to 9. A hover amount now eases in and out (time constant 130 ms) and blends tilt, lift, blur and shadow. The trace's largest tilt change was 0.07° per frame.
- **The cover crack bounced.** Its spring is now critically damped (stiffness 120, damping 22).
- **“Close ×” uses the same placement.** Its inline transform from `book.js` is overridden.

