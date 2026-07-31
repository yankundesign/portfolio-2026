# Google AI Foundations Onsite Preparation

Role: Interaction Designer, AI Foundations  
Team: Google Core / AI Foundations  
Stage: Onsite interview  
Primary users: Developers, researchers, and internal technical teams

Related case-study outlines:

- [Project 1 - Control Hub AI Assistant](./project-1-control-hub-ai-assistant-outline.md)
- [Project 2 - Control Hub Agentic](./project-2-control-hub-agentic-outline.md)

## Positioning Theme

### One-line version

> I design trustworthy AI data tools that help technical users move from complex data to clear insight and confident action.

### Spoken version

> My strongest work is in complex enterprise systems where technical users need to understand a lot of data and make consequential decisions. I design the path from the user's question, through the relevant data and analysis, to an insight they can verify and act on. With AI, I make the evidence, assumptions, system state, and action history visible so the experience is useful without becoming a black box.

### The three pillars

1. **Make complex data legible**
   - Understand the user's domain, mental model, and decision.
   - Reduce complexity without hiding the precision technical users need.
   - Turn fragmented data and system state into a coherent workflow.

2. **Turn data into decision-ready insight**
   - Start with the question or decision, not a generic dashboard or chat box.
   - Give AI the right data scope, context, and tools.
   - Structure analysis around patterns, anomalies, comparisons, and next steps.

3. **Make AI inspectable and controllable**
   - Show sources, scope, filters, freshness, assumptions, conflicting evidence, and limits.
   - Let users review and refine generated reports or proposed actions.
   - Preserve permissions, approval, progress, audit history, and rollback where possible.

### Language to use carefully

Avoid saying that the interface exposes the model's hidden "thinking." The useful trust pattern is not raw chain-of-thought. It is:

- What data the system used.
- How that data was scoped or transformed.
- What evidence supports or conflicts with the result.
- What assumptions and limitations affect the result.
- What the system did, is doing, or plans to do next.

Use **evidence, rationale, provenance, assumptions, system state, and traceability** instead of "show the AI's thinking."

## Role Thesis

AI Foundations is not only designing dashboards or adding AI to existing tools. The team is shaping how Google's technical users interact with data infrastructure at scale.

The likely design problems are:

- Helping developers and researchers find the right data across complex systems.
- Supporting exploration, analysis, comparison, and custom reporting.
- Designing understandable interactions between people, data, and AI.
- Making data scope, lineage, freshness, permissions, and uncertainty visible.
- Moving from analysis to agentic action without losing user control.
- Creating reusable interaction patterns across a large ecosystem of internal tools.
- Making product tradeoffs with PM, Engineering, Research, and domain experts.

My strongest fit:

> I have designed the same class of interaction problem in enterprise administration: dense operational data, fragmented workflows, technical users, AI-assisted analysis, generated reports, and actions with permissions and consequences.

Do not claim that IT administrators and Google developers or researchers are identical users. Make the adjacent expertise clear:

> The domain is different, but the design challenge is familiar: expert users need speed and precision, the system has complex data and dependencies, and simplifying too aggressively can hide information they need to make a safe decision.

## What The Onsite Should Prove

Across the presentation, design exercise, and behavioral interviews, consistently demonstrate:

- I can learn a technical domain without pretending to be the domain expert.
- I frame the user's decision before choosing a feature or interface.
- I can model complex workflows and system states before designing screens.
- I make explicit tradeoffs about what to build, defer, or reject.
- I design AI around real data context rather than a generic chat experience.
- I know when to use natural language, structured UI, visualization, or a combination.
- I make AI outputs reviewable through evidence and provenance.
- I can connect analysis and custom reports to safe agentic workflows.
- I work as a senior cross-functional partner and influence product direction.
- I carry ideas from ambiguity through prototypes, implementation decisions, and measurement.

## Hiring Manager Signals And Portfolio Proof

