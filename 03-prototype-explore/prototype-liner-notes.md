# Prototype A · Liner Notes

*Yankun · YK-001 · April 2026*

> Portfolio as album sleeve. Gatefold cover unfolds to a track list. Each project is a track. This document is the build spec. Read `vibe-guideline.md` first for the visual and voice system — this doc only covers what's specific to this prototype.

---

## The core metaphor

A portfolio vinyl album. You arrive at the sleeve. You open the gatefold. You read the track list. You play a track. You flip to the B-side for deeper cuts.

The metaphor works because:
- It's a physical object people understand — no explanation needed
- Session credits naturally humanize collaborators (essential for enterprise work)
- Track runtimes and B-sides give me room to include varied work without forcing equal weight
- The gatefold unfold is the signature interaction — satisfying, unusual, memorable

Risk to watch: the metaphor becoming decorative. Rule — every element must earn its music reference or be dropped. A track list that's just a nav menu in disguise is fine. A "volume slider" that does nothing is not.

---

## Album identity (to resolve)

Needs a working title. Options to consider:

- *Compositions for Complex Systems* (current tagline, may be too literal)
- *Five Years on the Enterprise Floor*
- *Liner Notes*, Vol. I (self-referential, clean)
- *Handleable* (single word; matches the positioning thesis)
- *Admin Console Blues* (plays the blues note directly; riskier)

Catalog number: **YK-001**. Side A = main work. Side B = side projects, writing, experiments.

Runtime is the sum of all track runtimes. Runtimes are how long each project actually took, rounded in a way that reads as track times (months → minutes feels right: 3 months = 3:00, 6 weeks = 1:30).

---

## Information architecture

```
/ (Cover — gatefold closed)
  └── unfold → /tracks (Side A track listing, cover stays visible as left panel)
      ├── /track/chai
      ├── /track/smart-search
      ├── /track/write-like-webex
      └── /track/sap-fieldglass
  └── flip → /side-b (B-side — side projects, writing)
/colophon (how-this-was-made)
/404
```

Single-page architecture with URL-backed states. Back button works. Share links work. Each track is a real URL.

---

## Screen-by-screen

### 1. Cover (landing)

The gatefold, closed. Fills the viewport.

**Layout:**
- Album cover at roughly 80vh, centered, aspect ratio 1:1 (square sleeve)
- Cover sits on the warm paper background with a subtle drop shadow — enough to suggest a physical object but not glossy
- Thin ink rule border defines the sleeve edge

**Content on the cover:**
- Top-left: catalog number (`YK · 001`) in mono, small
- Top-right: side indicator (`Side A`) in mono, small
- Center: the hero hand-drawn mark (SVG, single-line ink drawing, ~30% of cover width)
- Lower portion: title block — name in large Fraunces, tagline below in italic, both ink blue
- Bottom-right: a small mono timestamp (`April 2026`)
- Bottom-left: a small "unfold →" affordance in mono with a hand-drawn arrow in marginalia style

**Interaction:**
- Clicking anywhere on the cover, or the "unfold" affordance, or pressing space/enter, triggers the unfold
- Hover: the sleeve lifts ~2px and the shadow deepens subtly (160ms ease-out)
- First visit only: a quiet 2-second delay then the unfold arrow pulses once (breath animation, 1.2s), to hint at the interaction. Never repeats.

**What's not on the cover:**
- No navigation
- No "about me"
- No social icons
- Nothing that isn't album-object-appropriate

---

### 2. The unfold (signature interaction)

This is the defining moment of the prototype. Budget real craft time here.

**The motion:**
- Duration: 700ms
- The cover's right edge hinges open and swings left — as if the right panel of the gatefold is opening toward you
- Slight 3D perspective (CSS `perspective: 2000px` on parent, `rotateY` on the cover)
- During the swing, a subtle shadow falls from the cover onto what's being revealed, suggesting light coming from above-right
- The cover ends at ~170° — not quite flat open, slightly inclined, so it still reads as a physical hinge
- As the cover opens, the interior (right panel) fades up from ~60% opacity to 100% over the last 300ms

