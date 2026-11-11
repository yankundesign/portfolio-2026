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

import type { VideoFigure } from './ebbContent';

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
  heroVideo: {
    webm: '/canvas/previews/chai-preview.webm',
    mp4: '/canvas/previews/chai-preview.mp4',
    poster: '/canvas/mockups/chai.png',
    alt: 'CHAI interfaces moving from the assistant conversation to an expanded report and back.',
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

/** Beat 6.1 (cont.) — the entry grows to the Reports page once the model reads across reports. */
export const reportsEntryProse = {
  paragraphs: [
    'Then we improved the model, so the AI could read across reports, not just one. So the entry grew.',
  ],
  points: [
    'The Reports page got its own way in: ask across your recent reports.',
    'It only grew once the context was reliable.',
  ],
} as const;

/** Beat 6.2 — Custom report generation. Reframe: from report→insights to AI-generated reports. */
export const customReportProse: ProseSlot = [
  "Custom reports flipped the workflow again. Instead of creating a report, waiting for output, and then asking CHAI for insight, admins could describe the report they wanted in natural language. CHAI translated that prompt into a structured report artifact.",
  "The artifact layout was the trust mechanism. It let users review the selected metrics, dimensions, filters, and schedule before committing. The efficiency gain was not just fewer clicks. It changed report building from a form-heavy setup task into a guided authoring flow where the admin still had control.",
];

/** Beat 6.3 — Other features delivered for CHAI. */
export const otherFeaturesPoints = [
  'The Assistant for configuration questions, like comparing calling settings across two locations.',
  'And the Assistant for devices and workspaces: understand a device, find the issue, fix it.',
] as const;

/** Beat 7 — Active troubleshooting with AI-generated insights. */
export const aiInsightsProse: ProseSlot = [
  "Troubleshooting in Control Hub was reactive: admins had to know where to look after something went wrong. I used AI as the foundation for a more proactive model. Each insight brought the issue, likely root cause, supporting evidence, and a recommended action into one place.",
  "Proactive did not mean automatic. Admins could tune sensitivity, choose who and what to monitor, select insight categories, and inspect the rule and trigger history behind each insight.",
];

/** Beat 8 — Outcome. What 3% → 18% means in lived terms. */
export const outcomeProse: ProseSlot = [
  "Monthly adoption across Control Hub rose from 3% to 18% between 2024 and 2025. Over that period, I redesigned CHAI from a help-only chatbot into contextual entry points across search, reports, dashboards, and device workflows. The adoption figure covers CHAI across Control Hub; it doesn’t isolate the effect of any one feature.",
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
  /**
   * Plate width: 'column' (inside prose col), 'medium' (breaks out), 'wide'
   * (page width), 'plate' (the page's --plate-measure: the full body column,
   * capped so a 16:10 plate fits the viewport and never renders a screen
   * above its real size).
   */
  width?: 'column' | 'medium' | 'wide' | 'plate';
  /**
   * 'dashed' — another team's screen, or an option weighed and dropped.
   * Dashed rule, quieter frame: size and line weight show authorship.
   */
  variant?: 'dashed';
  /**
   * Stage the raw screen(s) on a mat the plate draws, instead of showing a
   * composition baked into one image. See PlateStage.
   */
  stage?: PlateStage;
  /** Ruled plate head above the frame. See PlateHead. */
  head?: PlateHead;
}

/**
 * A ruled plate head: an ink rule, then one mono line above the frame.
 *
 *   stage     the road map's Find → Understand → Fix (CHAI shorthand for
 *             a sequence)
 *   sequence  any fixed-position index — Ask → Plan → Run → Result,
 *             Explore → Turn → Bridge. Every item always shows, in the
 *             same positions on every plate; `current` is marked
 *   label     a version or surface name (CHAI 3.0 · Docked)
 *   meta      a date or range, right-aligned
 *   status    right-aligned, and only where a source states it (Shipped,
 *             Beta, not my design). Leave it out rather than guess.
 */
export interface PlateHead {
  stage?: 'find' | 'understand' | 'fix';
  sequence?: { name: string; items: readonly string[]; current: number };
  label?: string;
  meta?: string;
  status?: string;
}

/**
 * A staged plate. Screens arrive cropped tight (no baked background, no
 * padding); the plate owns the mat, the 16:10 shape and where the screens
 * sit, so every product shot on the page shares one stage.
 *
 *   tone   'paper' (paper-soft mat) for stills · 'ink' for motion
 *   sizes  natural pixel size of each screen, in `srcs` order (or `src`)
 *   align  'floor' rests screens on the plate's bottom edge (default);
 *          'center' floats them — for rows of tall panels or wide boards
 *   surface 'screen' (default) — an opaque capture, lifted with a shadow;
 *          'cutout' — transparent artwork (cards on no background) that
 *          sits straight on the mat: a box shadow would outline empty space
 *
 * Screens are never cropped and never enlarged past their native pixel
 * width (standing rule); a small capture sits smaller on the stage.
 */
export interface PlateStage {
  tone?: 'paper' | 'ink';
  sizes: readonly (readonly [number, number])[];
  align?: 'floor' | 'center';
  surface?: 'screen' | 'cutout';
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
    src: '/images/chai/context.webp',
    caption: 'Webex Control Hub — the console CHAI sits inside',
    alt: 'Two overlapping screenshots. Left: Control Hub Organization Settings, where admins set Webex app security, idle timeouts, and authenticated sign-in. Right: the Webex app, where everyone else works under those settings. Labels read "Admins set it here — Control Hub" and "Everyone else uses it here — Webex".',
    width: 'plate',
  },

  // Beat 3 · Road Map
  roadmap: {
    src: '/images/chai/roadmap-find-understand-fix.png',
    caption: 'Roadmap — three releases shaping the work',
    alt: 'Control Hub AI Assistant roadmap: Find, then Understand, then Fix, leading to Agentic AI, marked "(WIP) See project #2". Find branches to Help assistant and Smart search; Understand to Data analysis and Workspace & device; Fix to Troubleshooting and Configuration.',
    width: 'plate',
  },

  // Beat 4 · Evolution (stacked in reading order; the full-page pair sits 2-up)
  evolution10: {
    src: '/images/chai/chai-1.0-2.0-panels.png',
    caption: 'CHAI 1.0 -> CHAI 2.0',
    alt: 'CHAI 1.0 (2024.07) beside CHAI 2.0 (2025.05). CHAI 1.0: a welcome screen with three suggested questions, and a numbered answer to "How do I configure SSO?". CHAI 2.0: a personalized home with Explore prompts and recent threads, a threads drawer, and an answer to "How do I add new users using CSV?" with a linked setting and suggested prompts.',
    head: { label: 'CHAI 1.0 → 2.0', meta: '2024.07 → 2025.05', status: '1.0 not my design' },
    width: 'plate',
  },
  evolution20: {
    src: '/images/chai/staged/docked-home.png',
    srcs: [
      '/images/chai/staged/docked-home.png',
      '/images/chai/staged/docked-troubleshoot.png',
      '/images/chai/staged/docked-add-menu.png',
      '/images/chai/staged/docked-answer.png',
    ],
    caption: 'Control Hub AI Assistant - Docked view',
    alt: 'Four docked Control Hub AI Assistant states: the home screen, the Troubleshoot issues suggestions expanded, the add menu with files, agents, workflows, and prompts, and a response listing devices to refresh with a CSV download.',
    head: { label: 'CHAI 3.0 · Docked' },
    width: 'plate',
    stage: {
      sizes: [[962, 1960], [962, 1960], [962, 1960], [490, 983]],
      align: 'center',
    },
  },
  evolutionFloating: {
    src: '/images/chai/staged/floating.png',
    caption: 'Control Hub AI Assistant - Floating Window view',
    alt: 'Control Hub in dark mode with the AI Assistant open as a floating window over the Overview page, showing its home screen and four suggestion categories.',
    head: { label: 'CHAI 3.0 · Floating window' },
    width: 'plate',
    stage: { sizes: [[3456, 2156]] },
  },
  evolution30: {
    src: '/images/chai/staged/full-home.png',
    caption: 'Control Hub AI Assistant - Full-page view',
    alt: 'Full-page Control Hub AI Assistant home screen: a threads sidebar beside the "How can I help today?" prompt and four suggestion categories.',
    head: { label: 'CHAI 3.0 · Full page · home' },
    width: 'plate',
    stage: { sizes: [[3456, 2160]] },
  },
  evolution30Answer: {
    src: '/images/chai/staged/full-conversation.png',
    caption: 'Full-page view - an answer with key insights and a chart',
    alt: 'Full-page Control Hub AI Assistant conversation: the assistant answers a question about calling duration and frequency with key insights and a calling and meeting engagement line chart.',
    head: { label: 'CHAI 3.0 · Full page · answer' },
    width: 'plate',
    stage: { sizes: [[3456, 2160]] },
  },

  // Beat 5 · Smart Search
  smartSearch: {
    src: '/images/chai/smart-search-flow.png',
    caption: 'Smart Search with contextual tunnel',
    alt:
      'Control Hub Overview with Smart Search open on the query "configure background for users during meeting." The dropdown lists matching settings, such as Enable virtual backgrounds, above recommended questions. Dashed lines lead from a setting result to the Organization settings page with its Virtual Background controls, and from a recommended question to the Cisco AI Assistant panel.',
    head: { stage: 'find' },
    width: 'plate',
  },

  // Beat 6.1 · Report analysis → data analysis → widget system
  reportProblem: {
    src: '/images/chai/report-problem.webp',
    caption: 'Before — every report ended in a .csv download',
    alt: 'Slide titled "Reports delivered data, not understanding." Left: the Control Hub Reports list, with every row\'s status circled as "Ready to download" and a handwritten note reading "every report ends in a download." Right: the downloaded Device Power Consumption report open in Excel as a dense grid of raw numbers.',
    head: { stage: 'understand', label: 'Before' },
    width: 'plate',
  },
  reportAnalysis: {
    src: '/images/chai/staged/report-answer.png',
    caption: 'Report analysis — insight alongside the report',
    alt: 'Control Hub Reports list with an AI entry point on each row. The Cisco AI Assistant, opened on the Device Power Consumption report, answers a question with a weekly bar chart.',
    head: { stage: 'understand', status: 'Shipped' },
    width: 'plate',
    stage: { sizes: [[3456, 2048]] },
  },
  dataAnalysis: {
    src: '/images/chai/staged/data-analysis.png',
    caption: 'Data analysis — querying the data lake directly',
    alt: 'Control Hub Calling Analytics for media quality, with an Ask AI entry point above the charts. The AI Assistant panel is scoped to Calling Analytics - Media Quality and offers recommended questions about packet loss, device CPU usage, and meeting duration.',
    head: { stage: 'understand' },
    width: 'plate',
    stage: { sizes: [[1876, 1076]] },
  },
  widgetSystem: {
    src: '/images/chai/staged/widget-system.webp',
    caption: 'Widget system — data, evidence, and action',
    alt: 'A reusable Control Hub AI Assistant widget system showing data visualizations, source cards, troubleshooting evidence, action plans, suggested actions, and configuration updates.',
    head: { label: 'Shared widgets' },
    width: 'plate',
    stage: { sizes: [[2000, 876]], align: 'center', surface: 'cutout' },
  },

  // Beat 7 · Active troubleshooting
  aiInsights: {
    src: '/images/chai/ai-insights.png',
    caption: 'AI-generated insights — proactive troubleshooting with adjustable rules',
    alt: 'Two Control Hub Notifications screens: an AI-generated insight with root-cause evidence and a recommended action, followed by configuration controls for sensitivity, monitored people and devices, insight categories, and retention.',
    width: 'wide',
  },

  // Beat 9 · Next
  // Beat 6.3 · Other features (2 images)
  configCompare: {
    src: '/images/chai/staged/config-compare.png',
    caption: 'Configuration — comparing calling settings across two locations',
    alt: 'Full-page Cisco AI Assistant answering "Compare the calling settings between SJC-21 and SEA-2" with a table of key differences, including PSTN connection type, caller ID, address, time zone, and ECBN, followed by a list of settings that are the same at both locations.',
    head: { stage: 'fix' },
    width: 'plate',
    stage: { sizes: [[3456, 2160]] },
  },
  deviceAssistant: {
    src: '/images/chai/staged/device-assistant.png',
    caption: 'Devices — understand a device, find the issue, fix it',
    alt: 'Control Hub device page for a Cisco Room Kit EQX with an issues list and an Ask AI assistant button. The AI Assistant panel, scoped to the device, explains an ultrasound pairing issue with a description, impact, and a suggested calibration step, plus a View configuration button.',
    head: { stage: 'understand' },
    width: 'plate',
    stage: { sizes: [[3456, 2160]] },
  },

  nextPreview: {
    src: '/canvas/mockups/control-hub-agentic.png',
    caption: 'Next — Control Hub Agentic',
    alt: 'Preview frame of the next case study: Control Hub Agentic Experience.',
    linkTo: '/works/control-hub-agentic',
    width: 'column',
  },
} as const satisfies Record<string, Figure>;

