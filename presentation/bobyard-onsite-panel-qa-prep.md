# Bobyard Onsite Panel Q&A Prep

Interview: onsite panel + 1:1 with Head of Product  
Company: Bobyard  
Role: Senior Product Designer  
Panel: Michael Ding, Jean Chu, Zhiyuan Chen, Sean Tay  
1:1: Sean Tay

## The Main Point To Land

> I design AI for complex expert workflows, where users need speed, trust, and control. Bobyard is interesting to me because construction takeoff is not a toy AI use case. Estimators need to inspect the work, correct it, and trust it enough to bid real projects.

Keep coming back to this:

- I can learn a technical domain quickly.
- I can sit with expert users and turn messy workflows into clear product direction.
- I can design AI behavior, not only AI UI.
- I can prototype when static Figma is not enough.
- I can think in systems: reusable response patterns, product frameworks, and interaction rules that scale beyond one feature.
- I can raise the craft bar while still moving fast.

## 60-Second Opening

- "I am a product designer focused on enterprise AI systems."
- "Most of my work is about making dense workflows readable, actionable, and trustworthy."
- "At Cisco, I designed Control Hub AI Assistant across search, reports, dashboards, and device workflows, and helped grow adoption from 3% to 18%."
- "I also designed Smart Search, which reduced search dead ends by 86%."
- "Before Cisco, I worked on SAP Fieldglass, so I am comfortable with complex B2B workflows and enterprise scale."
- "Bobyard stood out to me because takeoff is a real expert workflow. The AI cannot just look impressive. Estimators need to understand it, verify it, correct it, and use it to move faster."

## Stories To Reuse

### 1. CHAI adoption turnaround

Use for:

- Ambiguity.
- Product judgment.
- AI adoption.
- Workflow research.
- Business outcome.

Core points:

- CHAI launched as a generic help assistant.
- Adoption was low, around 3%.
- The first instinct was to make the chat better.
- Research showed the deeper problem: admins did not want to leave their workflow, open a chat, and reconstruct context.
- You reframed the product from a standalone assistant to contextual AI inside admin workflows.
- Result: adoption grew from 3% to 18%.

One-line takeaway:

> The assistant became useful when it stopped being a destination and became a contextual layer inside the work.

### 2. Smart Search

Use for:

- AI retrieval.
- Query behavior.
- Measuring impact.
- Turning failure into product direction.

Core points:

- Admins often searched for things using natural language or incomplete product terms.
- Search dead ends created frustration and blocked admin work.
- You used query-log analysis, LLM retrieval/ranking behavior, and user feedback to redesign the experience.
- Result: search dead ends dropped by 86%.

One-line takeaway:

> The design challenge was not just better search results. It was helping users recover when the system did not understand them.

### 3. Widget system / AI response guidelines

Use for:

- System thinking.
- Reusable AI patterns.
- Trustworthy AI responses.
- Turning messy data into inspectable evidence.

Core points:

- CHAI could not scale if every answer was treated as a one-off chat response.
- Different workflows needed different output structures: search recovery, report analysis, troubleshooting, device context, and next-step recommendations.
- You defined a reusable response model: user intent, product context, skill or tool, structured output, evidence, guardrails, and review.
- For troubleshooting, raw logs and telemetry became evidence widgets: incident summary, timeline, affected scope, supporting signals, conflicting signals, source links, likely explanation, and recommended action.
- This made AI responses easier for admins to scan, challenge, and trust.

One-line takeaway:

> The system thinking was turning AI answers into reusable evidence patterns, not treating each response as a custom block of text.

### 4. Agent framework

Use for:

- System thinking.
- Product architecture.
- 0-to-1 AI direction.
- Turning a vague AI vision into buildable product surfaces.

Core points:

