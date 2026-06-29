# Moloco Hiring Manager Prep - STAR Answers

Role: Senior Product Designer, Moloco Commerce Media  
Interview: hiring manager, 45 minutes  
Likely case study: CHAI first, Agentic if time

## What They Are Likely Looking For

Moloco is hiring for a senior IC who can work in complex, data-heavy product areas and move product strategy forward. The case study should not only show AI interaction craft. It should show product judgment.

Signals to hit:

- Complex B2B / analytics / commerce-like workflows.
- Data-informed decision-making.
- Ambiguous problem framing.
- Partnership with PM, Engineering, and Data.
- Interaction craft for dense surfaces.
- Design systems and reusable patterns.
- Business outcome thinking.
- AI fluency in daily design practice.
- Senior IC ownership, influence, and tradeoffs.

Use the interview to make one larger point:

> I design AI and data-heavy workflows by turning complexity into decision moments users can trust.

## How To Use STAR Without Sounding Stiff

Keep each answer around 90 seconds unless they ask for depth.

- Situation: one sentence of context.
- Task: what you personally needed to figure out.
- Action: 2-3 concrete decisions you made.
- Result: outcome, metric, alignment, shipped pattern, or learning.

Do not recite "Situation, Task, Action, Result." Just answer naturally in that order.

## The Five Stories To Reuse

1. **CHAI adoption turnaround**  
   Best for ambiguity, data-informed design, business outcomes, AI product judgment.

2. **CHAI contextual entry points**  
   Best for complex workflows, interaction patterns, user context, technical constraints.

3. **CHAI Reports / Ask AI pattern**  
   Best for data-heavy workflows, analytics surfaces, PM/Eng/Data partnership.

4. **Control Hub Agentic trust contracts**  
   Best for ambiguous future-state work, AI safety, strategic prototyping, roadmap influence.

5. **Agentic prototype craft**  
   Best for AI in design practice, fast prototyping, stakeholder alignment, design systems.

## Behavioral Questions And STAR Answers

### 1. Tell me about a time you worked on an ambiguous problem.

Moloco signal: ambiguity, product strategy, senior IC framing.

Use: CHAI adoption turnaround.

Answer:

> When CHAI first launched in Control Hub, the problem was ambiguous because the assistant technically worked. It could answer admin questions, but adoption was low, around 3% weekly adoption. So the task was not simply "make the chat UI better." I needed to understand why users were not building a habit around it.
>
> I first improved the obvious things: prompts, answer layout, thread history, and the basic assistant flow. That helped, but it also exposed the real issue. Admins did not want to stop their workflow, open a separate assistant, figure out what to ask, and connect the answer back to the page they were on.
>
> So I reframed the problem from "better chat" to "contextual AI inside admin workflows." That led to Skills, Smart Search, report entry points, and device/workspace troubleshooting patterns. Adoption moved from 3% to 18%, zero-result searches dropped 86%, and Smart Search became 14% of assistant entry points.

Short closer:

> The lesson was that ambiguity cleared up once I stopped treating the assistant as a destination and started looking at the user workflow around it.

### 2. Tell me about a time data changed your design direction.

Moloco signal: data-informed workflows, experimentation, growth mindset.

Use: CHAI report analysis beta.

Answer:

> One example was the report analysis flow in CHAI. The first design had a sparkle icon on each report row. When the admin clicked it, we showed a small menu with suggested prompts and an input field. The idea was that suggested prompts would help people get started, while the input gave them flexibility.
>
> During beta testing, the interaction data showed a different behavior. Most admins were skipping the suggested prompts and going straight to the input field. A realistic way to say this, if the final analytics support it, is: "In beta, roughly 70% of report-analysis starts came from typed custom questions, while only about 15-20% started from a suggested prompt."
>
> We followed up with users and the reason was clear. Report questions are usually very specific: they depend on the report type, the time range, the team, the anomaly, or the metric they are trying to explain. The suggested prompts were helpful as examples, but they rarely matched the exact question in the admin's head.
>
> So I changed the design direction. Instead of making the prompt menu the first step, clicking the sparkle launched the assistant directly with the report already attached as context and the input ready for free typing. The suggested prompts became lighter guidance inside the assistant, not a blocking menu before it.

