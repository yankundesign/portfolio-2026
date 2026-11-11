import { useCallback, useEffect, useRef, type PointerEvent } from 'react';
import { CursorLabel } from './cursorLabel';

/**
 * useFollowLabel — a label that replaces the cursor while it is over a surface
 * (“Close ×” on the paper around the open notebook). The surface hides the
 * system cursor in CSS; the label grows out of the pointer and shrinks back
 * into it. See CursorLabel.
 */
export function useFollowLabel() {
  const labelRef = useRef<HTMLDivElement>(null);
  const label = useRef<CursorLabel | null>(null);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    const l = new CursorLabel(el);
    label.current = l;
    return () => { l.destroy(); label.current = null; };
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => { label.current?.show(e.clientX, e.clientY); }, []);
  const onPointerLeave = useCallback(() => { label.current?.hide(); }, []);
  const onPointerDown = useCallback(() => { label.current?.press(true); }, []);
  const hide = useCallback(() => { label.current?.hide(); }, []);
  return { labelRef, onPointerMove, onPointerLeave, onPointerDown, hide };
}
