# References — craft level-up

A working set of inspiration for pushing the visual, interaction, and craft on the three signature surfaces. Curated to skip what you've already studied (Mary Kim, Sutera, Maxime Dessain, hakim.se, Bruno Simon, Jason Kim, Mr. Panda, Kinfolk).

How to use this: each surface has two **hero refs** (worth opening, sitting with, and stealing specific moves from) and a **list** of secondary refs with a one-line steal note. Where a ref breaks the two-color discipline, the editorial-plate register, or requires a 3D engine, it's flagged inline.

---

## Surface 1 · Desk / landing

The brief: a flat-lay editorial composition that *is* the navigation. Objects as portals. Plate chrome. Two colors. No nav bar.

### Hero · Active Theory — anything they ship

`https://activetheory.net`

Not a desk metaphor. The reason to study it: every Active Theory case study landing is built around a single staged hero that loads with deliberate sequencing — type assembles, props enter, the scene becomes *composed* rather than appearing. Watch the opening of any project page (e.g. their Adobe or Google work). The choreography is the brand.

**Steal:** the *sequencing* of element entrances on first load. Yours used to be the composing-on-load animation and you cut it for the Swiss register. Active Theory shows how to keep deliberate entrance pacing without theatricality — every element has an in-time, an ease curve tied to how heavy the object should feel, and the sequence ends in a settled state that reads as "now you may interact." A two-color editorial plate can do this; the moves transfer.

**Don't steal:** their full WebGL/GSAP rigs, or the volume of motion. Your composition has to settle into stillness; theirs lives in perpetual breathing. Take the *first 2 seconds*, drop the rest.

### Hero · Studio Carreras

`https://carreras.tv`

Type-led, two-color-ish (heavy black on cream), plate-feeling homepage with scattered figure references and a strong sense of "I composed this page deliberately." The move worth studying: how a *largely static* homepage carries personality through micro-detail — a quietly animated date stamp, a single hover that shifts type weight, a mono running header. No hero block, no scroll-jacking.

**Steal:** the discipline of a homepage that *doesn't move much* but rewards close looking. One small live signal (date, visitor count, currently slot, last-updated stamp) does enormous work. The relationship between display Fraunces and a mono caption layer is right there.

**Don't steal:** the all-caps display register — it'll fight Fraunces' romantic italics. Stick to your italic + roman interplay.

### List

- **Robin Mastromarino** — `https://robinmastromarino.com` — paper-and-print homepage with layered scenes; steal the *cursor-as-spotlight* effect over typography, and the way images sit as physical objects with subtle occlusion shadow.
- **Tobias van Schneider — old "DESK" portfolio archive** — search his Are.na for "desk" — exact predecessor of your metaphor, executed differently; steal the figure-numbered objects-as-list inventory.
- **Folks at Order** — `https://orderdesign.co` — agency homepage as a deliberate plate; steal the way credits and figure metadata sit in the corners and never fight content.
- **Frank Chimero** — `https://frankchimero.com` — typography-only landing; steal his use of italic Fraunces-ish display at small-but-confident size, no hero, no scroll prompt, just a paragraph that earns attention.
- **Internet Phone Book** — `https://internetphonebook.net` — handcrafted directory with print-feel cards; steal the way each card has its own micro-typography rather than a global card style.
- **Cyd Stumpel 2025** — `https://cydstumpel.nl` — uses native View Transitions API for page changes; steal that specific API for desk → canvas (cheaper, more reliable than a custom portal).
- **Atipo Foundry homepages** — `https://atipofoundry.com` — type foundries are basically running editorial plate exercises; steal their figure caption discipline and their "specimen sheet" framing.

### What's harder than it looks

A scene-as-nav homepage usually fails on **idle state** — the second after entrance is when it either looks like a frozen mockup or a living page. Active Theory and Robin Mastromarino both invest specifically in the *post-entrance idle* (a date ticking, a single ambient cursor effect, a one-piece-of-furniture micro-animation). Your roulette + currently slot already do this work. Pressure-test whether they're enough.

---

## Surface 2 · Canvas / works pinboard

The brief: viewport-fitted pinboard. Hand-composed clusters. Graph-paper page. Slight rotation. Drop shadows define cards. Featured + standards. No grid algorithm. Pan only for v1.

### Hero · Are.na (the platform, used as portfolio)

`https://www.are.na` — and specifically: people's public channels.

The reason this matters: thousands of designers use Are.na channels as de facto pinboards. The platform itself is a near-perfect existence proof of "spatial collection of images that doesn't read as a grid." Open any channel rendered in their "blocks" view at narrow width and you'll see the asymmetric-but-readable composition you're building, executed at scale.

