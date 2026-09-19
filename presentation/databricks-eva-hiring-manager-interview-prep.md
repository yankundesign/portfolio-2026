# Databricks — Eva Snee Hiring Manager Interview Prep

- Role: Sr. Product Designer, AI/BI (`RDQ427R273`)
- Interviewer: [Eva Snee](https://www.linkedin.com/in/evasnee/), Director of User Experience
- Format: 45 minutes

Prepared: August 17, 2026

## How To Use This Document

- Use **Detailed 25-Frame Presentation Guide** to rebuild the existing Juniper working-file sequence for Eva.
- Use **Timing And Visual Backbone** while arranging and numbering the Figma frames.
- Use each frame's **Eva may interrupt** note to prepare the first answer, two proof points, and honest caveat.
- Use **Visual Preparation Checklist** to find missing evidence or states before polishing the deck.
- Use **Tailored Q&A** for the parts of the 45-minute conversation outside the walkthrough.
- Do not memorize the whole file. Memorize the opening, research insight, status boundary, major tradeoffs, next-study contract, and close.

## The One-Sentence Strategy

Position yourself as the designer who already knows how to turn complex enterprise data into contextual, inspectable AI experiences, and who can extend that foundation from understanding an insight to validating it and acting with control.

Your proof arc:

> CHAI: complex data -> scoped evidence -> understandable insight -> measurable adoption
>
> Agentic: intent -> reviewable plan -> approval -> action -> durable record

## What Eva Is Likely Screening For

Eva's public hiring guidance is unusually direct. She says she looks for designers who can operate at today's pace without sacrificing craft, show how AI has changed their process, avoid using AI to cut important corners, and communicate concisely. Her background is strongly research-led: she has led UX research and design across Google Cloud, early AI systems, and technical and consumer products. Sources: [Eva's hiring post](https://www.linkedin.com/posts/evasnee_sr-product-designer-aibi-databricks-activity-7442619413943693312-e-4z), [UW HCDE speaker profile](https://www.hcde.washington.edu/ux/2026/snee).

Expect her to test:

- Can you find the user decision underneath a technical feature request?
- Can you move quickly while keeping interaction and visual craft high?
- Can you explain what you personally changed without overstating ownership?
- Can you use research to make or reverse a product decision?
- Can you work directly with technical experts and strategic customers?
- Can you make AI outputs understandable enough for people to trust and challenge?
- Has AI materially changed how you design, prototype, and collaborate?
- Can she learn something from how you work?
- Can you tell a sharp story without walking through every screen?

## Databricks AI/BI In Plain English

The product connects two sides of the company:

1. Data teams define trusted data, business terms, metrics, example queries, and access rules.
2. Business users open dashboards or ask questions in natural language.
3. Genie turns the question into an answer, result table, visualization, or multi-step analysis.
4. Users can inspect the interpretation, data, filters, logic, and generated SQL; trusted assets and review flows add confidence.
5. Data teams use feedback, benchmarks, and observed failures to improve the experience.

Databricks currently presents a connected AI/BI system rather than one chat product:

- **Genie One:** the business-user consumption and discovery layer across dashboards, Genie Agents, apps, and enterprise knowledge, without exposing technical workspace concepts.
- **AI/BI Dashboards:** the shared, interactive layer for known metrics and repeatable monitoring, with a companion Genie Agent for follow-up questions.
- **Genie Agents:** scoped, domain-specific conversational analytics curated by subject-matter experts with instructions, verified logic, feedback, monitoring, and benchmarks.
- **Governance and authoring:** Unity Catalog permissions and semantics ground the experience; Genie Code helps technical users create and refine analytical assets.

Official product references: [Genie One](https://www.databricks.com/product/genie/one), [AI/BI Dashboards](https://www.databricks.com/product/business-intelligence/ai-bi-dashboards), [Genie Agents](https://www.databricks.com/product/genie/agents), [AI/BI concepts](https://docs.databricks.com/aws/en/ai-bi/concepts), [testing and monitoring a Genie Agent](https://docs.databricks.com/aws/en/genie-agents/monitor).

## Role Thesis

Databricks is hiring this designer to make open-ended, AI-assisted analysis reliable enough for real business decisions, while creating a coherent bridge between the technical people who prepare trusted data and the non-technical people who need to understand and act on it.

This is not mainly a dashboard-layout role. It is a product-model role:

- How does a person express an ambiguous business question?
- How does the system establish the right data and semantic context?
- How does the answer expose enough evidence to be trusted?
- How does a person correct, refine, save, share, or act on the result?
- How does the data team learn from failures without losing governance?

## Top Product Pain Points

- **Plain language is ambiguous.** A familiar business term can map to the wrong metric, date range, table, or population.
- **A plausible answer is not necessarily a trustworthy answer.** Users need visible scope, sources, filters, freshness, logic, assumptions, and ways to challenge the result.
- **Technical and non-technical users need different depth.** A leader wants the finding; an analyst may need the generated SQL, joins, and metric definitions.
- **Dashboards and conversation must reinforce each other.** Fixed dashboards answer known questions; Genie must support follow-up exploration without creating a competing source of truth.
- **Insight is not the end of the workflow.** The product must help people validate, save, share, schedule, or act while preserving permissions and accountability.
- **Quality is a continuous system.** Data teams need usable tools for trusted assets, benchmarks, feedback, review, and tuning—not only a polished end-user chat.

## Top Team Pain Points

Inferred from the JD and Eva's public hiring guidance:

- The team needs a senior designer who can own a large AI/BI problem from framing through GA.
- They need speed and AI fluency without a lower craft bar.
- They need a systems thinker who can connect Genie One, Genie Agents, dashboards, Genie Code, and governance patterns.
- They need a designer comfortable enough with data and engineering constraints to prototype realistic behavior.
- They need strong customer communication across data practitioners and senior business decision-makers.
- They want a designer close to the Seattle product and engineering team, not a remote handoff partner.

## How You Match

| Databricks need | Your strongest evidence | Line to land |
|---|---|---|
| Natural-language exploration in complex data | CHAI Report Analysis, dashboard analysis, Smart Search | "I design the path from a question to scoped evidence and a reviewable answer." |
| Trustworthy AI-generated insight | Visible context, structured evidence, editable report controls, Agentic plans and Activity | "I make what the AI knows, what it plans, and what changed inspectable." |
| Exploration -> validation -> action | CHAI plus Agentic as one connected arc | "I have worked on both sides of that transition: understanding data and acting with control." |
| Technical and non-technical users | Network admins, TAC experts, PM, engineering, data partners | "I learn expert reasoning, then design progressive depth so the product stays approachable without hiding important complexity." |
| End-to-end ownership and outcome | CHAI monthly adoption increased from 3% to 18%; Smart Search reduced dead-end searches by 86% | "I stay with the product after the initial concept and use the outcome to change the next decision." |
| Enterprise system thinking | Control Hub trust patterns; SAP role-based dashboard framework used by 1,000+ customers | "I look for reusable models across dense workflows, permissions, states, and roles." |
| AI-era prototyping | Working React and TypeScript prototypes with Cursor, Claude Code, and Codex | "I prototype behavior early so the team can evaluate the system, not just react to static screens." |
| Craft at speed | Figma for interaction and visual refinement; coded prototypes for realistic behavior | "I use the right fidelity for the uncertainty, then spend craft where it affects comprehension, trust, or repeated use." |

## Likely Concerns And How To Answer

### You have not shipped a general-purpose BI platform

- Do not claim direct Databricks-equivalent experience.
- Lead with the adjacent problem: report analysis, dashboard interpretation, search, contextual data, and governed AI in a technical enterprise platform.
- Emphasize that you know what must be learned: semantic layers, SQL-backed answer quality, dashboard authoring, and data-team curation workflows.

Answer:

> I have not shipped a general-purpose BI platform, so I would not pretend the domain learning is finished. My closest work is designing AI across reports, dashboards, search, and troubleshooting in Control Hub. The transferable part is turning a broad question into the right context, making the evidence inspectable, and helping a technical and non-technical audience decide what to do next.

### SQL is not listed on your resume

- Be direct about your current level.
- Show technical curiosity without presenting yourself as an analyst or engineer.
- Explain how you collaborate with data and engineering partners and use working prototypes to understand system behavior.

Answer:

> I am not presenting myself as a production SQL expert. I am comfortable reasoning about data sources, filters, metrics, joins, freshness, permissions, and generated-query behavior with technical partners. I would want to become fluent enough in Databricks SQL and the AI/BI authoring model to inspect the product honestly and prototype with realistic data.

### Strategic-customer conversations

- Use the strongest real customer or technical-expert example you can defend.
- Describe how you prepare, ask about decisions and stakes, and translate findings back into product direction.
- Do not imply executive-customer exposure if the participants were admins or practitioners.

### Seattle proximity

- The JD explicitly says the product and engineering partners are based in Seattle.
- Decide your honest position before the call.
- Answer in the first sentence; do not sound surprised or evasive.
- If you can travel or relocate, state the concrete cadence or timing you can support.

## Recommended 45-Minute Run Of Show

The safest structure leaves Eva at least 12 minutes to probe your decisions.

| Time | Conversation | Your target |
|---|---|---|
| 0:00-0:05 | Introductions and role context | 60-75 second introduction; learn what Eva wants to cover |
| 0:05-0:07 | Set the walkthrough | Propose two connected projects and confirm timing |
| 0:07-0:21 | CHAI Report Analysis | 14 minutes; shipped foundation, research, decisions, outcome |
| 0:21-0:29 | Control Hub Agentic | 8 minutes; directional extension, prototype, trust and action |
| 0:29-0:39 | Eva's follow-ups | Keep answers to 45-75 seconds unless she asks for depth |
| 0:39-0:44 | Your questions | Ask two or three with real follow-up |
| 0:44-0:45 | Close | Restate fit and interest |

Opening alignment line:

> I prepared two connected pieces of work. The first is shipped work on using AI to help administrators understand reports and dashboards; the second is a shorter, directional project about moving from insight into controlled action. I can cover both in about 22 minutes and leave the rest for discussion. Does that work for you?

If Eva says she only wants one project:

- Present CHAI as the primary case.
- Keep the Agentic plan, approval, and Activity model as a two-minute "where I took the learning next" ending.

If Eva wants a portfolio tour rather than a deep dive:

- CHAI: 10 minutes.
- Agentic: 6 minutes.
- SAP role-based dashboards: 4 minutes.
- Keep the same role-fit throughline; do not add a generic visual-work montage.

## Your 60-Second Introduction

> I’ve spent most of my career designing enterprise products, first at SAP and now at Cisco. At SAP, I learned how to make dense workflows and data understandable across many roles. At Cisco, I led the design of the Control Hub AI experience. It started as an assistant that helped administrators learn and use Control Hub. Over time, we brought it into the work itself, helping people search the product, understand reports and dashboards, and get insights from their data. As CHAI moved into those workflows, monthly adoption grew from 3% to 18%. More recently, I’ve been exploring more agentic workflows, where AI can perform actions such as user provisioning and configuration changes. My focus there has been making the work clear before it runs, giving users approval and control, and keeping a record afterward. That progression from guidance to insight to action is why this Databricks role feels like a natural next step for me.

Shorter version:

> I’ve spent most of my career designing enterprise products at SAP and Cisco. At Cisco, I led the design of the Control Hub AI experience. It started by helping administrators learn and use the product, then grew into helping them understand reports and data. More recently, I’ve been exploring Agentic workflows for actions such as user provisioning and configuration changes. That move from guidance to insight to action is why Databricks feels like a natural next step for me.

## Project Walkthrough Strategy

### Eva-Aligned UXR Lens

The screenshots from Eva's talk sharpen how to present the work. Her standard is not "Did you do research?" It is "What decision became better because of the evidence?"

In every research beat, make five things explicit:

1. **Decision:** What real choice did the team need to make?
2. **Confidence gap:** What did the team need to learn before choosing?
3. **Minimum evidence:** What was the smallest useful research or test?
4. **Commitment:** What would the team do if the evidence pointed one way or the other?
5. **Impact:** What changed in the roadmap, product, or next investment?

Use this sentence shape:

> We needed to decide **[choice]**. We lacked confidence about **[uncertainty]**, so we used **[minimum evidence]**. It showed **[sticky insight]**, which led us to **[decision or action]**. The result was **[product, roadmap, or measured outcome]**.

Important boundaries:

- Do not present a research-method inventory. Mention the method only when it explains why the evidence was sufficient.
- Do not claim the team pre-committed to a result if that did not happen. Say what was agreed at the time, then name pre-commitment as something you would improve.
- Do not claim user validation for Agentic if it only received product, design, or engineering review.
- Show research as a shared product capability. Credit the researcher and explain how PM, engineering, data partners, or domain experts shaped the decision.
- Show your hybrid value without claiming to be the dedicated researcher: product framing, interaction design, prototyping, technical collaboration, and turning evidence into an actionable direction.

The two sticky insights to repeat:

- **CHAI:** "Admins were not trying to become better prompt writers. They were trying to find information, understand data, and fix issues."
- **Agentic:** "The plan is the contract the administrator approves before AI acts."

### Project One — CHAI Report Analysis, 14 Minutes

What Eva should remember:

> He turned evidence into a product decision, made the insight simple enough for the team to retell, changed the roadmap, shipped the new model, and measured the broader outcome.

#### 0. Set the team and your role — 45 seconds

**Slide title:** My Role In The Control Hub AI Pod

**Visual to show:**

- A simple pod diagram, not an organization chart.
- Center: `Control Hub AI pod`.
- Product: `1 PM`.
- Design: `1 product designer — me`.
- Engineering: `1 engineering lead + engineering team`.
- Data and model: `1 data scientist`.
- Under the pod, add one short ownership line: `I led the product and interaction design across the experience.`

Say:

- "I was the product designer on the Control Hub AI pod."
- "My core triad partners were one PM and one engineering lead."
- "The broader team included six engineers and one data scientist."
- "I led the product and interaction design, while the team shaped priorities, technical feasibility, data, and model behavior together."

#### 1. Name the decision, not the research topic — 1 minute

- Control Hub serves enterprise administrators responsible for networks, devices, users, and collaboration systems.
- CHAI could answer questions, but initial monthly adoption was around 3%.
- The real decision was whether to keep improving CHAI as a separate assistant or move it into the workflows where admins were already working.
- Name the real options: improve the destination, add more entry points, or redesign CHAI around contextual jobs.

Say:

> We needed to decide whether better prompting and discovery could improve the assistant, or whether CHAI needed a different product model. That mattered because continuing to polish the same surface risked consuming the roadmap without addressing the 3% adoption outcome.

#### 2. Define the confidence gap and minimum evidence — 2 minutes

- State what the team did not know: Was low adoption mainly a discoverability problem, a prompting problem, or a workflow-value problem?
- Show only the evidence needed to distinguish those explanations.
- Explain how the researcher, admins, analytics, and domain experts contributed.
- If the team did not formally pre-commit to an action threshold, do not retrofit one. State what the evidence persuaded the team to change and say you would make the decision rule explicit now.

Say:

> The confidence gap was not whether users liked chat. We needed to know what job they were trying to complete when help became valuable. We used behavioral evidence and direct customer learning to separate discovery friction from a deeper workflow problem.

#### 3. Connect the responsibility patterns to the opportunity map — 2 minutes

- Start with the two administrator responsibility patterns from the previous slide.
- Show that their responsibilities differed, but both moved through the same broad jobs: find information, understand data, and fix issues.
- Use the opportunity map to show how those jobs shaped the CHAI roadmap across search, reports, dashboards, configuration, and provisioning.
- Highlight `Understand -> Report analysis` and dim the other areas before moving to the next slide.
- Make the research impact visible as a changed product direction, not a slide of findings.

Say:

> I partnered with our researcher to talk with customers and understand where administrators wanted AI to help. Their responsibilities were different, but the needs repeated: find information, understand data, and fix issues. That gave us a broader opportunity map for CHAI. For this walkthrough, I will zoom into Report Analysis as one example of how we designed for the understand step.

#### 4. Show one decision in detail: scope must be visible — 3 minutes

- The first technical version could reliably attach one report as context.
- Compare the global launcher, persistent panel, page-level action, and row-level action.
- Explain the decision criteria: honest scope, user comprehension, implementation feasibility, and a path to expand later.
- Show the report already attached in CHAI.
- Avoid turning this into a universal claim that contextual entry always beats a central home. Databricks uses both Genie One for discovery and companion Genie Agents inside dashboards. Your decision was that a report-row entry was strongest when the relevant artifact was already known.

Say:

> I chose the report-row action because the interface and the technical capability told the same story. Before opening CHAI, the administrator could see exactly which artifact the system would analyze.

#### 5. Show how evidence shaped the interaction — 2 minutes

- Lead with the user's question; do not force prompt-writing theater.
- Keep report name, time range, filters, metric definitions, and scope visible.
- Keep the authoritative report or dashboard available while CHAI interprets it.
- Separate shipped details from guardrails that remained proposed.
- Present trust as an answer contract, not a confidence badge: interpreted question -> source and scope -> time and filters -> evidence or logic -> limitations -> correction or review.
- If a contract element was not in the shipped CHAI experience, label it as how you would evolve the design now.

Say:

> I did not want the assistant to become a second competing version of the data. The report stayed authoritative. CHAI helped interpret changes and unusual patterns while keeping the scope and source visible.

#### 6. Show the decision loop continuing — 1 minute 30 seconds

- Show how the pattern expanded from one report to page-level and dashboard contexts as the technical capability matured.
- Explain which pattern stayed stable: context is attached and visible before the answer.
- Briefly show question-first AI-generated Reports as a directional extension, not a shipped outcome.
- Frame dashboards and conversation as complementary: the dashboard answers recurring known questions; conversation handles the follow-up that emerges in the moment.
- Show the intended artifact loop: ask -> inspect -> edit structured output -> save or share -> return to the governed source.

Say:

> Natural language was useful for expressing intent, but I kept the generated report structured so users could inspect and edit the metrics, dimensions, filters, time range, and schedule.

#### 7. Define research impact through decisions and outcomes — 2 minutes 30 seconds

- Contextual CHAI patterns shipped into real workflows.
- The roadmap moved from assistant-centric improvements toward contextual jobs.
- Broader monthly adoption increased from 3% to 18%.
- Smart Search reduced dead-end searches by 86%.
- Do not claim Report Analysis alone caused either metric.
- State what you would measure more precisely now.
- Name one process improvement: before the next study, align on the decision, required confidence, minimum evidence, and what each result would change.

Say:

> The research mattered because it changed the product model and roadmap. As CHAI moved into contextual workflows, broader monthly adoption grew from 3% to 18%. I would not attribute that increase to Report Analysis alone. If I did this again, I would pre-agree on the decision thresholds and instrument eligible views, entry-point exposure, first question, useful follow-up, saved or shared output, and repeat use.

### Project Two — Control Hub Agentic, About 8 Minutes

What Eva should remember:

> He can take a broad platform strategy, translate it into specific administrator problems and product decisions, create a testable prototype quickly, and state exactly which evidence is still missing.

#### 1. Bridge from answers to action, then name the strategy — 1 minute

- Connect the projects through the stronger contract required for action: plan, approval, progress, recovery, and a durable record.
- Control Hub had a broader platform strategy to expand AI from answering questions into helping execute work.
- The strategy defined a direction, but it did not define the right administrator workflow or interaction model.
- Do not claim that administrators asked for "agents." Frame agents as a product response that still needed user-centered definition and validation.

Say:

> The assistant helped administrators understand data and information. The next question was what changes when AI can perform work. Control Hub already had a platform strategy to move in that direction, but it did not tell us which administrator problem to solve or what the experience should be. My role was to turn that strategy into something useful and controlled.

#### 2. Use the AI-first Overview as the first step, not the answer — 50 seconds

- Show the existing and AI-first Overview together.
- The first direction made the platform strategy visible, but feedback showed that Control Hub still needed to feel familiar.
- Preserve the existing Overview content and introduce AI as an operating layer inside Control Hub.
- Name the deeper question the surface could not answer: what did administrators actually want help with?

Say:

> My first direction was a landing experience centered around AI-generated insights and an AI input. It made the strategy visible, but the feedback was that Control Hub still needed to feel familiar. So I brought the existing content back and treated AI as a new operating layer inside the product. That was a useful first step, but it still did not answer what administrators actually wanted help with.

#### 3. Start with the work, then define Chat and Agents — 1 minute 30 seconds

- Start with moments where administrators need help, not a list of things an agent can do.
- Work with PM on value and priority, and with engineering on data, capability, feasibility, and risk.
- Explain the research finding: administrators were more open to agentic help than expected, but preferred starting from a proven workflow they could copy or adapt rather than creating everything from scratch.
- Turn that evidence into a product model:
  - `Chat` for an open-ended goal or unfamiliar request.
  - `Agents` for a known, repeatable workflow with visible purpose, ownership, and readiness.
- Let administrators use a provided agent, copy or adapt it, or create their own.

Say:

> We did not start by asking what an agent could do. We started with the moments where administrators wanted help, then evaluated value, data, feasibility, and risk. Research showed that administrators were more open to agentic help than we expected, but they wanted a proven and lower-risk starting point. That led to Chat for an open goal and Agents for known workflows they could use, copy, or adapt.

#### 4. Show the contract before and after action — 2 minutes 30 seconds

- Use Device Onboarding as the primary plan example.
- A short request hides inputs and dependencies, so always create a reviewable plan before action.
- The plan is the user-facing contract, not the model's private reasoning.
- After action, preserve who approved the work, what changed, what failed, and what recovery is available.
- Explain the product compromise: move richer agent events into the existing audit model instead of creating a parallel Activity system.
- Use dependency inspection and device onboarding as concrete examples of coordination-heavy work.

Say:

> My first design decision was always to make a plan before action. The plan let the administrator see what the agent understood, fill in missing information, and review the steps before approval. After the action, the system preserved a durable record of who approved it, what changed, what failed, and what recovery was available.

#### 5. Show creation, prototyping, and the reusable system — 2 minutes 30 seconds

- Show conversational creation becoming a structured draft, test, revision, and activation.
- Explain why you used React with Cursor and Codex: timing, transitions, persistent state, failure, and recovery needed to be experienced.
- Show how Widget Studio, human-readable design guidance, and reusable Markdown instructions turned prototype learning into a system.
- State that the result was product definition, a working interaction model, and cross-functional alignment, not a shipped adoption outcome.
- Close on the principle that Agentic AI should help users understand, approve, and account for work, not only automate it.

Say:

> I used Figma for the layout, then Cursor and Codex to build the interaction in React so the team could evaluate the actual behavior. I also created reusable widgets and guidance so this did not become a collection of one-off screens. The work is still directional, so I do not attach a customer metric to it. My takeaway is that Agentic AI is not only about autonomy. It should help the user understand the work, approve it, and know what changed afterward.

### What To Prepare Before Presenting

- One CHAI slide that says: **Decision -> evidence -> changed roadmap**.
- One research insight that a listener can repeat without seeing the slide.
- One example of the smallest study or evidence set that was sufficient for a decision.
- One honest example of research or review that caused you to abandon, reduce, or redirect an idea.
- A clear credit line for what the researcher, PM, engineering, data partners, and domain experts contributed.
- One example, if true, of helping a non-research partner participate in customer learning. Do not claim this if your role was only consuming findings.
- One sentence explaining what you wrote or built beyond screens: workflow model, prototype, decision framework, requirements, or acceptance criteria.
- For Agentic, a written next-study contract: decision, confidence needed, minimum evidence, and what each possible result would change.
- One simple system slide: **curator defines trusted context -> business user asks -> system answers -> user inspects or corrects -> curator improves quality**.
- One comparison slide: **known recurring question -> dashboard; emergent follow-up -> conversation; reusable conclusion -> saved analytical artifact**.
- One "what I would evolve now" slide. Keep shipped CHAI separate from the proposed answer contract, artifact loop, and quality-management layer.

## Databricks Product Review: What Should Change In Your Story

### The Product Model To Show You Understand

| Surface | Primary job | Important design pattern | What it should change in your presentation |
|---|---|---|---|
| **Genie One** | Discover and use governed data, dashboards, agents, apps, and knowledge from a business-user-ready home | One simple entry point across assets and workspaces, plus access from tools such as Slack and Teams | Do not argue that one AI destination is inherently wrong. Explain when broad discovery is useful and when already-resolved page context should be carried into the question. |
| **AI/BI Dashboards** | Monitor known metrics, explore patterns, and share repeatable views | Interactive filtering and drill-down, live data, AI-assisted authoring, companion Genie Agent, sharing, scheduling, and lineage | Present CHAI as a companion to an authoritative analytical artifact. Strengthen the path from answer to an editable, shareable, repeatable report or dashboard. |
| **Genie Agents** | Answer domain-specific questions without waiting for an analyst | Subject-matter-expert curation, scoped knowledge, trusted answers, clarification, review requests, monitoring, and benchmarks | Show the two-sided product: the person asking and the expert maintaining answer quality. Expand trust from output UI into an operating loop. |
| **Governance and semantics** | Keep metrics, definitions, permissions, and data access consistent across surfaces | Shared semantic context and permission enforcement rather than per-answer trust decoration | Explain that trust starts before generation. The UI should reveal the governed context and provide inspection and correction, not try to manufacture trust after the answer appears. |

### Product And Design Decisions To Enhance

#### 1. Evolve "contextual entry point" into "context routing"

Keep the shipped report-row decision, but show the larger model you would design now:

1. **Broad question or discovery:** begin in a unified home and help the user choose the relevant domain or asset.
2. **Question from a known artifact:** inherit the dashboard, report, chart, filters, and time range.
3. **Question spans domains:** disclose which sources and definitions were selected and let the user refine them.
4. **Reusable result:** save the output back into a governed report or dashboard rather than leaving it inside chat history.

Better line to say:

> The deeper decision was not where to put the sparkle. It was how much context the system could resolve before asking the user to do more work. A broad question may belong in a central discovery surface. A question that begins from a report should inherit that report honestly and visibly.

#### 2. Turn the CHAI response into an explicit answer contract

Organize the response in progressive layers:

- **What I understood:** interpreted question, metric, comparison, population, and time range.
- **What I used:** source artifact, data scope, filters, freshness, and permissions.
- **What I found:** concise conclusion, supporting table or visualization, and notable exceptions.
- **Why it is credible:** metric definition, calculation or query details, verified logic when available, and limitations.
- **What you can do:** refine, correct, request expert review, save to a report or dashboard, share, or schedule.

Presentation change:

- Annotate one response screen with these five layers.
- Use solid labels for shipped behavior and dotted labels for the proposed evolution.
- Do not redraw CHAI to resemble Genie. Show the transferable product reasoning.

#### 3. Make AI-generated Reports an artifact, not a long answer

Strengthen the directional report decision with a clear transition:

> Conversation is good for expressing an unfamiliar question. A report or dashboard is better for repeated review, comparison, collaboration, and accountability.

The proposed flow should show:

1. Ask a business question.
2. Confirm metrics, dimensions, filters, and time range.
3. Generate an editable report structure and visualizations.
4. Inspect definitions, data lineage, assumptions, and unsupported gaps.
5. Save, share, schedule, or continue exploring with follow-up questions.

This makes the design decision more relevant to AI/BI than showing polished generated prose.

#### 4. Add the missing curator and quality-management experience

Your current work strongly covers the person consuming an answer and the administrator approving an action. Add the system-owner role that Databricks makes explicit:

- Define the domain, supported questions, terminology, sources, and permissions.
- Add verified logic or examples for high-value recurring questions.
- Review unclear or incorrect answers with the original context intact.
- Turn common failures into instructions, tests, or benchmark questions.
- Monitor adoption, unanswered questions, corrections, and quality by domain.

Be honest that this is an extension you would design, not shipped CHAI functionality.

#### 5. Preserve the strongest Agentic distinction

Do not retrofit Control Hub Agentic into a Genie Agents clone. Use the comparison to sharpen your judgment:

- **Analytical agent:** wrong interpretation can mislead a decision; prioritize semantics, evidence, verification, and expert review.
- **Operational agent:** wrong execution can change infrastructure; add plan, risk tier, permission, progress, interruption, recovery, and durable Activity.

Line to say:

> Databricks helped me sharpen a distinction in my own work: trustworthy analysis and trustworthy action share context and evidence, but action needs a separate authorization and recovery contract.

### Research Decisions To Put Into The Deck

| Product decision | Confidence gap | Minimum useful evidence | Pre-committed consequence |
|---|---|---|---|
| Central discovery versus contextual entry | Do users know the relevant artifact when the question begins? | Task-based sessions across broad discovery and report-specific follow-up, plus entry-to-use funnel data | Use a unified home for unresolved discovery; inherit visible artifact context when scope is known. |
| Default answer depth | Which evidence helps a business user judge an answer without overwhelming them? | Paired sessions with business users and data experts reviewing the same answers | Change default disclosure, escalation, and analyst-handoff patterns. |
| Answer versus saved artifact | When does an exploratory result become recurring team knowledge? | Observe users deciding whether to reuse, share, or schedule findings across realistic workflows | Invest in save-to-report or dashboard if reuse is common; keep ephemeral exploration lightweight if it is not. |
| Curator quality loop | Can domain experts diagnose and correct failures efficiently? | Have subject-matter experts review wrong or ambiguous answers with realistic context | Change the review queue, required evidence, benchmark creation, and ownership model. |
| Operational autonomy | Which changes may run automatically, require approval, or should not be delegated? | Administrators review low-, medium-, and high-impact actions, including partial failure | Adjust risk tiers, plan detail, approval placement, recovery, or remove the workflow from Agentic scope. |

### At-A-Glance Slide Arc

Keep the walkthrough interruption-friendly. Add or revise these frames rather than expanding the deck into a Databricks product tour:

1. **Decision frame:** Separate assistant or contextual jobs?
2. **Research frame:** One sticky insight and the roadmap change it caused.
3. **System frame:** Unified discovery when context is unresolved; contextual entry when the artifact is known.
4. **Trust frame:** One annotated CHAI answer contract, with shipped and proposed layers clearly separated.
5. **Artifact frame:** Conversation -> editable report or dashboard -> save, share, schedule.
6. **Quality frame:** User feedback and expert review feed a maintained domain experience.
7. **Action frame:** Analysis contract versus operational plan and approval contract.
8. **Outcome frame:** Shipped CHAI outcomes, directional Agentic learning, and the next decision-first studies.

What to cut:

- Repeated entry-point screens that prove the same point.
- A long research-method inventory.
- Generic chat UI details that do not affect scope, evidence, correction, or action.
- Any implication that Databricks and Control Hub have the same users, data model, or risk level.

## Detailed 25-Frame Presentation Guide

This is the detailed working-file guide to use when refining the existing Juniper presentation. It keeps the interruption-ready structure from `juniper-jason-hiring-manager-likely-questions.md`, but changes the emphasis for Eva:

- Put the research decision before the design process.
- Show how evidence changed a roadmap, product model, or investment.
- Make each insight simple enough for a cross-functional partner to retell.
- Show the minimum evidence needed for a decision, not research theater.
- Connect consumer experience to the expert or system-owner quality loop.
- Demonstrate interaction and visual craft through concrete states and tradeoffs.
- Keep shipped customer impact separate from directional product definition.

### Recommendation

Present the work as one evolution with two chapters:

1. **CHAI:** research changed the product from a separate assistant into contextual decision support across reports and dashboards.
2. **Control Hub Agentic:** the next design question was what additional contracts were required when AI moved from interpreting data toward operational action.

Working title:

> From governed context to controlled action: designing AI people can understand, challenge, and direct.

Natural opening title:

> Helping administrators understand complex data—and safely let AI act on it.

The story in one sentence:

> I used research to move AI into the data workflows where administrators were already making decisions, then used a working prototype to define the stronger plan, permission, execution, and accountability model required when AI began acting on their behalf.

### What Eva Should Learn About You

By the end, Eva should have evidence that you can:

- Name the product decision underneath a research request.
- Turn research into a clear roadmap change rather than a findings presentation.
- Design natural-language exploration without hiding data scope or semantics.
- Keep dashboards, conversation, and durable analytical artifacts coherent.
- Work with PM, engineering, research, data partners, and domain experts without blurring ownership.
- Use code to investigate system behavior that static screens cannot answer.
- Design both the end-user experience and the quality or governance loop around it.
- State exactly what shipped, what remained directional, and what evidence is still missing.

### Status Contract

Place a small `SHIPPED`, `DIRECTIONAL`, or `PROPOSED EVOLUTION` label on every main frame.

| Work | Status | Safe presentation language |
|---|---|---|
| Contextual CHAI patterns | Shipped | CHAI moved into real administrator workflows; broader monthly adoption grew from 3% to 18% |
| Report-row, report-page, dashboard, and Smart Search patterns | Shipped | The experience expanded as system capability and workflow evidence matured |
| Smart Search outcome | Shipped and measured | Dead-end searches decreased by 86% |
| AI-generated Reports | Directional unless later status is confirmed | A question-first concept that kept the generated analytical artifact structured and editable |
| Control Hub Agentic | Directional working prototype | Defined the interaction model and helped product and engineering evaluate behavior |
| Plan, approval, execution, recovery, and Activity states | Directional working prototype | Concrete states for stakeholder review, product definition, and future customer validation |
| Curator, benchmark, and quality-management loop | Proposed evolution | A Databricks-relevant extension informed by the product review, not a shipped CHAI capability |

Say the status boundary once near the Chapter Two transition:

> The contextual report, dashboard, and search patterns reached customers. AI-generated Reports and the Agentic system were directional product work, so I will keep their influence and validation separate from the shipped CHAI outcomes.

### Timing And Visual Backbone

Prepare about 21 minutes 45 seconds of content and keep the walkthrough under 22 minutes.

| Time | Frame | Visual beat | Decision to discuss |
|---:|---:|---|---|
| 0:00-0:35 | 1 | Context to controlled action | Frame one connected product evolution |
| 0:35-1:20 | 2 | Control Hub AI pod and your role | Establish team structure, ownership, and collaboration |
| 1:20-2:10 | 3 | Two admin responsibilities, one decision loop | Show the strategic-to-operational handoff |
| 2:10-3:10 | 4 | Find, understand, act opportunity map | Connect the personas to the roadmap and select Report Analysis |
| 3:10-4:05 | 5 | Reporting delivered data, not understanding | Zoom into the unresolved reporting question |
| 4:05-5:00 | 6 | Entry-point alternatives | Choose the narrowest honest context boundary |
| 5:00-5:55 | 7 | V1 report-row entry | Make one-report scope visible before the question |
| 5:55-6:50 | 8 | V1 question and answer contract | Preserve agency while exposing evidence and limits |
| 6:50-7:40 | 9 | V2 page-level context | Expand the entry only when capability supports it |
| 7:40-8:35 | 10 | Dashboard plus AI | Keep the dashboard authoritative while supporting follow-up |
| 8:35-9:35 | 11 | Question-first generated report | Turn conversation into an editable analytical artifact |
| 9:35-10:20 | 12 | Editable, shareable report artifact | Separate the initial alpha from later direct-editing ideas |
| 10:20-11:05 | 13 | Shipped outcome and research impact | Separate broader adoption from feature causality |
| 11:05-11:45 | 14 | Understanding to action | Explain why action creates a stronger trust contract |
| 11:45-12:55 | 15 | Platform strategy to administrator value | Translate a broad direction into a real coordination problem |
| 12:55-13:45 | 16 | Early AI-first Overview challenge | Expose the missing jobs, capability model, and relationship to Control Hub |
| 13:45-14:30 | 17 | Use-case research to Chat and Agents | Turn administrator needs into two clear ways to begin |
| 14:30-15:30 | 18 | Plan first | Turn incomplete intent into a reviewable contract |
| 15:30-16:25 | 19 | Approval and execution | Put control at the meaningful commitment boundary |
| 16:25-17:20 | 20 | Partial failure and recovery | Show production depth rather than a happy-path demo |
| 17:20-18:15 | 21 | Activity and audit compromise | Show research need, PM pushback, and platform judgment |
| 18:15-19:15 | 22 | Create, test, monitor, improve | Add the expert or system-owner side of quality |
| 19:15-20:10 | 23 | Working React prototype | Explain which uncertainties became testable |
| 20:10-21:15 | 24 | Outcome and next decision-first research | State influence, gaps, minimum evidence, and commitments |
| 21:15-21:45 | 25 | Close | Land context, evidence, control, and durable learning |

### Working-File Presentation Rules

- Reuse the existing Juniper working-file frames rather than creating a separate Databricks-themed case study.
- Rename the main sequence `01` through `25` so you can jump when Eva interrupts.
- Show one primary state and one product decision per frame.
- Before showing any design solution, state the problem or UX opportunity in one sentence.
- Use the same compact rhythm for solution frames: `problem or opportunity -> evidence or constraint -> decision -> tradeoff or remaining question`.
- Do not add a separate problem slide for every solution. Use the opening sentence, title, and one short annotation to set the problem before revealing the design.
- Keep the product UI large enough to inspect; crop into the decision instead of shrinking a full screen.
- Put alternatives immediately beside the selected direction.
- Use one short annotation such as `Decision`, `Evidence`, `What changed`, `Tradeoff`, or `Still unproven`.
- Use solid annotations for shipped behavior and dotted annotations for proposed evolution.
- Keep research artifacts near the decision they changed. Do not create one disconnected research chapter.
- Keep edge states, component variants, prototype links, and deeper research evidence just outside the main frame for interruption-driven discussion.
- Do not add Databricks screenshots to prove similarity. Use Databricks concepts in your analysis and spoken relevance, not as decoration inside Cisco work.

### Frame 1 — From Governed Context To Controlled Action

Time: 35 seconds.

**Visual to show**

- One CHAI report or dashboard state on the left.
- One Agentic plan or Activity state on the right.
- A small progression: `Understand -> verify -> act`.
- Status labels: `SHIPPED FOUNDATION` and `DIRECTIONAL EXTENSION`.

**Decision to land**

- These are two stages of one trust problem, not two unrelated AI projects.

**Say**

- "Today I’ll show the evolution of AI inside Control Hub, from an assistant that answered questions toward more agentic workflows."
- "Control Hub is the administration console for Webex. Enterprise administrators use it to manage networks, devices, users, and collaboration services."
- "The first part is about moving AI into the workflows where administrators were already finding information and understanding data."
- "The second part explores what users need when AI can perform work, not just explain it."
- "Across both projects, the question was the same: what does the user need to understand before they can trust the system?"

**Eva may interrupt**

- **Why combine them?** Report Analysis is the shipped evidence story; Agentic shows how you applied the learning to a new, higher-risk interaction model. Keep their outcomes separate.

### Frame 2 — My Role In The Control Hub AI Pod

Time: 45 seconds.

**Visual to show**

- Use a simple pod diagram rather than an organization chart.
- Put `Control Hub AI pod` in the center.
- Around it, show:
  - `Product — 1 PM`
  - `Design — 1 product designer: me`
  - `Engineering — 1 engineering lead + engineering team`
  - `Data and model — 1 data scientist`
- Under the pod, add: `My ownership — product and interaction design across the AI experience`.
- Keep the visual to one slide. Do not add individual names or reporting lines.

**Context to land**

- You were the product designer embedded in a cross-functional AI pod.
- Your closest day-to-day partners were the PM and engineering lead.
- You owned the product and interaction design while major product, technical, data, and model decisions were shared.

**Say**

- "I was the product designer on the Control Hub AI pod."
- "My closest partners were our PM and engineering lead, and the broader pod included engineers and a data scientist."
- "I led the product and interaction design across the AI experience."
- "The team shaped priorities, technical feasibility, data access, and model behavior together, because those decisions directly affected what we could promise to users."

**Eva may interrupt**

- **What did you personally own?** You owned the user workflows, interaction model, detailed design, and prototypes shown in the case study. Name shared product, engineering, research, data, and model decisions as shared.

### Frame 3 — Two Responsibilities, One Decision Loop

Time: 60 seconds.

**Visual to show**

```text
Victor — organizational oversight        Francis — operational execution
Adoption, trends, governance       <->    Devices, users, incidents, changes
Needs decision-ready insight              Needs scope, dependencies, recovery
```

Connect them through:

```text
Understand -> decide -> act -> verify -> communicate
```

**Research basis**

- Titles varied, so the research grouped administrators by responsibility patterns.
- The strategic question and the operational work often crossed roles.
- Both needed accountable evidence, but at different depths.

**Design implication**

- Do not design one generic chat answer for one generic administrator.
- Support progressive depth and the handoff between a decision-maker and an operator.

**Say**

- "Control Hub served two broad types of administrator responsibility."
- "Victor was the collaboration visionary. He looked across the organization at adoption, trends, and governance."
- "Francis was the firefighter. He handled the daily work of devices, users, incidents, and changes."
- "Sometimes Victor raised the question and Francis had to investigate it, so understanding the handoff between them was important."
- "With that context, the next question was not only where AI could help, but where these administrators actually wanted help."

**Eva may interrupt**

- **Are these real segments?** They are responsibility patterns grounded in the study, not universal job titles or demographic personas.

### Frame 4 — Where Administrators Wanted AI To Help

Time: 50 seconds.

**Visual to show**

- Use the `Find -> Understand -> Act` opportunity map from the supplied roadmap image.
- Treat it as an opportunity map, not a dated delivery timeline.
- Under the three stages, use language that matches the research insight:
  - `Find — find information`
  - `Understand — understand data`
  - `Act — fix issues`
- Keep the example areas visible: Help Assistant and Smart Search under Find; Report Analysis and Data Analysis under Understand; Configuration and Provisioning under Act.
- Add status labels if the examples did not all ship at the same time so the map does not imply a single release.
- Use a progressive reveal:
  1. Show all three needs.
  2. Highlight `Understand`.
  3. Highlight `Report Analysis` and dim the other examples.

**Connection from the persona frame**

- Victor and Francis had different responsibilities, but both moved through parts of the same loop.
- The personas explained who needed help and how work moved between people.
- The opportunity map explains where AI could help across that work.

**Research impact**

- You partnered with the researcher to speak with customers; do not imply that you ran the research alone.
- The output was not the persona artifact by itself. It helped the team move from improving a separate chat destination toward contextual assistance.
- The sticky insight was: administrators were not trying to become better prompt writers; they were trying to find information, understand data, and fix issues.

**Decision question**

> Should the team keep improving one assistant destination, or organize CHAI around the jobs where administrators already needed help?

**Confidence gap**

- Was low adoption mainly discoverability, prompting difficulty, answer quality, or poor workflow fit?

**Say**

- "When I first worked on CHAI, there were many possible places where AI could help."
- "So I partnered with our researcher to talk with customers about the work they were trying to get done across these different roles."
- "The same three needs kept appearing: find information, understand data, and fix issues."
- "That changed how we thought about the roadmap. Instead of only improving the chat interface, we started bringing AI into the workflows where those needs already happened."
- "For this presentation, I’ll zoom into the understand step and use Report Analysis as one example."

**Eva may interrupt**

- **Is this a research framework or a delivery roadmap?** Present it as a research-informed opportunity map that shaped roadmap priorities. Do not imply that every item was committed or shipped in this sequence.
- **What did you personally do?** You helped frame the product questions, joined customer conversations, synthesized the implications with the researcher, and translated the evidence into product and interaction directions with PM and engineering.
- **What was the minimum evidence?** The evidence needed to distinguish discovery friction from workflow-value failure; do not list every method unless she asks.
- **Did you pre-commit to a decision rule?** If not, say so. Then explain that you would now agree in advance on what each result would change.

### Frame 5 — Zooming In: Reports Delivered Data, Not Understanding

Time: 55 seconds.

**Visual to show**

```text
Victor asks an organization-level question
-> Francis configures and generates the report
-> inspect and compare
-> interpret what changed
-> explain the result
-> Victor or Francis decides what to do
```

Place one old Reports screen beside the flow. Highlight:

- The handoff between responsibilities.
- Manual report configuration.
- The reasoning gap after the report was generated.

**Why this example**

- Reporting made the `Understand` opportunity concrete.
- The product could deliver data, but administrators still had to determine what changed, why it mattered, and what to do next.
- The workflow also made the Victor-to-Francis handoff visible rather than leaving the personas behind on the previous slide.

**Decision question**

> Should CHAI remain a separate place that administrators had to prompt, or become part of the reporting workflow with the relevant data already attached?

**Say**

- "Reports were one of the clearest examples inside the understand step."
- "An administrator selected a template, configured the report, waited for it to generate, and then downloaded a CSV file."
- "They could not review the report directly inside Control Hub, so understanding the data still required manual analysis or another tool."
- "The report delivered data, but it did not remove the reasoning work or the handoff between people."
- "So the product question became: how could AI help administrators get the information they needed without leaving the reporting workflow?"

**Eva may interrupt**

- **Why choose reporting first?** It exposed a frequent, consequential interpretation gap and gave the team a bounded artifact whose scope the interface and the system could both represent.
- **What exactly were you trying to decide?** Whether to keep investing in a separate assistant destination or place AI inside a reporting job with visible, inherited context.

### Frame 6 — Entry-Point Alternatives Made The Promise Visible

Time: 55 seconds.

**Problem or UX opportunity to state first**

- Administrators needed AI inside the reporting job, but the entry point would imply what data CHAI understood.
- The opportunity was to place AI where the visible product context and the system's real context matched.

**Visual to show**

Four large explorations:

1. Global assistant.
2. Reports-page `Ask AI`.
3. Persistent side panel.
4. Report-row action.

Evaluate each against:

- Is the relevant data already known?
- Can the system reliably use that scope?
- Will the user understand what is attached?
- Can the interaction expand later?

**Decision**

- Choose the narrowest entry whose visual promise matched the system’s actual capability.

**Databricks-relevant nuance**

- Do not claim a contextual entry is universally better than a central home.
- A broad discovery question can begin in a unified surface; a report-specific question should inherit visible artifact context.

**Say**

- "I explored several ways to launch AI analysis: a global assistant, a Reports-page entry, a preview panel, and an action beside each report."
- "The important constraint was that the system could reliably use only one report as context at that time."
- "That meant the entry point was not only a placement decision. It also told the user what data the assistant understood."
- "I chose the report-row action because it was anchored to one visible report and matched the real technical scope."
- "The tradeoff was lower visibility, but the interaction made a clear and honest promise."

**Eva may interrupt**

- **Why not the page level?** It would have implied a broader context than engineering could support at that time.
- **What would you call the larger pattern now?** Context routing: broad discovery when scope is unresolved, inherited artifact context when it is already known.

### Frame 7 — V1: Scope Was Communicated Before The Question

Time: 55 seconds.

**Problem or UX opportunity to state first**

- V1 could reliably attach only one report, so a broad entry would overpromise the system's scope.
- The opportunity was to make the relevant artifact clear before the administrator asked anything.

**Visual to show**

- `site/public/images/chai/report-kickoff.png` at readable scale.
- Zoom into the report name, row action, and attached context.
- Keep the global and page explorations just outside the main frame.

**Decision**

- Location communicated which report the AI could analyze.
- The new capability remained additive to the existing report workflow.

**Craft detail**

- The sparkle itself was not the trust mechanism.
- Proximity, the report name, and visible attached context reinforced the same promise.
- A clearer `Ask AI` label should remain an honest alternative to test.

**Say**

- "When the administrator selected the sparkle, CHAI opened with that report already attached as context."
- "The report name stayed visible, so the user knew what the assistant could analyze before typing anything."
- "In the first design, I gave suggested questions more attention because they helped explain the new capability."
- "But during testing, most administrators already had a specific question and wanted to type it directly."
- "So I made the input immediately available and kept suggestions as optional education instead of making users start from a prompt we wrote for them."

**Eva may interrupt**

- **Did the sparkle cause low adoption?** No. It was a plausible discoverability issue, but relevance, quality, latency, and trust could also contribute. You would need the full exposure-to-use funnel.

### Frame 8 — V1: The Answer Needed A Contract

Time: 55 seconds.

**Problem or UX opportunity to state first**

- A fluent answer could still hide what CHAI understood, which data it used, and where its limits were.
- The opportunity was to make the answer inspectable and correctable rather than merely confident.

**Visual to show**

- `site/public/images/chai/report-delivered.png` or the kickoff-to-answer sequence.
- Annotate shipped layers with solid lines and proposed evolution with dotted lines:
  - What I understood.
  - What I used.
  - What I found.
  - Why it is credible.
  - What the user can do next.

**Behavioral iteration**

- Free typing became immediately available.
- Suggested prompts became optional guidance rather than a blocking step.
- Do not use an exact prompt-usage percentage unless verified.

**Decision**

- Natural language captures the question; visible scope, evidence, limitations, and correction preserve user agency.

**Say**

- "Once users received an answer, we found another problem: some of the numbers felt like they came from a black box."
- "The user had no easy way to understand how CHAI reached the answer or validate it inside Control Hub."
- "So I designed an expandable detail that could show the report context and supporting evidence behind the answer."
- "I used progressive disclosure because not everyone needed that depth, but the people who wanted to verify the answer needed a clear path."
- "The larger principle was that trust should come from inspectable evidence and correction, not only a confident response or score."

**Eva may interrupt**

- **Which guardrails shipped?** Point to only what the real screen confirms. Label lineage, verified logic, expert review, or other additions as proposed evolution if they were not implemented.

### Frame 9 — V2: The Entry Expanded With The Capability

Time: 50 seconds.

**Problem or UX opportunity to state first**

- Once CHAI could reason across several reports, the row-level entry became too narrow for broader questions.
- The opportunity was to expand discovery without losing the visible context contract established in V1.

**Visual to show**

- V1 row-level context just outside the main frame.
- V2 page-level `Ask AI` state as the hero.
- A small note: `one artifact -> cross-report context`.

**Decision**

- Move to the page level only when engineering could reliably support broader questions.
- Preserve the context contract by disclosing which reports, filters, and time ranges were actually used.

**Say**

- "Later, the model and routing architecture became more capable, and CHAI could query across several reports."
- "At that point, the report-row entry became too narrow for the questions the system could answer."
- "So I added an Ask AI entry at the Reports-page level, where administrators could begin with a broader question across their available reports."
- "The placement expanded with the capability, but the answer still needed to show which reports, filters, and time range it actually used."

**Eva may interrupt**

- **Why reuse the existing assistant instead of adding an input to the page?** It kept loading, history, follow-up, errors, and conversational state in one system. The tradeoff was one additional interaction.

### Frame 10 — Dashboards Answer Known Questions; Conversation Handles Follow-Up

Time: 55 seconds.

**Problem or UX opportunity to state first**

- Administrators needed help interpreting an emerging pattern without creating a second, detached version of the dashboard's data.
- The opportunity was to support follow-up while keeping the governed dashboard authoritative and visible.

**Visual to show**

- `site/public/images/chai/data-analysis.png` at full width.
- Keep the dashboard, filters, chart, question, and explanation simultaneously visible.

**Decision**

- The dashboard remains the authoritative analytical artifact.
- AI helps interpret an unusual pattern or answer a question that emerges in the moment.
- The user can compare the explanation with the evidence rather than accept a detached answer.

**Databricks relevance**

- This is directly adjacent to the product logic of AI/BI Dashboards with a companion Genie Agent.
- State the transferable design problem, not that the products are identical.

**Say**

- "Once the report-analysis pattern was working, we extended the same idea to analytical dashboards in Control Hub."
- "The dashboard already showed known metrics and trends, but administrators still had follow-up questions about a change, comparison, or unusual pattern."
- "So I brought the same assistant into that context instead of creating a separate analysis experience."
- "The dashboard stayed visible as the source of truth while CHAI helped explain what changed and why it might matter."
- "That let administrators compare the answer with the chart and use the insight to plan their next work."

**Eva may interrupt**

- **How would you serve a business leader and an analyst?** Keep one answer and one source of truth, but progressively disclose definitions, filters, lineage, or generated logic for the person who needs deeper verification.

### Frame 11 — Flip The Workflow: Ask First, Then Generate

Time: 60 seconds.

**Problem or UX opportunity to state first**

- The existing reporting workflow required administrators to choose a template and configure the output before they could inspect the data or ask for insight.
- The opportunity was to let the administrator start with the question while keeping the generated report structured and reviewable.

**Visual to show**

- `site/public/images/chai/custom-report-1.png` moving into `custom-report-2.png`.
- Compare:

```text
Configure first -> generate -> interpret
Ask first -> confirm scope -> generate editable report
```

- Zoom into metrics, dimensions, filters, time range, visualization, save, share, or schedule controls that exist in the source design.

**Decision**

- Flip the sequence from `configure -> generate -> interpret` to `ask -> confirm scope -> generate`.
- Use conversation to capture intent and structured report controls to preserve analytical precision.

**Status**

- Label this `DIRECTIONAL` unless later shipping status is confirmed.

**Say**

- "At this point, the model could access more of the data in Control Hub, so I started asking how the reporting workflow could become more AI-native."
- "The old flow started with a template: configure the report, generate it, inspect the data, and then ask for help understanding it."
- "I proposed flipping that flow. The administrator could start with the question and let CHAI identify the relevant data and generate a report."
- "The generated result still needed visible metrics, filters, sources, and a time range, because natural language should not hide the report definition."
- "This was directional work, separate from the contextual report analysis that had already shipped."

**Eva may interrupt**

- **Why not chat only?** Chat is poor at showing a durable definition and difficult to correct precisely.
- **Why not direct manipulation?** It was promising but not sufficiently validated; compare it against structured controls and conversation in the next study.

### Frame 12 — The Result Became An Editable, Shareable Artifact

Time: 45 seconds.

**Problem or UX opportunity to state first**

- A generated answer trapped in chat would still be difficult to inspect, revise, organize, or hand off.
- The opportunity was to keep conversation and the report artifact connected while being explicit about what the initial alpha did and did not support.

**Visual to show**

- Use `site/public/images/chai/custom-report-2.png` as the primary visual.
- Keep the conversation and report artifact visible together.
- Annotate only:
  - `Inspect the generated chart and data.`
  - `Revise through conversation.`
  - `Save, download, or share.`
- Add a small status boundary:

```text
Initial alpha
Preview + conversational revision + handoff

Later direction
Direct chart editing + flexible layout
```

**Decision**

- Keep the report as a visible artifact beside the conversation rather than returning only a chat response.
- Treat direct manipulation and flexible layout as later directions, not delivered alpha behavior.

**Say**

- "The generated report appeared as an artifact beside the conversation, so the administrator could inspect the chart and data without leaving Control Hub."
- "They could continue the conversation to revise the report, then save, download, or share it with another administrator or IT leader."
- "The first alpha phase was intentionally an MVP. More direct editing of individual charts and a more flexible layout were ideas for a later phase, not included in the initial alpha."
- "The larger product model was becoming clear: start broadly when the question is open, carry context when the data is known, and turn a useful answer into a durable artifact when people need to reuse it."

**Eva may interrupt**

- **Why not leave the result in chat?** A report gives the result a durable definition and makes it easier to inspect, revise, save, and hand off.
- **What remained unproven?** Whether conversational revision was precise enough for report editing and whether direct manipulation would be faster for chart- or layout-specific changes.

### Frame 13 — Research Impact Was A Changed Roadmap And A Measured Product Outcome

Time: 45 seconds.

**Visual to show**

```text
Research insight
-> contextual product model
-> shipped workflows
-> broader adoption 3% to 18%
```

Place Smart Search’s 86% reduction in dead-end searches as a separate measured proof point, not as Report Analysis causality.

**Be precise**

- Contextual report, dashboard, and search patterns shipped.
- Broader CHAI monthly adoption grew from 3% to 18%.
- Report Analysis alone did not cause that change.
- AI-generated Reports remained directional unless confirmed otherwise.

**Say**

- "The main outcome was that CHAI moved from a separate assistant into the workflows where administrators were already working."
- "Across that broader product evolution, monthly adoption grew from 3% to 18%."
- "Smart Search was another contextual workflow and separately reduced dead-end searches by 86%."
- "I would not claim that Report Analysis alone caused either result. The evidence supported the larger roadmap shift toward contextual AI."
- "It also prepared users and the product for the next question: what changes when AI can perform work, not only explain the data?"

**Eva may interrupt**

- **What would you measure now?** Eligible views, context exposure, question submission, useful follow-up, corrections, review requests, saved or shared artifacts, repeat use, and quality by domain.

### Frame 14 — From Understanding To Action

Time: 30 seconds.

**Visual to show**

```text
For an answer
context -> evidence -> correction

For an action
plan -> approval -> progress -> recovery -> record
```

**Point to land**

- The second project is a continuation of the first, but action requires a stronger user contract than analysis.

**Say**

- "The assistant helped administrators understand their data."
- "The next product question was: what changes when AI can actually perform work?"
- "For an answer, users need context and evidence. For an action, they also need a plan, approval, progress, and recovery."
- "That became the focus of my second project."

**Eva may interrupt**

- **Is this the same as Genie Agents?** "Not exactly. Genie Agents primarily support governed analysis. This project explored actions that could change infrastructure, so the consequence and approval model was different."

### Frame 15 — The Direction Came From Platform Strategy

Time: 35 seconds.

**Visual to show**

```text
Platform direction
Move AI from answering questions toward helping people complete work

Design responsibility
Define which administrator work deserves help and how much control AI should have
```

**Point to land**

- The origin was a top-down platform strategy. Your role was to turn that direction into a user-centered product model.

**Say**

- "Cisco and Control Hub had a broader platform strategy to move AI from answering questions toward helping people complete work."
- "That gave us a direction, but it did not tell us which administrator problem to solve or what the experience should be."
- "My role was to turn that strategy into useful work and define where the administrator should stay in control."

**Eva may interrupt**

- **Was this strategy-led or customer-led?** "The direction was strategy-led. The user-centered work was deciding which administrator problems were worth solving and what evidence and controls each workflow needed."
- **Did customers ask for agents?** "No. Administrators wanted help with complicated work. Agents were one product response we still needed to validate."

### Frame 16 — The First AI-First Overview Was A Useful Step, Not The Answer

Time: 70 seconds.

**Visual to show**

- Show `site/public/images/control-hub-agentic/ai-first-overview.png`.
- Use the existing Overview on the left and the AI-first direction on the right.
- Add only two annotations:
  - `Made the platform strategy visible.`
  - `Still needed to feel like Control Hub.`

**Feedback and decision**

- The expanding AI capability was not visible enough in the existing Overview, and administrators lacked a clear place to discover what it could help with and begin.
- The new entry needed to support the current assistant while creating room for more capable and eventually agentic workflows.
- The first direction centered the landing experience on AI-generated insight and an AI input.
- Feedback showed that enterprise users still needed familiar Control Hub content and navigation.
- Preserve the existing Overview as the product foundation and introduce AI as a new operating layer within it.
- Do not stop at the surface. The concept still did not define which work deserved agentic help.

**Say**

- "To make that strategy real, the first problem I looked at was visibility."
- "We already had an assistant, but it was one feature inside a large platform. As AI became more capable and moved toward agentic work, administrators needed a clear place to discover what it could do and begin."
- "So I designed an AI-first Overview with generated insights and an AI input. It gave the strategy a visible product entry point."
- "But the feedback was that Control Hub still needed to feel familiar. So I kept the existing Overview and integrated AI as a new operating layer, not a separate product."
- "That addressed visibility and entry, but it still did not tell us which administrator work actually deserved agentic help."

**Eva may interrupt**

- **Was the first direction a failed design?** "No. It was a useful hypothesis. It helped us see that making AI prominent was not enough. We still needed to define the work, capability, and control model."

### Frame 17 — Start With The Work, Not With The Agent

Time: 50 seconds.

**Visual to show**

```text
Administrator moments that need help
-> value and frequency
-> data and tool readiness
-> feasibility
-> consequence and control
```

- Keep the visual as a short selection rail, not a feature map.

**Research and decision**

- Start with moments where administrators need help, not a list of things an agent could do.
- Work with PM to prioritize high-value jobs and with engineering to evaluate capability, data availability, and feasibility.
- Research suggested administrators were more open to agentic help than expected.
- They still preferred a proven workflow and a lower-risk starting point over creating an agent from scratch.

**Say**

- "So instead of continuing to refine the Overview, I took a step back and started with the administrator's work."
- "We did not ask, ‘What can an agent do?’ We asked, ‘Where do administrators need the most help?’"
- "I worked with PM on high-value jobs and with engineering on data, capability, and feasibility."
- "Research showed that administrators were open to agentic help, but wanted proven workflows and lower-risk work first."

**Eva may interrupt**

- **Why not use normal automation?** "I would use normal automation when the inputs and steps are stable. An agent becomes more useful when it needs to gather changing context, adapt a plan, or bring an exception back to the user."
- **What would make you reject a use case?** "Unreliable data, no safe verification, risk that approval cannot contain, or a workflow that a deterministic tool could handle more clearly."

### Frame 18 — Chat For Open Intent, Agents For Proven Workflows

Time: 45 seconds.

**Visual to show**

- Use `site/public/images/control-hub-agentic/framework-agents-1.png` as the primary visual.
- Add one small rail:

```text
Chat
Start with an open goal

Agents
Start with a known workflow to use, copy, or adapt
```

**Decision**

- Keep Chat as the flexible starting point for open intent.
- Add an Agents framework for discovering and managing repeatable workflows.
- Let administrators start from Cisco-provided agents or create their own.
- Make each agent's purpose, ownership, and status visible before use.

**Say**

- "That led to two ways to begin."
- "Chat was for an open goal, when the user knew the outcome but not the path."
- "Agents were for known workflows. I designed a page where administrators could understand each agent, use a Cisco-provided one, or create their own."
- "They could launch it from the card or call it from the assistant, so both starting points stayed connected."

**Eva may interrupt**

- **Why have both Chat and Agents?** "Chat is flexible, but it can hide what the system is prepared to do. Agents make a repeatable workflow, its owner, and its readiness easier to inspect."
- **Why copy instead of create?** "A proven starting point lowers setup effort and lets the administrator inspect expected behavior before adapting it."

### Frame 19 — Always Make A Plan Before Action

Time: 50 seconds.

**Visual to show**

- Show `site/public/images/control-hub-agentic/device-onboarding-plan.png`.
- Reveal request -> missing information -> proposed steps -> expected changes -> approval.

**Decision**

- Do not translate a short request directly into execution.
- Turn it into an editable plan the administrator can review before approval.

**Say**

- "Once the framework was there, the next question was how to make administrators comfortable letting AI act."
- "My first design decision was: always make a plan before action."
- "‘Onboard these devices’ sounds simple, but it leaves out assignments, policies, dependencies, and exceptions."
- "The plan shows what the agent understood, what is missing, and what steps the administrator is approving."
- "The plan is where a temporary conversation becomes concrete work."

**Eva may interrupt**

- **Does plan-first add too much friction?** "It can. I would scale the depth of the plan to the uncertainty, consequence, reversibility, and number of affected resources."
- **Is the plan the model's chain of thought?** "No. It is not private model reasoning. It is a user-facing contract that explains the proposed work and what the administrator is approving."

### Frame 20 — After Action, Preserve A Durable Record

Time: 45 seconds.

**Visual to show**

- Use `site/public/images/control-hub-agentic/framework-activity.png`.
- Annotate only:
  - `Who started and approved the work.`
  - `What changed, failed, or was not attempted.`
  - `What can be retried or reversed, when supported.`

**Feedback and decision**

- A chat is temporary, but an infrastructure change needs a durable record.
- The first direction was a separate Agent Activity area.
- PM challenged the parallel audit model because Control Hub already had an audit system.
- Preserve the requirement by adding richer agent events to the existing audit model.

**Say**

- "A chat is temporary, but after the agent acts, the record cannot disappear with the conversation."
- "I first explored a separate Agent Activity page for what happened, who approved it, and what changed."
- "The PM pointed out that Control Hub already had an audit system, so a separate destination would split the record."
- "We kept the existing audit model and added richer agent events, including failures and available recovery."

**Eva may interrupt**

- **Who changed their mind?** "Both of us. I accepted that a second audit system would fragment the product. PM accepted that the existing events needed more detail for agent plans, actions, and outcomes."
- **Was every action reversible?** "No. Reversibility depends on the action. The record still needs to show what changed and what recovery options are actually available."

### Frame 21 — Use Cases Where Coordination Was The Real Problem

Time: 40 seconds.

**Visual to show**

- Use `site/public/images/control-hub-agentic/delete-virtual-line-dependencies.png` as the primary example.
- Keep Device Onboarding as a short spoken second example.

**Why these use cases mattered**

- Dependency inspection required administrators to move across pages and collect system context before changing or deleting an object.
- Device onboarding required applying known-good settings across locations, groups, devices, policies, and exceptions.
- The value was not one-click execution. It was gathering context, proposing the work, and keeping approval and exceptions visible.

**Say**

- "Two use cases made this more concrete."
- "Before a change or deletion, an administrator often moved across several pages to understand dependencies. An agent could gather that context first."
- "For device onboarding, it could apply known-good settings across a location or group while still showing the plan and exceptions."
- "The value was reducing the coordination work, not hiding the action behind one click."

**Eva may interrupt**

- **Which was your primary prototype?** "Device Onboarding was the main end-to-end example for plan, approval, execution, and Activity. Dependency inspection showed another place where gathering context could reduce manual navigation."

### Frame 22 — Let Administrators Create And Test Their Own Agents

Time: 40 seconds.

**Visual to show**

- Use `site/public/images/control-hub-agentic/create-test-agent.png`.
- Show only conversation -> structured draft -> test -> revise -> activate.

**Decision**

- Use conversation to lower the threshold for describing an agent.
- Convert the conversation into a structured draft so the configuration remains inspectable.
- Require testing before activation so behavior can be reviewed with realistic inputs.

**Say**

- "We also explored how administrators could create their own agents."
- "They described the goal through conversation, which became a structured draft they could review and edit."
- "Before activation, they could test realistic examples, inspect the output, and revise the behavior."
- "This part was still directional, but it helped define what safe creation should look like."

**Eva may interrupt**

- **Why use conversation for creation?** "It lowers the threshold for expressing intent. The structured draft and test step preserve precision and control."
- **Who maintains quality after launch?** "That remained an open product question. The next version should make ownership, failed cases, updates, and ongoing quality review explicit."

### Frame 23 — Code Made The Behavior Easier To Evaluate

Time: 45 seconds.

**Visual to show**

- Use `site/public/images/control-hub-agentic/prototype-craft.png`.
- If time allows, show one short live or recorded sequence from conversation -> plan -> approval -> execution -> Activity.

**Decision**

- Use Figma for layout and visual exploration.
- Use a working React prototype for timing, transitions, persistent state, failure, and recovery.
- Prototype the uncertain behavior the team needs to evaluate, not every screen for spectacle.

**Say**

- "Because the work was still in progress, I used prototypes to make the direction concrete."
- "I used Figma for the layout and key states, then Cursor and Codex to build the interaction in React."
- "PM and engineering could experience the transition from conversation to plan, approval, execution, and Activity."
- "The team could react to actual behavior instead of imagining it from static screens."

**Eva may interrupt**

- **How has AI changed your design process?** "It lets me make system behavior testable earlier. I still define the problem, interaction model, constraints, acceptance criteria, and final review."

### Frame 24 — Turn The Prototype Into A Reusable System

Time: 35 seconds.

**Visual to show**

```text
Working prototype
-> Widget Studio
-> human-readable design guidance
-> reusable Markdown instructions
-> more consistent agent experiences
```

**System contribution**

- Create a Widget Studio to review and control repeated assistant patterns.
- Document behavior for designers and engineers.
- Translate reusable rules into Markdown instructions that engineering and AI tools can apply across use cases.

**Say**

- "I did not want the prototype to become a collection of one-off screens."
- "I built a Widget Studio to review repeated patterns and control assistant behavior across use cases."
- "Then I documented the rules for people and translated reusable guidance into Markdown for engineers and AI tools."
- "That helped the team move faster while keeping the experience consistent."

**Eva may interrupt**

- **What did you personally own?** "I owned the interaction model, the working prototype, the reusable UI patterns, and the design guidance. PM and engineering helped evaluate the product direction and technical feasibility."

### Frame 25 — Agentic AI Is Not Only About Autonomy

Time: 30 seconds.

**Visual to show**

```text
Understand the work
-> review the plan
-> approve the action
-> follow progress
-> recover when needed
-> know what changed
```

**Outcome boundary**

- This was directional work that produced product definition, a working interaction model, and cross-functional alignment.
- Do not attach a customer adoption metric to it.

**Say**

- "This work is still in progress, so I do not attach a customer metric to it."
- "It gave us a clearer Agentic product model and a working prototype the team could evaluate."
- "My main takeaway is that Agentic AI is not only about autonomy. It should help the user understand the work, approve it, and know what changed afterward."
- "That connection between trustworthy answers and controlled action is the problem I want to keep working on."

Then stop and let Eva choose where to go deeper.

### Likely Presentation Interruptions To Rehearse First

Use the same structure as the Juniper guide: first sentence, two proof points, honest caveat.

1. What was your exact role, and what did research, PM, engineering, and data partners own?
2. What decision did the research change?
3. How did you know the problem was workflow fit rather than discoverability alone?
4. What was the minimum evidence needed to change direction?
5. Why did the first entry belong on the report row?
6. Why not begin from a unified assistant home?
7. How did you keep a page-level or dashboard answer grounded?
8. Which trust layers shipped, and which are improvements you would add now?
9. Why turn a conversation into a report or dashboard?
10. How would a business user challenge an incorrect answer?
11. Who owns quality after an Agent or analytical experience is launched?
12. How would you evaluate answer accuracy and usefulness over time?
13. Why was Agentic necessary instead of normal automation?
14. How did you select the first use cases?
15. Why must the operational agent create a plan first?
16. When does plan-first become too much friction?
17. What happens when the plan becomes stale or execution partially fails?
18. Why does Activity need to persist outside conversation?
19. What changed after PM or engineering pushback?
20. What did the coded prototype teach that Figma did not?
21. What would you validate next, and what would each outcome change?
22. What is most transferable to Databricks, and what is materially different?

### Interruption Answer Pattern

When Eva interrupts on a frame, answer in this order:

```text
The decision was...
We lacked confidence about...
The evidence or constraint showed...
So I chose or changed...
The tradeoff or remaining gap is...
```

Example:

- “The decision was whether the first AI entry should be global or attached to a report.”
- “We lacked confidence that the system could ground a broad entry reliably.”
- “Engineering could support one report as context, and users needed the scope to be obvious.”
- “I attached the entry to the report row.”
- “The tradeoff was discoverability, so I would instrument the full funnel and test the sparkle against a clearer label.”

### Visual Preparation Checklist

#### CHAI frames

- [ ] Working-role map showing strategic and operational responsibilities.
- [ ] Old report workflow and reasoning gap.
- [ ] Find, Understand, Act opportunity map with Report Analysis clearly highlighted as the walkthrough focus.
- [ ] Four entry-point alternatives.
- [ ] V1 row context: `site/public/images/chai/report-kickoff.png`.
- [ ] V1 answer: `site/public/images/chai/report-delivered.png`.
- [ ] V2 report-page `Ask AI` state from the source Figma file.
- [ ] Dashboard analysis: `site/public/images/chai/data-analysis.png`.
- [ ] Generated report: `site/public/images/chai/custom-report-1.png`.
- [ ] Structured report editing: `site/public/images/chai/custom-report-2.png`.
- [ ] One real missing, stale, unauthorized, or unsupported-data state.
- [ ] One annotated answer contract with shipped and proposed layers separated.
- [ ] One status and outcome frame that does not imply single-feature causality.

#### Agentic frames

- [ ] Analytical-versus-operational trust-contract bridge.
- [ ] Two-line platform-direction-to-design-responsibility diagram.
- [ ] Existing-versus-AI-first Overview comparison with the familiarity feedback: `site/public/images/control-hub-agentic/ai-first-overview.png`.
- [ ] Use-case selection rail: administrator need, value, readiness, feasibility, consequence, and control.
- [ ] Chat-versus-Agents starting model with the Agent catalog as the hero: `site/public/images/control-hub-agentic/framework-agents-1.png`.
- [ ] Agent details: `site/public/images/control-hub-agentic/framework-agents-2.png`.
- [ ] Plan: `site/public/images/control-hub-agentic/device-onboarding-plan.png`.
- [ ] Activity: `site/public/images/control-hub-agentic/framework-activity.png`.
- [ ] Dependency-inspection example: `site/public/images/control-hub-agentic/delete-virtual-line-dependencies.png`.
- [ ] Creation and test: `site/public/images/control-hub-agentic/create-test-agent.png`.
- [ ] Prototype craft: `site/public/images/control-hub-agentic/prototype-craft.png`.
- [ ] Prototype-to-system diagram: Widget Studio, design guidance, and reusable Markdown instructions.
- [ ] Approval/execution and partial-failure states ready as backup: `site/public/images/control-hub-agentic/device-onboarding-run.png`.
- [ ] `DIRECTIONAL PROTOTYPE` on every Agentic frame.

### Practice Rules

- Aim for two to four spoken sentences per frame.
- Keep your natural connectors such as “so,” “with that,” and “the next question was,” but use only one connector at the start of a thought.
- Pause after the first sentence on each frame. That sentence is the claim; the rest is evidence or explanation.
- Advance after naming the decision, evidence or constraint, and tradeoff.
- Pause immediately when Eva asks a question; do not promise to answer later.
- If Eva goes deep on research, skip later UI frames instead of rushing.
- The non-negotiable CHAI frames are 2, 4, 5, 6, 8, 10, 11, and 13.
- The non-negotiable Agentic frames are 14, 15, 16, 17, 18, 19, 20, 23, and 25.
- Practice the full version at 21 minutes 45 seconds and a compressed version at 17 minutes.
- For the 17-minute cut, remove Frames 3, 9, 12, 21, 22, and 24; combine Frames 16 and 17, then keep Frames 18, 19, 20, 23, and 25.
- If Eva asks for one project, use Frames 1-13, then compress Frames 14, 18, 21, and 24 into a two-minute epilogue.
- Memorize the opening, sticky research insight, shipped-versus-directional boundary, audit compromise, next-study contract, and close.
- Do not memorize every sentence. The goal is a decision-led conversation, not a recital.

## Bridges From Your Work To Databricks

Use these only after presenting your own decision; do not repeatedly tell Eva that the products are identical.

- **CHAI report context -> Genie data and semantic context:** the answer is only useful if the user can see what the system interpreted and which data is in scope.
- **Structured AI-generated Reports -> AI/BI dashboards:** natural language can capture intent while editable metrics, filters, layouts, and visualizations preserve precision.
- **Evidence and review -> trusted assets, Inspect, and generated SQL:** trust comes from verifiable logic and clear correction paths, not confident copy.
- **Agentic plan and approval -> Genie Code Agent mode:** AI can propose multi-step work, but the user needs a reviewable boundary before it changes artifacts.
- **Activity and audit -> quality and governance:** actions and corrections must leave a durable trace that both users and system owners can learn from.

## Tailored Q&A

### 1. Tell me about yourself.

- **Q: Tell me about yourself.**
  - **Testing:** Relevance, seniority, and concision.
  - **Answer to say:**
    - "I am a product designer focused on complex enterprise and AI systems."
    - "At Cisco, I led the design of CHAI across search, reports, dashboards, and device workflows, and broader monthly adoption grew from 3% to 18%."
    - "Before that, I designed role-based enterprise workflows at SAP using reusable dashboard and component patterns."
    - "More recently, I have used React, TypeScript, and AI coding tools to prototype Agentic behavior such as plans, approvals, execution, and Activity."
    - "The throughline is making technical systems clear, inspectable, and useful enough for real decisions."

### 2. Why Databricks and this role?

- **Q: Why Databricks, and why AI/BI?**
  - **Testing:** Specific motivation and product understanding.
  - **Answer to say:**
    - "The design problem is unusually close to the work I want to keep doing: helping people ask a question of complex data, understand the evidence, and decide what to do next."
    - "What is compelling about Databricks is that trust is not only a presentation problem. It connects semantic context, governed data, generated SQL, trusted assets, and human review."
    - "My CHAI work taught me how much the quality of an AI answer depends on visible scope and context."
    - "The Agentic work taught me how to design the boundary from insight into approved action."
    - "AI/BI brings those problems together at a much larger and more central data layer."

### 3. Why are you considering a move?

- **Q: Why are you leaving Cisco?**
  - **Testing:** Motivation without negativity.
  - **Answer to say:**
    - "I am not leaving because something is wrong."
    - "Cisco gave me the opportunity to lead meaningful enterprise AI work and build strong technical depth."
    - "I am looking for a role where trustworthy AI and data interaction are the center of the product, not one capability inside a larger administration platform."
    - "I also want closer day-to-day ownership with the product and engineering team as these patterns are being defined."

### 4. What is the most relevant project?

- **Q: Which project best shows your fit for this role?**
  - **Testing:** Judgment about your own evidence.
  - **Answer to say:**
    - "CHAI Report Analysis is the closest shipped example because it sits at the intersection of natural-language questions, enterprise data, context, and trust."
    - "The key decision was moving AI from a separate destination into the report and dashboard workflows where administrators were already making decisions."
    - "I designed the scope and source to stay visible so the answer did not feel detached from the data."
    - "Those contextual patterns were part of the broader CHAI evolution as monthly adoption grew from 3% to 18%."
    - "I pair it with the Agentic prototype to show how I think about the next boundary: validation, approval, action, and audit."

### 5. Tell me about research that changed your direction.

- **Q: Tell me about a time research changed your product direction.**
  - **Testing:** Evidence-led judgment and willingness to let go.
  - **Answer to say:**
    - "CHAI began as a separate assistant, and the early instinct was to improve that destination."
    - "Research and observation showed that admins were not trying to become better at prompting; they were trying to find information, understand data, and fix issues inside Control Hub."
    - "I reframed the roadmap around those jobs and moved AI into search, reports, dashboards, and device workflows."
    - "That changed the product model, not only the interface."
    - "The broader monthly adoption increase from 3% to 18% gave us evidence to continue investing in contextual patterns."

### 6. How do you make an AI-generated insight trustworthy?

- **Q: How do you design trust into an AI-generated answer?**
  - **Testing:** AI/BI interaction depth.
  - **Answer to say:**
    - "I do not treat trust as one confidence badge."
    - "First, I make the interpreted question, scope, source, time range, filters, and freshness visible."
    - "Then I expose the evidence and logic at the depth appropriate to the user, with a path to inspect generated queries or supporting details."
    - "I make uncertainty, unsupported gaps, and conflicting signals explicit instead of smoothing them into a confident summary."
    - "Finally, I provide correction, review, save, share, and escalation paths so the user remains an active participant."
  - **If they push:** "For higher-stakes actions, I add a separate plan and approval boundary; understanding an answer and authorizing a change are different trust problems."

### 7. How do you serve both technical and non-technical users?

- **Q: How would you design the same AI/BI experience for a business leader and a data analyst?**
  - **Testing:** Progressive disclosure without oversimplification.
  - **Answer to say:**
    - "I would keep one shared answer and source of truth, but offer different depths of inspection."
    - "The business leader may first need the finding, affected metric, comparison, and implication."
    - "The analyst may need the metric definition, source tables, joins, filters, generated SQL, and assumptions."
    - "Both should be able to see what the system understood and correct it; the difference is how much detail is expanded by default."
    - "I would validate the handoff too, because a leader may need to send the result to an analyst for review rather than resolve every issue alone."

### 8. How has AI changed your design process?

- **Q: How have AI tools materially changed the way you design?**
  - **Testing:** Eva's explicit AI-fluency filter.
  - **Answer to say:**
    - "The biggest change is that I can test system behavior much earlier, not only generate screens faster."
    - "I use Figma for detailed interaction and visual exploration, then Cursor, Claude Code, and Codex to build working React and TypeScript prototypes."
    - "For the Agentic project, that let the team experience planning, approval, timing, partial failure, and Activity instead of imagining them from static frames."
    - "I still own the problem framing, interaction model, states, constraints, acceptance criteria, and final review."
    - "AI removes implementation friction; it does not replace the product judgment or customer evidence."

### 9. What could this team learn from you?

- **Q: What would you teach or bring to the Databricks design team?**
  - **Testing:** Distinctive contribution without ego.
  - **Answer to say:**
    - "My strongest contribution is making ambiguous AI behavior concrete enough for a cross-functional team to evaluate."
    - "I model what the AI knows, what the user can verify, when permission is required, and what happens when the system is wrong or incomplete."
    - "I then prototype the riskiest behavior so the team can challenge timing, state, and handoff rather than only discuss a concept."
    - "I also look for patterns that can be reused across workflows, such as context, evidence, plans, approvals, and Activity."
    - "I would also expect to learn a great deal from Databricks about semantic systems, analytics, and data quality."

### 10. How do you move fast without sacrificing craft?

- **Q: How do you operate quickly without lowering the craft bar?**
  - **Testing:** Eva's stated hiring criterion.
  - **Answer to say:**
    - "I choose fidelity based on the uncertainty."
    - "If the risk is product logic, I map the flow and build the behavior before polishing every screen."
    - "If the risk is comprehension or trust, I spend more time on hierarchy, data presentation, language, feedback, and edge states."
    - "I create reusable patterns for repeated decisions so quality makes the next workflow faster."
    - "I review the implemented experience in the browser rather than treating handoff as the end of design."

### 11. How do you work with strategic customers?

- **Q: How do you handle a conversation with a strategic customer or senior decision-maker?**
  - **Testing:** Customer credibility and executive communication.
  - **Answer to say:**
    - "I prepare around the decision the customer is responsible for, not a list of interface questions."
    - "I ask what outcome matters, what evidence they use today, where confidence breaks down, and what the cost of a wrong decision is."
    - "I separate their local request from a pattern that may apply across customers."
    - "I play back the tradeoff in plain language and show a concrete workflow or prototype so we can test the model together."
    - "Afterward, I document what changed in the product direction and what still needs broader validation."
  - **If they push for a specific example:** Use a real admin, TAC-expert, or cross-product customer conversation and name the participant level accurately.

### 12. Tell me about end-to-end ownership.

- **Q: Tell me about a project you owned from idea through outcome.**
  - **Testing:** Scope beyond design delivery.
  - **Answer to say:**
    - "CHAI is my strongest example because I owned the loop from a weak product outcome through a change in product model and measurement."
    - "After launch, monthly adoption was around 3%, so I studied where admins actually needed help rather than waiting for a narrow redesign brief."
    - "I aligned product, research, engineering, data partners, and technical experts around finding information, understanding data, and fixing issues."
    - "We shipped contextual AI across search, reports, dashboards, and devices."
    - "Adoption grew from 3% to 18%, and I used the result to keep refining where AI belonged next."

### 13. Tell me about a disagreement with engineering.

- **Q: Tell me about a disagreement with engineering.**
  - **Testing:** Evidence, technical pragmatism, and low ego.
  - **Answer to say:**
    - "An early CHAI design used `@Add context` so users could choose the system context or data source."
    - "After engineering had implemented it, research showed that users did not understand the concept or what CHAI could actually help them do."
    - "Engineering reasonably pushed back because they had already invested in the first model."
    - "I brought the evidence back and redesigned the interaction as Skills, using clear capability language while reusing as much of the implemented structure as possible."
    - "The team accepted the change because the user problem was concrete and the revision respected the engineering investment."

### 14. Tell me about a disagreement with product.

- **Q: Tell me about a time product changed your design direction.**
  - **Testing:** Product judgment and willingness to change.
  - **Answer to say:**
    - "I initially proposed a separate Agent Activity experience because agent plans, approvals, and outcomes needed more detail than the existing audit log provided."
    - "The PM argued that a second audit system would fragment a platform administrators already understood."
    - "I agreed with the platform concern but protected the trust requirement underneath my proposal."
    - "We worked toward richer agent-event details inside the existing audit system instead."
    - "The result was a more coherent direction because both sides changed: I gave up the separate surface, and the product model accepted deeper transparency."

### 15. How do you measure AI/BI success?

- **Q: What would you measure for an AI/BI experience?**
  - **Testing:** Product thinking beyond engagement.
  - **Answer to say:**
    - "I would not use prompt volume alone as success."
    - "I would measure whether users reach a correct, decision-ready answer: successful question completion, clarification rate, correction rate, review requests, and time to useful insight."
    - "I would track trust behavior such as inspecting sources or SQL, accepting trusted answers, saving or sharing results, and returning to the workflow."
    - "For the data-team side, I would track benchmark accuracy, recurring failure categories, time to tune an agent, and whether corrections improve future coverage."
    - "For action workflows, I would add approval, abandonment, error, recovery, and verified-completion measures."

### 16. What is your gap for this role?

- **Q: What would you need to learn fastest in this role?**
  - **Testing:** Self-awareness and learning plan.
  - **Answer to say:**
    - "I would need to build deeper fluency in Databricks' semantic and analytics model, especially how metric definitions, Unity Catalog, generated SQL, trusted assets, and benchmarks work together."
    - "I would learn through real customer questions and failed answers, not documentation alone."
    - "I would pair with data practitioners and engineering, trace a question from language through data and logic to the final answer, and model where trust breaks."
    - "My advantage is that I have used this learning pattern before in network administration and enterprise AI."
    - "I do not need to be the deepest data engineer; I need enough technical understanding to make sound product decisions and ask precise questions."

### 17. What would your first 90 days look like?

- **Q: What would you do in your first 90 days?**
  - **Testing:** Learning speed and senior ownership.
  - **Answer to say:**
    - "First, I would learn the AI/BI system by following real questions from business users through Genie, data context, generated logic, review, and correction."
    - "I would speak with business users, analysts, data engineers, product, design, and engineering to map where trust or momentum breaks."
    - "I would audit the interaction patterns shared across Genie One, Genie Agents, dashboards, and Genie Code."
    - "I would choose one bounded, high-friction workflow where I could prototype and improve something real while building domain credibility."
    - "By 90 days, I would want the team to trust me to frame an AI/BI problem, make a clear recommendation, and carry it forward with customers and engineering."

### 18. Are you comfortable with the Seattle team model?

- **Q: The product and engineering team is based in Seattle. How would that work for you?**
  - **Testing:** A hidden but explicit logistical filter.
  - **Answer to say:**
    - "[State your honest yes, travel cadence, or relocation position immediately.]"
    - "I understand this role is designed around close collaboration with the Seattle team."
    - "[Name the concrete arrangement and timing you can reliably support.]"
    - "I would rather be specific now than leave the team to infer my availability."

## Pressure Follow-Ups To Rehearse

For both projects, prepare one-sentence answers to:

- What did you personally own?
- What did PM, research, engineering, and data partners own?
- Which parts shipped, and which remained directional?
- What customer evidence changed your decision?
- What was the hardest technical constraint?
- What did you cut to move faster?
- What did the working prototype reveal that Figma did not?
- How do you know the answer was more trustworthy?
- What was the visual or interaction-craft decision you are proudest of?
- What failed after launch?
- What would you instrument differently now?
- What would you do differently with Databricks' current capabilities?

Safe status language:

> The contextual CHAI patterns shipped as part of the broader product evolution. The AI-generated Reports and Agentic work were directional prototypes, so I keep their product-definition impact separate from shipped adoption outcomes.

Safe causality language:

> Broader CHAI monthly adoption grew from 3% to 18% as the product moved into contextual workflows. I would not claim this one entry point or feature caused the full increase without funnel-level evidence.

## Questions To Ask Eva

Ask two or three. Start with product, then success, then management style.

### Recommended sequence

1. **Product challenge**

   > Across AI/BI today, where does the team need the most product definition: helping data teams create trustworthy context, helping business users validate answers, or helping people move from an insight into action?

2. **Six-month success**

   > If I joined and six months from now you felt very good about the hire, what would I have changed for customers or for the team?

3. **Eva's management style**

   > How do you like to work with senior designers? Where do you expect them to operate independently, and where do you prefer to stay close to the work?

### Strong backups

- "How does the team currently learn whether a non-technical user trusts a Genie answer enough to make a decision or take action?"
- "How is design ownership divided across Genie One, Genie Agents, dashboards, and Genie Code, and where do you most need one coherent interaction model?"
- "The role mentions strategic customers. What kind of customer access would this designer have, and at what point in product definition?"
- "When research, product telemetry, and a strategic customer's request point in different directions, how does the team usually make the decision?"
- "What is the hardest craft problem in AI/BI right now that is easy for an outsider to underestimate?"
- "What have you learned since joining Databricks about designing for data practitioners that changed your own point of view?"

## Closing Statement

> This conversation reinforces why the role feels so aligned. I have already worked on the core interaction problems of contextual data, natural-language exploration, transparent AI, and controlled action in a complex enterprise product. Databricks would let me go much deeper on those problems with a team where data and AI are the product foundation. I would bring shipped ownership, strong interaction craft, and a practical prototyping approach, while learning the analytics domain quickly from the team and customers.

## Language To Mirror

Use naturally:

- "ask a question of company data"
- "exploration -> validation -> action"
- "transparent and trustworthy"
- "technical and non-technical users"
- "AI-native enterprise software"
- "system thinker"
- "idea to GA"
- "strategic customers"
- "operate at today's pace without sacrificing craft"
- "AI changed my process by letting us evaluate behavior earlier"
- "context, evidence, correction, and control"

## Avoid Saying

- "I designed a chatbot."
- "Users trust it because we show a confidence score."
- "AI makes me faster" without explaining what became testable or better.
- "I did everything end to end" when partners owned research, implementation, or data work.
- "Report Analysis caused adoption to grow from 3% to 18%."
- "The Agentic system shipped" or attaching shipped metrics to it.
- "I simplify complexity" without naming the decision, state, or information you changed.
- "I am not technical"; explain the boundary of your current depth and how you learn.
- "I do not have BI experience" as the whole answer; name the adjacent data and analytics work, then the gap.
- Long process recitals before answering Eva's question.
- Generic enthusiasm about Databricks being "a leader in AI."
- Em dashes or overly polished phrases that sound generated when a short spoken sentence would do.

## Final Rehearsal Checklist

- [ ] Confirm with the recruiter whether Eva expects one case study, two projects, or a portfolio tour.
- [ ] Decide your honest Seattle travel or relocation answer.
- [ ] Confirm the exact participant level for your strategic-customer example.
- [ ] Time the CHAI section to 14 minutes.
- [ ] Time the Agentic section to 8 minutes.
- [ ] Practice the 60-second introduction without reading it.
- [ ] Practice the shipped-versus-directional status line once, early.
- [ ] Prepare one visual and one decision per beat.
- [ ] Make the generated report's scope, filters, metrics, and editable structure legible.
- [ ] Make the Agentic plan, approval boundary, failure state, and Activity record legible.
- [ ] Rehearse the five most likely questions: why Databricks, research changed direction, AI trust, AI-changed process, and speed with craft.
- [ ] Choose three questions for Eva and one backup.
- [ ] Have the portfolio open locally and online, with direct links to CHAI and Agentic.
- [ ] Leave at least 12 minutes for discussion.
