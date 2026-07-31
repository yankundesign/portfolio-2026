# Fluidstack Cross-Functional / Behavioral Interview Prep

Interviewer: Jeff Balkanski  
Round: Work ethic, values, interpersonal skills, mission, and culture  
Style: Direct, analytical, fast-paced, one-on-one conversation

## What This Round Is Really Testing

Jeff is likely evaluating whether he would trust you as the design partner on a fast-moving infrastructure problem.

He is not only checking whether you can tell polished stories. He is checking:

- Do you identify the real problem without waiting for perfect requirements?
- Can you explain your own decision and contribution precisely?
- Can you move quickly while protecting the risks that matter?
- Can you work with engineers and infrastructure experts without oversimplifying their domain?
- Can you disagree directly, use evidence, and commit after the decision?
- Do you care about customer and team outcomes more than defending your design?
- Can you operate in a high-intensity environment without creating confusion or rework?

## Jeff's Likely Lens

Based on the profile provided:

- He currently works in AI infrastructure at Fluidstack and describes the work as "building big clusters."
- He previously moved from software engineering into senior product management at Crusoe.
- Public profile summaries connect his prior product work to data-center infrastructure management.
- He has a computer-science background.

What this means for the conversation:

- Lead with the answer, not the design-process setup.
- Expect follow-ups such as "Why?", "What did you personally do?", "What changed?", and "How do you know?"
- Explain technical constraints as product inputs, not obstacles created by engineering.
- Be specific about system state, dependencies, tradeoffs, and outcomes.
- Do not use broad claims such as "I simplified complexity" without naming the decision that became easier.

## Your Core Positioning

> I work best on complex operational products where the answer is not obvious. I learn the system with experts, make the user and technical tradeoffs concrete, and stay accountable through implementation and outcome.

The three signals to repeat:

- I move toward ambiguity and create a decision model.
- I use prototypes to shorten the path from debate to evidence.
- I protect customer trust while adapting the solution to technical reality.

## What "Be A Barrel" Means Here

The referenced article makes a sharper distinction than "take initiative."

- **Ammunition:** A strong person who executes important work when the problem and direction are already defined.
- **Barrel:** A person who can identify and understand the problem, choose a direction, create momentum, bring in the right people, ship, and evaluate the result.

The article's complete loop is:

> Understand → Ideate → Take initiative → Recruit others → Deliver results

For this interview, a barrel is not a lone hero and does not ignore safety, permissions, or other people's expertise.

A strong barrel answer needs to show:

- A sound mental model of the customer and system.
- A problem or opportunity you did not wait to have fully specified.
- A concrete first move, usually evidence or a proof of concept.
- How you recruited or aligned the people needed to move it.
- A shipped or decision-changing outcome.
- How you evaluated the result and edited the direction yourself.

Avoid using Agentic as your only barrel proof. It strongly demonstrates initiative and proof-of-concept speed, but CHAI is the better primary example because it reached shipped, measurable results.

## How To Answer In A Fast-Paced Conversation

Use this 45- to 75-second shape:

1. **Headline:** Answer the question in one sentence.
2. **Situation:** Give only the context required to understand the stakes.
3. **Action:** Name what you personally decided, made, or changed.
4. **Result:** Give the outcome or what the team learned.
5. **Reflection:** End with one sentence about how it changed your behavior.

Example opening:

> "Yes. A good example is a navigation redesign at SAP where I moved too quickly because I trusted an existing design-system component without researching the users' mental model first."

Do not spend 45 seconds introducing Control Hub before answering the question.

## Values-To-Story Map

| Fluidstack principle | Primary story | Backup story | Line to land |
|---|---|---|---|
| Give a shit | CHAI adoption turnaround | TAC troubleshooting research | "A technically correct answer was not enough if the admin still could not finish the job." |
| Move at the speed of light | Agentic React prototype | AI-assisted portfolio/prototyping workflow | "I built the uncertain behavior first, so the team could learn before the whole direction was polished." |
| Reason from first principles | CHAI: chat problem to workflow problem | SAP: UI5 component rebuild to role-based dashboard | "I separated the visible request from the decision the user was actually trying to make." |
| Be a barrel | CHAI from low adoption to shipped contextual model | Agentic prototype or internal Figma plugin | "I built the mental model, brought the right people into it, shipped the direction, and evaluated the outcome." |
| Raise the bar | CHAI widget and interaction framework | Implementation/browser review | "The next team should not have to rediscover the same state and trust decisions." |
| Build the cathedral | Agent Activity and audit-log compromise | Sharing AI-assisted prototyping methods | "I protected the customer need while strengthening the platform the team already shared." |

## Your Core Story Bank

### 1. CHAI adoption turnaround

Use for:

- Customer ownership.
- Failure and learning.
- First-principles reasoning.
- Influence without authority.
- Measurable outcome.

Spine:

- CHAI could answer questions, but adoption was around 3%.
- You initially explored improving the assistant itself.
- Observation and research showed that admins were not trying to become better at prompting.
- Their jobs were to find information, understand data, and fix issues inside Control Hub.
- You changed the model from a separate assistant destination to contextual help inside search, reports, dashboards, and devices.
- Adoption moved from 3% to 18%.
- Smart Search reduced dead-end searches by 86%.

### 2. CHAI troubleshooting: build a diagnostic case

Use for:

- Designing a complex system or workflow.
- Systems thinking.
- Learning from technical experts.
- Turning fragmented operational data into decision support.
- Designing trustworthy AI outputs.

Spine:

- Troubleshooting in Control Hub was fragmented across multiple surfaces, including health data, meeting or calling details, device signals, logs, and support knowledge.
- Admins had to gather the signals themselves and determine which details were relevant before they could form a diagnosis.
- You partnered with a researcher and Cisco Technical Assistance Center experts to study real troubleshooting patterns, where experts lost time, and how diagnostic paths changed by scope and issue type.
- Before designing the interface, you mapped the diagnostic logic: affected scope, product area, signal pattern, issue type, evidence needed, and possible outcome.
- That changed the concept from a chatbot producing a root-cause answer into a decision-support system that built a reviewable case.
- You designed structured evidence for the timeline, affected scope, sources and freshness, supporting and conflicting signals, likely explanation, assumptions or gaps, and the next action.
- The case could become a shareable troubleshooting report so another admin or TAC expert could continue without reconstructing the investigation.

One-line takeaway:

> I did not remove the complexity. I organized the expert reasoning so the admin could inspect the evidence, understand the conclusion, and decide what to do next.

Be precise:

- Present the troubleshooting interaction model, evidence widgets, and shareable report as directional unless their shipped or validated status is confirmed.
- Do not attribute CHAI's broader adoption metrics to the troubleshooting concept.

### 3. Agentic React prototype

Use for:

- Speed.
- Ambiguity.
- Independent ownership.
- Working with engineering.
- Raising the quality of decisions.

Spine:

- "Agentic" was too abstract and could mean anything from better chat to autonomous action.
- Static screens hid the hard questions: timing, handoff, approval, execution, interruption, and audit.
- You defined the workflow: intent → context → plan → permission → execution → Activity → audit or rollback.
- You built a working React prototype using AI coding tools.
- Product, design, and engineering could react to actual behavior rather than an abstract concept.
- The prototype aligned stakeholders around a concrete direction and supported buy-in for a Cisco Live US 2026 demonstration.

Be precise:

- This is directional prototype work, not a shipped adoption-metric story.

### 4. Agent Activity versus the existing audit log

Use for:

- Product disagreement.
- Engineering constraints.
- Compromise.
- Team over ego.
- Platform thinking.

Spine:

- You proposed a detailed Activity experience for agent plans, approvals, touched resources, execution, and outcomes.
- The PM wanted to preserve the existing Control Hub audit log rather than create a parallel system.
- You agreed that a second audit system would fragment the platform, but the existing event detail was insufficient for agent actions.
- You worked with engineering to identify which details could be captured.
- The compromise was a new agent-event type inside the existing audit system with expanded details.
- Both sides changed: you preserved platform coherence; the PM accepted the need for deeper transparency.

### 5. SAP UI5 homepage rebuild to role-based dashboard templates

Use for:

- First-principles thinking.
- Discovering an opportunity beyond the assigned implementation work.
- Customer evidence.
- Influencing PM and engineering.
- Scalable system design.

Spine:

- The project began as rebuilding the homepage UI components with the SAP UI5 framework.
- While studying what the new components needed to support, you discovered that the larger problem was not only component modernization.
- Different roles entered the homepage with different responsibilities, information needs, and actions.
- You mapped four personas to their highest-priority jobs.
- You proposed role-based dashboard templates with visible work items, worker signals, and in-place actions.
- The templates used the new reusable UI5 components, so the idea expanded the customer value without abandoning the original implementation goal.
- The modular homepage framework was adopted by more than 1,000 enterprise customers.

### 6. AI-generated Reports initiative

Use for:

- Agency and identifying an unassigned opportunity.
- Technical product initiative.
- First-principles workflow redesign.
- Making an AI idea concrete.

Spine:

- The existing report flow required admins to configure a report, generate it, inspect the output, and then ask CHAI to help interpret it.
- You identified an opportunity to reverse the sequence: begin with the question or outcome the admin needed.
- You proposed an AI-generated Reports concept where CHAI translated natural-language intent into a structured report.
- The design kept the metrics, dimensions, filters, assumptions, and schedule visible so the admin could review and edit the report before generating it.
- You turned the opportunity into a concrete interaction model the team could evaluate instead of waiting for a fully specified roadmap request.

Be precise:

- Present this as a proposed initiative and evidence of agency unless its later shipping status is confirmed.
- Do not connect this concept to CHAI's adoption metrics.

### 7. CHAI: `@Add context` to a Skills-based model

Use for:

