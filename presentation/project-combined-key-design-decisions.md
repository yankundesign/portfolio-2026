# CHAI + Agentic — Key Design Decisions

Purpose: hiring-manager discussion and portfolio Q&A  
Companion: `project-combined-chai-agentic-outline.md`  
Story: `Context -> evidence -> plan -> approval -> action -> Activity`

## How To Use This Document

For each decision, explain five things:

1. What user problem were we solving?
2. What constraint or evidence shaped the decision?
3. What alternatives did I consider?
4. What tradeoff did I accept?
5. What did I learn, and what would I change now?

Do not present these as five perfect solutions. The stronger story is how the interaction model evolved as user evidence, technical capability, and product risk changed.

## Status At A Glance

| Decision | Status | Safe outcome language |
|---|---|---|
| 1. Report row -> sparkle | Shipped | Established the first contextual Report Analysis pattern within the one-report technical constraint |
| 2. Page-level entry | Shipped | Improved discoverability and created a reusable entry pattern as broader report context became available |
| 3. AI-generated report | Directional unless later confirmed | Explored a question-first reporting model with structured, reviewable output |
| 4. Agent plan first | Directional working prototype | Defined the contract between natural-language intent and consequential execution |
| 5. Agent Activity and audit | Directional unless later confirmed | Reconciled richer agent accountability with the existing Control Hub audit system |

---

# Design Decision 1 — Report Row To Sparkle

## Problem To Solve

We needed to test whether CHAI could analyze a report in a real workflow and establish the first repeatable pattern for contextual AI inside Control Hub.

The first technical version could reliably pass only one report as context. The interface needed to communicate that narrow scope honestly instead of suggesting that CHAI understood the entire Reports page.

## User Need

- Francis, the Firefighter, needed help interpreting a report without downloading it and rebuilding the context somewhere else.
- The entry point needed to stay close to the artifact he was already working with.
- Existing report actions still needed to remain available for users who did not want AI assistance.

## Decision

Place a sparkle action directly on each report row. Selecting it opens CHAI with that report already attached as context.

This made location part of the interaction contract:

```text
The action is attached to this report
-> CHAI opens with this report in scope
-> follow-up questions remain grounded in this report
```

## Alternatives Considered

### Global assistant entry

- More flexible and easier to reuse.
- Made it unclear which report or data set CHAI would analyze.
- Required the user to reconstruct or attach context manually.

### Page-level `Ask AI`

- More visible.
- Implied that CHAI could reason across the whole Reports page before the technical capability supported that promise.

### Persistent assistant panel

- Kept AI constantly available.
- Gave the assistant too much visual weight and competed with the core reporting workflow.

### Report-row sparkle

- Narrower and less visible.
- Matched the actual one-report capability and made the scope clear before the assistant opened.

## Icon And Brand Tradeoff

- An assistant or mascot icon risked making the interaction feel like a separate branded persona rather than a capability attached to Reports.
- The sparkle was a more neutral signal for a new AI-assisted action.
- We used the product’s blue rather than introducing a new “AI color,” protecting brand consistency and avoiding unnecessary visual competition in a dense table.
- The compromise was discoverability: a small sparkle could be interpreted as decoration or missed entirely.

## Why I Chose It

> I chose the narrowest pattern that was honest about what the system understood. The row placement made the data scope visible, and the existing reporting workflow remained intact.

## Result And Learning

- It established the first contextual Report Analysis pattern.
- It proved that product context could remove the need for manual attachment or explanation.
- It also exposed the next problem: a trustworthy entry point can still be too easy to miss.

## Answer To Say

> The first version could reliably use only one report as context, so I placed the AI action directly on the report row. That made the scope clear before the assistant opened. We considered an assistant icon, but it felt too much like introducing a separate persona, so we used a neutral sparkle in the existing product blue. The tradeoff was visibility, which became the next problem we addressed.

---

# Design Decision 2 — Move To A Page-Level Entry

## Problem To Solve

The row-level sparkle was easy to miss, and adoption remained low. We treated discoverability as a likely contributor—not the only cause—and looked for a more visible entry that could scale across Reports and other data-heavy surfaces.

At the same time, technical capability had expanded beyond a single report, so the interface could honestly support broader questions.

## User Need

- Victor, the Collab Visionary, needed to begin with an organization-level question rather than first choosing a single report.
- Francis still needed the resulting answer to expose which reports, filters, and time ranges were used.
- Both users needed one consistent way to access AI across Reports and Analytics.

## Decision

Move `Ask AI` to the page level and use it to launch the existing assistant.

Do not place a separate free-text input directly on every page.

## Why Launch The Assistant Instead Of Adding An Input Field

