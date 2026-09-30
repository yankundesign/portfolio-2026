/**
 * CHAI case study content.
 *
 * This file is the single source of truth for text and structural content on
 * the CHAI project detail page. The layout (site/src/components/project/
 * ChaiProject.tsx) pulls from here.
 *
 * Prose slots awaiting Yankun's writing are `null`. The layout renders a
 * visible TodoSlot in their place — never lorem ipsum (hard rule, CLAUDE.md).
 *
 * Metrics, captions, figure numbers, and credits are all locked and live
 * here verbatim.
 *
 * Voice rules: `.claude/rules/voice.md`. Writing outline: `01-content/chai.md`.
 */

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export const header = {
  figNumber: 'fig. 01',
  title: 'Control Hub AI Assistant',
  subtitle: 'An AI assistant for IT admins navigating a labyrinthine console',
  yearRange: '2024 — present',
  context: 'Cisco Webex · Control Hub',
  role: 'Product Designer, sole design lead',
  heroImage: {
    src: '/images/chai/hero.png',
    alt: 'CHAI in Webex Control Hub — the assistant in its native console.',
  },
} as const;

// ---------------------------------------------------------------------------
// Prose slots
// ---------------------------------------------------------------------------
//
// A ProseSlot is either an array of paragraphs (final or draft) or null
// (not yet written). The layout checks for null and renders a TodoSlot
// with a reference to the outline beat.
// ---------------------------------------------------------------------------

export type ProseSlot = readonly string[] | null;

/** Beat 1 — the opening moment. Week after CHAI v1 launched. */
export const openingProse: ProseSlot = [
  "The week after CHAI v1.0 shipped, I sat with three admins and watched them ignore it.",
  "The empty state offered three canned prompts. The answer state returned a numbered procedure. Neither was wrong. Neither was useful enough to change how they worked.",
];

/** Beat 2 — context. What Control Hub is, what CHAI was. */
export const contextProse: ProseSlot = [
  "Control Hub is where Webex admins configure services, monitor usage, troubleshoot devices, and keep a large organization running. A bad day there is not one confusing setting. It is too many dashboards, too many signals, and not enough time to understand what matters.",
  "In June 2024 the team introduced the first cut of the Control Hub AI Assistant (CHAI) as a help-only chatbot inside that console.",
];

/** Beat 3 — Road map. Why three releases, how the work was paced. */
export const roadmapProse: ProseSlot = [
  "I framed the roadmap around three jobs: find information, understand what is happening, and fix problems. As CHAI grew, each job expanded into a different kind of skill. The hard question was no longer what else the assistant could do. It was how to make those capabilities legible enough for admins to trust them.",
];

/** Beat 4 — Evolution from 1.0 → 2.0 → 3.0. Lead paragraph; the three plates carry the rest. */
export const evolutionProse: ProseSlot = [
  "CHAI 1.0 was close to a basic Q&A assistant: static prompts, no thread history, and answers that felt detached from the surface around them. For 2.0, I led the redesign around threaded conversations, better suggested prompts, and a more consistent interaction language. That made the assistant easier to use, but it also exposed the bigger problem: the more capable CHAI became, the less obvious it was what someone should ask it to do.",
  "The move in 3.0 was to stop treating the assistant as one blank box. I redesigned it around clearer entry points and skills, so the assistant could meet admins inside search, reports, dashboards, and device workflows instead of waiting for the perfect prompt.",
];

/** Beat 5 — Smart Search. */
export const smartSearchProse: ProseSlot = [
  "Search was already where admins went when they did not know where a setting lived. Instead of asking people to go find the AI, I put AI into that existing workflow. An admin could type a natural-language query, get the right setting back through an LLM match, and see enough surrounding context to decide whether it was the thing they needed.",
  "The important design call was the handoff. Suggested questions appeared directly inside the search result, and clicking one opened CHAI with the search context intact. Search became an entry point into conversation, not a dead end.",
];

