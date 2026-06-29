# Competitive review — four portfolios vs. yours

Studied 2026-06-14. Sites: Jackie Hu (jackiehu.design), Emmi Wu (emmiwu.com),
Sanvithi Saya (sanvithi.com/explora), Zhiyuan Chen (zhiyuanchen.com). All four
are Framer builds.

Framing per your call: **best ideas, constraints ignored.** Where a suggestion
breaks your locked vibe guideline, it's flagged `[breaks guideline]` so you can
decide what's worth changing.

---

## What each site does well (one line)

- **Jackie Hu** — playful collage homepage with interactive physical objects (polaroids, AirDrop card, a video player at 1:10/3:32). Closest cousin to your desk metaphor, and more alive than it.
- **Emmi Wu** — every project is a *video*, not a screenshot. Motion is the product preview. ASCII-art garden footer as a signature closing.
- **Sanvithi Saya** — the strongest *case study* structure of the four: TL;DR (Problem/Solution/Result) up top, giant impact metrics, then the deep dive. Each design decision tied back to a named insight.
- **Zhiyuan Chen** — razor positioning. The hero tells you who he is in five words ("AI-savvy · High-velocity · IDEA winner") and what he's doing right now. Projects carry status + domain tags.

---

## 1. Landing / homepage (your desk)

The desk metaphor is more original than any of these four. The risk is it's a beautiful room that doesn't *say* anything in the first three seconds. Zhiyuan's hero positions him before you scroll; your desk makes a visitor decode the metaphor before they learn what you do.

- **Put your positioning line on the desk surface, not behind the notebook.** Zhiyuan: "AI-savvy · High-velocity · IDEA winner" + "Currently @ Bobyard, building the most powerful AI engine behind project estimation." You have a sharper line already written — *"I make complex, invisible systems handleable."* Surface it as the one piece of running text on the desk. Right now your strongest claim is buried inside a case study.
- **Give the desk objects micro-stories, not just nav.** Jackie's objects perform: an AirDrop card reads "Jackie would like to share a photo / Decline · Accept," a video player shows a real timestamp. Your resume paper and about object are placeholders. Make each object do one small thing that reveals personality — the resume paper half-folded with a coffee ring, the about object a physical thing that says something true about you. Objects should reward a look even if never clicked.
- **State liveness immediately.** Both Jackie ("Currently cooking ☺") and Zhiyuan ("Currently @ Bobyard") show a live status on the landing. You have a "Currently" meta card but it lives on the canvas. Move a one-liner to the desk so the site feels maintained, not shipped-and-abandoned.
- **First-paint problem.** A 3D-perspective desk that animates in is your signature, but it's also the slowest possible hero. Emmi ships *separate* desktop/tablet/mobile load-in videos to control that moment. Decide what the desk looks like at 0.0s — a static composited frame that's already legible, not a blank paper waiting for JS. `[partially breaks guideline if you add a video poster, but worth it]`
- **One ambient motion on the desk.** [breaks guideline — "weighted, paper-like" only] Jackie's desk has gentle life (the video plays, objects feel touchable). A single slow ambient loop — steam off a cup, a page corner lifting in a draft — would make the desk feel inhabited rather than staged. Keep it to one.

## 2. Project overview (your canvas)

Your canvas is the most editorially refined overview of the set, but it's also the most *static*. Emmi and Zhiyuan both make their overview do triage work: status, domain, and a live preview, all scannable in one pass. Your museum labels are beautiful but make the founding-designer skimmer work.

- **Add a tag taxonomy to the plates.** Zhiyuan tags every project with status (Shipped / In Progress / Award-winning) and domain (Gen AI, Ed-tech, LLM, Fintech). A skimming hiring manager filters by these in their head. Your mono captions can carry the same: `Shipped · AI · Enterprise` under each plate. Pure addition to your existing caption system.
- **Lead each plate with a one-line value prop, not just a title.** Jackie: "Zenly — Live map of close friends and family." Emmi: "Comet Voice Mode — Bringing AI voice navigation into the desktop browser." Right now your plates read as titles + label. Add the 6–10 word "what it is" so the canvas is legible without opening anything.
- **Make the plates move on hover.** [breaks guideline — static screenshots only] This is Emmi's whole thesis: a still UI shot undersells interaction design; a 2-second loop sells it. A restrained hover that swaps the static plate for a short muted loop would close the single biggest gap between your canvas and theirs. You can keep the still as the rest-state and the poster frame, so it stays paper-quiet until touched.
- **Establish a clear hero vs. rest hierarchy.** Jackie splits "Recently Made" (featured, shipped products) from "Other Work" (everything else). Your four plates currently read as peers. CHAI is your hero evidence — give it a larger column span / denser treatment so the eye lands there first. You already allow span variation; use it to rank, not just to compose.
- **Time-stamp the work.** Emmi labels every project with a season ("Perplexity — spring 2026"). Dates signal recency and momentum. Add year/season to the mono caption.

