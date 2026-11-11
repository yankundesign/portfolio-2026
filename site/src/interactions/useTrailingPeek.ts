import { useCallback, useEffect, useRef } from 'react';
import { clamp, lerp } from './motion';

/**
 * useTrailingPeek — a small photo that trails the cursor while a link is
 * hovered (the homepage's "About"). It leans into its direction of travel.
 * Reduced motion: no peek.
 */
export function useTrailingPeek(reducedMotion: boolean) {
  const peekRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, r: 0 };
    const onMove = (e: PointerEvent) => { target.x = e.clientX + 28; target.y = e.clientY - 120; };
    window.addEventListener('pointermove', onMove, { passive: true });
    let raf = 0;
    const frame = () => {
      const nx = lerp(cur.x, target.x, 0.16), ny = lerp(cur.y, target.y, 0.16);
      cur.r = lerp(cur.r, clamp((nx - cur.x) * 0.8, -10, 10), 0.2);
      cur.x = nx; cur.y = ny;
      if (peekRef.current) peekRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px) rotate(${cur.r}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, [reducedMotion]);

  const show = useCallback(() => { if (peekRef.current && !reducedMotion) peekRef.current.dataset.on = 'true'; }, [reducedMotion]);
  const hide = useCallback(() => { if (peekRef.current) peekRef.current.dataset.on = 'false'; }, []);
  return { peekRef, show, hide };
}
