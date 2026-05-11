# Portfolio Vibe & Visual System

*Yankun · YK-001 · v0.1 · April 2026*

---

## The one-line

A portfolio that feels like a printed object rendered in browser — patient, literary, confidently asymmetric, densely crafted on close inspection. A senior designer's portfolio, not a showreel.

## Who it's for

Hiring managers and design leaders scanning fast. They need to read "senior" in the first ten seconds and "worth an interview" in the first two minutes. Everything below serves that — the discipline is there to make the work land, not to perform taste.

## What it is not

- Not a hero + grid portfolio
- Not a case-study-wall with Medium-article vibes
- Not a showreel of screens
- Not twee, not scrapbook-y, not "designer who doodles"
- Not a demonstration that AI can make slop quickly

---

## Core aesthetic decisions

### Spine (parallel prototypes)
Two candidates, same visual system, different organizing metaphors:

- **Liner Notes** — portfolio as album sleeve. Gatefold cover unfolds to a track list. Each project is a track with runtime and session credits. Side projects live as B-sides.
- **Field Notebook** — portfolio as zine/sketchbook. Each project is a spread: process on the left, polish on the right. Chronological, with journal pages between.

Both prototypes ship before we pick. The spine is the organizing metaphor only; color, typography, motion, voice stay identical across both.

### Color

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#16265e` | Primary. Type, rules, marks, most UI. |
| `--ink-soft` | `#2a3a7a` | Secondary type (captions, metadata inline). |
| `--ink-muted` | `rgba(22, 38, 94, 0.2)` | Hairline rules, dividers. |
| `--paper` | `#f4f1ea` | Background. Warm off-white. |
| `--paper-soft` | `#ebe6d9` | Callouts, quote blocks, subtle panels. |

Only two colors, one darker and one lighter. No grays, no accent colors, no third "brand" color. If a third color is ever needed (e.g., a metric highlight), it becomes the ink blue at heavier weight.

Paper grain: subtle SVG noise at ~6% opacity, fixed to viewport, multiply blend mode. Only noticeable on close inspection.

### Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display | Fraunces | 300, 400, 500 | `opsz` variable axis. Use 144 for headlines, 36–72 for subheads. Slight negative tracking at display sizes. |
| Body | Fraunces | 300, 400 italic | 18px / 1.55 line-height for essay body. Italic for emphasis and taglines. |
| Metadata | JetBrains Mono | 300, 400 | 10–12px. Tracked 0.1–0.15em. Uppercase for labels, mixed-case for data. |
| Marginalia (v1) | Caveat | 400, 500 | Handwriting stand-in. Swap for real handwriting before ship. |

**Scale (desktop):**
- Display XL (cover name): 88–104px, line-height 0.88, tracking -0.03em
- Display L (project titles): 56–64px, line-height 0.95
- Display M (section heads): 32–40px
- Body large (essay lead): 22px / 1.5
- Body (essay): 18px / 1.55
- Caption / metadata: 11–12px, tracked 0.1em

**Rules:**
- One display voice per page. No mixing weights in a single headline unless for deliberate emphasis (italic word in a roman line).
- Italics are earned, not decorative. They carry weight — use for titles, reflective asides, emphasis.
- Never uppercase body text. Uppercase is reserved for metadata labels.
- Handwriting is never used for primary content. Marginalia, arrows, underlines, signatures only.

### Hand-drawn elements

Two tiers:

**Marginalia** (quiet, everywhere):
- Small arrows pointing at specific things
- Underlines on a phrase in the body text
- Circled words for emphasis
- Tiny checkmarks, stars, dashes in margins
- A handwritten note 2–5 words long
- Used sparingly — no more than 2 per screen; never competing with each other

**Hero marks** (loud, 3–5 total across the whole site):
- One on the landing cover
- One at the top of each major section (Liner Notes: side A / side B opener; Field Notebook: each chapter)
- Single-line or two-line ink drawings
- Confident, not fussy. Think Saul Steinberg more than technical illustration
- Rendered as SVG, stroke 1.2–1.6px, ink blue, round line caps

**What is NOT hand-drawn:**
- Icons (use a consistent editorial icon set or omit entirely)
- UI chrome (buttons, navigation, links — these are typographic)
- Screenshots and product imagery

### Grid

Strict 12-column grid with defined gutters. Rules:

- **Max content width:** 1280px
- **Columns:** 12 at desktop, 6 at tablet, 4 at mobile
- **Gutter:** 24px desktop, 20px tablet, 16px mobile
- **Margins:** 60px desktop, 32px tablet, 24px mobile
- **Baseline grid:** 8px base unit for vertical rhythm

Deliberate breaks — allowed and encouraged at these moments only:
1. The landing cover (intentionally feels like an object, not a grid)
2. The one "hero spread" per case study where the concept image breaks the column structure
3. A pull quote from research that spans more columns than text
4. Marginalia (lives outside the column grid by design)

Everything else adheres to columns. This is what keeps it from feeling scrapbook-y.

### Imagery treatment

UI screenshots:
- Rendered in full color — no duotoning. Honesty over cohesion.
- Framed as editorial plates: thin 1px ink rule border, sits on `--paper-soft` if needed for contrast, with a mono caption below (fig. 01 · dashboard after redesign).
- Captions always present. Part of the liner-notes feel.
- Never full-bleed. Always set into the grid with breathing room.

Photography (rare, for team / process / candid shots):
- Muted, warm treatment. Can be slightly desaturated but not duotoned.
- Same editorial frame treatment.

