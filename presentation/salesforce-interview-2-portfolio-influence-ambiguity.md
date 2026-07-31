# Salesforce Interview 2 — Portfolio, Influence, and Managing Ambiguity

**Interviewer:** Principal UX Designer  
**Topics:** In-depth portfolio showcase  
**Competencies:** Motivate & Champion — Influence; Motivate & Champion — Manage Ambiguity

## What the Interviewer Is Likely Testing

- Can I tell a clear case-study story with depth, not tour screens?
- Can I explain my personal decisions, alternatives, tradeoffs, and craft?
- Can I influence PM, engineering, research, and leadership without relying on authority?
- Can I adapt when new evidence or constraints invalidate the original direction?
- Can I turn an ambiguous AI problem into a coherent, buildable interaction model?

## Recommended Portfolio Shape

### Project 1 — Control Hub AI Assistant

- Lead with the low-adoption problem, not the feature list.
- Show the root-cause shift: **better chat → contextual AI inside workflows**.
- Go deep on two decisions: **Skills/routing** and **Smart Search or report analysis**.
- Close with measurable results: **3% → 18% monthly adoption; 86% fewer dead-end searches**.

### Project 2 — Control Hub Agentic

- Frame it as the next stage of the same AI journey: **context → control**.
- Show the system model: **intent → context → plan → permission → execution → Activity/audit**.
- Go deep on **always plan first** and one end-to-end workflow.
- Be precise: the outcome was alignment, stakeholder buy-in, and direction-setting—not shipped product metrics.

## Core Message

> I influence by making the problem and tradeoffs concrete. When the path is ambiguous, I use evidence, system models, and working prototypes to help the team decide together.

## Q&A

### 1. What is the most important thing you want us to understand from your portfolio?

- **Testing:** Narrative judgment and senior-level self-awareness.
- **Answer to say:**
  - "The common thread is how I make complex enterprise AI understandable enough for people to use and trust."
  - "CHAI shows how I took a shipped assistant with weak adoption and moved it into real admin workflows with measurable results."
  - "The agentic project shows the next stage: defining how AI can plan and act while the human keeps control."
  - "Together, they show both sides of my work—improving a live product and defining a new product direction under ambiguity."

### 2. Describe one of the most successful techniques you used to gain agreement.

- **Testing:** Influence through understanding, evidence, and a compelling case.
- **Answer to say (STAR):**
  - **Situation:** "The CHAI team initially saw low adoption mainly as a chat usability problem."
  - **Task:** "I needed to build agreement around a larger shift toward contextual AI without dismissing the value of improving chat."
  - **Action:** "I first clarified the shared goal—repeat value for admins—then showed where the existing journey broke: leaving the workflow, opening CHAI, inventing a prompt, and reconnecting the answer."
  - **Action:** "I involved partners in exploring contextual entry points across search, reports, dashboards, and devices, and used prototypes to compare the models."
  - **Result:** "We aligned on contextual AI as the roadmap direction, and monthly adoption eventually moved from 3% to 18%."
  - **Closer:** "The technique was to make the decision about user behavior and product outcomes, not whose idea won."

### 3. Tell me about influencing someone who was attached to another direction.

- **Testing:** Empathy, persuasion, and respect for conflicting viewpoints.
- **Answer to say (STAR):**
  - **Situation:** "At SAP Fieldglass, the initial asks focused on updating homepage widgets and improving Global Search."
  - **Task:** "Research suggested that occasional users did not simply need better search; they needed the product to surface the right work before they searched."
  - **Action:** "I acknowledged the technical and roadmap reasons behind the original request, then mapped four key personas to their most important jobs."
  - **Action:** "I worked with the PM and engineering lead on a dashboard alternative using role-based templates, visible work items, and in-place actions."
  - **Result:** "The direction became a modular homepage framework adopted by more than 1,000 enterprise customers."
  - **Closer:** "I did not ask the team to accept a bigger idea on faith; I connected it to the original goal and made it feasible."

### 4. Tell me about a time you needed contributions from others to make a project successful.

- **Testing:** Involving others and steering commitment to action.
- **Answer to say (STAR):**
  - **Situation:** "CHAI expanded into search, reports, analytics, workspaces, and devices, each with different data and technical constraints."
  - **Task:** "I needed enough domain and system knowledge to design useful AI behavior without pretending design could answer those questions alone."
  - **Action:** "I worked with PM to prioritize user jobs, research to understand admin expectations, and engineering and data partners to define available context and reliable system behavior."
  - **Action:** "I translated those contributions into scoped patterns, then brought them back for review with clear open questions and decisions."
  - **Result:** "We created a coherent contextual-AI model rather than a set of disconnected feature integrations."
  - **Closer:** "My role was to connect user intent, system capability, and product priority into one experience."

### 5. Tell me about a time you faced an unexpected change in your responsibilities.

