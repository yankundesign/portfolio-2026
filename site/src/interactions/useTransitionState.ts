import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Notebook ↔ Canvas transition state machine.
 *
 *   idle ──► opening ──► open
 *    ▲                    │
 *    └────── closing ─────┘
 *
 * The hook is shared by three actors:
 *
 *   • NotebookCover (desk) calls `openNotebook()` on click
 *   • CanvasRoute calls `closeNotebook()` on the close button or Escape
 *   • NotebookTransition (overlay) listens to `state` and runs choreography
 *
 * The transition uses a custom-event bus rather than React Context because
 * the trigger components live inside route subtrees that mount/unmount —
 * dispatching to the window is more durable than threading a provider
 * through `<Routes>`. The hook reads the same bus everywhere it's used.
 *
 * Mid-flight intents are dropped, not queued. If a user clicks "open" while
 * already opening, nothing happens. Per the PRD: don't interrupt — it'll
 * look broken.
 */

export type TransitionState = 'idle' | 'opening' | 'open' | 'closing';

const OPEN_EVENT = 'notebook:open';
const CLOSE_EVENT = 'notebook:close';
const STATE_EVENT = 'notebook:state';

interface StateEventDetail {
  state: TransitionState;
}

function inferTransitionStateFromLocation(): TransitionState {
  if (typeof window === 'undefined') return 'idle';
  return window.location.pathname === '/works' ? 'open' : 'idle';
}

let currentTransitionState: TransitionState = inferTransitionStateFromLocation();

function getInitialTransitionState(): TransitionState {
  if (
    currentTransitionState === 'opening' ||
    currentTransitionState === 'closing'
  ) {
    return currentTransitionState;
  }

  return inferTransitionStateFromLocation();
}

/**
 * Source rectangle for the desk notebook (or canvas spread). Captured at
 * the moment the transition starts so the overlay knows where to morph
 * from / to. Read from elements tagged with `data-transition-source`.
 */
export interface TransitionRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function useTransitionState(): {
  state: TransitionState;
  openNotebook: () => void;
  closeNotebook: () => void;
} {
  const [state, setState] = useState<TransitionState>(() => {
    // Direct deep-link to /works skips the open animation; we treat the
    // notebook as already open. If a route mounts while the root overlay is
    // mid-flight, use the current in-memory state so it can coordinate its
    // own entrance choreography with the notebook transition.
    return getInitialTransitionState();
  });

  // Mirror state to a ref so the callbacks below can read it without
  // re-binding on every state change (the listeners would churn).
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Listen for state-change broadcasts from the NotebookTransition overlay.
  // The overlay is the single source of truth for state transitions; other
  // consumers of this hook (the trigger buttons) just re-read it here.
  useEffect(() => {
    const onStateChange = (e: Event) => {
      const detail = (e as CustomEvent<StateEventDetail>).detail;
      if (detail) setState(detail.state);
    };
    window.addEventListener(STATE_EVENT, onStateChange);
    return () => window.removeEventListener(STATE_EVENT, onStateChange);
  }, []);

  const openNotebook = useCallback(() => {
    // Guard: only fire from idle. Mid-transition clicks are intentionally
    // dropped to avoid visual jitter.
    if (stateRef.current !== 'idle') return;
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }, []);

  const closeNotebook = useCallback(() => {
    if (stateRef.current !== 'open') return;
    window.dispatchEvent(new CustomEvent(CLOSE_EVENT));
  }, []);

  return { state, openNotebook, closeNotebook };
}

/**
 * Internal helpers for the NotebookTransition overlay. Not exported from
 * the hook's public surface — the overlay subscribes directly to the event
 * bus so it can capture both the request and the source rect in one tick.
 */
export const TRANSITION_EVENTS = {
  open: OPEN_EVENT,
  close: CLOSE_EVENT,
  state: STATE_EVENT,
} as const;

/** Broadcast a state change. Called by the overlay only. */
export function broadcastState(state: TransitionState): void {
  currentTransitionState = state;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<StateEventDetail>(STATE_EVENT, { detail: { state } }),
  );
}

/**
 * Read the current bounds of a tagged transition source. Returns null if
 * the element isn't on the page yet (e.g. close fires before the canvas
 * has measured itself). Callers should fall back to a viewport-centered
 * default rect in that case.
 *
 * For the desk notebook specifically, callers should also check
 * `getCachedDeskRect()` as a backup — when the close transition fires,
 * the user is on /works and the desk's notebook isn't in the DOM, so
 * `readSourceRect('notebook')` returns null. The cache (populated on the
 * preceding open) preserves the actual desk rect across the canvas
 * detour. See `cachedDeskRect` below.
 */
export function readSourceRect(name: 'notebook' | 'spread'): TransitionRect | null {
  if (typeof document === 'undefined') return null;
  const el = document.querySelector<HTMLElement>(
    `[data-transition-source="${name}"]`,
  );
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Module-level cache of the desk notebook's last-measured rect. Populated
 * by the open choreography (when the desk IS in the DOM and we can
 * measure it accurately) and read by the close choreography (when the
 * user is on /works and the desk's notebook is NOT in the DOM, so a
 * direct measurement returns null).
 *
 * Without this cache, the close falls back to a hardcoded 340px-wide
 * rect — but the desk's actual notebook is responsive (340/400/480px
 * across viewports), so the cover lands at a too-small size at the end
 * of close, making the reveal-to-desk a visible jump.
 */
let cachedDeskRect: TransitionRect | null = null;

export function cacheDeskRect(rect: TransitionRect): void {
  cachedDeskRect = rect;
}

export function getCachedDeskRect(): TransitionRect | null {
  return cachedDeskRect;
}
