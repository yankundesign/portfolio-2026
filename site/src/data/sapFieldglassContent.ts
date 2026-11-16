import type { Figure } from './chaiContent';
import type { Board } from './notebookCase';

/**
 * SAP Fieldglass case study content.
 *
 * Source: Yankun's previous SAP Fieldglass portfolio pages
 * (`/sap_home` and `/sap_wm`), condensed into one concise showcase.
 */

export const header = {
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
  widgetSystem: {
    src: '/images/sap-fieldglass/homepage-widgets.png',
    caption: 'Widget audit and redesign principles',
    alt: 'A design principles slide showing revamped SAP Fieldglass widgets for action-oriented hierarchy and accessibility.',
    width: 'column',
  },
  todos: {
    src: '/images/sap-fieldglass/worker-todos.png',
    caption: 'In-place actions for worker tasks',
    alt: 'SAP Fieldglass dashboard detail showing a To-dos section for worker-related tasks and actions.',
    width: 'column',
  },
  insights: {
    src: '/images/sap-fieldglass/worker-insights.png',
    caption: 'Worker insights without running a report',
    alt: 'SAP Fieldglass worker insights dashboard showing key metrics for hiring managers.',
    width: 'column',
  },
  profile: {
    src: '/images/sap-fieldglass/worker-profile.png',
    caption: 'Worker profile overview reorganized into cards',
    alt: 'SAP Fieldglass worker profile page with overview cards for action items, spend, duration, timesheets, and documents.',
    width: 'column',
  },
} as const satisfies Record<string, Figure>;

/**
 * The four role templates, one to a board, on the case study's ground
 * (ClothBoard). Each is a whole page at the column's width, taller than the
 * window (`tall`). The role names are the personas' from the research boards.
 */
export const homepageBoards: readonly Board[] = [
  {
    caption: 'Role-based homepage: PMO User',
    tall: true,
    screens: [
      {
        kind: 'image',
        src: '/images/sap-fieldglass/homepage-pmo.png',
        size: [1446, 1766],
        alt: 'The SAP Fieldglass homepage for a PMO user: pinned links, My Work Items, a PMO Monitor of critical and warning counts, an announcement, in-progress items, interviews, reports, a reference library and linked accounts.',
      },
    ],
  },
  {
    caption: 'Role-based homepage: Contingent Hiring Manager',
    tall: true,
    screens: [
      {
        kind: 'image',
        src: '/images/sap-fieldglass/homepage-hiring-manager.png',
        size: [1446, 1766],
        alt: 'The SAP Fieldglass homepage for a contingent hiring manager: pinned links, My Work Items, a get-started card, an announcement, My Workers with health status, My Job Postings, interviews, reports and a reference library.',
      },
    ],
  },
  {
    caption: 'Role-based homepage: Procurement Manager',
    tall: true,
    screens: [
      {
        kind: 'image',
        src: '/images/sap-fieldglass/homepage-procurement.png',
        size: [1446, 1282],
        alt: 'The SAP Fieldglass homepage for a procurement manager: statement-of-work links, a work items count, recent reports, an announcement, My Statements of Work with health status and a spend chart.',
      },
    ],
  },
  {
    caption: 'Role-based homepage: Admin User',
    tall: true,
    screens: [
      {
        kind: 'image',
        src: '/images/sap-fieldglass/homepage-admin.png',
        size: [1446, 1282],
        alt: 'The SAP Fieldglass homepage for an admin user: pinned links, dashboards, recent reports, a report table and two charts.',
      },
    ],
  },
];

export const sections = [
  { id: 'opening', label: 'Opening' },
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
