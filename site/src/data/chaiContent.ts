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
  title: 'Control Hub AI',
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
  "The empty state offered three canned prompts. The answer state returned a numbered procedure. Neither was wrong. Neither was being used.",
];

/** Beat 2 — context. What Control Hub is, what CHAI was. */
export const contextProse: ProseSlot = [
  "Webex Control Hub is the single pane of glass where IT administrators deploy, configure, and monitor the entire Webex Suite—Messaging, Meetings, Calling, and Contact Center.",
  "In June 2024 the team introduced the first cut of the Control Hub AI Assistant (CHAI)—a help-only chatbot.",
];

/** Beat 3 — Road map. Why three releases, how the work was paced. */
export const roadmapProse: ProseSlot = null;

/** Beat 4 — Evolution from 1.0 → 2.0 → 3.0. Lead paragraph; the three plates carry the rest. */
export const evolutionProse: ProseSlot = null;

/** Beat 5 — Smart Search. */
export const smartSearchProse: ProseSlot = null;

/** Beat 6 — Report Analysis. Optional intro before the three sub-beats. */
export const reportAnalysisIntroProse: ProseSlot = null;

/** Beat 6.1 — Contextual report analysis. Generate report → sparkle → Q&A. */
export const reportAnalysisContextualProse: ProseSlot = null;

/** Beat 6.2 — Data analysis. Query the data lake directly. */
export const dataAnalysisProse: ProseSlot = null;

/** Beat 6.3 — Custom report generation. Reframe: from report→insights to AI-generated reports. */
export const customReportProse: ProseSlot = null;

/** Beat 7 — Devices Troubleshooting. */
export const devicesProse: ProseSlot = null;

/** Beat 8 — Outcome. What 3% → 18% means in lived terms. */
export const outcomeProse: ProseSlot = null;

/** Beat 9 — Next. Transition to the Control Hub Agentic Experience case study. */
export const nextProse: ProseSlot = null;

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
    summary: 'From report → insights to insight-first reports — three iterations on what AI does in the analytics flow.',
  },
  devices: {
    title: 'Devices Troubleshooting',
    summary: 'Multi-signal embeddings cluster impacted users by root cause.',
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
  caption: string;
  alt: string;
  /** Plate width: 'column' (inside prose col), 'medium' (breaks out), 'wide' (page width). */
  width?: 'column' | 'medium' | 'wide';
}

export const figures = {
  // Beat 1 · Opening
  chai10: {
    src: '/images/chai/chai-1-0.png',
    caption: 'fig. 01 · CHAI v1.0',
    alt:
      'Two side-by-side screenshots of the Cisco AI Assistant sidebar. Left panel shows an empty state with a welcome message and three suggested questions. Right panel shows a conversation where the user asks "How do I configure SSO?" and receives a seven-step numbered answer.',
    width: 'column',
  },

  // Beat 2 · Context
  context: {
    src: '/images/chai/context.png',
    caption: 'fig. 02 · Webex Control Hub — the console CHAI sits inside',
    alt: 'Control Hub overview screen showing the navigation tree, monitoring widgets, and admin controls.',
    width: 'column',
  },

  // Beat 3 · Road Map
  roadmap: {
    src: '/images/chai/roadmap.png',
    caption: 'fig. 03 · Roadmap — three releases shaping the work',
    alt: 'Internal roadmap showing CHAI 1.0, 2.0, and 3.0 releases plotted across quarters.',
    width: 'column',
  },

  // Beat 4 · Evolution (3 images, side by side)
  evolution10: {
    src: '/images/chai/evolution-1-0.png',
    caption: 'fig. 04 · CHAI 1.0',
    alt: 'CHAI 1.0 sidebar — initial form with three canned prompts and a numbered-answer flow.',
    width: 'column',
  },
  evolution20: {
    src: '/images/chai/evolution-2-0.png',
    caption: 'fig. 05 · CHAI 2.0',
    alt: 'CHAI 2.0 sidebar — refined to surface reasoning alongside the answer.',
    width: 'column',
  },
  evolution30: {
    src: '/images/chai/evolution-3-0.png',
    caption: 'fig. 06 · CHAI 3.0',
    alt: 'CHAI 3.0 sidebar — embedded across surfaces, agentic in form.',
    width: 'column',
  },

  // Beat 5 · Smart Search
  smartSearch: {
    src: '/images/chai/smart-search.png',
    caption: 'fig. 07 · Smart Search with contextual tunnel',
    alt:
      'Smart Search results showing the contextual tunnel affordance — follow-up questions surfacing beneath the primary results.',
    width: 'column',
  },

  // Beat 6.1 · Report Analysis · Contextual analysis (2 images)
  reportKickoff: {
    src: '/images/chai/report-kickoff.png',
    caption: 'fig. 08 · Report kickoff — sparkle entry into CHAI',
    alt: 'A delivered Control Hub report. The sparkle icon next to the report title opens a CHAI panel scoped to this report.',
    width: 'column',
  },
  reportDelivered: {
    src: '/images/chai/report-delivered.png',
    caption: 'fig. 09 · Q&A scoped to the report',
    alt: 'A CHAI conversation panel sitting alongside the report. The user asks follow-up questions and receives answers grounded in the report data.',
    width: 'column',
  },

  // Beat 6.2 · Report Analysis · Data analysis (1 image)
  dataAnalysis: {
    src: '/images/chai/data-analysis.png',
    caption: 'fig. 10 · Data analysis — querying the data lake directly',
    alt: 'CHAI returning a generated visualization in response to a natural-language data question, sourced directly from the underlying data lake.',
    width: 'column',
  },

  // Beat 6.3 · Report Analysis · Custom report generation (2 images)
  customReport1: {
    src: '/images/chai/custom-report-1.png',
    caption: 'fig. 11 · Custom report — describing the question',
    alt: 'CHAI prompting the user to describe what kind of report they want, with parameter scaffolding inline.',
    width: 'column',
  },
  customReport2: {
    src: '/images/chai/custom-report-2.png',
    caption: 'fig. 12 · Custom report — generated output',
    alt: 'A CHAI-generated report rendered in the standard Control Hub report format, ready for review and export.',
    width: 'column',
  },

  // Beat 7 · Devices Troubleshooting
  devicesEmbed: {
    src: '/images/chai/devices-embed.png',
    caption: 'fig. 13 · CHAI on the device page',
    alt: 'A device detail page in Control Hub with CHAI embedded as a contextual troubleshooting panel.',
    width: 'column',
  },
  devicesClustering: {
    src: '/images/chai/devices-clustering.png',
    caption: 'fig. 14 · Multi-signal embedding clusters',
    alt: 'Abstracted visualization of impacted users clustered by root cause across multiple signals.',
    width: 'column',
  },

  // Beat 9 · Next
  nextPreview: {
    src: '/images/chai/next-control-hub-agentic.png',
    caption: 'fig. 15 · Next — Control Hub Agentic',
    alt: 'Preview frame of the next case study: Control Hub Agentic Experience.',
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
// Report Analysis sub-beats (6.1, 6.2, 6.3) are NOT in the rail — they
// live as sub-headers inside the Report Analysis section.
// ---------------------------------------------------------------------------

export const sections = [
  { id: 'beat-1', label: 'Opening' },
  { id: 'beat-2', label: 'Context' },
  { id: 'roadmap', label: 'Road Map' },
  { id: 'evolution', label: 'Evolution' },
  { id: 'proof-1', label: 'Smart Search' },
  { id: 'proof-2', label: 'Report Analysis' },
  { id: 'proof-3', label: 'Devices' },
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
