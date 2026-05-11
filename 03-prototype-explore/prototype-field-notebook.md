# Prototype B · Field Notebook

*Yankun · YK-001 · April 2026*

> Portfolio as zine/sketchbook. Each project is a spread: process on the left, polished work on the right. Chronological, with journal pages between. This document is the build spec. Read `vibe-guideline.md` first for the visual and voice system — this doc only covers what's specific to this prototype.

---

## The core metaphor

A working designer's field notebook, made public. Not a finished portfolio monograph — a working document with rough edges intentionally preserved. You open the cover. You turn pages. Each project spread shows how I was thinking on the left and what shipped on the right. Journal pages between projects carry my reflections, tool notes, and smaller experiments.

The metaphor works because:
- It lets process be a first-class citizen, not an afterthought
- The process/polish dialectic is a thesis about how I work — it argues for the kind of senior designer I am
- Chronology gives the portfolio narrative structure without forcing me to oversell any single piece
- It accommodates varied work naturally — side projects, writing, and mainline work all fit as spreads or journal pages

Risk to watch: reading as junior or "designer who sketches." This is the ever-present risk for any hand-drawn-adjacent portfolio. Mitigation is craft: rigorous typography, strict grid, restrained use of sketch elements. The Mary Kim zine we're referencing reads senior precisely because its looseness is bounded by discipline.

---

## Notebook identity (to resolve)

