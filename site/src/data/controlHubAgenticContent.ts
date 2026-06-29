import type { Figure } from './chaiContent';

/**
 * Control Hub Agentic case study content.
 *
 * Source: 01-content/control-hub-agentic-outline.md.
 *
 * Draft prose is based on Yankun's 2026-05-18 notes and should be treated as
 * editable case-study copy until the final screen assets land.
 */

export type ProseSlot = readonly string[] | null;

export const header = {
  figNumber: 'fig. 02',
  title: 'Control Hub Agentic',
  subtitle:
    'Designing agnetic AI experience inside an enterprise admin console.',
  yearRange: '2026',
  context: 'Cisco Webex · Control Hub',
  role: 'Product Designer, design lead',
  heroImage: {
    src: '/canvas/mockups/control-hub-agentic.png',
    alt: 'Control Hub Agentic prototype preview on the portfolio canvas.',
  },
} as const;

export const prose = {
  opening: [
    'The clearest feedback on the agentic prototype was not resistance to AI. It was a need for Control Hub to still feel like Control Hub.',
    'Admins could see the value of an assistant that planned work, checked dependencies, and handled repetitive tasks. But they did not want a new AI surface that took the console away from them. They wanted a recognizable home base, with the agent working inside it.',
    'One line stayed with me: "I could see it making Control Hub even easier to use for users that aren\'t in it every day."',
  ],
  context: [
    'After CHAI, the product and design team wanted a north star for agentic AI inside Control Hub. The goal was not a generic assistant demo. It was a vision grounded in real admin work: where AI should live, how it should plan, when it should ask for approval, and how every action should remain visible afterward.',
  ],
  framework: [
    'I organized the experience around four surfaces: Chat, Insights, Workflow, and Activity.',
    'Chat stayed the main interface because admins often start with intent, not a form. Insights made the system proactive by surfacing important changes and risks in context. Workflow handled repeatable tasks through a sequence of skills, checks, and approval moments. Activity made the agent accountable by recording what it did, what the admin approved, and what changed.',
  ],
  compare: [
    'One proof was location comparison. An admin could ask Control Hub to compare Austin and San Jose, then align settings while preserving a local exception, like Austin\'s emergency callback number.',
    'The benefit is consistency without flattening context. The AI does the comparison work; the admin keeps judgment over what should change.',
  ],
  onboard: [
    'Device onboarding showed why chat alone was not enough. The agent could gather missing inputs, check device and workspace requirements, recommend settings, run a test batch, and only then proceed after approval.',
    'The admin no longer had to babysit every field, but they could still review the plan, understand the assumptions, and stop the run if something looked wrong.',
  ],
  deleteLine: [
    'The highest-trust proof was deleting a virtual line. The agent did not jump straight to deletion; it went to the virtual line details page, checked dependencies, and showed what would be affected.',
    'Then it offered choices: remove dependencies and delete, reassign dependencies first, or cancel. The agent worked with context across Control Hub, but the human still made the important decision.',
  ],
  craft: [
    'I built a fully interactive prototype with Cursor, Codex, and Claude Code so people could react to the experience as software, not as a slide. The prototype tested how chat handed off to workflow, how plans persisted, how execution states behaved, and how Activity recorded the work afterward.',
    'The speed mattered because the feedback became more specific. We could watch where trust broke, tighten the model, and share the AI-assisted prototyping process with the team.',
  ],
  outcome: [
    'The prototype helped get stakeholder buy-in to demo the direction at Cisco Live US 2026 and gave the team a concrete path for the next phase of AI in Control Hub.',
    'The conversation moved from "how autonomous should AI be?" to "what contract is the admin approving?" That shift turned agentic AI into buildable patterns: proactive insights, editable plans, human approval, visible execution, and audit.',
  ],
  reflection: [
    'I came out of this work less interested in autonomy as a concept and more interested in accountability as an interface. Enterprise AI becomes trustworthy when its assumptions are visible, its plans are editable, its actions are bounded, and its history is easy to inspect.',
    'The more consequential the action, the quieter the UI needs to become. No theater. Just enough intelligence to reduce the admin\'s burden, and enough structure to keep them in control.',
  ],
} as const satisfies Record<string, ProseSlot>;

export const thesis = {
  phrase:
    'I designed the contracts that let AI act in an enterprise admin system without taking control away from the admin.',
  attribution: 'Working thesis from the project outline',
} as const;

export const contracts = [
  {
    title: 'Chat',
    description: 'The front door for fuzzy intent and contextual reasoning.',
  },
  {
    title: 'Widgets',
    description: 'Structured interaction when a prose answer is not enough.',
  },
  {
    title: 'Plan review',
    description: 'A commit moment where the admin approves the contract.',
  },
  {
    title: 'Execution',
    description: 'Visible, interruptible, and reversible where possible.',
  },
  {
    title: 'Activity',
    description: 'The audit trail inside Control Hub, not a separate AI log.',
  },
] as const;

export const framework = [
  {
    label: 'Chat',
    caption: 'Open-ended questions, fuzzy intent, and contextual reasoning.',
  },
  {
    label: 'Insights',
    caption: 'Contextual findings that explain what the system sees before it acts.',
  },
  {
    label: 'Workflow',
    caption: 'Structured execution for repeatable, multi-step admin jobs.',
  },
  {
    label: 'Activity',
    caption: 'A record of what the agent did, what the admin approved, and what changed.',
  },
] as const;

