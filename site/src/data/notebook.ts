/**
 * Field Notebook — geometry and assets for the homepage notebook.
 *
 * The book box is the open spread. The closed notebook is its right half
 * with the cover on top, hinged at the spine. The cover's front face is the
 * spread's own right-hand board (1604 × 2170 px of the 3234 × 2255 spread),
 * so nothing stretches as it opens. The back of the cover is the spread's
 * left half: the lining paper inside the front board.
 *
 * Assets were generated for the Archive direction (see
 * 03-prototype-explore/homepage-awwwards/assets/README.md).
 */

export const NOTEBOOK_ASSETS = {
  cover: '/notebook/cover-archive.webp',
  spread: '/notebook/open-notebook-v2.webp',
  ribbon: '/notebook/ribbon.webp',
} as const;

/** Width / height of the open spread. Matches the live canvas geometry. */
export const SPREAD_ASPECT = 2600 / 1812;

/** The cover's front face, as fractions of the cover half (the right half). */
export const COVER_FACE = { x: 0, y: 0.0315, w: 0.992, h: 0.9625 } as const;

/** Aspect of the closed notebook's board (≈ 0.7395). Slots size from this. */
export const COVER_ASPECT = (COVER_FACE.w * SPREAD_ASPECT) / 2 / COVER_FACE.h;
