# Decisions Log

Track design and build decisions as they're made.

---

## 2026-05-10 · Hosting — Cloudflare Pages, Wrangler CLI deploy, yankun.design DNS at Cloudflare

Picked a host and got the site live. Three sub-decisions worth pinning down before they fade.

**Cloudflare Pages over Vercel.** Both can serve a static Vite SPA at Lighthouse 95. The deciding factors: unmetered free-tier bandwidth (Vercel caps at 100 GB/mo, and the Hobby plan technically forbids monetized projects — a portfolio is fine today, but the asymmetry favors Cloudflare long-term); free Web Analytics built into the same dashboard (Vercel's analytics is paywalled past 2.5k events/mo); and consolidating DNS + Pages + Analytics into one vendor once the domain moves over. Vercel's preview-comment workflow and zero-config Vite detection are nicer, but for a static site that's a marginal edge. Migration cost between either is ~10 minutes — no real lock-in either way.

**Wrangler CLI for deploys, not the dashboard's git connect.** The dashboard "Connect GitHub" flow is broken on this Cloudflare account — the GitHub App installs successfully (verified on the GitHub side), but Cloudflare's OAuth callback fails to pair the installation back to the in-progress project-creation session. Tried three times, including a full uninstall + reinstall per Cloudflare's own error message ("attempt to fully uninstall and reinstall"). Same result each time. This is a known intermittent bug — not a configuration issue on our end. Pivoted to `npx wrangler pages deploy site/dist --project-name=yankun-portfolio --branch=main`, which uses a separate OAuth flow that works. The project was created via CLI on the first run; future deploys are the same one-liner. Trade-off: no auto-deploy on `git push` to main. Acceptable — the deploy command is reproducible, and we can re-attempt the dashboard git connect after the OAuth bug is reported to have cleared (likely days, not weeks).

**Domain is yankun.design, DNS moving to Cloudflare.** Old scope doc said yankun.info; that's stale. Yankun bought yankun.design at Spaceship registrar with no email or other records on it — fresh registration, zero migration risk. Moving DNS to Cloudflare rather than keeping it at Spaceship: Pages works smoothest when the domain sits in a Cloudflare zone (apex CNAME flattening, auto SSL, integrated Web Analytics view), and Spaceship's CNAME-at-apex support is awkward. Trade-off: one-time nameserver swap at Spaceship (5 minutes), wait for propagation (typically <1 hour). Worth it.

**Site-level config added to the build:**

- `site/public/_redirects` — `/*  /index.html  200`. SPA fallback for React Router — any path that doesn't match a static asset gets the app shell. Verified: direct hit on `/works/chai` loads the case study, not a Cloudflare 404.
- `site/public/_headers` — `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` and `/fonts/*`; `max-age=0, must-revalidate` for `*.html`. Standard hashed-asset caching with no-cache HTML so deploys are visible immediately.
- `site/.nvmrc` — `20`. Pins Cloudflare's build container to Node 20; the React 19 / Vite 8 / TypeScript 6 stack needs ≥20.

**Live URLs:**

- `https://yankun-portfolio.pages.dev` — Cloudflare-hosted production
- `https://bf445755.yankun-portfolio.pages.dev` — first deploy's immutable hash URL (kept by Cloudflare for rollback)

**Verified post-deploy:**

- Homepage renders the full desk scene (Field Notebook, yogurt roulette, CV card, About polaroid, pen, plate metadata, register marks)
- Fraunces / JetBrains Mono / Caveat all load
- Direct deep route `/works/chai` loads → `_redirects` shipping correctly
- Bad route `/this-page-does-not-exist` shows the custom 404 ("This page is blank. Not every idea makes it in.")
- Lighthouse not yet run — to be checked once custom domain attaches

**Analytics plan (deferred until token issued).** Cloudflare Web Analytics over Google Analytics or Plausible. Reasoning: free, no cookie banner required (privacy-first design — no cross-site tracking), lightweight script tag (~3 KB), lives in the same Cloudflare dashboard, and matches the site's anti-bloat sensibility. To wire up after the custom domain is live: Cloudflare → Analytics & Logs → Web Analytics → Add site → enter `yankun.design`. Cloudflare issues a single-line `<script>` tag with a site token. Add the tag at the bottom of `site/index.html` body, gated behind `import.meta.env.PROD` so it doesn't fire in dev. No analytics library, no React wrapper — one inline tag.

**Open items:**

- Move DNS at Spaceship → Cloudflare (in progress; Yankun is updating nameservers)
- Attach `yankun.design` and `www.yankun.design` to the Pages project once the zone activates
- Run Lighthouse on the custom domain (target 95+ across categories per scope doc)
- Enable Web Analytics; add the script tag to `index.html`
- Reattempt the dashboard git-connect flow next week; if it works, switch from manual `wrangler` to auto-deploy on push. If not, document the wrangler workflow in a `DEPLOY.md` for future runs.

**Files touched:**

- `site/public/_redirects` (new)
- `site/public/_headers` (new)
- `site/.nvmrc` (new)
- `00-brief/decisions-log.md` (this entry)

**Verification:**

- Local `npm run build` succeeds; `_redirects` and `_headers` copy into `dist/` root correctly
- Live URL passes the three checks above (homepage, deep route, 404)

**Source:** Conversation 2026-05-10. Hosting comparison considered Cloudflare Pages, Vercel, Netlify, GitHub Pages. Vercel was the runner-up.

---

## 2026-05-04 · Canvas — Lift-and-Loft hover (image bloom + dim-others, layered on existing hover)

The mockups on the canvas read as blue rectangles at column-width — readability problem flagged in the user's hover sketch. Considered five options (Lift-and-Loft, Specimen Drawer, Lift-Off Page, Loupe, Trace Overlay), prototyped 1/2/4 in `03-prototype-explore/prototype-card-hover.html`, and shipped a refined version of #1.

**The behavior:** on row hover (or `focus-within`), the mockup image inside the plate scales 2×, anchored at bottom-right, blooming up-and-left out of its frame. The other three rows in the spread dim to 0.4 opacity. The existing card lift+tilt (`translateY(-6px) rotate(-1deg)`) and back-label drawer slide both keep firing — the bloom is layered on top, not a replacement.

**The calls:**

1. **Bloom only the image, not the card.** The 1px ink-muted plate frame stays put on the grid; only `.mockupImage` / `.mockupPlaceholder` scale. The chrome stays calm; only the visual content gets the loft.
2. **Anchor at bottom-right (transform-origin: 100% 100%).** The image grows up-and-left rather than outward in all directions, which feels like paper being lifted rather than a flat zoom. Up-and-left also moves the bloom AWAY from the text column to its right (no collision with the title/role text) and AWAY from the drawer sliding down (no collision with the back-label).
3. **No direction-aware tilt.** All four cards bloom in the same direction (up-and-left). The user explicitly preferred this — adds calm, removes per-card config.
4. **Dim siblings via `:has()`, not JS.** `.spread:has([data-row]:hover) [data-row]:not(:hover) { filter: opacity(0.4) }`. Works across the two NotebookPage components (which split the four rows). Crosses CSS Module boundaries via a `data-row` attribute on the rowWrapper. **Uses `filter: opacity()` not plain `opacity:`** — the rowWrapper's entrance animation (`rowPlace`) has `animation-fill-mode: both` whose final keyframe holds `opacity: 1` with animation priority, which silently swallows any regular `opacity` declaration. `filter: opacity()` is a separate property the keyframe doesn't touch, so it overrides cleanly without needing `!important`. Caught during QA: dim wasn't firing because of this exact conflict.
5. **Same easing as the existing card lift.** `cubic-bezier(0.25, 1, 0.5, 1)` over 380ms. The bloom rides on top of the lift as one continuous gesture, not a second beat.
6. **Reduced motion: bloom off, dim on.** Image scaling is the showy part; we surrender it for users who asked us to. The dim is opacity-only (no movement) so it's safe to keep — it does most of the readability work anyway.
7. **Removed `overflow: hidden` from `.mockup`.** At rest the image fits the frame exactly (`object-fit: cover`); on hover it needs to escape. Containers don't need clipping for their resting state, so removing it is safe.

**What's NOT touched:**

- The existing `.row` lift+tilt on hover — fires as before
- The `.backLabel` drawer slide-down on hover — fires as before
- The v1.6 entrance choreography — unchanged
- `data/projects.ts` grid positions — unchanged
- ProjectCard component (which is unused on the canvas; it's still around but not in the render tree)

**Files touched:**

- `site/src/components/canvas/ProjectRow.tsx` — added `data-row` attribute to the rowWrapper div (one line)
- `site/src/components/canvas/ProjectRow.module.css` — `.mockup` overflow removed; `.mockupImage` / `.mockupPlaceholder` got transform-origin + scale + transition; new `.rowWrapper:hover` rule for the bloom; reduced-motion block extended to disable the bloom
- `site/src/components/canvas/NotebookSpread.module.css` — added the `[data-row]` opacity transition + `:has()` dim rule; reduced-motion override

**Edge cases noted (not blockers):**

- **Top-row clipping.** Top cards (CHAI + Agentic) bloom upward into the page header area. Acceptable; the dimmed siblings clear the eye and the bloom owns the moment. Revisit if it reads bad in QA.
- **Image quality at 2×.** Placeholder fills handle scaling. Real screenshots, when they land, need to be exported at minimum 2× their displayed size or they'll soften when bloomed. Flag for the asset pipeline; not a blocker for shipping the interaction.
- **Drawer collision.** Drawer goes DOWN, bloom goes UP — opposite directions. No collision.

**Verification:**

- `npx tsc --noEmit` passes (exit 0).
- Visual QA needed locally: hover each of four rows, confirm bloom + dim + existing lift + drawer all fire together. Tab through to confirm focus-within paths fire identically. Toggle prefers-reduced-motion in DevTools to confirm fallback.

**Source:** Conversation 2026-05-04. Predecessor decision: same-day "rotation rule lifted" entry below.

---

## 2026-05-04 · Canvas — rotation rule lifted (reversal of v0.7's "no rotation. anywhere.")

The v0.7 canvas pivot retired rotation as a static layout move and locked it down absolutely ("No rotation. Anywhere.") for the canvas surface. That call was right for static composition — axis-aligned plates with column-span and aspect-ratio variation are the editorial move, not tilted cards.

But the absolute version of the rule blocked legitimate interaction states. The mockups on the canvas read as blue rectangles at column-width; the proposed fix is a hover-enlarge with a slight tilt — a plate lifting off the page rather than scaling in place. That's a purposeful, physical-paper gesture, not a return to the pinboard.

**The new posture:** Cards are axis-aligned **at rest**. Rotation is **available** as an interaction and compositional tool when it earns its place — hover enlarge, peeking artifacts, transition states. It is never the default static layout move. Scattered placement, freeform percent positioning, and the graph-paper background remain retired.

**Why this isn't a rollback to v0.6:** v0.6's rotation was structural — every card sat at a static angle, the page itself was a pinboard. The new permission is interactional and transient — rotation appears in response to the user, then resolves. The static spread still reads as an editorial plate.

**Files touched:**
- `CLAUDE.md` — canvas description (line 10) and hard rules (lines 89–90) rewritten to permit rotation as an interaction tool while keeping axis-aligned default
- `00-brief/prd-notebook-canvas.md` — "No rotation" lines on cards and composition softened to "axis-aligned at rest"
- `site/src/data/projects.ts` — header comment updated
- `site/src/components/canvas/Canvas.tsx` — header comment updated
- `site/src/components/canvas/ProjectCard.module.css` — header comment updated

**Not touched:**
- `NotebookTransition.module.css` "No rotation" comments — those describe a specific transform constraint on the lift transition, not the canvas rule
- `code-style.md` — already permits `transform: rotate(±2deg)` for process artifacts; no change needed
- Historical decisions-log entries — they're the record of what was decided when, not active rules

**What this enables:** the hover-enlarge interaction on canvas plates (sketched 2026-05-04) becomes a legal move. Implementation deferred to a separate decision/build pass.

---

## 2026-05-03 · Project cards v1.6 — visibility fix (the reveal arc was hiding behind the overlay)

The user reported "I still don't see the reveal arc — is it overlapping with the notebook opening?" Yes. v1.5's `CONTENT_ENTER_DELAY_AFTER_TRANSITION` was 720ms, but the open transition's overlay doesn't fully clear until 820ms after canvas mount. So the first row started 100ms BEFORE the overlay was gone — and with `ease-out-expo` (front-loaded), Row 0 was already ~50% visually settled by the time the overlay cleared. The user only saw the tail end of Rows 1-3 entering, never the start of Row 0.

Three coordinated fixes:

### 1. Push everything past overlay-clear

`CONTENT_ENTER_DELAY_AFTER_TRANSITION`: **720ms → 920ms** (820ms = overlay-clear + 100ms breathing room). Now nothing starts animating until the overlay is fully gone and the user has had a brief "blank notebook" moment to register that the reveal is about to begin.

### 2. Reorder the choreography so header lands first

v1.5 had `header label: +80, row 0: +0` — Row 0 actually started BEFORE the header label. Fixed:

```
header label        +0
header description  +180
row 0 lead-in       +320     (after header is fully settled — 480ms duration)
row 0               +320
row 1               +560     (240ms stagger from row 0)
row 2               +800
row 3               +1040
row 3 ends          +1740    (1040 + 700 duration)
close button        +1820    (80ms after last row)
margin note         +2060    (240ms after close button)
```

Header writes first → cards land in sequence → chrome arrives last. Reading order now matches the choreography order.

### 3. Pronounce the per-card variation

v1.5's variation was too subtle to register against the textured paper background. v1.6 pumps it up:

| Card | v1.5 rotation | v1.6 rotation | v1.5 offset | v1.6 offset |
|---|---|---|---|---|
| 0 (CHAI) | -1.4° | **-2.4°** | -14px | **-26px** |
| 1 (Agentic) | +1° | **+2°** | -10px | **-22px** |
| 2 (Write-like) | -1° | **-1.8°** | -16px | **-28px** |
| 3 (SAP) | +1.6° | **+2.6°** | -12px | **-24px** |

Plus: scale start **0.94 → 0.9** (more visible "still in the air, closer to the viewer" effect), duration **620ms → 700ms** (more time to perceive the motion), stagger **200ms → 240ms** (each placement is a clear standalone beat).

**Tunables centralized** in `ProjectRow.tsx`:
- `STAGGER_MS` (240) — bump for slower cascade
- `FIRST_CARD_LEAD_IN_MS` (320) — adjust how long the header gets alone before the first card lands
- `ENTRANCE_VARIATION` array — tweak per-card character

The full reveal arc is now ~2.5s after the overlay clears (vs. v1.5 partial-overlap that the user couldn't see). Total click-to-fully-revealed: ~4s, but the user perceives this as a deliberate scrapbook-craft sequence rather than a delay.

**Files changed:**
- `site/src/routes/CanvasRoute.tsx` — `CONTENT_ENTER_DELAY_AFTER_TRANSITION` 720 → 920 with timing math in the comment
- `site/src/components/canvas/ProjectRow.tsx` — pumped variation, added `STAGGER_MS` + `FIRST_CARD_LEAD_IN_MS` constants
- `site/src/components/canvas/ProjectRow.module.css` — duration 620 → 700, scale 0.94 → 0.9, default offset -24px (was -14px)
- `site/src/components/canvas/NotebookPage.module.css` — header label offset 80 → 0; description 240 → 180
- `site/src/components/canvas/CanvasCloseButton.module.css` — offset 1300 → 1820 (recomputed for new row sequence)
- `site/src/components/canvas/CanvasMarginNote.module.css` — offset 1480 → 2060

---

## 2026-05-03 · Project cards v1.5 — "stick onto page" placement choreography

After v1.4's basic staggered fade-in, the project cards still felt like they were just appearing — not like they were being PLACED onto the page. v1.5 redesigns the card entrance to read as four deliberate, hand-placed moments matching the field-notebook / specimen-mount theme.

**What changed:**

1. **Per-card "hand-placed" variation.** Each of the four cards starts at a slightly different rotation, Y offset, and scale. The variation is small (±1°-1.6° rotation, -10 to -16px Y, 0.94 scale) — small enough that the cards align cleanly at rest, but large enough that the entrance arc reads as four distinct placements. Variation is keyed by the project's index (Z-pattern reading order: top-left, top-right, bottom-left, bottom-right). Defined in `ENTRANCE_VARIATION` array in `ProjectRow.tsx`; the keyframe consumes them via CSS custom properties (`--row-rotation`, `--row-offset-y`).

2. **Alternating CCW/CW rotation pattern.** Cards 0+2 (left page) get slight counter-clockwise tilts; cards 1+3 (right page) get slight clockwise tilts. Mimics natural hand-placement — a right-handed person placing cards in sequence alternates the angle as they reach across.

3. **Top-anchored rotation pivot.** `transform-origin: 50% 25%` on the wrapper means the rotation pivots from the upper region of the card — like the card hinges into position around its top edge, not its center. Reads as "placed from above" rather than "spun around its middle."

4. **Slower, more deliberate timing.**
   - Stagger: 160ms → **200ms** (each placement registers as its own beat)
   - Duration: 540ms → **620ms** (more time for the settle)
   - Easing: stayed `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) — matches the cover rotation in the open transition for choreographic continuity

5. **Multi-axis settle.** Each card animates **all four** of opacity, translateY, scale, and rotate simultaneously, all with the same easing so they land as one cohesive gesture. Previously only opacity + 2-axis translate.

**Visible effect:** the cover opens, the spread reveals, then four cards are placed onto the page one after another — each landing slightly differently, like a hand placing them with imperfect-but-deliberate alignment. After the cards settle, the close affordance and THOUGHTS sticky arrive last.

**Recomputed late-element delays** (rows now finish 1220ms after canvas-enter base instead of 1020ms):
- Close button: 1080ms → **1300ms** (after last row finishes + 80ms breathing room)
- THOUGHTS sticky: 1240ms → **1480ms** (180ms after close button)

**Files changed:**
- `site/src/components/canvas/ProjectRow.tsx` — added `ENTRANCE_VARIATION` table, sets `--row-rotation` and `--row-offset-y` per index
- `site/src/components/canvas/ProjectRow.module.css` — `@keyframes rowPlace` (renamed from `rowSettle`), uses CSS variables for per-card variation, top-anchored transform-origin, slower duration
- `site/src/components/canvas/CanvasCloseButton.module.css` — bumped delay to 1300ms
- `site/src/components/canvas/CanvasMarginNote.module.css` — bumped delay to 1480ms

**Tunables** (all in `ProjectRow.tsx` / `ProjectRow.module.css`):
- `ENTRANCE_VARIATION` array — adjust per-card rotation/offset for different placement characters
- Stagger interval (200ms × index) — bump to 240ms for a slower, more ceremonial cascade
- Duration (620ms) — adjust the settle pace
- `transform-origin` (50% 25%) — change to influence the rotation pivot character (try 50% 0% for "hinged from top edge")

---

## 2026-05-03 · Desk → Canvas transition v1.4 — landing-size fix + canvas reveal sequence

Two issues addressed in v1.4:

### 1. Close-landing notebook too small

**Why it broke**: When the close transition fires, the user is on `/works`. The desk's notebook isn't in the DOM, so `readSourceRect('notebook')` returns null and falls back to `fallbackDeskRect()` — which was hardcoded to 340px wide. But the desk's notebook is responsive (200/240/300/340/400/480px depending on viewport), so on a 2560px monitor the cover landed at 340px while the actual desk notebook was 480px. The reveal exposed a 30%-too-small notebook → visible jump → the user's "too small" complaint.

**Fix (two-layer)**:

- **Cache the desk rect on open.** The open transition CAN measure the desk notebook accurately (it's in the DOM at click time). `cacheDeskRect()` stores the measured value in module-level state in `useTransitionState.ts`. The close transition's resolution priority is now: live measurement → cached value → fallback. The cache is the common path; the fallback only matters for cold-deep-link to `/works` followed by a back-button.
- **Make the fallback responsive.** Even if the cache is missing, the fallback now mirrors the responsive width breakpoints from `NotebookCover.module.css` (200/240/300/340/400/480px) so the cover lands at the right size for the current viewport even with no measurement data.

### 2. Project rows had no entrance animation

The canvas content (header, four project rows, close button, THOUGHTS sticky) appeared instantly when the route mounted. After the open transition's craft, the static appearance felt undercrafted — like a cut between two designed states with nothing in between.

**Fix: choreographed entrance sequence.**

Each canvas element animates in via CSS keyframes with a composed delay: `--canvas-enter-delay` (set on `.canvas` based on whether we arrived via transition or deep-link) plus per-element offset.

| Element | Offset (ms) | Duration (ms) | Motion |
|---|---|---|---|
| Page header label | +80 | 480 | opacity + 4px slide-down |
| Page description | +240 | 600 | opacity + 2px slide-down (after label) |
| Project row 0 | +0 | 540 | opacity + 8px slide-up + 3px lateral drift |
| Project row 1 | +160 | 540 | same |
| Project row 2 | +320 | 540 | same |
| Project row 3 | +480 | 540 | same |
| Close button | +1080 | 360 | opacity-only (preserves spread-anchor transform) |
| THOUGHTS sticky | +1240 | 480 | opacity-only (preserves rotate(-1.5deg) tilt) |

`--canvas-enter-delay` is set by `CanvasRoute` based on the transition state at mount:

- `state === 'opening'`: 720ms (waits for the overlay to clear before the first row begins)
- otherwise: 0ms (deep-link / browser back/forward — no overlay to wait for, animations begin immediately)

Total visible reveal sequence after the overlay clears: ~1.7s. Reads as paper specimens being placed onto the page one at a time, then the marginalia being added last.

All animations respect `prefers-reduced-motion: reduce` (set to `animation: none; opacity: 1`).

**Files changed:**
- `site/src/interactions/useTransitionState.ts` — `cacheDeskRect()` + `getCachedDeskRect()` + module-level `cachedDeskRect`
- `site/src/components/transition/NotebookTransition.tsx` — open caches, close consumes; responsive fallbackDeskRect
- `site/src/routes/CanvasRoute.tsx` — sets `--canvas-enter-delay` on `.canvas` based on captured-on-mount transition state
- `site/src/components/canvas/ProjectRow.tsx` — sets `--row-delay` per index
- `site/src/components/canvas/ProjectRow.module.css` — `@keyframes rowSettle` + composed `animation-delay`
- `site/src/components/canvas/NotebookPage.module.css` — header + description settle keyframes
- `site/src/components/canvas/CanvasCloseButton.module.css` — opacity fade-in
- `site/src/components/canvas/CanvasMarginNote.module.css` — opacity fade-in

**Tunables**:
- `CONTENT_ENTER_DELAY_AFTER_TRANSITION` (720ms) in `CanvasRoute.tsx` — adjust if the open transition timing changes; should equal the time from canvas-mount (navigate at ~520ms) to overlay-cleared (~1240ms).
- Per-row stagger (160ms × index) in `ProjectRow.tsx` — bump to 200ms for slower cascade, drop to 120ms for tighter rhythm.
- Late-element offsets (1080ms close, 1240ms note) in their respective CSS — adjust if you change the row stagger/duration so they still arrive AFTER the rows finish.

---

## 2026-05-03 · Desk → Canvas transition v1.3 — symmetric close

After v1.2 fixed the open ("the opening is good"), the close still felt rougher. v1.3 applies the same treatment to make the close feel like the open in reverse.

**What was off in v1.2's close:**

1. **Rotation too fast** — 580ms duration meant the visible back-half (-90°→0°) only got ~290ms. The eye barely registered the closing motion before the cover landed.
2. **No settle beat** — soft landing immediately fell into the fade-out. The cover never had a moment of rest on the desk.
3. **Top-based landing** — the soft landing animated the `top` style from `deskRect.top - 16` to `deskRect.top`. Asymmetric with open's translateY-based lift, and a layout property to boot.
4. **Final fade too quick** — 180ms. Open's reveal is 240ms; the close's reveal felt thinner.

**Fixes:**

1. **Slower rotation** — 580ms → 720ms. Visible back-half now ~360ms (matches open's visible front-half within ~50ms). The closing motion is clearly readable.
2. **Slower position morph** — 520ms → 620ms. Keeps the rotation and morph proportional to each other.
3. **Slower spread fade-out** — 280ms → 340ms. The spread dissolves gracefully instead of snapping out.
4. **TranslateY landing** — cover arrives at the lifted desk position via `translateY: -16`, then animates to `translateY: 0` over 200ms (was 140ms via top). Symmetric with open's lift, transform-only animation, no layout thrash.
5. **Settle pause beat (NEW)** — 80ms hold after landing where the cover sits on the desk before the overlay fades. Mirrors open's 60ms apex-pause. Gives the user a moment to register "the notebook is back."
6. **Slower final fade** — 180ms → 240ms. Matches open's reveal duration so both ends of the trip have the same texture.

**Mirror structure:**

```
Open  : LIFT (220) → pause (60) → MORPH+ROTATE+SPREAD-IN (720+820+460)  → reveal (240)
Close :                           MORPH+ROTATE+SPREAD-OUT (620+720+340) → LAND (200) → settle (80) → reveal (240)
```

The close has no opening lift (because closing is reactive — you push it shut). But it has the LAND and SETTLE beats that mirror the open's lift+pause. Both ends of the trip end with the same 240ms reveal.

**Total durations:**
- Open: ~1240ms (unchanged from v1.2)
- Close: ~1140ms (was ~840ms in v1.2 — 36% slower)

Asymmetric — closing is dismissal — but proportionally similar so they feel like the same gesture in two directions.

**Files changed:**
- `site/src/components/transition/NotebookTransition.tsx` — close choreography retuned per the timing table above

**No CSS changes** — the layer model, transform-origin, and easing curves are all unchanged from v1.2.

---

## 2026-05-03 · Desk → Canvas transition v1.2 — alignment fix + visible rotation

After v1.1 polish landed, two bugs surfaced:
1. **Overlay notebook smaller than the desk's notebook** — when the cover layer mounted on top of the desk, it visibly shrank.
2. **Cover-front not visible during opening** — the user couldn't see the cover face actually rotate open; it just disappeared.

**Root causes:**

1. **Aspect-ratio mismatch.** The desk uses `/plate/notebook.png` (947×1380, aspect 0.686). The transition assets `/transition/notebook-closed.png` and `/transition/notebook-cover-front.png` were both 729×1219 (aspect 0.598). With `object-fit: contain` inside a container sized to the desk's bounds, the transition assets letterboxed — the actual visible cover ended up ~13% narrower than the desk's, with empty space on the sides. Even pixel-perfect alignment of the container couldn't fix this because the assets themselves had different framing.

2. **Visible rotation too brief.** v1.1 used `ease-out-expo` on a combined `transform: translate3d() rotateY()` animation. ease-out-expo is fast-then-slow, which meant the rotation flew through the visible 0°→90° range in the first ~120ms of an 820ms animation. By the time the eye registered "the cover is opening," the cover had already crossed 90° and disappeared via `backface-visibility: hidden`.

**Fixes:**

1. **Drop the transition assets, use `/plate/notebook.png` as the cover.** Same asset, same aspect, same framing — the overlay's notebook lands pixel-identical to the desk's static notebook. No swap, no cross-fade, no asset cuts to maintain. The closed-notebook layer is gone entirely (was a v1.1 attempt to mask the asset swap; no longer needed).

2. **Split rotation onto the inner img element with ease-in-out.** The wrapper handles position+size+lift via `translate3d` + `left/top/width/height`. The inner img handles `rotateY` independently. With `ease-in-out` on rotation, the visible 0°→90° range gets ~50% of the duration (~410ms) — slow enough that the user clearly sees the cover face tilt open before it crosses horizontal. The position morph keeps `ease-out-expo` for confident decel into the binding. Splitting onto two elements avoids the WAAPI `transform` conflict that would have arisen from running two animations on the same property.

**Net result:** the overlay notebook is now pixel-aligned with the desk's. The cover face is clearly visible during the rotation. Two layers instead of three, one asset instead of three, simpler code.

**Files changed:**
- `site/src/components/transition/NotebookTransition.tsx` — single cover asset; `animateRotation()` helper for img-only rotation; split snap/snapRotation
- `site/src/components/transition/NotebookTransition.module.css` — removed `.closedLayer` + `.closedImg`; cover wrapper no longer has `transform-origin` (rotation lives on img); img has `transform-origin: 0% 50%`

**Tunables added/changed:**
- Rotation duration: 820ms open / 580ms close (was 720ms/520ms baked into the morph)
- Rotation easing: `ease-in-out` (was sharing `ease-out-expo` with morph)
- Spread fade-in delay: 280ms (was 220ms; matches the new rotation pace)

**Retired:** `/transition/notebook-closed.png` and `/transition/notebook-cover-front.png` are no longer referenced. The files can stay on disk for now (no harm); future v2 may revive them if a flat-on-back endpaper asset is added.

---

## 2026-05-03 · Desk → Canvas transition v1.1 — polish pass

After v1 shipped, the transition felt "too fast, too rough" — specifically jumpy at the **start of opening** and the **end of closing**. Both were caused by instant asset swaps with no transitional easing. v1.1 addresses this with cross-fades at every handoff, slower deliberate timings, and a soft-landing beat at the end of close.

**Key changes:**

1. **Cross-fade at the closed↔cover handoff** (was: instant swap). At the start of open, the closed-notebook image now cross-fades into the cover-front image over 160ms while the cover begins rotating. The user reads continuous motion, not a swap. Same pattern at the end of close: cover cross-fades into closed-notebook over 80ms at the lifted desk position.

2. **Soft landing on close** (was: nothing — closed-notebook just appeared). The closed-notebook now arrives at the LIFTED desk position (`top - 16px`) and gently descends over 120ms with `ease-out-expo` to settle on the desk surface. Mimics a real hardcover coming to rest under its own weight.

3. **Bigger, slower lift on open** (was: 12px in 80ms). Now 16px over 220ms with `ease-in-out`. The wind-up gesture is felt as deliberate rather than as a flicker. Followed by a 60ms hold at the apex — the "now I'll open it" beat — before the cover starts rotating.

4. **Smoother easing throughout**. The original `cubic-bezier(0.34, 1.0, 0.64, 1)` had a micro-overshoot at the end that read as jitter at this scale. Replaced with `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for the cover rotation + position morph (one rigid body, one easing). Lift uses `cubic-bezier(0.42, 0, 0.32, 1)` (ease-in-out-paper) for the soft start/end of the wind-up. Cross-fades use the standard `cubic-bezier(0.4, 0, 0.2, 1)`.

5. **Slower overall timings** to feel weighted, not snappy:
   - Open: 800ms → ~1240ms (55% longer)
   - Close: 600ms → ~880ms (47% longer; still asymmetrically faster than open since closing is dismissal)

6. **Background paper covers slightly later** (delay 200ms instead of 100ms on open). The desk stays visible during the lift so the user sees their notebook actually rise BEFORE the surface changes — preserves spatial continuity into the morph.

**Tunables** (all in `NotebookTransition.tsx` constants — single source of truth, easy to adjust):
- Lift distance: `translateY: -16` (try 12 for subtler, 20 for more weighted)
- Lift duration: `duration: 220` (try 180 for snappier, 260 for slower)
- Settle pause: `setTimeout(60)` between lift and morph (try 0 to remove the pause entirely, or 100 for a more dramatic hold)
- Cover morph duration: `duration: 720` open / `520` close (proportional to overall feel)
- Cross-fade overlap: `duration: 160` open / `80` close (longer = smoother handoff but slower)
- Soft-landing duration: `duration: 120` (try 80 for snappier, 180 for more pronounced settle)

**Easing reference card** (in `tokens.css`):
- `--transition-ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` — main morph + rotation
- `--transition-ease-paper: cubic-bezier(0.42, 0, 0.32, 1)` — gentle ease-in-out for lift

---

## 2026-05-03 · Desk → Canvas signature transition shipped

**What shipped:** The desk → canvas notebook-opening transition per `prd-desk-canvas-transition.md`. Click `OPEN IT` on the desk: the notebook lifts, the cover rotates open from the spine in 3D, the open spread fades in beneath, the composition morphs to canvas-centered position, the URL updates mid-flight, and the canvas content reveals as the overlay clears. Reverse plays on `close →` (~600ms, snappier). `prefers-reduced-motion: reduce` collapses both to a 240ms paper cross-fade.

**New files:**
- `site/src/interactions/useTransitionState.ts` — state machine + custom-event bus
- `site/src/components/transition/NotebookTransition.tsx` — overlay component
- `site/src/components/transition/NotebookTransition.module.css` — layered overlay styles
- `site/public/transition/README.md` — asset documentation
- Design tokens added to `site/src/styles/tokens.css` (`--transition-*`)

**Modified files:**
- `site/src/App.tsx` — mounts overlay, wraps routes in `AnimatePresence`
- `site/src/components/desk/NotebookCover.tsx` — dispatches `notebook:open` instead of navigating
- `site/src/routes/CanvasRoute.tsx` — close + Escape route through `closeNotebook()`
- `site/src/components/canvas/NotebookSpread.tsx` — `data-transition-source="spread"` marker

**Deviations from the PRD:**

1. **Animation engine: Web Animations API, not Framer Motion's `useAnimation` controls.** The PRD specified `useAnimation` controls. In practice, Framer Motion's controls couldn't reliably resolve their `.start()` promises when animating layout properties (`left/top/width/height`) — a single morph would hang for ~15 seconds before resolving. Switched to direct `element.animate(keyframes, options)` (WAAPI) wrapped in a small `animateTo()` helper. Same easing curves, same timings; far more predictable. `framer-motion` is still installed (used for `AnimatePresence` at the App root), but the choreography itself runs on WAAPI.

2. **Safety-net timeouts on every animation.** `anim.finished` doesn't always resolve in throttled tabs (background tabs, some testing harnesses). Each `animateTo` resolves on `.finished` OR on `setTimeout(duration + 100ms)`, whichever comes first, with idempotent style-baking. The visible animation still plays via the compositor; the Promise resolution is just orchestration plumbing.

3. **Three-layer composition, not single morphing stage.** The PRD described one morphing wrapper with the spread underneath. Splitting into three independent layers (cover, spread, closed-notebook) avoids the awkward portrait→landscape aspect-ratio interpolation mid-frame. The spread is fixed at canvas-center geometry from the first frame; only its opacity animates. The cover morphs along its own physically-coherent path (desk-rect → spread-binding-half-rect, hinged on its left edge).

4. **Background paper covers from start, not gradual cross-fade.** The PRD called for a 100–600ms cross-fade between desk and canvas surfaces. With the canvas now chromeless (paper + dot grid only) and the desk being a paper-coloured plate, the surfaces are visually identical underneath — the "cross-fade" is degenerate. The bg paper instead ramps up rapidly (100–280ms on open, 180–400ms on close) to cover the route swap, then fades out at the end. Cleaner.

**Tunables Yankun should adjust to taste (in `NotebookTransition.tsx`):**

- `OPEN_TIMING.routeChange` — currently 320ms after lift (~400ms total). If the canvas reveal feels too late, reduce.
- The morph duration (`duration: 500` on `cover` morph) — controls how long the notebook takes to grow + travel. Try 400–600ms.
- The cover-rotation easing `[0.34, 1.0, 0.64, 1]` — has a slight overshoot. If it feels too springy, try `[0.4, 0, 0.2, 1]` (no overshoot) or `[0.34, 1.2, 0.64, 1]` (more overshoot).
- The bg fade-in delay (`delay: 100`) — how long the desk stays visible before paper covers. Larger = more "lift on desk" beat; smaller = quicker hide.
- The closed-notebook lift distance — currently 12px. Physically subtle; bump to 18–20 for more weight.
- Token `--transition-perspective` (1600px) — smaller = more pronounced 3D, larger = subtler.

**Known limitations to revisit:**

1. **Browser back/forward.** `popstate` from `/works` to `/` snaps directly without playing the close animation. Documented in PRD open question #1. Not load-bearing for v1; revisit if it bothers.
2. **First-frame asset alignment.** The placeholder `notebook-closed.png` and `notebook-cover-front.png` were generated to spec but may not align pixel-for-pixel with the desk's `/plate/notebook.png`. If the very first frame of the open transition shows a visible jump from desk to overlay, regenerate the transition assets to match the desk asset's exact proportions.
3. **Close transition state event.** The `state:idle` broadcast at the end of close occasionally doesn't reach the trigger button's listener cleanly; re-clicking after a close-then-open cycle works fine, but if you script repeated open/close cycles, give the close ~700ms to settle.

**Acceptance criteria status:**
- ✅ Open: notebook lifts, cover rotates around spine, morphs to canvas-center, open spread reveals, URL updates to `/works`. ~800ms.
- ✅ Close: reverse plays, URL returns to `/`. ~600ms.
- ✅ `prefers-reduced-motion: reduce` collapses to 240ms cross-fade.
- ✅ TypeScript strict mode passes (`tsc --noEmit`).
- ✅ Production build clean (`npm run build`).
- ✅ No regressions in `/cv`, `/about`, `/works/:slug` routes (those bypass the overlay entirely).
- ⚠️ 60fps on retina — not profiled in DevTools; the transforms are GPU-composited (translate3d + rotateY) but the morph also animates `left/top/width/height` which trigger layout. If profiling shows jank, refactor the morph to use scale + translate exclusively.

---

## 2026-04-29 · Canvas v0.8.1 — open-notebook architecture locked

**Decision:** Lock the canvas v0.8 architecture after two iterative low-fi mockups from Yankun. The canvas surface (works route) becomes a centered open notebook with four projects arranged 2 + 2 across one spread. Close affordance in the left margin is the only navigation back to desk. The original v0.8 plan's tab system, bio paragraph in the left margin, journal page tabs, and inside-notebook `CURRENTLY` sticky are all **cut**.

**The locked calls:**

1. **No tabs.** The notebook is single-section: WORKS only. No `WORKS / ABOUT / NOTES / CONTACT` tab strip on the right edge. Earlier v0.8 plan had four tabs; cut entirely.
2. **`close →` in the left margin = entire navigation back.** No browser-back hijack required (browser-back works as fallback). Closes the notebook visually, returns to desk.
3. **No within-canvas section navigation.** About lives at `/about` (separate route, reached from desk). Journal pages cut from v1. No section switching mechanism on the canvas.
4. **CHAI loses hero status.** All four projects are equal-weighted on the spread. Trade accepted: simpler composition over visual hierarchy at this surface; CHAI's depth still comes through in its case study at `/works/chai`.
5. **Right margin keeps a THOUGHTS sticky** — handwritten pull-quote pinned with washi tape, with a stamp/postmark mark for material weight. This is the canvas's marginalia entry. Voice-matched, ≤12 words.
6. **Left margin only carries the close affordance.** No bio paragraph. No nav menu. No CURRENTLY duplicate.
7. **Editorial plate chrome still wraps the canvas.** `EditorialPlate` stays around the notebook spread. Same chrome as the desk — register marks, plate metadata, format readout, currently / site-build chrome lines.
8. **Colophon / `currently` / `this site shipped in 2 weeks`** stay on chrome only — both desk and canvas. Not duplicated inside the notebook.
9. **Journal pages cut from v1.** `On Search` and `On Endings` removed from v1 scope. Revisit in v2 if the architecture finds room.

**Why these calls are stronger than the original v0.8 plan:**

The first v0.8 PRD had a tab-driven multi-section notebook (WORKS / ABOUT / NOTES / CONTACT) with bio paragraph and tab affordances on the right edge. That was solving navigation problems the architecture didn't actually have — the desk already routes to `/cv`, `/about`, and (formerly) journal pages directly via desk objects. Adding a parallel tab system inside the notebook would have duplicated navigation across two surfaces.

The locked architecture is cleaner: **the notebook is for works, period.** "Open the notebook" is now a literal one-meaning gesture — not "open the notebook to see works AND about AND notes AND contact." The close affordance pairs with `OPEN IT` on the desk for a complete open/close gesture loop. That symmetry is the navigation.

The cut of CHAI's hero status was the only call that felt like a real loss in the conversation, but Yankun accepted it for compositional simplicity. The CHAI case study at `/works/chai` carries the depth; the canvas just lists it equally with the others.

**What carries over from v0.7's density spec (mostly retired):**

The 2026-04-28 canvas density work targeted a 12-col plate that read thin. v0.8.1 doesn't have that problem — the open-notebook surface absorbs the density naturally. So most of the v0.7 density spec is **retired**, not migrated:

- Cut: intro paragraph, meta card (7 moves), section dingbat, sectional break between rows, marginal note (`← the long one`), pull-quote at plate scale, journal-page thumbnails, fig-detail callout
- Stays: chrome (running header, footer, register marks)
- Migrated: pull-quote → right-margin THOUGHTS sticky (smaller, voice-matched, in margin not on plate)

**Files this entry affects:**

- `00-brief/prd-canvas-v0.8-notebook.md` — rewritten as v0.8.1 with locked architecture
- `00-brief/decisions-log.md` — this entry

**Files this entry will affect when implemented:**

- `site/src/components/canvas/Canvas.tsx` + `.module.css` — keeps `EditorialPlate`; removes v0.7 grid + intro + section captions; mounts new notebook spread + side margin components
- `site/src/components/canvas/NotebookSpread.tsx` — new
- `site/src/components/canvas/NotebookPage.tsx` — new
- `site/src/components/canvas/ProjectRow.tsx` — new (replaces `ProjectCard` on canvas)
- `site/src/components/canvas/CanvasCloseButton.tsx` — new (left-margin close affordance)
- `site/src/components/canvas/CanvasMarginNote.tsx` — new (right-margin THOUGHTS sticky)
- `site/src/components/canvas/MetaCard.tsx` + `ProjectCard.tsx` + `SpotlightDotGrid.tsx` — likely retire
- `site/src/data/projects.ts` — schema rewrite: drop `colStart`, `colSpan`, `gridRow`, `alignVertical`, `aspect`, `size`; add `mockup`, `category`, `order`
- `site/src/data/projects.ts` — drop `projectGroups` export

**What's still open (small, non-blocking):**

- Notebook page header copy (recommended: left `NOTE / 001 — WORKS` over a one-line italic Fraunces description; right `SELECTED WORKS` only)
- Right-margin THOUGHTS pull-quote text — Yankun to write
- Close transition treatment (cross-fade for v0.8.1 ship; reverse-cover-lower as follow-up)
- Mobile fallback strategy (deferred to week 2, per existing scope)

**Source:** Conversation 2026-04-29. References: ChatGPT-generated mood image (`Option 2` open-notebook spread); Yankun's two iterative low-fi mockups of the canvas spread.

---

## 2026-04-29 · Desk — material density pass shipped (`Ephemera` + wayfinder reposition)

**Decision:** Built the desk material density pass per `00-brief/prd-desk-density.md`. Three new ephemera assets land on the desk surface around the existing 5 navigation objects. Wayfinder repositioned from above-left to below-left of the notebook, arrow flipped to point up-right. Two-character typo fix in the chrome. Existing 5 objects untouched in this pass — material treatments per object are deferred to a follow-up.

**What shipped:**

1. **`Ephemera` component** — mounts three image assets via absolute positioning inside `.scene`, with all positions, widths, and rotations exposed as `:root` CSS variables for DevTools tuning. Mounted as the first child of `.scene` so the navigation objects paint on top — architectural sketch and blueprint peek out from behind the notebook; postage stamp sits on the surface between notebook and CV at the top of the spread.

   - `architectural-sketch.png` — instrument working sketch on graph paper, with brass binder clip baked into the asset image. Tucked behind the notebook upper-left, peeking out above and to the left.
   - `blueprint-fragment.png` — complete rectangular blueprint sheet with white technical drawing on navy. Tucked behind the notebook right edge.
   - `postage-stamp.png` — engraved botanical postage with cancel mark. Top of spread, between notebook and CV, around chrome cols 8–9.

2. **Wayfinder repositioned.** `DeskWayfinder` moved from `top: 18%, left: 24%` (above-left of notebook) to `top: 70%, left: 28%` (below-left). Arrow path vertically flipped: starts low-left, curves up-right, terminates with arrowhead pointing up-right at the cover's lower-left corner. Caption baseline-aligns with the bottom of the arrow's start point so the gesture reads `open it →↗ notebook` as one motion. Width bumped 160 → 180px; arrow SVG 100 → 110px; opacity 0.6 → 0.7.

3. **Chrome typo fix.** `THIS SITE · DESIGNED AND SHIPPED IN 2 WEEK WITH CLAUDE CODE.` → `2 WEEKS`. One-character fix in `siteBuildLine` prop on `DeskRoute.tsx`.

**What got cut from the planned asset list:**

- **Asset 3 (fabric swatch)** — pulled per design review. Composition didn't earn its place after the assets landed.
- **Asset 5 (sticky note, typeset)** — not in the current design reference; can re-add later if needed.
- **Asset 6 (binder clip as inline SVG)** — clip is baked into Asset 1's image, no separate SVG needed.

**Refined rules surfaced during the build:**

- **Material-integrity rule (refined version):** Tape, clips, pins are OK *when the object they're attached to reads as physical and the attachment is doing visible structural work in the fiction.* The polaroid taped to the desk and the binder clip on the architectural sketch both pass; a vector tape strip across a project plate on the canvas does not. This is narrower than the strict "no tape" rule from earlier in the same conversation, and clearer than "earn its place by being a thing."
- **v0.4 deadpan rule, clarified:** The rule excludes *motion* (composing animations, parallax-without-tilt, ambient breathing, hover theatricality). It does **not** exclude static rotation on physical material props. Slight CCW/CW tilts on the architectural sketch (-2°), blueprint (+4°), and postage stamp (baked-in) are *placement*, not motion. Tunables expose rotation per-asset (`--eph-{name}-rotate`).

**What's deferred to a follow-up:**

- **Step 3 from the build outline** — material treatments on the existing 5 navigation objects (notebook strap drop-shadow + optional `VOL. V` blind-emboss; CV card paper-soft fill + drop-shadow + dog-ear + corner mark; pen nib-darkening + drop-shadow; roulette edge-wear + fingerprint smudge + drop-shadow; about polaroid stays as the bar). PRD specifies all moves; not implemented in this pass.
- **Position fine-tuning.** Starting values for all `:root` tunables are reasonable approximations of the design reference, but pixel-precise values still need DevTools tuning per Yankun. Once locked, paste back to bake into the file.

**Files touched:**

- `site/src/components/desk/Ephemera.tsx` — new
- `site/src/components/desk/Ephemera.module.css` — new
- `site/src/components/desk/DeskWayfinder.tsx` — arrow path flipped, header docstring updated
- `site/src/components/desk/DeskWayfinder.module.css` — position vars updated, opacity bumped, alignment changed
- `site/src/routes/DeskRoute.tsx` — `Ephemera` imported and mounted as first child of `.scene`; `siteBuildLine` typo fixed
- `site/public/desk/` — three asset PNGs added by Yankun (`architectural-sketch.png`, `blueprint-fragment.png`, `postage-stamp.png`)

**Asset prompts source of truth:** `00-brief/desk-asset-prompts.md`. Kept up to date through the iteration: Asset 1 pivoted from botanical to architectural / instrument working sketch; Asset 1 and 4 paper-edge rule clarified (intact rectangle, not torn); Asset 3 fabric specified asymmetric layered composition (then cut); Asset 4 blueprint clarified (no torn edges).

**Source:** Conversation 2026-04-29. PRDs: `00-brief/prd-desk-density.md` (planning), `00-brief/desk-asset-prompts.md` (asset list).

---

## 2026-04-28 · Canvas — density pass (chrome, meta card, plate roster)

**Decision:** A planning pass on the canvas's material density, prompted by a reference image (a journal/zine spread heavy with collage, postage, tape, typographic mixing — palette identical to ours). Yankun's read of the current canvas: clean but reads as a "cookie-cutter project page" because every element on the surface is the same kind of thing (project plate × 4). Decision is to **enrich the canvas's chrome and material treatment**, *not* to import the reference's collage/rotation moves. The v0.7 grid discipline (no rotation, no off-grid placement) is preserved.

The pass also produced a tightened principle, two ruled-out moves, and a specific roster of additions. No code touched in this entry — this is the spec; implementation follows.

**Framing principle (loud / quiet):** The project plates will be the loudest things on the canvas once they carry real mockups. So all other chrome stays quiet to let them breathe. The meta card is the **one** rich exception — it gets material weight because it's spatially separated from the plate parade and is the only legitimate "object" on the spread that isn't a project. Editorial design heritage: when photography is loud, typography is quiet.

**Material-integrity rule (refined):** Earlier rules in `voice.md` and `CLAUDE.md` ("no decorative sentences", "no lorem ipsum") were extended too narrowly during the conversation. Restated:

> Real elements can be treated with as much material craft as we want. The intro paragraph can sit in a typographic island; the meta card can have paper texture, a stamp, a dog-ear; a marginal note can be hand-drawn. **What stays out: net-new fake artifacts that aren't doing structural work** — vector tape strips across project plates, clipart binder clips, fake ticket stubs. Those are stickers; they cosplay craft instead of performing it.

The line is bright: **earn a place either by being a thing, or by treating a real thing with real material care.** Both legitimate; nothing else.

**The calls:**

1. **Surfaces.** Desk gets density (specifics TBD in a follow-up). Project detail stays clean — content is the work there, and consistency across four projects (three stubbed) would burn time on chrome that doesn't earn its place. Canvas gets new chrome, treated meta card, and a smaller plate roster — not collage.

2. **Intro paragraph — Treatment B (typographic island).** Hairline rule above and below, mono `§ FIELD NOTES ·` caption, italic Fraunces prose, mono fig caption underneath. Reads like the front-matter of a printed book. Considered and rejected: a Melville-style solid blue block with reversed-out type — would compete with the loud project plates and become a fifth plate.

3. **Project plates unchanged.** No tape, no clips, no torn edges, no postage layered onto plates. Plates stay editorial-plate-clean — 1px ink rule, mono caption, museum label. The discipline that says "the plate is the museum label, you don't put binder clips on a museum label" holds.

4. **Plate roster — cuts and additions.**
   - **Cut:** Type specimen plate (designer-flex, competes with loud plates). Pull-quote plate at full plate scale (becomes a small hanging pull-quote in negative space instead, *not* a solid blue block). Sketch plate (skip unless real Yankun sketches exist).
   - **Keep:** The four project plates (CHAI featured, Agentic main, Write-like-Webex standard, SAP Fieldglass standard).
   - **Add:** Two journal-page thumbnails (`On Search`, `On Endings`) — smaller and quieter than first sketched, function is route-finding. One fig-detail callout from CHAI — small, near CHAI, reads as a child of CHAI's plate, not a sibling.

5. **Meta card — seven moves (the one rich exception).**
   1. Set on `--paper-soft` (#ebe6d9), with paper grain at slightly higher opacity than the spread — reads as a different paper stock.
   2. Subtle `--paper-shadow` drop, very low blur — card sits on the spread, not part of it.
   3. 1px ink hairline border — kin to the project plate borders.
   4. One small dog-ear at the top-right corner only — exposes a sliver of the spread paper underneath.
   5. A single sectional ornament (fleuron / asterism / `❧`) replacing the bare hairline between sections.
   6. Hand-drawn Caveat arrow on `COLOPHON →` (replacing the typographic arrow).
   7. Stamp / cancel mark in a corner — must read as real ink (irregular density, slightly off-axis, not flat-icon). If it doesn't read as real, kill it.

   Ruled out for the meta card: rotation (consistency — meta card shouldn't tilt while plates don't); a binder clip "holding" the card (the card isn't actually being held by anything, would be cosplay; the dog-ear does the same job honestly); tape strips (same reason).

6. **Marginal page chrome — six moves.**
   1. **Running header restored** as the visual sibling of the footer. Same font / weight / size / tracking / opacity. Aligned to column 1 (left text) and column 12 (right text), exactly mirroring the footer's column boundaries. **No hairline directly under the header** (would create a hard barrier above the intro) — whitespace separator instead. Optional `§` glyph centered to mirror the footer.
   2. **Running footer** kept; can take a small center element (`§` glyph or a date glyph) to balance the header's center if used.
   3. **Section dingbat** above `WORKS FROM 2023–2026` — a single `§`, `❧`, or asterism `* * *` replaces the bare hairline.
   4. **Hairline-and-fleuron sectional break** between row 1 (CHAI + Agentic) and row 2 (WLW + SAP) — a printed-book gesture that visibly says "the spread has spreads."
   5. **Corner register marks** — small printer's-cross marks `✚` at top-right and bottom-left only. Two of four corners; one diagonal pair so they read as a hint, not a system.
   6. **One handwritten Caveat marginal note**: `← the long one`. Located in the column-7 gutter between CHAI (cols 1–6) and Agentic (cols 8–11), vertically aligned to CHAI's caption baseline so the eye crosses naturally from caption → marginal note. Voice-matched: dry, specific, slightly self-deprecating; resolves the real reader question *which of these four am I supposed to read?* — answer, in Yankun's hand: that one.

   Ruled out: extra postal cancel marks beyond the meta card stamp (themed); date stamp in corner (redundant with running header); folio numbers on edges (rotation banned); `§ III` Roman-numeral spread mark (cute, not load-bearing); fig-number marginalia floating near plates (would double the existing fig system); margin tick marks (too design-system-y); torn-page-edge perimeter (slides into faking the canvas as physical paper).

**Why the running header was previously commented out:** Yankun's note — it felt alien, didn't align with other elements. Resolved by the sibling-of-footer treatment above (matched everything to footer; aligned to col 1 and col 12; no hairline below). Header stops being a new component and becomes the top half of an existing footer pattern.

**Plate-to-chrome ratio (after the pass):** chrome was ~3 elements pre-pass (intro, group caption, footer); becomes ~10 (header, footer, dingbat, sectional break, two register marks, marginal note, intro treatment, plus the meta-card moves). Plates stay at 4 — still the loudest, still primary. Density goes up, hierarchy stays intact.

**What's deferred:**

- **Desk-side density.** Yankun confirmed yes-add-density on the desk; specific moves not yet scoped. Same loud/quiet principle should apply: don't add more objects, treat existing objects with more material care, enrich the desk's plate chrome. To be discussed in the next session.
- **Background texture.** Whether to keep the SpotlightDotGrid only, add paper grain on top, or replace with grain. Not resolved.
- **Hidden gems / surprises** beyond the one Caveat marginal note. Not resolved.
- **Implementation order.** What ships first: meta card treatment, header restoration, chrome elements, intro re-treatment, then plate roster additions. Not formally sequenced.
- **Failure modes.** When to pull back if a move doesn't land — not specified per move.

**Files this entry will eventually touch (when implemented):**

- `site/src/components/canvas/Canvas.tsx` + `.module.css` — header restored, intro treatment, dingbat, sectional break, register marks, marginal note slot
- `site/src/components/canvas/MetaCard.tsx` + `.module.css` — seven moves
- `site/src/components/canvas/ProjectCard.tsx` — unchanged (plates stay clean)
- `site/src/data/projects.ts` — add journal thumbnail + fig-detail callout entries (or a new collection alongside `projects[]`)
- `site/src/styles/tokens.css` — possibly new tokens for stamp/cancel mark and dog-ear treatments

**Source:** Conversation 2026-04-28, `/grill-me` session walking ten branches of the canvas density tree. Reference image: a journal spread (no canonical filename — Yankun's saved inspiration; sat on screen during the session).

---

## 2026-04-27 · Desk — atmospheric pass (wayfinder, directional light)

**Decision:** Two small additions to the desk plate (`/`), each independently shippable, giving the desk room presence and one piece of explicit wayfinding. The through-line typographic element from the original spec was implemented and then removed in the same session — the desk reads cleaner without a positioning sentence on the surface; the four object captions and the plate chrome already do that work.

1. **`DeskWayfinder` — caption + curved hand-drawn arrow pointing at the notebook.** Caption `open it` (lowercase source, uppercased via CSS) in JetBrains Mono caption / chrome tracking + a 100×80 inline SVG with a slightly wobbled Bezier spine + arrowhead, stroke `--ink` 1.4px, round caps. Wrapper `pointer-events: none`, opacity 0.6, always-on (not hover-revealed). Anchored absolutely inside `.scene` (which is now `position: relative`); positioning vars on `:root` (`--wayfinder-top`, `--wayfinder-left`, `--wayfinder-width`) so it can be tuned in DevTools. Hidden below 768px since the mobile flex stack makes it redundant. This is the desk's **first marginalia** under the post-v0.4 voice rule (≤2 per screen, 2–6 words; this counts as the desk's one entry).

2. **`DeskLight` — static directional wash on the desk content area.** Layered radial pool (gentle paper-shadow tint at upper-left) + linear falloff to an ink wash at lower-right. Originally tuned to the spec's 5–8% contrast ceiling; pushed to ~12–14% after a tuning pass since the spec values were below the perceptibility floor on the actual desk. Not animated. Tunables on `:root` (`--desk-light-angle`, `--desk-light-warm`, `--desk-light-cool`, `--desk-light-warm-stop`, `--desk-light-cool-start`).

**Why this matters as a register decision:** This is the **second deliberate atmospheric effect added back since the v0.4 deadpan call** — the watercolor wash on the notebook (2026-04-25) being the first. The desk is no longer pure deadpan-plate: it has a felt, off-frame light source as a resting state, plus a single piece of always-on marginalia doing UI wayfinding. The plate chrome was untouched; both additions live inside the content slot or the scene grid, and follow the existing token + register vocabulary (mono caption, ink-on-paper, no third color, no animation on the new pieces).

**Implementation:**
- `site/src/components/desk/DeskLight.tsx` + `.module.css` — presentational, no props, mounted once at the top of children before `.scene`.
- `site/src/components/desk/DeskWayfinder.tsx` + `.module.css` — presentational, no props, mounted once inside `.scene`.
- `site/src/routes/DeskRoute.tsx` — imports the two new components.
- `site/src/routes/DeskRoute.module.css` — adds `position: relative` on `.scene` as an anchor for the wayfinder.
- `EditorialPlate` chrome and tokens were not touched.

**Source:** Conversation 2026-04-27. Spec: `00-brief/prompts/desk-atmospheric-pass.md`.

---

## 2026-04-26 · About page — concept locked

**Decision:** The About page is a viewport-fitted editorial plate (`/about`) carrying the same chrome as the desk and canvas. The hero polaroid from the desk lifts up, lands on the page taped at top-left, holds the page's interactivity (cursor tilt + click-to-flip). The back of the polaroid is a typeset darkroom-stamp annotation block (`LOC. / DATE / NOTE`) — not handwriting. Three short paragraphs of copy live in cols 7–11. A scatter of three smaller polaroids (cols 4–12, lower band, varied rotations and tape positions) gives the page weight at the bottom; each holds an ink-blue photo placeholder and a typeset mono caption fragment.

**Why this matters as a register decision:** The previous polaroid-caption plan called for Caveat handwriting for `self-portrait, 2026` and the back-of-polaroid note. That predated my catching item 5 of this log (Caveat fully removed in v0.4). The About page now stays inside the plate register: all annotation is JetBrains Mono, all longform is Fraunces. Photos and tape are the only physical/material elements. This keeps the About consistent with desk and canvas chrome.

**Why short copy:** ~95 words, three paragraphs. The CV carries biography, case studies carry the work, the polaroid caption carries personality, the colophon carries the AI-craft story. The About is the one paragraph that ties them together — not a re-statement, not a hobbies list.

**Source:** Conversation 2026-04-26. Full spec: `00-brief/prd-about.md`. Copy drafts: `01-content/about.md`.

---

## 2026-04-25 · Desk — watercolor wash on dwell (notebook only, trial)

**Decision:** Add an ink-blue watercolor wash that blooms behind the notebook on hover. 300ms dwell threshold, peaks at 0.15 opacity, 280ms ease-in fade up, 480ms slow fade-out. The wash includes an edge ring (granulation) — a darker stroke on a slightly larger ellipse that pools at the wash's perimeter, mimicking how real watercolor pigment concentrates at the drying edge.

**Why this matters as a register decision:** The v0.4 plate pivot specifically killed cursor-reactive theatricality (DeskDotGrid repulsion, DeskMarginalia proximity reveal, ambient breathing). The wash is the first deliberate atmospheric effect added back. It's restrained — single color, low opacity, dwell-gated — but it does mean the desk register has shifted one notch toward atmosphere, away from pure deadpan plate. Trial run: notebook only. If it lands in context, extend to CV card, about object, and roulette in a follow-up pass. If it feels foreign on the plate, kill it.

**Implementation:**
- `site/src/components/shared/InkFilters.tsx` — global SVG filter defs mounted at app root. Currently provides `#ink-watercolor`: fractalNoise → displacementMap (scale 24) → gaussianBlur (stdDev 2.5). Filter region extended to 160% so displaced edges aren't clipped.
- `site/src/components/shared/WatercolorWash.tsx` — renders two concentric ellipses (body fill + edge stroke ring) inside a `<g>` with the watercolor filter applied. Body at rgba(ink, 0.55), ring at rgba(ink, 0.95) so the ring reads ~2× darker than the body — the granulation effect. Wash element is `pointer-events: none` and `opacity: 0` by default; consumer's CSS triggers visibility.
- `site/src/components/shared/WatercolorWash.module.css` — base styles only. Defines the slow fade-out (480ms) which should be consistent across uses.
- `site/src/components/desk/NotebookCover.tsx` — adds `<WatercolorWash className={styles.wash} />` inside the notebook button, before the image. Image renders on top by source order; no z-index needed.
- `site/src/components/desk/NotebookCover.module.css` — `.wash { position: absolute; inset: -20%; }` (140% size, centered on button). `.button:hover .wash, .button:focus-visible .wash { opacity: 0.15; transition: opacity 280ms ease-out 300ms; }` — the consumer-owned dwell gate. Reduced-motion media query disables the effect entirely.
- `site/src/App.tsx` — `<InkFilters />` mounted as a sibling of `<Routes>` inside `<BrowserRouter>`.

**The asymmetric in/out timing** (delayed 300ms in, instant slow 480ms out) works because the consumer's `:hover` rule overrides the base transition declaration, but only while hover is active. On hover-out, both the override opacity and the override transition revert; the base rule's 480ms transition takes effect for the fade. CSS-only — no React state, no setTimeout, no event listeners.

**Open follow-up:** If the wash lands well on the notebook, extend to the other three desk targets (CV card, about, roulette). At that point, add per-target seed variants in `InkFilters` (e.g., `#ink-watercolor-2`, `#ink-watercolor-3`) so each object's bleed has a unique blob shape — currently all uses share seed 2.

**Source:** Conversation 2026-04-25.

---

## 2026-04-25 · Canvas v0.7 — grid discipline, retire pinboard

**Decision:** Close the contradiction between the v0.4 plate-chrome pivot ("Canvas uses 12-column plate grid") and the v0.5/v0.6 implementation ("hand-composed pinboard with ±1–2° rotation, freeform percent positioning, graph-paper background"). The implementation predated the chrome pivot. Canvas now ships as a 12-column editorial plate that shares the desk's plate system at higher density.

**The calls:**

1. **Project set revised.** Smart Search retired from the canvas; replaced by Control Hub Agentic as a co-main alongside CHAI. Canvas now carries four plates: CHAI (featured), Control Hub Agentic (main), Write-like-Webex (standard), SAP Fieldglass (standard). Smart Search remains a *proof beat inside* the CHAI case study (`smartSearch` in `chaiContent.ts`); the top-level slug `/works/smart-search` now resolves to 404 (clean — `ProjectRoute` already returns the 404 stub for unknown slugs).
2. **Three-tier weight ladder** instead of two. Featured (CHAI, 6 cols) → main (Agentic, 5 cols) → standards (3 cols each). CHAI:standards ≈ 2× by column count; aspect-ratio variation amplifies the felt hierarchy.
3. **Aspect-ratio variation drives composition.** CHAI 16:10 (wide), Agentic 4:5 (upright), Write-like-Webex 10:16 (tall), SAP 16:10 (short). Same column slot, different vertical extents → editorial composition without rotation.
4. **No rotation. Anywhere.** Cards axis-aligned. The MetaCard's 1.2° tilt is removed; the washi-tape strip stays as the sole physical-paper signal.
5. **Graph-paper background retired.** Replaced by very faint vertical column rulings (`--rule-column` at 5% ink) that mark the 12-col grid. Reads as "ruled page," doesn't compete with plates.
6. **Editorial intro paragraph** at top-left (cols 1–7), italic Fraunces 22px with a `§ Field Notes ·` mono prefix. Replaces the v0.6 13%-opacity display watermark thesis (which was working too hard for too little).
7. **Section caption** above paired works (CHAI + Agentic): mono caps with hairline rule above, `§ at Cisco · 2024–2025 · Control Hub AI work`. The pair is grouped typographically without a frame; WLW + SAP get no group caption — that asymmetry is itself an editorial signal.
8. **Museum-label captions move outside the card.** Card box now contains only the plate (the figure rectangle). Beneath it on the canvas surface: `fig. 0N` (mono), title in italic Fraunces (22px main / 28px featured), role + year in mono caption, and the impact line revealed on hover (Pentagram caption move).
9. **Vertical scroll allowed.** With the new aspect ratios and the 12-col grid, content height exceeds 100vh on common laptop viewports. Heroes (CHAI + Agentic) sit in the first viewport; standards (WLW + SAP) sit below the fold and invite a scroll. The "field notebook spread" metaphor accommodates this — a spread can scroll vertically. Footer stays inside the canvas surface; the MetaCard moves to `position: fixed` so it remains visible during scroll.
10. **Standards pinned to opposite margins.** WLW at cols 1–3, SAP at cols 10–12. Six-column gap between them is the negative space. SAP's row uses `align-self: end` so it sits at the bottom of WLW's taller track — different baselines for the two standards.

**Schema change in `data/projects.ts`:** removed `canvasPosition`, `canvasRotation`, `containerWidth`. Added `colStart`, `colSpan`, `gridRow`, `alignVertical`, `aspect`, `role`, plus a 'main' size tier. Added `projectGroups` export for canvas-surface section captions.

**Chrome cleanup:** Hand-drawn arrow SVG retired (was pointing at CHAI; with grid-aligned hierarchy and typographic intro paragraph, it became redundant decoration). Running header/footer kept. Footer right-side now reads `FIELD NOTES · VOL. V` (was empty).

**Agentic project record:** scaffolded with placeholders. Slug `control-hub-agentic`, title 'Control Hub Agentic', role 'agentic experience for control hub', year '2025', impact 'metric pending'. Yankun to confirm/replace.

**Files touched:**
- `site/src/data/projects.ts` — schema rewrite, Smart Search out, Agentic in, projectGroups added
- `site/src/components/canvas/Canvas.tsx` + `.module.css` — grid container, intro slot, section captions, column rulings, no graph paper, no thesis watermark, no hand-drawn arrow
- `site/src/components/canvas/ProjectCard.tsx` + `.module.css` — column-span placement, aspect-driven plate, museum-label caption outside the card, hover-revealed impact line, no rotation, three-tier sizing
- `site/src/components/canvas/MetaCard.module.css` — rotation removed, position changed to fixed
- `site/src/routes/CanvasRoute.tsx` + `.module.css` — new entrance choreography (rulings → furniture → intro → groups → cards by tier → meta), vertical scroll enabled while mounted
- `site/src/routes/ProjectRoute.tsx` — comment updated to reflect Agentic in / Smart Search out
- `site/src/styles/tokens.css` — added `--rule-column` token
- `CLAUDE.md` — overview, hard rules, v1 scope, canvas component description updated

**What's deferred to a follow-up pass:**
- View Transitions API for canvas → project navigation (Tier 3 from the plan)
- Cursor-aware interaction polish on the canvas
- Real screenshots for all four plates (still placeholders)
- Inline metric tells next to standard card titles (waiting on real metrics for SAP, Agentic)
- Resize strategy decision (currently the grid scales naturally inside the 1280px container; <1100px behavior not yet specified)

**Source:** Conversation 2026-04-25, references brief `00-brief/references-craft-up.md`.

---

## 2026-04-24 · Homepage v0.4 resolutions — five open questions closed

**Decisions on the five PRD v0.4 open questions:**

1. **Canvas uses 12-column plate grid.** Homepage stays 8. The chrome renders the right column count per page via the `grid` prop.
2. **Notebook → canvas portal: chrome snaps.** The cover-lift gesture animates (600–800ms, physical), but plate metadata (number, title, column count, grid system) swaps instantly at the midpoint of the cover lift. No typographic crossfade at 11px — fiddly and doesn't earn itself.
3. **Yogurt Roulette stays on the desk.** Remains `fig. 05` in column 1–2. Interaction stays deadpan per v0.4 (precise rotation, no scale, no specimen card). The personal tell does not migrate into chrome.
4. **Homepage CV card renders the generated asset verbatim** — real name, role, email, location printed on the card. Serves both as a readable specimen and as the click target for `/cv`.
5. **Currently line:** `CURRENTLY — Building something fun.` Holds the slot.

**Why log this separately:** v0.4 PRD entry captured the structural decisions; these resolve the open questions that v0.4 left hanging. Both lock the chrome geometry for homepage + canvas + project pages.

**Source:** Conversation 2026-04-24.

---

## 2026-04-24 · Homepage v0.4 — Swiss editorial plate register, site-wide chrome

**Decision:** Full pivot of the homepage register from "studio at midnight, paused mid-work" to **editorial plate / print specimen sheet**. The reference is a Maxime Dessain–style Swiss modernist composition: deadpan, gridded, information-forward, with plate metadata in the corners, column numbers across the top, register marks at the edges, and `fig. 0N — name` captions beneath each object. Two-color discipline unchanged. The editorial-plate chrome extends to every page (canvas, CV, case study) as the portfolio's shared frame — not just the homepage.

**The seven calls, in the order they were made:**

1. **How far do we pivot?** — Full commit. No half-measures. The current composing animation, ambient light breathing, parallax without tilt, cursor-reactive dot grid repulsion, hidden marginalia proximity reveal, and most object micro-personalities are superseded. The notebook → canvas portal survives (it's the signature moment). The roulette survives but its interaction goes deadpan: click → disc rotates precisely, lands, caption swaps — no overshoot, no scale, no specimen card reveal.
2. **Site-wide chrome** — plate metadata + column numbers + register marks + fig. captions apply to every page. A shared `EditorialPlate` component provides the chrome; content renders inside it.
3. **Render style for objects** — all objects generated as illustrated assets (initially as raster via GPT Image, then traced to SVG). Register: **flat Swiss graphic** for notebook, CV card, about card, pen — no hatching, no engraving, no stippling, no gradients, no photo highlights, no drop shadows. **One deliberate exception:** the cats on the roulette are rendered in engraved/stippled specimen-plate style — the single textural element in an otherwise flat composition. That contrast is load-bearing.
4. **Interaction model** — deadpan. No composing-on-load sequence. No ambient light breathing. No parallax-without-tilt. No cover-lifts-on-hover. Objects appear still, aligned to the grid, like a printed plate. The roulette still spins, but as a precise one-gesture rotation, not a theatrical spin with overshoot and specimen-card reveal. Hover affordance reduces to a 1px rule appearing beneath the `fig.` caption on hover — typographic, not physical.
5. **Drop Caveat handwriting entirely** — the zine/handwriting register is incompatible with the Swiss plate. All handwritten marginalia, the handwritten "about" card label, the handwritten roulette caption, and the Caveat font reference in `tokens.css` are removed. Marginalia that survives becomes typeset mono.
6. **Chrome copy** — reuse the Currently slot from the canvas meta card (per `.claude/rules/portfolio-scope.md`). On the homepage, the bottom-right chrome holds two small mono lines: `CURRENTLY — [one sentence]` and `THIS SITE · DESIGNED AND SHIPPED IN 1 WEEK WITH CLAUDE CODE. COLOPHON →`. The canvas meta card can be deprecated in favor of the chrome slot, since every page now carries chrome.
7. **Keep "field notebook" as the spine metaphor** — the *object* on the desk is still a Field Notebook (that's the notebook's identity and the canvas metaphor). The *wrapper* around it shifts from "zine/field-notebook page" to "editorial plate / print specimen sheet." The portfolio is now: field-notebook objects presented as editorial plate specimens. That framing is the reconciliation.

**What's superseded from v0.3.x:**

- Composing-on-load sequence (`DeskRoute.module.css` keyframes: `notebookDrop`, `cvDrift`, `aboutSlide`, `rouletteEntrance`, `penRoll`, `labelDrawIn`, etc.). All become static.
- Ambient light (`AmbientLight.tsx`, `--duration-ambient` token, cursor-tracked radial gradient). Removed entirely — the plate register doesn't admit atmospheric lighting.
- Cursor-reactive dot grid repulsion (`DeskDotGrid.tsx`). Grid is now the plate's column ruling, not a bullet-journal dot pattern. Component becomes static or deprecated.
- Hidden marginalia proximity reveal (`DeskMarginalia.tsx`). Component deprecated; any marginalia copy that survives moves into mono chrome text.
- Specimen card reveal on roulette (`CatRoulette.tsx` specimen-card state). The selected cat remains visible in its segment; no card pops above the disc.
- Cover-lifts-on-hover, elastic-slackens, 1–2px breathing on the notebook. All removed.
- Caveat font family, `--font-hand` token, any `font-family: var(--font-hand)` rule.
- Tipped-in paper label card on the notebook cover. Replaced by a flat inset label panel printed directly on the cover (matches the generated asset).
- Folded-paper CV affordance. Replaced by a flat typeset editorial card.
- Handwritten "about" affordance. Replaced by a flat typeset short card.
- v0.3's per-object micro-personalities table.

**What survives:**

- Two-color palette (`--ink`, `--paper`, the softer variants).
- Fraunces + JetBrains Mono. Caveat goes.
- The five desk objects as portal targets: notebook → canvas, CV card → /cv, about card → placeholder, pen (prop, not a portal), roulette (personal tell).
- The notebook → canvas portal transition (the signature moment). Its choreography may need a pass in the new register — likely the plate chrome fades to the canvas chrome as the cover lifts, rather than fading to a different world.
- Canvas cluster positions are still hand-composed (not snapped to the plate grid).
- The colophon / this-site-built-with-Claude-Code claim — now carried by the bottom-right chrome slot on every page.

**Reference:** `04-reference/swiss-modernist.png` (the image Yankun saved).

**Asset generation status:** prompts for notebook, CV card, about card, pen, cat roulette disc, and individual cat poses have been delivered. Yankun is generating; assets will arrive as PNG/SVG in `02-assets/` or `site/public/`. Object placement and exact dimensions tune to the delivered assets, not the other way around.

**What's scaffolded in this pass:**

- `00-brief/prd-homepage-desk.md` v0.4 section prepended (v0.3.x content preserved below as history).
- `site/src/styles/tokens.css` — added `--rule-plate`, `--rule-plate-strong` chrome tokens.
- `site/src/components/shared/EditorialPlate.tsx` + `.module.css` — chrome wrapper component.
- `site/src/components/shared/FigCaption.tsx` + `.module.css` — `fig. 0N — name` caption.

**What's not done yet (follow-ups):**

- Re-skin the desk objects (`NotebookCover`, `ResumePaper`, `AboutObject`, `Pen`, `CatRoulette`) to the flat Swiss register. Awaiting generated assets.
- Delete or deprecate `AmbientLight`, `DeskDotGrid`, `DeskMarginalia` once the register is confirmed in context.
- Wire `EditorialPlate` into `DeskRoute`, then `CanvasRoute`, `CvRoute`, `ProjectRoute`.
- Update `.claude/rules/design-tokens.md` to drop the Caveat row and add plate chrome tokens.
- Update `CLAUDE.md` project-overview paragraph to reflect the "editorial plate presenting field-notebook objects" framing.
- Update `00-brief/vibe-guideline.md` — the handwriting tier is gone; marginalia rules likely change.

**Why not do all those follow-ups now:** the user approved docs + scaffold only. Object code stays untouched until the generated assets land and the chrome scaffold is confirmed in context.

**Voice on `19th-century scientific catalog`:** An earlier asset prompt leaked "19th-century specimen plate" as the shared style for *all* objects. That was my drift — I saw the engraved cats on the reference and over-generalized. Swiss modernist ≠ scientific engraving. Corrected: flat Swiss graphic for everything except the cats on the roulette. The cats are the one textural contrast.

**Source:** Conversation 2026-04-24, reference image `04-reference/swiss-modernist.png`.

---

## 2026-04-23 · Positioning sharpened toward founding designer; four-claim frame; five v1 additions

**Decision:** Reframe the portfolio around a founding-designer audience (primary), with fast-growth startup designer as secondary target and AI designer at mid/large company as tertiary. The unranked ten-impression list collapses into four claims in priority order:

1. I solve complex problems in AI products — CHAI is the hero.
2. I have taste and craft — the site is the demo.
3. I build with AI, not just design for it — this portfolio, shipped in one week, is the artifact.
4. I think interestingly — voice, specific choices, colophon.

**The memorable thing is the experience itself** — desk, click, read. That reframes the portfolio: it is no longer a container for case studies, it *is* the case study. CHAI becomes supporting evidence. The tone shift toward founding means the site must also feel alive and shipped, not just composed. Founders look for seams, velocity, and edge — signs that you build and keep building, not just curate.

**Five additions to v1 scope:**

1. **Currently + site-build meta card** pinned to a canvas corner. One surface, two signals: a `Currently: [one sentence]` slot, and a line reading "This site: designed and shipped in 1 week with Claude Code. Colophon →". The card lives on the canvas, not the desk — the desk metaphor stays sparse and object-driven. A reader has to open the notebook once to see it; a reader who never opens the notebook was never going to become a hire.
2. **Colophon essay expanded** from placeholder to a real 300–500 word essay. Specific and unhumble: what Claude did vs. what I did, what broke, what I changed mid-build. Not "with help from AI" — "designed and shipped in 1 week with Claude Code as a partner." Yankun writes the prose; scaffold deferred by request.
3. **Voice sharpened** across case studies. Still first-person, still reflective, but cutting. One sharp opinion per paragraph, not one slow observation. Rule change to `.claude/rules/voice.md` only — case study prose is edited separately by Yankun.
4. **Motion layered into the existing site** for range proof. Additive to what's already there (dot grid, marginalia reveal, roulette, reveal-on-scroll, count-up). Specific investment in the two signature moments: desk → canvas portal, canvas → project zoom. Inventory pass comes before new work.
5. **Colophon outline deferred** — Yankun will scaffold later, not in this pass.

**Deferred:** An "edge surface" (manifesto-lite, strong-opinion page) was considered and dropped for v1. Range proof will come through motion and visual craft within existing surfaces rather than a new opinion surface. Revisit in v2 if range still reads thin.

**Rejected framings from the original ten-impression list:**

- *"Experienced designer"* as a stated goal — dropped. Seniority is felt in the first 30 seconds or not at all; stating it is the weakest way to signal it.
- *"Good taste"* and *"good craft"* as separate claims — collapsed. The site carries both at once.
- *"Builds with AI / AI native / designs for AI"* as one claim — split into three, each with different evidence. Designs for AI = CHAI. Builds with AI = this portfolio. AI native = voice and framing across the site.
- *"Fun, not cookie-cutter"* and *"interesting person"* as explicit goals — dropped. Both are byproducts of specific choices elsewhere; engineering for them directly produces gimmicks.

**Implications:**

- `.claude/rules/portfolio-scope.md` updated to reflect v1 additions, founding-designer lean, and four-claim positioning.
- `.claude/rules/voice.md` updated with cutting-voice guidance.
- The existing thesis — *"I make complex, invisible systems handleable"* — still holds as the through-line. It is now the payoff line for claim #1, not the whole pitch.
- Deck of potential shifts parked for post-v1: a "what I'm shipping now" public log, a brand/motion surface not tied to a case study, sharper takes surface.

---

## 2026-04-23 · Project detail route — ChaiProject bespoke layout, shared block components

**Decision:** Built out the `/works/:slug` route with a bespoke CHAI layout, a dispatcher pattern for other projects (stubs for now), and a full set of reusable block components in `site/src/components/project/`.

**Layout approach (CHAI):** Vertical-scroll editorial. No hero section. Reading column sits at ~42em (~680px) centered in a 62em article container so editorial plates can break out to medium width without floating in space. Prose is Fraunces at 18px/1.6 for body and 22px/1.5 for the opening lead. The pull quote (the thesis moment) offsets left of the reading column, sits in display-M italic Fraunces (~44px) with a short ink rule above and mono attribution below. The outcome moment (`3% → 18%`) breaks the vertical rhythm — full article width, display-XL numbers, counted up on scroll with ease-out cubic. Three proofs (Smart Search, Report Analysis, Devices Troubleshooting) are visually parallel but structurally varied: Smart Search has inline metrics (86% / 14%), Report Analysis has a side-by-side plate pair, Devices stacks two plates vertically.

**Content / layout separation:** All text lives in `site/src/data/chaiContent.ts`. The layout (`ChaiProject.tsx`) pulls typed content; when a prose slot is `null` it renders a `TodoSlot` component — a visible dashed placeholder with the beat name, a writing hint, and a pointer to the outline file. This enforces the "no lorem ipsum" hard rule while keeping the full page structure visible during development. Metrics, captions, figure numbers, the thesis pull quote, and attribution are locked in the data file.

**New components (`site/src/components/project/`):**
- `ChaiProject` — CHAI-specific layout orchestrator
- `ProjectHeader` — fig number, title, subtitle, metadata strip
- `ProseBlock` — body (18px) and lead (22px) variants; read (42em) and narrow (34em) widths
- `EditorialPlate` — 1px ink rule + paper-soft fill + mono caption; graceful image-missing fallback
- `PullQuote` — the thesis typographic moment
- `MetricDisplay` — the big 3% → 18% outcome moment
- `InlineMetric` — smaller figure treatment for proof-of-feature metrics
- `ProofHeader` — section header with numeral, title, summary
- `Credits` — role-only, no names
- `TodoSlot` — loud placeholder for unwritten prose
- `RevealOnScroll` — fade + translate-up wrapper, respects `prefers-reduced-motion`

**Route dispatcher:** `ProjectRoute` reads the slug from the URL, renders `ChaiProject` for `chai`, renders a `ProjectStub` treatment for other valid slugs (with title, subtitle, meta, and a "case study in progress" message), and a 404 stub for unknown slugs. Scroll enable/disable follows the CvRoute pattern: toggle html/body overflow to auto on mount, restore on unmount.

**Motion:** Plates, pull quote, proof headers, and the metric display fade+translate into view via `RevealOnScroll` at a standard 480ms/ease-out. The outcome metric also counts up (ease-out cubic) via the existing `useCountUp` hook. All motion respects `prefers-reduced-motion` — reveals become instant, count-ups snap to final.

**Responsive:** Reading column collapses gracefully. The paired plates in Proof II stack vertically below 900px. The inline metrics row wraps. Page padding scales from 60px (desktop) to 24px (mobile).

**Images:** `site/public/images/chai/README.md` documents expected filenames (`chai-1-0.png`, `smart-search.png`, `report-kickoff.png`, `report-delivered.png`, `devices-clustering.png`, `devices-embed.png`) and constraints. Plates render dashed-frame placeholders for missing images so the page structure is visible without assets.

**Why "not a template":** Yankun explicitly asked for a thoughtful layout, not a minimal one. The composition favors editorial rhythm (prose → plate → prose → pull quote → proofs → outcome → reflection) over a reusable grid. Other projects will reuse the block components but compose their own layouts; `ChaiProject` is the reference, not the template.

**Verified:** `tsc --noEmit` passes cleanly. `vite build` in the sandbox fails because `node_modules` is a macOS install — not a code issue; will build fine on the Mac.

---

## 2026-04-23 · CHAI case study outline; no-collaborator-names rule; metric refinements

**Decision:** Three coupled decisions taken while scaffolding the CHAI case study outline.

1. **CHAI headline metric refined from 3% → 15% to 3% → 18%.** The 15% figure was stale in multiple source-of-truth files; the CV page was already using 18%. Updated the metric in `site/src/data/projects.ts`, `.claude/rules/portfolio-scope.md`, `00-brief/brief-01.md`, `00-brief/architecture-plan.md`, and `00-brief/prd-notebook-canvas.md`. Left historical references in `03-prototype-explore/` and `04-reference/` untouched.

2. **No collaborators named anywhere in the app.** Site-wide rule. Credit by role ("the PM," "a researcher," "the Devices BU team," "we") in all prose and credits. Updated the voice rule in both `.claude/rules/voice.md` and `00-brief/vibe-guideline.md` from "Name collaborators by name" to "Credit collaborators by role, not by name." Emptied the `collaborators` arrays on CHAI and Smart Search in `site/src/data/projects.ts`; other projects already had empty arrays. The `collaborators: string[]` field is kept in the Project interface — unused for now, but low-cost to leave.

3. **120% monthly usage metric cut.** The old yankun.one/chai page led with "boosted monthly usage by 120%" — redundant with the headline 3% → 18% adoption metric and doesn't add new information. The case study's metric set is now: 3% → 18% adoption (headline), 86% no-result-search drop (Smart Search proof), 14% assistant entry points via Smart Search tunnel (Smart Search proof).

**Why no names:** Not elaborated by Yankun, but the instruction was unambiguous ("I don't want names anywhere in the app, remove them all"). The move reads as a deliberate choice — credit-by-role fits the editorial register better than résumé-style credits grids, and removes any dependency on collaborator consent.

**CHAI case study structure:** Outline written at `01-content/chai.md` in eight beats: opening moment (locked as "the week after CHAI v1 launched"), context, the shift from answering to sense-making (thesis), three proofs (Smart Search, Report Analysis, Devices Troubleshooting), outcome, reflection. Meetings/Calling north-star cut from the case study — may become a journal page later. All structural questions resolved; remaining work is prose, which Yankun writes.

**Note:** A stray `.claude/rules/portfolio-scope.md.bak` backup file was created during the sed-based edit and couldn't be removed from the sandbox. Delete manually with `rm .claude/rules/portfolio-scope.md.bak`.

---

## 2026-04-22 · CV page: Mary Kim–inspired typographic editorial at `/cv`

**Decision:** The CV lives at `/cv` as a vertical-scroll editorial page, visually anchored to the Mary Kim zine reference. The desk `ResumePaper` now navigates there (previously a `console.log` stub). The uploaded `Resume-Yankun-Wang-2026.pdf` ships as `site/public/Yankun-Wang-CV-2026.pdf` and is served from a sticky, typographic download button.

**Page composition (top → bottom):**
1. **Cover block** — display-XL name stacked across three rows. An italic "a product" fragment intrudes between first and last name (at 22% of the display size); "designer" sits inline with the last name in italic Fraunces at 38% size. Pinned top-right tagline + bottom contact list. Directly lifted from Mary Kim's italic-fragment-into-roman-display move.
2. **First-person intro** — single italic paragraph (~30 words), set into a left rule. Uses Yankun's voice.
3. **§ 01 Experience** — three roles stacked vertically. Mono year range hugs the left margin like Mary Kim's edge-text; company names in italic Fraunces, titles in roman, joined by a small mono "at" dropped below baseline. Bullets collapse/expand per role; first role (Cisco) defaults open.
4. **Pull-out metrics** — `18%` (CHAI adoption) and `86%` (search no-result drop) as display-XL figures bordered with hairlines, anchored beneath their role. Up/down arrows encode valence.
5. **§ 02 Skills** — Mary Kim specimen grid: 2-column, category labels in mono caps, skill tokens as small Fraunces with pencil-underline hover.
6. **§ 03 Education** — compact year-margin + institution + italic-degree stack.
7. **Colophon row** — mono one-liner + inline download echo.

**Interactivity (chose "quiet craft" option):**
- Roles are accessible `<button>` headers (aria-expanded, aria-controls); click or Enter/Space toggles; bullets stagger-fade in at 60ms × index.
- Metric figures count up from 0 on scroll into view via `useInView` + `useCountUp` hooks. Respects `prefers-reduced-motion` (snaps to final).
- Sticky `CvDownload` pinned inside the content column, top-right. On ≤720px it becomes a fixed bottom-right button.
- Header hover draws a 64px ink underline under each role heading (pencil-underline, 240ms ease-out).
- All motion gated behind `@media (prefers-reduced-motion: no-preference)` with static fallback.

**Copy treatment (chose hybrid):**
- `intro` (first-person) is new prose: "Six years designing enterprise tools has convinced me the interesting work is almost always the same work…"
- Each role carries a first-person `summary` (one line of context) above the résumé-voice bullets.
- Bullets copied verbatim from the PDF. **Three typo fixes made silently; flagging here:**
  - "clearer clearer" → "clearer" (UMich intern bullet 1)
  - "data-drivenAI" → "data-driven AI" (SAP bullet 3)
  - "Palo Alto,CA" → "Palo Alto, CA" (SAP location)

**PDF integration:** `site/public/Yankun-Wang-CV-2026.pdf` served via `<a href download>`. No server-side logic; downloads with the clean filename.

**Files added:**
- `site/src/routes/CvRoute.tsx` + `.module.css`
- `site/src/components/cv/` — `CvCover`, `CvRole`, `CvMetric`, `CvSkills`, `CvEducation`, `CvDownload` (+ modules)
- `site/src/data/cv.ts`
- `site/src/interactions/useInView.ts`, `useCountUp.ts`
- `site/public/Yankun-Wang-CV-2026.pdf`

**Files modified:**
- `site/src/App.tsx` — `/cv` route added
- `site/src/routes/DeskRoute.tsx` — `ResumePaper onClick` now `navigate('/cv')`
- `site/src/components/desk/ResumePaper.tsx` — aria-label "View resume — coming soon" → "View CV"

**Why Mary Kim specifically:** Her `me, mushroom, and the world` zine operates in a two-color (blue + paper) palette identical to ours, and her grammar — italic-roman interplay at display scale, text hugging edges, typographic specimen grids — maps cleanly onto a CV that needs to feel authored rather than auto-generated. Using her moves on the CV page also proves the visual system scales past the desk metaphor into flat editorial.

**Rejected approaches:**
- *Draggable timeline scrubber* across the top — interesting, but inflates engineering scope and competes with the role headers for attention.
- *Filter-by-skill affinity view* — too ambitious for v1; revisit if users ask for a scan-by-competency mode.
- *Verbatim résumé voice everywhere* — read too LinkedIn next to the CHAI case study's literary register.

**Global scroll:** The site's html/body is `overflow: hidden` to keep the desk pinned to one screen. `CvRoute` temporarily flips both to `auto` via `useEffect` cleanup so scrolling works only on this route.

---

## 2026-04-19 · Interactive desk background: dot grid + hidden marginalia

**Decision:** Two new layers behind the desk objects, ported from the `bg-interactive.html` prototype.

1. **Bullet-journal dot grid** (`DeskDotGrid.tsx`) — canvas-drawn ink dots at 28px spacing, 1.25px radius, 0.22 alpha. Within 140px of the cursor, dots are pushed radially outward with eased falloff (force² × 42px max push). Current position eases toward target at 0.12/frame — this mass/lag is the whole charm. Canvas rebuilds on resize (150ms debounce), not every frame.
2. **Hidden marginalia** (`DeskMarginalia.tsx`) — nine handwritten notes + one SVG arrow, positioned by viewport percentage. Default invisible; within 180px of the cursor they fade to min(0.92, t² × 1.1). Three typographic variants: Caveat (default), Fraunces italic, JetBrains Mono caps.
3. **Shared cursor hook** (`useCursorPosition.ts`) — returns cursor x/y as mutable refs (not state) so the 60fps RAF loops don't trigger React re-renders.

**Tuning constants preserved verbatim from prototype:** SPACING=28, DOT_RADIUS=1.25, DOT_ALPHA=0.22, REPEL_RADIUS=140, MAX_PUSH=42, EASE=0.12, REVEAL_RADIUS=180. All surfaced as named constants at the top of each component for later tuning.

**Vignette upgraded:** from `rgba(0,0,0,0.08)` to `rgba(70,55,30,0.22)` to match the prototype's warmer, stronger framing. z-index raised to 6.

**No intro tease:** The prototype briefly reveals all marginalia on load for review legibility. Omitted in production — the interaction is discovered, not taught.

**Reduced motion:** Dot grid renders static (no repulsion, no easing). Marginalia sits at 50% opacity, no proximity reveal. Both cross-fade into the static state via CSS transition, per the guideline's "dignified, not instant" rule.

**Performance:** Single RAF loop per component. No setState inside animation loops. Canvas rebuilds on resize only. 60fps verified on retina 1440×900.

**Source:** `03-prototype-explore/bg-interactive.html`, `00-brief/prd-homepage-desk.md` v0.3.2.

---

## 2026-04-19 · Cat Roulette v0.3.2: label outside disc, specimen card reveal, default caption

**Decision:** Three refinements to the Cat Roulette after seeing it in context.

1. **Label moved outside the disc.** The curved `<textPath>` arc inside the frame was unreadable at 160px. Replaced with a flat mono label `FIG. II — YOGURT ROULETTE` above the module — clearer hierarchy, reads as a figure label on a notebook page.
2. **Specimen card reveal.** After a spin, the selected cat appears at 200px in a bordered paper card above the disc (500ms, overshoot settle). Gives the drawings the stage they deserve — the 44px wheel thumbnails were too small for the detail in the hand-drawn PNGs.
3. **Default caption as call-to-interact.** Caption reads "roll for yogurt" before first click instead of showing the initial pose's label. Clearer affordance — visitors know the disc is spinnable without guessing.

**Also:** Spin duration shortened from 5.2s to 3s (felt sluggish). Disc scales to 1.15× on click start and settles back on land. The selected segment dims to 25% opacity in the wheel while the specimen card is showing.

**Source:** `00-brief/prd-homepage-desk.md` v0.3.2.

---

## 2026-04-19 · Cat Roulette: real drawings land; pose set shifts from `content`/`purifier` to `yarn`/`sleep`

**Decision:** Replace the placeholder inline-SVG cats with six hand-drawn PNGs. Two poses change to match the actual drawings:
- `content` → `sleep` (curled up asleep)
- `purifier` → `yarn` (lying with a yarn ball)

Captions rewritten in a more deadpan cat-voice: "long mode: engaged," "where is the food," "this is my chair now," "belly access: granted," "the yarn lost," "currently unavailable."

**Why the pose swap:** The drawings don't include a content/smug-face pose or an air-purifier pose — the closest moods in the six I have are a curled sleep and a yarn-play. The roulette is stronger when every segment is a drawing I actually have, so I swapped the data to match reality instead of asking for re-draws.

**Implementation:** `YogurtSVG.tsx` still exports the same component name (to avoid touching `CatRoulette.tsx` imports) but now renders an `<img src="/cats/{pose}.png">` with `mix-blend-mode: multiply` so the drawings' white backgrounds drop out against the roulette's paper fill. `site/public/cats/` holds `lounge.png`, `feed.png`, `caught.png`, `belly.png`, `yarn.png`, `sleep.png`.

**Source:** `00-brief/prd-homepage-desk.md`.

---

## 2026-04-19 · Homepage v0.3.1: pen returns to the right; roulette grows its own pointer

**Decision:** Revert the pen to a right-side desk prop (diagonal, near the notebook's lower-right corner). The roulette gains an internal ink-triangle pointer notched into its static frame at 12 o'clock.

**Why:** Pinning the pen to the roulette made the left side feel top-heavy and forced a rotation/translate stack that was hard to tune across reduced-motion and entrance states. More importantly, the pen-as-pointer turned the pen into a dedicated device — but the desk is stronger when each object reads as *a thing on a desk,* not as *a UI affordance.* A small pointer integrated into the roulette's own frame is clearer, less crowded on the left, and lets the pen go back to being a prop that balances the right edge near the notebook.

**What changed:**
- `Pen.module.css`: left:52% / top:64% / rotate(-32deg); no custom transform-origin, no nib pinning.
- `DeskRoute.module.css`: `penRoll` keyframe restored to roll-in-from-right (rotate -45 → -32, translateX 30 → 0).
- `CatRoulette.tsx`: small ink triangle added to the static frame at 12 o'clock (`M 80 2 L 75 11 L 85 11 Z`), pointing inward.
- PRD v0.3 text on pen-as-pointer superseded.

**Rejected:** Keeping the pen pinned but with a tighter easing; a floating arrow near 12 o'clock outside the frame (read as a separate UI sticker, not part of the object).

**Source:** `00-brief/prd-homepage-desk.md` v0.3.1.

---

## 2026-04-19 · Homepage v0.3: Cat Roulette replaces the empty left side

**Decision:** Place a small paper-disc roulette, left of the notebook, with six hand-drawn poses of Yogurt (my British Shorthair). The pen becomes the roulette's pointer. Click the disc to spin; it settles on a new pose and a handwritten caption crossfades below.

Six poses: *lounge, feed, caught, belly, content, purifier*. Caption voice is cat-first-person, a little vain: "long mode activated," "where is the food," "i am perfect," etc.

**Why:** The desk read right-weighted — notebook center, resume and about hugging the right edge — with empty paper on the left. An object there pulls the composition into balance. I wanted something that behaves like an EDC fidget toy (hakim.se/spiral energy) — clickable, quietly satisfying, not a feature. A roulette suits the desk metaphor better than a spinner or marble: it's a paper object, it uses the pen I already had drawn, and it admits my cat onto the portfolio without the try-hardness of a portrait or quote block.

**Why cats / why Yogurt:** A working senior designer is allowed one personal tell on the homepage. A roulette of my cat is self-aware, specific, and hard to mistake for generic SaaS. The label voice keeps it on the right side of cute.

**Rejected:**
- Marginalia text / handwritten note on the left — too static, no fidget reward.
- Marble-in-a-track — more code and physics for a weaker metaphor on a desk (marbles aren't desk objects; pens and dice are).
- Single spinner coin — readable as one fidget move but less room for personality; a roulette gives six micro-surprises.
- Dice — clever but too abstract; Yogurt is the point.

**Notes:**
- The current cat SVGs in `YogurtSVG.tsx` are placeholders. Real hand-drawn assets will be generated from the six reference photos (one prompt per pose, monoline, ink-blue on paper). Do NOT ship v1 with placeholders.
- Pen pivots around its nib (`transform-origin: 4px 7px`) so rotation reads as the nib pointing at the wheel, not the pen orbiting a random axis.
- Entrance choreography: roulette drops in at 1200ms with a small overshoot; pen lands above it at 1900ms as the final piece, after which the pen arrives as *pointer*, not as loose desk clutter.

**Source:** `00-brief/prd-homepage-desk.md` v0.3. Research: `00-brief/references/fidget-toys.md`.

---

## 2026-04-19 · Homepage v0.2: flat-lay, drag removed, interactivity as design pillar

**Decision:** Three shifts to the homepage desk after review of the first implementation.

1. **Perspective dropped in favor of flat-lay.** The v0.1 angled view (15–25° `rotateX`) couldn't pay for itself without extensive depth cues. Without them, the scene read as "three objects on a cream background" — the metaphor was described, not rendered. Flat-lay (straight overhead) commits to the object-ness of the composition without needing the 3D illusion. Reference is editorial flat-lay photography (Kinfolk, object studies), not a simulated desk.
2. **Drag-and-drop removed.** It was a novelty that didn't serve the thesis ("I make complex, invisible systems handleable"). Tactile hover — small lift, deeper shadow — preserves the "these are objects" feel without the drag machinery, and simplifies the accessibility story.
3. **Interactivity promoted to a design pillar.** Four signature moves in v1: composing-on-load, ambient light, object micro-personalities, parallax-without-tilt. Plus the notebook-opening transition as the signature WOW moment (most of the craft budget concentrates there). Drag-and-drop is gone; replaced by per-object personalities (notebook breathes, CV curls at a corner, About card has a crease, pen rolls on cursor approach).

**Why:** Review of the initial v0.1 build showed the metaphor wasn't landing. Mr. Panda's Psychologically Safe Portfolio was the reference for how much personality a scene can carry without tipping into gimmick — the toolkit translates, the aesthetic doesn't. Yankun's desk is Mr. Panda's techniques in a different voice: editorial, literary, two-color, Fraunces-set. Studio at midnight, not kid's adventure.

**Rejected:** Keeping perspective but adding missing depth cues (desk edges, heavy lighting, prop density) — too expensive, still probably wouldn't land. Full commitment to a Mr. Panda-style scroll-journey — wrong register for Yankun's brand.

**Source:** `00-brief/prd-homepage-desk.md` v0.2. Reference: Mr. Panda's Psychologically Safe Portfolio (for technique).

---

## 2026-04-18 · Field Notebook selected over Liner Notes

**Decision:** Field Notebook wins as the portfolio spine.

**Why:** The process/polish spread dialectic is a stronger thesis about how Yankun works as a senior designer. The notebook metaphor accommodates varied work naturally and lets process be a first-class citizen.

**Rejected:** Liner Notes (strong but the gatefold interaction is harder to make work on mobile), Broadside (strong but less warm), Score (too much decoding).

**Source:** `00-brief/architecture-plan.md`

## 2026-04-18 · Desk scene replaces bare cover as homepage

**Decision:** The homepage is an angled desk scene with physical objects (notebook, resume paper, personal object) instead of a single floating notebook cover on a blank background.

**Why:** A single cover floating in space is one-note. The desk scene solves "what does this person do?" in 3 seconds — three objects, three clear paths. No nav bar needed. The desk *is* the navigation. It also creates room for personality (decorative objects, draggable interaction) without resorting to a hero section.

**Details:** Angled perspective view (~15–25° from horizontal), not top-down. Objects are draggable for delight. Resume paper and about-me object are placeholders for v1 pending assets.

**Source:** `00-brief/prd-homepage-desk.md`

## 2026-04-18 · Spatial canvas/pinboard replaces paginated book interior

**Decision:** Opening the notebook reveals a spatial canvas (pinboard + canvas hybrid), not a paginated two-page book.

**Why:** The book metaphor forces linear navigation, makes every project feel the same size, and puts all the craft budget into simulating paper instead of showcasing work. The canvas frees the layout — CHAI gets a big cluster, stubs get small ones, and the spatial arrangement itself communicates hierarchy. Projects are clusters of artifacts (screenshots, sticky notes, metrics) composed by hand, not placed on a grid.

**Rejected:** Paginated book with page-turn interaction (felt like a digital magazine), accordion/unfolding layout (interesting but harder to scan), full zooming canvas à la Figma (too ambitious for v1).

**Details:** Canvas is ~3–4 viewports wide, bounded. Click a cluster to zoom into the project as a vertical scroll case study. Positions are hand-composed, not algorithmic.

**Source:** `00-brief/prd-notebook-canvas.md`

## 2026-04-19 · Canvas v0.6: field notebook page identity

**Decision:** Rethink the canvas holistically — it's a designed notebook page, not a layout surface.

1. **Poster card deleted.** The thesis statement is no longer a card. It becomes large-scale text rendered directly on the canvas surface — like a heading someone wrote on a notebook page. The bookplate content (Yankun, VOL. V) becomes margin furniture.
2. **Cards lose explicit borders, gain shadows.** Cards are defined by resting drop shadows (like photographs placed on paper), not by 1px borders. On hover the shadow deepens and the card lifts. This makes cards feel like physical objects on a surface.
3. **Grid strengthened.** From `--ink-faint` (0.08) to `--ink-muted` (0.2). The grid is the paper's identity — it should be clearly visible, like a real field notebook.
4. **Featured card (CHAI) scaled up** to 420–440px. It dominates the page. Screenshots are bigger relative to card area — less padding, more image.
5. **Page furniture.** Running header, footer, and bookplate metadata integrated into canvas margins.

**Why:** The previous canvas was a neutral surface with objects competing for attention. A real field notebook page has identity — visible grid, page numbers, headings, clippings. The thesis text as surface typography creates a brand moment without a separate card fighting the project cards for space. The shadow-defined cards feel like physical objects (clippings, photos) placed on the page.

**References:** Typographic poster designs (bold text as environment), product photography (objects with shadows on surfaces), field notebook aesthetics (visible grid, page numbers, annotations).

---

## 2026-04-19 · Canvas v0.5: visual refinement after first implementation

**Decision:** Refinement pass after seeing the v0.4 build:

- **Rotation returns** (±1–2°). Axis-aligned cards on a grid looked like a UI layout, not a pinboard. Slight tilt restores the hand-placed quality.
- **Poster card scaled up** (~500px+ wide, thesis at 44–56px). It was the same visual weight as the CHAI card — needs to dominate as the arrival moment.
- **Standard cards get slight width variation** (220px / 240px / 260px) to prevent the copy-paste feeling.
- **Featured card border thickened** to 2px (standards stay 1px) for a third level of visual weight.
- **Choreographed entrance sequence**: grid draws in → poster card → featured card (with settle overshoot) → standards one by one. Stagger order = reading order.
- **Responsive grid on hover**: grid lines near a hovered card brighten subtly (opacity 0.08 → 0.15).
- **Page-level running header/footer** in JetBrains Mono (`WORKS · VOL. V` top, page number bottom) — reinforces notebook-page metaphor.
- **Impact lines set all-caps, wider tracking** (0.15em) to read as punchlines not footnotes.
- **One hand-drawn SVG mark** on the canvas — underline or arrow near the poster card. One only.

**Cut:** Connector lines between cards (adds clutter without enough payoff at 4 cards).

**Source:** `00-brief/prd-notebook-canvas.md` v0.5

---

## 2026-04-19 · Canvas v0.4: poster card replaces split panel

**Decision:** The statement is not a panel — it's a poster card pinned to the canvas alongside the project cards. Same surface, same container language (border, background, padding), just bigger.

**Why:** The 30/70 split felt like two separate experiences stitched together. Making the statement a card on the canvas keeps everything on one surface. The poster card is bigger than any project card (~450px vs ~380px/~240px) but uses the same visual language, so it reads as part of the collection — not a hero section, not a marketing banner, just the largest card on the board.

**Details:** Poster card uses `--paper-soft` background like standard project cards. Contains bookplate (who), thesis statement (poster typography), and page metadata. Not interactive. Positioned on the left side; project cards fill the center and right.

**Source:** `00-brief/prd-notebook-canvas.md` v0.4

---

## 2026-04-19 · Canvas v0.3: 30/70 split, statement panel, card containers

**Decision:** Three further refinements to the canvas after visual reference review:

1. **30/70 split layout.** Left panel (30%) is a static statement panel — bookplate + typographic thesis statement, poster-like. Right panel (70%) holds the project cards on graph paper. Reads like a magazine spread: editorial splash left, work right.
2. **Card containers with backgrounds.** Cards are no longer transparent content on the canvas — they have visible container panels (border + background). Featured card (CHAI) uses inverted colors (`--ink` bg, `--paper` text) to be the loudest object. Standards use `--paper-soft`. Metadata bar (fig number + year) sits at the top of each container.
3. **No rotation.** Cards are axis-aligned rectangles. Montage feeling comes from the container backgrounds and asymmetric placement, not from tilt.

**Why:** The statement panel gives the canvas an arrival moment — personality before the eye moves to work. Card containers create the photomontage/specimen-card feeling (objects on a surface) without rotation chaos. The inverted featured card creates hierarchy without needing a dramatically different card size.

**References:** Field Notebook inside-cover page (statement energy), Sutera.ch (card containers with decorative frames), photomontage collage art (objects-on-surface texture).

**Source:** `00-brief/prd-notebook-canvas.md` v0.3

---

## 2026-04-19 · Canvas redesign: viewport-fitted, unified cards, graph-paper grid

**Decision:** Three changes to the works canvas after first prototype review:

1. **Viewport-fitted layout** replaces the 3200×1800px pannable canvas. All projects visible at once, no panning, no grab cursor. Card positions use percentage offsets so the layout adapts to browser size.
2. **Unified card format** replaces the full-cluster/stub-cluster split. Every project uses the same anatomy: number label (fig. 01), screenshot plate, title, impact line. Two sizes only (featured vs. standard) for hierarchy. Sticky notes, wobbly circles, and subtitles removed from the canvas — those move to project detail pages.
3. **Graph-paper grid background** replaces the dot grid. Ruled lines at 40px intervals using `--ink-faint`. Reads immediately as "sketchbook page."

**Why:** The pannable canvas hid projects — users couldn't see all work at once. The full/stub card split created visual inconsistency. The dot grid was too subtle to establish the sketchbook metaphor.

**References:** Sutera.ch (viewport-fitted spatial layout, all projects visible, grid background), Jason Kim (consistent card format, clear information hierarchy).

**Source:** `00-brief/prd-notebook-canvas.md` v0.2

---

## 2026-04-18 · Project detail is vertical scroll, not spread

**Decision:** Individual case studies are vertical-scroll editorial layouts, not two-page spreads.

**Why:** Freed from the book format, there's no reason to constrain case studies to paired pages. Vertical scroll allows natural editorial pacing — vary the rhythm with plates, pull quotes, metrics, and whitespace. It's also a more familiar reading pattern for long-form content.
