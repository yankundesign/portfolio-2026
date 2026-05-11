import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

/**
 * WashTuneContext — Channel 2 of the in-production WatercolorWash tuning panel.
 *
 * SVG attribute values (filter primitives, gradient stops, path d strings)
 * cannot be driven by CSS custom properties, so they're lifted into React
 * context and consumed by InkFilters / WatercolorWash. The provider sits
 * above the entire app; the default value mirrors the hardcoded production
 * values exactly, so components render identically when the WashTunePanel
 * is unmounted.
 *
 * For values that *can* be expressed in CSS (peak opacities, transition
 * durations / delays, wash inset, animation periods), the panel writes
 * straight to document.documentElement.style instead — see WashTunePanel.
 */

export type LayerName = 'mist' | 'primary' | 'core';
export const LAYER_NAMES: LayerName[] = ['mist', 'primary', 'core'];

export interface GradientStop {
  /** Position 0–100 (percent along the radial gradient). */
  offset: number;
  /** Alpha 0–1 against the fixed ink-blue stopColor rgb(22, 38, 94). */
  alpha: number;
}

export interface LayerSVGState {
  path: string;
  gradient: {
    cx: number;
    cy: number;
    r: number;
    stops: GradientStop[];
  };
  filter: {
    baseFrequency: number;
    numOctaves: number;
    seed: number;
    /** feDisplacementMap scale */
    scale: number;
    /** feGaussianBlur stdDeviation */
    blur: number;
  };
}

export type WashSVGState = Record<LayerName, LayerSVGState>;

/* ─── Defaults ────────────────────────────────────────────────────────────
 *
 * These MUST match the hardcoded values in InkFilters.tsx and
 * WatercolorWash.tsx exactly — when the panel isn't mounted, components
 * render with this state, and any drift would change production behavior.
 *
 * Pulled from:
 *   InkFilters.tsx       — gradients (ink-wash-soft / -mid / -dense),
 *                          filters (ink-watercolor-mist / / -core)
 *   WatercolorWash.tsx   — three layer paths
 * ────────────────────────────────────────────────────────────────────────── */

export const DEFAULT_SVG_STATE: WashSVGState = {
  mist: {
    path: 'M 5,40 C 15,20 35,10 55,15 C 75,10 90,20 95,40 C 98,60 85,80 65,85 C 45,90 25,85 10,70 C 0,55 0,50 5,40 Z',
    gradient: {
      cx: 50,
      cy: 50,
      r: 56,
      stops: [
        { offset: 50, alpha: 0.28 },
        { offset: 60, alpha: 0.5 },
        { offset: 100, alpha: 0.58 },
      ],
    },
    filter: { baseFrequency: 0.013, numOctaves: 3, seed: 11, scale: 26, blur: 4 },
  },
  primary: {
    path: 'M 5,40 C 15,20 35,10 55,15 C 75,10 90,20 95,40 C 98,60 85,80 65,85 C 45,90 25,85 10,70 C 0,55 0,50 5,40 Z',
    gradient: {
      cx: 45,
      cy: 49,
      r: 57,
      stops: [
        { offset: 8, alpha: 0.7 },
        { offset: 32, alpha: 0.84 },
        { offset: 39, alpha: 0.25 },
        { offset: 75, alpha: 0.22 },
        { offset: 86, alpha: 0.1 },
      ],
    },
    filter: { baseFrequency: 0.018, numOctaves: 3, seed: 2, scale: 22, blur: 0.7 },
  },
  core: {
    path: 'M 10,85 C 20,70 35,55 50,40 C 65,25 80,15 90,10 C 95,15 85,35 70,50 C 55,65 35,80 20,90 C 15,92 10,90 10,85 Z',
    gradient: {
      cx: 59,
      cy: 43,
      r: 56,
      stops: [
        { offset: 5, alpha: 1 },
        { offset: 38, alpha: 0.85 },
        { offset: 55, alpha: 0.55 },
        { offset: 100, alpha: 0 },
      ],
    },
    filter: { baseFrequency: 0.026, numOctaves: 2, seed: 24, scale: 16, blur: 3.6 },
  },
};

/* ─── Filter <region> per layer ──────────────────────────────────────────
 *
 * Each filter reserves an extra render region around its source so the
 * displaced edges don't clip. These aren't tunable in the panel (changing
 * them mid-tune just makes preview confusing without giving useful
 * feedback) but InkFilters needs the values, so they live here for shared
 * lookup. */

export const FILTER_REGION: Record<LayerName, { xy: number; wh: number }> = {
  mist: { xy: -40, wh: 180 },
  primary: { xy: -30, wh: 160 },
  core: { xy: -25, wh: 150 },
};

export const GRADIENT_ID: Record<LayerName, string> = {
  mist: 'ink-wash-soft',
  primary: 'ink-wash-mid',
  core: 'ink-wash-dense',
};

export const FILTER_ID: Record<LayerName, string> = {
  mist: 'ink-watercolor-mist',
  primary: 'ink-watercolor',
  core: 'ink-watercolor-core',
};

interface WashTuneContextValue {
  svg: WashSVGState;
  setSvg: Dispatch<SetStateAction<WashSVGState>>;
}

const WashTuneContext = createContext<WashTuneContextValue>({
  svg: DEFAULT_SVG_STATE,
  setSvg: () => {},
});

export function WashTuneProvider({ children }: { children: ReactNode }) {
  const [svg, setSvg] = useState<WashSVGState>(DEFAULT_SVG_STATE);
  return (
    <WashTuneContext.Provider value={{ svg, setSvg }}>
      {children}
    </WashTuneContext.Provider>
  );
}

export function useWashTune(): WashTuneContextValue {
  return useContext(WashTuneContext);
}
