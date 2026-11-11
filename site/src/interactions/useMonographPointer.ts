import { useEffect, type RefObject } from 'react';
import { clamp, lerp } from './motion';
import type { NotebookEngine } from './notebookEngine';

/**
 * useMonographPointer — the homepage's response to the cursor, in one frame
 * loop:
 *  - the lamp: --mx / --my on the root for a soft light under the cursor;
 *  - the notebook: tilts toward the cursor, its shadow falls away from it;
 *  - the name: each letter's weight and softness swell under the cursor
 *    (Fraunces' own axes, not a font swap).
 * Off while the book is open, and entirely off under reduced motion.
 */
export function useMonographPointer({
  rootRef,
  slotRef,
  nameRef,
  engine,
  active,
  reducedMotion,
}: {
  rootRef: RefObject<HTMLElement | null>;
  slotRef: RefObject<HTMLElement | null>;
  nameRef: RefObject<HTMLElement | null>;
  engine: NotebookEngine;
  active: boolean;
  reducedMotion: boolean;
}) {
  useEffect(() => {
    if (reducedMotion) return;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight * 0.4, inside: false };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const slot = slotRef.current;
      if (slot) {
        const r = slot.getBoundingClientRect();
        pointer.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const letters = Array.from(nameRef.current?.querySelectorAll<HTMLElement>('[data-letter]') ?? []);
    const state = letters.map(() => ({ w: 300, soft: 0 }));
    let raf = 0;

    const frame = () => {
      const root = rootRef.current, slot = slotRef.current;
      const vw = window.innerWidth, vh = window.innerHeight;
      if (root) {
        root.style.setProperty('--mx', `${pointer.x}px`);
        root.style.setProperty('--my', `${pointer.y}px`);
      }
      if (active && slot) {
        const r = slot.getBoundingClientRect();
        const dx = (pointer.x - (r.left + r.width / 2)) / vw;
        const dy = (pointer.y - (r.top + r.height / 2)) / vh;
        const inside = pointer.inside;
        engine.aim({
          lx: clamp(-dx * 70, -40, 40),
          ly: clamp(18 - dy * 30, 6, 34),
          tiltY: (inside ? 9 : 3) * clamp(dx * 2, -1, 1),
          tiltX: (inside ? -7 : -2) * clamp(dy * 2, -1, 1),
          lift: inside ? 0.025 : 0,
          blur: inside ? 30 : 22,
          shadow: inside ? 0.45 : 0.55,
        });
        const R = vw * 0.2;
        letters.forEach((el, i) => {
          const b = el.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (b.left + b.width / 2), pointer.y - (b.top + b.height * 0.55));
          const f = Math.exp(-((d / R) ** 2));
          const s = state[i];
          s.w = lerp(s.w, 300 + 330 * f, 0.14);
          s.soft = lerp(s.soft, 100 * f, 0.14);
          el.style.fontWeight = s.w.toFixed(1);
          el.style.fontVariationSettings = `'opsz' 144, 'SOFT' ${s.soft.toFixed(1)}, 'WONK' 1`;
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [active, engine, nameRef, reducedMotion, rootRef, slotRef]);
}
