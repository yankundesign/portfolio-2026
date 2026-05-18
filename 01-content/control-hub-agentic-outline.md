---
project: Control Hub Agentic Experience
status: outline - structural beats, no final prose yet
portfolio_position: project no. 2, after CHAI / Control Hub AI
target_length: 650-900 words
last_updated: 2026-05-12
source_context:
  - /Users/yankunwang/portfolio-2026
  - /Users/yankunwang/agentic-demo
---

# Control Hub Agentic Experience - portfolio outline

This is the structural outline for the second portfolio case study. It should
read as the next chapter after CHAI, not as a separate AI demo.

CHAI proved that Control Hub admins did not just need an answer. They needed to
understand how the assistant got there. The Agentic Experience picks up the next
question: if the AI can reason, when should it be allowed to plan, execute, and
leave an audit trail inside Control Hub?

This outline is intentionally not final prose. Use it to decide the narrative,
screens, captions, and missing facts before writing the essay.

## Working metadata

- Title: Control Hub Agentic Experience
- Canvas title: Control Hub Agentic
- Subtitle option: Designing how AI plans, acts, and stays accountable inside an enterprise admin console.
- Context: Cisco Webex Control Hub, 2026
- Role: Product Designer / design lead
- Work type: Product vision, interaction model, prototype, design system patterns
- Status: Cisco-internal prototype / product direction exploration
- Portfolio relationship: Project no. 2, following CHAI
- Impact line to confirm: Direction-setting prototype for leadership review; framework for chat, workflows, and activity/audit across agentic use cases.

## The thesis

The project is not about making Control Hub "more autonomous." The stronger
argument is narrower and more senior:

> I designed the contracts that let AI act in an enterprise admin system without
> taking control away from the admin.

Those contracts are:

- Chat as the front door for fuzzy intent.
- Structured widgets when text is not enough.
- Plan review as a commit moment, not a form.
- Execution that is visible, interruptible, and reversible where possible.
- Reports and Activity as the audit trail, not a separate AI log.

Avoid making the case study about an "agency ladder" or L1-L5 autonomy. That
language was useful internally, but the portfolio should translate it into
visible behaviors.

## Recommended case-study shape

### Beat 1 - Opening moment: "Customers need to feel in control"

Move: open on the design review tension, not on a generic AI problem statement.

The useful scene is the director review feedback: the agentic experience could
not simply replace the Control Hub Overview. Admins needed a home base they
recognized. The AI had to feel additive to Control Hub, not like a new system
that took the console away from them.

What the beat should establish:

- Control Hub is a high-stakes admin console.
- Acting in this environment is different from answering a question.
- The central design tension was control: how to let AI do more work while
  preserving admin agency.

Needs from Yankun:

- The exact review room or moment where this landed.
- Whether the phrase "customers feel in control" was said directly or should be
  paraphrased.
- A concrete first screen to pair with the opener: AI Home, Overview, or Chat.

Artifact:

- fig. 01 - AI Home / Assistant tab, showing the agentic surface as a separate
  home rather than a replacement for all of Control Hub.

### Beat 2 - Context: from CHAI to agentic work

Move: bridge from project no. 1.

CHAI started as a help assistant and evolved toward sense-making. This project
asks what comes after sense-making: planning, execution, validation, and audit.
It should feel like a continuation of the same product thinking, not a random
AI prototype.

What the beat should cover:

- Control Hub admins manage calling, devices, users, locations, reports, and
  troubleshooting across many product surfaces.
- A simple chatbot cannot handle multi-step operational work.
- The design target was a scalable framework that could support very different
  admin jobs without inventing a new UI every time.

Potential line to rewrite in Yankun's voice:

> CHAI taught me that trust starts with explanation. Agentic AI forced the next
> question: what does trust look like when the assistant can change the system?

### Beat 3 - Core framework: chat, workflow, activity

Move: name the system before showing use cases.

The framework is three surfaces:

- Chat: open-ended questions, fuzzy intent, and contextual reasoning.
- Workflow: structured execution for repeatable, multi-step admin jobs.
- Activity: the record of what the agent did, what the admin approved, and what
  changed in Control Hub.

The important portfolio point is that this is not a dashboard tour. It is an
interaction architecture for trust.

Design calls to name:

- Chat is the default because admins start with intent, not a form.
- Widgets are the portable primitive because future surfaces may be chat-only.
- Canvas opens only when the decision deserves more room.
- Activity flows into the existing Control Hub audit model rather than creating
  a hidden AI-only ledger.

Artifact:

- fig. 02 - Framework diagram or screen sequence: Chat -> Workflow -> Activity.
  This can be a custom editorial diagram if screenshots are too busy.

### Beat 4 - Proof one: compare locations, then edit the plan in language

Move: show the lightest form of agency first.

Use case: compare calling settings between Austin and San Jose. The agent pulls
configuration differences, identifies which ones affect user experience, and
lets the admin shape the change in natural language: align Austin to San Jose,
except keep Austin's emergency callback number.

Why this proof matters:

- It demonstrates that the agent is not just listing data; it is judging which
  differences matter.
- It shows editable intent without forcing the admin through a new form.
- It keeps the admin in control of site-specific exceptions.

Portfolio angle:

- This is the "co-pilot" proof, but do not call it that if it sounds like
  marketing. The point is: the admin steers, the agent fetches and proposes.

Artifact:

- fig. 03 - Chat comparison table and the exception instruction.
- Caption candidate: `fig. 03 - plan editing in conversation`.

Needs from Yankun:

- Is this one of the three final case-study proofs, or should it be replaced by
  Copy Calling Settings / Move User?
- Confirm any time-saved claim before publishing. Demo script says roughly
  30 minutes, but the portfolio should not use it unless defensible.

### Beat 5 - Proof two: device onboarding turns a punishing workflow into a guided run

Move: show the middle of the framework, where chat hands off to structured work.

Use case: onboarding a batch of hot-desk / room devices. Today this involves CSV
templates, conditional required fields, firmware checks, upload errors, and
retries. The agent recognizes the task from chat, collects the missing inputs,
builds a plan, runs a test batch, then executes the rest.

Why this proof matters:

- It shows chat-to-workflow handoff.
- It explains why widgets exist: not everything belongs in a prose answer.
- It shows the plan as a contract: action sequence, safety assumptions, and
  what happens if something fails.
- It shows "canvas as reading room" for a commit-level decision, not as a
  permanent split-screen gimmick.

Design calls to name:

- Every step remains an inline widget by default.
- The plan can expand into canvas for review.
- After approval, the plan persists in chat as a re-openable artifact.
- Test batch first, then full execution, so trust is earned in the flow.

Artifact:

- fig. 04 - Device onboarding plan canvas.
- fig. 05 - Test batch / execution widget.

Needs from Yankun:

- Choose the exact device story for the portfolio: Cisco 8865 hot desk phones,
  mixed MTR, Room Bars / Desk Pros, or the final demo version.
- Confirm whether to mention CSV pain explicitly or keep it to the product
  mechanics.

### Beat 6 - Proof three: destructive action requires dependency awareness

Move: show the highest-trust moment, where the agent acts broadly only after it
has made the system visible.

Use case: delete the "Billing Hotline" virtual line. The agent does not treat it
as a simple delete. It finds dependencies across auto attendants, call queues,
hunt groups, call forwarding, users, and the phone-number pool. Then it offers
better choices than proceed/cancel: remove dependencies and delete, reassign
dependencies first, or cancel.

Why this proof matters:

- It makes "agentic" concrete without sounding speculative.
- It shows breadth across product surfaces.
- It proves the safety model: investigate first, expose dependencies, offer
  alternatives, then act.
- It creates a strong enterprise trust moment because the audit trail records
  both agent actions and admin decisions.

Artifact:

- fig. 06 - Dependency map / dependency list before deletion.
- fig. 07 - Activity / audit entry after the action.

Needs from Yankun:

- Confirm whether this is the strongest third proof, or whether proactive
  troubleshooting should replace it.
- Confirm any time-saved claim. Demo script says roughly 40 minutes for manual
  dependency checking.

### Beat 7 - Craft layer: making the prototype feel like real software

Move: show senior craft without turning the case study into engineering notes.

This project has a strong craft story. The prototype was not just static Figma
screens. It encoded interaction rules in a working React prototype:

- A chat-to-workflow registry.
- Input, Plan, Execution, and Report widgets.
- Inline and canvas layouts using the same widget state.
- Thinking -> typing -> complete cadence for agent messages.
- Task-specific reasoning lines instead of generic "Thinking..."
- Momentum design system migration and restrained widget styling.

