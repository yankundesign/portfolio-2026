# Juniper Square Hiring Manager Interview — Likely Jason Questions

Interviewer: Jason Azares, Director of Product Design  
Role: Senior Product Designer  
Presentation: CHAI Report Analysis + Control Hub Agentic  
Companion files:

- `project-combined-chai-agentic-outline.md`
- `project-combined-key-design-decisions.md`

## How To Use This Document

- Do not memorize every answer word for word.
- Memorize the first sentence, two proof points, and the honest caveat.
- Most answers should take 30–60 seconds.
- When Jason asks about a screen, point to the visual while answering.
- Lead with the decision. Add process only when it explains why the decision changed.
- Keep shipped work, directional work, and next validation clearly separated.

## What Jason Is Likely Evaluating

Based on the role requirements, Jason’s public profile, and the interview context the recruiter shared with you, he is likely looking for evidence that you can:

- Own a complex product area end to end with limited direction.
- Make sophisticated enterprise data feel intuitive without flattening its meaning.
- Explain specific interaction decisions, alternatives, and tradeoffs.
- Work closely and credibly with PM and engineering.
- Use the right artifact for the decision: rough flows, Figma, coded prototypes, specifications, or production-ready references.
- Design trustworthy AI with clear scope, evidence, error states, permissions, and accountability.
- Create reusable product patterns and strengthen the design system instead of solving each screen independently.
- Maintain a high visual and interaction-craft bar in dense professional software.
- Receive feedback without ego and improve the direction.

