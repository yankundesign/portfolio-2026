import type { Board, CaseHeader, Chapter, Glance } from './notebookCase';
import { credits as v3Credits, metrics as v3Metrics, thesisQuote } from './chaiContent';

/**
 * Control Hub AI Assistant (CHAI) — v4 content, for the notebook layout
 * (ChaiNotebook.tsx), in the same system as Control Hub Workflows.
 *
 * The same story as v3 (chaiContent.ts, kept for the v3 page at ?v=3),
 * shortened. Every line is Yankun's v3 text, cut down; nothing new is
 * claimed. The chapters follow the roadmap: find, understand, fix.
 *
 * Status rule: a status appears only where v3 states it (Report analysis
 * shipped, AI-generated reports in beta, 1.0 not my design).
 *
 * Cut from v3: the Control Hub / Webex context slide, the roadmap image
 * (now a drawing), the "before" slide, the empty full-page home, and the
 * data analysis still. The opening beat stays hidden, as Yankun left it.
 */

const IMG = '/images/chai';

export const header: CaseHeader = {
  title: { roman: 'Control Hub', italic: 'AI Assistant' },
  subtitle: 'An AI assistant for IT admins navigating a labyrinthine console',
  facts: [
    { label: 'Role', value: 'Sole design lead' },
    { label: 'Product', value: 'Cisco Webex · Control Hub' },
    { label: 'Year', value: '2024–2026' },
    { label: 'Status', value: 'Shipped' },
  ],
  hero: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/staged/floating.png`,
        size: [3456, 2156],
        alt: 'Control Hub in dark mode with the AI Assistant open as a floating window over the Overview page, showing its home screen and four suggestion categories.',
      },
    ],
    caption: 'CHAI 3.0 · the Assistant as a floating window over the Overview',
  },
};

export const glance: readonly Glance[] = [
  { label: 'Where it started', text: 'In June 2024, CHAI was a help-only chatbot inside Control Hub: static prompts, no thread history.' },
  { label: 'My call', text: 'Stop treating the assistant as one blank box. Meet admins inside search, reports, dashboards and devices.' },
  { label: 'Outcome', text: 'Monthly adoption across Control Hub rose from 3% to 18%, from 2024 to 2025.' },
];

export const chapters: readonly Chapter[] = [
  { id: 'context', n: '01', word: 'Context', claim: 'A bad day in Control Hub is too many dashboards, too many signals, and not enough time.' },
  { id: 'evolution', n: '02', word: 'Evolution', claim: 'Three releases, three reframings.' },
  { id: 'find', n: '03', word: 'Find', claim: 'A tunnel that turns a search into a conversation.' },
  { id: 'understand', n: '04', word: 'Understand', claim: 'From a .csv download to an answer beside the report.' },
  { id: 'fix', n: '05', word: 'Fix', claim: 'The Assistant for configuration, and for devices.' },
  { id: 'outcome', n: '06', word: 'Outcome' },
];

export const context = {
  lede: 'Control Hub is where Webex admins configure services, monitor usage and troubleshoot devices. In June 2024 the team introduced the first cut of the Control Hub AI Assistant, CHAI: a help-only chatbot inside the console.',
  roadmapLabel: 'The roadmap',
  roadmap: 'I framed the roadmap around three jobs: find information, understand what’s happening, fix problems. The hard question was no longer what else the assistant could do. It was how to make it legible enough for admins to trust.',
} as const;

/** The roadmap as a drawing: three jobs, then agentic AI. Each job is a chapter of this page. */
export const roadmapStages = [
  { word: 'Find', href: '#find', items: ['Help assistant', 'Smart search'] },
  { word: 'Understand', href: '#understand', items: ['Data analysis', 'Workspace & device'] },
  { word: 'Fix', href: '#fix', items: ['Troubleshooting', 'Configuration'] },
] as const;

export const roadmapNext = {
  word: 'Agentic AI',
  slug: 'control-hub-agentic',
  label: 'Control Hub Workflows',
} as const;

export const evolution = {
  lede: 'CHAI 1.0 was a basic Q&A assistant: static prompts, no thread history, answers detached from the page around them. For 2.0, I led the redesign around threads, better suggested prompts and one interaction language.',
  board: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/chai-1.0-2.0-panels.png`,
        size: [1920, 1120],
        alt: 'CHAI 1.0 (2024.07) beside CHAI 2.0 (2025.05). CHAI 1.0: a welcome screen with three suggested questions, and a numbered answer to “How do I configure SSO?”. CHAI 2.0: a personalized home with Explore prompts and recent threads, a threads drawer, and an answer to “How do I add new users using CSV?” with a linked setting and suggested prompts.',
      },
    ],
    caption: 'CHAI 1.0 → 2.0 · 2024.07 → 2025.05 · 1.0 not my design',
    tone: 'paper',
  } satisfies Board,
  turn: 'That exposed the bigger problem: the more capable CHAI became, the less obvious it was what to ask it. In 3.0 I stopped treating the assistant as one blank box. Clearer entry points and skills meet admins where they already work.',
  boards: [
    {
      screens: [
        { kind: 'image', src: `${IMG}/staged/docked-home.png`, size: [962, 1960], alt: 'The docked Assistant’s home screen: “How can I help today?” with four suggestion categories.' },
        { kind: 'image', src: `${IMG}/staged/docked-troubleshoot.png`, size: [962, 1960], alt: 'The docked Assistant with the Troubleshoot issues suggestions expanded.' },
        { kind: 'image', src: `${IMG}/staged/docked-add-menu.png`, size: [962, 1960], alt: 'The docked Assistant’s add menu: files, agents, workflows and prompts.' },
        { kind: 'image', src: `${IMG}/staged/docked-answer.png`, size: [490, 983], alt: 'A docked answer listing devices to refresh, with a CSV download of the full list.' },
      ],
      caption: 'CHAI 3.0 · docked: home, troubleshooting suggestions, the add menu, an answer with a CSV',
    },
    {
      screens: [
        {
          kind: 'image',
          src: `${IMG}/staged/full-conversation.png`,
          size: [3456, 2160],
          alt: 'Full-page Control Hub AI Assistant conversation: the assistant answers a question about calling duration and frequency with key insights and a calling and meeting engagement line chart.',
        },
      ],
      caption: 'CHAI 3.0 · full page: an answer with key insights and a chart',
    },
  ] satisfies readonly Board[],
} as const;