**Easing:** custom cubic-bezier — `cubic-bezier(0.34, 1.2, 0.64, 1)` gets close. Slight overshoot at the end that then settles. This is the "paper has mass" feel.

**Sound (optional, off by default):** a single subtle paper-rustle on the unfold. Toggle in colophon.

**After the unfold:**
- Left half of viewport: the cover (now serving as a persistent "home" affordance)
- Right half: the Side A track listing
- A small "refold" control in the top-right corner, marginalia style

**Reduced motion:** static fallback — the cover and track listing appear side by side with a 240ms cross-fade. Dignified, not a cut.

---

### 3. Side A — track listing

The interior right panel after the unfold.

**Header:**
- "Side A" in Fraunces italic, 28px
- A mono sub-label: `Main Work · Four Tracks · Runtime 42:08`
- Thin ink rule below

**Track list:**
Each track is a row:

```
01    Control Hub AI, from 3% to 15%             12:04
      feat. Nirav Shah, Kathryn Lee
02    Smart Search, rewritten                     6:32
      feat. Jasna, Rachael Marr
03    Write-like-Webex                            4:15
      a side project in Cursor
04    SAP Fieldglass, homepage                    9:40
      earlier work, still proud
```

**Row structure:**
- Track number in mono, left-aligned, tracked
- Title in Fraunces, 18px, ink blue
- Collaborators/subtitle in Fraunces italic, 14px, ink-soft
- Runtime in mono, right-aligned, tabular figures

**Interactions:**
- Hover: row gains a 1px underline (animating from left, 240ms), and a tiny hand-drawn arrow appears to the left of the track number (in marginalia style, pre-rendered SVG that fades in)
- Click: transitions to the track page (see next screen)

**Below the track list:**
- Small divider (hand-drawn horizontal mark)
- "Side B →" link in mono small caps — clicking flips to the B-side

**Marginalia opportunities:**
- One handwritten note pointing at the strongest track ("the one to open with" — we used this in the specimen)
- One note in the bottom margin pointing at Side B ("more on the B-side")

---

### 4. Track page (case study)

When you click a track, the gatefold context stays as a thin persistent strip at the top (catalog number, title, a "back to Side A" control) and the liner notes for that track fill the viewport below.

**Header strip (persistent):**
- `YK-001 · Side A · Track 01` in mono
- Right side: `← Back to Side A` with a hand-drawn left-arrow

**Track page structure (for CHAI as the template):**

1. **Hero** — Track title in Fraunces display (56–64px), subtitle/credits, runtime. A single hero illustration or the "cover art" of this track (one of the 3-5 hero ink drawings).

2. **Opening paragraph** — 2-3 sentences, first person, specific moment. Serves as the lead of the essay.

3. **The essay** (400-800 words) — set in two columns on desktop, single column below 900px. Body in Fraunces 18px/1.55. Pull quotes (if any) break the grid, set in Fraunces italic at 32px.

4. **Figures** — UI screenshots as editorial plates. Each figure is:
   - 1px ink rule border
   - Caption below in mono, 11px: `fig. 01 · brief description`
   - Sits within the grid, never full-bleed

5. **Marginalia** — 3-5 hand-drawn annotations across the page. Arrows pointing at specific figures. A circled phrase in the body. A margin note reflecting on a decision.

6. **Credits section** — at the bottom, like a proper liner note credits block:
   ```
   Produced by        Yankun, 2024-2025
   Product            Nirav Shah
   Research           Kathryn Lee
   Engineering        [names]
   Design partners    Jasna, Rachael Marr, Kirstin, Yvonne
   Outcome            Adoption 3% → 15%
   ```

7. **Next track** — mono footer: `Next track: Smart Search →`

**Interactions:**
- Scroll is natural (no scroll-jacking)
- Back to Side A is a real transition, not just a page nav — the gatefold visually re-enters from wherever the track "lived"
- Figures expand to ~1.5× on click, overlay style, dismissable

---

### 5. Side B (flip)