- **Testing:** Positive response and effective adjustment.
- **Answer to say (STAR):**
  - **Situation:** "My work on CHAI began with improving an existing assistant, but the scope grew into defining agentic workflows for Control Hub."
  - **Task:** "I had to move from optimizing a shipped conversational product to shaping a 0-to-1 interaction model with no established pattern."
  - **Action:** "I learned the new technical and trust constraints, reframed the problem around accountability, and created a system model before designing screens."
  - **Action:** "I also changed my prototyping approach and built the experience in React because static screens could not test timing, state, approval, and execution."
  - **Result:** "The prototype aligned leadership around a concrete direction and gained buy-in for a Cisco Live US 2026 demo."
  - **Learning:** "I treated the expanded responsibility as a chance to improve how I define products, not just how I deliver screens."

### 6. Describe a time when new evidence caused you to change direction.

- **Testing:** Curiosity, flexibility, and willingness to stop an ineffective method.
- **Answer to say (STAR):**
  - **Situation:** "CHAI 2.0 improved prompts, threads, and answer layouts, but the assistant still depended on users knowing when to open it and what to ask."
  - **Task:** "I needed to understand why improved usability was not enough to create repeat behavior."
  - **Action:** "I looked beyond the panel and studied the surrounding workflows where admins searched, interpreted reports, and diagnosed issues."
  - **Action:** "I changed the product direction from a better destination to contextual entry points and Skills that set the right context behind the scenes."
  - **Result:** "Monthly adoption grew from 3% to 18%, and Smart Search reduced dead-end searches by 86%."
  - **Closer:** "The first approach improved usability; the second addressed workflow fit."

### 7. How did you manage ambiguity in the agentic project?

- **Testing:** Structured thinking and comfort without a preset answer.
- **Answer to say (STAR):**
  - **Situation:** "The term 'agentic' was broad enough to support almost any concept, from better chat to autonomous administration."
  - **Task:** "I needed to define a product model the team could evaluate and eventually build."
  - **Action:** "I anchored the work in real high-stakes admin tasks and identified the trust requirements: context, dependencies, permission, approval, execution state, and audit."
  - **Action:** "I created the workflow architecture—intent, context, plan, permission, execution, Activity, and audit or rollback."
  - **Action:** "Then I stress-tested it through device onboarding and a destructive action like deleting a virtual line."
  - **Result:** "The team moved from debating autonomy in the abstract to reviewing a specific, plan-first contract between the admin and the agent."

### 8. What was the most important design decision in CHAI?

- **Testing:** Decision quality and ability to explain tradeoffs.
- **Answer to say:**
  - "The most important decision was to stop treating CHAI as one blank input."
  - "Different jobs—search, report analysis, dashboard interpretation, and troubleshooting—needed different context and tools."
  - "The internal answer was routing, but exposing routing would make users operate the system's architecture."
  - "I turned routing into Skills and contextual entry points expressed in admin language."
  - "That made the capability clearer while setting the right context behind the scenes."

### 9. What alternative did you reject in the agentic project, and why?

- **Testing:** Tradeoff clarity and product restraint.
- **Answer to say:**
  - "I rejected an experience where the agent moved too quickly from a request into execution."
  - "That direction looked efficient, but it hid scope, dependencies, assumptions, and failure handling."
  - "For enterprise admin work, speed is not useful if the user cannot tell what will change."
  - "I chose an always-plan-first model where the user could review and edit the contract before approving it."
  - "The more consequential the action, the more evidence and explicit permission the interface provides."

### 10. How did the working prototype influence the team?

- **Testing:** Craft used as an influence tool.
- **Answer to say (STAR):**
  - **Situation:** "Static screens made the agentic direction look plausible, but they could not show persistence, handoffs, execution, or recovery."
  - **Task:** "I needed stakeholders to experience the trust model as software."
  - **Action:** "I built a React prototype with chat, input, plan, execution, report, and Activity states."
  - **Action:** "In reviews, partners could point to the exact moment where control felt unclear or where more evidence was needed."
  - **Result:** "The feedback became more specific, the interaction model became more buildable, and the team gained alignment around the direction."
  - **Closer:** "The prototype did not just demonstrate the idea; it made trust testable."

### 11. What would you improve if you continued these projects?

- **Testing:** Honest reflection and learning orientation.
- **Answer to say:**
  - "For CHAI, I would connect adoption to more task-level outcomes: time to insight, successful resolution, and repeat use by workflow."
  - "For agentic work, I would validate plan comprehension, approval confidence, blocked states, and the usefulness of Activity after the work completes."
  - "I would also test how the model changes when rollback is impossible or when an action needs a second approver."
  - "The prototype created a direction; the next step is proving where users need more or less control."

## Questions to Ask the Principal UX Designer

- "What distinguishes a strong senior designer here from someone who is mainly a strong executor?"
- "Where does design have the most influence on product direction today?"
- "How does the team work through ambiguity when research, technical constraints, and roadmap pressure point in different directions?"
- "How are cross-product patterns created and adopted when several teams have different immediate needs?"
- "What part of my portfolio would you want to probe further to judge my fit for this team?"

## Lines to Remember

- "I influence by making the problem and tradeoffs concrete."
- "The first approach improved usability; the second addressed workflow fit."
- "The prototype made trust testable."
- "Project 1 is about context. Project 2 is about control."