- Disagreement with engineering.
- Responding to sunk implementation cost.
- Research and customer evidence.
- Finding a resource-conscious compromise.
- Translating technical concepts into user language.

Spine:

- The original design used `@Add context` so users could tell CHAI which product context or data source to use.
- After implementation began, you saw that the concept was confusing and proposed changing it.
- Engineering initially pushed back because the existing design had already been implemented and the team had limited capacity.
- You researched the issue, spoke with users, and brought back evidence that people did not understand what "context" meant or what CHAI could help them do.
- You redesigned the experience as Skills: user-facing capabilities described in clear admin language.
- You deliberately reused already-built components where possible, limiting the amount of engineering work that had to be discarded.
- The engineering team agreed to the new direction because the evidence was clear and the revised design respected the implementation constraint.

One-line takeaway:

> I did not ask engineering to throw away the implementation. I used customer evidence to justify the change, then redesigned it so we could reuse what had already been built.

### 8. Technical limitation: one-report context

Use for:

- Engineering partnership.
- Pragmatic scope.
- Shipping an honest first version.
- Evolving a system over time.

Spine:

- The desired experience was for CHAI to analyze reports and dashboards.
- Initially, the system could reliably pass only one report as context.
- You did not design a broad analysis experience that the system could not support.
- You placed the entry point on the report row, making the data scope explicit.
- As the technical capability improved, the pattern expanded to report-page and dashboard analysis.
- The user contract stayed consistent: always make the data scope clear.

### 9. Feedback: Control Hub should still feel like Control Hub

Use for:

- Receiving hard feedback.
- Changing your mind.
- Humility.
- Product restraint.

Spine:

- The early agentic direction risked making AI a new center of gravity.
- Feedback showed that admins valued the agent but still needed a familiar Control Hub home base.
- You changed the concept from an AI surface replacing the product to AI working inside recognizable product surfaces.
- Chat handled intent; durable workflow and Activity surfaces preserved plans, execution, and history.
- The concept became more useful and less theatrical.

### 10. SAP navigation redesign failure

Use for:

- A real mistake.
- Accountability.
- Learning not to confuse design-system compliance with user validation.
- Enterprise change management.

Spine:

- At SAP, you redesigned the application navigation from horizontal navigation to vertical navigation as the product placed more emphasis on dashboard experiences across application areas.
- You reused an established SAP design-system component and assumed that made the direction safe.
- You did not do enough research into the existing user mental model or how people located features in the product.
- After launch, enterprise users gave strong negative feedback and said they could no longer find the things they relied on.
- You learned that a validated component does not validate a major behavioral or information-architecture change.
- If doing it again, you would study navigation behavior first, use mental-model research and card sorting, test the new structure with realistic tasks, and introduce the change more deliberately.

### 11. AI assistant widget to AI-first Overview

Use for:

- Disagreement with a PM.
- Accepting valid pushback.
- Knowing when an idea is too early.
- Reframing an idea when the product conditions change.
- Balancing discovery, capability, familiarity, and trust.

Spine:

- You initially proposed adding an AI assistant widget to the Control Hub Overview page to improve discovery and adoption.
- The PM pushed back that the widget did not introduce a new capability or help users complete a different job; it was mainly another entry point into the existing assistant.
- You accepted that the proposal improved visibility without creating enough new user value and paused the idea.
- Later, the agentic project expanded what the AI experience could do through proactive insights, planning, workflows, approval, execution, and Activity.
- That changed the premise. It was now a meaningful moment to reintroduce AI on the Overview page as part of a broader product experience.
- You transformed the original widget into an AI-first Overview that preserved the useful parts of the existing Overview while surfacing the system's expanded capabilities and agentic workflows.
- The new direction was not simply a larger AI entry point. It helped reposition the AI experience, show users what had changed, and build trust without making Control Hub feel unfamiliar.

One-line takeaway:

> The PM was right that discovery alone was not enough. I brought the idea back when the product had enough new value to justify a new Overview experience.

Be precise:

- Present the AI-first Overview as part of the directional Agentic work unless its shipped or validated status is confirmed.
- Do not claim that it increased adoption without separate evidence.

## Tailored Q&A

Prioritize the six values questions plus disagreement, failure, difficult feedback, and technical-domain learning. Treat the rest as backups; do not try to memorize every script.

- **Q: What kind of environment brings out your best work?**
  - **Testing:** High-intensity culture fit.
  - **Answer to say:**
    - "I do my best work when the goal is important, ownership is clear, and people can be direct with each other."
    - "I like short feedback loops and I do not need every requirement resolved before I start."
    - "When the problem is ambiguous, I make the assumptions visible and build the riskiest part early."
    - "I also communicate decisions and dependencies clearly, because speed falls apart when the team is moving quickly in different directions."
    - "The environment I want is high trust, high standards, and low ego."