Short closer:

> The data changed my assumption. I thought suggested prompts would reduce friction, but for this workflow they added an extra step. The better design was to preserve context and maximize free typing.

Metric options to confirm before using:

- Conservative beta read: "About two-thirds of users typed a custom question instead of selecting a suggested prompt."
- Stronger beta read: "Roughly 70-75% of report-analysis starts came from the free-text input; suggested prompts accounted for about 15-20%."
- Menu friction read: "A meaningful share of users opened the sparkle menu and paused or dismissed it, which told us the menu was slowing down the start of the task."
- Post-change read, only if measured: "After removing the menu step, time to first question dropped from about 10-12 seconds to about 4-6 seconds."
- Post-change read, only if measured: "The share of sparkle clicks that turned into an assistant question increased by about 15-25%."

### 3. Tell me about balancing user needs, technical constraints, and business goals.

Moloco signal: PM/Eng/Data collaboration, tradeoffs, complex products.

Use: CHAI routing into Skills.

Answer:

> In CHAI, the roadmap expanded from basic help into search, reports, analytics, and troubleshooting. Each capability needed different context and tools under the hood. The technical need was routing: the system needed to know what kind of context to use. But the user need was almost the opposite. Admins should not have to understand routing.
>
> The early model exposed too much of that technical structure through things like manually adding context. That made sense internally, but it was not how admins thought. They thought, "I need help with this report," or "I need to understand this workspace issue."
>
> I turned that routing problem into a user-facing Skills model. Skills explained what CHAI could help with in admin language, while setting the right context behind the scenes. That balanced answer quality, technical routing, and adoption.

Short closer:

> The design job was to respect the technical constraint without making the user operate the system's internals.

### 4. Tell me about designing for a complex, data-heavy workflow.

Moloco signal: analytics surfaces, campaign-management-adjacent complexity.

Use: CHAI Reports / Ask AI / AI-generated reports.

Answer:

> Reports were one of the most data-heavy CHAI workflows. Admins had report data, but the hard part was interpreting what mattered. The original workflow was very manual: generate a report, inspect the data, then ask CHAI what it meant.
>
> I explored a few entry points: generic chat, a report-level button, a side panel, and a row-level sparkle. We started with the row-level entry because it made the context obvious. The user could tell CHAI was using that specific report.
>
> As the capability grew, the pattern evolved. We moved from one report as context, to Ask AI across reports, to Ask AI on analytics dashboards, and then to AI-generated reports where the admin could start with the insight they needed and review the generated report structure before trusting it.

Short closer:

> The important design move was not adding AI on top of data. It was putting the AI at the point where the user was already trying to make sense of the data.

### 5. Tell me about a design decision that improved business or product outcomes.

Moloco signal: business outcomes, growth, measurable value.

Use: CHAI contextual AI.

Answer:

> The business problem with CHAI was that we had invested in an AI assistant, but low adoption meant users were not getting value from it. The product needed CHAI to become part of real admin workflows, not just a feature people tried once.
>
> I moved the design from a standalone assistant toward contextual entry points: search, reports, analytics, workspaces, and devices. That meant users entered CHAI from moments where they already had a task or question.
>
> The result was that adoption grew from 3% to 18%. Smart Search reduced zero-result searches by 86% and became 14% of assistant entry points. More importantly, usage shifted from opening a chatbot from a menu to using CHAI inside real moments of friction.

Short closer:

> The outcome came from changing where the product created value, not only improving the surface UI.

### 6. Tell me about a time your first solution was not enough.

Moloco signal: growth mindset, iteration, evidence-based change.

Use: CHAI 1.0 to 2.0.

Answer:

> The first instinct with CHAI was to make the chat better. That was a reasonable first step because the v1 assistant felt basic: the empty state, suggested prompts, answer layout, and thread experience all needed work.
>
> I improved those pieces, and they mattered. But they also made the limitation clearer. Even with a better chat panel, admins still had to know when to open it, what to ask, and how to connect the answer to the page they were using.
>
> So I changed the design direction. Instead of only improving the assistant destination, I started designing contextual entry points and Skills that helped CHAI show up where the admin already had context.

Short closer:

> The first solution improved usability. The second solution addressed the product behavior.

### 7. Tell me about influencing a roadmap or helping decide what to build next.

Moloco signal: senior IC autonomy, roadmap influence, product strategy.

Use: Control Hub Agentic.

Answer:

> After CHAI, the team needed a north star for what agentic AI could mean inside Control Hub. The ambiguity was high because "agentic" could mean anything from a smarter chat assistant to fully automated admin work.
>
> I framed the direction around control, not autonomy. The question became: if AI can plan and act, what contract is the admin approving? That led to a framework around intent, plan review, approval, execution, and Activity.
>
> I built a working prototype to make the direction concrete. It helped product, design, and engineering leadership react to real interaction states instead of abstract AI concepts, and it gave the team a clearer direction for demo and roadmap conversations.

Short closer:

> My contribution was turning a fuzzy future-state idea into product patterns the team could evaluate and build from.

### 8. Tell me about a time you used prototyping to align stakeholders.

Moloco signal: storytelling, prototyping, aligning complex concepts.

Use: Agentic React prototype.

Answer:

> For the agentic Control Hub work, static screens were not enough because trust depended on timing and state: when the agent thinks, when it asks for approval, how execution progresses, and where the audit trail appears.
>
> I built an interactive React prototype with Cursor, Codex, and Claude Code. It had a chat-to-workflow registry, input widgets, plan widgets, execution widgets, report widgets, and Activity states.
>
> That changed the conversation. Instead of debating agentic AI in abstract terms, stakeholders could experience the handoff from chat to plan to approval to execution. The feedback became much more specific, especially around where users needed control.

Short closer:

> The prototype made trust testable.

### 9. Tell me about a tradeoff you made in an AI product.

Moloco signal: ML product judgment, constraints, responsibility.

Use: Agentic control model.

Answer:

> In the agentic work, the obvious temptation was to make the AI look more autonomous. But in Control Hub, a more autonomous-feeling system is not automatically better. These are admin actions with real consequences.
>
> So I made a tradeoff toward visibility and approval. The agent could help compare settings, build plans, run checks, and prepare execution, but consequential actions needed a reviewable plan and a clear approval moment.
>
> That meant the UI sometimes felt slower than a fully automated demo. But it was more trustworthy. For example, deleting a virtual line required dependency review before action, because the admin needed to see connected auto attendants, queues, forwarding, users, and number ownership before approving.

Short closer:

> I would rather make an AI action slightly slower and legible than fast and hard to trust.

### 10. Tell me about working with cross-functional partners.

Moloco signal: PM/Engineering/Data collaboration.

Use: CHAI capability expansion or Reports.

Answer:

> CHAI required close partnership because the design was tied to what the assistant could actually use as context. Search, reports, analytics, and device troubleshooting all had different data sources and technical constraints.
>
> My role was to translate between user intent and system capability. With PM, I helped frame which user jobs mattered most. With engineering and data partners, I worked through what context could be passed, what the assistant could answer reliably, and where the UI needed to show scope or limitations.
>
> That is why the report pattern started scoped: one row-level report context first. As the system became more capable, the pattern expanded to Ask AI across reports and dashboards.

Short closer:

> The design improved because the product, technical, and data constraints were part of the interaction model from the beginning.

### 11. Tell me about contributing to a design system or scalable pattern.

Moloco signal: pattern maturity, product quality at scale.

Use: CHAI Skills / contextual AI patterns / Agentic widgets.

Answer:

> Both CHAI and Agentic pushed me to think in reusable patterns rather than one-off screens. For CHAI, the pattern was contextual AI entry points: search, reports, analytics, workspaces, and devices all needed slightly different context, but the same principle applied.
>
> For Agentic, the reusable pattern became widgets. Chat could capture intent, but structured work needed input widgets, plan widgets, execution widgets, and report widgets. Those patterns could live inline in chat or expand into a canvas when the decision needed more room.
>
> The design system work was not just visual consistency. It made the product easier to extend as AI capabilities matured.

