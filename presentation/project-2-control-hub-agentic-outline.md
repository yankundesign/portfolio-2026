# Project 2 Outline - Control Hub Agentic

Audience: Google AI Foundations onsite interviewers
Target length: 7-8 minutes, planned at 7:45
Project: Control Hub Agentic Experience  
Role: Product Designer / design lead

This project starts immediately from the Project 1 bridge. Do not re-explain Control Hub or repeat the CHAI story.

## How I Want This To Sound

Normal and direct. This should sound like I am explaining a 0-to-1 product-definition decision to onsite interviewers who may need me to lead similarly ambiguous work.

Do not make this a generic "future of AI" talk. Keep it grounded in admin work, product constraints, trust, permissions, approvals, audit, rollback, and the prototype decisions that made the direction concrete.

The main point:

> This was a 0-to-1 project about moving from an AI assistant that explains work to an AI agent that can help do work, without breaking user trust.

For Google AI Foundations, the point I want them to hear is:

> I know how to define interaction models for AI systems in high-stakes technical tools: what the system can do, what context and data it uses, what the user approves, what gets tracked, and how the workflow stays understandable.

Positioning line to carry forward from Project 1:

> Project 1 moved from complex data to trustworthy insight. This project connects that insight to controlled action and a durable trace.

## The Larger Story With Project 1

Project 1 and Project 2 should feel like one story in two stages.

| Stage | Project | Core question | Design answer |
|---|---|---|---|
| Understand | Control Hub AI Assistant | How does AI become useful inside dense admin work? | Put the assistant where context already exists. |
| Act | Control Hub Agentic | How does AI act without taking control away? | Make every action planned, permissioned, approved, traceable, and reversible where possible. |

Plain bridge:

> Project 1 was about context. Project 2 is about control.

Better role-specific bridge:

> CHAI made AI useful by giving it context. Agentic AI raised the next product question: if the system can help act, what does the user need to see before they trust it?

## What This Project Should Prove

- I can define a 0-to-1 AI product model under ambiguity and technical constraints.
- I can design agentic workflows where the AI does work, but the human keeps judgment and control.
- I understand trust patterns for AI: permissions, plans, approvals, audit logs, traceability, rollback, and failure states.
- I can turn messy enterprise and infrastructure workflows into clear states: intent, data context, analysis/evidence, missing inputs, plan, approval, execution, blocked, completed, and audited.
- I can prototype in code when static screens are too shallow to test timing, state, handoff, and trust.
- I can align PM, engineering, design, and research partners around a buildable conceptual model.
- I can connect AI product design to complex data and developer/admin tools, not just simple chat or consumer assistants.
- I can define what the AI does and what the user must be able to inspect or control at every stage.

## Google AI Foundations Angle

- Present this as a conceptual model for AI-driven operational tools, not an abstract "agentic AI" vision.
- The strongest role fit is the system model: intent -> data context -> analysis/evidence -> plan -> permission -> execution -> activity -> audit/rollback.
- For Google Core / AI Foundations, emphasize data sources, access, system state, dependencies, limits, permissions, audit, and what the user needs to inspect before trusting an AI action.
- Keep the prototype as a cross-functional artifact: it made timing, handoff, approval, execution, and audit testable with product and engineering.
- Be precise about outcome: this is direction-setting and alignment, not a shipped metrics story.
- The Google readout should be: I can make ambiguous AI infrastructure work legible enough for users and teams to evaluate.

## Onsite Interviewer Lens

The onsite interviewers are deciding whether this was a credible act of product leadership, not only an interesting AI concept. Use these as interviewer signals, not slide titles.

- Strategic judgment: explain why agentic work became the next important opportunity after contextual assistance.
- Ownership: state my role in defining the product model, trust principles, prototype, and cross-functional conversation.
- Problem solving: if an agent can act, the question changes from "how should it answer?" to "what must the user see before trusting action?"
- Systems thinking: make dependencies across settings, users, permissions, execution state, audit, and rollback visible.
- Product decisions: explain what alternatives I rejected and why the agent stayed familiar, evidence became progressive, and every action required a visible plan.
- Influence: frame the prototype as how I helped product, design, and engineering evaluate a direction before the implementation path was obvious.
- Outcome: be honest that this is not a shipped metrics story. The impact was alignment, decision clarity, and making trust problems visible sooner.
- Growth: name the next validation: plan comprehension, approval confidence, error recovery, audit usefulness, and trust under higher-consequence actions.