- **Q: Why does Fluidstack's mission matter to you?**
  - **Testing:** Genuine mission fit and personal motivation.
  - **Answer to say:**
    - "I believe AI will become a foundational layer across nearly every industry, and many of today's products and experiences will be rebuilt around it."
    - "Fluidstack is building the infrastructure that makes that possible, giving teams the compute they need to turn ambitious ideas into products people can actually use."
    - "That matters to me because I love building tools that empower other people to do more."
    - "As a designer, I want to make this incredibly complex infrastructure feel tangible, trustworthy, and even delightful to use."
    - "Contributing at that scale while learning from such a technically ambitious team is exactly where I want to be."

- **Q: What is your superpower?**
  - **Testing:** Distinctive strength and how it creates value.
  - **Answer to say:**
    - "My superpower is making complex, abstract systems concrete."
    - "I can zoom out to understand the workflows, dependencies, and larger product model, then zoom in to design the detailed interaction."
    - "I use design craft and working prototypes to make an idea understandable and testable, not just something people discuss in the abstract."
    - "That helps users understand complicated systems and helps product and engineering teams align and move faster."
  - **If they want the short version:** "My superpower is turning complex systems into clear, tangible experiences people can understand, test, and build."

- **Q: Tell me about a time you gave a shit about the customer outcome beyond your assigned task.**
  - **Testing:** Customer ownership.
  - **Answer to say:**
    - "After CHAI launched, it could provide technically reasonable answers, but adoption was only around 3%."
    - "It would have been easy to keep polishing the assistant UI and call the feature complete."
    - "I looked at the full admin workflow and found that users still had to leave their task, open CHAI, invent a prompt, and reconnect the answer to their work."
    - "I drove the shift toward contextual entry points inside search, reports, dashboards, and device workflows."
    - "Adoption grew from 3% to 18%, and Smart Search reduced dead-end searches by 86%."
  - **If they push:** "The deeper lesson was that technical correctness is not the same as customer success."

- **Q: Tell me about a time you moved extremely fast.**
  - **Testing:** Urgency with judgment.
  - **Answer to say:**
    - "For the Control Hub Agentic direction, the biggest uncertainty was the behavior between intent, plan, approval, execution, and audit."
    - "I did not wait to polish the entire concept in Figma."
    - "I used AI coding tools to build the critical flow as a React prototype, including persistent plans and execution states."
    - "That let product and engineering react to real timing and handoffs much earlier."
    - "The speed came from building the uncertain part first, not from skipping the difficult states."
  - **If they push:** Be ready to name one thing the prototype changed: chat versus persistent workflow, the level of plan detail, or Activity as the durable record.

- **Q: How do you decide when to move fast and when to slow down?**
  - **Testing:** Judgment in high-consequence infrastructure.
  - **Answer to say:**
    - "I move fastest on decisions that are reversible and cheap to observe."
    - "I slow down when an action is destructive, permissions are unclear, recovery is difficult, or the user cannot inspect what changed."
    - "For the agentic work, visual details were easy to iterate, but approval, dependency review, and audit behavior needed more rigor."
    - "I still make progress by isolating the risky assumption and testing it early."
    - "Urgency should reduce waiting, not remove accountability."

- **Q: Tell me about a time you reasoned from first principles.**
  - **Testing:** Ability to challenge the requested solution.
  - **Answer to say:**
    - "CHAI had low adoption, and the surface-level answer was to make the chat better."
    - "I broke the problem down into when admins needed help, what context they already had, and what job they were trying to finish."
    - "The real jobs were finding information, understanding data, and fixing issues—not having a conversation with AI."
    - "That led us to embed assistance inside existing workflows rather than keep optimizing a separate destination."
    - "For me, first-principles reasoning means testing the causal assumption underneath the requested screen."

- **Q: Tell me about a time you found a larger opportunity inside an assigned project.**
  - **Testing:** Discovery, product judgment, and initiative.
  - **Answer to say:**
    - "At SAP, the project began as rebuilding the homepage UI components with the UI5 framework."
    - "While working through the components, I saw that different roles needed very different information and actions when they entered the product."
    - "I researched those needs and mapped four personas to their highest-priority jobs."
    - "I proposed role-based dashboard templates built from the new reusable components, with visible work items, worker signals, and in-place actions."
    - "The idea expanded the customer value of the rebuild, and the modular homepage framework was adopted by more than 1,000 enterprise customers."
  - **If they push:** "I did not abandon the component-rebuild goal. I used it as the foundation for a stronger default experience."

- **Q: Tell me about a technical or product initiative you started yourself.**
  - **Testing:** Agency before a formal roadmap request.
  - **Answer to say:**
    - "One initiative I started was the AI-generated Reports concept for CHAI."
    - "I noticed that admins had to manually configure and generate a report before they could ask CHAI to help them understand it."
    - "I proposed reversing the workflow so they could begin with the question or outcome they needed."
    - "I designed CHAI to translate that request into a structured report, while keeping the metrics, dimensions, filters, assumptions, and schedule visible for review."
    - "I turned the opportunity into a concrete product concept the team could evaluate instead of waiting for a formal roadmap request."
  - **If they push on outcome:** "This was a proposed product direction, not a shipped metrics story. The evidence of agency is that I identified the opportunity and made it concrete enough for product and engineering discussion."