Short closer:

> The pattern was successful because it helped the product scale without inventing a new interaction every time.

### 12. Tell me about a time you had to make a complex concept easy to understand.

Moloco signal: storytelling, executive communication, complex products.

Use: CHAI routing or Agentic trust contracts.

Answer:

> In CHAI, routing was a complex internal concept. Different requests needed different tools and context: search, reports, analytics, troubleshooting, or configuration questions. But users should not have to understand any of that.
>
> I turned the internal complexity into Skills. Instead of asking users to set context manually, CHAI showed capabilities in admin language. The welcome page, suggested prompts, and next steps changed based on the selected skill.
>
> That made a complex system easier to understand without flattening the underlying capability.

Short closer:

> I try to make complexity legible, not invisible. Users still need to understand enough to trust what is happening.

### 13. Tell me about a time you changed your mind based on feedback.

Moloco signal: humility, growth mindset, feedback.

Use: Agentic "Control Hub should still feel like Control Hub."

Answer:

> In the agentic prototype, one of the clearest pieces of feedback was that the experience could not feel like it was replacing Control Hub. People could see the value of the agent, but they still needed a familiar home base.
>
> That feedback sharpened the direction. I moved away from treating the AI surface like a new center of gravity and focused on making it additive to the existing product structure.
>
> That changed the story and the interaction model. The agent could plan and execute, but it still needed to live inside recognizable Control Hub surfaces, with Activity as the place where work and audit stayed visible.

Short closer:

> The feedback helped me make the concept more useful and less theatrical.

### 14. Tell me about a failure or a project that did not go as planned.

Moloco signal: accountability, learning, humility.

Use: CHAI v1 adoption, framed carefully.

Answer:

> I would not call CHAI v1 a failure, but the first launch showed that the product model was incomplete. The assistant could answer questions, yet adoption was low. Most admins tried it once and did not come back.
>
> The learning was that correctness is not enough in enterprise software. If the user has to leave their workflow, figure out the right prompt, and reconnect the answer to their task, the assistant is still too much work.
>
> I used that as the turning point for the next phase: better chat, then Skills, then contextual entry points across search, reports, dashboards, and devices.

Short closer:

> The mistake would have been treating low adoption as a UI polish problem. The real issue was workflow fit.

### 15. Tell me about how you use AI in your design practice.

Moloco signal: AI fluency, modern design workflow.

Use: Agentic prototype and portfolio-building practice.

Answer:

> I use AI mostly to increase the fidelity and speed of exploration, not to replace product judgment. In the agentic Control Hub project, I used Cursor, Codex, and Claude Code to build a working React prototype so we could test interaction states, handoffs, and timing.
>
> That let me move faster than static design alone. But I was still making the product decisions: what the agent should expose, when approval was required, how Activity should work, and where the UI needed restraint.
>
> I also use AI as a design partner for generating alternatives, checking edge cases, and turning a concept into something people can actually try.

Short closer:

> My rule is that AI can accelerate making and testing, but it cannot own the judgment.

Important interview note:

> Moloco's policy says not to use AI assistance during interviews unless a round explicitly allows it. This prep is for practice before the interview, not live use.

### 16. Tell me about mentoring or strengthening design culture.

Moloco signal: mentoring, team culture.

Use this only if it is true. Best angle: sharing AI-assisted prototyping workflow / reusable patterns.

Answer:

> One way I have contributed to design culture is by making new workflows easier for other designers to try. With the agentic prototype work, I was not just producing screens. I was also showing how AI-assisted prototyping could help designers test richer interaction ideas faster.
>
> I shared the workflow, the prototype structure, and the reasoning behind it: when to use code, how to keep product judgment in the designer's hands, and how to make prototypes useful for PM and engineering conversations.
>
> The goal was not to make everyone use the same tools. It was to raise the team's confidence around prototyping complex AI interactions.

