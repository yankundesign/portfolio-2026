import { useCallback, useRef } from 'react';
import type { PointerEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function usePolaroidTilt<T extends HTMLElement>(maxDegrees = 4) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  const resetTilt = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (reducedMotion || event.pointerType === 'touch') return;

      const el = ref.current ?? event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      el.style.setProperty('--tilt-x', `${(-y * maxDegrees).toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${(x * maxDegrees).toFixed(2)}deg`);
    },
    [maxDegrees, reducedMotion],
  );

  return {
    ref,
    tiltHandlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTilt,
      onBlur: resetTilt,
    },
  };
}