- The agentic work started as a broad question: how should AI plan and act inside Control Hub?
- You defined the framework before the individual screens: Chat, Insights, Workflow, and Activity.
- Chat captured fuzzy intent and clarification.
- Insights made the system proactive by surfacing risks or changes in context.
- Workflow turned intent into plans, checks, approvals, execution, and recovery.
- Activity made the agent accountable by recording what happened, what the admin approved, and what changed.
- This gave the team a shared product model for agentic AI instead of a collection of disconnected demos.

One-line takeaway:

> The agent framework turned autonomy into a system: intent, evidence, plan, approval, execution, and audit.

### 5. Control Hub Agentic proof flow

Use for:

- 0-to-1 AI product thinking.
- Trust and control.
- Reviewable actions.
- Prototyping.
- Engineering partnership.

Core points:

- The problem moved from helping admins understand work to helping them safely do work.
- Admin actions have dependencies, permissions, validation errors, and consequences.
- You defined the interaction model: intent, context, plan, approval, execution, activity, audit.
- You made the plan a reviewable contract before execution.
- You used React/TypeScript prototypes because timing, state, and approval could not be evaluated honestly in static screens.

One-line takeaway:

> When AI can act, accountability becomes part of the interface.

### 6. SAP Fieldglass

Use for:

- Complex enterprise workflows.
- Design systems.
- Scalable patterns.
- Role-based dashboards.

Core points:

- Fieldglass had dense workforce, spend, task, and approval workflows.
- You designed modular homepage, worker dashboard, and profile patterns.
- The system surfaced pending tasks, spend signals, key dates, and role-specific actions.
- Result: framework adopted by 1,000+ enterprise customers.

One-line takeaway:

> A scalable product system is not just reusable components. It gives different users strong defaults for their work.

## Panel Questions

### 1. Tell us about yourself.

- **Testing:** Clear positioning and relevance.
- **Answer to say:**
  - "I am a product designer focused on enterprise AI systems."
  - "My recent work is about making dense admin workflows easier to understand and act on."
  - "At Cisco, I designed AI experiences across search, reports, dashboards, devices, and agentic workflows."
  - "The common thread is trust. Users need to know what the AI is using, why it is useful, and what they can do next."
  - "That is why Bobyard is interesting to me. Takeoff is a high-stakes expert workflow, so the design has to make AI output inspectable and useful."

### 2. Why Bobyard?

- **Testing:** Motivation beyond generic AI interest.
- **Answer to say:**
  - "The problem is concrete. Estimators are turning drawings into quantities, estimates, and bids."
  - "If the AI misses something, the cost is real, so trust is not a nice-to-have."
  - "I like that the interface is central to the product, not just a wrapper around the model."
  - "My background connects to this in a few ways: architecture training, enterprise workflow design, and AI product design."
  - "I am excited by the chance to work closer to customers and help define how AI becomes usable in a real trade workflow."

### 3. What was technically challenging about CHAI?

- **Testing:** Whether you can design AI behavior and response systems, not only screens.
- **Answer to say:**
  - "The hard part was not making a chat UI."
  - "The harder problem was deciding what information CHAI should show so an admin could actually make a decision."
  - "A report analysis, a dashboard insight, a search recovery flow, and a troubleshooting case all need different evidence and different UI."
  - "For data analysis, the answer needed to show the metric, trend, scope, source, and possible next step."
  - "For troubleshooting, the assistant could not jump straight to a conclusion. It needed to build a case: timeline, affected scope, supporting signals, conflicting signals, source links, likely explanation, and recommended action."
  - "So I worked on a reusable response framework: user intent, product context, CHAI skill or tool, structured output, evidence, guardrails, and review."
  - "That was the technical design challenge: turning AI output into decision-ready evidence patterns across different use cases."

### 4. How did you know the first CHAI direction was not enough?

- **Testing:** Iteration and judgment.
- **Answer to say:**
  - "The first direction improved the assistant itself: prompts, answer layout, empty state, and thread behavior."
  - "That work helped, but it also exposed the bigger issue."
  - "Admins still had to stop their work, open the assistant, and explain context that the product already knew."
  - "So I reframed the problem from better chat to contextual AI inside admin workflows."
  - "The result was a stronger product model and better adoption."

