/**
 * CV content — single source of truth for the /cv page.
 *
 * Voice note (hybrid, per decisions-log):
 * - `intro` is first-person, reflective, written by Yankun.
 * - `role.bullets`, `projects`, and `skillGroups` are résumé-voice, verbatim
 *   from the October 2026 PDF (public/Yankun-Wang-CV-2026.pdf).
 */

export interface CvRole {
  id: string;
  company: string;
  title: string;
  location: string;
  /** Display range as shown in the margin, e.g. "2024 — Present" */
  range: string;
  /** Machine dates for sorting and metadata */
  start: string;
  end: string;
  /** Short one-line framing shown before bullets unfold */
  summary: string;
  bullets: string[];
}

export interface CvMetric {
  id: string;
  /** Numeric display. Use strings so we can show "3" or "86" or "18". */
  figure: string;
  /** Prefix/suffix characters for display (e.g. "%", "×"). */
  suffix?: string;
  /** Used only for count-up animation when the figure is a single integer. */
  countTo?: number;
  /** Caption underneath the number. */
  caption: string;
  /** Role id this metric belongs to, for visual anchoring. */
  anchor: string;
}

export interface CvProject {
  id: string;
  name: string;
  /** Italic descriptor after the name, e.g. "iOS app, live on the App Store" */
  kind: string;
  /** Year shown in the margin */
  year: string;
  /** Full range shown in the meta line, e.g. "Sep 2026 — Present" */
  range: string;
  description: string;
  /** Internal route ("/works/ebb") or external URL */
  href: string;
  linkLabel: string;
}

export interface CvSkillGroup {
  label: string;
  skills: string[];
}

export interface CvEducationEntry {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export const contact = {
  location: 'San Francisco Bay Area, CA',
  phone: '(734) 548-7871',
  email: 'yankunux@gmail.com',
  portfolio: 'yankun.design',
};

export const pdfHref = '/Yankun-Wang-CV-2026.pdf';
export const pdfDownloadName = 'Yankun-Wang-CV-2026.pdf';

export const intro =
  'Six years designing enterprise tools has convinced me the interesting work is almost always the same work — making complicated systems legible to the people who live inside them.';

export const roles: CvRole[] = [
  {
    id: 'cisco',
    company: 'Cisco Webex',
    title: 'Product Designer',
    location: 'Milpitas, CA',
    range: '2024 — Present',
    start: '2024-07',
    end: 'present',
    summary:
      'Designing an AI assistant inside Webex Control Hub — helping IT admins read the dashboards they already have.',
    bullets: [
      'Own end-to-end interaction design for the Control Hub AI Assistant, evolving it from a help bot into contextual assistance across search, reports, dashboards, and device workflows; grew monthly adoption from 3% to 18%.',
      'Designed Smart Search for enterprise admins from query-log analysis, LLM retrieval and ranking behavior, and user feedback, cutting search dead ends by 86%.',
      'Defined the interaction patterns for agentic AI in Control Hub: editable plans, human approval moments, visible execution, and audit trails for admin-controlled actions.',
      'Built the team’s AI-native design workflow: a prototyping playground on the product codebase, reusable AI skills, and Write Like Webex, a Figma plugin for UI copy. Moved the team from static mockups to live React prototypes.',
    ],
  },
  {
    id: 'sap',
    company: 'SAP Fieldglass',
    title: 'UX Designer',
    location: 'Palo Alto, CA',
    range: '2020 — 2024',
    start: '2020-07',
    end: '2024-07',
    summary:
      'Four years on SAP Fieldglass — a contingent workforce platform where every screen was somebody\u2019s hiring cycle.',
    bullets: [
      'Led design of modular homepage, worker dashboard, and worker profile patterns that surface pending tasks, spend signals, key dates, and role-specific actions; framework adopted by 1,000+ enterprise customers.',
      'Designed AI-assisted hiring and procurement concepts, including resume-ranking visualizations and generated procurement descriptions, to reduce manual decision prep in complex hiring workflows.',
    ],
  },
  {
    id: 'umich',
    company: 'University of Michigan — Center for Academic Innovation',
    title: 'UX Design Intern',
    location: 'Ann Arbor, MI',
    range: '2019',
    start: '2019-05',
    end: '2019-12',
    summary:
      'First design job — educational web apps and the team\u2019s first pass at a design system.',
    bullets: [
      'Designed educational web apps and helped build the team\u2019s first design system.',
    ],
  },
];

export const projects: CvProject[] = [
  {
    id: 'ebb',
    name: 'Ebb',
    kind: 'iOS app, live on the App Store',
    year: '2026',
    range: 'Jul 2026',
    description:
      'A three-breath pause before TikTok or Instagram opens, designed and built in SwiftUI in two weeks.',
    href: '/works/ebb',
    linkLabel: 'Read the case study',
  },
  {
    id: 'zao',
    name: 'ZAO',
    kind: 'Agent-friendly design system, in progress',
    year: '2026',
    range: 'Sep 2026 \u2014 Present',
    description: 'A React design system that gives AI coding agents fewer choices and clearer rules.',
    href: 'https://zaoui.dev/',
    linkLabel: 'zaoui.dev',
  },
];

export const metrics: CvMetric[] = [
  {
    id: 'adoption',
    figure: '18',
    suffix: '%',
    countTo: 18,
    caption: 'monthly CHAI adoption, up from 3%. Control Hub AI, 2024–25.',
    anchor: 'cisco',
  },
  {
    id: 'search',
    figure: '86',
    suffix: '%',
    countTo: 86,
    caption: 'drop in search dead ends. Smart Search for enterprise admins.',
    anchor: 'cisco',
  },
];

export const skillGroups: CvSkillGroup[] = [
  {
    label: 'Design',
    skills: [
      'Interaction design',
      'Prototyping',
      'Design systems',
      'Agentic AI UX',
      'User research',
      'Accessibility',
    ],
  },
  {
    label: 'Build',
    skills: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'SwiftUI', 'Claude', 'Codex', 'Cursor'],
  },
];

export const education: CvEducationEntry[] = [
  {
    institution: 'University of Michigan, Ann Arbor',
    degree: 'Master of Science',
    field: 'Human–Computer Interaction',
    year: '2020',
  },
  {
    institution: 'University of Michigan, Ann Arbor',
    degree: 'Bachelor of Science',
    field: 'Architecture',
    year: '2018',
  },
];