/** Beat 6.1 — Report analysis → data analysis → widget system. */
export const reportDataAnalysisProse: ProseSlot = [
  "Report Analysis started with the report itself. I added an AI entry point to each report row, bringing the first read into Control Hub instead of sending admins back to CSVs and spreadsheets.",
  "Data Analysis extended that model to live analytics. As the outputs grew beyond prose, I built a reusable widget system for charts, tables, sources, diagnoses, and next steps—giving each response the structure that fit the work.",
];

/** Beat 6.2 — Custom report generation. Reframe: from report→insights to AI-generated reports. */
export const customReportProse: ProseSlot = [
  "Custom reports flipped the workflow again. Instead of creating a report, waiting for output, and then asking CHAI for insight, admins could describe the report they wanted in natural language. CHAI translated that prompt into a structured report artifact.",
  "The artifact layout was the trust mechanism. It let users review the selected metrics, dimensions, filters, and schedule before committing. The efficiency gain was not just fewer clicks. It changed report building from a form-heavy setup task into a guided authoring flow where the admin still had control.",
];

/** Beat 7 — Active troubleshooting with AI-generated insights. */
export const aiInsightsProse: ProseSlot = [
  "Troubleshooting in Control Hub was reactive: admins had to know where to look after something went wrong. I used AI as the foundation for a more proactive model. Each insight brought the issue, likely root cause, supporting evidence, and a recommended action into one place.",
  "Proactive did not mean automatic. Admins could tune sensitivity, choose who and what to monitor, select insight categories, and inspect the rule and trigger history behind each insight.",
];

/** Beat 8 — Outcome. What 3% → 18% means in lived terms. */
export const outcomeProse: ProseSlot = [
  "The number I care about is not that more people opened a chatbot. It is that admins began entering CHAI from the moments where Control Hub became too dense to read alone: a failed search, a delivered report, a live dashboard, a device issue.",
  "Monthly adoption moved from 3% to 18% because the assistant stopped feeling like a separate destination. It became a layer of help attached to the work.",
];

/** Beat 9 — Next. Transition to the Control Hub Agentic Experience case study. */
export const nextProse: ProseSlot = [
  "CHAI taught me that enterprise AI cannot depend on one blank input and a user's perfect prompt. It needs context, clear entry points, and a way to show how it got there. The agentic work picks up from that point: not just answering inside the console, but taking bounded steps through it with the admin still in control.",
];

// ---------------------------------------------------------------------------
// Thesis pull quote (LOCKED — kept for potential reuse, currently unplaced)
// ---------------------------------------------------------------------------

export const thesisQuote = {
  phrase:
    "Don't just give me the answer. Explain how you got there.",
  attribution: 'Heard in a research session, testing report analysis',
} as const;

// ---------------------------------------------------------------------------
// Section summaries (the italic line beneath the SectionHeader label)
// ---------------------------------------------------------------------------

export const proofs = {
  smartSearch: {
    title: 'Smart Search',
    summary: 'A tunnel affordance that turns a query into a conversation.',
  },
  reportAnalysis: {
    title: 'Report Analysis',
    summary: 'From report analysis to live data, then a reusable system for how insight appears.',
  },
  aiInsights: {
    title: 'AI-generated insights',
    summary: 'AI-generated insights surface emerging issues, explain why they matter, and recommend what to do next.',
  },
  evolution: {
    title: 'Evolution',
    summary: 'CHAI 1.0 → 2.0 → 3.0 — three releases, three reframings.',
  },
  next: {
    title: 'Next: Control Hub Agentic',
    summary: 'Where CHAI takes the work from here — picked up in the next case study.',
  },
} as const;

// ---------------------------------------------------------------------------
// Figures — editorial plates
// ---------------------------------------------------------------------------
//
// `src` paths expect images at site/public/images/chai/. A missing image is
// rendered as a framed placeholder by EditorialPlate — the page structure
// still holds.
//
// Figure numbering is sequential by reading order. If you reorder sections
// or add/remove plates, renumber captions to match.
// ---------------------------------------------------------------------------