**Steal:** the typography-on-the-canvas treatment — block titles in mono caps, source attribution in a smaller mono, all sitting as overlay on the surface rather than inside cards. Also: how Are.na handles *aspect ratio variation* without the page falling apart. Your standard cards shouldn't all be the same proportion.

**Don't steal:** their grid snap. Are.na auto-arranges; you compose. Make sure your hand-composed advantage actually shows.

### Hero · Cosmos.so

`https://www.cosmos.so/explore`

The newer competitor to Are.na, but the relevant move is different: their *explore* page is a single dense, scrollable composition where each tile feels weighted differently. Featured items are bigger; supporting items cluster around them at varied scale. Critically — it reads as **a curated page, not a feed**.

**Steal:** the *visual weight ladder*. Your CHAI card is featured, but is the size delta dramatic enough? Cosmos uses ~3× scale jumps between weight tiers. Yours is currently more like 1.7×. Push it.

Also steal: the way they let *empty space* sit between clusters. The negative space between your project clusters is what tells the eye "these are separate works." If clusters press the page edge, the metaphor weakens.

**Don't steal:** the dark mode and saturated color palette. Anti-paper.

### List

- **Tobias van Schneider — selected works** — `https://vanschneider.com/projects` — steal the way he labels each project with an inline figure number, a year, and a one-line subtitle, all in a single typographic block, not a card.
- **Pentagram — work index** — `https://www.pentagram.com/work` — a giant grid done with editorial discipline; steal their hover state (caption appears in white-on-image at the bottom edge, never overlay-modal).
- **Spotify Design — case studies index** — `https://spotify.design/stories` — steal the way they handle a heterogeneous body of work (essays, talks, projects) on a single index page without it feeling forced.
- **Rauno Freiberg** — `https://rauno.me` — work page composed by hand, single dominant column, micro-animations on hover; steal the *quality of the hover state* (subtle lift, type weight shift, never a scale).
- **Cooper Hewitt — collection browse** — `https://collection.cooperhewitt.org` — museum collection treatment; steal the figure-caption discipline below every object and the way they handle *meta as part of the composition*.
- **The Public Domain Review — collections** — `https://publicdomainreview.org/collections` — steal the *editorial intro paragraph* at the top of each collection — not a hero, a paragraph that frames the work below. Your canvas could afford one of these above the cluster field.
- **Femke Van Schoonhoven — projects** — `https://femkesvs.com/work` — steal the inline-metric treatment in the project list (a tiny mono number/percentage next to each project title before you even click in).

### What's harder than it looks

Hand-composed canvases die on **resize**. Cosmos and Are.na cheat by re-flowing; you can't, because hand composition is the whole point. Sutera handles this by committing to a single viewport target and accepting the page is best at that width. Decide consciously whether your canvas is *responsive* (it reflows) or *fixed* (it scales to fit, with a minimum width). Mixed approaches read as broken.

---

## Surface 3 · Project detail / case study

The brief: vertical-scroll editorial. ~42em reading column in a ~62em article container. Plates break out wider. Pull quote and metric moments break rhythm. Long-form prose that feels earned.

### Hero · Stripe Press — book microsites

`https://press.stripe.com` — and specifically the individual book pages: *An Elegant Puzzle*, *High Growth Handbook*, *Working in Public*.

These are the gold standard for "an editorial site that respects long prose." Reading column is generous, type is set with real care, metric moments and pull quotes break rhythm without scroll-jacking, and the *book metadata* (publication date, edition, series) lives in mono in the margin like footnotes in a printed book — exactly the editorial-plate move you're already running.

**Steal:** the **margin column for metadata**. Stripe Press puts publication info, "On Sale," ISBN-feeling labels in a parallel column to the left of the reading text. Your CHAI page already has plate metadata in the chrome — pull more of it down into the reading flow as marginalia. The opening metadata strip (`Cisco · 2024 · CHAI`) could re-appear at intervals as the reader descends, anchoring them.

**Steal:** the way they handle **interior section transitions** — a single hairline, generous space, the next section's number and title in a small block. No section heroes.

**Don't steal:** their hero treatment (cover image at top with title overlay). Your case studies should open on a *moment*, not a hero — your voice rule covers this.

### Hero · Linear — "/method" and changelog editorial

`https://linear.app/method` and `https://linear.app/changelog`

The Method essay is the cleanest piece of long-form vertical-scroll editorial design currently in the wild for a software company. Two-column (sometimes three) discipline, generous leading, a section-numbering system (`1`, `1.1`, `1.2`) that creates hierarchy without giant H1s, and a typography-first treatment for pull quotes. The changelog uses the *same* editorial register at small scale, which tells you the system is real.

