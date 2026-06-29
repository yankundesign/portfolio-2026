import { useEffect, useState } from 'react';
import { TRANSITION_EVENTS } from './useTransitionState';
import { useReducedMotion } from './useReducedMotion';
import { gsap } from './gsap';

export type PlateProofPhase = 'paper' | 'rulings' | 'objects' | 'ready';

const REVEAL_SEEN_KEY = 'portfolio:plate-proof-reveal-seen';
const NOTEBOOK_OPENED_KEY = 'portfolio:notebook-opened';

const MAKE_READY_LINES = [
  'RULINGS SET',
  'OBJECTS PLACED',
  'PLATE READY',
] as const;

type MakeReadyLine = (typeof MAKE_READY_LINES)[number];

interface PlateProofRevealState {
  phase: PlateProofPhase;
  makeReadyLine: MakeReadyLine | null;
  showStartHint: boolean;
  sceneHidden: boolean;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function shouldPlayReveal(): boolean {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;
  return window.sessionStorage.getItem(REVEAL_SEEN_KEY) !== 'true';
}

function shouldShowStartHint(): boolean {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem(NOTEBOOK_OPENED_KEY) !== 'true';
}

function markRevealSeen(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(REVEAL_SEEN_KEY, 'true');
}

function markNotebookOpened(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(NOTEBOOK_OPENED_KEY, 'true');
}

export function usePlateProofReveal(): PlateProofRevealState {
  const reducedMotion = useReducedMotion();
  const [playReveal] = useState(() => shouldPlayReveal());
  const [phase, setPhase] = useState<PlateProofPhase>(() =>
    playReveal ? 'paper' : 'ready',
  );
  const [makeReadyLine, setMakeReadyLine] =
    useState<MakeReadyLine | null>(null);
  const [showStartHint, setShowStartHint] = useState(() =>
    shouldShowStartHint(),
  );

  useEffect(() => {
    const onNotebookOpen = () => {
      markNotebookOpened();
      setShowStartHint(false);
    };

    window.addEventListener(TRANSITION_EVENTS.open, onNotebookOpen);
    return () =>
      window.removeEventListener(TRANSITION_EVENTS.open, onNotebookOpen);
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;

    const timer = window.setTimeout(() => {
      setPhase('ready');
      setMakeReadyLine(null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !playReveal) {
      return;
    }

    const timeline = gsap.timeline();
    timeline
      .call(() => {
        setPhase('rulings');
        setMakeReadyLine(MAKE_READY_LINES[0]);
      }, undefined, 0.24)
      .call(() => {
        setPhase('objects');
        setMakeReadyLine(MAKE_READY_LINES[1]);
        markRevealSeen();
      }, undefined, 1.12)
      .call(() => {
        setMakeReadyLine(MAKE_READY_LINES[2]);
      }, undefined, 1.76)
      .call(() => {
        setPhase('ready');
        setMakeReadyLine(null);
      }, undefined, 2.42);

    return () => {
      timeline.kill();
    };
  }, [playReveal, reducedMotion]);

  return {
    phase,
    makeReadyLine,
    showStartHint: showStartHint && phase === 'ready',
    sceneHidden: phase === 'paper' || phase === 'rulings',
  };
}
