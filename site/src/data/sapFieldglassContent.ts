import type { Figure } from './chaiContent';

/**
 * SAP Fieldglass case study content.
 *
 * Source: Yankun's previous SAP Fieldglass portfolio pages
 * (`/sap_home` and `/sap_wm`), condensed into one concise showcase.
 */

export const header = {
  figNumber: 'fig. 04',
  title: 'SAP Fieldglass',
  subtitle:
    'Making a mission-critical workforce platform easier for occasional users.',
  yearRange: '2020 - 2024',
  context: 'SAP Fieldglass - External workforce management',
  role: 'UX Designer',
  heroImage: {
    src: '/images/sap-fieldglass/homepage-hero.png',
    alt: 'Several SAP Fieldglass dashboard concepts arranged as overlapping product screens.',
  },
} as const;

export const prose = {
  opening: [
    'SAP Fieldglass is an enterprise SaaS platform for managing external workers, vendors, and statements of work at scale.',
    'My work focused on a simple tension: hiring managers were a major user group, but many of them did not live in the product every day. Fieldglass had to make the next action obvious without asking them to become power users.',
  ],
  reframe: [
    'The first asks were narrower: update homepage widgets for SAP UI5, improve Global Search, and refresh worker details. Research pointed to a different opportunity. Search was hard to improve without heavy backend work, and it still did not help users decide what to do next.',
    'I regrouped with the PM and engineering lead and proposed a dashboard direction instead: role-based templates, surfaced work items, worker signals, and actions grounded where the user already was.',
  ],
  homepage: [
    'I mapped four core personas - Hiring Manager, PMO, Financial Approver, and System Admin - to their top jobs, then translated those jobs into template layouts.',
    'The homepage became a modular SAP UI5 card framework. Customers could start with a best-practice layout and then use a layout manager to tailor the experience by role.',
  ],
  worker: [
    'For hiring managers, I designed a worker dashboard that gathered the information they usually had to hunt for: worker status, pending tasks, key dates, spend signals, and team-level alerts.',
    'The important shift was in-place action. The To-dos area showed what needed attention and kept the work on the dashboard instead of sending users through search or reports.',
  ],
  profile: [
    'I also redesigned the worker profile overview into scannable cards. Status, spend, work order duration, timesheets, documents, and alerts all became visible in one pass.',
    'The profile page was not trying to be lighter. It was trying to make a dense object legible faster.',
  ],
  outcome: [
    'The redesigned homepage launched as a modular framework and was adopted by more than 1,000 enterprise customers.',
    'The durable result was a stronger default path: the right work, worker context, and role-specific shortcuts were available before users had to configure anything.',
  ],
  reflection: [
    'This project taught me to treat technical migrations as leverage. A UI framework update can stay cosmetic, or it can become a chance to change what the product asks of users.',
    'For enterprise software, configuration is not the answer until the default is good. The best defaults carry expertise quietly: the right actions, data, and escape hatches already in the first view.',
  ],
} as const;

export const figures = {
  searchReframe: {
    src: '/images/sap-fieldglass/worker-dashboard.png',
    caption: 'fig. 04.01 - reframing the ask from search to dashboard navigation',
    alt: 'A comparison slide showing Global Search on the left and a proposed Worker Dashboard and Worker Profile path on the right.',
    width: 'column',
  },
  personaMapping: {
    src: '/images/sap-fieldglass/homepage-layout.png',
    caption: 'fig. 04.02 - persona mapping translated tasks into role-based templates',
    alt: 'Persona boards for PMO, hiring manager, procurement manager, and admin user, with key tasks and homepage widget needs.',
    width: 'column',
  },
  widgetSystem: {
    src: '/images/sap-fieldglass/homepage-widgets.png',
    caption: 'fig. 04.03 - widget audit and redesign principles',
    alt: 'A design principles slide showing revamped SAP Fieldglass widgets for action-oriented hierarchy and accessibility.',
    width: 'column',
  },
  todos: {
    src: '/images/sap-fieldglass/worker-todos.png',
    caption: 'fig. 04.04 - in-place actions for worker tasks',
    alt: 'SAP Fieldglass dashboard detail showing a To-dos section for worker-related tasks and actions.',
    width: 'column',
  },
  insights: {
    src: '/images/sap-fieldglass/worker-insights.png',
    caption: 'fig. 04.05 - worker insights without running a report',
    alt: 'SAP Fieldglass worker insights dashboard showing key metrics for hiring managers.',
    width: 'column',
  },
  profile: {
    src: '/images/sap-fieldglass/worker-profile.png',
    caption: 'fig. 04.06 - worker profile overview reorganized into cards',
    alt: 'SAP Fieldglass worker profile page with overview cards for action items, spend, duration, timesheets, and documents.',
    width: 'column',
  },
} as const satisfies Record<string, Figure>;

export const sections = [
  { id: 'opening', label: 'Opening' },
  { id: 'reframe', label: 'Reframe' },
  { id: 'homepage', label: 'Homepage' },
  { id: 'worker', label: 'Worker' },
  { id: 'profile', label: 'Profile' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'credits', label: 'Credits' },
] as const;

export const credits = {
  design: 'UX design across homepage framework, worker dashboard, and worker profile overview',
  partners: ['Product management', 'Engineering', 'Research', 'Leadership stakeholders'],
} as const;