**Steal:** the **section numbering as the only heading hierarchy**. You currently lean on visual breaks (plates, pull quotes, metric moments) for rhythm — Linear shows that adding a quiet `1.1`-style numerical spine alongside that helps a reader navigate without ever needing to bold a heading.

**Steal:** the way their pull quotes use the *same typeface as body* but at 1.5–1.7× size and italic — no display swap, no color shift. You currently treat the pull quote in display Fraunces italic; consider whether that's right or whether it should sit closer to body voice (your voice rule says "cutting" — a louder pull quote tends toward declarative, which can fight the cutting register).

**Don't steal:** their dark-mode default. And their motion is too slick for paper — kill any spring physics.

### List

- **Pentagram — case studies** — `https://www.pentagram.com/work` (open any single project) — steal the way they handle *image scale variation* down a long page (hero-width plate, then half-width, then a small inset, then hero-width again) — that ladder is what stops the page reading as a slide deck.
- **Craig Mod — essays** — `https://craigmod.com/essays` — steal his *Japanese-inflected pacing*: very narrow reading column, generous gap between paragraphs, full-width image plates with single-line captions. Closest thing to a print monograph on the web.
- **Maggie Appleton — essays** — `https://maggieappleton.com/essays` — steal her use of *hand-drawn diagrams as plates* — the diagrams *are* the figures, captioned and numbered. If your CHAI page can earn one or two diagrams (not screenshots), it'll change register entirely.
- **The Pudding — visual essays** — `https://pudding.cool` — steal *one specific move*: the way data reveals are timed to the *prose beat*, not the scroll position. A single data viz that builds across three short paragraphs of text is worth ten that snap into view.
- **NYT Magazine — feature pieces** — pick a recent feature; steal the *seven-column-grid with dedicated caption column* approach — captions never fight body text.
- **Frank Chimero — old essays archive** — `https://frankchimero.com/blog` — steal the typographic discipline at small scale, especially how he handles emphasis without bolding.
- **Robin Rendle — writing** — `https://robinrendle.com/writing` — steal the running-head metadata at the top of the article (date, location, length-in-minutes) in mono, before the title. Reads as journal, not blog.

### What's harder than it looks

Vertical-scroll editorial fails on **the second half**. Most case studies are well-designed for the first 600 words and visually unraveled by the last 400. The tell: image scale stops varying, the prose column sits unbroken for too long, and the close has no typographic event. Stripe Press and Pentagram both invest specifically in the *closing third* — a final pull quote, a credits block treated as composition, a one-line outro in the margin. Your CHAI outline should plan for one event in the closing third; reflection alone won't carry it.

---

## Cross-cutting · moves I'd steal across all three surfaces

A few techniques that show up in multiple references and are worth treating as a craft layer over everything:

**Use native View Transitions API for surface-to-surface navigation.** Cyd Stumpel demonstrates the cleanest version. Lighter than a custom portal, respects reduced-motion correctly, plays well with React Router 7. Your desk → canvas portal is currently the place to invest a custom build; the canvas → project zoom is the place to use the native API and save craft budget.

**Treat metadata as composition, not chrome.** Stripe Press, Pentagram, and Studio Carreras all share one move: the publication date / project year / figure number is *part* of the typographic composition, not a sticker on top of it. Your editorial plate chrome is doing this on the desk — extend it to the project pages. The metadata strip on a CHAI page should *feel* like the spine of the page, not a header bar.

**One ambient signal per page.** Active Theory has motion ambient. Studio Carreras has a date ticker. Are.na has the connection count. Find one per surface — a single live element that proves the page isn't a screenshot. The currently slot is yours on the canvas. The desk needs one (the roulette half-counts; consider whether a quiet "since dd-mmm-yyyy" timestamp earns its keep). The project page needs one (a reading-progress hairline at the very top, set in ink, would do it without becoming a feature).

**Vary your image scale ladder.** Both Pentagram and the agent-research-flagged Stefan Vitasović 2025 portfolio use a 4–5 step image scale ladder down a long case study (full-bleed, full-article-width, plate-width, half-width, inset). Your current CHAI page uses ~2 steps. The ladder is what makes scrolling feel composed.

---

## What I deliberately didn't include

- 3D / WebGL portfolios (Bruno Simon, Chris Pokrzywa, anyone with a heavy Three.js scene). They'd be a full rebuild and the Swiss plate register doesn't admit 3D textures anyway.
- Skeuomorphic UI revival sites (the kind you've been seeing on Twitter/dribbble in 2025). Most read as nostalgia performance and break under typographic scrutiny.
- Generic "Awwwards-coded" agency sites with horizontal scroll, magnetic buttons, and a giant cursor. Strong technical craft, wrong register.
- Notion / Figma / generic design tool layouts. They're product UI, not editorial.

If any of those become useful later, easy to revisit.
