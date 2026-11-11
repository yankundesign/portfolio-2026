import { useCallback, useEffect, useRef, useState } from 'react';

/** Where the reader is pointing from: a title in the contents, or a plate on the sheet. */
export type SelectionSource = 'contents' | 'sheet';

interface Selection {
  index: number;
  source: SelectionSource;
  /** The last title pointed at. The plate keeps its picture and caption while it flies home. */
  last: number;
}

/**
 * useContentsSelection — which entry the reader is pointing at on the open
 * spread. Nothing is selected by default (a pre-selected first project reads
 * as a mistake). Leaving the list clears it after a short grace period, so
 * moving between rows never flickers back to the overview.
 *
 * The source matters: pointing at a title raises that project's plate, but
 * pointing at a plate on the sheet only marks its row. Raising a plate over the
 * sheet the pointer is reading would fire a leave, clear the selection, bring
 * the sheet back, and loop.
 */
export function useContentsSelection(graceMs = 180) {
  const [selection, setSelection] = useState<Selection>({ index: -1, source: 'contents', last: -1 });
  const timer = useRef(0);
  const point = useCallback((index: number, source: SelectionSource = 'contents') => {
    window.clearTimeout(timer.current);
    setSelection((s) => ({ index, source, last: source === 'contents' ? index : s.last }));
  }, []);
  const release = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSelection((s) => ({ index: -1, source: 'contents', last: s.last })), graceMs);
  }, [graceMs]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { active: selection.index, source: selection.source, last: selection.last, point, release };
}