### 5. How do you design for expert users?

- **Testing:** Respect for estimators and power users.
- **Answer to say:**
  - "I do not assume simpler always means fewer controls."
  - "For expert users, clarity means showing the right detail at the right moment."
  - "I try to understand what they check, what they trust, and where mistakes are expensive."
  - "Then I design around speed, recoverability, and verification."
  - "For Bobyard, that means the AI output should be easy to inspect against the drawing, not just presented as a final answer."

### 6. How would you learn construction takeoff quickly?

- **Testing:** Domain learning and customer proximity.
- **Answer to say:**
  - "I would start by watching estimators do real takeoffs from plan sets."
  - "I would look for repeated decision points: what they measure, what they count, what they double-check, and where errors happen."
  - "I would also ask where they distrust automation today."
  - "Then I would prototype around those trust-break moments first."
  - "I would not start by assuming the whole workflow should be redesigned."

### 7. What would you look at first in Bobyard's product?

- **Testing:** Product judgment without pretending to know too much.
- **Answer to say:**
  - "I would start with the review loop."
  - "For AI takeoff, the important question is not only whether the model is right, but whether the estimator can tell what happened."
  - "I would look at how quantities connect back to drawings, how corrections work, and how users build confidence before sending a bid."
  - "I would also study where users slow down or export work out of the product."
  - "That would tell me whether the biggest opportunity is accuracy communication, workflow speed, collaboration, or estimate handoff."

### 8. How do you balance speed and quality?

- **Testing:** Startup operating style.
- **Answer to say:**
  - "I separate reversible decisions from high-consequence decisions."
  - "For reversible decisions, I am comfortable moving fast with a prototype or lightweight design."
  - "For high-consequence moments, like AI acting on user work or producing something used for bidding, I slow down enough to design review, correction, and audit."
  - "The goal is not to make the process heavy."
  - "The goal is to spend rigor where mistakes are expensive."

### 9. How do you work with engineers?

- **Testing:** No-handoff collaboration.
- **Answer to say:**
  - "I try to make design concrete early."
  - "For AI interactions, static screens often hide the hardest parts: timing, state changes, errors, and user control."
  - "I use prototypes when behavior needs to be felt before it can be judged."
  - "At Cisco, I built React/TypeScript prototypes for chat-to-workflow and agentic flows."
  - "That helped product and engineering discuss feasibility, edge cases, and interaction quality earlier."

### 10. Tell us about a time you disagreed with PM or engineering.

- **Testing:** Collaboration under pressure.
- **Answer to say:**
  - "In CHAI, there was a natural pull toward improving the assistant surface because that was the visible feature."
  - "I agreed that the surface needed work, but I pushed that the deeper issue was workflow context."
  - "I used research and usage patterns to show that admins were not failing because the chat looked bad."
  - "They were failing because the assistant was disconnected from the task."
  - "That helped shift the roadmap toward contextual entry points instead of only chat polish."

### 11. What is your strongest design decision from your portfolio?

- **Testing:** Ability to name your own judgment.
- **Answer to say:**
  - "The strongest decision was changing CHAI from a standalone destination to a contextual layer."
  - "That decision changed the product model, not just the interface."
  - "It reduced the need for users to explain context manually."
  - "It also created reusable patterns across search, reports, dashboards, and devices."
  - "That is the kind of decision I enjoy: one interaction model that improves multiple workflows."

### 12. What is an example of design craft in your work?

- **Testing:** Taste and detail.
- **Answer to say:**
  - "For me, craft is not only visual polish."
  - "It is whether the user understands what is happening, what changed, and what they can do next."
  - "In the agentic work, craft showed up in plan review, approval moments, execution state, and audit trail."
  - "In CHAI, craft showed up in making AI output feel attached to the page or artifact it was analyzing."
  - "Those details make the product feel trustworthy instead of generic."

