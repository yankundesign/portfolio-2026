# Project 2 Outline - Control Hub Agentic

Audience: hiring manager interview / portfolio panel  
Target length: about 12 minutes  
Project: Control Hub Agentic Experience  
Role: Product Designer / design lead

## How I Want This To Sound

Normal and direct. This should feel like I am explaining the next chapter after CHAI to another product designer or product leader.

Do not make this sound like a generic "future of AI" talk. Keep it grounded in Control Hub admin work: plans, approvals, execution, dependencies, and audit.

The main point:

> CHAI helped admins understand what was happening. The agentic project asked the next question: if AI can start doing work, how does the interface help an admin safely say yes?

## The Larger Story With Project 1

Project 1 and Project 2 should feel like one story in two stages.

| Stage | Project | Core question | Design answer |
|---|---|---|---|
| Understand | Control Hub AI Assistant | How does AI become useful inside dense admin work? | Put the assistant where context already exists. |
| Act | Control Hub Agentic | How does AI act without taking control away? | Turn action into a reviewable contract with approval and audit. |

Plain bridge:

> Project 1 was about context. Project 2 is about control.

## The Shape Of The Story

This should not feel like a framework tour. The middle of the story should be about user risk, design decisions, and proof.

1. CHAI was the setup: context made the assistant useful.
2. Agentic work raised the stakes: acting in Control Hub means changing real admin systems.
3. The user problem was not "admins need more AI." The user problem was hidden work: dependencies, exceptions, missing inputs, failure states, approvals, and audit.
4. I made three design decisions: keep the agent inside Control Hub, turn action into a contract, and use structured widgets when text is not enough.
5. The proof flows show a rising trust sequence: compare settings, onboard devices, delete a virtual line.
6. Activity becomes the control room for the work after it starts.

Plain line to remember:

> When AI moves from explaining work to doing work, the interface has to make the work reviewable.

## Slide Plan

| Time | Slide | What I need to say | Visual |
|---:|---|---|---|
| 0:00-0:35 | 1. Control Hub Agentic | Quick intro: this is project 2 after CHAI. CHAI was about understanding; this project is about action. | Agentic hero / AI Home screenshot |
| 0:35-1:25 | 2. From Context To Control | CHAI taught me that context makes an assistant useful. Agentic AI raised a different question: once AI can change things, how does an admin safely say yes? | CHAI -> Agentic bridge: Context -> Control |
| 1:25-2:25 | 3. The User Problem: Hidden Work | Make the problem concrete. Admin work is full of dependencies, exceptions, missing inputs, validation errors, and audit requirements. Acting is risky because the system is connected. | One dense Control Hub admin flow or dependency sketch |
| 2:25-3:15 | 4. Decision 1: Keep Control Hub Familiar | AI could not replace the Control Hub overview. Admins needed a familiar home base, with the agent working inside Control Hub instead of taking over. | AI Home / Assistant tab inside Control Hub |
| 3:15-4:15 | 5. Decision 2: Turn Action Into A Contract | The core model: intent -> plan -> approval -> execution -> Activity. The plan is what the admin approves, not just a generated summary. | Contract diagram: Intent -> Plan -> Approval -> Execution -> Activity |
| 4:15-5:05 | 6. Decision 3: Use Widgets When Text Is Not Enough | Chat is good for intent, but action needs structure. Widgets expose fields, assumptions, dependencies, validation, status, and results without forcing everything into a form. | Widget anatomy: Input / Plan / Execution / Report |
| 5:05-6:05 | 7. Proof 1: Compare Locations | Lightest action. Before: manual comparison and accidental flattening of local exceptions. Decision: keep edits in conversation so the admin can preserve exceptions in language. | Compare Locations chat/table |
| 6:05-7:25 | 8. Proof 2: Device Onboarding | Medium action. Before: CSV templates, conditional fields, validation errors, firmware checks, and retries. Decision: chat hands off to a reviewable plan, then a test batch before full execution. | Device onboarding plan canvas + execution widget |
| 7:25-8:45 | 9. Proof 3: Delete Virtual Line | Highest-consequence action. Before: safe deletion required checking dependencies across calling surfaces. Decision: dependency review is mandatory before destructive action. | Dependency review + docked decision state |
| 8:45-9:45 | 10. Activity Is The Control Room | Active work cannot disappear into chat, and Workflows should not mix reusable templates with live runs. Activity shows Needs Attention, Running Now, and History. | Activity screen / audit trail |
| 9:45-10:55 | 11. Prototype Craft Made Trust Testable | The working React prototype made timing, state, handoff, approvals, and audit testable. It also helped align product, design, and engineering around buildable patterns. | Prototype craft / framework review artifact |
| 10:55-12:00 | 12. Takeaway | Enterprise AI becomes trustworthy when assumptions are visible, plans are editable, actions are bounded, approval is clear, and history is easy to inspect. | One simple takeaway slide |

