import { useCallback, useRef, type PointerEvent } from 'react';

/**
 * useFollowLabel — a small label that follows the pointer while it is over a
 * surface ("Close ×" on the paper around the open notebook). Positions are
 * written straight to the element; no renders per move.
 */
export function useFollowLabel(offset = 14) {
  const labelRef = useRef<HTMLDivElement>(null);
  const onPointerMove = useCallback((e: PointerEvent) => {
    const el = labelRef.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + offset}px, ${e.clientY + offset}px)`;
    el.dataset.on = 'true';
  }, [offset]);
  const onPointerLeave = useCallback(() => {
    if (labelRef.current) labelRef.current.dataset.on = 'false';
  }, []);
  return { labelRef, onPointerMove, onPointerLeave };
}
