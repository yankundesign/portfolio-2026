import { useCallback, useEffect, useRef } from 'react';
import { clamp } from './motion';

/**
 * useTrailingPeek — a small photo that trails the cursor while a link is
 * hovered (the homepage's “About”). It leans into its direction of travel.
 * The frame loop runs only while the photo is shown or still catching up.
 * Reduced motion: no peek.
 */
export function useTrailingPeek(reducedMotion: boolean) {
  const peekRef = useRef<HTMLDivElement>(null);
  const control = useRef<{ show: () => void } | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, r: 0 };
    let raf = 0, last = 0;
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX + 28; target.y = e.clientY - 120;
      if (peekRef.current?.dataset.on === 'true') kick();
    };
    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const k = 1 - Math.pow(1 - 0.16, dt * 60);
      const nx = cur.x + (target.x - cur.x) * k, ny = cur.y + (target.y - cur.y) * k;
      cur.r += (clamp((nx - cur.x) * 0.8, -10, 10) - cur.r) * (1 - Math.pow(1 - 0.2, dt * 60));
      cur.x = nx; cur.y = ny;
      const el = peekRef.current;
      if (el) el.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0) rotate(${cur.r.toFixed(2)}deg)`;
      const moving = Math.abs(target.x - cur.x) > 0.3 || Math.abs(target.y - cur.y) > 0.3 || Math.abs(cur.r) > 0.05;
      if (moving || el?.dataset.on === 'true') raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    // appear where the pointer is, not where the photo last was
    control.current = { show: () => { cur.x = target.x; cur.y = target.y; cur.r = 0; kick(); } };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); control.current = null; };
  }, [reducedMotion]);

  const show = useCallback(() => {
    const el = peekRef.current;
    if (!el || reducedMotion) return;
    el.dataset.on = 'true';
    control.current?.show();
  }, [reducedMotion]);
  const hide = useCallback(() => { if (peekRef.current) peekRef.current.dataset.on = 'false'; }, []);
  return { peekRef, show, hide };
}