| Hiring manager signal | Strongest proof | Point to land |
|---|---|---|
| Analytics and data tools | CHAI Reports, Dashboards, and AI-Generated Reports | I designed how users scope data, ask questions, interpret outputs, and refine generated reports. |
| Developers and researchers | Control Hub technical admins plus TAC experts | I learn expert workflows and preserve the precision technical users need. |
| Complex user flows | Troubleshooting decision model | I mapped scope, signals, issue types, and evidence before designing the interface. |
| What to build or not build | Better Chat -> Skills -> contextual entry points | I used evidence to move beyond chat polish and prioritized workflow-level value. |
| Data and AI interaction patterns | Contextual analysis and evidence widgets | The product supplies context; the output exposes evidence, limits, and next steps. |
| Custom data reports | AI-Generated Reports | The workflow moves from question to generated structure to review and customization. |
| Agentic workflows around data | Control Hub Agentic | Insight becomes a visible plan, permissioned action, execution state, and audit record. |

## One Story Across Both Projects

The two projects should form one data-to-action arc:

> Project 1 shows how I helped users move from fragmented product data to contextual analysis, evidence, and generated reports. Project 2 shows how I extended that foundation from understanding data to planning and carrying out work with user control.

| Stage | User question | Interaction model | Trust requirement |
|---|---|---|---|
| Question | What am I trying to understand or accomplish? | Intent and clarification | Clear scope |
| Data | What information is relevant? | Context, filters, permissions, tools | Provenance and freshness |
| Analysis | What patterns or anomalies matter? | AI analysis plus structured UI | Assumptions and limits |
| Evidence | Why should I believe this? | Sources, timeline, supporting and conflicting signals | Inspectability |
| Decision | What should I conclude or choose? | Summary, comparison, recommendation | Human judgment |
| Action | What should happen next? | Generated report or agent plan | Review and approval |
| Trace | What happened and can it be checked? | Shareable report, activity, audit, rollback | Accountability |

## 1. Portfolio Presentation

### Presentation goal

Do not present yourself primarily as a chatbot designer. Present yourself as a designer of **AI-mediated data workflows for technical users**.

The hiring team should remember:

> Yankun can turn complex data into insight, make the result trustworthy, and connect it to controlled action.

### Project 1 emphasis

Keep the existing 15-minute decision spine, but give the strongest role-relevant time to:

- Reports and dashboard analysis.
- AI-generated reports.
- Troubleshooting as evidence-based decision support.
- The tradeoff from generic chat to contextual skills and entry points.

For the AI-generated report workflow, show:

1. The user starts with the decision or question.
2. The system identifies the likely data sources, time range, metrics, and filters.
3. The user resolves ambiguity or adjusts scope.
4. AI proposes a report structure and interpretation.
5. The interface exposes data sources, applied filters, freshness, assumptions, and unsupported gaps.
6. The user reviews, edits, or regenerates part of the report.
7. The report can be saved, shared, exported, or scheduled.
8. Later viewers can inspect how the report was produced.

The key design decision:

> I reversed the workflow from "build a report, then interpret it" to "start with the insight you need, then review the report the system builds."

The key tradeoff:

> Natural language made report creation easier, but it could not replace visible configuration. Metrics, filters, data scope, and assumptions still needed structured controls.

### Trust patterns to add

Show a small, coherent set rather than a catalog:

- Data sources and lineage.
- Data freshness and time range.
- Applied filters and transformations.
- Supporting and conflicting evidence.
- Assumptions, missing data, and limits.
- Confidence only when it has a meaningful, explainable basis.
- Edit, retry, compare, and report-an-error paths.
- Version or change history for generated reports.
- Shareable evidence that survives outside the original chat thread.

The troubleshooting story should demonstrate:

> The assistant does not jump to a conclusion. It builds a case that the user can inspect, challenge, and share.

### Project 2 emphasis

Refine the agent framework so it clearly builds on data analysis:

`intent -> data context -> analysis/evidence -> plan -> permission -> execution -> activity -> audit/rollback`

Clarify the contract at each stage:

| Stage | What the AI does | What the user sees or controls |
|---|---|---|
| Intent | Interprets the goal | Scope and clarification |
| Context | Selects relevant data and tools | Sources, access, and constraints |
| Analysis | Identifies conditions and dependencies | Evidence and limitations |
| Plan | Proposes steps and expected effects | Editable, reviewable plan |
| Permission | Requests the required authority | Approval boundary |
| Execution | Performs permitted steps | Progress, status, and intervention |
| Activity | Records what happened | Durable trace |
| Audit / rollback | Supports inspection or recovery | Accountability and control |