export const find = {
  lede: 'Search was already where admins went when they didn’t know where a setting lived. So I put AI there: a natural-language query returns the right setting, with enough context to decide.',
  call: 'The design call was the handoff. Suggested questions sit inside the search result, and clicking one opens CHAI with the search context intact. Search became an entry point, not a dead end.',
  board: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/smart-search-flow.png`,
        size: [1920, 1280],
        alt: 'Control Hub Overview with Smart Search open on the query “configure background for users during meeting.” The dropdown lists matching settings, such as Enable virtual backgrounds, above recommended questions. Dashed lines lead from a setting result to the Organization settings page with its Virtual Background controls, and from a recommended question to the Cisco AI Assistant panel.',
      },
    ],
    caption: 'Smart Search · a setting result, and a question that opens CHAI with the search intact',
    tone: 'paper',
  } satisfies Board,
  metrics: [
    { big: `${v3Metrics.noResult.figure}%`, text: v3Metrics.noResult.label },
    { big: `${v3Metrics.entryPoints.figure}%`, text: v3Metrics.entryPoints.label },
  ],
} as const;

export const understand = {
  lede: 'Every report used to end in a download. I added an AI entry point to each report row, so the first read happens in Control Hub, not in a spreadsheet.',
  report: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/staged/report-answer.png`,
        size: [3456, 2048],
        alt: 'Control Hub Reports list with an AI entry point on each row. The Cisco AI Assistant, opened on the Device Power Consumption report, answers a question with a weekly bar chart.',
      },
    ],
    caption: 'Report analysis · the Assistant opened on one report · shipped',
  } satisfies Board,
  acrossLabel: 'Across reports',
  across: 'Then the model learned to read across reports, so the entry grew: the Reports page got its own way in. It only grew once the context was reliable.',
  acrossBoard: {
    screens: [
      {
        kind: 'video',
        src: `${IMG}/ask-across-reports.mp4`,
        poster: `${IMG}/ask-across-reports-poster.png`,
        size: [1722, 1020],
        alt: 'Silent recording: on the Control Hub Reports page, an “Analyze reports with AI Assistant” banner sits above the report list. Clicking Ask AI Assistant opens the assistant scoped to Reports, with suggested questions that span reports.',
      },
    ],
    caption: 'Reports page · ask across your recent reports',
  } satisfies Board,
  quote: thesisQuote,
  widgetsLabel: 'Widgets',
  widgets: 'As answers grew past prose, I built a reusable widget system: charts, tables, sources, diagnoses and next steps, each in the structure that fits the work.',
  widgetsBoard: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/staged/widget-system.webp`,
        size: [2000, 876],
        cutout: true,
        alt: 'A reusable Control Hub AI Assistant widget system showing data visualizations, source cards, troubleshooting evidence, action plans, suggested actions, and configuration updates.',
      },
    ],
    caption: 'Shared widgets · data, evidence and action',
    tone: 'paper',
  } satisfies Board,
  reportsLabel: 'AI reports',
  reports: 'Custom reports flipped the workflow: describe the report you want, and CHAI builds it.',
  reportsNote: 'The report itself is the trust mechanism: metrics, filters and schedule to review before committing.',
  reportsBoard: {
    screens: [
      {
        kind: 'video',
        src: `${IMG}/ai-generated-report.mp4`,
        poster: `${IMG}/ai-generated-report-poster.png`,
        size: [1818, 1120],
        alt: 'Silent recording: an admin asks the AI Assistant for a report of all End-of-Life assets in the next 6 months with refresh recommendations and cost. The assistant opens the report beside the chat, and the admin turns its donut chart into a bar chart.',
      },
    ],
    caption: 'AI-generated report · prompt, report, refined in chat · beta',
  } satisfies Board,
} as const;

export const fix = {
  lede: 'Compare calling settings across two locations. Understand a device, find the issue, fix it.',
  board: {
    screens: [
      {
        kind: 'image',
        src: `${IMG}/staged/config-compare.png`,
        size: [3456, 2160],
        label: 'Configuration',
        alt: 'Full-page Cisco AI Assistant answering “Compare the calling settings between SJC-21 and SEA-2” with a table of key differences, followed by the settings that are the same at both locations.',
      },
      {
        kind: 'image',
        src: `${IMG}/staged/device-assistant.png`,
        size: [3456, 2160],
        label: 'Devices',
        alt: 'Control Hub device page for a Cisco Room Kit EQX with an issues list. The AI Assistant panel, scoped to the device, explains an ultrasound pairing issue with a description, impact, and a suggested calibration step.',
      },
    ],
    caption: 'Two locations’ calling settings compared · a device’s issue explained, with the next step',
  } satisfies Board,
} as const;

export const outcome = {
  figure: '3% → 18%',
  from: `${v3Metrics.adoption.label} · ${v3Metrics.adoption.context}`,
  text: 'Over that period, I redesigned CHAI from a help-only chatbot into entry points across search, reports, dashboards and devices.',
  scope: 'The figure covers CHAI across Control Hub. It doesn’t isolate any one feature.',
  nextLabel: 'What came next',
  next: 'Enterprise AI can’t depend on one blank input and a perfect prompt. It needs context, clear entry points, and a way to show how it got there. The agentic work picks up from there.',
} as const;

export const credits = v3Credits;
