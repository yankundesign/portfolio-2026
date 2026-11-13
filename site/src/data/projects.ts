/**
 * Canvas — 12-column editorial plate. Cards are axis-aligned at rest and
 * never freeform-placed. Rotation is reserved for interaction states (hover
 * enlarge, peeking artifacts) and is never the default static layout move.
 *
 * Cards span N columns of the canvas's 12-col grid. Aspect ratio drives plate
 * height; card heights vary as a result, which is the editorial composition.
 * Same rules-engine as the desk's 8-col plate, denser column count.
 *
 * Tier ladder (size → relative weight):
 *   featured  — primary hero (CHAI), 6 cols, 16:10
 *   main      — co-main (Agentic), 5 cols, 4:5 (upright; distinct silhouette)
 *   standard  — supporting work, 3 cols, varied aspect
 */

export type ProjectAspect = '16-10' | '4-5' | '10-16' | '1-1' | '16-9';

export interface Project {
  slug: string;
  title: string;
  /** Short role label that sits in the museum-label caption beneath the plate. */
  role: string;
  subtitle: string;
  /**
   * One line under the title in the works page's contents (and the phone
   * list): what the project is, in one line (about 50 characters at most).
   * Yankun's own lines, from the subtitle, impact or canvas context.
   */
  caption: string;
  /**
   * false: a plate on the works page's contact sheet, but not a row in its
   * contents (and unnumbered). Defaults to true.
   */
  inContents?: boolean;
  /** What the raised plate says on the works page. Omitted: the plate shows its caption only. */
  notes?: PlateNotes;
  year: string;
  collaborators: string[];
  /** One-line impact for the project. Carried into stub case studies. */
  impact: string;
  figNumber: number;
  size: 'featured' | 'main' | 'standard';

  // 12-col grid placement (v0.7 — superseded by v0.8.1 notebook spread)
  /** 1-indexed start column on the 12-col canvas grid. */
  colStart: number;
  /** Number of columns to span. */
  colSpan: number;
  /** Which row track to occupy (1 = first work row, 2 = second, etc.) */
  gridRow: number;
  /** Vertical alignment within the row track. Defaults to 'start'. */
  alignVertical?: 'start' | 'center' | 'end';

  // Plate aspect — controls plate height relative to card width.
  aspect: ProjectAspect;

  // ─── v0.8.1 (open notebook canvas) additions ───
  /**
   * Optional mockup image path for the canvas project plate. Renders a
   * paper-shadow placeholder if missing. Place files under
   * `site/public/canvas/mockups/`.
   */
  mockup?: string;
  /** Opens the live project directly instead of a portfolio case study. */
  externalUrl?: string;
  /**
   * Optional hover preview loop for the canvas plate (WebM first, MP4
   * fallback). Its first and last frames match `mockup`, so both the
   * cover-to-motion crossfade and the loop point are seamless.
   * Place files under `site/public/canvas/previews/`.
   */
  preview?: { webm: string; mp4: string };
  /**
   * Canvas v0.9 status chip (e.g. "Features I shipped", "Earlier work").
   * Was `canvasTier` pre-v0.9. Rendered as a mono-caps pill on the plate.
   */
  canvasStatus: string;
  /** Short taxonomy chips shown beneath the plate title. */
  canvasTags: string[];
  /**
   * Outcome / proof lines shown at rest. The FIRST entry is the headline
   * metric and gets the loud ink-blue treatment; later entries are quieter
   * supporting proofs. Was the single `canvasOutcome` string pre-v0.9.
   */
  canvasProofs: string[];
  /** Context sentence used on the plate, responsive list, and a11y labels. */
  canvasContext: string;
}

/**
 * The raised plate's notes on the works page. Yankun's own words and real
 * figures only, taken from the case study or the live project; never invented.
 */
export interface PlateNotes {
  /** One or two sentences: what it is, or the call that shaped it. */
  summary: string;
  /** The mono kicker over the figures: "Impact" where they are results; otherwise what they are. */
  figuresLabel: string;
  /** At most two. */
  figures: { value: string; label: string }[];
  /** The mono line at the foot of the page: context, role, status. One line: about 40 characters. */
  facts: string[];
}

/**
 * Group caption rendered above a set of paired works on the canvas.
 * Lives on the canvas itself, not on the card — this is editorial chrome.
 */
export interface ProjectGroup {
  /** 1-indexed start column for the caption. */
  colStart: number;
  /** Number of columns the caption spans. */
  colSpan: number;
  /** Grid row above which the cards sit. */
  gridRow: number;
  /** Mono-caps caption text. */
  text: string;
}