- The assistant already owned conversation state, loading behavior, history, suggestions, errors, and follow-up questions.
- A separate page-level input would create another component and interaction path to design, build, maintain, and keep behaviorally consistent.
- Launching the assistant created one scalable pattern that could be reused on Reports, Analytics dashboards, and other contextual surfaces.
- It also preserved page space in already dense enterprise interfaces.

## Alternatives Considered

### Keep only the row-level sparkle

- Preserved precise scope.
- Continued the discoverability problem and limited broader questions.

### Add a large prompt input to the Reports page

- Made the AI capability highly visible and reduced the first click.
- Duplicated assistant functionality and introduced another input behavior to maintain.
- Consumed valuable space and could make AI dominate the page.

### Page-level launcher into the assistant

- Added one click compared with direct input.
- Reused a mature conversational surface and created a consistent entry pattern across the product.

## Scope Tradeoff

A page-level entry makes a broader promise than a row-level action. The assistant therefore needed to expose what it actually analyzed—selected reports, filters, date range, or dashboard state—so discoverability did not come at the cost of clarity.

## Why I Chose It

> I wanted a more visible entry, but I did not want every product page to grow its own version of an AI input. Launching the assistant gave us a scalable pattern and kept the conversation behavior in one place.

## Result And Learning

- The entry pattern expanded from one report to the Reports page and Analytics dashboards.
- The design system gained a reusable contextual-AI launcher rather than a collection of custom prompt boxes.
- The core contract stayed consistent: broader entry, but visible data scope.

## Answer To Say

> The row sparkle was contextual but easy to miss. As the technical capability expanded, I moved `Ask AI` to the page level. I deliberately made it a launcher rather than placing another input field on the page, because the assistant already handled conversation state, follow-ups, errors, and history. That gave us a reusable pattern without maintaining two versions of the same interaction.

---

# Design Decision 3 — AI-Generated Reports

## Problem To Solve

Existing report templates were useful for known questions, but they were difficult to customize and could not easily support the specific analysis users needed.

The old sequence was:

```text
Choose a template
-> configure fields
-> generate the report
-> inspect the data
-> build the interpretation
```

Users also needed visualizations and a report artifact they could save, share, schedule, and revisit—not only an answer inside chat.

## User Need

- Victor wanted to begin with the business or operational question.
- Francis needed to verify the generated definition and underlying data.
- Both needed control over metrics, dimensions, filters, time range, visualization, and delivery.

## Decision

Reverse the workflow:

```text
Ask the question
-> CHAI interprets the requested scope
-> CHAI generates a structured report
-> the user reviews and customizes it
-> save, share, export, or schedule
```

Use natural language to capture intent, but keep the report definition visible and structured.

## Key Interaction Choice

The generated result was a durable report artifact, not a long conversational answer.

The interface exposed:

- Report title and purpose.
- Metrics and dimensions.
- Filters and time range.
- Chart or table selection.
- Generated interpretation.
- Revision through conversation.
- Persistent actions such as save, share, export, or schedule where supported by the concept.

## Alternatives And Tradeoffs

### Template-only reporting

- Predictable and easier to validate.
- Could not cover the range of user questions and customization needs.

### Chat-only report generation

- Fast and approachable.
- Hid the report definition, made correction harder, and produced an output that was difficult to reuse.

### Conversational creation plus structured report

- Required coordination between chat state and report state.
- Preserved speed while giving the user precision, reviewability, and ownership.

## Interaction We Did Not Implement

I explored direct manipulation: selecting a report card or visualization and chatting directly about that element—for example, “change this chart,” “group this by location,” or “explain this spike.”

I did not move that interaction forward because we did not have enough research to validate whether users would understand the selection-to-chat relationship or prefer it over explicit report controls.

That was a deliberate scope decision, not a conclusion that the interaction was wrong.

## Why I Chose The Hybrid Model

> Natural language was the fastest way to express the question. Structured controls were the clearest way to inspect and own the result.

## Status And Outcome

- Treat this direction as a concept or prototype unless its later status is confirmed.
- Its value was defining a question-first reporting model and making the trust requirements concrete.
- Do not attach the shipped CHAI adoption metric directly to this concept.

## Answer To Say

> Report templates were difficult to customize and did not support the visual analysis users wanted. I flipped the workflow so the user could begin with the question, but I did not let the output remain hidden in chat. CHAI generated a structured report with visible metrics, filters, time range, and visualization choices. I explored selecting a card and chatting directly with it, but we did not have enough research to validate that interaction, so I kept it out of the main direction.

---

# Design Decision 4 — Agent Plans Before It Acts

## Problem To Solve

A natural-language request can sound complete while hiding information the system needs to act safely.

For example, “Onboard these devices” can hide:

- Device inventory and ownership.
- Workspace assignments.
- Network and firmware readiness.
- Licenses, settings, and policy choices.
- Site-specific exceptions.
- Test strategy and failure recovery.
- Permissions and approval boundaries.

Francis remained accountable if the system changed the wrong object or interrupted service. A short request could not be treated as an executable specification.

## Decision

Always analyze and create a reviewable plan before consequential execution.

The interaction contract became:

```text
Intent
-> gather context
-> identify missing inputs and assumptions
-> check dependencies
-> create an editable plan
-> test where appropriate
-> request approval
-> execute visibly
```

## What The Plan Needed To Expose

- The goal and success condition.
- Affected resources and scope.
- Known information and missing inputs.
- Assumptions and local exceptions.
- Prerequisites and dependencies.
- Ordered steps.
- Validation or test batch.
- Risk, reversibility, and failure handling.
- The exact point where approval starts execution.

## Alternatives Considered

### Request -> immediate execution

- Fast and visually impressive.
- Hid interpretation errors until the most expensive moment.
- Treated a conversational request as permission.

### Ask for every field conversationally, then execute

- Filled information gaps.
- Forced the user to mentally reconstruct the complete workflow and did not provide one artifact to review.

### Reviewable plan before execution

- Added time and friction before action.
- Made the agent’s interpretation inspectable and gave the user a clear correction and approval boundary.

## Tradeoff

The same plan ceremony should not apply to every task.

- Low-risk, reversible work may need only a compact preview.
- Wide-scope, destructive, external, or difficult-to-reverse actions need deeper review and explicit approval.
- The amount of plan detail should scale with consequence, uncertainty, and blast radius.

## Why I Chose It

> The plan is not the agent narrating its internal reasoning. It is the contract the administrator is being asked to approve.

## Outcome And Learning

- The working prototype made planning, approval, execution, and intervention concrete.
- It shifted the product discussion from “How autonomous should the agent be?” to “What exactly is the administrator approving?”
- Treat this as directional product-definition impact, not a shipped customer outcome.

## Answer To Say

> I put a plan between intent and action because the user’s sentence was not an executable specification. The plan exposed scope, missing information, assumptions, dependencies, and the steps the agent proposed. That gave Francis a place to correct the system before approval. The tradeoff was friction, so I would scale the plan depth to the risk rather than use one approval model for every task.

---

# Design Decision 5 — Agent Activity Inside The Existing Audit System

## Problem To Solve

Agent work could not disappear when the conversation ended.

Administrators needed to know:

- Who initiated the work.
- Which agent performed it.
- What plan was approved.
- Which systems or resources were touched.
- Which steps succeeded, failed, or required intervention.
- What ultimately changed.
- Whether follow-up or recovery was needed.

The existing audit log could show that an event occurred, but agent work required a richer account of plan, approval, execution, and outcome.

## Initial Direction

I proposed a dedicated Agent Activity experience that could support:

- Live execution progress.
- Step-level status and intervention.
- Plans and approvals.
- Affected resources.
- Completed outcomes and failures.
- A durable history of agent work.

## Pushback

The PM wanted to preserve the existing Control Hub audit log rather than create a parallel system.

That concern was valid:

- A second audit destination could fragment the platform.
- Users would need to know which log was authoritative.
- Engineering and maintenance costs would increase.
- Compliance and retention behavior could diverge.

## Decision

Protect the accountability requirement, not the original surface.

I worked with PM and engineering on a compromise:

- Preserve the existing audit system as the durable source of truth.
- Add a new agent-event type.
- Expand the event details to capture the approved plan, actions, affected resources, failures, and outcome.
- Use Activity as the operational view during and after execution, while keeping the durable record aligned with the existing platform audit model.

## Tradeoff

- A dedicated Activity system could provide a more tailored agent experience.
- Extending the existing audit model preserved platform coherence but required working within its information architecture and technical constraints.
- The compromise separated two related needs without creating two competing sources of truth:

```text
Activity = monitor, intervene, and understand agent work
Audit = durable, governed record of what occurred
```

## Why I Changed Direction

> I agreed that a parallel audit system would fragment Control Hub. I stopped defending my original surface and protected the user requirement underneath it: enough detail to understand and verify agent actions.

## Outcome And Learning

- The PM accepted that agent actions required richer detail.
- I accepted that the stronger platform answer was to evolve the existing audit system rather than replace it.
- Engineering helped define which agent details could be captured realistically.
- The result better balanced user trust, platform consistency, and implementation cost.

## Answer To Say

> I initially proposed a dedicated Activity experience, but the PM pushed back that Control Hub already had an audit log. I agreed that creating a parallel source of truth would fragment the platform. The existing log still needed richer detail for agent actions, so I worked with PM and engineering on a new agent-event type inside the existing audit system. I changed the surface, but protected the trust requirement underneath it.

