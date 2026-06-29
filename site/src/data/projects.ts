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
  /**
   * Canvas v0.9 status chip (e.g. "Full case study", "Earlier work").
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
    slug: 'chai',
    title: 'Control Hub AI Assistant',
    role: 'ai assistant for it admins',
    subtitle: 'An AI assistant for IT admins',
    year: '2024–2025',
    collaborators: [],
    impact: 'adoption from 3% to 18%',
    figNumber: 1,
    size: 'featured',
    colStart: 1,
    colSpan: 6,
    gridRow: 1,
    alignVertical: 'start',
    aspect: '16-10',
    mockup: '/canvas/mockups/chai.png',
    canvasStatus: 'Full case study',
    canvasTags: ['Cisco Webex', 'Enterprise AI', 'Shipped'],
    canvasProofs: ['3% → 18% adoption', '86% drop in no-result searches'],
    canvasContext:
      'Turned a low-adoption assistant into a task-aware admin workflow.',
  },
  {
    slug: 'control-hub-agentic',
    title: 'Control Hub Agentic',
    role: 'agentic experience for control hub',
    subtitle:
      'Designing agentic AI experience inside Webex Control Hub',
    year: '2026',
    collaborators: [],
    impact: 'Set direction of agentic AI in Control Hub',
    figNumber: 2,
    size: 'main',
    colStart: 8,
    colSpan: 4,
    gridRow: 1,
    alignVertical: 'start',
    aspect: '4-5',
    mockup: '/canvas/mockups/control-hub-agentic.png',
    canvasStatus: 'In progress',
    canvasTags: ['Cisco Webex', 'Agentic AI', 'Direction'],
    canvasProofs: ['Set the agentic direction'],
    canvasContext:
      'Explores how agents plan, explain, and execute admin work inside Control Hub.',
  },
  {
    slug: 'build-with-ai',
    title: 'Build with AI',
    role: 'ai tools and team systems',
    subtitle:
      'A working shelf of AI builds.',
    year: '2025–2026',
    collaborators: [],
    impact: 'experiments turned into reusable tools',
    figNumber: 3,
    size: 'standard',
    colStart: 1,
    colSpan: 4,
    gridRow: 2,
    alignVertical: 'start',
    aspect: '1-1',
    mockup: '/canvas/mockups/build-with-ai.png',
    canvasStatus: 'Ongoing',
    canvasTags: ['Internal tools', 'Prompt systems', 'Team workflows'],
    canvasProofs: ['Experiments → reusable tools'],
    canvasContext:
      'A working shelf of AI tools, prompt systems, and team workflows.',
  },
  {
    slug: 'sap-fieldglass',
    title: 'SAP Fieldglass',
    role: 'enterprise dashboard, earlier work',
    subtitle: 'Making a complex system handleable — earlier work',
    year: '2020 - 2024',
    collaborators: [],
    impact: 'adopted by 1,000+ customers',
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
    canvasProofs: ['1,000+ customers'],
    canvasContext:
      'Simplified dense workforce-management surfaces for enterprise customers.',
  },
];

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