Needs a working title, though less urgently than Liner Notes (a notebook doesn't demand a name). Options:

- *Field Notes, 2021–2026*
- *Working Notebook* (understated, may be too plain)
- *A Notebook of Compositions*
- *Yankun, in Progress* (plays on "portfolio" vs. "working")
- No title — just "Yankun" on the cover and a date range

My lean: no formal title, cover shows name + date range + a hand-lettered subtitle.

The notebook is **Volume V** (five years, loosely). Implies there were earlier notebooks — a quiet nod to career depth without needing to show them.

---

## Information architecture

```
/ (Cover — closed notebook)
  └── open → /contents (Inside front cover + table of contents)
      └── turn page → /spreads/01-chai (etc.)
          → /spreads/02-smart-search
          → /journal/01 (between projects)
          → /spreads/03-write-like-webex
          → /spreads/04-sap-fieldglass
          → /journal/02
/colophon (how-this-was-made, styled as inside back cover)
/404
```

Linear-but-navigable. The default experience is turning pages, but a contents page and a persistent page-number jump control let people skip.

---

## Screen-by-screen

### 1. Cover (landing)

A closed notebook sitting on the warm paper background.

**Visual construction:**
- Notebook at roughly 70vh, centered
- Slight 3D perspective — the notebook has thickness (5-8px of pages visible along the right edge)
- A subtle drop shadow beneath it — more directional than the Liner Notes sleeve, because a notebook lies flatter
- Cover has texture: subtle linen or canvas feel (SVG texture, not photographic)
- A thin elastic closure band wrapping the notebook (hand-drawn, SVG)
- Small corner details: a slightly bent corner, a faint ink smudge near the spine — earned wear, not fake aging

**Content on the cover:**
- Upper-center: a small pasted label (rectangle, off-white, 1px ink border) with hand-lettered text — the subtitle
- Center: "Yankun" in Fraunces display, large
- Below: "Volume V · 2021–2026" in mono
- No illustration on the cover itself — the cover is the object

**Interaction:**
- Hover: the cover lifts ~2px, elastic stretches slightly (4px downward bow), shadow deepens
- Click: the cover opens

---

### 2. The page turn (signature interaction)

The defining motion of this prototype. Must feel like turning a real page.

**For opening the cover:**
- Duration: 800ms
- The cover hinges left (binding is on the left, pages turn right-to-left to open? No — this is a Western notebook; binding is on the left, you open by lifting the cover from the right edge toward the left)
- During the motion, the underside of the cover is visible (slightly different texture, as real book covers have)
- When fully open, the viewport shows the inside front cover on the left and the first real page on the right — a double-page spread

**For subsequent page turns (within the notebook):**
- Duration: 600ms
- Page lifts from the right edge, curves, and settles on the left side of the spine
- Brief moment where both the front and back of the turning page are visible
- The new right page is revealed as the turn progresses

**Easing:** `cubic-bezier(0.4, 0.0, 0.2, 1)` — feels like paper falling under its own weight

**Sound (optional, off by default):** a brief paper-rustle per turn. Toggleable in colophon.

**Scroll behavior:**
- Scrolling on desktop triggers page turns (with throttling to prevent runaway flipping — one turn per scroll "gesture", ~400ms cooldown)
- Arrow keys turn pages
- A small page-number indicator in the bottom-right corner (mono, "p. 12 / 28") doubles as a quick-jump affordance

**Reduced motion:** pages cross-fade with a 300ms transition. No rotation.

---

### 3. Inside front cover + Table of Contents

The first spread you see after opening.

**Left page (inside front cover):**
- Bookplate-style layout
- Hand-drawn rectangle (rough, slightly wobbly)
- "This notebook belongs to:" in mono small caps
- "Yankun" written large in the handwriting font (to swap for real handwriting in v2)
- Below: "San Francisco, 2021–present" in Fraunces italic
- A small hand-drawn doodle in the lower-right corner (one of the hero ink drawings)

**Right page (contents):**
- Header: "Contents" in Fraunces display, 40px
- A hand-drawn horizontal rule
- Entries styled as a real handwritten table of contents:

```
  I.    Control Hub AI, from 3% to 15%     ... p. 04
  II.   Smart Search, rewritten            ... p. 12
        journal: on search                 ... p. 18
  III.  Write-like-Webex                   ... p. 22
  IV.   SAP Fieldglass, homepage           ... p. 28
        journal: on endings                ... p. 34
  V.    How this was made                  ... p. 36
```

- Roman numerals, title in Fraunces, dotted leader in mono, page number in mono
- Hover: the row gets a 1px underline; clicking jumps to that spread
- Journal entries are indented and italicized, so they read as interstitial

---

### 4. Project spread (the template)

This is the workhorse pattern of the notebook. Two-page spread per project.

**Spread layout (desktop):**
- Viewport shows both pages side by side, with a visible center binding
- Each page is bounded by the notebook's edges (subtle shadow near the binding to suggest depth)
- A small page number in the outer bottom corner of each page

**Left page — PROCESS:**

Title at top: the project name in Fraunces, 32px. Below: a mono subtitle with the role, dates, and collaborators (`2024-2025 · CHAI · with Nirav Shah + Kathryn Lee`).

Body of the page is a collage of process artifacts laid out on the grid but allowed to slightly rotate (±2°) to feel pasted in:

- 2-3 sketch photos or scans (rough concepts, whiteboard shots)
- A handwritten research quote in a sticky-note style (subtle yellow tint)
- A wireframe screenshot (editorial frame, same treatment as polished screenshots but with a caption like `fig. A · early direction`)
- A handwritten margin note reflecting on the process (Caveat font for prototype)
- A crossed-out idea — literally a piece of text with a strikethrough and a handwritten "no" next to it

The left page's job: show I had a process, and show what I rejected.

**Right page — POLISH:**

Title at top: repeats the project name in Fraunces italic, smaller (20px) — functions as a "continued" header.

Body is the polished work, on the grid, no rotation:

- 1-2 large UI screenshots as editorial plates (ink rule border, mono caption)
- The metric highlighted — a single large pull-out of the outcome (`3% → 15%` in Fraunces display, 72px)
- A short essay (300-500 words, shorter than Liner Notes case studies) — first person, what shipped and why
- The credits block at the bottom (same format as Liner Notes — producers, collaborators, outcome)

The right page's job: show what shipped and what it achieved.

**Interactions:**
- Process artifacts on the left are slightly interactive — hovering lifts them ~2px and squares them to 0° rotation briefly (like straightening them to read)
- Clicking a screenshot opens a larger overlay
- Scrolling down reveals more of the spread if it extends past the viewport (some spreads will be taller than one viewport; the page "continues" with a visual cue)

---

### 5. Journal pages

Between project spreads, single pages (not double spreads) of my reflections. Treated as interstitial.

**Layout:**
- Single page centered in the viewport (the facing page is blank or shows a faint date)
- Header at top: "Journal" in mono, small caps. Date in mono. Location in mono.
- Body: 200-400 words of reflection, in Fraunces italic for the first paragraph, then roman for the rest
- Often includes a single hand-drawn mark or small illustration
- No grid breaks, no screenshots — this is the reflective space

**Content suggestions for v1:**
- Between projects 2 and 3: "On search" — a short reflection on what I learned from the Smart Search work that I've carried since
- Between projects 4 and colophon: "On endings" — a brief piece on how projects end vs. ship, and how I think about both

Both are stubbed for v1 — just the structure, with placeholder content.

**Interactions:**
- Turns like any other page
- Hover states are quiet — this is for reading

---

### 6. Colophon (`/colophon`, styled as inside back cover)

The final spread.

**Left page — "How this was made":**
- Title at top in Fraunces display
- Short essay (300-500 words) — same content direction as Liner Notes colophon, but stylistically treated as a notebook entry
- One real Claude Code prompt shown inline (mono, in a subtle gray-blue panel)
- A "what I wouldn't let AI do" list

**Right page — "Thanks":**
- A proper credits page — who helped, mentors, collaborators, inspiration (Mary Kim zine, etc.)
- A "contact" block at the bottom: email, one or two social handles
- The timestamp of last update
- The sound on/off toggle

---

### 7. 404

A blank page in the notebook.

- Header: "This page is blank." in Fraunces italic
- Sub: "Not every idea makes it in."
- A hand-drawn mark: an empty rectangle with a small question mark inside
- Link: `← Return to contents`

---

## Content inventory (v1)

Fully written:
- CHAI spread (process artifacts + 400-word polish essay)
- Contents page
- Inside front cover copy
- Colophon essay + thanks
- Both journal pages (short)
- 404

Stubbed (real titles + one process artifact + one polish screenshot + short paragraph):
- Smart Search
- Write-like-Webex
- SAP Fieldglass

Not yet:
- Full essays on stubbed spreads
- Real hand-drawn marginalia (Caveat is placeholder)
- Real process photos (can use reasonable stand-ins)

---

## Technical notes

- Static site. Same stack recommendation as Liner Notes (Astro or Vite + TS).
- No CSS framework. Plain CSS with design tokens.
- Page turn is the hard part — it's a CSS 3D transform on a stack of page elements with JS orchestration to manage stacking order, current page state, and scroll/key input.
- Consider pre-computing spreads as single HTML blocks rather than virtualizing pages — total page count is small (~20-30), so performance is a non-issue.
- Font loading: self-host Fraunces + JetBrains Mono + Caveat.
- Screenshots as WebP with PNG fallback.
- Images in process collages: the slight rotation is set via CSS — do not bake it into the images themselves (so I can adjust later).
- Deploy target same as Liner Notes.

---

## The one thing a visitor will remember

The process/polish dialectic on the CHAI spread. The first time someone sees sketch + shipped side by side with a hand-drawn note, it's a statement about who I am as a designer — more than any tagline could be.

Second-order thing: the "continued" conceit on right-page titles. Small detail, but it's the kind of craft that senior designers notice.

---

## Success criteria for the prototype

Done when:
1. Cover renders with notebook-object treatment (texture, depth, elastic band)
2. Cover-open transition works and feels physical
3. Page-turn interaction works and handles scroll + keyboard gracefully
4. Contents page is real with all entries
5. CHAI spread is fully built — both pages, real process artifacts, real polish content
6. Other project spreads are stubbed
7. At least one journal page has real content
8. Colophon has scaffolding
9. Works on a 1440×900 laptop; mobile is a known hard problem here (see below)
10. Keyboard-navigable, `prefers-reduced-motion` respected

Explicitly not required for prototype:
- Real hand-drawn marginalia (Caveat is fine)
- Real hero ink drawings (placeholder fine)
- Full content for stubbed spreads
- Mobile full experience

---

## Known hard problems specific to this prototype

**Mobile.** A two-page spread doesn't make sense on a phone screen. For mobile, spreads need to become stacked — process page first, polish page below. This is a design problem, not just an engineering one, and it dilutes the metaphor. Options to evaluate:
- Collapse spreads to single scrolling pages on mobile (most likely right answer)
- Show only the polish side on mobile, with a "see process" expander
- Keep spreads as a tablet+ experience, offer a simplified mobile view
Plan to confront this in the second week of prototype building, not at the start.

**Rotated artifacts and layout math.** The ±2° rotation on process artifacts looks casual but requires care: bounding boxes need to be larger than the artifacts to prevent clipping, and they must not overlap polished content. Establish a "rotation zone" per artifact with padding.

**Page-turn performance.** 3D transforms on image-heavy pages can stutter. Preload the adjacent pages (previous and next) but not further. Use `will-change` carefully.

---

*End of Prototype B spec.*
