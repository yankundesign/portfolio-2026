import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../interactions/useReducedMotion';
import styles from './SpotlightDotGrid.module.css';

interface SpotlightDotGridProps {
  /** Spotlight radius in px. Inside this, dots read at full --ink-muted. */
  radius?: number;
  /** Falloff distance in px past the radius before the spotlight fades to nothing. */
  falloff?: number;
  /** Dot tile size in px. 24 aligns with the 8px baseline × 3. */
  spacing?: number;
}

/**
 * Spotlight dot grid — a faint editorial dot field that brightens under the
 * cursor. Sits behind the canvas grid as ambient paper texture.
 *
 * Layered:
 *   - .base: dots at --ink-faint, ambient.
 *   - .spotlight: same dots at --ink-muted, masked by a radial gradient
 *     centered on the cursor. Outside the radius+falloff, fully transparent.
 *
 * Updates two CSS custom properties (--cursor-x, --cursor-y) on pointermove
 * via rAF. Static fallback when prefers-reduced-motion is set: no spotlight,
 * just the faint base layer.
 *
 * Pointer-events: none on every layer. This is chrome, not interaction.
 */
export function SpotlightDotGrid({
  radius = 10,
  falloff = 100,
  spacing = 20,
}: SpotlightDotGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -9999, y: -9999 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    // Listen on the parent (the canvas surface) so the spotlight tracks the
    // cursor across the whole page, not just within our own bounding box.
    const surface = root.parentElement;
    if (!surface) return;

    const apply = () => {
      frameRef.current = null;
      root.style.setProperty('--cursor-x', `${targetRef.current.x}px`);
      root.style.setProperty('--cursor-y', `${targetRef.current.y}px`);
      root.style.setProperty('--spotlight-opacity', '1');
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      targetRef.current.x = event.clientX - rect.left;
      targetRef.current.y = event.clientY - rect.top;
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(apply);
      }
    };

    const onLeave = () => {
      // Fade the spotlight out gently rather than yanking it.
      root.style.setProperty('--spotlight-opacity', '0');
    };

    surface.addEventListener('pointermove', onMove);
    surface.addEventListener('pointerleave', onLeave);

    return () => {
      surface.removeEventListener('pointermove', onMove);
      surface.removeEventListener('pointerleave', onLeave);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      aria-hidden="true"
      style={
        {
          '--spotlight-radius': `${radius}px`,
          '--spotlight-falloff': `${falloff}px`,
          '--dot-spacing': `${spacing}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.base} />
      <div className={styles.spotlight} />
    </div>
  );
}