- **Q: Tell me about a time you acted as a barrel.**
  - **Testing:** Full-loop ownership from problem selection through measured result.
  - **Answer to say:**
    - "CHAI is my strongest example because I owned the loop from understanding a weak outcome through changing the product model and measuring the result."
    - "After launch, adoption was around 3%. I did not wait for a detailed redesign brief; I studied where admins needed help and reframed the work around finding information, understanding data, and fixing issues."
    - "I brought PM, research, engineering, data partners, and technical experts into a shared model, then used prototypes to make contextual entry points concrete."
    - "We shipped the assistant into search, reports, dashboards, and device workflows instead of treating it as a separate destination."
    - "Adoption moved from 3% to 18%, and the search work reduced dead ends by 86%. I continued using those results to refine where CHAI should appear next."
  - **If they push on individual versus team ownership:** "Being the barrel did not mean doing every part myself. It meant owning the problem, plan, alignment, and result while bringing in the expertise required to ship it."

- **Q: What is something important that would not have happened without you?**
  - **Testing:** Individual initiative without inflated ownership.
  - **Answer to say:**
    - "At SAP, the original homepage project was focused on rebuilding UI components with the UI5 framework."
    - "While working on it, I discovered that different user roles needed very different information and actions from the homepage."
    - "I researched those needs, mapped four personas to their main jobs, and proposed role-based dashboard templates built from the new components."
    - "That changed the project from a component migration into a stronger default experience for each role."
    - "The framework was eventually adopted by more than 1,000 enterprise customers, and that role-based direction is the part I can say would not have happened in the same way without me."
  - **If they push on team ownership:** "The implementation was cross-functional, but identifying the opportunity, framing the role-based model, and turning it into a concrete direction were my contributions."

- **Q: Tell me about a disagreement with product or engineering.**
  - **Testing:** Directness, evidence, and commitment after disagreement.
  - **Answer to say:**
    - "An early CHAI design used `@Add context` so users could tell the system which context or data source to use."
    - "After engineering had already implemented it, I found that users did not understand the context concept and proposed changing the model."
    - "The engineers initially pushed back because they had already built the design and did not have much capacity to redo it."
    - "I spoke with users and brought the team evidence that the language was confusing and did not tell people what CHAI could actually help them do."
    - "I redesigned it as Skills, using clear capability language and reusing as many of the implemented components as possible."
    - "Engineering agreed because the change was supported by customer evidence and the revised design limited the amount of work we had to discard."
  - **If they push:** "I did not win by repeating that the experience was confusing. I made the evidence concrete and changed my own proposal to respect the engineering investment."

- **Q: Tell me about a disagreement with a PM.**
  - **Testing:** Product judgment, openness to pushback, and knowing when to revisit an idea.
  - **Answer to say:**
    - "I initially proposed an AI assistant widget on the Control Hub Overview page because I believed better discovery could increase usage."
    - "The PM pushed back that it did not add a new capability or help users complete a different job; it was mainly another entry point into the existing assistant."
    - "I agreed that visibility alone was not enough, so I paused the idea instead of continuing to push the same solution."
    - "When we later designed the agentic experience, the AI had much more to offer through insights, planning, workflows, execution, and Activity."
    - "I brought the idea back in a different form: an AI-first Overview that preserved the existing Overview experience while introducing the expanded AI capabilities."
    - "The disagreement improved the idea because we waited until the product value was strong enough to justify changing such an important surface."
  - **If they ask who was right:** "The PM was right about the original widget. The later direction worked because the product conditions changed, not because I kept arguing for the same solution."

- **Q: What do you do when engineering says your design cannot be built on the timeline?**
  - **Testing:** Pragmatism and respect for technical reality.
  - **Answer to say:**
    - "I first ask which part is expensive: data availability, system behavior, architecture, or only presentation."
    - "Then I protect the user contract and look for a smaller implementation that is still honest."
    - "For report analysis, CHAI could initially use only one report as context, so I placed the entry point directly on that report row."
    - "The first version made the scope explicit instead of pretending the assistant understood the full dashboard."
    - "As the capability improved, we expanded the same pattern to broader report and dashboard analysis."

- **Q: Tell me about a time you failed or got something wrong.**
  - **Testing:** Accountability rather than polished resilience.
  - **Answer to say:**
    - "At SAP, I redesigned the application navigation from horizontal to vertical as we moved toward more dashboard-based experiences."
    - "I reused an established component from the SAP design system and assumed it would be safe, but I did not research the existing navigation behavior deeply enough."
    - "After launch, we received a lot of negative feedback from enterprise users who could no longer find the things they relied on."
    - "I learned that using a validated component does not validate a major change to people's mental model."
    - "If I did it again, I would research how users group and locate features, use card sorting and task-based testing, and introduce the navigation change more deliberately."
  - **If they push:** "The mistake was mine: I treated design-system consistency as a substitute for validating a large behavior change."