## The Shape Of The Story

This should not feel like a framework tour. The middle of the story should be about product definition under constraint.

1. CHAI is the setup: context made the assistant useful.
2. Agentic work raises the stakes because AI can move from answering to acting.
3. The real user problem is hidden work: dependencies, exceptions, missing inputs, validation errors, permissions, approvals, and audit.
4. I defined the agentic workflow architecture: intent -> data context -> analysis/evidence -> plan -> permission -> execution -> activity -> audit/rollback.
5. I made four product decisions:
   - AI-first, but familiar.
   - Low threshold to try, deep evidence when needed.
   - Always analyze dependencies and plan before action.
   - Activity as the audit and trace surface.
6. The prototype made the trust model testable with product, design, and engineering.

Plain line to remember:

> When AI moves from explaining work to doing work, the interface has to make the work reviewable.

Sharper version for this role:

> The design job was not to make the agent look powerful. It was to define the contract that lets a user safely say yes.

## What I Would Cut Or Merge From The Current Deck

- Merge the project title, Context -> Control bridge, Hidden Work, and the Trust Constraint into one opening problem slide. Project 1 already established the product and assistant.
- Keep the workflow architecture as its own slide. This is the strongest conceptual-model evidence for the Google role.
- Merge AI-first/familiar with Low Threshold/Deep Evidence into one framework slide. Do not tour Overview, Agents, and Details separately.
- Keep Always Analyze And Plan First as its own decision because it is the clearest expression of the user-agent contract.
- Merge Activity As Audit into the Device Onboarding proof flow: intent -> plan -> approval -> execution -> activity record.
- Use permissioned/destructive work only as a 15-second stress test or Q&A backup.
- Keep the coded prototype and partnership story in the main presentation. It demonstrates execution and cross-functional influence under ambiguity.
- Merge outcome, self-reflection, and takeaway. Be clear that the impact was alignment and decision clarity, not shipped metrics.
- Move extra agent surfaces, the second use case, detailed Activity states, and hypothetical variants to Q&A backup.
- Final main story: 7 slides, about 7 minutes 45 seconds.

## Status Labels To Use In The Deck

- `Directional / prototype`: the agentic product model, React prototype, Device Onboarding proof flow, Activity model, and higher-consequence stress test unless a more advanced status is confirmed.
- `Outcome`: direction-setting, decision clarity, and cross-functional alignment. Replace this with the exact decision or uncertainty the prototype resolved.
- `Next validation`: plan comprehension, approval confidence, dependency and evidence comprehension, error recovery, audit usefulness, accessibility, and trust when rollback is unavailable.

Do not present this as shipped impact or connect it to the Project 1 adoption metrics.

## Slide Plan