Add one explicit "what not to build" decision:

> We did not let the agent move directly from a natural-language request to execution. The plan-first model added a step, but it made scope, dependencies, permissions, and expected changes reviewable before the system acted.

### Current outline audit

Audit scope:

- [Project 1 - Control Hub AI Assistant](./project-1-control-hub-ai-assistant-outline.md)
- [Project 2 - Control Hub Agentic](./project-2-control-hub-agentic-outline.md)

This audit describes what is present in the written outlines. It does not mean the final slides, visuals, metrics, or rehearsal are complete.

#### Project 1 updates already in the outline

- The case study is now a 14-slide, 15-minute story instead of a feature tour.
- The opening establishes CHAI as an AI-driven data-tool story, states personal ownership, and introduces the shared onsite positioning.
- `Better Chat Was Not Enough` makes the failed first direction part of the problem framing.
- `Turn Routing Into Skills` is restored as a distinct interaction and product tradeoff.
- `The Product Supplies Context` makes the conceptual model explicit:
  `intent -> context -> skill/tool -> analysis/evidence -> structured output -> guardrail/review`.
- Smart Search is compressed into one decision and measurable proof point.
- Reports and dashboard analysis are restored as a dedicated data-workflow slide.
- AI-Generated Reports now show the complete lifecycle from question and interpreted scope through provenance, editing, saving, sharing, scheduling, and history.
- The report tradeoff is explicit: natural language accelerates intent, while structured controls preserve precision and user control.
- `Designing AI Limits` distinguishes missing or stale data, access boundaries, unavailable sources, and insufficient evidence.
- Troubleshooting is organized into expert research, diagnostic modeling, and evidence-based decision support.
- Raw data is transformed into inspectable evidence, visible rationale, and a durable shareable trace.
- Status labels separate confirmed shipped work, work whose status needs confirmation, and next validation.
- The ending now bridges from understanding data to controlled agentic action.

#### Project 2 updates already in the outline

- The case study is now a focused 7-slide, 7-minute-45-second story.
- The opening connects both projects through `Context -> Control`.
- The project is framed as 0-to-1 product definition, not a speculative AI concept.
- The workflow architecture is explicit:
  `intent -> data context -> analysis/evidence -> plan -> permission -> execution -> activity -> audit/rollback`.
- The architecture names what the AI does and what the user sees or controls at every stage.
- `Familiar Surface, Evidence When Needed` explains progressive disclosure for technical detail.
- `Always Analyze And Plan First` includes the rejected alternative of moving directly from a natural-language request to execution.
- Device Onboarding is the single end-to-end proof instead of touring several use cases.
- Permissioned or destructive work is kept as a short stress test or backup.
- Activity is treated as the durable execution and audit surface.
- The React prototype demonstrates how evidence review, timing, state, approval, intervention, handoff, audit, and rollback became testable.
- The outcome is accurately framed as alignment and decision clarity rather than shipped metrics.
- The closing returns to the shared positioning: complex data -> verifiable insight -> controlled action -> trace.

#### Remaining outline gaps

- Confirm the onsite portfolio timing, interruption model, interviewers, and presentation format.
- Confirm the shipped, beta, validated, prototype, or directional status of AI-Generated Reports and troubleshooting.
- Adoption and Smart Search metrics still require final verification and external-sharing confirmation.
- Replace the generic Project 2 alignment outcome with the exact uncertainty, disagreement, or implementation decision the prototype resolved.
- The written outlines request backup material, accessibility notes, validation answers, and readable trust visuals; those assets still need to be produced.
- Both timed versions still need rehearsal with interruptions and Q&A.

Portfolio status at a glance: **15 checklist items covered and 4 execution or verification items still open** in the written outlines.

### Portfolio checklist

Status key:

- `[x]` Covered in the current written outlines.
- `[ ]` Still needs outline, slide, asset, verification, or rehearsal work.
- **Partial** means the core idea exists, but the listed gap remains.

#### P0 - Required before the first mock

