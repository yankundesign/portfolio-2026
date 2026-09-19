# Hiring Manager Project Outline — From Context to Control

Audience: Jason Azares, Director of Product Design, Juniper Square
Interview: Senior Product Designer hiring-manager conversation
Work-sample slot: 25 minutes, with questions throughout
Prepared presentation: 21 minutes 5 seconds
Projects: CHAI Report Analysis + Control Hub Agentic
Role: Product design lead / interaction model owner

## The Recommendation

Present this as one product evolution, with many short visual beats.

- CHAI Report Analysis is the shipped foundation: how contextual AI helped administrators understand complex data.
- Control Hub Agentic is the deeper design story: how the interaction contract changed when AI moved from explaining to acting.
- Prepare about 20–21 minutes of content and leave about 4–5 minutes for Jason to interrupt and explore decisions.
- Use 27 Figma frames. Most frames should take 40–55 seconds.
- Each frame should contain one primary design state and one decision. Do not compress an entire design evolution into one slide.
- Keep the interface large. Use annotations only to point to the decision under discussion.

Working title:

> From context to control: designing AI that enterprise users can understand, direct, and trust.

More natural opening title:

> Helping admins understand complex data—and safely let AI act on it.

## The Story In One Sentence

> I started by designing contextual AI that helped administrators understand dense operational data, and then explored what had to change when AI moved from answering questions to planning and performing actions on their behalf.

## The User-Centered Throughline

Follow one type of person throughout the presentation: an enterprise administrator responsible for a complex system.

They need to:

1. Understand what is happening.
2. Know which data the AI used.
3. Decide what to do next.
4. Review what the AI is proposing.
5. Control when consequential work begins.
6. See progress and intervene if necessary.
7. Verify what changed afterward.

The design progression is:

```text
Context
-> explanation
-> evidence
-> recommendation
-> plan
-> approval
-> observable action
-> durable record
```

The theme to repeat is:

> Context makes an AI answer useful. Controls make an AI action trustworthy.

## Why This Is The Right Story For Jason

Jason asked for a real conversation about the work: lead with the user, show the decisions and tradeoffs, name the pushback, and be candid about what remains imperfect.

