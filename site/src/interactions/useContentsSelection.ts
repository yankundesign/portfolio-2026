import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useContentsSelection — which entry the reader is pointing at on the open
 * spread. Nothing is selected by default (a pre-selected first project reads
 * as a mistake). Leaving the list clears it after a short grace period, so
 * moving between rows never flickers back to the overview.
 */
export function useContentsSelection(graceMs = 180) {
  const [active, setActive] = useState(-1);
  const timer = useRef(0);
  const point = useCallback((i: number) => {
    window.clearTimeout(timer.current);
    setActive(i);
  }, []);
  const release = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(-1), graceMs);
  }, [graceMs]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { active, point, release };
}