Clicking "Side B →" triggers a flip. The interior content rotates 180° (the album has physically flipped over), revealing the B-side.

**Motion:**
- Duration: 500ms
- The entire interior panel rotates on Y-axis, 180°
- Cover stays in place (it's the same album, just flipped)
- Subtle audio: a vinyl flip, if sound is on

**Side B content:**
- Header: "Side B" · `Side Projects · Writing · Experiments`
- Same track-list structure as Side A, but treated as B-sides/deep cuts
- Fewer tracks, shorter runtimes
- Can include non-portfolio items: Overwatch musings, the screen recorder project, essays

Content for v1: **stubbed only** (see scope below).

---

### 6. Colophon (`/colophon`)

Not a track. Accessed from a small link at the bottom of Side A, or from the cover's fine print.

**Structure:**
- Header: "How this was made" in Fraunces display
- Short essay (300-500 words) on AI-assisted craft — first person, my point of view
- A section: "What I used" — the stack, with links
- A section: "One example" — a real Claude Code prompt alongside the component it produced
- A section: "What I wouldn't let AI do" — short list, specific
- Footer: timestamp of last update, the "sound: off/on" toggle, a link back to the cover

Treat this page as a liner notes page itself — same grid, same type, same treatment as a track. It is in the album, not outside it.

---

### 7. 404

A track that doesn't exist.

- Header in Fraunces: "Track not found"
- Subtitle in italic: "This one didn't make it onto the album."
- A hand-drawn ink mark: an empty record sleeve, maybe a scratched vinyl
- A single link: `← Back to Side A`

---

## Content inventory (v1)

Fully written:
- CHAI case study (600 words)
- Colophon essay (300-500 words)
- All cover copy, Side A header, B-side header, 404 copy

Stubbed (title + one paragraph + one screenshot):
- Smart Search
- Write-like-Webex
- SAP Fieldglass

Not yet:
- All Side B content (can be empty beyond the flip affordance for v1)
- Writing/essays (out of scope for v1)

---

## Technical notes

- Static site. No SSR needed. Astro or plain Vite + TypeScript both fine.
- No CSS framework. Plain CSS with design tokens from the vibe guideline.
- Routing: use file-based routing or a minimal router. Each track is a real URL.
- The unfold and flip are CSS 3D transforms, JS orchestrates state
- Font loading: self-host Fraunces and JetBrains Mono (both free). Use `font-display: swap` with a system fallback tuned via `size-adjust` to minimize layout shift.
- Images: screenshots as WebP with PNG fallback. Lazy-load below the fold.
- Paper grain: SVG noise, inlined in CSS, not a separate asset request.
- Target: 100/100/100/100 Lighthouse on the cover. Realistic: ~95 across the board.
- Deploy: Vercel or Cloudflare Pages. Domain yankun.info.

---

## The one thing a visitor will remember

The gatefold unfold. It's the 1-second moment that justifies the rest of the metaphor. If the unfold is flat, delayed, or snappy, the whole prototype fails regardless of how good the track pages are. Budget time accordingly.

Second-order thing they'll remember: the collaborator credits. Naming Nirav and Kathryn as session musicians is the kind of detail a hiring manager will note and a design leader will respect.

---

## Success criteria for the prototype

Not production — just enough to compare against Field Notebook.

Done when:
1. Cover renders cleanly with real typography and the hero mark (placeholder mark OK for prototype)
2. The gatefold unfold works and feels right on desktop
3. Side A track listing is real, with all four tracks
4. CHAI track page is fully built with real content and 3-4 figures
5. Other tracks are stubbed pages with real headers
6. Side B flip works (can have placeholder content)
7. Colophon has at least scaffolding
8. Works on a 1440×900 laptop at minimum; mobile is nice-to-have for prototype, required for final
9. Keyboard-navigable, `prefers-reduced-motion` respected

Explicitly not required for prototype:
- Final hand-drawn marginalia (Caveat font is fine)
- Final hero ink drawings (placeholder SVG fine)
- Side B content beyond the flip
- Contact/socials
- Analytics

---

*End of Prototype A spec.*
