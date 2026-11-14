import { createContext, useContext } from 'react';

/** A screen on a board, asked to come up to the glass (ScreenInspector). */
export interface InspectRequest {
  src: string;
  alt: string;
  /** The capture's own pixels. */
  size: readonly [number, number];
  /** The board it sits on: the field behind the enlarged screen matches it. */
  tone: 'cloth' | 'paper' | 'bare';
  /** Transparent artwork: no backing and no edge. */
  cutout: boolean;
  /** The screen's element on the board. */
  from: HTMLElement;
  /** Where the reader clicked; null from the keyboard. */
  at: { x: number; y: number } | null;
}

/** Null outside a ScreenInspector: the screens are then plain images. */
export const InspectContext = createContext<((request: InspectRequest) => void) | null>(null);

/** useInspect — the page's one inspector, or null where there is none. */
export function useInspect() {
  return useContext(InspectContext);
}