- **Q: Tell me about difficult feedback that changed your work.**
  - **Testing:** Humility and speed of adaptation.
  - **Answer to say:**
    - "The clearest feedback on the agentic prototype was that it could not feel like AI was replacing Control Hub."
    - "My early direction gave the AI surface too much gravity because I was trying to make the new model legible."
    - "The feedback showed that users still needed a familiar operational home base."
    - "I changed the model so conversation handled intent, while plans, execution, and history stayed inside recognizable Control Hub structures."
    - "The direction became more useful and less theatrical."

- **Q: How do you design for a complex system or workflow?**
  - **Testing:** Systems thinking, technical-user respect, and ability to make complexity operable.
  - **Answer to say:**
    - "I start by understanding the users, their goals, and the decisions they need to make."
    - "Then I map the full system: inputs, outputs, dependencies, permissions, handoffs, and technical constraints."
    - "I break the workflow into key states and decision points, including the happy path, exceptions, failures, and recovery."
    - "I separate complexity the user must understand from complexity the product can handle for them."
    - "I work with users, PM, and engineering early to validate the model before investing heavily in screens."
    - "Then I prototype the highest-risk parts with realistic data, test them, and refine both the workflow and the reusable interaction patterns."
  - **If they push:** "I do not start by simplifying screens. I start by understanding the system and deciding which complexity must remain visible."

- **Q: Give me an example of how you designed for a complex system or workflow.**
  - **Testing:** Applying systems thinking to a real technical workflow.
  - **Answer to say:**
    - "For CHAI troubleshooting, admins had to connect health data, meeting or calling details, device signals, logs, and support knowledge across multiple surfaces."
    - "I worked with our researcher and TAC experts to study real cases and map how diagnosis changed by affected scope, signal pattern, product area, and issue type."
    - "Before designing the response, I modeled how the system should gather evidence, compare supporting and conflicting signals, and decide whether to explain, recommend an action, collect more evidence, or escalate."
    - "I designed the output as a reviewable case with a timeline, sources, freshness, affected scope, assumptions, uncertainty, and next steps—not just a root-cause answer."
    - "The case could become a shareable troubleshooting report so another admin or TAC expert could continue without reconstructing the investigation."
    - "My goal was to make the complex reasoning traceable and actionable, not hide the evidence users needed for a sound decision."
  - **If they push on outcome:** "This troubleshooting model was directional, so I would not connect it to CHAI's broader adoption metrics. Its concrete outcome was a system model and prototype direction for expert review and further validation."

- **Q: How do you work with someone who is more technically knowledgeable than you?**
  - **Testing:** Humility without passivity.
  - **Answer to say:**
    - "I do not try to compete with the domain expert on facts they know better."
    - "I ask them to walk me through a real decision, the signals they inspect, and what changes their conclusion."
    - "I turn that reasoning into a workflow or system model and bring it back for correction."
    - "For Control Hub troubleshooting, I worked with technical-assistance experts to map scope, evidence, configuration issues, and failure patterns."
    - "My contribution is making expert reasoning operable in the product while keeping the technical truth intact."

- **Q: How do you raise the bar without slowing everyone down?**
  - **Testing:** Quality as leverage rather than perfectionism.
  - **Answer to say:**
    - "I focus quality effort on decisions that repeat or affect trust."
    - "For CHAI and the agentic work, I turned one-off answers into reusable patterns for context, evidence, plans, approval, execution, and Activity."
    - "That takes more thought once, but it makes the next workflow faster and more consistent."
    - "I also review the implementation in the browser so gaps are resolved while the context is fresh."
    - "Raising the bar should reduce future rework, not create a ceremony around every screen."

- **Q: Tell me about a time you put the team's mission over your own idea.**
  - **Testing:** Build the cathedral.
  - **Answer to say:**
    - "The audit-log disagreement is a good example because my first solution was a separate, richer Activity experience."
    - "The PM's concern was valid: two audit systems would fragment a platform admins already understood."
    - "I stopped protecting the surface and focused on the actual customer need, which was enough detail to review agent actions."
    - "We extended the existing system with a richer agent-event model."
    - "The result was stronger because it served the trust requirement and the larger platform at the same time."

- **Q: How do you keep cross-functional partners accountable?**
  - **Testing:** Follow-through without formal authority.
  - **Answer to say:**
    - "I create clarity before I create pressure."
    - "After a decision, I make the owner, dependency, next step, and consequence of delay visible."
    - "I surface risk early and ask what is blocking progress instead of waiting until the deadline to escalate."
    - "I hold design to the same standard by stating exactly what I will deliver and when."
    - "Consistency and direct communication usually work better than late escalation."

