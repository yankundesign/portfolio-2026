# PRD: Control Hub Agentic case study, v2 (the real story)

October 23, 2026 · **Built (not deployed).** Yankun's answers: Cisco's October 22 approval covers the site; ship before the deck goes to the recruiter on November 4; Claude condenses the deck notes into a first draft for Yankun to rewrite; skip the facts the deck is still missing. Implementation notes are in `decisions-log.md` (2026-10-23).

Sources: `~/google-interview/google-chrome-disco-presentation-outline.md` (slides 20–42, rev. October 23), the live Figma deck `AqYuIbxbN3x2LZCaGiQ80u`, `~/google-interview/assets/agentic/video/`, and the current page (`site/src/data/controlHubAgenticContent.ts`, `site/src/components/project/ControlHubAgenticProject.tsx`).

---

## Why rebuild

The site and the deck now tell two different stories about the same project.

| The site says | The deck says (the true version) |
| --- | --- |
| A four-surface framework: Chat, Insights, Workflow, Activity | Five prototypes, two platform moves above the team, two pivots |
| Three proofs: Compare Locations, Device Onboarding, Delete Virtual Line | One task all the way through: clone ATA-1 to ATA-2 |
| "Buy-in to demo at Cisco Live US 2026" | Tested at WebexOne. The deck's facts table marks the Cisco Live claim as unverified |
| Canvas title "Control Hub AI Agents" | The key decision is *not an agent* |
| Subtitle "agnetic" (typo) | n/a |

The Google panel may open yankun.design before or after the talk. If they do, the page has to back up what Yankun says. It must not contradict it.

There's a second reason. The pivot story suits the primary audience better. A founding designer wants to see what you killed and why, how fast you moved, and whether you build. The current page reads like a polished vision deck. The deck version shows that judgment.

---

## How hiring managers read a case study (and what that means here)

1. **They decide on the first screen.** The first screen has to answer: what it is, its status, my role, and what it ended up as. The deck holds back the full answer until 33b. A web page can't do that, because readers leave before the reveal.
2. **They read headings and captions, not prose.** So every section heading states a claim, using the deck slide titles (Yankun already approved them). Captions say who made each thing and which prototype it is.
3. **They're looking for ownership and judgment.** What did *you* decide, what did you drop, what did you do versus the team? The pivot is the evidence for all three. Don't bury it and don't smooth it over.
4. **They don't trust vision work.** Put the status at the top: prototype, never shipped, direction adopted. Saying that plainly makes every other claim on the page more believable.
5. **Many readers won't press play.** Every video needs a still strip or caption that makes the point without it, especially on mobile.

**The 60-second read (acceptance test).** Someone who reads only the header, the at-a-glance rows, the section headings and the captions should be able to say: *"Admins had a 12-screen task. Yankun prototyped five versions in code. When the platform moved, Yankun decided against an autonomous agent and chose steps the admin can check. Yankun found a team that already had the engine and put Control Hub on it. Not shipped; direction adopted; tested at WebexOne."*

---

## Page structure

About 800 words of prose in total, per voice.md. Headings are taken from the deck. Deck slide numbers are in brackets.

### 0 · Header (first screen)
- **Title:** Control Hub Agentic. Use the same title on the canvas plate.
- **Line:** one sentence, Yankun's words: the problem, plus where it landed.
- **Meta:** 2026 · Cisco Webex · Design lead · **Prototype. Never shipped. Direction adopted by two teams, tested at WebexOne.**
- **Hero:** the run as a ~12 s silent loop: task picked → plan → done. This is the same short cut Yankun is making for deck slide 23.
- **At a glance:** three rows, each a mono label and one line. These are facts; Yankun confirms the wording.
  - THE TASK · Copy one phone adapter's setup to another: twelve screens by hand.
  - MY CALL · Not an autonomous agent. Steps the admin can check, run from the Assistant they already use.
  - WHERE IT LANDED · Control Hub's tasks running on Cloud Control Workflows. Five prototypes; the platform above the team changed direction twice.

### 1 · The task — "Admins think in tasks. Control Hub is built around settings." [21, 22]
- One line of context first: after CHAI, the team wanted a north star for agentic AI. Yankun's job was to make it concrete enough to decide on.
- The ATA request in Fraunces italic, then the twelve-page path diagram. Its four numbered stops are the four pains.
- The 60% upkeep figure stays, with "directional" next to it.
- ~90 words.

### 2 · Where it ended up — "One request. A plan to approve. Every step shown." [23, 33b]
- The full run (33 s), with a four-frame strip under it: Ask · Plan · Run · Result. Each caption names the pain from §1 that the step removes.
- Label: PROTOTYPE 05 · MY DESIGN · RUNS ON CLOUD CONTROL WORKFLOWS.
- ~50 words. The answer comes early and only once. No callback later.

