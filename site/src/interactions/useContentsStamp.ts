import { useEffect, useState, type RefObject } from 'react';
import { ContentsStamp } from './contentsStamp';
import { useReducedMotion } from './useReducedMotion';

/**
 * useContentsStamp — the works page's pointed-at row becomes a solid object
 * (see ContentsStamp). Moves the band to row `index`, or sinks it when `index`
 * is −1.
 */
export function useContentsStamp(wrapRef: RefObject<HTMLElement | null>, index: number): void {
  const reducedMotion = useReducedMotion();
  const [stamp] = useState(() => new ContentsStamp());

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    stamp.attach(wrap);
    return () => stamp.detach();
  }, [stamp, wrapRef]);

  useEffect(() => { stamp.configure({ reducedMotion }); }, [stamp, reducedMotion]);

  useEffect(() => {
    if (index >= 0) stamp.point(index);
    else stamp.release();
  }, [stamp, index]);
}