His public hiring language also emphasizes systems thinking, “pro-tool” UX, making sophisticated data intuitive, deep product-and-engineering collaboration, craft, and AI-native prototyping. This outline deliberately puts those signals in the work instead of describing them as personal traits: [Jason’s LinkedIn](https://www.linkedin.com/in/jasonazares).

The story is also directly relevant to Juniper Square’s current product context. Juniper Square describes an operating layer where AI agents inherit existing permissions and audit trails, and its AI CRM moves from conversational access and insights toward recommendations and action. The connection is not that private markets and Control Hub are the same domain. The connection is the design problem: consequential AI needs domain context, visible controls, and an accountable record. See [Juniper Square’s platform](https://www.junipersquare.com/platform) and [AI CRM](https://www.junipersquare.com/platform/ai-crm).

## Status Contract

Keep status visible in the Figma file and say it naturally. Do not attach shipped metrics to directional work.

| Work | Status | Safe language |
|---|---|---|
| Contextual CHAI patterns | Shipped | CHAI moved into real administrator workflows; broader monthly adoption increased from 3% to 18% |
| Report-row, report-page, and dashboard analysis | Shipped | The interaction expanded as the system became capable of handling broader data context |
| AI-generated Reports | Directional unless a later status is confirmed | A question-first model that keeps the generated report structure inspectable and editable |
| Control Hub Agentic model | Directional / working prototype | Defined and tested the interaction contract with PM, engineering, design, and leadership |
| Agent catalog, details, planning, execution, and Activity | Directional / working prototype | Used concrete states to evaluate how users would understand and control agent behavior |
| Agent Activity audit implementation | Directional unless a later status is confirmed | Proposed richer agent events inside the existing Control Hub audit system |

Say this once near the transition:

> The contextual report-row, report-page, and dashboard patterns reached customers. The AI-generated report and Agentic work were directional product prototypes. I’ll keep those outcomes separate as I walk through them.

## Timing And Visual Backbone

This pacing gives the design room to breathe without turning any one screen into a long monologue.

| Time | Frame | Visual beat | Decision to discuss |
|---:|---:|---|---|
| 0:00–0:35 | 1 | Title and user goal | Frame the project as context becoming control |
| 0:35–1:25 | 2 | Two admins, one accountable system | Introduce Victor’s strategic oversight and Francis’s operational responsibility as one connected workflow |
| 1:25–2:15 | 3 | Reporting before AI | The reporting request often moved from a Visionary to a Firefighter, but the report still left interpretation and action unresolved |
| 2:15–2:55 | 4 | Early report entry explorations | Compare global chat, page button, side panel, and row-level entry |
| 2:55–3:40 | 5 | V1: report-row sparkle | Match the UI scope to the system’s one-report technical capability |
| 3:40–4:30 | 6 | V1: scoped conversation and guardrails | Make context visible and let users ask a custom question immediately |
| 4:30–5:15 | 7 | V2: page-level `Ask AI` | Expand the entry point only when cross-report context became reliable |
| 5:15–6:00 | 8 | V2: live dashboard analysis | Keep the dashboard as source of truth; use AI as the first interpretation |
| 6:00–6:45 | 9 | V3: question-first report creation | Reverse the old form-first workflow and begin with user intent |
| 6:45–7:35 | 10 | V3: generated report and customization | Pair natural language speed with structured review and control |
| 7:35–8:10 | 11 | Report outcome and learning | Context and visible scope created a consistent trust contract |
| 8:10–8:50 | 12 | Bridge: context to controls | Explain why action requires a stronger interaction model |
| 8:50–9:50 | 13 | Why IT admins need an agentic workflow | Ground the need in the Firefighter’s interrupt-driven system-upkeep work, cross-team dependencies, and accountability |
| 9:50–10:45 | 14 | Agentic framework and trust strategy | Define Chat and Agents as the two ways to begin; place Activity inside the before/during/after trust model |
| 10:45–11:35 | 15 | AI-first overview | Keep Control Hub recognizable instead of replacing it with chat |
| 11:35–12:20 | 16 | Agent page | Turn agents into inspectable product objects with status and ownership |
| 12:20–13:05 | 17 | Agent details | Expose the agent’s operating contract, not only its description |
| 13:05–13:55 | 18 | Plan first | Translate a short request into assumptions, dependencies, and steps |
| 13:55–14:45 | 19 | Approval and observable execution | Separate plan approval from action and keep system state visible |
| 14:45–15:30 | 20 | Agent Activity | Give ongoing and completed work a durable operational home |
| 15:30–16:20 | 21 | Defining the right agent use cases | Combine research, product value, model evaluation, data readiness, feasibility, and action risk |
| 16:20–17:15 | 22 | Audit-log compromise | Preserve platform coherence while adding the detail agent actions require |
| 17:15–18:05 | 23 | Try to create an agent | Use conversation for intent, then hand off to a structured draft |
| 18:05–18:55 | 24 | Test before activation | Make testing and review part of creation, not post-launch cleanup |
| 18:55–19:45 | 25 | Working prototype | Use code to evaluate handoffs, persistence, timing, and failure states |
| 19:45–20:35 | 26 | Outcome, imperfection, next validation | Separate directional influence from customer validation still needed |
| 20:35–21:05 | 27 | Close | Land the context-to-control principle and invite discussion |

## Figma Presentation Rules

- Use the working file, not a polished presentation deck.
- Name frames `01` through `27` so you can jump around when Jason interrupts.
- Put `SHIPPED` or `DIRECTIONAL PROTOTYPE` in small mono text at the upper right.
- Keep each screen at a readable scale. Crop to the interaction under discussion instead of showing a tiny full product.
- Use one short annotation per decision: `Why here?`, `What changed?`, `User control`, or `Pushback`.
- Keep alternative explorations immediately to the left of the selected direction. Jason can see the decision history without waiting for a separate appendix.
- Where a sequence matters, duplicate the frame and change one state at a time. Do not use six tiny screens on one canvas.
- Keep redlines, component variants, edge states, and prototype connections nearby but outside the main frame. They are useful when Jason asks for detail.

---

# Detailed Frame-By-Frame Talk Track

## Frame 1 — From Context To Control

Time: 35 seconds.

### Show

- One report-analysis image on the left.
- One agent plan or Activity image on the right.
- A simple arrow: `Understand -> Act`.

### Say

> I’ll show one evolution of AI inside Control Hub. It started with helping enterprise administrators understand complex operational data, and it led to a larger question: once the AI understands the situation, how can it safely help the user act?

> The thread through both projects is trust—first through visible context, and then through visible controls.

### Do not do

- Do not explain Cisco’s company structure.
- Do not list every CHAI feature.
- Do not start with adoption metrics.

## Frame 2 — Two Admins, One Accountable System

Time: 50 seconds.

### Show

Do not show two large demographic persona cards. Show two working roles connected through the same system:

```text
Victor — Collab Visionary              Francis — Firefighter
Sets direction and standards    <->    Keeps the system running
Plans future IT needs                  Troubleshoots issues
Oversees teams and adoption            Manages devices, users, and settings
Needs reporting and governance         Executes and verifies changes
```

Place the shared responsibility underneath them:

```text
Understand what is happening
-> decide what should change
-> carry out the work safely
-> verify and communicate the result
```

Around Francis, lightly indicate the adjacent teams involved in daily work: help desk, endpoint/facilities, network, security, leadership, and support. Do not explain the full organization chart.

### Research Insight

“Control Hub administrator” is not one clean job title. The research grouped people by responsibilities because titles were inconsistent and team size changed the scope of the role.

- **Victor, the Collab Visionary**, plans and forecasts IT needs, creates implementation plans, oversees collaboration across teams, and cares about reporting, security, technical reliability, and role-based access.
- **Francis, the Firefighter**, handles daily stability: troubleshooting, devices, users, services, organization settings, and escalations.
- Their responsibilities overlap. Victor may set the direction or ask the strategic question; Francis often assembles the evidence, executes the work, and manages operational risk.
- Both are accountable, but at different altitudes: Victor for organizational outcomes and Francis for production consequences.

### Design point

Avoid designing one generic assistant for a generic admin.

- Victor needs concise, decision-ready insight with enough evidence to defend the decision.
- Francis needs operational depth: scope, dependencies, precise steps, exceptions, and recovery.
- The same AI system must support the handoff between strategy and execution without losing context or accountability.

### Say

> Our research showed that “the admin” was not one role. Victor, the Collab Visionary, was looking across the organization—planning technology needs, tracking adoption, and setting direction. Francis, the Firefighter, was responsible for the daily reality—troubleshooting issues and managing devices, users, and settings.

> They worked at different altitudes, but they shared the same system and depended on each other. Victor needed decision-ready insight; Francis needed enough context and control to execute safely.

> That relationship became the user throughline for both projects.

### Transition

> Reporting was one place where this handoff became especially visible.

## Frame 3 — Reporting Delivered Data, Not Understanding

Time: 50 seconds.

### Show

Use the two research personas to make the reporting workflow concrete:

```text
Victor — Collab Visionary
Needs an organization-level answer about utilization, adoption, or security
                         |
                         v
Francis — Firefighter
Configure -> generate -> download -> inspect -> compare -> interpret
                         |
                         v
Victor uses the result to plan, report upward, or make a product decision
```

Place one old Reports visual beside the flow. Highlight both points of friction:

- **Handoff:** the person who needs the insight may depend on someone else to produce it.
- **Reasoning gap:** generating the report still does not explain what matters or what to do next.

### Persona Evidence

- The **Collab Visionary** plans future IT needs, oversees collaboration across teams, and needs stronger analytics for utilization and security.
- The research notes that Visionaries often relied on Firefighters to generate reports.
- The **Firefighter** already spends most of their time on system upkeep, including troubleshooting, device management, users, and organization settings.
- Visionaries asked for deeper, less limited reporting, longer trend windows, scheduled delivery, and customizable report structures.

Keep the slide focused on the relationship. Leave the full task chart and list of reporting requests outside the main frame for Q&A.

### Decision question

How might AI shorten the distance between an organization-level question, the underlying data, and a decision—without hiding the report definition or evidence?

### Design Implication

This was not only a report-generation problem. The experience needed to:

- Let Victor begin with the question or decision.
- Use Control Hub context to reduce the manual request and handoff to Francis.
- Keep metrics, filters, sources, and time range visible so either persona could verify the answer.
- Produce a durable artifact that could be shared, scheduled, or revisited.

### Say

> Research showed two sides of this workflow: Victor, our Collab Visionary, needed organization-level answers about adoption, utilization, and security, while Francis, the Firefighter, often generated and inspected reports on top of his daily system-upkeep workload.

> The report still delivered data, not understanding. My design question became: how can the product use existing context to move both people toward an answer while keeping the evidence inspectable?

### Research Basis

The 2024 persona study combined a survey of 171 customer admins, 34 moderated interviews, and supporting analytics, satisfaction feedback, prior research, and TAC cases. Treat the Firefighter task percentages as directional: the report explicitly notes that this breakdown is approximate because the survey was not pre-screened by persona.

---

# Chapter One — Report Analysis: Designing Trust Through Context

## Frame 4 — Early Entry-Point Explorations

Time: 40 seconds.

### Show

Four large, rough explorations. These can be low-fidelity and should look like working design, not polished final UI.

1. Global assistant entry.
2. Reports-page `Ask AI` button.
3. Persistent side panel.
4. Sparkle attached to an individual report row.

Place a short question under each:

- Does the user know which data is in scope?
- Does the AI actually have that context?
- Does this interrupt the existing workflow?
- Can the pattern grow as the capability grows?

### Design decision

Choose the narrowest entry point that is honest about what the system understands.

### Tradeoff

- Global chat was flexible but made data scope ambiguous.
- A page-level action implied broader context than engineering could reliably provide at that point.
- A persistent side panel gave AI too much visual weight.
- The row-level entry was narrower, but its scope was clear and technically supportable.

### Say

> I explored several places for the interaction to begin. The broad options looked more powerful, but the system could initially pass only one report reliably as context.

> I chose the row-level direction because the interface and the technical capability told the same story. The user could see exactly which report CHAI would analyze.

### Moment to emphasize

> I reduced the scope instead of overstating what the AI understood.

## Frame 5 — V1: The Sparkle Belongs To The Report

Time: 45 seconds.

### Show

Use `site/public/images/chai/report-kickoff.png` at a large scale. Zoom into:

- The sparkle icon on the report row.
- The report name.
- The assistant opening with that report attached.

Put the earlier global and page-level options just outside the main frame for Q&A.

### Design decision

Location communicates scope before the assistant says anything.

### Why the sparkle

- It introduced a new AI capability without changing the primary report action.
- Its proximity tied the AI interaction to one artifact.
- It was visible but not disruptive to users who still wanted the existing workflow.

### Imperfection to acknowledge

Sparkle icons can become generic “AI decoration.” The icon alone did not create trust. Proximity, the selected report name, and visible context inside the panel had to reinforce the contract.

### Say

> The sparkle was not the important part by itself. The important part was where it lived. Attaching it to the report row told the admin, before opening CHAI, that this specific artifact would be the data source.

> It was also intentionally additive. Users could keep using Reports exactly as before.

## Frame 6 — V1: Start With The User’s Question, Keep Scope Visible

Time: 50 seconds.

### Show

Use `site/public/images/chai/report-delivered.png`, or a prototype sequence from `report-kickoff.png` into `report-delivered.png`.

Annotate only these elements:

1. Visible report context.
2. Free-text input ready immediately.
3. Suggested questions as lightweight guidance.
4. Structured answer or chart beside the source artifact.

### Design iteration

The initial idea gave suggested prompts more prominence. Beta behavior showed that admins often had specific questions based on the report type, time range, metric, or anomaly. The direction changed so the assistant opened directly with the input ready; suggested prompts became non-blocking guidance.

Do not quote an exact usage percentage unless you have verified it in the source analytics.

### Guardrails to show

- Which report is attached.
- What date range or filter is being analyzed, if available.
- A clear limit state when data is missing, stale, or unauthorized.
- A distinction between an answer grounded in report data and a more general explanation.
- The ability to ask a follow-up without restating the dataset.

If all of these were not in the shipped version, separate shipped guardrails from proposed guardrails visually.

### Say

> My first assumption was that suggested prompts would make the feature easier to start. What we saw was that report questions are usually very specific, so an extra prompt-selection step could slow people down.

> I changed the flow so the report was already attached, the input was ready, and suggestions were available without blocking the admin. This was a small interaction decision, but it preserved both context and user agency.

### Line to land

> Natural language made the question easy to ask. Visible scope made the answer safe to trust.

## Frame 7 — V2: Page-Level `Ask AI`

Time: 45 seconds.

### Show

Use the Reports-page state from your Figma source. Show the row-level V1 just outside the frame, then the V2 page-level entry as the hero.

If the exact V2 visual is not export-ready, create one clean Figma frame from the original design source rather than inventing a new interface.

### What changed

Engineering capability expanded from one attached report to questions across reports. The entry point moved with the capability.

### Design decision

Move `Ask AI` to the page level only when the system can fulfill the broader promise that placement makes.

### Tradeoff

- The page-level entry improves discoverability and supports broader questions.
- It also increases ambiguity, so the response must expose which reports, filters, or time ranges were actually used.

### Say

> As the system became capable of working across reports, I moved the entry point to the Reports page. The visual hierarchy now promised a broader scope, so the answer also needed to show what it actually analyzed.

> The UI evolved with the capability, but the user contract stayed the same: never make the data scope mysterious.

## Frame 8 — V2: AI Interprets The Dashboard; The Dashboard Stays Authoritative

Time: 45 seconds.

### Show

Use `site/public/images/chai/data-analysis.png` at full width.

Focus on:

- The existing dashboard and its filters.
- The `Ask AI` entry.
- The assistant explanation beside the visualization.
- Any visible question or selected data context.

### Design decision

Keep the dashboard as the source of truth. AI gives the data a first read; it does not replace the chart with a confident paragraph.

### Tradeoff

- A conversational summary is faster to understand.
- The visual evidence and filters still need to remain inspectable so the user can challenge the summary.

### Say

> On the dashboard, I did not want the assistant to become a second, competing version of the data. The dashboard remained authoritative. CHAI helped the admin interpret changes, affected segments, and unusual patterns while the underlying visualization stayed visible.

> This is where the design moved beyond chat. The useful experience was the relationship between the explanation and the evidence.

## Frame 9 — V3: Begin With The Decision, Not The Report Form

Time: 45 seconds.

### Show

Use the prompt and generation side of `site/public/images/chai/custom-report-1.png`.

Show the old and new workflow as a small comparison:

```text
Old
Configure a report -> generate -> inspect -> ask what it means

V3
Ask the question -> interpret scope -> generate the right report
```

### Design decision

Use natural language to capture intent, then translate it into an explicit report definition.

### Key distinction

This is not simply a larger answer inside chat. The output is a durable report artifact.

### Say

> The next direction flipped the workflow. Instead of making the admin define the report before they could ask the real question, they could begin with the decision they were trying to make.

> But I did not want natural language to hide the report logic. The system still had to turn the request into visible metrics, dimensions, filters, sources, and a time range.

## Frame 10 — V3: Generated Does Not Mean Opaque

Time: 50 seconds.

### Show

Use `site/public/images/chai/custom-report-2.png`, or progress from `custom-report-1.png` into `custom-report-2.png`.

Zoom into:

- Generated report structure.
- Metrics and dimensions.
- Applied filters and time range.
- Chart or table selection.
- Conversation used to revise the artifact.
- Save, share, export, or schedule controls if they exist in the source design.

### Design decision

Natural language is for speed; structured controls are for precision and ownership.

### Trust model

The admin should be able to inspect:

- What the AI interpreted.
- What data it used.
- What assumptions it made.
- What could not be supported.
- What changed after a revision.
- What will persist when the report is saved or scheduled.

### Tradeoff

A fully conversational report builder feels simple at first, but makes correction and reuse difficult. A fully structured builder is precise but keeps the old setup burden. The hybrid model uses conversation to create and revise a report while keeping the artifact explicit.

### Say

> The report could be created conversationally, but the definition stayed structured and editable. That was the trust mechanism. The admin could see what the AI had built, correct it, and understand what would be saved or scheduled.

> I used natural language for intent and structured UI for precision.

## Frame 11 — What The Report Evolution Taught Me

Time: 35 seconds.

### Show

Three large states in a horizontal progression:

```text
V1: one report
V2: reports page and dashboard
V3: generated report artifact
```

Under each, show one principle:

- `Scope is visible.`
- `Evidence stays inspectable.`
- `The output becomes editable and durable.`

### Say

> Across these versions, the surface changed as the capability grew, but the trust contract stayed consistent. The user could see the context, inspect the evidence, and keep control over the artifact.

> These contextual CHAI patterns shipped as part of the broader product evolution. As CHAI moved into real workflows, broader monthly adoption grew from 3% to 18%. I would not claim Report Analysis alone caused that result.

---

# Bridge — When AI Moves From Explanation To Action

## Frame 12 — Context Is Necessary, But It Is Not Enough

Time: 40 seconds.

### Show

A single transition diagram:

```text
Answering
context -> evidence -> explanation

Acting
context -> plan -> permission -> execution -> Activity
```

### Say

> Report Analysis helped the admin understand. The next product question was what should happen when AI could recommend and perform work.

> At that point, showing context was still necessary, but it was not enough. A short request could hide dependencies, permissions, irreversible effects, and failures. The user needed controls before, during, and after the action.

### Transition line

> This is where the design problem moved from context to control.

---

# Chapter Two — Agentic Control Hub: Designing Trust Through Control

## Frame 13 — Why IT Administrators Need An Agentic Workflow

Time: 60 seconds.

### Show

Center this frame on **Francis, the Firefighter**, and show why a single request enters an already fragmented day.

Top strip — the work already competing for attention:

```text
Overnight issues -> ticket queue -> room-device setup -> urgent escalation
-> migration work -> security sync -> after-hours change
```

The research describes a day that can stretch from 7 AM to 7 PM, cross the help desk, endpoint, security, network, management, and end-user teams, and continue with messages before sign-off.

Then place one realistic request in the center:

> “Onboard these 50 devices for the new offices next week.”

Then reveal the work hidden behind it:

```text
Device inventory
+ workspace assignments
+ network and firmware readiness
+ licenses and policy settings
+ site-specific exceptions
+ test batch
+ permission to make changes
+ failure recovery
+ verification and audit
```

Keep one administrator at the center. Surround them with the Control Hub surfaces and dependencies they would otherwise have to coordinate manually.

### Persona Evidence

Francis is responsible for keeping the system running and stable.

- More than 60% of the reported top-task time was related to system upkeep.
- The largest task categories were troubleshooting issues, configuring or managing devices, adding or managing users, and configuring services or organization settings.
- The work is interrupt-driven and shared across help desk, endpoint, network, security, management, and support teams.
- Repetitive, multi-step work is a recurring pain point, but the stronger fear is accidentally changing something and breaking the system for others.

The exact task percentages are directional, not a precise persona prevalence estimate; retain the study caveat in presenter notes.

### User problem

The administrator knows the outcome they need, but they should not have to remember every field, dependency, product location, or sequence required to get there safely.

Their pain is not only repetitive clicking:

- Routine work competes with urgent incidents and executive escalations.
- The admin must reconstruct context across tools, people, devices, and prior changes.
- The task begins as incomplete or fuzzy intent.
- Required context lives across different parts of Control Hub.
- The correct sequence changes with device, workspace, policy, and local exceptions.
- A fixed workflow can break when an input is missing or an environment differs.
- The administrator remains accountable for changes even when AI performs the work.

### Why agentic instead of a better form or fixed automation

- A better form can reduce setup friction, but it still makes the admin assemble every requirement manually.
- Fixed automation works well when the inputs and path are already known.
- An agentic workflow can gather context, identify missing information, propose a plan, coordinate several product capabilities, stop for judgment, and verify the result.

### Design opportunity

The agent should reduce coordination burden, not remove the administrator from the decision.

Split responsibility deliberately:

| The agent can carry | Francis must retain |
|---|---|
| Gather context across Control Hub | Confirm intent and local exceptions |
| Check prerequisites and dependencies | Review assumptions and affected scope |
| Build and update the plan | Approve consequential changes |
| Execute routine steps and report progress | Intervene when conditions change |
| Verify results and create the Activity record | Remain accountable for the final outcome |

### Say

> Francis, our Firefighter persona, spends most of the day keeping the system stable—troubleshooting, managing devices and users, coordinating with other teams, and handling urgent interruptions. The research showed that more than 60% of the reported top-task time was tied to system upkeep.

> So the opportunity was not simply to remove clicks. An agent could carry the coordination work—gather context, check dependencies, and prepare the plan—while Francis kept judgment over exceptions, approval, and intervention.

> That distinction mattered because Francis’s biggest concern was not effort alone. It was changing something and accidentally breaking the system for someone else.

### Line to land

> The value of the agent was not fewer clicks by itself. It was less coordination work without losing judgment or accountability.

## Frame 14 — The Agentic Framework And Trust Strategy

Time: 55 seconds.

### Show

Keep the framework deliberately simple, matching the visual:

```text
                 Chat + Agents
          Start with intent   Pre-built workflows
                        |
                        v

Before action          During action          After action
Context + plan         Control + feedback      Verification + Activity
```

The upper row is the **agentic framework**:

- **Chat:** The admin starts with an outcome or question in their own language. The system gathers missing information and routes the intent into work.
- **Agents:** The admin starts from a pre-built, repeatable workflow with a defined purpose, scope, and operating contract.

Add one small research callout beside the framework:

> **Research takeaway:** People adopt agentic AI incrementally—more like an intern becoming a trusted collaborator than an autonomous system arriving on day one.

The lower row is the **trust strategy** applied to either entry point:

- **Before action — context + plan:** Show what the agent knows, what is missing, the affected scope, assumptions, dependencies, and proposed steps.
- **During action — control + feedback:** Make the approval boundary clear, show live progress, and provide intervention when something changes or fails.
- **After action — verification + Activity:** Confirm the result and preserve who initiated the work, what was approved, which resources changed, failures, and final outcome.

### Design decision

Separate **how work begins** from **how trust is maintained**.

- Chat and Agents are not competing product areas. They are two starting points for different levels of user intent.
- Both must hand off into the same plan, execution, and verification contracts.
- Activity is not a third entry point or a standalone AI feature. It is the persistent after-action layer of the trust strategy.

### Product strategy

> Low threshold to start. Deep evidence when needed. Clear control before, during, and after action.

### Why Two Starting Points

- Chat gives a low threshold when the admin knows the outcome but not the exact workflow.
- Agents improve discoverability and predictability for established, repeatable jobs.
- The handoff between them prevents chat from becoming an unstructured place where consequential actions happen invisibly.

### Research-Led Recommendation

Use the **intern-to-collaborator** model to guide implementation:

1. **Understand the moments that matter.** Use contextual inquiry to find where admins lose time, encounter uncertainty, or need human judgment—and where an agent can create real value.
2. **Build trust through incremental waypoints.** Start with bounded recommendations, progress to plans with approval, and expand action only as users gain evidence, control, and confidence.

The short progression is:

```text
Recommend -> collaborate through a plan -> act within trusted boundaries
```

### Say

> I simplified the framework around two ways to begin. With Chat, the admin can start with intent in their own words. With Agents, they can start from a pre-built workflow for a known job.

> Our research suggested that adoption would be incremental—more like an intern becoming a collaborator. So we should not begin by asking users to trust full autonomy.

> Whichever path they choose, the trust strategy stays consistent: before action, show context and a plan; during action, provide control and feedback; after action, verify the result and preserve it in Activity.

### Line to land

> Chat and Agents make the system easier to use. The incremental trust strategy helps the agent earn the right to do more.

### Transition

> With that framework in place, I could evaluate each screen by the trust job it needed to perform.

## Frame 15 — AI-First Overview, Familiar Product

Time: 50 seconds.

### Show

Use `site/public/images/control-hub-agentic/ai-first-overview.png`.

If the image includes a before-and-after, reveal it in two steps:

1. The original Control Hub structure.
2. The AI-first overview inside the familiar shell.

### Pushback that changed the direction

The clearest feedback was: Control Hub should still feel like Control Hub. Users could see the value of agents, but they did not want a new AI surface to replace their operational home base.

### Design decision

Make AI an operating layer inside the product, not a separate destination that pulls the user away from known navigation, data, and system state.

### Tradeoff

- A chat-first home can look more radically “AI-first.”
- A familiar overview preserves orientation, existing workflows, and trust, but requires AI value to appear through the right objects, recommendations, and states instead of dominating the whole screen.

### Say

> My early framing gave the AI surface too much gravity. The strongest feedback was that administrators wanted Control Hub to remain their recognizable home base.

> I changed the direction so the agent worked inside the existing product structure. AI-first did not mean chat-first. It meant the product could understand intent and coordinate work without removing the admin’s orientation.

### Moment to emphasize

> I changed the surface while protecting the underlying goal.

## Frame 16 — The Agent Page Makes Capability Legible

Time: 45 seconds.

### Show

Use `site/public/images/control-hub-agentic/framework-agents-1.png`.

Focus on:

- Agent cards or rows.
- Active, draft, or other visible status.
- Ownership or team information.
- Search and filtering.
- Primary actions such as view, run, or manage.

### Design question

If agents can perform meaningful work, how does an administrator know what exists, what is active, and what they are responsible for?

### Design decision

Represent agents as inspectable product objects, not invisible skills hidden behind chat.

### Why this matters

- The catalog makes capability discoverable.
- Status makes readiness visible.
- Ownership supports governance.
- A stable object gives users somewhere to inspect behavior before running it.

### Tradeoff

Chat offers a low threshold for beginning a task, but it is poor at showing the full capability landscape and governance state. The agent page complements chat by making the system legible.

### Say

> I created an Agent page because chat alone made the system’s capability and governance too invisible. Admins needed to know which agents existed, which were active or still drafts, and who owned them.

> This turned the agent from a magical behavior into a manageable product object.

## Frame 17 — Agent Details Are The Operating Contract

Time: 45 seconds.

### Show

Use `site/public/images/control-hub-agentic/framework-agents-2.png`.

Annotate the parts that define behavior:

- Goal or purpose.
- Scope.
- Instructions.
- Data, skills, or tools.
- Triggers and schedule.
- Permissions or approval requirements.
- Recent Activity or test history.

Only name fields that actually exist in the visual. Keep additional proposed fields outside the main frame.

### Design decision

Treat details as the agent’s operating contract, not a marketing description.

### Tradeoff

Too little detail makes the agent feel unaccountable. Too much configuration recreates a developer console. Use progressive disclosure: show purpose, scope, status, and critical boundaries first; place deeper configuration below.

### Say

> The details page answers a different question from the catalog: what exactly is this agent allowed and expected to do?

> I treated the page as an operating contract. The goal, scope, instructions, triggers, and controls needed to be understandable before the user trusted the agent with a real task.

### Juniper relevance to keep in mind, not force into the script

This is the same category of trust problem Juniper Square describes when agents inherit a fund operating system’s permissions, identity, workflows, and audit trail.

## Frame 18 — Plan First: Make Hidden Work Inspectable

Time: 50 seconds.

### Show

Use `site/public/images/control-hub-agentic/device-onboarding-plan.png`.

Reveal the sequence:

1. The admin gives a short request.
2. The agent identifies known context.
3. Missing inputs and assumptions become visible.
4. The agent produces a step-by-step plan.
5. The approval boundary is clear.

### User problem

“Onboard these devices” sounds simple but hides workspace assignments, network readiness, firmware, policy settings, test batches, permissions, and failure recovery.

### Design decision

Do not translate request directly into execution. Translate it into a reviewable plan first.

### What the plan must expose

- The goal.
- Scope and affected objects.
- Information the agent already has.
- Missing inputs.
- Assumptions.
- Dependencies and prerequisite checks.
- Ordered steps.
- Risk or reversibility.
- The point where approval will start execution.

### Tradeoff

A plan adds friction to simple tasks. The design should scale the amount of review to consequence and uncertainty; it should not force a long approval ceremony for every low-risk action.

### Say

> My most important decision was to put a plan between intent and action. The user’s sentence is not an executable specification.

> The plan makes the agent’s interpretation visible: what it knows, what is missing, what will change, and where it needs approval. That creates a useful place for correction before the cost of a mistake goes up.

### Line to land

> The plan is not the agent narrating its reasoning. It is the contract the administrator is being asked to approve.

## Frame 19 — Approval Is A Boundary; Execution Is A Live System State

Time: 50 seconds.

### Show

Use `site/public/images/control-hub-agentic/device-onboarding-run.png`.

Show these states one at a time if the prototype supports them:

1. Ready for approval.
2. Running.
3. Step-level success or failure.
4. Needs attention.
5. Completed with result.

### Design decision

Separate approval from execution, then keep execution observable instead of collapsing it into a spinner.

### Controls to discuss

- Which steps the user is approving.
- Whether the action can be canceled or paused.
- What the agent can retry automatically.
- When the user must intervene.
- Whether partial completion is safe.
- What “done” means and how it is verified.

### Tradeoff

Too many confirmations turn automation into manual work. Too few erase the user’s authority. Approval should be tied to the consequential boundary, not scattered across every step.

### Say

> I separated “this plan looks right” from “start changing the system.” Once execution began, the workflow stayed visible at the step level.

> A spinner would hide too much. The admin needed to know what was running, what had succeeded, what needed attention, and whether they could safely intervene.

## Frame 20 — Activity Is A Live Control And A Durable Record

Time: 45 seconds.

### Show

Use `site/public/images/control-hub-agentic/framework-activity.png`.

If possible, connect one completed onboarding run to its matching Activity entry.

### Design decision

Give agent work a stable home that persists after the conversation ends.

### Activity should answer

- Who initiated the work?
- Which agent performed it?
- What plan was approved?
- What resources were read or changed?
- Which steps succeeded or failed?
- What was the final outcome?
- Is follow-up or rollback needed?

### Important distinction

Activity serves two time horizons:

- During execution: operational awareness and intervention.
- After execution: accountability, review, and handoff.

### Say

> Chat is temporary, but accountability cannot disappear with the conversation. Activity gave the work a durable home.

> During execution it helped the admin monitor and intervene. Afterward it became the record of what the agent did, what the admin approved, and what changed.

## Frame 21 — Defining The Right Agent Use Cases

Time: 50 seconds.

### Show

Use one selection funnel—not a backlog of AI ideas:

```text
Research                 PM                      Engineering              Trust screen
Moments that matter  ->  User and product value -> Model + data + tools -> Risk + control
                                                                         |
                                                                         v
                                                          Prioritized agent use cases
```

Under the funnel, show three example use cases on the **intern-to-collaborator** path:

| Use case | User value | Agent role | Risk position |
|---|---|---|---|
| **Compare locations** | Removes manual comparison across settings | Read, explain, and recommend | Low-risk starting point; user decides what to change |
| **Device onboarding** | Coordinates inputs, checks, settings, and validation | Build a plan and execute after a test batch and approval | High value with bounded, visible control |
| **Delete a virtual line** | Finds dependencies that are easy to miss | Investigate and present safer options before action | Consequential case used to define stronger guardrails—not the first autonomy milestone |

### How We Defined The Use Cases

#### Research — where would help matter?

- Identify frequent or high-friction jobs where admins coordinate information across several Control Hub surfaces.
- Find moments where users want assistance but still expect to exercise judgment.
- Use the intern-to-collaborator finding to favor incremental, inspectable assistance over full autonomy.

#### Product — is this worth solving?

- I worked with PM to assess the frequency, severity, and customer value of each job.
- We prioritized outcomes users already wanted help completing—not novel AI behaviors looking for a problem.

#### Engineering and evaluation — can the agent perform reliably?

- We worked with engineering to evaluate model performance for the task, not only general model quality.
- We checked whether the required data was available, current, permissioned, and accessible to the agent.
- We assessed whether the necessary product actions and verification signals were technically feasible.

Do not show invented evaluation scores. If exact thresholds or results are unavailable, show the evaluation questions and label the work directional.

#### Trust screen — is this an appropriate waypoint?

Evaluate each use case against:

- Consequence if the agent is wrong.
- Reversibility and blast radius.
- Whether the user can inspect the evidence and proposed plan.
- Whether approval can sit at a meaningful boundary.
- Whether execution and the final result can be verified in Activity.

### Design Decision

Start with tasks that are useful enough to prove value, bounded enough to evaluate, and low-risk enough for the agent to earn trust.

The research did not lead to “make the agent autonomous.” It led to a staged product strategy:

```text
Intern                    Collaborator                    Trusted operator
Read + recommend    ->    Plan + test + approval    ->    Act within proven boundaries
```

### Say

> We did not start by asking, “What can an agent do?” We started with the moments where admins actually wanted help.

> I worked with PM to prioritize high-value jobs, and with engineering to evaluate model performance, data availability, and whether the required actions and verification were feasible.

> Then we applied the research insight: begin with low-risk but genuinely useful tasks, and increase responsibility only through visible waypoints. Comparison is a good intern task. Device onboarding is a collaboration task because the agent can build a plan, run a test batch, and wait for approval. A destructive action helped us define the stronger controls we would need before expanding autonomy.

### Line To Land

> We selected use cases where the agent could earn trust through useful work, not where autonomy would make the best demo.

### Transition

> That same principle shaped the platform decisions too—especially how we handled Activity and audit.

## Frame 22 — Pushback: New Activity System Or Existing Audit Log?

Time: 55 seconds.

### Show

Use a comparison, not another finished screen:

| My initial direction | PM concern | Final compromise |
|---|---|---|
| A detailed Agent Activity experience | A parallel audit system would fragment Control Hub and increase cost | A new agent-event type inside the existing audit system, with richer agent-action details |

Place the Activity visual beside the table and highlight the details that needed to survive the compromise.

### The disagreement

- You proposed a detailed Activity model for plans, approvals, touched resources, execution, and outcomes.
- The PM wanted to preserve the existing Control Hub audit log.
- You agreed that a second audit system would fragment the platform.
- Research indicated that the existing event detail was insufficient for users to trust agent work.
- Engineering helped identify which richer details could realistically be captured.

### Design decision

Protect the trust requirement, not your original surface.

### Say

> I originally proposed a more independent Activity experience. The PM pushed back that Control Hub already had an audit log and that a parallel system would fragment the platform.

> I agreed with that concern, but the existing event model did not show enough detail for agent actions. I worked with engineering to identify what we could capture, and the compromise was a new agent event inside the existing audit system with richer details for approval, affected resources, steps, and outcome.

> I stopped defending the original surface and protected the user need underneath it: accountability.

### Why Jason may care

This is strong evidence of product judgment, cross-functional collaboration, platform thinking, and willingness to change direction.

## Frame 23 — Creating An Agent Starts With Intent

Time: 50 seconds.

### Show

Use the conversational creation portion of `site/public/images/control-hub-agentic/create-test-agent.png`.

If the source supports it, reveal:

1. “What should this agent help with?”
2. Example task or goal.
3. Follow-up questions about scope, trigger, data, and approval.
4. A structured draft being assembled beside the conversation.

### Design decision

Use conversation to help a domain expert describe intent, but convert that intent into an inspectable configuration.

### Alternatives considered

- Form-first builder: precise, but asks users to understand the system model before expressing the goal.
- Chat-only creation: approachable, but hides how the agent will behave.
- Hybrid: conversation for intent and clarification; structured draft for review and governance.

### Say

> I also explored what it would take for an administrator to create an agent. I did not want to begin with a large configuration form, because users usually start with the outcome they need.

> Conversation helped capture that intent and ask follow-up questions, but the result could not remain a paragraph in chat. It had to become a structured draft the user could inspect.

## Frame 24 — Draft, Test, Then Activate

Time: 50 seconds.

### Show

Use the structured draft and test portions of `site/public/images/control-hub-agentic/create-test-agent.png`.

Make the lifecycle visible:

```text
Describe intent
-> clarify
-> review structured draft
-> test with a safe case
-> inspect result
-> revise
-> activate
```

### Design decision

Creation is not complete when configuration exists. The user needs evidence of behavior before activation.

### Test state should help the user inspect

- The input the agent received.
- The context and tools it used.
- The proposed plan or output.
- Whether approval boundaries were respected.
- Errors, unsupported cases, or missing access.
- What would happen differently in a real run.

### Tradeoff

Testing adds time before launch, but it converts an abstract configuration into observable behavior. For a high-consequence agent, that is part of setup rather than optional QA.

### Say

> I made testing part of the creation flow because a goal and instructions can look correct while producing the wrong behavior.

> The admin could try a safe case, inspect what the agent understood, revise the configuration, and only then activate it. Trust came from evidence of behavior, not from a polished description.

## Frame 25 — Why I Built The Direction In Code

Time: 50 seconds.

### Show

Use `site/public/images/control-hub-agentic/prototype-craft.png` and a short live prototype sequence.

Do not spend time showing tools as résumé logos. Show one decision static screens failed to answer.

Good examples:

- How chat hands off to a persistent workflow.
- Whether a plan remains available after navigation.
- What happens while a long-running step is active.
- How a failure changes the next available control.
- How a completed run becomes an Activity entry.

### Design decision

Build the uncertain system behavior, not every screen at production fidelity.

### Say

> Static frames made the concept look coherent, but they did not answer the hardest questions: when does chat become workflow, where does the plan persist, what happens during a long-running action, and how does the result appear in Activity?

> I built a working React prototype with AI coding tools so the team could react to those behaviors as software. The prototype was a decision-making instrument, not only a demo.

### Collaboration point

Name the partners and what they changed:

- PM clarified product scope and platform constraints.
- Engineering clarified available context, event capture, and execution states.
- Research or customer feedback protected the need for a familiar Control Hub home base and deeper transparency.
- Your prototype made the unresolved behavior concrete enough to debate.

## Frame 26 — Outcome, Imperfection, And Next Validation

Time: 50 seconds.

### Show

Three columns:

| What became clear | What the prototype influenced | What remains unproven |
|---|---|---|
| Agent work needs plans, approval boundaries, observable execution, and Activity | Stakeholder buy-in and a concrete direction for the next phase of AI in Control Hub | Customer comprehension, appropriate approval friction, intervention behavior, audit usefulness, and recovery from partial failure |

### Say

> The Agentic work did not ship as a complete product, so I would not present a customer outcome. Its value was that it turned a broad AI ambition into a concrete interaction contract the team could evaluate.

> The working prototype helped earn stakeholder buy-in for the direction and shifted the conversation from “how autonomous should it be?” to “what exactly is the administrator approving?”

> The biggest gap is customer validation across real risk levels. My next step would be to test low-, medium-, and high-consequence workflows and measure whether people understand scope, catch plan errors, intervene appropriately, and trust the Activity record afterward.

### Imperfection to volunteer

> In the current prototype, every important decision is visible, but the approval model may be too heavy for routine, reversible tasks. I would next design a risk-based control model rather than use one approval pattern everywhere.

## Frame 27 — Close: Context Before Action, Control Around Action

Time: 30 seconds.

### Show

Return to the simple model:

```text
Context -> evidence -> plan -> approval -> action -> Activity
```

### Say

> The report work taught me how to make AI useful through context and inspectable evidence. The Agentic work taught me that once AI can act, trust has to become an interface: a visible plan, a meaningful approval boundary, observable execution, and a durable record.

> That is the design problem I’m excited about—making sophisticated AI systems feel powerful without asking users to surrender understanding or control.

Then stop. Let Jason choose where to go deeper.

---

# The Design Decisions Jason Should Hear Clearly

Do not rely on him to infer these from the screens. Name them directly.

## Report Analysis

1. I rejected a broad global entry when the system could support only one reliable report context.
2. I used placement and visible context together to communicate scope.
3. I changed suggested prompts from a blocking first step into lightweight guidance.
4. I moved the entry point from row to page only as technical capability expanded.
5. I kept the dashboard visible as the source of truth rather than replacing it with prose.
6. I used conversation to capture report intent but retained structured configuration for precision and reuse.
7. I treated missing, stale, unauthorized, and unsupported data as designed states, not error-copy cleanup.

## Agentic

1. I changed the AI-first direction after feedback that Control Hub still needed to feel like Control Hub.
2. I made agents visible and manageable as objects with status, ownership, and details.
3. I treated agent details as an operating contract.
4. I inserted a plan between request and execution so the user could correct the agent before action.
5. I separated approval from execution and made execution observable.
6. I designed Activity for both live intervention and durable accountability.
7. I combined research, PM prioritization, and engineering evaluation to select useful, feasible, lower-risk starting use cases.
8. I accepted the PM’s platform concern and evolved the existing audit model instead of defending a separate system.
9. I used conversation for agent-creation intent, then converted it into a structured, testable draft.
10. I built the uncertain behavior in code so the team could evaluate the real interaction model.

# Likely Interruptions And Natural Answers

## “Why did this need to become an agentic workflow?”

> The admin’s goal crossed several product areas and the correct path changed based on what the system found. A fixed form could collect inputs, and automation could execute a known sequence, but neither could gather missing context, adapt the plan, stop for judgment, and verify the result across the workflow. The agent reduced that coordination burden while keeping the administrator responsible for the consequential decisions.

## “How would you build trust before asking users to accept broader autonomy?”

> I would start with bounded, inspectable jobs. First let the agent compare and recommend, then let it execute a reviewable plan with approval, and only move toward more consequential work after we see that users understand the plan, catch errors, intervene correctly, and can verify the result in Activity. Autonomy should expand from evidence, not from the ambition of the concept.

## “How did you choose the first agent use cases?”

> We started with research to identify the moments where admins genuinely wanted help, then worked with PM to assess user value and product impact. With engineering, we evaluated task-level model performance, data availability, and whether the necessary actions and verification were feasible. Finally, we screened for consequence and reversibility. That led us toward bounded but useful starting points, such as comparison and plan-based onboarding, rather than beginning with high-risk autonomy.

## “Why did you use a sparkle icon?”

> The icon helped signal a new AI capability, but I would not claim the icon created understanding. The more important choice was attaching it to the report row. That placement communicated the data scope, and the opened panel reinforced it by showing the selected report. If I revisited it now, I would test whether a clearer label could improve comprehension without making every row visually noisy.

## “Why not start with the page-level `Ask AI` button?”

> At that point the system could reliably use only one report as context. A page-level entry would have implied broader understanding than the product could deliver. I chose a narrower pattern that was honest, then expanded it when the capability grew.

## “What changed because of user behavior?”

> I initially gave suggested prompts more weight because I thought they would reduce blank-page friction. Admins often came in with very specific questions, so the extra prompt-selection step could get in the way. I changed the flow so free typing was ready immediately and suggestions became optional guidance. I would use exact behavior percentages only after verifying the analytics.

## “Why not put the entire reporting experience in chat?”

> Chat is good for expressing intent and making revisions. It is weak at showing a report’s durable definition. Metrics, dimensions, filters, sources, and schedule need a stable structure the user can inspect and reuse. The hybrid model gave us conversational speed without making the artifact opaque.

## “Why do you need an Agent page if users can just ask in chat?”

> Chat is a good entry for intent, but it hides what the system can do and which agents are active, owned, or still drafts. The Agent page made capability and governance legible. Chat started work; the Agent page helped people understand and manage the system.

## “Why show a plan instead of letting the agent proceed?”

> Because the user’s sentence is not an executable specification. The plan exposes scope, missing information, dependencies, and consequences at the cheapest point to correct them. I would scale the amount of review to the risk rather than require the same plan ceremony for every task.

## “How did you decide what required approval?”

> I would base it on consequence, reversibility, uncertainty, scope, and permissions. Reading data and drafting a recommendation may not need approval. Changing many devices, deleting an object, or communicating externally does. The key is that approval sits at the meaningful boundary, not on every small step.

## “Why did you change your Activity design?”

> The PM was right that a separate audit system could fragment Control Hub. I stopped defending that surface and focused on the trust requirement. We worked with engineering on a richer agent-event type inside the existing audit structure, so we could preserve platform coherence and still show plans, approvals, affected resources, steps, and outcomes.

## “How did the prototype change the product discussion?”

> It exposed questions that static screens hid: when chat hands off to workflow, how plans persist, what users see during a long-running action, and how results become Activity. That moved the discussion from a general debate about autonomy to a more useful question: what contract is the administrator approving?

## “What would you validate next?”

> I would test the model across tasks with different risk and reversibility. I would look for whether users understand the agent’s scope, catch incorrect assumptions in the plan, know when to intervene, and can reconstruct what happened from Activity. I would also test whether the approval model becomes too heavy for routine work.

## “How does this relate to Juniper Square?”

> I would not pretend network administration and private markets are the same domain. What feels directly transferable is the interaction contract. Juniper Square has connected, sensitive data and workflows where an agent may recommend or take action. The product has to make context, permissions, approval boundaries, and the audit trail clear enough that users can rely on it without treating the AI as magic.

# Visual Preparation Checklist

## Report Analysis frames

- [ ] Frame 2 working-role map: Victor’s strategic oversight <-> Francis’s operational responsibility, with one shared accountable workflow.
- [ ] Frame 3 persona handoff: Victor’s organization-level question -> Francis’s reporting work -> Victor’s decision.
- [ ] Old report workflow or report-table before state.
- [ ] Four early entry-point explorations from the original Figma file.
- [ ] V1 row-level sparkle: `site/public/images/chai/report-kickoff.png`.
- [ ] V1 scoped answer: `site/public/images/chai/report-delivered.png`.
- [ ] V2 report-page `Ask AI` state from the original design source.
- [ ] V2 dashboard analysis: `site/public/images/chai/data-analysis.png`.
- [ ] V3 question-first generated report: `site/public/images/chai/custom-report-1.png`.
- [ ] V3 structured customization: `site/public/images/chai/custom-report-2.png`.
- [ ] At least one real limit or guardrail state.
- [ ] One small status label distinguishing shipped work from directional work.

## Agentic frames

- [ ] Frame 13 Firefighter context: one condensed day-in-the-life strip plus the device-onboarding request and hidden dependencies.
- [ ] Frame 13 responsibility split: what the agent carries versus what Francis retains.
- [ ] IT-admin workflow map showing the hidden work behind device onboarding.
- [ ] Chat + Agents as the two starting points, mapped into the shared before, during, and after trust strategy.
- [ ] One brief research callout: `Intern -> collaborator`, connected to incremental trust waypoints.
- [ ] Risk ladder: compare and recommend -> onboard with approval -> inspect dependencies before destructive action.
- [ ] Use-case selection funnel: research need -> PM value -> engineering evaluation -> trust and risk screen.
- [ ] AI-first overview: `site/public/images/control-hub-agentic/ai-first-overview.png`.
- [ ] Agent page: `site/public/images/control-hub-agentic/framework-agents-1.png`.
- [ ] Agent details: `site/public/images/control-hub-agentic/framework-agents-2.png`.
- [ ] Plan first: `site/public/images/control-hub-agentic/device-onboarding-plan.png`.
- [ ] Approval and execution: `site/public/images/control-hub-agentic/device-onboarding-run.png`.
- [ ] Agent Activity: `site/public/images/control-hub-agentic/framework-activity.png`.
- [ ] Audit-log compromise diagram.
- [ ] Conversational creation: `site/public/images/control-hub-agentic/create-test-agent.png`.
- [ ] Structured draft and test state from the same creation flow.
- [ ] Prototype craft: `site/public/images/control-hub-agentic/prototype-craft.png`.
- [ ] One failure, missing-input, permission, or needs-attention state.
- [ ] `DIRECTIONAL PROTOTYPE` label on every Agentic frame.

## If A Visual Is Missing

Do not replace it with a paragraph slide. Use one of these:

1. A rough exploration from the working Figma file.
2. A close crop of the interaction with one annotation.
3. A before-and-after pair.
4. A component-state strip: default, loading, needs attention, success, failure.
5. A decision comparison: selected direction, rejected alternative, reason.

# Practice Rules

- Advance as soon as you have named the user problem, the decision, and the reason.
- Aim for 2–4 spoken sentences per frame.
- Pause when Jason asks a question; do not say, “I’ll get to that later.”
- If he goes deep on one decision, skip later frames rather than rushing every remaining screen.
- The non-negotiable frames are 4–10 for Report Analysis and 13–24 for Agentic. Frames 11, 12, 25, and 26 can compress if time is short.
- Practice once at 20 minutes and once at 17 minutes.
- In the 17-minute version, remove Frames 2, 11, 19, and 25, then combine Frames 23 and 24. Preserve the user need, framework, and use-case-selection logic in Frames 13, 14, and 21.
- For an emergency 15-minute cut, also combine Frames 7 and 8, and deliver Frame 26 as one 20-second status statement.
- Do not memorize every sentence. Memorize the opening, the bridge, the audit-log disagreement, the outcome distinction, and the final close.

# Five-Minute Question Strategy

Ask one question first and keep a backup.

Primary:

> As Juniper Square moves from AI-assisted data experiences into more agentic workflows, where is the design team finding the hardest trust problem today: helping users understand what the system knows, helping them control what it can do, or making its actions accountable afterward?

Backup:

> When you review work with your designers, what separates a strong AI workflow from a polished AI feature in your mind?

If there is time for a more role-specific question:

> This role sits close to sophisticated fundraising data and workflows. Where do you want the designer to go deepest in the first six months: domain modeling, interaction patterns for recommendations and agents, or strengthening the product system around them?

# Final Reminder

The presentation is not:

> I designed a report chatbot, and then I designed several agent screens.

It is:

> I learned how to make AI useful by grounding it in visible product context. When the capability moved toward action, I redesigned the interaction contract around plans, permissions, observable execution, and Activity. I changed direction when user feedback and platform constraints showed that trust had to live inside the existing product—not in a separate AI experience.