### 13. How do you measure design success?

- **Testing:** Outcome thinking.
- **Answer to say:**
  - "I try to connect the metric to the user job."
  - "For CHAI adoption, usage mattered because the business needed the assistant to become part of real workflows."
  - "For Smart Search, search dead ends were the right metric because they showed where admins could not find what they needed."
  - "For Bobyard, I would expect success to include time to complete takeoff, review confidence, correction rate, estimate handoff, and bid volume."
  - "The exact metric depends on the workflow stage, but it should connect to customer trust and business speed."

### 14. What would your first 30/60/90 days look like?

- **Testing:** Ownership and operating plan.
- **Answer to say:**
  - "In the first 30 days, I would learn the customer workflow and product deeply."
  - "I would sit in customer calls, review real plan sets, study support or sales friction, and map the current takeoff-to-estimate flow."
  - "By 60 days, I would identify the biggest design leverage points and prototype one or two improvements."
  - "By 90 days, I would want to have shipped or be close to shipping a focused improvement, while also creating reusable patterns the team can build on."
  - "I would optimize for learning fast without pretending I understand the domain on day one."

### 15. Why leave Cisco for a startup?

- **Testing:** Motivation and risk fit.
- **Answer to say:**
  - "I am not leaving because something is wrong."
  - "Cisco has given me strong experience leading enterprise AI work."
  - "My next step is a different kind of ownership, speed, and proximity to product decisions."
  - "I want to be closer to customers, product strategy, and implementation."
  - "Bobyard feels like the kind of environment where design decisions can directly shape the product."

## High-Growth Startup Questions

### 16. Have you worked in a high-growth startup before?

- **Testing:** Whether big-company habits will slow you down.
- **Answer to say:**
  - "I have not worked full-time inside a startup at Bobyard's stage."
  - "But I have worked on ambiguous 0-to-1 AI problems where there was no established pattern."
  - "I also changed my process recently to become much more prototype-driven and closer to implementation."
  - "The part that attracts me is the speed and ownership."
  - "I know I would need to adapt to a smaller team, but the direction matches how I want to work."

### 17. What would be hard for you moving from Cisco to Bobyard?

- **Testing:** Self-awareness.
- **Answer to say:**
  - "The biggest adjustment would be the pace and the lack of established support structures."
  - "At a larger company, there are more functions around the designer."
  - "At Bobyard, I would need to be more direct: talk to customers, prototype, align with engineering, and make decisions with less process."
  - "That is also why I am interested."
  - "I want that closer connection between problem, decision, and shipped product."

### 18. Tell us about a time you moved fast.

- **Testing:** Bias toward action.
- **Answer to say:**
  - "The agentic prototype is a good example."
  - "The idea had many open questions around plan generation, approvals, execution, and audit."
  - "Static screens were not enough, so I built a React prototype to make the behavior real."
  - "That helped the team react to the product model faster."
  - "It compressed discussion because people could experience the flow instead of only debating diagrams."

### 19. Tell us about a time you shipped something imperfect.

- **Testing:** Comfort with iteration.
- **Answer to say:**
  - "The first CHAI improvements were not the final answer."
  - "We improved the assistant surface because users needed a better starting point."
  - "But I did not treat that as the whole solution."
  - "Once we saw the deeper workflow issue, I pushed the next direction toward contextual AI."
  - "That is how I think about shipping: get something useful out, learn from it, and keep moving toward the real problem."

### 20. How do you decide what not to build?

- **Testing:** Prioritization.
- **Answer to say:**
  - "I look for the smallest product move that proves or disproves the biggest assumption."
  - "In CHAI, that meant not building a large generic assistant surface before validating where AI should enter the workflow."
  - "For Bobyard, I would ask which part of takeoff most limits customer value right now."
  - "If trust in AI output is the bottleneck, I would prioritize review and correction over secondary polish."
  - "If handoff to estimates is the bottleneck, I would prioritize workflow continuity."