export const projects: Project[] = [
  {
    slug: 'control-hub-agentic',
    title: 'Control Hub Workflows',
    role: 'agentic AI for control hub admins',
    subtitle:
      'Five prototypes, two pivots, and the one interaction that survived both',
    caption: 'The agentic experience admins set up and control',
    notes: {
      // controlHubAgenticNotebook.ts: glance and outcome. Renamed from
      // Control Hub Agentic and moved first on 2026-11-12 (Yankun). The
      // figures are the case study's two outcomes; the earlier "2 teams"
      // figure came out with the page's second team.
      summary: 'Control Hub’s agentic experience: workflows admins build once, check, and run from the Assistant.',
      figuresLabel: 'Impact',
      figures: [
        { value: 'WebexOne', label: 'Where the run was tested' },
        { value: 'Adopted', label: 'The builder, by PM and engineering' },
      ],
      facts: ['Cisco Webex', 'Design lead', 'In progress'],
    },
    year: '2026',
    collaborators: [],
    impact: 'A workflow builder the team adopted',
    figNumber: 1,
    size: 'main',
    colStart: 8,
    colSpan: 4,
    gridRow: 1,
    alignVertical: 'start',
    aspect: '4-5',
    mockup: '/canvas/mockups/control-hub-agentic-stack.png',
    preview: {
      webm: '/canvas/previews/control-hub-agentic-stack-preview.webm',
      mp4: '/canvas/previews/control-hub-agentic-stack-preview.mp4',
    },
    canvasStatus: 'Prototypes 01–05, in progress',
    canvasTags: ['Cisco Webex', 'Agentic AI', 'Workflows'],
    canvasProofs: ['Workflow builder adopted by PM and engineering'],
    canvasContext:
      'Control Hub’s agentic experience: how an admin asks, approves, and watches a workflow run.',
  },
  {
    slug: 'chai',
    title: 'Control Hub AI Assistant',
    role: 'ai assistant for it admins',
    subtitle: 'An AI assistant for IT admins',
    caption: 'An AI assistant for IT admins',
    notes: {
      // chaiContent.ts: metrics and credits; canvasContext
      summary: 'Turned a low-adoption assistant into a task-aware admin workflow.',
      figuresLabel: 'Impact',
      figures: [
        { value: '3% → 18%', label: 'Monthly adoption' },
        { value: '86%', label: 'Drop in zero-result searches' },
      ],
      facts: ['Cisco Webex', 'Sole design lead', 'Shipped'],
    },
    year: '2024–2026',
    collaborators: [],
    impact: 'adoption from 3% to 18%',
    figNumber: 2,
    size: 'featured',
    colStart: 1,
    colSpan: 6,
    gridRow: 1,
    alignVertical: 'start',
    aspect: '16-10',
    mockup: '/canvas/mockups/chai-v6.png',
    preview: {
      webm: '/canvas/previews/chai-v6-preview.webm',
      mp4: '/canvas/previews/chai-v6-preview.mp4',
    },
    canvasStatus: 'Features I shipped',
    canvasTags: ['Cisco Webex', 'Enterprise AI', 'Shipped'],
    canvasProofs: ['3% → 18% adoption', '86% drop in no-result searches'],
    canvasContext:
      'Turned a low-adoption assistant into a task-aware admin workflow.',
  },
  {
    slug: 'ebb',
    title: 'Ebb',
    role: 'designer & builder',
    subtitle:
      'A pause between the tap and the feed — that knows when you\'re in a loop.',
    caption: 'A pause between the tap and the feed',
    notes: {
      // ebbContent.ts: header and the “what” and “works” prose
      summary: 'A personal iOS app that inserts three breaths between opening TikTok or Instagram and entering the feed.',
      figuresLabel: 'By design',
      figures: [
        { value: '12 s', label: 'Three breaths, every time' },
        { value: '18 s', label: 'When a loop is detected' },
      ],
      facts: ['iOS', 'Built by me', 'On the App Store'],
    },
    year: '2026',
    collaborators: [],
    impact: 'A pause between the tap and the feed',
    figNumber: 3,
    size: 'standard',
    colStart: 1,
    colSpan: 4,
    gridRow: 2,
    alignVertical: 'start',
    aspect: '1-1',
    mockup: '/canvas/mockups/ebb.png',
    preview: {
      webm: '/canvas/previews/ebb-preview.webm',
      mp4: '/canvas/previews/ebb-preview.mp4',
    },
    canvasStatus: 'An App I built',
    canvasTags: ['iOS', 'Research prototype', 'On-device'],
    canvasProofs: ['A pause between the tap and the feed'],
    canvasContext:
      'A pause between the tap and the feed — that knows when you\'re in a loop.',
  },
  {
    slug: 'zao',
    title: 'ZAO',
    externalUrl: 'https://zaoui.dev/',
    role: 'designer & builder',
    subtitle: 'Learning design systems by building one with AI.',
    caption: 'Learning design systems by building one with AI',
    notes: {
      // zaoui.dev, 2026-11-11
      summary: 'An experimental design system at the boundary of 2D clarity and 3D presence, built for people and agents.',
      figuresLabel: 'So far',
      figures: [
        { value: '16', label: 'Components, one construction' },
        { value: '7', label: 'Chart instruments, five rules' },
      ],
      facts: ['Design system', 'v0.1', 'In progress'],
    },
    year: '2026',
    collaborators: [],
    impact: 'A design system for people and agents',
    figNumber: 6,
    size: 'standard',
    colStart: 7,
    colSpan: 5,
    gridRow: 3,
    alignVertical: 'end',
    aspect: '16-10',
    mockup: '/canvas/mockups/zao.png',
    canvasStatus: 'A system I’m building',
    canvasTags: ['Design system', 'AI-assisted build', 'In progress'],
    canvasProofs: ['A design system for people and agents'],
    canvasContext: 'Learning design systems by building one with AI.',
  },
  {
    slug: 'sap-fieldglass',
    title: 'SAP Fieldglass',
    role: 'enterprise dashboard, earlier work',
    subtitle: 'Making a complex system handleable — earlier work',
    caption: 'Simplified vendor management workflows',
    notes: {
      // sapFieldglassContent.ts: header, homepage and outcome prose
      summary: 'Making a mission-critical workforce platform easier for occasional users.',
      figuresLabel: 'Impact',
      figures: [
        { value: '1,000+', label: 'Enterprise customers adopted the homepage' },
        { value: '4', label: 'Roles, each with its own template' },
      ],
      facts: ['Enterprise SaaS', 'UX designer', 'Shipped'],
    },
    year: '2020–2024',
    collaborators: [],
    impact: 'Simplified vender management workflows',
    figNumber: 4,
    size: 'standard',
    colStart: 7,
    colSpan: 5,
    gridRow: 2,
    alignVertical: 'end',
    aspect: '16-10',
    mockup: '/canvas/mockups/sap-fieldglass.png',
    canvasStatus: 'Earlier work',
    canvasTags: ['Enterprise', 'Dashboard', 'Shipped'],
    canvasProofs: ['Simplified vender management workflows'],
    canvasContext:
      'Simplified dense workforce-management surfaces for enterprise customers.',
  },
  {
    slug: 'build-with-ai',
    title: 'Build with AI',
    role: 'ai tools and team systems',
    subtitle:
      'A working shelf of AI builds.',
    caption: 'A working shelf of AI tools, prompt systems, and team workflows',
    inContents: false,
    year: '2025–2026',
    collaborators: [],
    impact: 'experiments turned into reusable tools',
    figNumber: 5,
    size: 'standard',
    colStart: 1,
    colSpan: 4,
    gridRow: 3,
    alignVertical: 'start',
    aspect: '1-1',
    mockup: '/canvas/mockups/build-with-ai.png',
    canvasStatus: 'Ongoing',
    canvasTags: ['Internal tools', 'Prompt systems', 'Team workflows'],
    canvasProofs: ['Experiments → reusable tools'],
    canvasContext:
      'A working shelf of AI tools, prompt systems, and team workflows.',
  },
];

/**
 * The contact sheet's light copy of a mockup: a 640px-wide WebP (q85) in
 * `public/canvas/thumbs/`, named after the PNG. The sheet shows plates about
 * 200–320 CSS px wide; the full PNG is for the raised plate and the phone list.
 * A new mockup needs its copy made too.
 */
export const mockupThumb = (mockup: string): string =>
  mockup.replace('/canvas/mockups/', '/canvas/thumbs/').replace(/\.png$/, '.webp');

/** The works page's contents, in this order. The contact sheet shows every project. */
export const contents: Project[] = projects.filter((p) => p.inContents !== false);

/**
 * Section captions on the canvas surface — pure editorial chrome that groups
 * paired works typographically without using a frame or border.
 */
export const projectGroups: ProjectGroup[] = [
  {
    colStart: 1,
    colSpan: 12,
    gridRow: 1,
    text: 'works from 2023–2026',
  },
];