| Time | Slide | What I need to say | Visual |
|---:|---|---|---|
| 0:00-1:10 | 1. From Context To Control | This was the strategic next question after CHAI: how could AI help do work without taking control away? State my role in the 0-to-1 direction, then show the hidden dependencies, exceptions, permissions, approvals, and audit requirements that made this more than a chat redesign. | Context -> Control + role + hidden-work before state + trust constraints |
| 1:10-2:15 | 2. Define The System Before The Screens | I aligned with product and engineering on the assumptions and constraints, then defined the conceptual model: intent -> data context -> analysis/evidence -> plan -> permission -> execution -> activity -> audit/rollback. For each stage, distinguish what the AI does from what the user sees or controls. | Assumptions/constraints -> data-to-action architecture + compact AI/user contract |
| 2:15-3:05 | 3. Familiar Surface, Evidence When Needed | The agent stays inside Control Hub, with a low threshold to begin and deeper evidence as stakes rise: sources and access, dependencies found, steps proposed, systems touched, status, and recovery. | AI Home + compressed Overview -> Agents -> Details framework |
| 3:05-4:15 | 4. Always Analyze And Plan First | Before anything changes, the agent gathers relevant state, identifies dependencies and limits, then turns intent into a visible plan. Name the rejected direction: direct natural-language request -> execution. The plan-first model adds a review step, but makes scope, evidence, permissions, expected changes, and failure handling inspectable before action. | Rejected direct execution -> evidence/dependencies -> reviewable plan |
| 4:15-5:50 | 5. Reviewable Execution | Use Device Onboarding as the one complete proof: intent -> missing inputs -> data and requirement checks -> evidence/dependencies -> editable plan -> test batch -> approval -> execution -> Activity record. Avoid touring surfaces. If time allows, add a 15-second stress test showing that destructive work requires mandatory dependency review and stronger permission. | One end-to-end Device Onboarding flow + optional permissioned-work inset |
| 5:50-7:05 | 6. The Prototype Made Trust Testable | A working React prototype exposed timing, state, handoff, evidence review, approval, execution, intervention, audit, and rollback in ways static screens could not. State the exact uncertainty, disagreement, or implementation decision it resolved with product and engineering. | Prototype interaction + code artifact + concrete decision/alignment outcome |
| 7:05-7:45 | 7. Outcome, Reflection, And Takeaway | Label the work as directional/prototype. The outcome was decision clarity and alignment, not shipped metrics. Name the next validation: evidence and plan comprehension, approval confidence, error recovery, audit usefulness, and trust when rollback is unavailable. Return to the shared positioning: I help technical users move from complex data to clear insight and controlled action. Close: accountability is the interface. | Directional label + decision resolved + next validation + shared positioning |

## Live Cut Order

If the conversation is running long:

1. Remove the 15-second permissioned-work stress test from the proof-flow slide.
2. Compress `Familiar Surface, Evidence When Needed` to one design decision and one screenshot.
3. Shorten the Activity portion of `Reviewable Execution`, but keep the audit principle.
4. Do not cut the workflow architecture, Always Analyze And Plan First, prototype/partnership story, or honest outcome and reflection.

## Onsite Follow-Ups To Prepare

- Why was agentic work the right strategic next step, and what evidence supported that direction?
- What did I personally define, and what was decided with PM, engineering, research, or leadership?
- What competing interaction model did I reject, and why was plan-first the better contract?
- What data and system evidence must the agent gather before it can propose a plan?
- How should the experience distinguish missing data, insufficient access, model uncertainty, and execution failure?
- What specific uncertainty or disagreement did the coded prototype resolve?
- How would I validate trust before implementation, and what metrics would indicate success?
- How would the model change if rollback were unavailable, the agent were read-only, or data access were more restricted?

## Expanded Talk Track And Q&A Bank

The sections below preserve the fuller story. Do not present every section in the 7-8 minute version. Use them for interviewer follow-ups about alternative concepts, trust tradeoffs, prototype decisions, permissions, rollback, and validation.

### 1. Control Hub Agentic

Say:

> The second project is Control Hub Agentic. This came after CHAI, so I do not see it as a separate story. CHAI helped admins understand what was happening inside Control Hub. This project asked the next question: if AI can start helping with action, what should that experience look like?

Then:

> For me, this was a 0-to-1 product definition project. We were not improving an existing agent flow. We were defining what "agentic" should mean inside an enterprise admin product.

Keep this short. The point is to set up product definition, not restart the whole Control Hub story.

Plain line:

> Project 1 was about understanding. Project 2 is about action.

Role-specific line:

> This is the project I would use to show how I think through ambiguous AI product work before the patterns are obvious.

### 2. From Context To Control

Say:

> CHAI taught me that context is what makes an assistant useful. A blank chat box is not enough. The assistant needs to know where the user is, what they are looking at, and what evidence it is using.

Then:

> But action is different from explanation. Answering a question about a report is one thing. Changing settings, provisioning devices, replacing a gateway, or deleting a virtual line is different. At that point the design question becomes: how does the user safely say yes?

What this slide should explain:

- CHAI was mostly about sense-making.
- Agentic work includes planning and execution.
- Execution needs stronger trust patterns than explanation.
- The next stage is not more "AI magic." It is more control.

Plain line:

> Context made CHAI useful. Control makes agentic work safe.

### 3. The Real Problem: Hidden Work

Say:

> The user problem was not that admins needed a more impressive AI surface. The problem was that admin work in Control Hub has a lot of hidden work inside it.

Then:

> If you onboard devices, you deal with required fields, firmware checks, CSV errors, retries, and approvals. If you delete a virtual line or replace a gateway, you have to check dependencies across calling, locations, users, forwarding, queues, and devices. A lot of the risk lives in the things the user cannot see at first.

The point:

- Control Hub actions are connected across product surfaces.
- Many tasks have exceptions and failure states.
- The risk is not just giving the wrong recommendation.
- The risk is changing the system without making the consequences visible.

Plain line:

> Acting is risky because the system is connected.

For Google AI Foundations:

> I think the same kind of problem appears in internal data and infrastructure tools. The AI may look like it is just helping with a task, but underneath there are data sources, permissions, dependencies, system state, and operational decisions the user needs to trust.

### 4. Agentic Workflow Architecture

Say:

> Before designing screens, I needed to define the workflow model. An assistant answers. An agent plans and takes steps. A workflow has state: waiting for permission, missing information, running, blocked, completed, audited, or rolled back.

Then:

> The architecture became intent, data context, analysis and evidence, plan, permission, execution, activity, and audit or rollback. That gave us a way to reason about what the agent should show before, during, and after action.

Show the model:

- Intent: what the user asks for.
- Data context: what sources, system state, permissions, and constraints the product and agent can use.
- Analysis/evidence: what conditions, dependencies, conflicts, or limits the agent finds.
- Plan: what the agent proposes and what it expects to change.
- Permission: what the human approves.
- Execution: what is running, blocked, completed, or failed.
- Activity: where the work lives after it starts.
- Audit/Rollback: how the result can be inspected or recovered.

Make the user contract explicit:

| Stage | What the AI does | What the user sees or controls |
|---|---|---|
| Intent | Interprets the goal | Scope and clarification |
| Data context | Selects relevant sources, tools, and system state | Sources, access, freshness, and constraints |
| Analysis/evidence | Identifies conditions, dependencies, conflicts, and limits | Evidence and unsupported gaps |
| Plan | Proposes steps and expected effects | Editable, reviewable plan |
| Permission | Requests the required authority | Approval boundary |
| Execution | Performs permitted steps | Progress, status, pause, or intervention |
| Activity | Records what happened | Durable trace |
| Audit/rollback | Supports inspection or recovery | Accountability and control |

Plain line:

> Once AI starts doing work, the product needs evidence, states, permissions, and records.

### 5. The Trust Constraint

Say:

> In Control Hub, the constraint was trust. The agent could touch users, devices, calling settings, locations, reports, and workflows. These are not toy actions. If something changes silently, an admin may not know what broke until much later.

Then:

> So the constraints became data access, evidence, permission, approval, audit log, traceability, and rollback. Those were not backend details to hide. They had to become visible interaction patterns.

The constraint stack:

- Data access: which sources and system state can the agent inspect?
- Evidence: what conditions, dependencies, or limits support the plan?
- Permission: what is the agent allowed to access or change?
- Approval: what is the human explicitly saying yes to?
- Audit: what happened, when, and by whom?
- Traceability: what context, dependencies, and steps led to the result?
- Rollback: if possible, how does the admin recover?

Plain line:

> Trust was not a layer on top of the agent. Trust was the product structure.

### 6. Decision 1: AI-First, But Familiar

Say:

> The first design decision was AI-first, but familiar. I explored an AI-first overview because the agent needed a real home, not just a side panel. But it still had to feel like Control Hub becoming more capable, not a new AI product replacing Control Hub.