### 21. How do you handle founder feedback?

- **Testing:** Directness and flexibility.
- **Answer to say:**
  - "I try to understand the product concern behind the feedback first."
  - "Founder feedback often compresses customer signal, business pressure, and taste into one reaction."
  - "I would ask what problem the feedback is pointing to, then decide whether the design should change, whether we need a faster prototype, or whether we need customer evidence."
  - "I am comfortable with strong opinions."
  - "I just want the team to connect them back to the user and product outcome."

### 22. What do you do when there is not enough research?

- **Testing:** Resourcefulness.
- **Answer to say:**
  - "I do not wait for a perfect research plan."
  - "I use whatever signal is available: customer calls, support notes, sales objections, product analytics, and quick usability sessions."
  - "Then I turn the riskiest assumption into a prototype or focused question."
  - "The goal is to reduce uncertainty enough to make the next decision."
  - "In a startup, I would expect research to be continuous and lightweight."

### 23. What do you do when leadership wants speed but the design is not ready?

- **Testing:** Judgment under pressure.
- **Answer to say:**
  - "I would be explicit about the risk."
  - "If the risk is polish, I am comfortable shipping and improving."
  - "If the risk is trust, data accuracy, permissions, or a high-consequence workflow, I would push for the minimum guardrail before launch."
  - "I would not frame it as design perfection."
  - "I would frame it as protecting customer trust and reducing expensive rework."

### 24. What is your design process when the product is changing fast?

- **Testing:** Adaptability.
- **Answer to say:**
  - "I keep the process lightweight but intentional."
  - "First, I clarify the user job and the business reason."
  - "Then I identify the highest-risk interaction or assumption."
  - "I prototype that part first, align with product and engineering, and only then expand the surface."
  - "When things change fast, the interaction model matters more than a polished set of disconnected screens."

### 25. Tell us about a time you raised the bar.

- **Testing:** Taste plus execution.
- **Answer to say:**
  - "With CHAI, raising the bar meant not accepting a generic assistant pattern."
  - "The common pattern was a chat panel with suggested prompts."
  - "But the product needed something more specific to admin work."
  - "I pushed for contextual entry points, attached source context, and workflow-specific outputs."
  - "That made the AI feel more useful and more trustworthy."

### 26. What kind of environment helps you do your best work?

- **Testing:** Startup fit.
- **Answer to say:**
  - "I do best when design is involved early and expected to shape the product."
  - "I like working close to product and engineering, with direct debate and quick feedback."
  - "I also like having access to real customers or customer evidence."
  - "I do not need a heavy process."
  - "I do need clear goals, honest feedback, and enough trust to make decisions."

### 27. What is a weakness or growth area?

- **Testing:** Self-awareness without self-sabotage.
- **Answer to say:**
  - "One growth area is learning to make strong decisions with less certainty."
  - "In larger companies, it is easy to wait for more alignment or more validation."
  - "The AI work pushed me to prototype earlier and make the risk visible instead of trying to solve everything in a deck."
  - "That is a skill I want to keep building."
  - "It is also one reason I am drawn to a smaller, faster team."

### 28. Why should we hire you over someone with construction experience?

- **Testing:** Domain gap.
- **Answer to say:**
  - "Construction experience would be valuable, and I would need to learn the domain quickly."
  - "What I bring is experience designing AI inside complex expert workflows."
  - "I have also studied architecture, so I am not starting from zero on drawings, spatial systems, and built-world constraints."
  - "More importantly, I know how to learn from expert users without oversimplifying their work."
  - "Bobyard needs someone who can turn AI capability into a trusted product experience, and that is where my experience is strong."

### 29. If you joined, what would you push us to improve?

- **Testing:** Candor and taste.
- **Answer to say:**
  - "I would want to learn the product in depth before making a strong claim."
  - "Based on the problem space, I would probably look closely at AI review and correction."
  - "The product needs to help estimators answer: what did the AI find, where did it find it, what might be missing, and how do I correct it quickly?"
  - "If that loop is strong, the product can earn trust faster."
  - "If that loop is weak, even accurate AI may feel risky."

