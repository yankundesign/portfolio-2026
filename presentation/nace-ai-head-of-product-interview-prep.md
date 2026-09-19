# Nace AI — Head of Product Interview Preparation

Role: Senior Product Designer (AI & Prototyping)
Interviewer: Alex Panchenko, Head of Product
Format: 60-minute interview with a short case study and Q&A
Prepared: September 7, 2026

Related work:

- [Project Combined — CHAI + Agentic](./project-combined-chai-agentic-outline.md)
- [CHAI + Agentic — Key Design Decisions](./project-combined-key-design-decisions.md)
- [Cross-functional behavioral interview prep](./cross-functional-behavioral-interview-prep.md)

Source context:

- [Nace role posting](https://www.nace.ai/careers/0c7f8251-68f6-4d3c-a82f-92849acf91c8)
- [Nace about page](https://www.nace.ai/about)
- [NAVI product page](https://www.nace.ai/navi)
- [Financial Audit solution](https://www.nace.ai/solutions/financial-audit)
- [Alex Panchenko’s public profile](https://www.linkedin.com/in/oleksandrpa/)

## How To Use This Document

- Plan for roughly 18–20 minutes of presentation and 35–40 minutes of discussion.
- Present one connected story with two concrete project chapters: CHAI Report Analysis and Control Hub Agentic.
- Keep the main presentation short. Put extra screens, alternatives, component details, and edge states in an appendix or nearby Figma pages.
- Do not memorize every sentence. Memorize the opening, the main decisions, the trade-offs, the result, and the honest caveat.
- Let Alex interrupt. A Head of Product conversation is partly a portfolio review and partly a test of how you make product decisions in real time.
- Keep shipped outcomes separate from directional prototype work.

## Positioning Theme

### One-line version

> I design trustworthy AI workflows that help technical users move from complex data to clear insight and controlled action.

### Spoken version

> I’m a product designer focused on complex enterprise systems. At Cisco, I design AI experiences for IT administrators across search, reports, dashboards, and agentic workflows. The common thread is making the system’s context, evidence, state, and next action clear enough for people to use and trust. Nace is a strong fit because it applies that same design challenge to higher-stakes professional workflows, where clarity and accountability matter even more.

### The three pillars

1. **Make complex systems legible**
   - Start with the user’s job and decision.
   - Map data, dependencies, permissions, handoffs, and exceptions.
   - Reduce complexity without hiding the precision expert users need.

2. **Make AI decision-ready**
   - Give the system the right context and scope.
   - Show evidence, provenance, assumptions, and limitations.
   - Use natural language for intent, then structured UI for precision and review.

3. **Make action controllable**
   - Put a reviewable plan between intent and consequential action.
   - Make approval, progress, failure, recovery, and completion visible.
   - Preserve a durable activity or audit record.

## The Main Point To Land

> I can help Nace turn autonomous AI into a product people can understand, direct, and rely on in high-stakes workflows.

Keep returning to these points:

- I can learn a technical domain without pretending to already be the domain expert.
- I can model the whole system, not only the screen in front of the user.
- I can design AI behavior across context, evidence, planning, action, and recovery.
- I can use AI tools to build realistic prototypes while retaining design ownership.
- I can work closely with product and engineering and make trade-offs explicit.
- I care about visual craft because hierarchy and precision affect trust.

## Interviewer Lens

Alex’s public profile is limited, but the searchable public preview describes his work around AI-agent systems and complex professional workflows. Treat that as a useful hypothesis, not a script about his personal preferences.

Expect this conversation to test:

- Whether you can turn an ambiguous product opportunity into a clear direction.
- Whether you understand the user and business reason behind a design decision.
- Whether you can work at both system and interaction levels.
- Whether your AI fluency is practical rather than performative.
- Whether you can move quickly without lowering the quality bar.
- Whether you can explain trade-offs without becoming defensive.
- Whether you can partner with engineering and domain experts.
- Whether you understand that trust comes from context, control, and accountability—not from a visual AI treatment alone.

## Role Thesis

Nace is hiring this designer to define how people interact with an autonomous AI workforce inside high-stakes financial and professional workflows.

The role combines:

- Product architecture.
- Information architecture for large datasets.
- Linear, logical user flows.
- Scalable design-system work.
- AI behavior and probabilistic outcomes.
- High-fidelity visual craft.
- Functional prototyping with Cursor, Claude, and Codex.
- Close product and engineering collaboration.

The product opportunity is bigger than “design a better AI chat.” Nace’s public product language describes NAVI as using business context, evidence memory, durable execution, continuous learning, and human control to perform work end to end. [NAVI](https://www.nace.ai/navi)

The design question is:

> How do we make long-running AI work understandable before it starts, observable while it runs, and accountable after it finishes?

## Nace’s Product In Plain English

The simple user/workflow model:

1. A professional gives Nace a complicated business task.
2. Nace gathers context from company data, documents, and systems.
3. The AI analyzes a large body of evidence and proposes or performs work.
4. The professional reviews important findings, corrections, and decisions.
5. The system produces a finished, traceable result.

Public Nace pages emphasize:

- Financial audit, claims review, KYC remediation, M&A due diligence, and financial close workflows.
- Thousands of documents and full-population analysis rather than only samples.
- Source citations and traceability for conclusions.
- Human control through pause, correction, redirection, and signature.
- Execution that can run for days or weeks without losing its place.

That creates several product-design obligations:

- The AI needs a clear operating context.
- Users need to understand scope and assumptions.
- Review cannot happen only at the end.
- Long-running work needs meaningful progress and recovery states.
- The system must separate recommendation, approval, execution, and verification.
- The result needs to survive outside the conversation as a report, workpaper, or audit record.

## Top Product Pain Points

- Dense financial workflows are difficult to make understandable without oversimplifying them.
- AI outputs can be plausible but incomplete, delayed, or wrong.
- Large datasets create problems of scope, filtering, hierarchy, evidence, and navigation.
- Long-running work introduces new states: queued, processing, waiting for input, blocked, partially complete, failed, and verified.
- Users need to know exactly where human judgment is required.
- Different professional roles need different levels of detail and control.
- AI-generated output must become a reviewable artifact, not disappear inside a chat thread.

## Top Team Pain Points

The role likely exists because Nace needs a designer who can:

- Bring structure to an evolving product architecture.
- Define reusable patterns across multiple workflows and solutions.
- Bridge static design and real system behavior.
- Work directly with technical and domain experts.
- Establish a design library while shipping quickly.
- Help product and engineering make choices about what to build now, defer, or reject.
- Maintain a high bar for hierarchy, spacing, typography, and professional trust.

## What This Interview Should Prove

- I can frame the user’s real job before choosing an interface.
- I can translate a broad AI ambition into a concrete interaction contract.
- I can identify the right context, evidence, control boundary, and outcome.
- I can explain what I personally owned.
- I can make trade-offs when technical capability, user need, and platform constraints conflict.
- I can prototype the riskiest behavior instead of polishing assumptions.
- I can distinguish shipped evidence from directional thinking.
- I can learn a new professional domain through users and real workflows.

## Resume Fit Mapping

| Nace need | Strongest evidence | Point to land | Caveat to handle |
|---|---|---|---|
| Complex enterprise product design | Six years at Cisco and SAP | “I am comfortable designing for dense systems, multiple roles, permissions, and consequential decisions.” | Do not imply financial audit and network administration are identical. |
| AI product experience | CHAI across search, reports, dashboards, and troubleshooting | “I design AI as part of the workflow, not only as a chat surface.” | Keep CHAI’s measured outcome separate from Agentic’s directional work. |
| Trustworthy AI | Visible context, evidence, plans, approval, execution, and Activity | “I make the AI’s useful contract visible to the user.” | Avoid talking about hidden model reasoning. |
| Product architecture | Reusable response and widget patterns; Agentic framework | “I define the model and states that let multiple features scale coherently.” | Describe the framework as directional where it was not shipped. |
| Design systems | SAP Fieldglass role-based dashboard framework; Cisco widget system | “A system should encode hierarchy and behavior, not just visual tokens.” | Be specific about what was adopted and where. |
| AI-assisted prototyping | Cursor, Claude Code, Codex, React/TypeScript | “I use code to test behavior, timing, states, and persistence earlier.” | The tools accelerate implementation; they do not replace product judgment. |
| Data-heavy interfaces | Reports, dashboards, search, analytics | “I know how to expose scope, filters, evidence, freshness, and next steps.” | Build more fluency in audit terminology through users. |
| Visual craft | Enterprise dashboards, report analysis, editorial portfolio | “Professional trust is affected by hierarchy, density, and detail.” | Do not let the visual story crowd out product reasoning. |

## Story Recommendation

### Primary story: From context to control

Use CHAI Report Analysis as the shipped foundation and Control Hub Agentic as the directional extension.

> CHAI helped administrators understand complex data through contextual AI and visible evidence. Agentic work explored what had to change when AI moved from explaining work to planning and performing it.

The shared arc:

```text
User question
-> relevant context
-> analysis and evidence
-> reviewable insight
-> plan
-> approval
-> observable action
-> durable record
```

### Backup story: SAP Fieldglass

Use SAP if Alex wants a non-AI or design-system example.

- Different roles needed different starting points.
- Dense workforce and procurement workflows needed clear hierarchy and embedded actions.
- Modular role-based dashboard patterns created leverage across the product.
- The framework reached more than 1,000 enterprise customers.

### Status contract

| Work | Status | Safe language |
|---|---|---|
| Contextual CHAI patterns | Shipped | “As CHAI moved into real workflows, broader monthly adoption grew from 3% to 18%.” |
| Smart Search | Shipped | “Query-log analysis and retrieval/ranking work reduced dead-end searches by 86%.” |
| AI-generated Reports | Directional unless separately confirmed | “I explored a question-first report model that kept structure and assumptions reviewable.” |
| Control Hub Agentic | Directional / working prototype | “I defined and tested the interaction contract for planning, approval, execution, and Activity.” |

Say this once:

> The contextual CHAI work reached customers and has measured adoption evidence. The Agentic work was directional product design and prototyping, so I’ll use it to show how I think about trust and system architecture rather than claim a shipped outcome.

# 1. Short Case Study Presentation

## Presentation goal

The presentation should make Alex think:

> Yankun can take a vague AI opportunity, understand the workflow, define a system-level interaction model, and make the important decisions visible.

Do not present this as a tour of AI screens. Present it as a series of product decisions.

## Recommended timing

| Time | Section | Purpose |
|---:|---|---|
| 0:00–1:30 | Opening and user | Establish the problem and throughline |
| 1:30–8:30 | CHAI Report Analysis | Show shipped product judgment and measured outcome |
| 8:30–9:30 | Bridge | Explain why understanding was not enough |
| 9:30–16:30 | Control Hub Agentic | Show plans, approval, execution, Activity, and trade-offs |
| 16:30–18:30 | Outcome and learning | Separate evidence, imperfection, and next validation |
| 18:30–20:00 | Close | Connect directly to Nace |

## Title

> From context to control: designing AI that enterprise users can understand, direct, and trust.

## Frame 1 — The user’s job

### Show

One simple visual:

```text
Understand what is happening
-> decide what matters
-> change the system safely
-> verify what happened
```

### Say

> I’ll show one product evolution. It started with helping administrators understand complex operational data. It then raised a harder question: once AI can recommend or perform work, what does the user need to see before, during, and after that action?

## Frame 2 — The user and the workflow

### Show

- The strategic administrator who needs decision-ready insight.
- The operational administrator who must investigate, execute, and remain accountable.
- The shared system between them.

### Say

> Our research showed that “the admin” was not one uniform role. Some people needed organizational insight; others had to manage the operational reality. They shared the same system, so the product needed to support the handoff from understanding to execution.

## Frame 3 — The original friction

### Show

The old workflow:

```text
Open report
-> inspect data manually
-> search for context
-> ask for help separately
-> decide what to do
```

### Say

> The problem was not simply that users lacked a chat box. They had to reconstruct context across reports, dashboards, search, and troubleshooting surfaces. The design opportunity was to bring useful context into the place where the decision already happened.

## Frame 4 — Decision one: match entry point to capability

### Show

The evolution from report-row entry to page-level `Ask AI`.

### Say

> We started with the smallest reliable scope. The system could ground the assistant in one report, so the entry point lived on the report row. As broader page context became reliable, the entry moved to the page level. The principle was to make the interface’s scope match the system’s actual capability.

### Trade-off to name

- Smaller scope was more technically honest but less discoverable.
- Broader entry improved discoverability but required stronger context handling.

## Frame 5 — Decision two: keep the authoritative surface visible

### Show

Dashboard or report with AI explanation beside the source data.

### Say

> I did not want AI to replace the dashboard or create a second source of truth. The dashboard remained authoritative, while AI helped users interpret it. That made the relationship clear: the system can explain and surface patterns, but the user can still inspect the underlying data.

## Frame 6 — Decision three: generated does not mean opaque

### Show

Generated report or insight with:

- Data scope.
- Time range or filters.
- Evidence links.
- Assumptions or limitations.
- Review and edit controls.

### Say

> The useful output was not just an answer. It was an answer with enough context for the user to decide whether it was relevant. I focused on scope, evidence, assumptions, and editable structure so the result could become a reviewable artifact.

## Frame 7 — Shipped outcome and learning

### Show

One outcome metric, not a metric collage.

### Say

> As CHAI moved into real administrator workflows, broader monthly adoption grew from 3% to 18%. I would not claim that Report Analysis alone caused that change. The stronger learning was that AI became more useful when it appeared in the workflow with relevant context instead of asking users to leave their work and start over.

## Frame 8 — Bridge: understanding is not enough

### Show

```text
Context -> evidence -> explanation
                         |
                         v
                    plan -> action
```

### Say

> Context makes an answer useful, but it does not by itself make an action trustworthy. Once AI can change settings, coordinate work, or touch many resources, the interaction needs a stronger contract.

## Frame 9 — Agentic opportunity

### Show

An operational task with dependencies and interruptions, such as device onboarding.

### Say

> The opportunity was not simply to remove clicks. An agent could gather context, check dependencies, prepare a plan, coordinate several capabilities, and verify the result. The administrator still needed control over exceptions, approval, and intervention.

## Frame 10 — Decision four: plan before action

### Show

The editable plan with:

- Scope.
- Missing information.
- Dependencies.
- Proposed steps.
- Expected impact.
- Approval boundary.

### Say

> My most important Agentic decision was to put a reviewable plan between the user’s request and execution. The user’s sentence is not an executable specification. The plan shows what the system understood, what will change, and where correction is still possible.

### Important distinction

> The plan is not the AI revealing hidden chain-of-thought. It is the user-facing contract they are being asked to approve.

## Frame 11 — Decision five: separate approval from execution

### Show

```text
Plan ready for review
-> user approves
-> execution begins
-> progress and failures remain visible
```

### Say

> I separated “this plan looks right” from “start changing the system.” Once execution began, the workflow stayed visible at the step level. That gave the user a meaningful control boundary instead of collapsing the whole experience into a spinner.

## Frame 12 — Decision six: Activity is both control and record

### Show

An Activity state with:

- Who initiated the work.
- What was approved.
- Which resources were affected.
- Current or final status.
- Errors and recovery.
- Final outcome.

### Say

> Chat is temporary, but accountability cannot disappear with the conversation. Activity gave the work a durable home. It supported live intervention during execution and later reconstruction of what happened.

### Trade-off to name

> I originally explored a separate Activity experience. Product pushed back that a parallel audit system could fragment Control Hub. I agreed with the platform concern, then worked toward a richer agent event inside the existing audit structure.

## Frame 13 — Outcome, imperfection, next validation

### Show

Three columns:

```text
What shipped       What the prototype clarified       What remains to test
CHAI context       Plan / approval / Activity         Risk-based controls
3% -> 18%          Concrete product contract          Long-running recovery
```

### Say

> The Agentic work did not ship as a complete product, so I would not present a customer outcome. Its value was turning a broad ambition into a concrete interaction contract the team could evaluate. The next validation would test whether users understand scope, catch errors in the plan, intervene appropriately, and can reconstruct the result afterward.

## Frame 14 — Why this matters to Nace

### Say

> Nace is working with longer-running, higher-stakes professional workflows. The same principle applies at a larger consequence level: context before action, a clear approval boundary, observable execution, and evidence that survives the run. That is the kind of product architecture and interaction design problem I want to work on.

## Presentation close

> My strongest contribution to Nace would be connecting system architecture to the human decision. I can help define what the AI knows, what it proposes, when it needs permission, how people follow its progress, and how the finished work remains trustworthy afterward.

## If Alex wants a shorter version

Use this 8-minute cut:

1. User problem and two admin roles — 1 minute.
2. CHAI context and evidence — 2 minutes.
3. CHAI outcome — 1 minute.
4. Bridge from explanation to action — 30 seconds.
5. Agentic plan, approval, execution, Activity — 3 minutes.
6. Learning and Nace connection — 30 seconds.

## Visual preparation checklist

- [ ] Primary case study is 18–20 minutes, not a full 27-frame walkthrough.
- [ ] Every main visual has one decision attached to it.
- [ ] CHAI screens are labeled as shipped where appropriate.
- [ ] Agentic screens are labeled `DIRECTIONAL PROTOTYPE`.
- [ ] Adoption metric is shown only with the correct broader CHAI attribution.
- [ ] Agentic work has no invented adoption or evaluation metric.
- [ ] Plan, approval, execution, failure, and Activity states are easy to jump to.
- [ ] The Activity compromise is prepared as a product trade-off story.
- [ ] Figma prototype opens reliably and has realistic data.
- [ ] Backup screenshots are available if live prototype behavior fails.

# 2. Reusable Story Bank

## Story 1 — CHAI adoption turnaround

Use for: product judgment, AI adoption, reframing, research, measurable impact.

- **User job:** IT administrators needed to understand the product and solve operational problems.
- **Friction:** The assistant was separate from the workflow and required users to reconstruct context.
- **Decision:** Move from a generic assistant toward contextual AI inside reports, dashboards, search, and troubleshooting.
- **Result:** Broader monthly adoption grew from 3% to 18%.
- **Trade-off:** Contextual entry points were more useful but required careful scope and product integration.
- **Learning:** AI adoption improved when the capability was placed at the moment of work.

One-line takeaway:

> The assistant became useful when it stopped being a destination and became a contextual layer inside the work.

## Story 2 — Smart Search

Use for: data-driven product decisions, retrieval, failure recovery, measurable outcome.

- **User job:** Admins needed to find the right product information using natural language or incomplete terminology.
- **Friction:** Search dead ends blocked work and gave users no useful recovery path.
- **Decision:** Use query-log analysis, user feedback, and an LLM-based retrieval/ranking layer to improve result relevance and recovery.
- **Result:** Dead-end searches dropped by 86%.
- **Trade-off:** Better retrieval needed to be balanced with predictable behavior and clear recovery when the system still did not understand the query.
- **Learning:** The design challenge was not only returning better results; it was helping users continue when the system was uncertain.

One-line takeaway:

> Good AI search is not only about the right answer. It also gives the user a useful next move when the system is wrong.

## Story 3 — Agentic framework

Use for: product architecture, 0-to-1 AI direction, trust, system thinking.

- **User job:** Admins needed help coordinating work across multiple product areas while remaining accountable.
- **Friction:** A generic chat request could not express dependencies, permissions, execution state, or recovery.
- **Decision:** Define a reusable model: intent, context, plan, approval, execution, Activity.
- **Result:** The team had a concrete interaction contract for evaluating agentic workflows instead of disconnected demos.
- **Trade-off:** More visible waypoints add friction, so the amount of review should scale with consequence, uncertainty, and reversibility.
- **Learning:** Autonomy should expand from evidence and control, not from the ambition of the concept.

One-line takeaway:

> When AI can act, accountability becomes part of the interface.

## Story 4 — Activity and audit-log compromise

Use for: disagreement, product maturity, platform coherence, engineering partnership.

- **Initial proposal:** A richer, dedicated Activity experience for agent work.
- **Pushback:** A separate system could fragment the existing Control Hub audit model.
- **Decision:** Preserve the existing audit structure while adding a richer agent-event type with plan, approval, affected resources, steps, and outcome.
- **Trade-off:** The experience was less independent than the original concept, but the product remained more coherent.
- **Learning:** Defend the user need, not the first surface. A good compromise preserves the requirement while reducing platform cost.

One-line takeaway:

> I stopped defending a separate surface and focused on preserving the trust requirement inside the existing product model.

## Story 5 — SAP Fieldglass role-based dashboards

Use for: data-heavy UX, enterprise scale, design systems, non-chat product design.

- **User job:** Procurement and hiring teams needed to see the tasks, dates, spend signals, alerts, and actions relevant to their roles.
- **Friction:** A single generic homepage could not serve different responsibilities well.
- **Decision:** Build modular, role-based dashboard layouts and reusable UI5 card patterns.
- **Result:** The framework reached more than 1,000 enterprise customers.
- **Trade-off:** Reuse needed to preserve consistency without forcing every role into the same information hierarchy.
- **Learning:** A scalable system gives different users strong defaults for their work; it does not merely provide a library of components.

# 3. Tailored Q&A

## Opening Q&A — memorize these first

Use these short versions at the start of the conversation. Expand only if Alex asks for more detail.

## Q: Tell me about yourself?

- **Testing:** Clear positioning and relevance to the role.
- **Answer to say:**
  - “I’m a product designer with six years of experience designing enterprise software at Cisco and SAP.”
  - “The common thread in my work is making complex systems clear and actionable for technical users.”
  - “At Cisco, I design AI experiences for IT administrators across search, reports, dashboards, and agentic workflows.”
  - “I move between user problems, product direction, detailed interaction design, cross-functional decisions, and functional prototypes.”
  - “Nace feels like a strong fit because it applies that same design challenge to higher-stakes professional workflows.”
- **If they push:** “One concrete result is that CHAI adoption grew from 3% to 18% as we brought AI into the workflows where admins were already working.”

## Q: What are you looking for?

- **Testing:** Motivation, expectations, and mutual fit.
- **Answer to say:**
  - “I’m looking for end-to-end ownership of a difficult product problem.”
  - “I want to work closely with product, engineering, and domain experts rather than only receiving requirements and handing off screens.”
  - “I enjoy moving between product architecture, interaction design, visual craft, and functional prototypes.”
  - “I’m especially interested in AI products where context, trust, control, and system state are part of the experience.”
  - “I’m comfortable with ambiguity when the team is close to the user and willing to learn quickly.”
- **If they push:** “I’m looking for more proximity to early product decisions and the chance to shape a system as it scales.”

## Q: Why Nace?

- **Testing:** Genuine company motivation and product understanding.
- **Answer to say:**
  - “Nace is solving a problem I care about: making AI useful and trustworthy when the cost of ambiguity is high.”
  - “What interests me is that NAVI is not only a chat experience; it combines company context, evidence, long-running execution, and human control.”
  - “That creates a product-architecture challenge I enjoy: what does the system know, what does it plan, where does the user intervene, and what remains accountable afterward?”
  - “My Cisco and SAP experience gives me a strong foundation in technical users, dense data, enterprise workflows, and AI interaction patterns.”
  - “I’d like to help Nace turn that complexity into a clear, professional product experience.”
- **If they push:** “I’m particularly interested in how Nace makes review and sign-off efficient without making control invisible.”

## Q: Tell me about yourself and what you do day to day.

- **Testing:** Relevance, seniority, and communication clarity.
- **Answer to say:**
  - “I’m a product designer focused on complex enterprise and AI systems.”
  - “Day to day, I move between understanding user problems, mapping workflows, shaping product direction, designing detailed interactions, and prototyping behavior.”
  - “At Cisco, I work on AI for IT administrators across search, reports, dashboards, and agentic workflows.”
  - “I partner with product and engineering to decide what context the system needs, what the user should see, and where control or approval belongs.”
  - “I also use Cursor, Claude Code, and Codex to build functional prototypes when static screens are not enough.”
- **If they push:** “The common thread is making complex systems legible at the moment a user needs to make a decision.”

## Q: Why Nace and why this role?

- **Testing:** Motivation and understanding of the company’s real problem.
- **Answer to say:**
  - “Nace is solving a problem I care about: making AI useful and trustworthy when the cost of ambiguity is high.”
  - “The product is not only generating answers; it is working across company context, evidence, long-running execution, and human review.”
  - “That creates the kind of architecture problem I enjoy: what does the system know, what does it plan, where does the user intervene, and what remains accountable afterward?”
  - “My background at Cisco and SAP gives me experience with technical users, dense data, enterprise workflows, and AI interaction patterns.”
  - “I’m interested in owning that problem from early product model through detailed interaction and prototype.”
- **If they push:** “I’m especially interested in how Nace makes professional review and sign-off feel efficient without making control invisible.”

## Q: What did you personally own in the CHAI work?

- **Testing:** Ownership and attribution.
- **Answer to say:**
  - “I led the interaction design and product-experience model for the work I’m showing.”
  - “I framed the user workflows, explored the entry and response patterns, and carried the designs through detailed states.”
  - “I worked with PM, engineering, research, and domain experts to understand scope, feasibility, and the evidence users needed.”
  - “For the Agentic work, I also built the working React prototype so we could evaluate system behavior rather than only static screens.”
  - “I’ll separate my decisions from shared team decisions as I walk through the case.”
- **If they push:** Name the specific entry-point, response-model, plan, or Activity decision instead of repeating “I led design.”

## Q: What changed CHAI from a low-adoption assistant into a more useful product?

- **Testing:** Product judgment and ability to reframe.
- **Answer to say:**
  - “The problem was not simply that the chat needed better wording.”
  - “Admins had to leave their workflow and reconstruct context that the product already knew.”
  - “I changed the direction toward contextual AI inside reports, dashboards, search, and troubleshooting.”
  - “We matched the entry point to the data context the system could actually support.”
  - “As CHAI moved into real workflows, broader monthly adoption grew from 3% to 18%.”
- **If they push:** “I would not attribute that entire change to one interaction. The important learning was that relevance and placement mattered as much as the assistant’s response quality.”

## Q: How did you decide what context the AI should show?

- **Testing:** AI product reasoning and trust model.
- **Answer to say:**
  - “I started with the user’s decision, not the model’s capability.”
  - “Then I asked what data scope, filters, freshness, evidence, and assumptions affected that decision.”
  - “I exposed the minimum context needed to judge relevance, with deeper evidence available when the user wanted to inspect it.”
  - “For generated reports, I kept the structure and important inputs reviewable and editable.”
  - “The goal was not to show hidden model reasoning; it was to show the product facts that make the result understandable and challengeable.”
- **If they push:** “For Nace, I would apply the same model to engagement scope, source documents, evidence links, exceptions, and the professional’s sign-off boundary.”

## Q: Why put a plan before execution?

- **Testing:** Judgment about autonomy, trust, and friction.
- **Answer to say:**
  - “The user’s sentence is not an executable specification.”
  - “A plan makes the AI’s interpretation visible while corrections are still cheap.”
  - “It shows scope, missing information, dependencies, proposed steps, and consequences.”
  - “I would scale the review to the consequence and reversibility of the task.”
  - “The plan is a user-facing contract, not a dump of hidden model reasoning.”
- **If they push:** “For a low-risk, reversible task, the plan may be compact. For a financial conclusion or external communication, the evidence and approval boundary should be much stronger.”

## Q: How would you design for a workflow that runs for days or weeks?

- **Testing:** Understanding of long-horizon AI and operational state.
- **Answer to say:**
  - “I would treat the run as a system with meaningful states, not a long spinner.”
  - “The user should know whether work is queued, processing, waiting for input, blocked, partially complete, failed, or verified.”
  - “Each state should explain what happened, what the system needs, and what the user can do next.”
  - “The user needs a durable place to return to the work after leaving the conversation.”
  - “Completed work should preserve the approved scope, evidence, changes, exceptions, and final outcome.”
- **If they push:** “I would prototype interruption, partial failure, retry, and navigation persistence early because those are the states static happy-path screens hide.”

## Q: How do you choose what should require human approval?

- **Testing:** Safety and product judgment.
- **Answer to say:**
  - “I would base it on consequence, reversibility, uncertainty, scope, permissions, and who is accountable for the result.”
  - “Reading and summarizing evidence may need review but not execution approval.”
  - “Changing records, communicating externally, or producing a consequential conclusion may need a stronger sign-off.”
  - “Approval should sit at the meaningful boundary, not be added to every small step.”
  - “The user should understand exactly what approval starts and what it does not start.”
- **If they push:** “I would validate the risk model with domain experts because the same technical action can have different consequences in different workflows.”

## Q: Tell me about a time you changed direction because of pushback.

- **Testing:** Collaboration, humility, and ability to preserve the underlying need.
- **Answer to say:**
  - “For Agentic Activity, I initially explored a separate experience for agent runs.”
  - “Product pushed back that Control Hub already had an audit log and a parallel system could fragment the platform.”
  - “I agreed with the platform concern, but the existing event model did not capture enough detail for agent work.”
  - “I shifted from defending the surface to defending the requirement.”
  - “The compromise was a richer agent event inside the existing audit structure.”
- **If they push:** “The result was more coherent than my first proposal, while still preserving plans, approvals, affected resources, steps, and outcomes.”

## Q: How do you use Cursor, Claude, and Codex in your design process?

- **Testing:** Practical prototyping ability and design ownership.
- **Answer to say:**
  - “I use Figma for visual and interaction exploration, then use Cursor, Claude Code, or Codex to build a functional React prototype.”
  - “I define the user flow, interaction model, states, constraints, and acceptance criteria first.”
  - “I use code when timing, persistence, loading, errors, approval, or recovery are central to the decision.”
  - “The prototype helps product and engineering react to behavior earlier than they can with static screens.”
  - “The tools accelerate implementation, but I still own the framing, design judgment, and final review.”
- **If they push:** “I evaluate the prototype by what the team learns and decides, not by how quickly the code was generated.”

## Q: You have not designed financial audit software. Why are you a fit?

- **Testing:** Domain gap and learning ability.
- **Answer to say:**
  - “I have not designed audit software directly, so I would not pretend the domain learning is complete.”
  - “My relevant experience is designing enterprise workflows where users interpret sensitive data, work within permissions, and make consequential decisions.”
  - “At Cisco, administrators diagnose technical systems; at SAP, teams manage complex workforce and procurement processes.”
  - “The domain nouns differ, but the design obligation is similar: make context, evidence, state, exceptions, and next actions clear.”
  - “I would learn Nace’s methodology directly from auditors and customers rather than assume the analogy is perfect.”
- **If they push:** “I would start by observing the real workflow, mapping the evidence and review chain, and identifying where a mistake becomes expensive.”

## Q: What would you do in your first 30–60 days?

- **Testing:** Startup readiness and practical prioritization.
- **Answer to say:**
  - “First, I would learn the users’ actual workflows by reviewing customer sessions, current product behavior, and domain terminology.”
  - “I would map the system’s core objects, roles, permissions, states, and handoffs.”
  - “I would audit the current design library and identify where inconsistency is slowing product work or weakening trust.”
  - “I would choose one high-value workflow and prototype the riskiest interaction, including failure and recovery.”
  - “By 60 days, I would want a shared product model, a prioritized interaction problem, and evidence that the direction is useful to both users and engineering.”
- **If they push:** “I would avoid starting with a broad component rewrite before understanding which workflows and decisions matter most.”

## Q: Why are you considering leaving Cisco?

- **Testing:** Motivation and stability.
- **Answer to say:**
  - “I’m not leaving because something is wrong.”
  - “I’m looking for a different kind of ownership and proximity to product decisions.”
  - “I want to work closer to the product architecture, prototype behavior earlier, and help shape the direction before the solution is already constrained.”
  - “Nace is compelling because the problem is still being defined and the design decisions have a direct relationship to trust and product value.”
- **If they push:** “I’m being selective. I’m looking for a role where systems thinking, craft, and speed are all part of the job.”

## Q: What would you do differently in the Agentic work?

- **Testing:** Self-awareness and ability to identify the next design problem.
- **Answer to say:**
  - “I would validate the risk-based control model earlier.”
  - “The prototype made every important decision visible, but the approval pattern may be too heavy for routine, reversible tasks.”
  - “I would test low-, medium-, and high-consequence workflows with domain experts.”
  - “I would measure whether users understand scope, catch errors in the plan, intervene correctly, and reconstruct the result from Activity.”
  - “That would help us expand autonomy from evidence rather than from the ambition of the concept.”
- **If they push:** “I would also test how plans persist across navigation, interruption, and partial failure earlier.”

## Q: What are you looking for in your next role?

- **Testing:** Mutual fit.
- **Answer to say:**
  - “I’m looking for end-to-end ownership of a difficult product problem.”
  - “I want close collaboration with product, engineering, and domain experts.”
  - “I enjoy moving between system architecture, interaction design, and functional prototypes.”
  - “I want the visual and interaction quality bar to matter, especially because clarity affects trust.”
  - “Nace is attractive because those responsibilities appear to be combined in one role.”
- **If they push:** “I’m comfortable with ambiguity when the team is close to the user and willing to learn quickly.”

## Product & UX Metrics Q&A

Use this section when Alex asks how you define success, measure trust, or decide whether a product direction is working.

### A practical metric stack for Nace

| Layer | What to measure | Example questions |
|---|---|---|
| Business outcome | Verified work completed, expert hours saved, cycle-time reduction, customer expansion or retention | Did the engagement reach a useful, accepted result? |
| User outcome | Task completion, time to decision, review effort, successful handoff, repeat use | Can the professional finish the job more effectively? |
| AI quality | Evidence-grounded accuracy, coverage, correction rate, unsupported claims, precision/recall by task | Is the output correct enough for this workflow? |
| Trust and control | Evidence inspection, correction, override, approval, escalation, intervention, audit reconstruction | Can users understand and appropriately challenge the system? |
| Operational health | Time to first useful result, latency, completion rate, failure rate, retry/recovery, partial completion | Can the system run reliably over a long workflow? |
| UX quality | Comprehension, error rate, backtracking, abandonment, support requests, qualitative confidence | Is the experience clear and recoverable? |
| Product-system leverage | Component reuse, prototype-to-build time, design rework, consistency defects, implementation speed | Is the team getting faster without lowering quality? |

Important measurement principle:

> I would not optimize one metric in isolation. A faster result is not better if it increases unsupported conclusions, hides errors, or makes professional review harder.

### Q: What product metrics would you prioritize for Nace?

- **Testing:** Product judgment and ability to connect UX to business value.
- **Answer to say:**
  - “I would start with the completed user outcome, not the number of AI conversations.”
  - “For a workflow like audit, that could be the percentage of engagements that reach a verified, accepted result with less expert effort and no unacceptable quality issue.”
  - “I would pair that with time to first useful evidence, total cycle time, review effort, and the amount of work the expert still needs to correct.”
  - “Then I would segment by workflow, role, engagement size, and consequence because an average can hide important differences.”
  - “The exact north-star metric should be chosen with product, customers, and domain experts once we understand the workflow and baseline.”
- **If they push:** “I would avoid calling approval rate a success metric by itself. High approval could mean trust, but it could also mean users are not inspecting the work.”

### Q: How would you measure whether an AI workflow is trustworthy?

- **Testing:** Whether you understand trust as behavior and outcome rather than sentiment alone.
- **Answer to say:**
  - “I would measure whether users can understand, verify, and appropriately challenge the result.”
  - “Behavioral signals could include evidence inspection, corrections, overrides, escalations, approval decisions, and successful reconstruction from the audit record.”
  - “I would also measure comprehension directly in usability studies: can the user explain what data was used, what the system concluded, and what happens after approval?”
  - “I would pair those signals with quality metrics such as unsupported claims, missed items, and correction severity.”
  - “Trust is not the lowest possible correction rate. A healthy system makes important errors visible and recoverable.”
- **If they push:** “I would segment trust metrics by consequence. The right amount of inspection and approval for a low-risk review is different from a financial sign-off.”

### Q: How do you measure AI quality when the output is probabilistic?

- **Testing:** AI product maturity and evaluation thinking.
- **Answer to say:**
  - “I would evaluate quality at the task level, not only with a general model score.”
  - “First, define what a good result means for the workflow: correct extraction, complete population coverage, grounded reasoning, useful prioritization, or a valid final artifact.”
  - “Then combine offline evaluation with expert review, realistic scenarios, and in-product behavior.”
  - “I would track accuracy, coverage, unsupported claims, correction severity, and performance across common and edge cases.”
  - “The evaluation should include whether the user can detect and recover from an error, not only whether the model produced one.”
- **If they push:** “I would not use a single confidence score as a substitute for evidence or validation.”

### Q: Which UX metrics would you use for a long-running AI workflow?

- **Testing:** Ability to design and measure beyond the happy path.
- **Answer to say:**
  - “I would measure time to first useful result and time to verified completion separately.”
  - “I would track the rate of runs that finish, pause for input, fail, partially complete, or require retry.”
  - “I would look at whether users return to an interrupted run and whether they can understand what changed while they were away.”
  - “For recovery, I would measure successful intervention and retry—not just failure count.”
  - “Qualitatively, I would test whether users know the current state, the next required action, and the consequence of doing nothing.”
- **If they push:** “A long-running workflow can have a longer total duration and still be better if it reduces expert effort and makes progress more reliable.”

### Q: How would you measure adoption without overvaluing shallow engagement?

- **Testing:** Distinguishing useful adoption from activity metrics.
- **Answer to say:**
  - “I would separate exposure, activation, repeated use, and successful outcome.”
  - “A user opening the AI once is not the same as using it to complete a meaningful workflow.”
  - “I would track the path from eligible workflow to first useful result, review or correction, accepted output, and repeat use.”
  - “I would pair usage data with qualitative reasons for abandonment, especially around relevance, latency, trust, or unclear control.”
  - “For CHAI, adoption moving from 3% to 18% was useful evidence, but I would still want to understand which workflow behaviors drove the change.”
- **If they push:** “I would not use message count or time in chat as the primary success metric for a professional workflow.”

### Q: Tell me about a metric you improved.

- **Testing:** Concrete impact and causal honesty.
- **Answer to say:**
  - “At Cisco, enterprise search had a high rate of dead-end queries that blocked administrators from finding what they needed.”
  - “I used query-log analysis, user feedback, and retrieval/ranking changes to understand where the system failed and how users recovered.”
  - “The result was an 86% reduction in dead-end searches.”
  - “The important lesson was that the metric represented a user problem: not finding a result meant the user could not continue their work.”
  - “I also learned to distinguish the measured search outcome from broader AI adoption outcomes and not over-attribute causality.”
- **If they push:** “I would use the same discipline at Nace: define the user failure behind the metric, instrument the funnel, and validate that the improvement represents better work rather than more activity.”

### Q: What would you measure in the first 30–60 days?

- **Testing:** Practicality and ability to establish a baseline.
- **Answer to say:**
  - “I would not introduce a large metric framework before understanding the workflow and existing instrumentation.”
  - “I would choose one representative workflow and baseline completion, cycle time, review effort, quality issues, and failure or recovery states.”
  - “I would add a small set of qualitative checks: what users understand, where they hesitate, and what they verify manually.”
  - “Then I would identify one leading indicator and one outcome metric that the team can actually influence.”
  - “By 60 days, I would want an agreed measurement model that connects user behavior, AI quality, and business value.”
- **If they push:** “The first metric work should reduce uncertainty about one important workflow, not create a dashboard that no one uses.”

### Q: How do you balance speed, accuracy, and user control?

- **Testing:** Product trade-off judgment.
- **Answer to say:**
  - “I would treat them as related but not interchangeable goals.”
  - “For a low-risk exploratory task, faster feedback may be more important than a long review ceremony.”
  - “For a high-consequence conclusion or external action, accuracy, evidence, and approval should take priority over removing every step.”
  - “The product should make the trade-off explicit through progressive disclosure, risk-based controls, and clear system state.”
  - “I would measure both efficiency and correction quality so speed does not hide downstream rework.”
- **If they push:** “The right question is not ‘How do we remove friction?’ It is ‘Which friction protects the decision, and which friction is only product overhead?’”

### Q: How would you measure whether the design system is helping the team?

- **Testing:** Whether you connect design-system work to product velocity and quality.
- **Answer to say:**
  - “I would look at how often patterns are reused successfully across workflows.”
  - “I would measure time from a validated interaction decision to an engineering-ready implementation.”
  - “I would also track design and engineering rework caused by inconsistent states, unclear specifications, or component limitations.”
  - “Qualitatively, I would ask whether the system helps the team make better decisions or only helps it produce similar-looking screens.”
  - “The goal is faster, more consistent product work without flattening important workflow differences.”
- **If they push:** “For Nace, I would prioritize reusable patterns for evidence, review, long-running state, approval, failure, and audit before expanding a broad visual library.”

# 4. Questions To Ask Alex

Choose three or four based on where the conversation goes.

## Product direction

- “Which user workflow is the highest priority for this role in the first six months?”
- “Where does Nace currently see the biggest product-design risk: context and evidence, long-running execution, review and approval, or the broader product architecture?”
- “How do you decide which workflows are appropriate for recommendation, preparation, or full execution?”

## Customers and domain learning

- “How closely does the product team work with auditors and other domain experts during design?”
- “What do customers currently struggle to understand or trust in a NAVI engagement?”
- “What is the most important user behavior you want to see improve?”

## Design and collaboration

- “How are product, design, engineering, and research decisions made when the AI capability is still changing?”
- “What parts of the design system or product architecture are already established, and where would you expect this person to create the foundation?”
- “When you say AI prototyping, is the expectation mainly functional prototypes, production front-end work, or both?”

## Success and team fit

- “What would make you say after six months that this hire is working?”
- “What is the balance between hands-on design, design-system ownership, customer work, and strategic product shaping?”
- “What does the in-person collaboration rhythm look like for the Palo Alto team?”

Strong closing question:

> “Based on what we discussed, is there any part of my background you would like me to clarify before we wrap up?”

# 5. Language To Mirror

Use these naturally from the posting:

- “Untangling complexity.”
- “Clarity and precision.”
- “System architecture.”
- “Linear and logical user flows.”
- “Scalable design library.”
- “The physics of the application.”
- “Large datasets.”
- “Prototype to validate.”
- “Strategic partner.”
- “Trade-offs.”
- “AI latency, errors, and confidence.”
- “Human control.”
- “Evidence and traceability.”

## Translate the language into your own words

- Instead of “AI-powered experience,” say “The user needed to understand the data before deciding what to do.”
- Instead of “agentic UX,” say “The system gathered context, prepared a plan, waited for approval, and recorded the result.”
- Instead of “vibe coding,” say “I built a functional prototype to test timing, state, and recovery before engineering implementation.”
- Instead of “trust,” say “The user could see the scope, evidence, assumptions, control boundary, and outcome.”

# 6. Avoid Saying

- “I’m excited about AI because it’s the future.”
- “I can design anything.”
- “I mainly use AI tools to work faster.”
- “The AI knows what the user is thinking.”
- “Confidence scores solve trust.”
- “My Agentic prototype increased adoption.”
- “I have fintech experience” if you mean enterprise experience outside finance.
- “The system should automate everything.”
- “I just need more time with the domain.”

Replace them with:

- “I start with the user’s job and the consequence of the decision.”
- “I make context, evidence, state, and control visible.”
- “I use prototypes to expose the behavior the team needs to decide about.”
- “I learn the domain from expert users and test my assumptions.”

# 7. Final Preparation Checklist

## Story and evidence

- [ ] Practice the 60-second introduction until it sounds conversational.
- [ ] Practice the CHAI story in 8 minutes and the Agentic story in 7 minutes.
- [ ] Memorize the exact metrics: CHAI adoption 3% to 18%; Smart Search dead ends reduced by 86%.
- [ ] Keep the 1,000+ SAP customer figure available as a design-system and scale proof point.
- [ ] Prepare one honest caveat for each story.
- [ ] Confirm every screen is labeled shipped or directional correctly.

## Decision depth

- [ ] For each main screen, answer: user job, friction, decision, trade-off, result or learning.
- [ ] Prepare the alternatives for report-row entry, page-level entry, and standalone chat.
- [ ] Prepare the Activity versus existing audit-log compromise.
- [ ] Prepare the risk model for approval boundaries.
- [ ] Prepare one failure and recovery state, not only the happy path.

## Logistics

- [ ] Confirm the interview format, presentation length, and whether screen sharing is expected.
- [ ] Confirm your honest position on Palo Alto and in-person collaboration.
- [ ] Prepare your compensation range before the call, even if it is not in the posting.
- [ ] Have the portfolio, CV, Figma file, and backup screenshots open.
- [ ] Choose three questions to ask Alex.

## Final self-check

Before the call, make sure you can say:

> I design AI around the user’s decision. I make the system’s context and evidence visible. When AI can act, I add a meaningful plan, approval boundary, observable execution, and durable record. That is the kind of product problem I want to help Nace solve.