Process artifacts (sketches, whiteboards):
- Photographed or scanned, treated with slight color adjustment to sit well on the paper background.
- Can rotate slightly (±2°) for a "pasted in" feel — but only on zine/notebook spreads, never in Liner Notes.

### Motion

Weighted and paper-like, never snappy.

**Timing:**
- Small reveals: 240ms, ease-out
- Page transitions: 480ms, custom ease-out with slight overshoot
- Signature transitions (desk-to-canvas portal, canvas-to-project zoom): 600–800ms, custom bezier (physical mass feel)
- Hover states: 160ms, ease-out

**Principles:**
- No parallax. No scroll-jacking. No "reveal as you scroll" gymnastics.
- The signature motion moment is the desk-to-canvas portal transition (notebook opens, camera pushes into the spatial canvas). Invest craft here.
- Micro-motion on hover should feel like a pencil underlining, not a button highlighting: 1px rule appears, or a mark is added in the margin.
- Motion respects `prefers-reduced-motion`. All signature gestures have a static equivalent.

**Sound (optional, off by default):**
- A single quiet paper rustle on the portal transition.
- A toggle in the footer. Most will leave it off. The option signals care.

---

## Voice — the writing itself

First person, reflective, literary. Fraunces is doing typographic work; the prose should match the register.

**Do:**
- Write in first person. "I spent three months in Control Hub before proposing anything."
- Lead case studies with a specific moment or observation, not a problem statement. "The first thing I noticed was that admins weren't using search; they were scrolling."
- Credit collaborators by role, not by name. "The PM and I went back and forth on this for a week." Collaborators are never named inline or in credits — this is a site-wide rule.
- Share what didn't work before what did. Shows confidence.
- Keep sentences short when the thought is simple. Let one longer sentence do real work per paragraph.

**Don't:**
- No "My Role · My Team · My Timeline" résumé boxes. Put that information in the track metadata or inline in prose.
- No hero problem statements in size 48px. Let the work tell you what it's about.
- No empty confidence words: "robust," "seamless," "user-centric," "innovative." If you need them, the idea isn't ready.
- No passive voice when describing your decisions. "The redesign increased adoption" → "I cut the welcome modal in half, and adoption doubled."

**Length guidance:**
- Landing tagline: 10–16 words. One thought.
- Track / project summary: 25–40 words. What it was, what it did.
- Case study essay: 400–800 words per project. Long enough to have a thesis, short enough to read in 3 minutes.
- Marginalia: 2–6 words max.

---

## The "How this was made" page

A dedicated page, linked from the colophon. Not hidden, not prominent — present.

**What it contains:**
- The stack: Claude Code, Figma, your chosen static-site framework, hosting
- A short essay on AI-assisted craft: "I didn't use AI to avoid the work. I used it to do more of the work." (Your framing, not mine — this is where your voice matters most.)
- One or two real prompts, unedited, that produced a specific component on the site, shown alongside the component itself. Ideally one that demonstrates judgment (iteration, correction) not just first-shot magic.
- A short section on what you wouldn't let AI do: writing the essays, choosing the projects, the hand-drawn marks.
- A timestamp — when the site was last touched, automatically. Small thing; signals living document.

**What it is not:**
- Not a flex. Not a "look how many prompts I wrote" number. Not a screenshot of Cursor.
- Not a manifesto on AI and design. Everyone has one; it adds noise.

The goal: a reader leaves this page understanding that you treat AI the way a good designer treats any tool — with a point of view about when to reach for it.

---

## The content backbone — v1 scope

For prototyping both spines, commit to:

- Landing (cover / sketchbook cover)
- Full case study: **CHAI / Control Hub AI** (your strongest metrics story)
- Stubbed case studies (title + one paragraph + one image): Smart Search, Write-like-Webex, SAP Fieldglass homepage
- Colophon / how-this-was-made page
- 404 page (easy delight moment — a hand-drawn "lost" mark)

Explicitly out of scope for v1:
- Essays / writing section
- Full B-side of side projects
- Contact form (just an email link and social handles)
- Dark mode (the paper metaphor breaks it; consider later, maybe never)

---

## Accessibility, quietly

Because craft includes this:

- All color contrast passes WCAG AA at minimum. Ink on paper already does.
- All hand-drawn SVGs have descriptive aria-labels or are marked decorative.
- All signature motions respect `prefers-reduced-motion` with a dignified static fallback — not an instant cut.
- Handwriting-font marginalia has real text behind it for screen readers.
- Focus states are a 1.5px ink rule, offset 2px, matching the editorial feel rather than default browser blue.
- Typography sizes scale with rem units. Respect user font-size preferences.

---

## Open questions (decide before build)

1. **Domain.** Keep yankun.info or move? (I'd keep — it's clean and known.)
2. **Album/book title.** "Compositions for Complex Systems" is a working tagline, not a name. Does the portfolio itself have a title? (Liner Notes needs one; Field Notebook can get away without.)
3. **The hero mark on the cover.** Placeholder in the type specimen was a generic curve — we need a real one. Commission yourself, or I can propose 3–5 directions.
4. **Photography of you.** One candid portrait somewhere? (Common on senior portfolios; humanizes. Also easy to skip.)
5. **Writing schedule.** Case study essays take time. 400–800 words × 4 projects = real writing work. Plan for this or plan to stub and ship.

---

*End of v0.1. Next step: resolve the open questions above, then prototype Liner Notes and Field Notebook in parallel using this guideline as the contract.*