### 3 · How we got there — "A prototype for every question" [24–33]
- **The spine is the map**: explore · turn · bridge, with rings 01–05 and Cloud Control drawn underneath as the ground (spec under "Agentic timeline" in the deck outline). The deck cut it for time. On a page people read at their own pace, it's the skimmer's best tool. Version 1 is a static SVG. A later version could light each ring as its prototype scrolls into view, with no scroll-jacking.
- **3a · Explore** (~150 words)
  - 01, the agent studio: a still (crop of the run view from the timeline board). Built in code with Cursor; no live model.
  - 02, "Easy to start, easy to watch": video.
  - The research finding as a PullQuote: *Admins treat AI like an intern. It has to prove it can do the work.* No quote marks if it's a paraphrase.
  - 03, "The agent shows its plan first, inside the Assistant": video. One assistant, not two chatbots; built on Control Hub's front-end code.
  - Optional: a small contact sheet of retired concepts (compare locations, delete a virtual line, device onboarding), labeled by prototype number. It shows range without telling the old story.
- **3b · Turn** (~120 words)
  - PullQuote: *"Should we pause?"*, attributed to the PM. Cloud Control was building its own Agent Builder. Text only: no Agent Builder screen on a public page.
  - "Not an agent. Steps the admin can check.": the box diagram, labeled MY CALL.
  - 04, step-by-step instructions: a still cropped to the six skill cards. The 04 video is still pending.
- **3c · Bridge** (~100 words)
  - PullQuote: *"We have something similar."*, attributed to a Meraki designer.
  - The founding-designer line: *I asked for a login and built our use case on it before asking anyone to bet on it.*
  - Workflows itself appears small, in a dashed frame, labeled NOT MY DESIGN. Then what Yankun added: the Control Hub APIs and the preview before a run.

### 4 · Design it like a good intern [34–38]
Four decision rows, in the deck's decision shape. The heading is the decision. Yankun's screen is large. The option it beat is small and dashed, labeled "WEIGHED AGAINST · …". Then two or three sentences: the trade-off, and why it's worth it. ~200 words.
- **Start where admins start their day** [35]: the AI-first overview, against v1's chat beside the product.
- **Show the plan before touching anything** [36]: the workflow preview (current) beside the earlier agent plan. Prototype 01's field-by-field table could be the first rejected version.
- **Show its work** [37]: a frame of the steps running. Only show a rejected option if one was really considered.
- **Keep the record where admins already look** [38]: the audit log, against the separate Agent Activity view. Add one line on the disagreement with the PM and the compromise. The deck can't fit this collaboration beat; the page can.

> The trade-off sentences are still blank in the deck too. For hiring managers they're the most valuable sentences on the page, so write them first.

### 5 · How I worked — "I designed the states and the rules, not the screens" [39]
- The widget studio: one use case through its four states. The prototypes are code, in one codebase. Four designers branched it (show only if cleared).
- This is the evidence for positioning claim 3, *I build with AI*. ~80 words.

### 6 · Where the work went [40, 41]
- The layers diagram: the admin's task → Yankun's layer (ask → plan → approve → run → report) → Workflows (not our design). Agent Builder sits to the side, labeled "not built".
- WebexOne: one line on what was tested, with whom, and one piece of feedback. Photos only with consent, and only once it's confirmed the session is WebexOne and not Cisco Live.
- ~80 words.

### 7 · What I learned [42]
Two lines: *Prototype to decide. Know what not to build.* About 60 words around them.

### Credits
By role only. PM, eng lead, research, the Meraki/Workflows team, design leadership.

**Section rail:** Task · Answer · How we got there · Decisions · How I worked · Outcome · Lessons · Credits.

---

## Deck → site translation

| In the deck | On the site |
| --- | --- |
| A narrator carries the meaning | Headings and captions carry it; the spoken notes become prose |
| Hook on 23, full run on 33b | Short loop in the hero, full run once in §2 |
| Map cut for time | Map comes back as the spine of §3 |
| Builds (a → b) | Before/after pairs and the "weighed against" thumbnails |
| Q&A backup | Some of it becomes depth: the audit-log disagreement, prototype 01's table |
| Size shows who made what; dashed frame for other teams | Same rule: plate width plus a dashed variant and an authorship tag in the caption |
| No months on slides | Same: sequence, not calendar. Only "2026" in the header |
| At most 3 motion pieces per chapter | At most 4–5 videos, each ≤ 33 s, playing only in view (VideoPlate already does this), each with a poster |

---

## Components

**Reuse:** `ProjectHeader` (already takes `heroVideo`), `SectionRail`, `SectionHeader`, `ProseBlock`, `EditorialPlate`, `VideoPlate`, `PullQuote`, `Credits`, and the `evolutionRow` layout from `ChaiProject.module.css` (for the four-frame strip).

**Extend:** `EditorialPlate` gets an authorship tag (`my design` / `not my design` / `weighed against`) and a dashed, muted, smaller variant.

**New, small:**
- `AtAGlance`: three rows, mono label plus a Fraunces line.
- `DecisionRow`: the chosen plate (about 2/3 width), the weighed-against plate (about 1/3, dashed), and prose.
- `PrototypeMap`: inline SVG, rings 01–05, explore/turn/bridge brackets, the platform ground.
- Diagram figures: SVG on paper with no plate border, since plates are for screenshots.