Then:

> That mattered because this is high-stakes admin software. If the first experience feels unfamiliar or disconnected from the system it controls, users will hesitate before they even try it.

Call out:

- Keep the familiar Control Hub shell and navigation.
- Make the agent feel close to the systems it can act on.
- Let users enter through an AI-first surface without losing product context.
- Reduce orientation cost before asking for trust.

Plain line:

> The admin should feel like Control Hub gained an agent, not like they left Control Hub to use AI.

### 7. Decision 2: Low Threshold, Deep Evidence

Say:

> The second decision was to define the agent framework around two needs that can be in tension: low threshold to try, and deep evidence when trust requires it.

Then:

> The overview helps users understand what the agent can do and try it quickly. The agents view shows available agents and active runs. The detail view gives the evidence: what sources and system state it used, what dependencies or gaps it found, what steps it took, what changed, and what can be rolled back.

Why this matters:

- Overview lowers the threshold to try.
- Agent list helps users understand available capabilities.
- Details build confidence when stakes are higher.
- The framework can scale from one-off tasks to repeatable workflows.

Plain line:

> The entry point should feel easy. The details should be there when trust requires them.

For this role:

> This is the kind of system thinking I would bring to an early product surface: define the model first, then let screens fall out of that model.

### 8. Decision 3: Always Analyze And Plan First

Say:

> The most important rule was always analyze and plan first. The user can start with natural language, but before the agent acts, it has to gather the relevant system state, identify dependencies and limits, and turn the fuzzy request into a visible plan.

Then:

> The plan is the contract. It shows what the agent understood, what data and system state it used, what evidence or dependencies it found, what assumptions or gaps remain, what steps it will take, and where the approval point is.

Rejected direction and tradeoff:

> We did not let the agent move directly from a natural-language request to execution. The reviewable plan added a step, but it prevented hidden scope, dependencies, permissions, and expected changes from being approved implicitly.

The plan should answer:

- What will change?
- What will not change?
- What data and current system state support the plan?
- What dependencies did the agent find?
- What assumptions or unsupported gaps remain?
- What permission is required?
- What happens if something fails?
- Where will the record live after execution?

Plain line:

> The user is not approving a vibe. They are approving a plan.

Optional stronger line:

> In agentic workflows, evidence makes the plan credible, and the plan makes trust concrete.

### 9. Decision 4: Activity As Audit

Say:

> The fourth decision was Activity. Agent work cannot disappear into chat after it starts. If the agent asks for approval, runs a task, hits a blocker, or changes a setting, the admin needs one place to track it.

Then:

> Activity became the control room for agent work: what needs attention, what is running, what already happened, which evidence and plan were approved, who approved it, what resources were touched, and whether rollback is available.

The structure:

- Needs Attention: approvals, blocked runs, escalations, and direct actions.
- Running Now: active jobs with step, status, elapsed time, and failure state.
- History: dense audit table with trigger, requester, approver, touched systems, result, and rollback.

Why this mattered:

- Chat stays good for intent.
- Workflows can stay focused on reusable playbooks.
- Activity owns live execution and history.
- The admin has one place for judgment, progress, and proof.

Plain line:

> Activity turns agentic work from a black box into a traceable system.

### 10. Use Case: Device Onboarding

Say:

> Device onboarding was the clearest multi-step workflow. Before, this kind of work involved CSV templates, conditional required fields, firmware checks, upload errors, retries, and a lot of babysitting.

Then:

> In the agentic model, the admin can start with intent. The agent gathers missing inputs, checks device and workspace requirements, exposes the relevant system state and dependencies, recommends settings, builds an editable plan, runs a test batch, and only then asks for approval before full execution.

Design decisions to point out:

- Chat captures intent.
- Structured widgets collect missing details.
- Evidence shows requirement checks, dependencies, assumptions, and unsupported gaps.
- Plan review happens before execution.
- A test batch helps build confidence.
- Activity records the run and what changed.

Plain line:

> For multi-step work, the plan is where trust gets built.