Short closer:

> For me, design culture improves when people can see a practical path to doing better work, not just hear a principle.

### 17. Tell me about staying productive when priorities shift.

Moloco signal: ownership, ambiguity, shifting priorities.

Use: CHAI roadmap from help bot to Find / Understand / Fix.

Answer:

> CHAI shifted from a basic help assistant into a broader roadmap around finding, understanding, and eventually fixing issues. That kind of shift can easily turn into a pile of features.
>
> I kept the work anchored around the user job and the routing problem. Each new capability needed different context, but the user should not have to manage that complexity.
>
> That framing helped me evaluate new ideas: does this make CHAI more useful in a real admin workflow, and does the entry point carry the right context?

Short closer:

> When priorities shift, I try to preserve the decision framework so the work can adapt without becoming scattered.

### 18. Tell me about a time you advocated for a new bet.

Moloco signal: pushing product forward, intelligent risk.

Use: Contextual AI or Agentic prototype.

Answer:

> A new bet I advocated for was moving CHAI beyond the global assistant model. The safe path would have been to keep improving chat. But the evidence suggested that the bigger opportunity was putting AI into existing admin workflows.
>
> I explored entry points in search, reports, dashboards, workspaces, and devices. That helped the team see CHAI as a contextual layer across Control Hub, not a chatbot destination.
>
> It was a bet because it touched more surfaces and required stronger technical coordination. But it created more durable product value because it matched where admins already worked.

Short closer:

> The bet was not "more AI." It was putting AI closer to the user's decision moment.

## Questions That May Come From Moloco's Domain

### How would this experience translate to commerce media or ad platforms?

Use this as a bridge, not a fake domain claim.

Answer:

> The domain is different, but the design problem feels related. Commerce media has dense workflows, multiple users, performance data, recommendations, and high business consequences. The design challenge is helping people understand what the system is optimizing, what action is being recommended, and what tradeoff they are making.
>
> That is similar to what I worked on in Control Hub. CHAI was about putting intelligence inside the workflow. Agentic was about making action reviewable. For Moloco, I would bring that same approach to campaign management, retailer admin tools, and reporting: make the data legible, make recommendations explainable, and make action safe.

### How do you balance advertiser performance and retailer/user experience?

Answer:

> I would start by making the tradeoff visible instead of hiding it. In Control Hub, a lot of design work was about showing context, scope, and consequence before action. I think the same applies here. If a workflow affects advertiser outcomes and retailer experience, the interface should help users understand the levers, constraints, and likely impact before they commit.
>
> I would want to partner closely with PM, Engineering, and Data to understand the model behavior, the success metrics, and the failure modes. Then the design work is translating that into workflows people can operate confidently.

### What would you want to learn first if you joined?

Answer:

> I would want to understand three things. First, the user ecosystem: retailers, marketplaces, merchants, advertisers, and internal operators. Second, the key workflows where users make high-value decisions, like campaign setup, optimization, budget, reporting, or inventory. Third, the data and model constraints behind those workflows, because the design needs to make the system's recommendations usable and trustworthy.
>
> After that, I would look for one workflow where better clarity could create measurable value quickly.

## Questions To Ask The Hiring Manager

- What are the highest-friction workflows in Commerce Media today: campaign setup, reporting, optimization, retailer admin, or something else?
- Where does the team most need senior design leverage right now: product strategy, interaction craft, design systems, or execution velocity?
- How do PM, Engineering, Data, and Design currently work together when the product behavior depends on model outputs?
- What are the business outcomes design is most directly tied to for this team?
- Where is the product still ambiguous enough that design can help decide what to build next?
- How mature is the design system for Commerce Media, and where does it need to evolve?

## Final Positioning

If you only remember one thread for the interview:

> My strongest fit is designing complex, data-heavy AI workflows where users need to understand the system well enough to take action. CHAI shows how I turned a low-adoption assistant into contextual product value. Agentic shows how I think about the next stage: making AI action reviewable, bounded, and accountable.