export interface Figure {
  src: string;
  /**
   * Optional additional images stacked vertically inside one plate frame,
   * sharing a single caption. When set, these images render in order
   * (use `src` as the first when you want it included); a 1px ink rule
   * divides each stacked image.
   */
  srcs?: string[];
  caption: string;
  alt: string;
  /** Optional internal route that makes the plate image and caption navigable. */
  linkTo?: string;
  /** Plate width: 'column' (inside prose col), 'medium' (breaks out), 'wide' (page width). */
  width?: 'column' | 'medium' | 'wide';
}

export const figures = {
  // Beat 1 · Opening
  chai10: {
    src: '/images/chai/chai-1-0.png',
    caption: 'CHAI V1.0 (Not my design)',
    alt:
      'Two side-by-side screenshots of the Cisco AI Assistant sidebar. Left panel shows an empty state with a welcome message and three suggested questions. Right panel shows a conversation where the user asks "How do I configure SSO?" and receives a seven-step numbered answer.',
    width: 'column',
  },

  // Beat 2 · Context
  context: {
    src: '/images/chai/context.png',
    caption: 'Webex Control Hub — the console CHAI sits inside',
    alt: 'Control Hub overview screen showing the navigation tree, monitoring widgets, and admin controls.',
    width: 'column',
  },

  // Beat 3 · Road Map
  roadmap: {
    src: '/images/chai/roadmap.png',
    caption: 'Roadmap — three releases shaping the work',
    alt: 'Internal roadmap showing CHAI 1.0, 2.0, and 3.0 releases plotted across quarters.',
    width: 'column',
  },

  // Beat 4 · Evolution (4 images, stacked in reading order)
  evolution10: {
    src: '/images/chai/chai-1.0-2.0.png',
    caption: 'CHAI 1.0 -> CHAI 2.0',
    alt: 'Side-by-side comparison of CHAI 1.0 and CHAI 2.0, showing the redesigned home, recent threads, and contextual answer states.',
    width: 'column',
  },
  evolution20: {
    src: '/images/chai/chai-3-0.png',
    caption: 'Control Hub AI Assistant - Docked view',
    alt: 'Four docked Control Hub AI Assistant states showing the home screen, expanded suggestions, tools menu, and a device-list response.',
    width: 'column',
  },
  evolutionFloating: {
    src: '/images/chai/chai-floating.png',
    caption: 'Control Hub AI Assistant - Floating Window view',
    alt: 'Control Hub AI Assistant displayed in a floating window over the Control Hub overview screen.',
    width: 'column',
  },
  evolution30: {
    src: '/images/chai/chai-3.0-full.png',
    caption: 'Control Hub AI Assistant - Full-page view',
    alt: 'Two full-page Control Hub AI Assistant states showing the home screen and an analytical conversation with a calling and meeting engagement chart.',
    width: 'column',
  },

  // Beat 5 · Smart Search
  smartSearch: {
    src: '/images/chai/smart-search.png',
    caption: 'Smart Search with contextual tunnel',
    alt:
      'Smart Search results showing the contextual tunnel affordance — follow-up questions surfacing beneath the primary results.',
    width: 'column',
  },

  // Beat 6.1 · Report analysis → data analysis → widget system
  reportAnalysis: {
    src: '/images/chai/report-kickoff.png',
    caption: 'Report analysis — insight alongside the report',
    alt: 'Control Hub Reports list with the AI Assistant opening analysis for a selected report and returning a visualization.',
    width: 'column',
  },
  dataAnalysis: {
    src: '/images/chai/data-analysis.png',
    caption: 'Data analysis — querying the data lake directly',
    alt: 'CHAI returning a generated visualization in response to a natural-language data question, sourced directly from the underlying data lake.',
    width: 'column',
  },
  widgetSystem: {
    src: '/images/chai/widget-system.png',
    caption: 'Widget system — data, evidence, and action',
    alt: 'A reusable Control Hub AI Assistant widget system showing data visualizations, source cards, troubleshooting evidence, action plans, suggested actions, and configuration updates.',
    width: 'column',
  },

  // Beat 6.2 · Report Analysis · Custom report generation (2 images)
  customReport1: {
    src: '/images/chai/custom-report-1.png',
    caption: 'Custom report — describing the question',
    alt: 'CHAI prompting the user to describe what kind of report they want, with parameter scaffolding inline.',
    width: 'column',
  },
  customReport2: {
    src: '/images/chai/custom-report-2.png',
    caption: 'Custom report — generated output',
    alt: 'A CHAI-generated report rendered in the standard Control Hub report format, ready for review and export.',
    width: 'column',
  },

  // Beat 7 · Active troubleshooting
  aiInsights: {
    src: '/images/chai/ai-insights.png',
    caption: 'AI-generated insights — proactive troubleshooting with adjustable rules',
    alt: 'Two Control Hub Notifications screens: an AI-generated insight with root-cause evidence and a recommended action, followed by configuration controls for sensitivity, monitored people and devices, insight categories, and retention.',
    width: 'wide',
  },

  // Beat 9 · Next
  nextPreview: {
    src: '/canvas/mockups/control-hub-agentic.png',
    caption: 'Next — Control Hub Agentic',
    alt: 'Preview frame of the next case study: Control Hub Agentic Experience.',
    linkTo: '/works/control-hub-agentic',
    width: 'column',
  },
} as const satisfies Record<string, Figure>;

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export const metrics = {
  /** Headline metric — the outcome moment. */
  adoption: {
    before: 3,
    after: 18,
    suffix: '%',
    label: 'Monthly adoption',
    context: 'CHAI across Control Hub · 2024 — 2025',
  },
  /** Smart Search — inline proofs in Beat 5. */
  noResult: {
    figure: 86,
    suffix: '%',
    label: 'Drop in zero-result searches',
  },
  entryPoints: {
    figure: 14,
    suffix: '%',
    label: 'Of total assistant entry points',
  },
} as const;