- [x] Add the onsite positioning statement to the opening and closing.
- [x] Update both outline headers and spoken framing for the onsite audience. Confirm the exact format separately.
- [x] Expand AI-Generated Reports into a complete question-to-report lifecycle.
- [x] Show the structured report configuration that remains after the natural-language request: metrics, filters, schedule, layout, and assumptions.
- [x] Add provenance, data scope, freshness, unsupported gaps, and limitations to the generated-report example.
- [x] Show review, edit, save, share/export, schedule, and history for generated reports.
- [x] Refine troubleshooting from "AI answer" to `evidence -> decision -> shareable trace`.
- [x] Refine the agent framework to `intent -> data context -> analysis/evidence -> plan -> permission -> execution -> activity -> audit/rollback`.
- [x] Add one clear build/defer/reject tradeoff to each project: generic chat/context routing in Project 1 and direct execution versus plan-first in Project 2.
- [x] Distinguish shipped outcomes, directional concepts, and future validation in the talk track.
- [x] State personal ownership and partner contributions in both projects.
- [ ] Confirm every metric and remove any unsupported number.

#### P1 - Required before the final mock

- [x] Add one failure or low-confidence state for generated analysis.
- [x] Add permissions and access-boundary states through the agentic workflow.
- [x] Add generated-report history to the Project 1 lifecycle and Activity/audit history to Project 2.
- [ ] Prepare backup slides for research, alternative concepts, system architecture, failure states, and metrics.
- [x] Prepare a developer/researcher transfer statement without overstating direct domain experience.
- [ ] Rehearse the current 15-minute and 7-8-minute versions with interruption points.
- [ ] Prepare 30-second answers for ownership, tradeoffs, validation, metrics, and what I would change.

#### Definition of done

- A reviewer can explain the data-to-action story after one viewing.
- Every major screen is tied to a user decision, not just a feature.
- The report flow shows both AI flexibility and structured user control.
- Trust is demonstrated through concrete interface details.
- Each project contains at least one rejected or deferred direction.
- The presentation finishes within its target time without rushing the conclusion.

## 2. Design Exercise

### Design principle

Start with the decision the user needs to make, not with a dashboard, chat box, or AI feature.

### Reusable framework: Question -> Data -> Analysis -> Evidence -> Decision -> Action -> Trace

1. **Question**
   - Who is the user?
   - What are they trying to decide or accomplish?
   - How often, how urgently, and with what consequence?

2. **Data**
   - What sources, schemas, time ranges, and permissions are involved?
   - What data may be missing, delayed, conflicting, or too expensive to query?
   - What does the user already know about the data?

3. **Analysis**
   - Is the task search, exploration, comparison, diagnosis, prediction, or generation?
   - What should AI do, and what should remain deterministic or manually controlled?
   - Does the user need natural language, structured controls, visualization, or all three?

4. **Evidence**
   - What sources, transformations, assumptions, and uncertainty must be visible?
   - How can the user inspect, challenge, or reproduce the result?
   - What happens when the system lacks enough evidence?

5. **Decision**
   - What is the smallest output that makes the user decision-ready?
   - What alternatives or tradeoffs should be compared?
   - What judgment must remain with the user?

6. **Action**
   - Is the output a query, report, alert, shared artifact, or agent plan?
   - What requires review, permission, or approval?
   - Which actions are reversible, and which need stronger safeguards?

7. **Trace**
   - What should be saved, shared, audited, or rolled back?
   - How will another user understand what happened later?
   - How will the team measure quality and user trust?

### Tradeoff framework

When deciding what to build, compare:

- User value and decision impact.
- Frequency and urgency.
- Data availability and quality.
- Model capability and failure risk.
- Consequence and reversibility.
- Permission and privacy requirements.
- Latency and compute cost.
- Reusability across products and workflows.
- Implementation complexity and learning value.

State the decision explicitly:

> For the first version, I would build ___ because ___. I would defer ___ until we validate ___. I would not build ___ because the risk or complexity is not justified by the user value yet.

### Competitive research plan

Study products for interaction patterns, not visual inspiration alone.

| Product | What to study |
|---|---|
| Hex | Notebook-to-app workflow, collaborative analysis, AI-assisted exploration, and report sharing |
| Databricks | Technical workflows, data lineage, governance, notebooks, and AI-assisted querying |
| Datadog | Investigation flows, observability, time-series evidence, traces, and alert-to-diagnosis transitions |
| BigQuery and Looker | Query-to-insight workflows, semantic models, dashboards, and governed reporting |
| Snowflake | Data exploration, AI interaction, permissions, and governance |
| Grafana | Dense technical visualization, filtering, alert context, and drill-down |

