import { useCallback, useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface ObjectTiltOptions {
  maxDegrees?: number;
  liftY?: number;
  scale?: number;
}

const DEFAULT_MAX_TILT = 11;
const DEFAULT_LIFT_Y = -10;
const DEFAULT_SCALE = 1.025;

export function useObjectTilt<T extends HTMLElement>({
  maxDegrees = DEFAULT_MAX_TILT,
  liftY = DEFAULT_LIFT_Y,
  scale = DEFAULT_SCALE,
}: ObjectTiltOptions = {}) {
  const ref = useRef<T | null>(null);
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const writeVars = useCallback(
    (el: HTMLElement, x = 0, y = 0) => {
      const tiltX = -y * maxDegrees;
      const tiltY = x * maxDegrees;
      const shadowX = -x * 30;
      const shadowY = 14 + Math.abs(y) * 14;
      const shadowScale = 1.03 + Math.abs(x) * 0.08 + Math.abs(y) * 0.06;

      el.style.setProperty('--object-tilt-x', `${tiltX.toFixed(2)}deg`);
      el.style.setProperty('--object-tilt-y', `${tiltY.toFixed(2)}deg`);
      el.style.setProperty('--object-shadow-x', `${shadowX.toFixed(2)}px`);
      el.style.setProperty('--object-shadow-y', `${shadowY.toFixed(2)}px`);
      el.style.setProperty('--object-shadow-scale', shadowScale.toFixed(3));
    },
    [maxDegrees],
  );

  const resetTilt = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    el.style.removeProperty('--object-lift-y');
    el.style.removeProperty('--object-scale');
    writeVars(el);
  }, [writeVars]);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const handleWindowPointerMove = (event: globalThis.PointerEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (isOutside) resetTilt();
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleWindowPointerMove);
  }, [reducedMotion, resetTilt]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (reducedMotion || event.pointerType === 'touch') return;

      const el = ref.current ?? event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      el.style.setProperty('--object-lift-y', `${liftY}px`);
      el.style.setProperty('--object-scale', `${scale}`);

      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        writeVars(el, x, y);
        frameRef.current = null;
      });
    },
    [liftY, reducedMotion, scale, writeVars],
  );

  return {
    ref,
    tiltHandlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTilt,
      onPointerCancel: resetTilt,
      onMouseLeave: resetTilt,
      onBlur: resetTilt,
    },
  };
}
