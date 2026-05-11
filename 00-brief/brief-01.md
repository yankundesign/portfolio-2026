# Brief-01 · Portfolio Kickoff

*Yankun · YK-001 · April 2026*

> Handoff document. Captures everything decided so far, so the next working session (in Cowork or elsewhere) starts with full context. Pair this with `vibe-guideline.md` — the guideline is the detailed rulebook; this brief is the story of how we got there.

---

## What this project is

Rebuild of my portfolio. Goal is a site that functions as a statement of who I am as a designer *and* a demonstration of how I design and code with AI. Not a standard hero-plus-grid portfolio. The portfolio itself should be a product.

Current site: yankun.info (to be replaced).

Build tools: Claude Code, Claude Design.

## Who it's for

**Primary audience: hiring managers and design leaders.** They scan fast. The site needs to read "senior" in ten seconds and "worth an interview" in two minutes. Every decision below serves that.

## Positioning

Through-line across my work: **I make complex, invisible systems handleable.**

- CHAI gave IT admins a conversational handle on a labyrinthine admin console (3% → 18% adoption)
- Smart Search took a 0-result wasteland and made it navigable (86% reduction in no-result rates)
- Write-like-Webex turned a content guideline PDF into something that lives where writing happens
- SAP Fieldglass homepage — same move, earlier work

This is the thesis. It's more specific and more interesting than "I design enterprise AI tools."

---

## Decisions made

### Spine (the organizing metaphor)

Two candidates moving forward in parallel prototypes:

- **Liner Notes** — portfolio as album sleeve. Gatefold cover unfolds to a track list. Each project is a track with runtime and session credits (collaborators named like session musicians). Side projects live as B-sides.
- **Field Notebook** — portfolio as zine/sketchbook. Each project is a spread: process on the left, polish on the right. Chronological, with journal pages between projects.

Both prototypes will be built before picking. Shared visual system across both — only the spine differs.

*Rejected:* Broadside (strong but less warm), Score (too much decoding for scanning audience).

### Visual reference anchor

Mary Kim's *Me, Mushroom and the World* zine — two-color deep blue on off-white, bold editorial typography mixed with loose hand-drawn marks, spreads that breathe, confident scale shifts.

### Color

Ink blue on warm off-white. Two colors, nothing else.

- `--ink` `#16265e`
- `--ink-soft` `#2a3a7a`
- `--paper` `#f4f1ea`
- `--paper-soft` `#ebe6d9`

Subtle paper grain (SVG noise, ~6% opacity, multiply blend) — only noticeable on close inspection.

### Typography

**Direction A — "The Literary"** — chosen after side-by-side comparison with grotesque and display-serif alternatives.

- Display + body: **Fraunces** (variable, with `opsz` axis)
- Metadata: **JetBrains Mono**
- Marginalia v1: **Caveat** (placeholder for real handwriting later)

Warmest and most distinctive of the three tested. Signals senior and literary. Rewards close reading.

### Hand-drawn

Two tiers:
- **Marginalia** throughout — small arrows, underlines, circled words, 2–6 word notes in handwriting font
- **Hero ink drawings** — 3–5 total across the whole site, SVG, single-line, confident

Handwriting approach: font as v1, swap for my real handwriting before ship.

### Grid

Strict 12-column grid (1280px max, 24px gutter, 60px desktop margin), with deliberate breaks allowed only at:
1. The landing cover
2. One hero spread per case study
3. Pull quotes spanning extra columns
4. Marginalia (lives outside the grid by design)

### Imagery

UI screenshots in **full color**, framed as **editorial plates** — thin 1px ink rule border, mono caption below (fig. 01 · ...). Never duotoned, never full-bleed.

### Motion

Weighted, paper-like, never snappy. One signature gesture per spine:
- Liner Notes: gatefold unfold (600–800ms, custom bezier)
- Field Notebook: page turn (similar)

No parallax, no scroll-jacking. Respects `prefers-reduced-motion`.

### Voice (in the writing)

**First person, reflective, literary.** Fraunces is doing typographic work; prose should match the register.

- Lead case studies with a specific observation or moment, not a problem statement
- Name collaborators
- Share what didn't work before what did
- No empty confidence words ("robust," "seamless," "user-centric")
- No passive voice about my own decisions

Lengths: landing tagline 10–16 words, project summary 25–40, case study 400–800, marginalia 2–6.

### The "How this was made" page

**Dedicated page**, linked from the colophon. Short essay on AI-assisted craft, one or two real prompts shown alongside the components they produced, a short section on what I wouldn't let AI do (essay writing, project selection, hand-drawn marks). Not a flex, not a manifesto — a working designer's point of view.

---

## v1 scope

In:
- Landing (cover for Liner Notes, sketchbook cover for Field Notebook)
- Full case study: **CHAI / Control Hub AI** (strongest metrics story)
- Stubbed case studies: Smart Search, Write-like-Webex, SAP Fieldglass (title + paragraph + one image each)
- Colophon / how-this-was-made page
- 404 page

Out:
- Essays / writing section
- Full B-side of side projects
- Contact form (email link + socials only)
- Dark mode

---

## Open questions (still to resolve)

1. **Domain.** Keep yankun.info or move? *Lean: keep.*
2. **Album/book title.** Liner Notes needs an actual album name. "Compositions for Complex Systems" is a tagline, not a title. Field Notebook can go without.
3. **Cover hero mark.** The landing cover needs a real hand-drawn mark. Commission myself, or have Claude propose 3–5 directions first.
4. **Photo of me.** One candid portrait somewhere? Common on senior portfolios; easy to skip.
5. **Writing schedule.** 400–800 words × 4 projects = real writing work. Plan for it or stub and ship.

---

## What's next

Immediate next moves, in priority order:

1. Set up the Cowork project with the recommended folder structure (see Cowork handoff notes)
2. Resolve the five open questions above
3. Decide: sketch hero mark directions, write CHAI essay, or prep a Claude Code build brief for both prototypes first?
4. Begin parallel prototyping of Liner Notes and Field Notebook

---

## Files produced so far

- `vibe-guideline.md` — the detailed visual and voice system (source of truth for all design and build decisions)
- `type-specimen.html` — the three-direction typography comparison that led to choosing Fraunces + JetBrains Mono
- `brief-01.md` — this document

---

## Working principles (for future sessions)

Things I've reinforced throughout this chat that should carry forward:

- **Precision matters.** When describing past work — especially the CHAI work — I was building an AI assistant to help users interpret existing dashboards, not building the dashboards themselves. Don't let summaries drift.
- **Restraint over flash.** This is a senior portfolio. Every decision so far has been toward quieter and more crafted, not louder.
- **The portfolio itself is the demonstration.** "Designed and built with AI" isn't a claim to make in text; it's demonstrated by the site being good. The "how this was made" page exists to show the craft, not to perform the tooling.
- **Two prototypes, shared system.** Don't let the prototypes converge. Let each find its voice within the same rules. The winner gets cleaned up later; the loser doesn't need clean architecture.

---

*End brief-01. Continuity document — update as decisions are made or revised.*