Capture the same fields for each product:

- Primary user and job.
- Starting point.
- Data scope and navigation model.
- Role of AI.
- Structured controls versus natural language.
- Visualization and output model.
- Provenance, confidence, and failure patterns.
- Collaboration and sharing.
- Path from insight to action.
- Reusable pattern and unresolved weakness.

### Design patterns, UI patterns, and components to study

Do not try to memorize entire products. Build a vocabulary of patterns and know:

- What user problem the pattern solves.
- When it is appropriate.
- What information it must expose.
- What tradeoff it introduces.
- How it behaves with missing data, limited access, uncertainty, or failure.

#### 1. Data discovery and workspace patterns

Study how technical users orient themselves before analysis.

| Pattern | What to learn |
|---|---|
| Project or workspace switcher | How users move between datasets, environments, teams, or saved work without losing context |
| Data-source picker | How source type, owner, access, freshness, and connection status are communicated |
| Schema or asset browser | Search, hierarchy, metadata preview, favorites, recent items, and large-schema navigation |
| Notebook or block canvas | How queries, code, charts, text, and AI output form one analysis narrative |
| Split-pane workspace | How users inspect data, write a query, and view output without constant navigation |
| Saved view or workspace state | What filters, time ranges, comparisons, and layout choices are preserved |
| Command palette or quick search | How expert users navigate and act quickly without removing visible navigation |

Questions to ask:

- What context persists when users change datasets or views?
- How does the product communicate production, staging, or test environments?
- How are access restrictions and unavailable sources shown?

#### 2. Query, filter, and exploration patterns

Study how users move from a broad question to a precise data scope.

| Pattern | What to learn |
|---|---|
| Query editor | Autocomplete, schema suggestions, validation, explainability, query history, and run cost |
| Natural-language query | How the system confirms interpretation and exposes the generated query or configuration |
| Filter builder | Simple chips versus advanced nested logic, previewing result counts, and removable constraints |
| Time-range picker | Relative versus absolute time, timezone, comparison periods, and freshness |
| Group, aggregate, and pivot controls | How users change granularity without rewriting the analysis |
| Compare mode | Side-by-side, baseline, cohort, version, or time-period comparison |
| Drill-down and cross-filtering | How a chart selection changes tables and related views while keeping scope visible |
| Query or exploration history | How users return to a prior state, compare iterations, or reproduce a result |

Questions to ask:

- Is natural language faster than structured controls for this task?
- Which choices need immediate preview or validation?
- How does the interface prevent an invisible filter from changing the conclusion?

#### 3. Data display and visualization patterns

Study how the interface helps users identify the signal without hiding the underlying data.

| Pattern | What to learn |
|---|---|
| Dense data table | Sorting, pinning, column configuration, grouping, bulk actions, pagination, and virtualization |
| Metric summary | Current value, baseline, change, definition, time range, and data-quality status |
| Time-series chart | Zoom, compare, anomaly markers, event overlays, missing intervals, and timezone |
| Distribution or breakdown | Segments, cohorts, outliers, long tails, and switching between count and percentage |
| Linked chart and table | Moving between a visual pattern and the exact supporting records |
| Annotation and event overlay | Connecting deployments, incidents, or user actions to changes in the data |
| Progressive disclosure | Summary first, then evidence, raw data, query, or trace when needed |
| Empty and partial-data visualization | Distinguishing no data, zero, delayed data, filtered-out data, and failed retrieval |

Questions to ask:

- What decision should the visualization support?
- Does the user need overview, comparison, diagnosis, or exact lookup?
- Can the user inspect the records behind a summarized claim?

#### 4. AI-assisted analysis patterns

Study how AI and structured data interaction work together.