- **Q: How do you get other people to support an idea you initiated?**
  - **Testing:** Whether you can recruit and motivate others instead of operating alone.
  - **Answer to say:**
    - "I start by making the problem useful to each partner, not by asking them to support a design idea."
    - "For CHAI, research cared about admin behavior, engineering and data partners cared about reliable context, and PM cared about adoption and scalable capability."
    - "I used one shared model and concrete prototypes so each group could see its expertise reflected in the direction."
    - "I gave partners specific decisions to shape rather than presenting a finished answer and asking for approval."
    - "People are more willing to help when their contribution changes the plan and the outcome is clear."

- **Q: When do you take action without permission, and when do you align first?**
  - **Testing:** Initiative without recklessness.
  - **Answer to say:**
    - "I act immediately when the step is reversible and helps the team learn, such as investigating data, mapping the workflow, or building a proof of concept."
    - "I align first when the action commits engineering capacity, changes customer behavior, crosses a security or permission boundary, or is difficult to reverse."
    - "For the agentic project, I did not need consensus to prototype the interaction model."
    - "But execution, approval, audit, and platform changes needed product and engineering agreement before becoming a build direction."
    - "I do not use autonomy as a reason to surprise people with consequential decisions."

- **Q: How have you become a resource other teammates seek out?**
  - **Testing:** Credibility and organizational leverage.
  - **Answer to say:**
    - "My strongest area is making ambiguous AI behavior concrete enough for design, product, and engineering to evaluate together."
    - "I built and shared an AI-assisted React prototyping workflow so other designers could test state, timing, and handoffs beyond static screens."
    - "I also created reusable interaction patterns for contextual answers, plans, approvals, execution, and Activity."
    - "The goal was not to make every project depend on me; it was to make the method and decisions reusable."
    - "I want people to seek me out for judgment while still leaving with tools they can use themselves."
  - **If they push for evidence:** Discuss the internal Figma plugin and prototype-sharing work only to the level you can support with concrete examples; do not invent an adoption number.

- **Q: Tell me about a time you pushed through adversity or organizational friction.**
  - **Testing:** Cross-product influence, persistence, and coordination.
  - **Answer to say:**
    - "I designed the AI settings for the Webex app inside Control Hub, which required close partnership with the Webex product team."
    - "Their requirements were very constrained and focused on Webex app goals, while I was responsible for the Control Hub admin experience and our platform standards."
    - "I pushed back on directions that would have made the settings confusing or inconsistent for administrators, and made the admin use cases and tradeoffs visible."
    - "I proposed alternatives that preserved a clear Control Hub experience while still meeting the Webex team's product goals."
    - "The partner team was based in Asia, so I kept decisions moving through clear async documentation, scheduled reviews across time zones, and explicit follow-ups."
    - "We aligned on a design both teams could support and gave admins a coherent way to configure Webex AI features."
  - **If they push:** "I was not pushing against the Webex team. I was pushing for a solution that met their goals without making admins absorb the organizational boundaries between our products."

- **Q: What do you do when priorities change suddenly?**
  - **Testing:** Adaptability without becoming reactive.
  - **Answer to say:**
    - "I return to the outcome and decision framework rather than protecting the original list of deliverables."
    - "I ask what new fact changed the priority, what now has the highest customer or business consequence, and what existing commitment moves."
    - "For CHAI, the roadmap expanded quickly, but I kept it organized around find, understand, and fix."
    - "That let us evaluate new ideas against a stable user model instead of collecting disconnected features."
    - "I communicate what is now, next, and no longer planned so the team moves together."

- **Q: How do you handle a teammate whose work does not meet the bar?**
  - **Testing:** Directness and team standards.
  - **Answer to say:**
    - "I address it early and make the gap specific."
    - "I connect the feedback to the user, system, or delivery consequence rather than saying the work simply is not good enough."
    - "I ask whether the problem is unclear expectations, missing context, time, or capability, then agree on the next revision and owner."
    - "If the risk remains, I make it visible to the appropriate lead instead of quietly compensating until the deadline."
    - "Direct feedback is respectful when it gives the person a real path to improve."

- **Q: What would your first 90 days look like?**
  - **Testing:** Speed to contribution.
  - **Answer to say:**
    - "First, I would learn the infrastructure lifecycle through real operator and engineer workflows, not only product documentation."
    - "I would map the major products, users, system states, and the highest-cost sources of delay or error."
    - "I would inspect the shipped front end and existing component patterns so I understand how design decisions become code."
    - "I would choose one bounded workflow where I could improve something real while building domain credibility."
    - "By 90 days, I would want the team to trust me to frame a technical problem, recommend a direction, and help carry it into the product."

## Pressure Follow-Ups Jeff May Use

For every story, rehearse these:

- What did you personally do?
- What did PM own?
- What did engineering own?
- What was the hardest technical constraint?
- What evidence changed your mind?
- What did you cut to move faster?
- What was the customer or business outcome?
- How did you measure it?
- Who disagreed, and why were they reasonable?
- What would you do differently now?
- Who did you recruit, and why did you need them?
- What did you do before anyone agreed with you?
- Did the work ship, or did it stop at a prototype?
- How did you evaluate the result after launch?
- Where did you edit your own direction without waiting for feedback?