### 11. Use Case: Permissioned Work

Say:

> The higher-trust proof was destructive or permissioned work. The example could be deleting a virtual line or replacing a voice gateway. These actions sound simple, but in Control Hub they can touch dependencies across calling, users, locations, forwarding, queues, and device configuration.

Then:

> So the agent should not jump straight to action. It has to investigate first, show the data and dependencies it checked, explain any gaps, present the plan, ask for permission, and leave a record.

Design decision:

> I made dependency review mandatory before destructive action. The agent can help do the checking, but it has to show its sources, findings, and unresolved gaps before the admin approves anything.

Why this proof matters:

- It shows the trust model under higher consequence.
- It makes permission and audit concrete.
- It shows that agentic does not mean uncontrolled autonomy.
- It connects plan, approval, execution, Activity, and rollback.

Plain line:

> The more consequential the action, the more visible the contract needs to be.

### 12. Prototype Craft Made Trust Testable

Say:

> A lot of the value came from making this as working software, not just static screens. I built an interactive React prototype with Cursor, Codex, and Claude Code so people could react to the timing, the states, and the handoffs.

Then:

> The prototype encoded the rules behind the experience: chat-to-workflow handoff, source and dependency review, agent overview, agent details, editable plans, approval states, execution and intervention, Activity, audit details, and rollback affordances.

Craft point:

> Static screens could show the layout, but they could not test the trust moments. The prototype let us see where users needed more evidence, where the approval felt too early, how execution status and intervention should work, where the activity record needed more detail, and where rollback needed to be more visible.

Outcome:

> This is not a shipped metrics story, so I would not talk about it the same way as CHAI. The outcome here was direction-setting. The prototype helped product, design, and engineering evaluate a concrete data-to-action framework. Before presenting, replace this general statement with the exact uncertainty, disagreement, or product decision it resolved.

Plain line:

> The prototype made the trust problems visible faster.

For this role:

> This is also how I like to work on ambiguous AI products: use code when static mocks are too slow or too shallow, and turn the prototype into a shared product artifact.

### 13. Takeaway

Say:

> My takeaway is that agentic AI is not just about autonomy. In high-trust products, the design job is to define the contract between the user and the agent.

Then:

> For me, that contract is: visible data context and evidence, an editable plan, explicit approval, observable execution, traceable activity, and rollback when possible.

Tie back to Google AI Foundations:

> That is why I think this project is relevant to AI Foundations. If the team is building the next generation of AI-driven data tools, users will need clarity around what the AI understood, what data and system state it used, what evidence and limits shaped the plan, what steps it proposes, and what the user can inspect, edit, approve, or stop.

Keep this as a belief earned from the work, not a generic AI lesson.

Plain line:

> Accountability is the interface.

Final positioning line:

> Across both projects, the work is about helping technical users move from complex data to an insight they can verify, then into an action they can control and trace.

## Simple Slide Titles

1. From context to control
2. Define the system before the screens
3. Familiar surface, evidence when needed
4. Always analyze and plan first
5. Reviewable execution
6. The prototype made trust testable
7. Outcome, reflection, and takeaway

## Visual Source Bank

The final deck should use only the visuals named in the 7-slide plan. The rest are backup material for questions.

- Agentic hero / AI Home screenshot.
- CHAI -> Agentic bridge: Context -> Control.
- Dense before-state visual: dependency sketch, admin checklist, or connected Control Hub flow.
- Agentic workflow architecture: Intent -> Data Context -> Analysis/Evidence -> Plan -> Permission -> Execution -> Activity -> Audit/Rollback.
- Compact AI/user contract showing system responsibility and user control at each stage.
- Constraint slide: Data Access, Evidence, Permission, Approval, Audit, Traceability, Rollback.
- AI Home / Assistant tab showing the agentic surface inside Control Hub.
- Overview -> Agents -> Details framework.
- Analyze-and-plan-first screen or diagram: Intent -> Evidence/Dependencies -> Plan -> Approval -> Execution -> Activity.
- Activity view showing Needs Attention, Running Now, History, and details drawer.
- Device onboarding plan canvas.
- Device onboarding test batch / execution widget.
- Delete Virtual Line or voice gateway dependency review.
- Activity entry showing approver, touched resources, trace, and rollback.
- Prototype craft / Cursor / code artifact.
- One simple closing slide.