| Pattern | What to learn |
|---|---|
| Context-aware AI composer | Data, dashboard, report, time range, and selection attached as visible context |
| Clarification step | Asking one high-value question before choosing a metric, source, or analysis path |
| Suggested analysis paths | Recommendations that teach capability without blocking free-form questions |
| Analysis plan preview | Showing intended sources, steps, and output before a long or expensive analysis |
| Progress and tool status | Communicating which stage is running, what source is blocked, and whether partial results are useful |
| Structured AI response | Combining concise explanation, metrics, charts, tables, evidence, and next steps |
| Inspect generated query | Letting technical users view or edit SQL, filters, transformations, or tool calls |
| Section-level edit or regenerate | Correcting one chart or explanation without discarding the entire report |
| Feedback and correction | Capturing wrong source, wrong scope, incorrect interpretation, or missing evidence |

Do not expose raw model chain-of-thought. Expose the information users can evaluate:

- Sources and data scope.
- Applied filters and transformations.
- Assumptions and unsupported gaps.
- Supporting and conflicting evidence.
- Generated query or structured configuration when useful.
- What the system plans to do next.

#### 5. Report building and collaboration patterns

Study how an analysis becomes a reusable artifact rather than disappearing inside a conversation.

| Pattern | What to learn |
|---|---|
| Block-based report builder | Rearranging text, charts, tables, metrics, and generated sections |
| Report configuration panel | Sources, metrics, filters, schedule, recipients, access, and output format |
| Draft and review state | Distinguishing generated draft, reviewed report, and published artifact |
| Version history | What changed, who changed it, and how to restore or compare versions |
| Comments and mentions | Collaborating around a specific chart, metric, or claim |
| Share and permission model | Viewer, editor, owner, link access, and restricted data |
| Schedule and subscription | Cadence, delivery channel, data cutoff, failures, and ownership |
| Export and handoff | Preserving sources, timestamps, configuration, and caveats outside the product |

Questions to ask:

- What must remain editable after AI generation?
- How will another person verify the report later?
- What happens when a viewer lacks access to one of the underlying sources?

#### 6. Trust, provenance, and governance patterns

Study these as core interaction patterns, not secondary metadata.

| Pattern | What to learn |
|---|---|
| Source citation | Linking a claim or chart to the exact dataset, query, record, or document |
| Data freshness indicator | Last updated, expected cadence, delayed state, and impact on the conclusion |
| Lineage view | Upstream sources, transformations, ownership, and downstream impact |
| Scope and filter summary | Keeping active time range, population, environment, and exclusions visible |
| Assumption and limitation callout | Separating known facts, inferred interpretation, and unsupported areas |
| Permission boundary | Explaining what is unavailable, why, and how to request or change access |
| Audit history | Query, prompt, configuration, approval, action, actor, and timestamp |
| Quality or confidence signal | Using confidence only when the basis is meaningful and explainable |

Failure distinctions to practice:

- No matching data.
- Data exists but is stale or incomplete.
- The user lacks access.
- The system cannot reach the source.
- The question is ambiguous.
- The evidence does not support a reliable conclusion.
- The model or transformation failed.

#### 7. Agentic action patterns

Study how an insight safely becomes a system change.

| Pattern | What to learn |
|---|---|
| Plan review | Scope, evidence, dependencies, steps, expected changes, and failure handling |
| Diff or impact preview | What will change, what will not change, and affected resources |
| Permission and approval | Required role, approval boundary, stronger confirmation for higher consequence |
| Test run or dry run | Validating a subset or simulating effects before full execution |
| Execution progress | Step-level status, partial success, blocked state, retry, and estimated duration |
| Pause, stop, or intervene | When the user can safely interrupt and what happens to completed steps |
| Activity log | Needs attention, running, completed, failed, approver, and touched resources |
| Rollback or recovery | Reversibility, compensating action, and cases where rollback is unavailable |

Questions to ask:

- What evidence must exist before the system can propose an action?
- Which actions can be automatic, which require review, and which should remain manual?
- What control does the user need before, during, and after execution?

#### 8. Components to sketch confidently

P0 components for timed exercises:

- Data-source and schema picker.
- Search, filter builder, and active-filter summary.
- Time-range and comparison control.
- Dense table with drill-down.
- Time-series chart with anomaly or event annotations.
- AI composer with visible context attachments.
- Clarification prompt with structured options.
- Structured AI result with sources, assumptions, and next steps.
- Generated-report review and configuration panel.
- Plan review with impact preview and approval.
- Execution status and Activity record.