## Talk Track

### 1. Control Hub Agentic

Say:

> The second project is Control Hub Agentic. It is the next chapter after CHAI. CHAI helped admins understand what was happening inside Control Hub. This project asked what happens when AI starts helping with action: planning work, asking for approval, executing steps, and showing what changed afterward.

Keep this short. The point is to connect it to the CHAI story, not restart from zero.

Plain line:

> Project 1 was about understanding. Project 2 is about action.

### 2. From Context To Control

Say:

> CHAI taught me that context is what makes an assistant useful in an admin console. A blank chat box is not enough. The assistant needs to know where it is, what the admin is looking at, and what evidence it is using.

Then:

> But the agentic work raised a different problem. Answering a question is one thing. Changing calling settings, onboarding devices, or deleting a virtual line is different. At that point, the design question becomes: how does the admin safely say yes?

What this slide should explain:

- CHAI was mostly about sense-making.
- Agentic work includes planning and execution.
- Execution needs stronger trust patterns than explanation.
- The next stage is not more "AI magic." It is more control.

Plain line:

> Context made CHAI useful. Control makes agentic work safe.

### 3. The User Problem: Hidden Work

Say:

> The user problem was not that admins needed a more impressive AI surface. The problem was that admin work in Control Hub has a lot of hidden work inside it.

Then:

> If you compare two locations, some differences are intentional and some are drift. If you onboard devices, you deal with required fields, firmware checks, CSV errors, and retries. If you delete a virtual line, it may be connected to auto attendants, call queues, hunt groups, call forwarding, users, and phone-number ownership.

The point of this slide:

- Control Hub actions are connected across product surfaces.
- Many admin tasks have exceptions and failure states.
- The risk is not just making the wrong recommendation.
- The risk is changing the system without making the consequences visible.

Plain line:

> Acting is risky because the system is connected.

### 4. Decision 1: Keep Control Hub Familiar

Say:

> One of the clearest pieces of feedback was that the agentic experience could not just replace the Control Hub overview. Admins still needed a home base they recognized. They needed to feel like the agent was additive to Control Hub, not a new system taking the console away from them.

Then:

> So the first decision was to keep the agent inside Control Hub's product structure. The agentic surface could be new, but it still had to feel like Control Hub becoming more capable, not Control Hub being replaced.

Call out:

- Control Hub is high-stakes admin software.
- Familiar navigation and product context reduce orientation cost.
- The agent needs to feel close to the system it is acting on.
- The AI surface should be additive, not a takeover.

Plain line:

> The admin should never feel like they left Control Hub to use AI.

### 5. Decision 2: Turn Action Into A Contract

Say:

> The second decision was to treat action as a contract. If the AI is going to act, the interface needs to make clear what the admin is approving: what context the agent used, what it plans to change, what could fail, and where the record will live afterward.

Then:

> The model became intent, plan, approval, execution, and Activity. The admin can start with fuzzy language, but before anything important happens, the fuzzy request has to become a reviewable plan.

The contract:

- Intent: what the admin asks for in natural language.
- Plan: the proposed steps, assumptions, dependencies, and expected result.
- Approval: the commit moment.
- Execution: visible progress, errors, and completion state.
- Activity: the record of what ran, who approved it, and what changed.

Plain line:

> The plan became the contract, not just a summary.

### 6. Decision 3: Use Widgets When Text Is Not Enough

Say:

> The third decision was that chat could be the front door, but chat could not carry the whole experience. Once the work involves required inputs, dependencies, validation, or execution status, a prose answer is not enough.

Then:

> That is why widgets became the portable primitive. Input widgets collect structured details. Plan widgets show the proposed work. Execution widgets show progress and failure states. Report widgets show the result afterward. The same widget can live inline in chat or open into a larger canvas when the decision needs more room.

Design calls to name:

- Chat captures fuzzy intent.
- Widgets expose structure without turning every task into a new form.
- Canvas opens only for commit-level review.
- The UI gets quieter as the action gets more consequential.

Plain line:

> Text is good for intent. Structure is needed for commitment.

### 7. Proof 1: Compare Locations

Say:

> The lightest proof was comparing locations. Before this, an admin would have to compare settings manually and remember which differences were intentional. That is risky because standardizing two locations can accidentally erase a local exception.

Then:

> In the prototype, the admin could ask Control Hub to compare Austin and San Jose, then say something like, "align Austin to San Jose, except keep Austin's emergency callback number."

Design decision:

> I kept plan editing in conversation because exceptions are often easier to express in language than in a form.

Call out:

- The agent fetches configuration differences.
- It separates meaningful differences from noise.
- The admin can edit the plan in conversation.
- Site-specific exceptions stay visible.

Plain line:

> The AI does the comparison work; the admin keeps the judgment.

### 8. Proof 2: Device Onboarding

Say:

> Device onboarding showed why chat alone was not enough. Before, this kind of work involved CSV templates, conditional required fields, firmware checks, upload errors, retries, and a lot of babysitting.

Then:

> So the agent starts in chat, but hands off into workflow. It gathers missing inputs, checks device and workspace requirements, recommends settings, builds a plan, runs a test batch, and only then asks for approval before full execution.

Design decisions to point out:

- Chat captures the intent.
- Widgets collect structured inputs without making the user start from a form.
- The plan opens into canvas only when the decision deserves more room.
- A test batch runs before full execution, so trust is earned inside the flow.
- The plan stays available after approval, so the admin can reopen what was decided.

Plain line:

> For multi-step work, the plan is where trust gets built.

### 9. Proof 3: Delete Virtual Line

Say:

> The highest-trust proof was deleting a virtual line. That sounds simple, but in Control Hub a virtual line can be connected to auto attendants, call queues, hunt groups, call forwarding, users, and phone-number ownership.

Then:

> So the agent should not treat that as a simple delete. It needs to investigate first, show the dependencies, and give the admin real choices: remove dependencies and delete, reassign dependencies first, or cancel.

Design decision:

> I made dependency review mandatory before destructive action. The agent can help do the checking, but it has to show what it found before the admin approves anything.

Why this proof matters:

- It makes agentic work concrete without overclaiming.
- It shows breadth across Control Hub surfaces.
- It proves the safety model.
- It creates the audit moment: what the agent checked, what the admin approved, and what changed.

Plain line:

> For destructive actions, dependency awareness is the trust moment.

### 10. Activity Is The Control Room

Say:

> One decision I care about is where the work lives after it starts. I did not want active agent work to disappear into chat. And I did not want Workflows to become a messy mix of reusable playbooks and live runs.

Then:

> So Activity becomes the control room for ongoing agent work. At the top are things that need judgment. Below that are runs happening now. Then History keeps the audit trail.

The structure:

- Needs Attention: approvals, blocked runs, escalations, and direct actions.
- Running Now: slim progress rows with current step, status, elapsed time, and ETA.
- History: dense audit table with details on trigger, changes, approvals, touched systems, and trace.

Why this mattered:

- Workflows can stay focused on reusable playbooks, templates, and schedules.
- Activity owns live execution and history.
- The admin has one place to see judgment, progress, and proof.

Plain line:

> Activity is where the admin sees what needs judgment, what is running, and what already happened.

### 11. Prototype Craft Made Trust Testable

Say:

> A lot of the value came from making this as working software, not just static screens. I built an interactive React prototype with Cursor, Codex, and Claude Code so people could react to the timing, the states, and the handoffs.

Then:

> The prototype encoded the rules behind the experience: chat-to-workflow registry, input widgets, plan widgets, execution widgets, report widgets, inline and canvas layouts using the same state, and task-specific thinking lines instead of generic "thinking" labels.

Craft point:

> The more powerful the AI action, the quieter the UI needed to become. Early widgets could look too much like polished AI cards. The stronger direction was plainer: numbered steps, disclosures, clear status, and one obvious CTA.

Outcome:

> This is not a shipped metrics story yet, so I would not talk about it the same way as CHAI. The outcome here is direction-setting. The prototype helped align product, design, and engineering leadership around a concrete agentic framework and gave the team a demo direction for Cisco Live US 2026.

Plain line:

> The prototype made the trust problems visible faster.

### 12. Takeaway

Say:

> My takeaway is that enterprise AI does not become trustworthy by feeling magical. It becomes trustworthy when the system shows its assumptions, lets the plan be edited, bounds the action, asks for approval at the right moment, and leaves a record people can inspect.

Then:

> So the design challenge was not to make the agent look powerful. It was to make the work legible enough that an admin could safely say yes.

Keep this as a belief earned from the work, not a list of generic lessons.

Plain line:

> In enterprise software, accountability is the interface.

## Simple Slide Titles

1. Control Hub Agentic
2. From context to control
3. Hidden work
4. Keep Control Hub familiar
5. Turn action into a contract
6. Use widgets when text is not enough
7. Compare Locations
8. Device Onboarding
9. Delete Virtual Line
10. Activity is the control room
11. Prototype craft
12. Accountability is the interface

## Visuals I Need

- Agentic hero / AI Home screenshot.
- CHAI -> Agentic bridge: Context -> Control.
- A concrete "hidden work" visual: dependency sketch, dense Control Hub flow, or before-state admin checklist.
- AI Home / Assistant tab showing the agentic surface inside Control Hub.
- Contract diagram: Intent -> Plan -> Approval -> Execution -> Activity.
- Widget anatomy strip: Input, Plan, Execution, Report.
- Compare Locations chat/table with the Austin / San Jose exception.
- Device onboarding plan canvas.
- Device onboarding test batch / execution widget.
- Delete Virtual Line dependency review.
- Delete Virtual Line docked decision state or Activity entry.
- Activity view showing Needs Attention, Running Now, and History.
- Prototype craft / framework review artifact.
- One simple closing slide.

## Things To Fill In Later

- Confirm the final public title: "Control Hub Agentic" or "Control Hub Agentic Experience."
- Confirm the exact project timeline and whether to say 2026 or a narrower date range.
- Confirm whether the Cisco Live US 2026 demo framing is safe to mention externally.
- Confirm the three proof flows are still the canonical set: Compare Locations, Device Onboarding, Delete Virtual Line.
- Confirm whether any manual time-saved estimates are defensible enough to use.
- Confirm how much of the internal prototype can be shown publicly.
- Capture or update the Activity screen if the final version includes Needs Attention, Running Now, and History.
- Decide whether the prototype craft beat stays in the main presentation or moves to the "how this was made" story.
- Add one concrete before-state visual for "hidden work" so the problem is visible before the framework appears.

## What Not To Do

- Do not make this a generic "agentic AI" thought piece.
- Do not lead with an autonomy ladder.
- Do not present AI as replacing admins.
- Do not turn the middle into a feature tour.
- Do not overclaim shipped impact or metrics.
- Do not show every use case. Three proofs are enough.
- Do not make the UI sound more theatrical than it was.
- Do not hide the important design point: admin control, approval, visibility, and audit.
