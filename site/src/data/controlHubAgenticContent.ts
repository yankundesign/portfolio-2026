import type { Figure } from './chaiContent';

/**
 * Control Hub Agentic case study content.
 *
 * Source: 01-content/control-hub-agentic-outline.md.
 *
 * The outline is structural, not final prose. Prose slots intentionally remain
 * null so the page renders explicit TodoSlots instead of AI-written essay copy.
 */

export type ProseSlot = readonly string[] | null;

export const header = {
  figNumber: 'fig. 02',
  title: 'Control Hub Agentic',
  subtitle:
    'Designing how AI plans, acts, and stays accountable inside an enterprise admin console.',
  yearRange: '2026',
  context: 'Cisco Webex · Control Hub',
  role: 'Product Designer, design lead',
  heroImage: {
    src: '/canvas/mockups/control-hub-agentic.png',
    alt: 'Control Hub Agentic prototype preview on the portfolio canvas.',
  },
} as const;

export const prose = {
  opening: null,
  context: null,
  framework: null,
  compare: null,
  onboard: null,
  deleteLine: null,
  craft: null,
  outcome: null,
  reflection: null,
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
    src: '/images/control-hub-agentic/ai-home.png',
    caption: 'AI Home / Assistant tab — additive to Control Hub, not a replacement for it',
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
  frameworkWorkflow: {
    src: '/images/control-hub-agentic/framework-workflow.png',
    caption: 'Workflow — structured execution for multi-step jobs',
    alt: 'Control Hub Agentic workflow surface showing a structured plan for a multi-step admin job.',
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
    src: '/images/control-hub-agentic/activity-audit.png',
    caption: 'Activity — audit trail after the agentic action',
    alt: 'Control Hub Activity entry showing agent actions, admin approval, and resulting system changes.',
    width: 'column',
  },
  widgetAnatomy: {
    src: '/images/control-hub-agentic/widget-anatomy.png',
    caption: 'Widget anatomy — Input / Plan / Execution / Report',
    alt: 'Widget anatomy strip showing the Input, Plan, Execution, and Report states.',
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
