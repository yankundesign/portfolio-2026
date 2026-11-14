import type { Board } from './notebookCase';
import { header as workflows } from './controlHubAgenticNotebook';
import { header as chai } from './chaiNotebook';

/** The still a board opens on: the image, or a recording's poster. */
const still = (board: Board): string | null => {
  const first = board.screens[0];
  if (!first) return null;
  return first.kind === 'video' ? first.poster ?? null : first.src;
};

/**
 * The case studies that open on a board (the notebook layout), by slug, each
 * with the still on that board. A plate carried from the works page lands on
 * it (PlateCarry), and the works page fetches the still as soon as the
 * project's title is pointed at.
 */
export const openingStill: Readonly<Record<string, string | null>> = {
  'control-hub-agentic': still(workflows.hero),
  chai: still(chai.hero),
};
