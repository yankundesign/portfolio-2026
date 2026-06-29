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

/** Beat 6 — Report Analysis. Optional intro before the three sub-beats. */
export const reportAnalysisIntroProse: ProseSlot = [
  "The next expansion was analytics. Admins needed to understand adoption, usage, and issues, but the old workflow pushed that work into CSV exports, spreadsheets, and manual interpretation. We asked what would change if CHAI could tell them what was happening before they had to become the analyst.",
];

/** Beat 6.1 — Contextual report analysis. Generate report → sparkle → Q&A. */
export const reportAnalysisContextualProse: ProseSlot = [
  "We started where the report already ended. I added a sparkle entry point to each report row, so CHAI could open immediately in that report's context. The question bank was visible, but not blocking: admins could pick a suggested question or start typing right away.",
  "Keeping the assistant scoped to the report mattered. It made the answers feel grounded in the artifact on screen, and it gave the admin a clear way to ask follow-up questions without re-explaining the dataset.",
];

/** Beat 6.2 — Data analysis. Query the data lake directly. */
export const dataAnalysisProse: ProseSlot = [
  "That same pattern extended to live analytics dashboards. CHAI could explain what was happening in the data, not just display the chart: where adoption changed, which segments were affected, and what looked unusual enough to investigate. The dashboard stayed the source of truth; the assistant gave it a first read.",
];

/** Beat 6.3 — Custom report generation. Reframe: from report→insights to AI-generated reports. */
export const customReportProse: ProseSlot = [
  "Custom reports flipped the workflow again. Instead of creating a report, waiting for output, and then asking CHAI for insight, admins could describe the report they wanted in natural language. CHAI translated that prompt into a structured report artifact.",
  "The artifact layout was the trust mechanism. It let users review the selected metrics, dimensions, filters, and schedule before committing. The efficiency gain was not just fewer clicks. It changed report building from a form-heavy setup task into a guided authoring flow where the admin still had control.",
];

/** Beat 7 — Workspaces & Devices. */
export const devicesProse: ProseSlot = [
  "Workspaces and devices brought a different kind of ambiguity. An admin does not only need to know that a room is unhealthy. They need to understand what changed, who is affected, and whether the issue belongs to a device, a workspace pattern, or a broader environment problem.",
  "I designed CHAI to read the context around that surface and return a diagnostic note: what the signals suggest, what the impact is, and what action to try next. For device troubleshooting, keeping the assistant attached to the device page was the key decision. The evidence stayed visible, and CHAI became a contextual guide instead of a blank chat window asking the admin to reconstruct the problem.",
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
    summary: 'From report → insights to insight-first reports — three iterations on what AI does in the analytics flow.',
  },
  devices: {
    title: 'Workspaces & Devices',
    summary: 'Contextual insight and troubleshooting for shared workspaces, rooms, and device fleets.',
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
    caption: 'CHAI v1.0',
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

  // Beat 4 · Evolution (3 images, stacked in reading order)
  evolution10: {
    src: '/images/chai/evolution-1-0.png',
    caption: 'CHAI 1.0 -> CHAI 2.0',
    alt: 'CHAI 1.0 sidebar — initial form with three canned prompts and a numbered-answer flow.',
    width: 'column',
  },
  evolution20: {
    src: '/images/chai/chai-2-0.png',
    caption: 'CHAI 3.0',
    alt: 'CHAI 2.0 sidebar — refined to surface reasoning alongside the answer.',
    width: 'column',
  },
  evolution30: {
    src: '/images/chai/chai-3-0-full.png',
    caption: 'CHAI 3.0 — Full screen',
    alt: 'CHAI 3.0 — full-screen surface, embedded across the console and agentic in form.',
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

  // Beat 6.1 · Report Analysis · Contextual analysis (2 images)
  reportKickoff: {
    src: '/images/chai/report-kickoff.png',
    caption: 'Report kickoff — sparkle entry into CHAI',
    alt: 'A delivered Control Hub report. The sparkle icon next to the report title opens a CHAI panel scoped to this report.',
    width: 'column',
  },
  reportDelivered: {
    src: '/images/chai/report-delivered.png',
    caption: 'Q&A scoped to the report',
    alt: 'A CHAI conversation panel sitting alongside the report. The user asks follow-up questions and receives answers grounded in the report data.',
    width: 'column',
  },

  // Beat 6.2 · Report Analysis · Data analysis (1 image)
  dataAnalysis: {
    src: '/images/chai/data-analysis.png',
    caption: 'Data analysis — querying the data lake directly',
    alt: 'CHAI returning a generated visualization in response to a natural-language data question, sourced directly from the underlying data lake.',
    width: 'column',
  },

  // Beat 6.3 · Report Analysis · Custom report generation (2 images)
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

  // Beat 7 · Workspaces & Devices
  devicesEmbed: {
    src: '/images/chai/device-troubleshooting.png',
    caption: 'Device troubleshooting — impact and suggested action',
    alt: 'A device detail page in Control Hub with CHAI embedded as a contextual troubleshooting panel.',
    width: 'column',
  },
  devicesClustering: {
    src: '/images/chai/device-workspace.png',
    caption: 'Workspace insights — room context around device signals',
    alt: 'Workspace and device view showing CHAI summarizing room context and device signals.',
    width: 'column',
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
  { id: 'proof-3', label: 'Workspaces & Devices' },
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
