/**
 * CV content — single source of truth for the /cv page.
 *
 * Voice note (hybrid, per decisions-log):
 * - `intro` is first-person, reflective, written by Yankun.
 * - `role.bullets` are résumé-voice, verbatim from the PDF with small typo fixes flagged below.
 *
 * Typo fixes against the uploaded PDF (all logged in 00-brief/decisions-log.md):
 * - "clearer clearer" → "clearer" (intern bullet 1)
 * - "data-drivenAI" → "data-driven AI" (SAP bullet 3)
 * - "Palo Alto,CA" → "Palo Alto, CA" (SAP location)
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
  phone: '(734) 548-7871',
  email: 'yankunux@gmail.com',
  portfolio: 'yankun.one',
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
      'Own end-to-end design of an AI assistant for IT admins in Webex Control Hub; grew adoption 3% → 18% by redesigning entry points, onboarding, and the analytics landing experience.',
      'Integrated an AI assistant into existing analytics dashboards and reports, enabling IT admins to surface insights, interpret complex data, and troubleshoot issues through natural-language interactions instead of manual analysis.',
      'Lead interaction design for agentic AI workflows and generative UI: defined human-in-the-loop patterns, transparent working steps, and a reusable widget library adopted as a scalable design framework.',
      'Reduced enterprise search no-result rate by 86% through iterative query-log analysis and an LLM-based retrieval-and-ranking layer.',
      'Prototype rapidly with GenAI tools (Cursor, v0, Figma Make) to build interactive, system-driven prototypes; shipped an internal Figma plugin to boost design team throughput.',
    ],
  },
  {
    id: 'sap',
    company: 'SAP',
    title: 'UX Designer',
    location: 'Palo Alto, CA',
    range: '2020 — 2024',
    start: '2020-07',
    end: '2024-07',
    summary:
      'Four years on SAP Fieldglass — a contingent workforce platform where every screen was somebody\u2019s hiring cycle.',
    bullets: [
      'Led UX across a contingent workforce management platform in a complex cross-functional org — research, journey mapping, wireframing, prototyping, and engineering handoff.',
      'Redesigned Homepage, My Worker, and SoW dashboards into modular, role-based layouts with configurable data views, improving task completion for procurement and hiring managers.',
      'Designed data-driven AI features: automated resume ranking with scoring visualizations and AI-assisted procurement descriptions, reducing hiring-cycle time.',
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
      'Improved educational web apps with clearer data visualizations.',
      'Helped build the team\u2019s first design system with new visualization and interaction patterns.',
    ],
  },
];

export const metrics: CvMetric[] = [
  {
    id: 'adoption',
    figure: '18',
    suffix: '%',
    countTo: 18,
    caption: 'CHAI adoption, up from 3%. Control Hub AI, 2024–25.',
    anchor: 'cisco',
  },
  {
    id: 'search',
    figure: '86',
    suffix: '%',
    countTo: 86,
    caption: 'drop in dead-end searches. Enterprise search rework.',
    anchor: 'cisco',
  },
];

export const skillGroups: CvSkillGroup[] = [
  {
    label: 'Product & Interaction Design',
    skills: [
      'End-to-end product design',
      'Interaction design',
      'Information architecture',
      'Design systems',
      'Accessibility (WCAG)',
      'Motion / interaction prototyping',
    ],
  },
  {
    label: 'AI Product Design',
    skills: [
      'LLM / GenAI UX',
      'Agentic workflows',
      'Conversational UX',
      'RAG / search UX',
      'Trust & safety patterns',
    ],
  },
  {
    label: 'Research & Validation',
    skills: [
      'Problem framing',
      'User interviews',
      'Usability testing',
      'Rapid concept validation',
      'Design reviews',
    ],
  },
  {
    label: 'Tools & Systems',
    skills: ['Figma', 'Framer', 'Cursor', 'v0', 'HTML / CSS'],
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
