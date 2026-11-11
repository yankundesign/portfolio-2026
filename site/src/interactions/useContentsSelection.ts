import { useCallback, useEffect, useRef, useState } from 'react';

/** Where the reader is pointing from: a title in the contents, or a plate on the sheet. */
export type SelectionSource = 'contents' | 'sheet';

interface Selection {
  index: number;
  source: SelectionSource;
}

const NONE: Selection = { index: -1, source: 'contents' };

/**
 * useContentsSelection — which entry the reader is pointing at on the open
 * spread. Nothing is selected by default (a pre-selected first project reads
 * as a mistake). Leaving the list clears it after a short grace period, so
 * moving between rows never flickers back to the overview.
 *
 * The source matters: pointing at a title swaps the right page to that one
 * plate, but pointing at a plate on the sheet only marks its row. Swapping
 * the sheet away from under the cursor would fire a leave, clear the
 * selection, bring the sheet back, and loop.
 */
export function useContentsSelection(graceMs = 180) {
  const [selection, setSelection] = useState<Selection>(NONE);
  const timer = useRef(0);
  const point = useCallback((index: number, source: SelectionSource = 'contents') => {
    window.clearTimeout(timer.current);
    setSelection({ index, source });
  }, []);
  const release = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSelection(NONE), graceMs);
  }, [graceMs]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { active: selection.index, source: selection.source, point, release };
}