export const videos = {
  // Beat 6.1 (cont.) · the Reports page gets its own entry
  askAcrossReports: {
    sources: [{ src: '/images/chai/ask-across-reports.mp4', type: 'video/mp4' }],
    poster: '/images/chai/ask-across-reports-poster.png',
    head: { stage: 'understand' },
    width: 'plate',
    stage: { tone: 'ink', size: [1722, 1020] },
    caption: 'Reports page — ask across your recent reports',
    alt: 'Silent recording: on the Control Hub Reports page, an "Analyze reports with AI Assistant" banner sits above the report list. Clicking Ask AI Assistant opens the assistant scoped to Reports, with suggested questions that span reports, such as which device spent the most hours in call mode and average meeting duration by site.',
  },

  // Beat 6.2 · AI-generated reports
  customReport: {
    sources: [{ src: '/images/chai/ai-generated-report.mp4', type: 'video/mp4' }],
    poster: '/images/chai/ai-generated-report-poster.png',
    head: { label: 'AI-generated reports', status: 'Beta' },
    width: 'plate',
    stage: { tone: 'ink', size: [1818, 1120] },
    caption: 'Custom report — prompt, generated report, refined in chat',
    alt: 'Silent recording: on the Control Hub Reports page, an admin asks the AI Assistant for a report of all End-of-Life assets in the next 6 months with refresh recommendations and cost. The assistant lists what the report will include and opens it beside the chat: key insights, affected assets by product family as a donut chart, an end-of-life timeline, and a map of impacted locations. The admin selects the donut chart, asks to turn it into a bar chart, and the report updates to version 2.',
  },
} as const satisfies Record<string, VideoFigure>;

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
