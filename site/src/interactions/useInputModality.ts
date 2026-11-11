import { useEffect, useState } from 'react';

/**
 * useInputModality — whether the reader last used the keyboard or a pointer.
 * Used to decide where focus lands when the notebook opens.
 */
export function useInputModality(): 'keyboard' | 'pointer' {
  const [mode, setMode] = useState<'keyboard' | 'pointer'>('pointer');
  useEffect(() => {
    const onKey = () => setMode('keyboard');
    const onPointer = () => setMode('pointer');
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('pointerdown', onPointer, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('pointerdown', onPointer, true);
    };
  }, []);
  return mode;
}