If you cannot answer one, do not invent a detail. Say:

> "I do not remember the exact number, but the decision we used was..."

or:

> "That part was directional rather than shipped. The concrete outcome was alignment around the interaction model."

## Questions To Ask Jeff

Choose three or four.

1. "You moved from software engineering into product and infrastructure leadership. What makes a designer especially effective with your team?"
2. "Where do the current tools create the most operational friction for people building or running the clusters?"
3. "What would a designer need to understand about the cluster lifecycle before they could make a useful product decision?"
4. "Fluidstack values speed very explicitly. How does your team distinguish a decision that should happen tomorrow from one where infrastructure risk requires deeper validation?"
5. "Can you share a recent example where a product or design decision changed because an operator or engineer challenged the original assumption?"
6. "When product, engineering, and design disagree, what does a strong decision process look like here?"
7. "What would this designer need to accomplish in the first 90 days to earn credibility with the infrastructure team?"
8. "Which product or internal-tool problem feels most constrained by the team's current design capacity?"
9. "What is a behavior that succeeds at Fluidstack but might be uncomfortable for someone coming from a larger company?"
10. "When you describe someone at Fluidstack as a barrel, what have they actually done that earned that trust?"

Best three for Jeff:

- "What makes a designer especially effective with your team?"
- "Where do the current tools create the most operational friction?"
- "How do you distinguish tomorrow-fast from a decision requiring deeper infrastructure validation?"

## Language To Mirror

- Customer outcome.
- Ground truth.
- Reversible versus consequential decisions.
- Own from start to finish.
- Make the tradeoff explicit.
- Build the uncertain part first.
- System state and dependencies.
- Operator workflow.
- Reduce delay and rework.
- One shared platform.
- High standards, low ego.

## Avoid Saying

- "I thrive in chaos."
  - Say you create clarity and maintain momentum when priorities change.
- "I always put the user first."
  - Show how you balanced customer outcome, technical truth, and business urgency.
- "Engineering said it was impossible."
  - Explain the actual constraint and the smaller honest version you found together.
- "I convinced everyone."
  - Explain what evidence changed the decision and how your own view changed.
- "I am a perfectionist."
  - Explain where rigor matters and what you deliberately cut.
- "We increased adoption" without stating your role.
  - Say what you personally changed, then give the team outcome.
- "I designed the whole thing."
  - Separate your ownership from PM, research, domain experts, and engineering.
- "I am a barrel because I work independently."
  - Show the complete loop: mental model, initiative, recruited partners, delivery, and evaluation.
- "I did not ask for permission."
  - Explain which reversible step you took and where consequential decisions still required alignment.
- "I brought everyone along."
  - Name which people you needed, what expertise they contributed, and how the plan changed.
- "I love working long hours."
  - Show urgency, stamina, and commitment through your decisions and outcomes.
- "AI infrastructure is just another admin tool."
  - Be explicit that the domain is new and the learning method transfers.

## Lines To Remember

- "I stay accountable to the outcome, not the first solution."
- "The speed came from building the uncertain part first."
- "I try to disagree by reframing the problem, not by arguing taste."
- "Urgency should reduce waiting, not remove accountability."
- "My role is not to pretend I am the domain expert. It is to make expert reasoning operable in the product."
- "Being the barrel did not mean doing everything myself. It meant owning the problem, plan, alignment, and result."

## Ten-Minute Final Rehearsal

Practice these aloud, without reading:

1. Why Fluidstack's mission matters to you.
2. CHAI customer-outcome turnaround in 60 seconds.
3. CHAI troubleshooting and complex-system design in 60 seconds.
4. Agentic prototype and speed in 60 seconds.
5. `@Add context` to Skills engineering disagreement in 60 seconds.
6. AI assistant widget to AI-first Overview PM disagreement in 60 seconds.
7. SAP navigation failure in 60 seconds.
8. AI-generated Reports initiative in 45 seconds.
9. Difficult feedback in 45 seconds.
10. How you learn technical domains in 45 seconds.
11. When you move fast versus slow down in 45 seconds.
12. Your three questions for Jeff.

For the barrel story, make sure your rehearsal includes:

- The mental model you created.
- The first action you took.
- The people you needed and why.
- What shipped.
- How you evaluated the result.

## Sources

- Jeff Balkanski LinkedIn: https://www.linkedin.com/in/jeff-balkanski/
- Conor Dewey, Barrels and Ammunition: https://www.conordewey.com/blog/barrels-and-ammunition
- Fluidstack Product Designer role: https://fluidstack.io/jobs/00028e93-49c5-42f4-8cdc-9d864bf104cb
- Fluidstack technical interview prep: `presentation/fluidstack-technical-interview-prep.md`
- CHAI outline: `presentation/project-1-control-hub-ai-assistant-outline.md`
- Control Hub Agentic outline: `presentation/project-2-control-hub-agentic-outline.md`