// ---------------------------------------------------------------------------
// Credits (role only — no names, site-wide rule)
// ---------------------------------------------------------------------------

export const credits = {
  design: 'Sole design lead — research, ideation, interaction, visual, prototyping',
  partners: ['Product Management', 'Research', 'Engineering', 'Devices BU'],
} as const;

// ---------------------------------------------------------------------------
// Section rail — id + label for the sticky left nav.
//
// Each id matches the corresponding <section id="..."> in ChaiProject.tsx.
// Order matches reading order. Labels are sentence-case (the rail uses
// CSS text-transform to render them in mono caps, so they read naturally
// in the source).
//
// Report Analysis sub-beats (6.1, 6.2) are NOT in the rail — they
// live as sub-headers inside the Report Analysis section.
// ---------------------------------------------------------------------------

export const sections = [
  // { id: 'beat-1', label: 'Opening' },
  { id: 'beat-2', label: 'Context' },
  { id: 'roadmap', label: 'Road Map' },
  { id: 'evolution', label: 'Evolution' },
  { id: 'proof-1', label: 'Smart Search' },
  { id: 'proof-2', label: 'Report Analysis' },
  { id: 'proof-3', label: 'AI-generated insights' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'next', label: 'Next' },
  { id: 'credits', label: 'Credits' },
] as const;

// ---------------------------------------------------------------------------
// Marginalia (placeholder — Caveat is v1 stand-in for real handwriting)
// ---------------------------------------------------------------------------

export const marginalia = {
  opening: 'the week after launch',
  thesis: 'the line that moved the work',
  outcome: 'quietly',
} as const;