## 3. Visual & motion

You win on visual *system* — the two-color ink-on-paper discipline and Fraunces are more distinctive than the Framer-default polish these four share. Where they beat you is *motion as evidence of craft*. Three of the four use video heavily; you use none.

- **Adopt motion as a portfolio claim, not decoration.** [breaks guideline] Emmi and Zhiyuan prove "I can prototype / I understand interaction" purely through motion. Your claim #2 is "taste and craft" — motion is the cheapest, most visceral proof of it. Budget real craft into 2–3 signature moments (you already named the desk→canvas portal) and let everything else stay still.
- **Signature easter egg / closing moment.** Emmi's ASCII garden ("To plant a garden is to believe in the future") and Sanvithi's handwritten footer ("hey there, dear internet surfer… created in San Francisco & Bangalore") are the most memorable things on either site, and both cost almost nothing. You have cat roulette and marginalia in the same spirit — make sure one of them is a true *signature* people screenshot and share.
- **A "playground" surface for non-case-study craft.** Both Emmi and Jackie keep a playground / "Other Work" zone for explorations that don't earn a full case study. It signals range and that you make things for fun. You scoped this out for v1 — worth a v2 line item; it's where "I think interestingly" (claim #4) lives cheapest.
- **Respect the thing you already do better:** none of these four have a coherent type-and-color *system* — they lean on Framer defaults and stock motion. Don't trade your ink-on-paper restraint for their busyness. The move is to add *targeted* motion, not color and clutter.

## 4. Project detail (your case study)

Sanvithi's Explora is the template to beat here, and it's worth studying section by section — it's a masterclass in pacing a single case study.

- **Open with a TL;DR triad: Problem / Solution / Result.** Sanvithi states all three in three sentences *before* the deep dive, so a busy reader gets the whole story in 15 seconds and chooses whether to read on. Your voice rules say "lead with a moment, not a problem statement" — keep your narrative opening, but add a scannable Problem/Solution/Result strip right under it for the skimmer. Both audiences served.
- **Hero your metrics, with plain-language sub-captions.** Sanvithi: `$1.2M` / "Recovered in productivity — based on ~1 hr/day saved per user," `100%` / "Org-wide adoption," `9→1` / "Systems consolidated." Big number, then a human sentence explaining it. Your CHAI numbers (3%→18% adoption, 86% no-result drop, 14% entry points) deserve exactly this treatment — oversized Fraunces numerals with a mono sub-caption. This is the single highest-leverage upgrade to the CHAI study.
- **Tie every design decision back to a named insight.** Sanvithi: "the Split-Workspace Grid… directly supports the insight that researchers reason in parallel." Each feature names the insight it answers. This is what separates a case study from a screenshot gallery — do it for each CHAI proof beat (incl. the Smart Search beat).
- **Number and pace the design sections.** She uses "Design 1/3, 2/3, 3/3" — the reader always knows how much is left. For a vertical-scroll study, this pacing keeps people moving. Map your CHAI beats to a numbered spine.
- **Inline metadata, not a résumé box — but make it scannable.** Sanvithi puts role/team/scope/surface in a tight "Details" block. Your voice rule forbids "My Role · Team · Timeline" boxes, and rightly. The compromise: weave it into one mono line at the top (`Founding designer · 13 months · shipped`) the way she actually does in her hero tags — scannable without being a corporate box.
- **Bookend with personality.** Sanvithi ends "happily ever after / fin." — which would land *perfectly* in your notebook metaphor (a closing page, a sign-off). Your case studies should end like a notebook entry closes, not just stop.
- **Show what you'd do next.** Both Sanvithi and the others include a "What I'd do next" section. It signals you're still thinking past ship date — strong for the founding-designer audience. One short section per study.

---

## The three highest-leverage moves

1. **Surface your positioning line on the desk.** You've already written the best tagline of the five — *"I make complex, invisible systems handleable."* Stop hiding it.
2. **Hero the CHAI metrics with sub-captions** (Sanvithi's number + human sentence). Biggest single upgrade to your hero evidence.
3. **Add motion as proof of craft** — hover-loops on canvas plates and 2–3 signature transitions. It's the one dimension where all three video-forward sites beat you, and it directly proves claim #2.