The key design position:

> The more powerful the AI action, the quieter the UI needed to become.

Use the Widget Anatomy v2.1 restraint update as the design proof: early widgets
looked too much like polished generative-AI cards. The final direction moved
toward plain typography, numbered steps, disclosures, and one clear CTA.

Artifact:

- fig. 08 - Widget anatomy strip: Input / Plan / Execution / Report.
- Optional marginal note: `less theater`.

Needs from Yankun:

- One concrete before/after from the widget restraint pass.
- Whether to show code/prototype craft in the main case study or save it for
  the colophon / how-this-was-made page.

### Beat 8 - Outcome: what the work made possible

Move: be honest about prototype impact. Do not pretend this is a shipped
metrics story unless there are shipped metrics.

Possible outcome framing:

- Aligned product, design, and engineering leadership around a concrete
  agentic framework.
- Reframed the conversation from "how autonomous should AI be?" to "what
  contract does the admin approve?"
- Turned fuzzy future-state ideas into buildable UI patterns: editable plans,
  validation, workflow creation, result reports, and audit.
- Created a reusable prototype architecture for additional use cases.

Candidate metric / evidence slots to confirm:

- Leadership review date and audience.
- Whether direction was approved.
- Any research feedback after the prototype.
- Any roadmap / resourcing outcome.
- Any measurable estimate worth using, such as manual task time reduced in
  demo scenarios, if defensible.

Artifact:

- fig. 09 - final framework / review slide / prototype overview.

### Beat 9 - Reflection

Move: one paragraph, not a list of lessons.

The reflection should sound like a belief earned from the work:

- Designing enterprise AI is not about making the system feel magical.
- The hard part is deciding where judgment belongs.
- Autonomy is not a slider users understand; trust is built through visible
  assumptions, reversible steps, validation, and audit.
- Restraint is part of trust. The UI should become calmer as the action becomes
  more consequential.

Prompt for Yankun:

> What do you believe now about agentic AI in enterprise software that you did
> not believe before this project?

## Suggested page structure in the portfolio

Section rail:

- Opening
- Context
- Framework
- Compare
- Onboard
- Delete
- Craft
- Outcome
- Reflection
- Credits

Header metadata:

- fig. 02
- Control Hub Agentic
- Cisco Webex - Control Hub
- 2026
- Product Designer / design lead
- Internal prototype / product direction

Suggested case-study rhythm:

1. Type-led opening, no hero problem statement.
2. One grounding screenshot of AI Home or Chat.
3. Framework diagram before the use cases.
4. Three proof beats, each with one main artifact.
5. One craft beat showing the design system / prototype depth.
6. Outcome and reflection.

## Artifact inventory

Need to capture or create:

- AI Home / Assistant tab.
- Chat -> Workflow -> Activity framework diagram.
- Compare Locations chat with side-by-side differences and exception.
- Device onboarding plan canvas.
- Device onboarding execution or report widget.
- Delete Virtual Line dependency list / decision options.
- Activity / audit trail entry.
- Widget anatomy strip: Input, Plan, Execution, Report.
- Optional process artifact: early agency framework or widget before/after.

Image treatment in portfolio:

- Full-color screenshots.
- Editorial plate frame with mono captions.
- No duotone.
- No full-bleed UI screenshots.
- Use one wide framework diagram if it genuinely helps the reader.

## Open questions before writing prose

- What was the exact project timeline?
- What should the official project title be: "Control Hub Agentic" or
  "Control Hub Agentic Experience"?
- Was the VP review completed, and what was the result?
- Which three proof flows should be locked for the portfolio?
- Are Compare Locations and Delete Virtual Line still canonical, or were they
  replaced by newer flows?
- What metric or outcome is safe to publish?
- How much can be shown publicly from Cisco-internal screens?
- Should collaborators be credited by role only, following the portfolio rule?
- Which screenshots already exist, and which need to be captured from the
  prototype?

## What not to do

- Do not present this as a generic "AI assistant for admins."
- Do not lead with a dashboard tour.
- Do not use L1-L5 or "agency ladder" language in the public page.
- Do not frame the project as replacing admins.
- Do not overclaim shipped impact without evidence.
- Do not show every use case. Three proofs are enough.
- Do not make the UI look more theatrical in the portfolio than it was in the
  actual prototype.