## What To Add Or Emphasize In The Slides

- Make the strategic opportunity, my ownership, and the concrete alignment outcome explicit; do not let this read as a speculative concept project.
- For each decision, state the rejected alternative and the cross-functional constraint that shaped the final model.
- Add one explicit architecture slide: `Intent -> Data Context -> Analysis/Evidence -> Plan -> Permission -> Execution -> Activity -> Audit/Rollback`.
- Show the user contract at each stage: what the AI does and what the user sees or controls.
- Include the hidden-work before state on the opening Context -> Control slide: dependencies, missing inputs, validation, approvals, and audit.
- Add a light process thread across the deck: ambiguous AI direction -> user risk -> system model -> prototype -> alignment.
- Compress Overview, Agents, and Details into `Familiar Surface, Evidence When Needed`; show the principle instead of touring each page.
- Rename the plan slide around the stronger thesis: `Always Analyze And Plan First`.
- Name the rejected alternative directly: natural-language request -> immediate execution.
- End the Device Onboarding flow in Activity so the audit principle is visible without requiring a separate Activity slide.
- Name the trust pattern on each main proof: Device Onboarding is a multi-step plan with missing inputs and a test batch; Activity provides traceable execution; the prototype tests trust through real state and timing. Keep permissioned work as a brief stress test or backup.
- Keep the prototype/code beat in the main story, because it is directly relevant to Google's expectation that designers communicate flows, wireframes, prototypes, and conceptual models across technical teams.
- Prepare for Google follow-ups by being ready to answer: what changes if rollback is unavailable, if the agent is read-only, if the user is less technical, or if the workflow has to work on mobile?

## Things To Fill In Later

- Confirm the final public title: "Control Hub Agentic" or "Control Hub Agentic Experience."
- Confirm the exact project timeline and whether to say 2026 or a narrower date range.
- Confirm whether the Cisco Live US 2026 demo framing is safe to mention externally.
- Confirm whether the higher-trust proof should be Delete Virtual Line or voice gateway replacement for this deck.
- Confirm whether rollback is implemented in the prototype, implied in the design, or only shown as a future requirement.
- Confirm whether any manual time-saved estimates are defensible enough to use.
- Confirm how much of the internal prototype can be shown publicly.
- Capture or update the Activity screen if the final version includes Needs Attention, Running Now, History, detail drawer, and rollback.
- Add one concrete before-state visual for hidden work so the problem is visible before the framework appears.
- Keep the prototype craft beat in the main presentation; choose the single interaction sequence that best demonstrates timing, state, and cross-functional alignment.
- Add one backup Q&A note on accessibility / inclusive design for approval flows, status updates, and audit history.
- Add one backup Q&A note on how I would validate trust before implementation: comprehension, approval confidence, error recovery, and audit usefulness.
- Confirm the exact data sources, system-state checks, assumptions, and dependency evidence that can be shown in Device Onboarding.
- Replace the generic prototype-alignment outcome with the exact uncertainty, disagreement, or implementation decision it resolved.

## What Not To Do

- Do not make this a generic "agentic AI" thought piece.
- Do not lead with an autonomy ladder.
- Do not present AI as replacing admins.
- Do not turn the middle into a feature tour.
- Do not overclaim shipped impact or metrics.
- Do not hide the 0-to-1 product definition work.
- Do not skip the hidden-work problem: dependencies, exceptions, missing inputs, validation, approvals, and audit.
- Do not skip the trust constraint: permission, approval, audit, traceability, and rollback.
- Do not make the UI sound more theatrical than it was.
- Do not hide the important design point: admin control, approval, visibility, and audit.
- Do not let the case study sound like only an AI concept. Google will probe process, tradeoffs, collaboration, execution, ambiguity, and what I learned.
