import { useEffect, useState, type RefObject } from 'react';
import { NotebookEngine, type NotebookState } from './notebookEngine';

export type { NotebookState, NotebookExtras } from './notebookEngine';

/**
 * useNotebook — creates the homepage notebook's engine once and keeps it in
 * step with React: the slot it rests in, reduced motion, and state reports.
 * The book's DOM parts register themselves through `engine.ref(part)`.
 */
export function useNotebook({
  slotRef,
  reducedMotion,
  onStateChange,
}: {
  slotRef: RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  onStateChange: (state: NotebookState) => void;
}): NotebookEngine {
  const [engine] = useState(() => new NotebookEngine());

  useEffect(() => {
    engine.configure({ reducedMotion, onStateChange });
  }, [engine, reducedMotion, onStateChange]);

  useEffect(() => {
    engine.attach(slotRef.current);
    return () => engine.detach();
  }, [engine, slotRef]);

  return engine;
}
