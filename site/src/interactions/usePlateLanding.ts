import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { plateCarry } from './plateCarry';

export interface PlateLanding {
  /** A plate is being carried here from the works page: the page arrives around it. */
  arriving: boolean;
  /** Goes on the opening board, where the plate lands. */
  boardRef: RefObject<HTMLDivElement | null>;
}

/**
 * usePlateLanding — a case study's opening board receives the plate carried
 * from the works page (PlateCarry). Without a carry (a direct visit, the back
 * button, reduced motion, phones) it does nothing and the board arrives as
 * every other board does.
 */
export function usePlateLanding(slug: string): PlateLanding {
  // Read once, as the opener mounts: by the next render the plate may have landed.
  const [arriving] = useState(() => plateCarry.arriving(slug));
  const boardRef = useRef<HTMLDivElement>(null);

  // Before the first paint, so the board starts where the plate is.
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!arriving || !board) return;
    plateCarry.land(board);
    return () => plateCarry.leave(board);
  }, [arriving]);

  return { arriving, boardRef };
}
