# PRD: Control Hub Agentic case study, v3 (Build replaces Bridge)

November 12, 2026 · Built, not deployed. This replaces the Bridge chapter of v2 (`prd-agentic-case-study-v2.md`). The rest of v2 stays: the answer first, the task, the decisions, how I worked, the plate system.

---

## What changed

After a closer look, the PM and engineering found that Cloud Control Workflows doesn't work for Control Hub. Yankun then designed and built a workflow builder for Control Hub on the Webex Flow Designer foundation, and the team adopted it.

The page no longer mentions Cloud Control Workflows. That was Yankun's call. Gone: the Meraki quote ("We have something similar"), the Workflows screenshots, the beat about bridging two teams, and the old 05 ("Workflows can act on Control Hub"). Leaving out the attempt to use another engine first was also Yankun's call. It isn't replaced with an unnamed clause.

## The arc: Explore → Turn → Build

| Move | Beats | Prototypes |
| --- | --- | --- |
| Explore | The agent studio, a simpler start, the intern finding, the plan inside the Assistant | 01–03 |
| Turn | "Should we pause?" Cloud Control is building Agent Builder → My call: not an agent → skills | 04 |
| Build | Why workflows → the Assistant runs a workflow (tested at WebexOne) → the workflow builder (adopted) | 05, 06 |

The run in the Assistant and the builder are now two prototypes, not one. WebexOne tested the run before the builder existed, so the map puts WebexOne between 05 and 06. Folding them back into one 05 changes the count, the map and three captions.

## Facts Yankun confirmed (November 12)

- **Why workflows over skills.** A skill is instructions the AI interprets, so two runs can take two different paths. A workflow is fixed steps the admin can read, check and run the same way every time. That's what the research brief asked for.
- **Who made the builder.** Webex Flow Designer is the foundation. Yankun's part: the Control Hub activities, some activity cards redesigned, and the settings defined for each activity.
- **Status.** The PM and engineering adopted the builder. It still hasn't shipped.
- **WebexOne.** What was tested there was the run in the Assistant (05). "Tested at WebexOne" stays on the run only.

## Page changes

- **Header:** "Six prototypes, two pivots, and the one interaction that survived both". There's no longer a second platform shift.
- **At a glance:** "Where it landed" and "Status" are rewritten for the workflows ending and six prototypes.
- **Answer:** the run video and stills stay. The caption no longer says "on Cloud Control Workflows".
- **Map:** explore · turn · build. Agent Builder stays as the ground under Turn. Flow Designer is the ground under Build ("built on"). 06 is the solid disc.
- **Build:** three beats.
  - Why: the skills-to-workflows call, in prose.
  - 05: the Assistant runs a workflow. Prose only, since the run is already shown at the top.
  - 06: the workflow builder, with Yankun's designer capture as its plate. The caption says what's Yankun's and what's Flow Designer's.
- **Outcome:** in the layers diagram, the bottom block is now the workflow designer: "Control Hub activities, my design · Flow Designer foundation". Agent Builder stays beside it as "not built".
- **Lesson 2:** keeps "know what not to build". It names both what we didn't build (a second agent builder, a builder from scratch) and what Yankun did build.
- **Credits:** the Meraki Workflows team is removed.
- **Works page (`projects.ts`):** subtitle, prototype count, status line and context line.

## Revision, November 12 (Yankun's notes)

- **The builder is the engine, shown in the answer.** The four run stills (Ask · Plan · Run · Result) are gone. Under the run video, a new block reads "The engine: Every step the Assistant runs is built here", and two builder plates follow (activity settings, then the cards). The plate heads read Builder → Assistant: the video underlines Assistant, the builder plates underline Builder. 06 keeps its prose and the workflows list, so the builder screens aren't shown twice.
- **The builder shows Clone user settings, not the run's Clone device settings.** In the prototype, Clone device settings is only a Start card in the builder. The copy calls the builder's workflow the run's sibling. Building out Clone device settings would make the run and the builder match exactly.
- **How I worked is cut.** That removes the widget studio and the playbook plates and their prose, including the line about four designers branching the codebase. The credits still list the widget studio and the playbook.
- **Not pressing play.** Without the stills, a reader who doesn't press play gets the run only from the video's poster and the hero loop.

## Revision 2, November 12 (Yankun's notes)

- **One workflow prototype, not two.** The run in the Assistant and the builder are now a single 05, "Workflows: built once, run from the Assistant". The count is back to five (01–05). On the map, 05 is the solid disc and WebexOne comes after it. The copy still ties WebexOne to the run ("We tested the run at WebexOne… Then the PM and engineering adopted the builder"). This supersedes the earlier split into 05 and 06 above.
- **Status reads "In progress"** everywhere "never shipped" appeared: the header role, At a glance, the run video's plate head, and the works page status line. Yankun's "None of these shipped as they are" (`prose.how`) describes the prototypes, not a status, so it stays.

## Copy

These are drafted by Claude from Yankun's answers. Yankun rewrites them before ship:

- `glance` Where it landed / Status
- `prose.how` (last sentence)
- `prose.p04` (the last sentence is cut; it led into the bridge)
- `prose.engine`, `prose.why`, `prose.p05`
- `prose.outcome`
- `lessons[1]`

Everything else is Yankun's existing text, unchanged apart from the prototype count.

## Assets

- `designer-canvas.png`: Yankun's capture of `/workflow-designer/clone-user-settings`, 2140 × 1302. Worth recapturing, because the inspector shows "AI is unavailable. You can edit the activity summary."
- `workflows-list.png` (1746 × 1189) and `designer-cards.png` (1964 × 1189): added November 12. 06 now reads list → activity settings → cards, one full plate each, with the prose split between the list and the designer.
- Not used: the Clone user settings global-properties view (same canvas as `designer-canvas.png`, and its panel is mostly Flow Designer's diagram settings) and List inactive devices (a canvas with only Start Flow).
- Optional later: the template gallery.
- Retired: `workflows-canvas.png` and `workflows-apis.png`. They stay on disk but are no longer referenced. `QuoteSpread` and `GroundedPanels` are no longer used on this page.

## Open

- The works page note "2 teams · Adopted my agentic strategy", plus `impact` and `canvasProofs` ("two teams"), was left as Yankun set it on November 11. Now that the page no longer names a second team, check which two teams it means.
- The Chrome Disco deck (`~/google-interview`) still tells the bridge version. It's out of scope here.
- In interviews, a reader who knows Cloud Control may ask why it isn't on Workflows. Keep one sentence ready.

## Ship

Don't deploy until Yankun has rewritten the drafted copy.