P1 components for deeper technical flows:

- Query editor with validation and generated-query inspection.
- Lineage or dependency graph.
- Permission and access-request state.
- Version history and report comparison.
- Comments, sharing, scheduling, and export.
- Dry-run results, partial success, retry, and rollback.

States to include in practice:

- Empty and first-run.
- Loading, streaming, and long-running.
- Partial result.
- No data versus zero value.
- Stale or delayed data.
- Ambiguous request.
- Insufficient evidence.
- Permission denied.
- Source unavailable.
- Failed action and partial success.
- Completed with audit trace.

#### Pattern research card

Create one compact card for every pattern worth remembering:

| Field | What to capture |
|---|---|
| Pattern | Clear name and screenshot or sketch |
| User job | The decision or task it supports |
| Trigger | When the pattern appears |
| Information | What the user must see |
| AI role | What AI contributes, if anything |
| User control | What can be scoped, edited, approved, stopped, or reversed |
| Failure | Missing data, access, uncertainty, latency, or execution issue |
| Tradeoff | What the pattern improves and what complexity it adds |
| Reuse | Which other data or AI workflows could use it |

### Practice prompts

- Design an AI-assisted tool for a developer investigating a service anomaly.
- Design a research-data explorer that produces a custom, shareable report.
- Design a workflow for finding the cause of a failed data pipeline.
- Design an AI agent that proposes and carries out a safe data remediation.
- Design a tool for understanding data lineage and the impact of a schema change.

### Design exercise checklist

#### P0 - Build the method

- [ ] Turn the seven-stage framework into a one-page reference.
- [ ] Define a reusable system diagram for user, AI, data sources, tools, and outputs.
- [ ] Create a trust-pattern checklist for provenance, assumptions, permissions, audit, and recovery.
- [ ] Practice sketching the P0 data, AI, reporting, and agentic components without reference material.
- [ ] Create a tradeoff matrix and practice saying what I would not build.
- [ ] Prepare a metrics menu: task success, time to insight, correction rate, evidence inspection, report reuse, approval confidence, and recovery rate.

#### P1 - Research and synthesize

- [ ] Review six data-analysis products using the same comparison template.
- [ ] Capture each useful pattern as a research card with its user job, controls, failure states, and tradeoff.
- [ ] Capture two strong and one weak pattern from each product.
- [ ] Synthesize five to seven reusable patterns rather than presenting six product summaries.
- [ ] Identify where natural language helps and where structured UI is still required.
- [ ] Identify how each product handles lineage, freshness, permissions, and failure.

#### P1 - Practice

- [ ] Complete at least three timed design exercises.
- [ ] Practice one developer scenario, one researcher scenario, and one agentic scenario.
- [ ] Spend the first portion framing the user decision and system constraints.
- [ ] Draw the end-to-end flow before polishing one key interaction.
- [ ] Include empty, loading, error, low-confidence, permission, and recovery states.
- [ ] End with tradeoffs, MVP scope, validation plan, and success metrics.
- [ ] Review each practice for clarity, prioritization, interaction depth, and time management.

#### Definition of done

- I can apply the framework without reading a script.
- I make an explicit MVP decision and name what I am deferring.
- The design includes both the happy path and a consequential failure state.
- AI has a specific role; it is not added as a generic chat panel.
- The user can inspect the data basis and retain control over consequential action.

## 3. Behavioral Interviews

### Behavioral theme

The stories should prove senior design judgment, not only process participation.

Each answer should make clear:

- What was ambiguous or difficult.
- What I personally owned.
- What evidence changed my thinking.
- What tradeoff or disagreement I navigated.
- How I worked with PM, Engineering, Research, or domain experts.
- What changed because of my work.
- What I learned or would do differently.

### Core STAR story bank

| Story | Best signals |
|---|---|
| CHAI adoption turnaround | Ambiguity, reframing, measurable impact, roadmap influence |
| Better Chat -> contextual AI | First solution was insufficient, user-centered product judgment |
| Routing -> Skills | Technical constraint, conceptual model, build/not-build tradeoff |
| Reports and AI-Generated Reports | Data-heavy workflow, interaction design, PM/Engineering partnership |
| TAC troubleshooting workshop | Learning from experts, research collaboration, unfamiliar domain |
| Troubleshooting evidence model | Complex flow, systems thinking, trust and explainability |
| Control Hub Agentic | 0-to-1 strategy, ambiguity, permissions, accountability |
| React agentic prototype | Prototyping, cross-functional alignment, resolving uncertainty |