export const proofs = {
  compare: {
    title: 'Compare Locations',
    summary:
      'The lightest agency proof: the admin steers in language while the agent fetches, compares, and proposes.',
    job: 'Compare calling settings between Austin and San Jose, then align Austin while preserving a site-specific exception.',
    contract:
      'Editable intent stays in conversation; the agent proposes, but the admin decides what changes.',
  },
  onboard: {
    title: 'Device Onboarding',
    summary:
      'A chat-to-workflow handoff where the plan becomes a reviewable artifact before execution.',
    job: 'Onboard a batch of hot-desk or room devices without forcing admins through CSV retries and conditional setup fields.',
    contract:
      'The plan captures action sequence, assumptions, validation, failure handling, and a test batch before full execution.',
  },
  deleteLine: {
    title: 'Delete Virtual Line',
    summary:
      'The high-trust proof: investigate dependencies first, show alternatives, then act.',
    job: 'Delete the Billing Hotline virtual line only after checking connected attendants, queues, forwarding paths, users, and number ownership.',
    contract:
      'A destructive action earns approval by making system dependencies visible and recording the decision in Activity.',
  },
  craft: {
    title: 'Prototype Craft',
    summary:
      'A working React prototype encoded the rules behind chat, workflows, widget states, and reporting.',
    job: 'Make agentic work feel like real Control Hub software, not a theatrical AI demo.',
    contract:
      'The more powerful the action, the quieter the UI becomes: numbered steps, disclosures, and one clear CTA.',
  },
} as const;

export const figures = {
  aiHome: {
    src: '/images/control-hub-agentic/ai-first-overview.png',
    caption: 'AI-first overview',
    alt: 'Control Hub Agentic AI Home or Assistant tab, showing the agentic surface within Control Hub.',
    width: 'column',
  },
  frameworkChat: {
    src: '/images/control-hub-agentic/framework-chat.png',
    caption: 'Chat — fuzzy intent and contextual reasoning',
    alt: 'Control Hub Agentic chat surface for open-ended admin intent and contextual reasoning.',
    width: 'column',
  },
  frameworkInsights: {
    src: '/images/control-hub-agentic/framework-insights.png',
    caption: 'Insights — what the agent sees before it acts',
    alt: 'Control Hub Agentic insights surface showing contextual findings before an action is planned.',
    width: 'column',
  },
  frameworkAgents: {
    src: '/images/control-hub-agentic/framework-agents-1.png',
    srcs: [
      '/images/control-hub-agentic/framework-agents-1.png',
      '/images/control-hub-agentic/framework-agents-2.png',
    ],
    caption: 'Agents — structured execution for multi-step jobs',
    alt: 'Control Hub Agentic agents surface showing structured execution for a multi-step admin job.',
    width: 'column',
  },
  frameworkSkills: {
    src: '/images/control-hub-agentic/framework-skills.png',
    caption: 'Skills — manage what your agents can do',
    alt: 'Control Hub Agentic skills surface for managing the capabilities available to agents.',
    width: 'column',
  },
  frameworkActivity: {
    src: '/images/control-hub-agentic/framework-activity.png',
    caption: 'Activity — audit trail for approvals and changes',
    alt: 'Control Hub Agentic activity surface showing agent actions, admin approvals, and resulting changes.',
    width: 'column',
  },
  compare: {
    src: '/images/control-hub-agentic/compare-locations.png',
    caption: 'Compare Locations — plan editing in conversation',
    alt: 'Chat comparison table showing differences between two locations and an exception instruction.',
    width: 'column',
  },
  onboardingPlan: {
    src: '/images/control-hub-agentic/device-onboarding-plan.png',
    caption: 'Device onboarding — plan canvas before commit',
    alt: 'Device onboarding plan canvas showing steps, safety assumptions, and approval controls.',
    width: 'column',
  },
  onboardingRun: {
    src: '/images/control-hub-agentic/device-onboarding-run.png',
    caption: 'Device onboarding — test batch and execution widget',
    alt: 'Execution widget showing a test batch before full device onboarding.',
    width: 'column',
  },
  dependencyMap: {
    src: '/images/control-hub-agentic/delete-virtual-line-dependencies.png',
    caption: 'Delete Virtual Line — dependency review before action',
    alt: 'Dependency list for a virtual line before deletion, showing connected calling surfaces.',
    width: 'column',
  },
  activity: {
    src: '/images/control-hub-agentic/delete-virtual-line-docked.png',
    caption: 'Delete Virtual Line — docked dependency review before action',
    alt: 'Control Hub Activity entry showing agent actions, admin approval, and resulting system changes.',
    width: 'column',
  },
  widgetAnatomy: {
    src: '/images/control-hub-agentic/prototype-craft.png',
    caption: 'Building the prototype — Cursor, Codex, and Claude Code',
    alt: 'Building the prototype — Cursor, Codex, and Claude Code.',
    width: 'column',
  },
  outcome: {
    src: '/images/control-hub-agentic/framework-review.png',
    caption: 'Framework review — direction-setting prototype for leadership',
    alt: 'Final framework or review slide summarizing the Control Hub Agentic direction.',
    width: 'column',
  },
} as const satisfies Record<string, Figure>;

export const credits = {
  design: 'Product design lead — interaction model, prototype, design system patterns',
  partners: ['Product Management', 'Engineering', 'Design leadership'],
} as const;

export const sections = [
  { id: 'opening', label: 'Opening' },
  { id: 'context', label: 'Context' },
  { id: 'framework', label: 'Framework' },
  { id: 'compare', label: 'Compare' },
  { id: 'onboard', label: 'Onboard' },
  { id: 'delete', label: 'Delete' },
  { id: 'craft', label: 'Craft' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'credits', label: 'Credits' },
] as const;