---

## Asset map

| Section | Asset | Source | State |
| --- | --- | --- | --- |
| Hero | Run, ~12 s loop | Yankun's cut for deck 23; else trim `workflow-1-trim.mp4` | Pending cut |
| §1 | Twelve-page path diagram | Figma `574:774` → SVG export | Ready; mock labels still read ATA-m1/m2, fix to ATA-1/2 |
| §2 | Full run, 33 s | `assets/agentic/video/workflow-1-trim.mp4` (1846×1114) | Ready, needs a web encode |
| §2 | Four stills: ask, plan, run, result | Frames from `workflow-1.mp4`; `pdf-stills/23-run-plan.png` | Need extracting |
| §3 | Prototype map | Deck "Agentic timeline" spec; montage end frame `pdf-stills/24-montage.png` | Draw as SVG |
| 3a | 01 agent studio still | `assets/agentic-timeline-board.png`, crop | Needs crop |
| 3a | 02 video, 23 s | `agent-v2-2-trim.mp4` (1858×1118) | Needs web encode |
| 3a | 03 video, 24 s | `agent-v3-1-trim.mp4` (2400×1470) | Needs web encode |
| 3b | "Not an agent" box diagram | Figma `466:104` → SVG | Ready |
| 3b | 04 skill cards | Figma `578:737`, crop to cards | Usage charts show `%skill name%`: crop them out |
| 3c | Workflows, small | Figma `575:812` crop | Another team's product: sharing check |
| §4 | AI-first overview (+ optional 11 s video) | `site/public/images/control-hub-agentic/ai-first-overview.png`, `agent-v2-1.mp4` | Ready |
| §4 | Earlier plan, current preview | `assets/widget-studio-plan.png`; preview crop from Figma `578:771` | Ready |
| §4 | Steps running | Frame from `workflow-1.mp4` | Needs extracting |
| §4 | Audit log, Agent Activity | Figma `578:797`; `framework-activity.png` | Clean "Jack Whome", the ChatGPT/Copilot rows, `%Impacted resource%` |
| §5 | Widget studio, four states | Figma `578:790` (two screens so far) | Four-state capture pending |
| §6 | Layers diagram | Figma `574:867` → SVG | Ready |
| §6 | WebexOne photos | Figma `305:758` | Consent, plus check it's WebexOne and not Cisco Live |

**Don't use:** Figma `578:743`, part 02. It still shows a placeholder Assistant (`Run %workflow%`, "Step one…"). Use the real preview from 36 instead. If the montage video is ever used, it has a `%Skill name%` frame for about a second.

**Encoding:** MP4 (H.264) plus WebM (VP9), ≤ 1600 px wide, about 2 MB each, faststart, silent, and a poster from the first meaningful frame. ffmpeg isn't on PATH right now. The 02-assets pipelines used it, so it needs reinstalling.

**Retire from `/images/control-hub-agentic/`:** the four-surface framework set, compare-locations, device-onboarding, delete-virtual-line, create-test-agent. Keep the files; just stop referencing them, unless the optional contact sheet uses them.

---

## Elsewhere on the site

- **Canvas plate** (`projects.ts`): change the title from "Control Hub AI Agents" to "Control Hub Agentic". Status becomes "Prototypes 01–05 · direction adopted". Re-render the hover preview from the final run. Today's loop shows the agents-era prototype, which is the version the story moves away from.
- **CHAI "Next"**: already written. Check it still hands off to the new opening (explain → act).

---

## Open questions (blocking first)

1. **Sharing scope (blocking).** Cisco approved the deck's screens on October 22. Does that cover a public website? A public page is a different audience than a panel. Agent Builder stays off either way; Workflows shows only if cleared.
2. **Timing.** The panel may visit the site. Ship before November 4, or after November 5?
3. **Copy.** Hard rule: no AI prose in case studies. Two options: Yankun writes into the slots, or I condense the deck's spoken notes (Yankun's own words) into the slots as a starting draft for Yankun to rewrite.
4. **Facts still blank in the deck too:** the trade-offs (35–39); WebexOne specifics; whether the APIs were wired in or only specified; and speed facts. "First Workflows login to a working ATA clone in N days" is the strongest single line for a founding-designer reader.
5. **The existing participant quote** ("I could see it making Control Hub even easier…"). If it came from the prototype 02 study, it belongs on the intern finding (deck 27 asks for exactly this).

## Phasing

- **Phase 0 · honesty patch (about 30 min, safe to ship any time):** fix "agnetic"; set the status to "Prototype · never shipped"; remove the Cisco Live claim; drop "AI Agents" from the canvas title.
- **Phase 1 · structure and assets:** new page skeleton, real headings, encoded videos, exported diagrams, the new components. Don't deploy with visible `TodoSlot`s, since they render on the live site.
- **Phase 2 · copy:** Yankun fills the prose, trade-offs first.
- **Phase 3 · polish:** scroll-lit prototype map, canvas preview re-render, mobile crops.