---

# What I Would Do Differently

## 1. Instrument Discovery Before Changing The Entry Point

For the report sparkle, I would define the complete discovery funnel before launch:

```text
Eligible report views
-> sparkle seen
-> sparkle selected
-> assistant opened
-> first question submitted
-> useful follow-up or report action
```

That would help separate an icon-visibility problem from relevance, answer quality, latency, or trust issues. I would also test sparkle-only, labeled `Ask AI`, and contextual menu treatments rather than infer the cause from adoption alone.

## 2. Design The AI Entry Pattern As A System Earlier

The row and page patterns evolved incrementally. I would define the placement and scope rules earlier:

- Object-level entry for one attached artifact.
- Page-level entry for broader page context.
- Global entry for cross-product questions.
- A consistent way to show exactly what context moves into the assistant.

This would reduce later pattern reconciliation and make engineering requirements clearer sooner.

## 3. Test Conversational And Direct Report Editing

For AI-generated Reports, I would prototype and compare:

- Conversation-only revision.
- Traditional structured controls.
- Selecting a report card or visualization and chatting directly with that element.
- A hybrid model that keeps chat and direct manipulation synchronized.

I would test discoverability, correction speed, confidence in the final definition, and whether users understand which element their instruction will change.

## 4. Define Risk Tiers Before Designing One Approval Pattern

For Agentic workflows, I would establish the risk model earlier:

| Risk tier | Example | Control model |
|---|---|---|
| Low | Read and compare settings | Recommend; no action without user choice |
| Medium | Onboard a bounded device batch | Editable plan, test batch, approval, observable execution |
| High | Delete or broadly modify resources | Dependency analysis, alternatives, explicit approval, recovery path, detailed audit |

This would prevent the plan-first pattern from becoming too heavy for routine work or too light for consequential work.

## 5. Design Failure, Recovery, And Partial Completion Earlier

The primary Agentic flow established the happy-path contract. I would bring these states into the working prototype earlier:

- Required data is missing or stale.
- The agent lacks access.
- A prerequisite changes after approval.
- Only part of a batch succeeds.
- A step is safe to retry automatically.
- The user pauses, cancels, or resumes the run.
- A completed change needs reversal.

Trust is often decided in the recovery experience, not in the successful demo.

## 6. Align Activity And Audit Taxonomy Earlier

I would bring design, PM, engineering, security, and compliance together earlier to define:

- Agent identity and initiating human identity.
- Plan and approval event types.
- Read versus write actions.
- Affected-resource references.
- Failure, retry, intervention, and rollback events.
- Retention, permission, export, and redaction needs.

This would let the live Activity experience and durable audit record share one event model from the beginning.

## 7. Validate The Intern-To-Collaborator Progression With Behavior

The research suggested that trust would develop incrementally. I would measure whether the product was actually earning more responsibility:

- How often users correct the proposed plan.
- Which assumptions cause correction.
- Approval and abandonment rates by risk level.
- Intervention and cancellation behavior.
- Failure and recovery success.
- Whether users can reconstruct what happened from Activity.
- Whether users choose broader agent scope after successful bounded tasks.

Autonomy should expand from evidence of reliable collaboration, not from the ambition of the roadmap.

---

# The Five Decisions In One Minute

> First, I put the Report Analysis entry directly on the report row because the system could use only one report as context. That was honest and contextual, but easy to miss.

> Second, as the capability expanded, I moved `Ask AI` to the page level. I used it to launch the existing assistant instead of building a second input component, which gave us a reusable pattern across Reports and Analytics.

> Third, I flipped report creation from template-first to question-first, but kept the generated report structured so users could inspect and own the definition.

> Fourth, when AI moved from explaining to acting, I inserted a reviewable plan between the user’s request and execution. That made missing context, assumptions, dependencies, and approval visible.

> Fifth, I changed my original Activity direction after PM pushback. Instead of creating a parallel audit system, we evolved the existing audit model with richer agent events. Across all five decisions, the pattern was the same: make AI easier to use without making its scope or consequences invisible.

# Questions To Confirm Before The Interview

- Was low adoption measured specifically for the report sparkle, or was low discoverability inferred from qualitative feedback and overall usage?
- Which report-page and dashboard entry patterns definitively shipped?
- Was the assistant-icon versus sparkle decision documented in a design review, and what exact brand concern should be named?
- What parts of AI-generated Reports were researched, prototyped, or reviewed with customers?
- Was direct card selection tested at all, or only explored internally?
- Which Plan First states were included in the working prototype?
- Was the agent-event audit compromise implemented, approved as direction, or proposed?
- Which Activity fields engineering confirmed could be captured?

Until these are confirmed, preserve the shipped-versus-directional labels above and avoid claiming causal impact.