### 30. How do you handle ambiguity?

- **Testing:** 0-to-1 product maturity.
- **Answer to say:**
  - "I try to turn ambiguity into a few concrete questions."
  - "What user job are we solving?"
  - "What is the biggest risk: usability, trust, technical feasibility, or business value?"
  - "What is the smallest prototype or customer conversation that helps us learn?"
  - "That keeps ambiguity from becoming a vague design exercise."

## Sean 1:1 Questions

### 31. What product judgment are you hoping this designer brings?

- **Testing:** Head of Product fit.
- **Answer to prepare:**
  - Be ready to say: "I want to understand where design needs to lead, not just support execution."

Ask Sean:

- "What is the biggest product decision you expect this designer to help shape in the next 3-6 months?"
- "Where does Bobyard most need design judgment right now: workflow architecture, customer trust, craft quality, or speed of iteration?"
- "How do you personally like to work with design?"
- "What is the current product rhythm from customer signal to shipped decision?"
- "What would make you say after 90 days that this hire was clearly the right person?"

### 32. If Sean asks what you want in your next role

- **Testing:** Motivation and role alignment.
- **Answer to say:**
  - "I am looking for a role where design is close to product strategy and implementation."
  - "I want direct ownership, customer proximity, and faster learning loops."
  - "I still want to be very hands-on."
  - "The kind of work I want is defining the interaction model, prototyping the hard parts, and helping the team ship something customers actually trust."
  - "Bobyard seems aligned with that because the product depends so much on workflow clarity and AI trust."

## Questions To Ask The Panel

Use 3-5 total. Choose based on who is in the room.

### Product and strategy

- "Where does user trust break most often today: detection accuracy, review flow, estimate handoff, or something else?"
- "As Bobyard expands across trades, what parts of the product should stay consistent and what needs to become trade-specific?"
- "What is the biggest product bet for the next 6-12 months?"
- "What customer behavior would tell you Bobyard has become a daily workflow, not just a useful tool?"

### Design and craft

- "What design patterns are still unresolved in the product?"
- "Where do you most want to raise the craft bar?"
- "How much prototyping do designers do today, especially for AI behavior?"
- "What is one product detail that is much harder to design than it looks from the outside?"

### Team and operating style

- "How do design, product, engineering, and model work come together when deciding what to ship?"
- "How does the team handle disagreement when speed matters?"
- "What separates someone who does well here from someone who struggles?"
- "What does strong ownership look like on this team?"

### Closing

- "After seeing my work, where do you think my experience maps most directly to Bobyard's current needs?"
- "Is there any concern about my background or experience that I can clarify?"

## Language To Mirror

- "Make complexity feel inevitable."
- "Live in customer workflows."
- "Own outcomes, not pixels."
- "Prototype fast, test with users, kill what does not work."
- "No handoffs."
- "Raise the bar."
- "Turn chaos into clarity."
- "AI model interfaces intuitive and frictionless."
- "Cash for stability, variable for performance, equity for ownership."

## Avoid Saying

- "I have not worked in construction before" without immediately pairing it with architecture training and fast workflow learning.
- "I bring enterprise process."
- "I would need a researcher to validate that."
- "I mainly work in Figma."
- "AI should feel magical."
- "I want more ownership" without saying ownership of product decisions, customer learning, prototyping, and shipped outcomes.
- "I would redesign the product" before showing that you want to understand the workflow first.

## Final Mental Checklist

- Lead with CHAI.
- Use Smart Search for metrics.
- Use Agentic for trust, approvals, audit, and prototyping.
- Use SAP only when they ask about scale or systems.
- Talk like a product partner.
- Be direct about wanting speed, ownership, and customer proximity.
- Do not over-explain Cisco process.
- Make every answer end with what changed, what you decided, or why it mattered.
