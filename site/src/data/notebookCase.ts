/**
 * Types shared by the notebook case-study layout (NotebookCase.tsx,
 * ClothBoard.tsx): Control Hub Workflows and the Control Hub AI Assistant.
 */

/** One screen tipped onto a board. Sizes are the capture's own pixels. */
export interface BoardScreen {
  kind: 'image' | 'video';
  /** Image file, or the video's mp4. */
  src: string;
  /** Video only: the still shown before it plays. */
  poster?: string;
  size: readonly [number, number];
  alt: string;
  /** Boards with two or more screens: a stamp above each, saying which is which. */
  label?: string;
  /** Boards with two or more screens: this screen's share of the row. */
  weight?: number;
  /** An option weighed and dropped: a dashed edge instead of a solid one. */
  dropped?: boolean;
  /** Transparent artwork (cards with no background): no backing, no lift. */
  cutout?: boolean;
}

export interface Board {
  screens: readonly BoardScreen[];
  caption: string;
  /**
   * 'cloth' (default): the navy cloth, for dark product screens.
   * 'paper': the notebook's page, for light artwork with dark labels and no
   * background of its own (the widget sheet): on cloth those labels vanish.
   * 'bare': no board at all, for a composed slide that already has its own
   * mat (Smart Search, 1.0 → 2.0): a board around it is a second frame.
   */
  tone?: 'cloth' | 'paper' | 'bare';
}

export interface Chapter {
  id: string;
  n: string;
  word: string;
  claim?: string;
}

/** A fact in the opener's strip: a mono label over a value. */
export interface Fact {
  label: string;
  value: string;
}

/** One of the three short answers under the opening board. */
export interface Glance {
  label: string;
  text: string;
}

/** The opener: the title set like the homepage's name, the facts, the board, the glance. */
export interface CaseHeader {
  title: { roman: string; italic: string };
  subtitle: string;
  facts: readonly Fact[];
  hero: Board;
}

/**
 * Where a case study sits in the notebook: its number of the total
 * ("02 / 05"), and the project after it. Derived from the works page's
 * contents, so reordering projects.ts renumbers every case study.
 */
export function casePosition(slug: string, contents: readonly { slug: string; title: string; caption: string }[]) {
  const here = contents.findIndex((p) => p.slug === slug);
  const pad = (n: number) => String(n).padStart(2, '0');
  const next = contents[here + 1];
  return {
    number: pad(here + 1),
    ofTotal: `${pad(here + 1)} / ${pad(contents.length)}`,
    next: next ? { slug: next.slug, title: next.title, caption: next.caption, number: pad(here + 2) } : null,
  };
}