Add stories outside these two projects for:

- A meaningful disagreement with a PM or engineer.
- A mistake, failed decision, or feedback that changed my behavior.
- A difficult prioritization decision under limited time or resources.
- Leadership without formal authority.
- Improving accessibility or designing for an overlooked user need.

### Likely behavioral themes

- Tell me about a complex problem you simplified.
- Tell me about a time research or data changed your direction.
- Tell me about a time you decided not to build something.
- Tell me about a disagreement with PM or Engineering.
- Tell me about influencing a roadmap without formal authority.
- Tell me about learning a highly technical domain.
- Tell me about a project that did not go as planned.
- Tell me about balancing speed, quality, and technical constraints.
- Tell me about designing for trust in an AI product.
- Tell me about creating a pattern that scaled beyond one feature.

### Behavioral checklist

#### P0 - Build the story bank

- [ ] Select eight core STAR stories with minimal overlap.
- [ ] Write one sentence each for situation, responsibility, actions, result, and learning.
- [ ] State personal ownership separately from team contribution.
- [ ] Add a concrete decision or conflict to every story.
- [ ] Confirm all metrics and outcome claims.
- [ ] Prepare one honest failure story with a real behavior change.
- [ ] Prepare one collaboration disagreement that does not make the partner the problem.

#### P1 - Make the stories flexible

- [ ] Create 30-second, 90-second, and 3-minute versions of each core story.
- [ ] Map each story to two or three likely questions.
- [ ] Prepare follow-ups on tradeoffs, alternatives, evidence, and what I would change.
- [ ] Remove process detail that does not affect the decision or outcome.
- [ ] Practice answering with the result and lesson, not ending after the design activity.

#### Definition of done

- Every answer makes my role and judgment clear.
- No story depends on unsupported metrics or inflated ownership.
- I can adapt the same evidence to different questions without sounding memorized.
- At least one story covers conflict, failure, leadership, technical learning, and measurable impact.

## Master Priority List

### P0 - Story and evidence

- [ ] Lock the positioning theme and use it consistently across all onsite rounds.
- [ ] Complete the AI-generated report workflow.
- [ ] Add concrete provenance and traceability patterns.
- [ ] Connect the agent framework from data and evidence through action and audit.
- [x] Add explicit build/defer/reject decisions to both projects.
- [ ] Build the eight-story behavioral bank.
- [ ] Create the one-page design exercise framework.
- [ ] Practice sketching the P0 data, AI, reporting, trust, and agentic components.

### P1 - Practice and depth

- [ ] Complete the six-product data-tool pattern review.
- [ ] Build pattern research cards and synthesize five to seven reusable patterns.
- [ ] Run three timed design exercises.
- [ ] Run one uninterrupted portfolio rehearsal.
- [ ] Run one portfolio rehearsal with interruptions and follow-up questions.
- [ ] Run one full mock loop covering presentation, exercise, and behavioral questions.
- [ ] Build the portfolio backup-slide and Q&A bank.

### P2 - Final calibration

- [ ] Confirm the onsite format, timing, interviewers, and tools allowed for the exercise.
- [ ] Tighten any section that sounds like a feature tour.
- [ ] Remove any claim that overstates direct developer or research-tool experience.
- [ ] Verify that shipped, directional, and proposed work is labeled clearly.
- [ ] Prepare three thoughtful questions for each interviewer type.
- [ ] Test the deck, prototype, fonts, video, links, and offline backup.

## Final Self-Check

Before the onsite, I should be able to answer these in one or two sentences:

- What decision did the user need to make?
- What data did the system use?
- Why was AI the right tool for this part of the workflow?
- What remained structured or deterministic?
- What evidence could the user inspect?
- What did I choose not to build, and why?
- What did I personally decide?
- How did partners change the outcome?
- What shipped, what was directional, and what did we learn?
- How would I measure whether the insight was correct, useful, and trusted?