These signals combine the [Senior Product Designer posting](https://jobs.ashbyhq.com/junipersquare/a5aec213-81c1-4e72-a583-bb4789735b0d/), [Jason’s public profile](https://www.linkedin.com/in/jasonazares), and the recruiter’s guidance about how he conducts portfolio conversations.

## Role Thesis

Juniper Square is not hiring only for someone who can design polished screens. The role needs an autonomous designer who can own a broad, data-heavy enterprise workflow, define scalable interaction patterns, partner deeply with PM and engineering, prototype with AI tools when useful, and ship trustworthy experiences.

Your presentation should prove:

```text
Complex data
-> clear user understanding
-> reviewable decision
-> controlled action
-> accountable record
```

That is particularly relevant to Juniper Square’s current platform direction: agents operate on connected private-markets data through the same permissions and audit model as human users. See [Headless GPX](https://www.junipersquare.com/gpx/headless) and [Juniper Square’s platform](https://www.junipersquare.com/).

---

# Opening And Story Framing

## 1. “Why did you combine these two projects into one story?”

- **Testing:** Story judgment and whether the projects form a real product evolution.
- **Likely trigger:** Your opening frame, “From context to control.”
- **Answer to say:**
  - “I combined them because they answer two stages of the same user problem.”
  - “Report Analysis helped admins understand complex data using visible context and evidence.”
  - “The Agentic work asked what had to change when AI moved from explaining to performing work.”
  - “The second project did not ship as a continuation of the report flow, so I keep the outcomes separate.”
  - “The shared lesson is that context makes an answer useful, while controls make an action trustworthy.”
- **If they push:** Explain that Report Analysis is the shipped foundation and Agentic is the directional interaction-model deep dive.

## 2. “What was your exact role across these projects?”

- **Testing:** Ownership, attribution, and senior-level scope.
- **Likely trigger:** Your introduction or any use of “we.”
- **Answer to say:**
  - “I led the interaction design and product-experience model for the work I’m showing.”
  - “I framed the user workflows, explored the entry and response patterns, and carried the designs through detailed states.”
  - “For Agentic, I also built the working React prototype so the team could evaluate behavior, not only static screens.”
  - “PM shaped priorities and platform constraints; engineering shaped data availability, model feasibility, execution, and event capture; research brought the user evidence.”
  - “I’ll call out individual and shared decisions as I go.”
- **If they push:** Name the specific decision you personally owned rather than repeating “design lead.”

## 3. “Who was the primary user?”

- **Testing:** Whether the work is grounded in real user behavior instead of a generic enterprise persona.
- **Likely trigger:** Frames 2 and 3.
- **Answer to say:**
  - “The research showed that ‘the admin’ was not one clean role.”
  - “Victor, the Collab Visionary, worked at the organizational level—planning, adoption, governance, and reporting.”
  - “Francis, the Firefighter, handled the operational reality—troubleshooting, devices, users, settings, and escalations.”
  - “They depended on each other: Victor needed decision-ready insight, while Francis needed enough context and control to execute safely.”
  - “That relationship became the throughline across reporting and Agentic workflows.”
- **If they push:** Note that the personas represent responsibility patterns, not fixed job titles or universal segments.

## 4. “How did the persona research actually change the design?”

- **Testing:** Whether research influenced decisions rather than decorating the presentation.
- **Likely trigger:** Frames 2, 3, or 13.
- **Answer to say:**
  - “It changed the problem from designing one assistant for one generic admin to supporting a handoff between strategy and operations.”
  - “For reporting, it showed why the person asking the question may not be the person generating and interpreting the report.”
  - “For Agentic work, it showed that Francis’s pain was not only repetitive clicking; it was coordination under interruption while remaining accountable for production.”
  - “That led me to preserve evidence for Victor and expose scope, dependencies, approval, and recovery for Francis.”
  - “It also kept me from treating automation as the goal by itself.”
- **If they push:** Cite the 171-admin survey and 34 interviews, while noting that the Firefighter task percentages were approximate.

## 5. “What was the hardest product problem here?”

- **Testing:** Prioritization and ability to identify the problem beneath the screens.
- **Likely trigger:** Early in the presentation.
- **Answer to say:**
  - “The hardest problem was deciding what the user needed to understand before trusting the AI.”
  - “In Reports, that meant making the data scope and evidence visible.”
  - “In Agentic workflows, it meant turning an incomplete request into a plan, approval boundary, observable execution, and record.”
  - “The difficult design work was not producing another chat surface.”
  - “It was defining the contract between user intent and system behavior.”

---

# Report Analysis Decisions

## 6. “Why did you start with the sparkle on each report row?”

- **Testing:** Technical constraint handling and interaction rationale.
- **Likely trigger:** Frames 4 and 5.
- **Answer to say:**
  - “The first version could reliably pass only one report as context.”
  - “Putting the action on the report row made that scope clear before the assistant opened.”
  - “A page-level or global entry would have implied broader understanding than the system could support.”
  - “The sparkle was additive, so existing report actions remained unchanged.”
  - “The tradeoff was discoverability, which became the next problem we addressed.”
- **If they push:** Explain that placement created the context contract; the icon alone did not create trust.

## 7. “Why a sparkle instead of the assistant icon or a text label?”

- **Testing:** Visual craft, brand judgment, and awareness of icon ambiguity.
- **Likely trigger:** Frame 5.
- **Answer to say:**
  - “An assistant or mascot icon made the action feel like a separate persona rather than a capability attached to Reports.”
  - “The sparkle was a more neutral signal for AI assistance.”
  - “We used the existing product blue instead of introducing a special AI color.”
  - “That protected brand consistency in a dense table.”
  - “The weakness was that sparkle icons can look decorative, so I would now test it against a labeled `Ask AI` treatment.”
- **If they push:** Acknowledge that the clearer answer may be a label or icon-plus-label, depending on table density and measured comprehension.

## 8. “How do you know the sparkle caused low adoption?”

- **Testing:** Analytical honesty and avoidance of false causality.
- **Likely trigger:** Your explanation of the page-level evolution.
- **Answer to say:**
  - “I would not claim the sparkle alone caused low adoption.”
  - “It was easy to miss, so discoverability was one plausible contributor.”
  - “Adoption could also be affected by relevance, response quality, latency, or trust.”
  - “The evidence I would want is the full funnel from eligible views to icon exposure, click, first question, and useful follow-up.”
  - “I present the page-level move as a discoverability and scalability decision, not a proven single-cause fix.”

## 9. “Why did the page entry launch the assistant instead of putting an input directly on the page?”

- **Testing:** Systems thinking, component reuse, and product restraint.
- **Likely trigger:** Frame 7.
- **Answer to say:**
  - “A direct input would reduce one click, but it would create another conversation entry component to build and maintain.”
  - “The assistant already handled state, loading, history, suggestions, errors, and follow-up questions.”
  - “Using a launcher kept those behaviors in one place.”
  - “It also gave us a scalable pattern for Reports, Analytics, and future contextual surfaces.”
  - “The tradeoff was an extra step, but the product system became more coherent.”

## 10. “How did you keep a page-level AI answer grounded?”

- **Testing:** Trust, explainability, and data-product judgment.
- **Likely trigger:** Frames 7 and 8.
- **Answer to say:**
  - “The broader entry could not make the data scope mysterious.”
  - “The experience needed to expose the reports, filters, dashboard state, and time range used.”
  - “The dashboard remained the source of truth; the assistant provided the first interpretation.”
  - “Users could compare the explanation with the underlying chart rather than accept a detached paragraph.”
  - “Missing, stale, unauthorized, and unsupported data also needed explicit states.”
- **If they push:** Separate guardrails confirmed in the shipped version from guardrails you would add now.

## 11. “Why generate a report instead of simply answering in chat?”

- **Testing:** Artifact choice and understanding of durable enterprise work.
- **Likely trigger:** Frames 9 and 10.
- **Answer to say:**
  - “Chat was useful for capturing intent, but the output needed to survive the conversation.”
  - “A report has a durable definition: metrics, dimensions, filters, time range, visualization, and schedule.”
  - “That structure makes the result inspectable, correctable, reusable, and shareable.”
  - “The hybrid model used natural language for speed and structured controls for precision.”
  - “The user still owned the report definition.”

## 12. “Why didn’t you implement direct manipulation of the generated report?”

- **Testing:** Scope discipline and honesty about incomplete work.
- **Likely trigger:** Frame 10.
- **Answer to say:**
  - “I explored selecting a report card or chart and chatting directly about that element.”
  - “It was promising because it connected the instruction to a visible object.”
  - “We did not have enough research to know whether users would discover and understand the selection-to-chat relationship.”
  - “I kept it out of the main direction instead of presenting an unvalidated interaction as solved.”
  - “I would next compare direct manipulation, structured controls, conversation, and a hybrid model.”

## 13. “What shipped, and what was only directional?”

- **Testing:** Credibility and accurate outcome attribution.
- **Likely trigger:** The transition from Report Analysis to Agentic.
- **Answer to say:**
  - “The contextual report-row, report-page, and dashboard patterns reached customers.”
  - “The broader CHAI product moved from 3% to 18% monthly adoption as it entered real workflows.”
  - “I do not attribute that result to Report Analysis alone.”
  - “AI-generated Reports were directional unless we confirm a later shipped status.”
  - “The Agentic system was a working prototype used to define and align on the interaction model.”

---

# Agentic Workflow Decisions

## 14. “Why did this need to be agentic instead of a better form or normal automation?”

- **Testing:** Whether AI is necessary for the problem.
- **Likely trigger:** Frame 13.
- **Answer to say:**
  - “A better form helps when the path and inputs are already known.”
  - “Traditional automation works well when the sequence is deterministic.”
  - “These admin jobs crossed data, devices, policies, permissions, and changing dependencies.”
  - “The agent could gather missing context, adapt a plan, coordinate capabilities, and stop for human judgment.”
  - “The value was reduced coordination work—not autonomy for its own sake.”

## 15. “Why did you define both Chat and Agents?”

- **Testing:** Information architecture and conceptual-model clarity.
- **Likely trigger:** Frame 14.
- **Answer to say:**
  - “They represent two ways work begins.”
  - “Chat is useful when the user knows the outcome but not the exact workflow.”
  - “Agents make established, repeatable capabilities discoverable and manageable.”
  - “Both hand off into the same plan, execution, and verification contracts.”
  - “Activity is not a third entry point; it is part of the trust strategy after and during action.”

## 16. “What does ‘intern to collaborator’ change in the product?”

- **Testing:** Ability to translate research into product strategy.
- **Likely trigger:** Frame 14 or 21.
- **Answer to say:**
  - “It means we should not begin by asking users to accept broad autonomy.”
  - “The first use cases should be bounded, useful, and easy to inspect.”
  - “The agent can begin by reading and recommending.”
  - “It can progress to building a plan, running a test, and acting after approval.”
  - “Broader responsibility should follow evidence that users understand, correct, and trust the workflow.”

## 17. “How did you choose the first agent use cases?”

- **Testing:** Product strategy, cross-functional prioritization, and technical realism.
- **Likely trigger:** Frame 21.
- **Answer to say:**
  - “Research identified the moments where admins genuinely wanted help.”
  - “I worked with PM to assess frequency, severity, and customer value.”
  - “With engineering, we evaluated task-level model performance, data availability, permissions, tool access, and verification feasibility.”
  - “Then we screened for consequence, reversibility, blast radius, and whether a meaningful approval boundary existed.”
  - “That favored useful but bounded starting points rather than the most theatrical autonomy demo.”
- **If they push:** Compare locations as an intern task, onboarding as collaboration, and deletion as a guardrail-defining high-risk case.

## 18. “What did engineering evaluate about model performance?”

- **Testing:** AI-product depth beyond interface design.
- **Likely trigger:** Frame 21.
- **Answer to say:**
  - “The important question was performance on the specific task, not a general model benchmark.”
  - “Could the system identify the required inputs and dependencies consistently?”
  - “Was the necessary data available, current, permissioned, and accessible?”
  - “Could the product actions be executed and the result verified?”
  - “Where performance was uncertain, the design needed clarification, review, or a blocker instead of silent execution.”
- **If they push:** Do not invent evaluation scores; explain the evaluation dimensions unless you have verified results.

## 19. “Why must the agent always create a plan first?”

- **Testing:** Interaction-model judgment and human-in-the-loop design.
- **Likely trigger:** Frame 18.
- **Answer to say:**
  - “The user’s sentence is not an executable specification.”
  - “The plan exposes scope, missing inputs, assumptions, dependencies, and proposed steps.”
  - “That creates the cheapest moment to catch an interpretation error.”
  - “It also establishes exactly what the user is approving.”
  - “The plan is a user contract, not a transcript of the model’s private reasoning.”

## 20. “Does plan-first add too much friction?”

- **Testing:** Nuance and avoidance of a one-size-fits-all pattern.
- **Likely trigger:** Frame 18.
- **Answer to say:**
  - “Yes, it can if every task receives the same ceremony.”
  - “I would scale plan depth to consequence, uncertainty, reversibility, and blast radius.”
  - “A read-only comparison may need only a compact preview.”
  - “A device batch needs a visible plan and test.”
  - “A destructive action needs dependencies, alternatives, explicit approval, and recovery.”

## 21. “How did you decide what required approval?”

- **Testing:** Risk framework and product judgment.
- **Likely trigger:** Frames 18 and 19.
- **Answer to say:**
  - “I would look at consequence, reversibility, uncertainty, scale, permissions, and whether the action affects someone outside the current user.”
  - “Reading data and drafting a recommendation may not need approval.”
  - “Changing many devices, deleting an object, or communicating externally does.”
  - “Approval should sit at the meaningful commitment boundary.”
  - “Too many confirmations turn automation back into manual work.”

## 22. “What happens when the plan becomes stale after approval?”

- **Testing:** Edge-state thinking and production readiness.
- **Likely trigger:** Frame 19.
- **Answer to say:**
  - “The agent should revalidate critical assumptions immediately before execution.”
  - “If scope, permissions, dependencies, or risk changed materially, the approval should no longer be treated as valid.”
  - “The user should see what changed and approve the updated plan.”
  - “Minor safe changes may be handled automatically only if that policy was visible in advance.”
  - “The stale-plan event should also appear in Activity.”

## 23. “How would the user recover from partial failure?”

- **Testing:** Failure-state design and operational credibility.
- **Likely trigger:** Execution or Activity frames.
- **Answer to say:**
  - “The interface should not collapse a batch into one success or failure label.”
  - “It should show which steps and resources succeeded, failed, or were not attempted.”
  - “The agent should distinguish safe retries from steps that require human review.”
  - “The user needs options to retry, skip, pause, cancel, or begin a recovery plan.”
  - “Activity should preserve the partial state and final resolution.”

## 24. “Why does Activity need to exist outside the conversation?”

- **Testing:** Enterprise accountability and durable-workflow design.
- **Likely trigger:** Frame 20.
- **Answer to say:**
  - “Chat is temporary, but operational accountability cannot disappear with the thread.”
  - “During execution, Activity supports monitoring and intervention.”
  - “After execution, it records initiator, agent, approved plan, affected resources, steps, failures, and outcome.”
  - “It also supports handoff to another admin who was not part of the conversation.”
  - “The record is part of the product’s trust model, not just history.”

## 25. “Why did you change your Activity and audit direction?”

- **Testing:** Collaboration, low ego, and platform thinking.
- **Likely trigger:** Frame 22.
- **Answer to say:**
  - “I initially proposed a dedicated Agent Activity experience.”
  - “The PM pointed out that a separate audit system would fragment Control Hub and create another source of truth.”
  - “I agreed with the platform concern, but the existing event detail was insufficient for agent work.”
  - “I worked with PM and engineering on richer agent events inside the existing audit model.”
  - “I changed the surface while protecting the user requirement: accountability.”
- **If they push:** Explain the distinction: Activity helps users monitor and understand work; audit is the durable governed record.

## 26. “Who changed their mind in the audit-log disagreement?”

- **Testing:** Whether the collaboration story is genuinely reciprocal.
- **Likely trigger:** Follow-up to Question 25.
- **Answer to say:**
  - “We both did.”
  - “I accepted that a separate audit destination would weaken platform coherence.”
  - “The PM accepted that the existing event detail was not sufficient for agent actions.”
  - “Engineering helped us identify which richer details were feasible.”
  - “The final direction was stronger because it addressed user trust and platform consistency.”

## 27. “Why let users create agents through conversation?”

- **Testing:** Builder-workflow judgment and balance between simplicity and precision.
- **Likely trigger:** Frame 23.
- **Answer to say:**
  - “Users usually begin with the outcome they need, not the system’s configuration model.”
  - “Conversation lowers the threshold and lets the system ask focused follow-up questions.”
  - “But the result cannot stay as prose in chat.”
  - “It becomes a structured draft with scope, triggers, tools, permissions, and approval rules.”
  - “Conversation captures intent; structure makes behavior inspectable.”

## 28. “Why make testing part of agent creation?”

- **Testing:** Trust-building and understanding that configuration is not proof of behavior.
- **Likely trigger:** Frame 24.
- **Answer to say:**
  - “A goal and set of instructions can look correct while producing the wrong behavior.”
  - “A safe test lets the user inspect the context, plan, tools, approvals, and output.”
  - “It reveals missing access, unsupported cases, or ambiguous instructions before activation.”
  - “The user can revise and retest before publishing.”
  - “For a consequential agent, testing is part of setup rather than optional QA.”

---

# Process, Craft, And Collaboration

## 29. “Why did you build this in code instead of staying in Figma?”

- **Testing:** AI fluency and judgment about design artifacts.
- **Likely trigger:** Frame 25.
- **Answer to say:**
  - “Figma was strong for hierarchy, components, and key states.”
  - “It did not answer when chat became workflow, how plans persisted, or what happened during long-running actions.”
  - “I built a React prototype with Cursor, Claude Code, and Codex to test those behaviors.”
  - “The code was not the deliverable by itself; it was a decision-making tool.”
  - “It made PM and engineering feedback much more specific.”

## 30. “What did the prototype change that the static designs did not?”

- **Testing:** Whether prototyping generated learning rather than polish.
- **Likely trigger:** Follow-up to Question 29.
- **Answer to say:**
  - “It exposed the handoff between conversation and persistent workflow.”
  - “It showed whether the plan survived navigation and state changes.”
  - “It made execution timing, interruption, failure, and Activity persistence tangible.”
  - “It changed the conversation from abstract autonomy to the specific contract the admin was approving.”
  - “That was the main value of building it.”

## 31. “How did you decide when to use Figma, code, or another artifact?”

- **Testing:** Fit with the role’s flexible-artifact expectation.
- **Likely trigger:** Your working Figma file or prototype.
- **Answer to say:**
  - “I choose the artifact based on the uncertainty.”
  - “I use rough flows for product structure and alternatives.”
  - “I use Figma for hierarchy, components, detailed states, and developer reference.”
  - “I use code when timing, persistence, responsive behavior, or system handoffs are the unresolved question.”
  - “The goal is the fastest credible evidence for the team, not loyalty to one tool.”

## 32. “What reusable patterns came out of the work?”

- **Testing:** Design-system contribution and ability to scale beyond one feature.
- **Likely trigger:** Page entry, Agent details, Plan, or Activity frames.
- **Answer to say:**
  - “For contextual AI, the reusable rule was that entry placement communicates scope: object, page, or global.”
  - “The assistant needed one consistent way to expose attached context and limits.”
  - “For Agentic work, the reusable contracts were structured plan review, risk-based approval, observable execution, and Activity.”
  - “Agent status, ownership, details, and testing also became repeatable management patterns.”
  - “I would document the behavioral rules and edge states alongside the components.”

## 33. “How did you maintain visual craft in such a dense enterprise product?”

- **Testing:** Taste and attention to detail.
- **Likely trigger:** Any detailed Figma screen.
- **Answer to say:**
  - “I used hierarchy to separate the decision from supporting detail.”
  - “Consequential actions received quieter UI, not more AI decoration.”
  - “I kept existing product objects and navigation recognizable.”
  - “Progressive disclosure protected depth without putting every field at the same level.”
  - “States, spacing, labels, and action hierarchy had to make the system feel predictable.”
- **If they push:** Point to one concrete screen and one detail you refined rather than speaking only in principles.

## 34. “How did you work with PM when you disagreed?”

- **Testing:** Cross-functional maturity.
- **Likely trigger:** Audit-log decision.
- **Answer to say:**
  - “I first separated the requested surface from the user requirement underneath it.”
  - “I made sure I understood the PM’s concern about platform coherence, cost, and scope.”
  - “I brought the user evidence for richer accountability.”
  - “We involved engineering to understand the feasible event model.”
  - “The goal was a stronger shared answer, not winning the original proposal.”

## 35. “How did engineering constraints improve the design?”

- **Testing:** Whether you treat engineering as a design partner.
- **Likely trigger:** Report scope, model evaluation, or audit events.
- **Answer to say:**
  - “The one-report constraint made the first entry pattern narrower and more honest.”
  - “Data availability and permissions shaped which agent use cases were viable.”
  - “Execution and event-capture constraints shaped what could be shown in Activity and audit.”
  - “I try to protect the user contract while finding the smallest implementation that fulfills it.”
  - “A constraint is useful when it makes the promise more precise.”

## 36. “How did you incorporate feedback from other designers?”

- **Testing:** Fit with Jason’s peer-feedback culture.
- **Likely trigger:** Working-file discussion.
- **Answer to say:**
  - “I share the decision and alternatives before the screen feels finished.”
  - “I ask for feedback on a specific uncertainty, such as scope clarity, action hierarchy, or whether a state communicates risk.”
  - “I keep rejected explorations nearby so reviewers can see the tradeoff.”
  - “When feedback changes the model, I document why—not just update the final frame.”
  - “The familiar Control Hub feedback is an example where I changed the product framing, not only the styling.”

## 37. “What did you do when ‘Control Hub should still feel like Control Hub’ came back as feedback?”

- **Testing:** Receptiveness to feedback and enterprise-product restraint.
- **Likely trigger:** Frame 15.
- **Answer to say:**
  - “I realized my early AI framing had become too much of a new center of gravity.”
  - “Users wanted help, but they did not want the product they understood to disappear.”
  - “I moved the agent into recognizable Control Hub navigation, objects, and system states.”
  - “AI-first stopped meaning chat-first.”
  - “The feedback improved both orientation and trust.”

## 38. “What was the biggest challenge in this project?”

- **Testing:** How you lead through ambiguity in AI product design.
- **Likely trigger:** The transition from research and strategy into the Agentic design work.
- **Answer to say:**
  - “The biggest challenge was designing an AI experience while the user needs, product direction, and technical boundaries were all still evolving.”
  - “There was not one complete requirement or fixed model capability I could design around.”
  - “I worked closely with research, PM, and engineering to learn three things in parallel: what users actually needed help with, where the product could create value, and what the technology and data could reliably support.”
  - “Then I built prototypes to make the experience concrete—what the AI knows, what it plans to do, where the user stays in control, and what happens when something fails.”
  - “That gave the team something real to react to and helped us make decisions and move forward even while some details were still uncertain.”
- **If they push:** Use plan-first, approval, or Activity as an example of a vague AI idea that became a specific interaction decision through cross-functional review.

---

# Outcomes, Measurement, And Reflection

## 39. “How would you measure whether Report Analysis was successful?”

- **Testing:** Product-outcome thinking beyond feature adoption.
- **Likely trigger:** Frame 11.
- **Answer to say:**
  - “I would measure the funnel from eligible report view to question submitted and useful follow-up.”
  - “I would look at time from question to usable insight.”
  - “Correction or regeneration rates would show where the system misunderstood intent.”
  - “Saving, sharing, scheduling, or reuse would show whether the output became part of real work.”
  - “I would also assess confidence and whether users could identify the data scope.”

## 40. “How would you measure trust in an agent?”

- **Testing:** Ability to operationalize an abstract quality.
- **Likely trigger:** Frames 14, 20, or 21.
- **Answer to say:**
  - “I would not use self-reported trust alone.”
  - “I would look at plan corrections, approval and abandonment, intervention, cancellation, and retry behavior.”
  - “I would track errors caught before action versus after action.”
  - “I would test whether users could reconstruct the result from Activity.”
  - “Broader scope chosen after successful bounded tasks would be one signal that the system had earned more responsibility.”

## 41. “What would you do differently?”

- **Testing:** Self-awareness and whether your process has evolved.
- **Likely trigger:** Frame 26 or any imperfect decision.
- **Answer to say:**
  - “I would instrument the Report Analysis discovery funnel before changing the entry point.”
  - “I would define the object-, page-, and global-context pattern as a system earlier.”
  - “For generated reports, I would test direct manipulation against chat and structured controls.”
  - “For Agentic work, I would define risk tiers and failure-recovery states earlier.”
  - “I would align the Activity and audit event taxonomy with security and engineering before designing them as separate surfaces.”
- **If they ask for one:** Choose risk tiers and failure recovery because they most directly affect real-world trust.

## 42. “What is the biggest weakness in the Agentic concept?”

- **Testing:** Candor and ability to critique your own work.
- **Likely trigger:** Frame 26.
- **Answer to say:**
  - “The concept makes important decisions visible, but the control model may be too heavy for routine, reversible work.”
  - “The happy path is more complete than partial failure and recovery.”
  - “The next version needs risk-based plan depth rather than one approval pattern.”
  - “It also needs customer validation across low-, medium-, and high-consequence tasks.”
  - “I see that as the next design problem, not a detail to hide.”

## 43. “What outcome did the Agentic prototype create if it did not ship?”

- **Testing:** Whether directional work produced meaningful value.
- **Likely trigger:** Frame 26.
- **Answer to say:**
  - “Its outcome was product definition and alignment, not customer impact.”
  - “It turned a broad autonomy discussion into concrete interaction contracts.”
  - “Stakeholders could evaluate plan review, approval, execution, intervention, and Activity as working behavior.”
  - “The prototype helped earn buy-in for the direction and a Cisco Live demonstration.”
  - “I keep that separate from the shipped CHAI adoption result.”

---

# Juniper Square And Role Fit

## 44. “How is this work relevant to Juniper Square?”

- **Testing:** Transferability without pretending the domains are identical.
- **Likely trigger:** Any discussion of private markets or Headless GPX.
- **Answer to say:**
  - “Network administration and private markets are different domains, so I would not overstate the analogy.”
  - “The transferable problem is designing AI on top of connected, sensitive enterprise data and consequential workflows.”
  - “Users need to know what the system knows, what it plans to do, what authority it has, and what changed afterward.”
  - “Juniper Square’s emphasis on shared permissions and audit trails makes that interaction contract especially relevant.”
  - “My experience is in making those complex systems understandable and controllable.”

## 45. “You do not have private-markets experience. How would you learn the domain?”

- **Testing:** Domain humility and learning method.
- **Likely trigger:** Role-fit discussion.
- **Answer to say:**
  - “I would be direct that private markets are a real learning curve.”
  - “I would begin with the workflow and vocabulary: the actors, objects, decisions, handoffs, controls, and failure costs.”
  - “I would pair customer interviews with internal experts in fund administration, customer success, product, and compliance.”
  - “I would use real artifacts and cases rather than rely only on a glossary.”
  - “Then I would prototype the uncertain workflow and validate my model with experts early.”

## 46. “Why Juniper Square?”

- **Testing:** Genuine motivation tied to the work.
- **Likely trigger:** End of discussion or role-fit question.
- **Answer to say:**
  - “I’m interested in products where the data and workflows are complex, but the interface still has to help people make confident decisions.”
  - “Juniper Square is building the operating layer for private markets, not just adding AI to a generic tool.”
  - “The combination of connected data, domain workflows, permissions, and audit makes the AI design problem meaningful.”
  - “It is also the kind of environment where my enterprise systems and agentic interaction experience can be useful.”
  - “I would get to learn a new domain while working on a problem I already care deeply about: trustworthy AI in consequential workflows.”

## 47. “Why this role?”

- **Testing:** Fit with the actual responsibilities.
- **Likely trigger:** Role-fit discussion.
- **Answer to say:**
  - “The role combines the parts of product design where I do my best work.”
  - “It has end-to-end ownership of complex, data-heavy enterprise workflows.”
  - “It expects close partnership with PM and engineering rather than design working downstream.”
  - “It values both polished Figma work and coded prototypes when behavior is the uncertainty.”
  - “It also expects the designer to strengthen reusable patterns and the design system, not only finish one feature.”

## 48. “What would you investigate first if you joined?”

- **Testing:** Product curiosity without pretending to know the answer already.
- **Likely trigger:** Closing conversation.
- **Answer to say:**
  - “I would first map the user, workflow, and system model for the product area I owned.”
  - “I would identify the moments where people leave Juniper Square for spreadsheets, email, or manual reconciliation.”
  - “For AI workflows, I would examine what data, permissions, evidence, and approvals users need at each step.”
  - “I would review the existing design-system patterns and where teams are creating local variants.”
  - “Then I would choose one high-value workflow where a prototype could make the product question concrete.”

## 49. “How would you contribute to our design system?”

- **Testing:** Preferred qualification and systems contribution.
- **Likely trigger:** Role discussion or reusable-pattern question.
- **Answer to say:**
  - “I start from repeated product decisions, not from building a component inventory in isolation.”
  - “I would identify patterns shared across tables, filters, reports, permissions, AI context, approval, and Activity.”
  - “I would document behavior, states, content rules, accessibility, and implementation guidance alongside the visual component.”
  - “I would partner with design and engineering so reuse improves speed without blocking legitimate workflow differences.”
  - “The goal is consistent user contracts, not identical screens everywhere.”

## 50. “What are you looking for from your next manager and design team?”

- **Testing:** Team and feedback fit.
- **Likely trigger:** Closing conversation.
- **Answer to say:**
  - “I’m looking for a team with a high craft bar and direct feedback.”
  - “I value a manager who will go into the details of the work while still giving me ownership.”
  - “I want strong collaboration with PM and engineering around the product model, not only handoff.”
  - “I also want peers who share work early and make each other’s decisions sharper.”
  - “The combination of autonomy, critique, and shared standards is important to me.”

---

# Questions Jason May Ask While Looking Through Figma

## 51. “Show me an exploration you rejected.”

- **Testing:** Whether the file contains real thinking and alternatives.
- **Answer to say:**
  - “Here are the global, page-level, side-panel, and row-level entries.”
  - “The broader options looked more powerful, but they overstated what the system understood at that point.”
  - “I selected the row entry because scope clarity mattered more than apparent power in V1.”
  - “Later, when the capability grew, the page-level pattern became the better answer.”

## 52. “Show me a state that was difficult to design.”

- **Testing:** Detailed interaction craft.
- **Answer to say:**
  - “I would show the transition from an approved plan into observable execution.”
  - “The difficult part was balancing progress detail with the user’s need to intervene.”
  - “A spinner hid too much, while exposing every system event overwhelmed the main task.”
  - “I organized the state around meaningful steps, needs-attention moments, and a durable Activity record.”

## 53. “Which screen are you least satisfied with?”

- **Testing:** Taste and honest self-critique.
- **Answer to say:**
  - “I would choose the current approval or execution state.”
  - “The hierarchy communicates the main action, but the model needs more risk-based variation.”
  - “It may be too heavy for routine work and not yet detailed enough for partial failure.”
  - “I would redesign it as a family of low-, medium-, and high-risk control patterns.”

## 54. “What would engineering need from this file to build it?”

- **Testing:** Handoff quality and end-to-end ownership.
- **Answer to say:**
  - “They would need the state model, not only the final screens.”
  - “I would include entry conditions, data dependencies, permissions, loading and error states, approval rules, and event behavior.”
  - “The component variants and content rules would be linked to the design system.”
  - “For the agent workflow, I would also document when a plan becomes stale and which events appear in Activity and audit.”
  - “I would review the implementation with engineering rather than treat file delivery as the end.”

---

# Highest-Priority Questions To Rehearse

If preparation time is limited, practice these first:

1. What was your exact role?
2. How did research change the design?
3. What was the biggest challenge in this project?
4. Why the report-row sparkle?
5. Why page launcher instead of page input?
6. What shipped versus directional?
7. Why agentic instead of normal automation?
8. How did you choose the first agent use cases?
9. Why plan first, and does it add too much friction?
10. Why did you change the Activity and audit direction?
11. What happens during partial failure?
12. Why build the prototype in code?
13. What would you do differently?
14. How is this relevant to Juniper Square?
15. How would you learn private markets?
16. Why this role?

# Answer Pattern When Jason Interrupts

Use this compact structure:

```text
The problem was...
The decision I made was...
I chose it because...
The tradeoff was...
What I learned or would change is...
```

Example:

- “The system could use only one report as context.”
- “I attached the AI entry to the report row.”
- “That made scope clear and kept the existing workflow intact.”
- “The tradeoff was discoverability.”
- “I would now instrument the discovery funnel and test the sparkle against a clearer label.”

# Avoid Saying

- “Users trusted it” without behavioral or research evidence.
- “The sparkle caused low adoption” without a verified funnel.
- “Agentic increased adoption” when the work was directional.
- “The AI understood everything on the page.”
- “The agent thinks” when you mean the system inferred, retrieved, planned, or generated.
- “We automated the workflow” without explaining approval, failure, and accountability.
- “I built it in code” as the outcome; explain which product decision the prototype resolved.
- “Finance is just another enterprise domain.”
- “The design system means using the same component everywhere.”
- “I did everything” when PM, engineering, research, and domain experts shaped the result.

# Final Reminder

Jason is likely to learn more from one honest tradeoff than from five polished screens.

The recurring answer you want him to hear is:

> I made the user’s context, the system’s scope, and the consequences of action visible. When evidence or constraints changed, I changed the design while protecting the user need underneath it.
