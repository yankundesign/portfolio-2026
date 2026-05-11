import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_SVG_STATE,
  FILTER_ID,
  GRADIENT_ID,
  LAYER_NAMES,
  type GradientStop,
  type LayerName,
  type LayerSVGState,
  type WashSVGState,
  useWashTune,
} from './WashTuneContext';
import styles from './WashTunePanel.module.css';

/* ─────────────────────────────────────────────────────────────────────────
 * WashTunePanel — in-production tuning surface for the WatercolorWash.
 *
 * Mounted by App when ?tune=wash is in the URL. Two-channel architecture:
 *
 *   • Channel 1 (CSS custom properties on document.documentElement) drives
 *     wash inset, per-layer peak opacities, transition durations / delays,
 *     and animation period. The companion CSS modules read these vars with
 *     the production hardcoded values as fallbacks, so the panel disappearing
 *     reverts behavior exactly.
 *
 *   • Channel 2 (WashTuneContext) drives SVG attribute values that can't
 *     be expressed in CSS — gradient stops, filter primitives, path d
 *     strings. InkFilters and WatercolorWash consume the context.
 *
 * Drift-amount overrides are emitted as a <style> block with @keyframes
 * matching the production names. Same-name keyframes loaded later in the
 * document order win, so the override takes effect without disturbing the
 * base CSS.
 * ───────────────────────────────────────────────────────────────────────── */

/* ─── Constants & presets ─────────────────────────────────────────────── */

const HARDCODED_DEFAULTS = {
  inset: { top: -14, right: -14, bottom: -19, left: -6 },
  layers: {
    mist: {
      peakOpacity: 0.77,
      fadeInDuration: 630,
      fadeInDelay: 0,
      fadeOutDuration: 1155,
      fadeOutDelay: 158,
      periodSeconds: 8,
    },
    primary: {
      peakOpacity: 1,
      fadeInDuration: 578,
      fadeInDelay: 84,
      fadeOutDuration: 945,
      fadeOutDelay: 84,
      periodSeconds: 11,
    },
    core: {
      peakOpacity: 0.83,
      fadeInDuration: 525,
      fadeInDelay: 168,
      fadeOutDuration: 735,
      fadeOutDelay: 0,
      periodSeconds: 9,
    },
  },
} as const;

type SpeedKey = 'default' | 'off' | 'slow' | 'medium' | 'fast';
const SPEED_PERIOD: Record<Exclude<SpeedKey, 'default' | 'off'>, number> = {
  slow: 20,
  medium: 13,
  fast: 8,
};

type AmountKey = 'default' | 'none' | 'subtle' | 'medium' | 'bold';
const AMOUNT_FACTOR: Record<Exclude<AmountKey, 'default'>, number> = {
  none: 0,
  subtle: 0.5,
  medium: 1.0,
  bold: 1.5,
};

type CascadeDirection = 'outside-in' | 'inside-out' | 'simultaneous';
const CASCADE_DELAYS: Record<CascadeDirection, Record<LayerName, number>> = {
  'outside-in': { mist: 0, primary: 80, core: 160 },
  'inside-out': { mist: 160, primary: 80, core: 0 },
  simultaneous: { mist: 0, primary: 0, core: 0 },
};

/* Production keyframe amplitudes — the panel scales these by AMOUNT_FACTOR
 * when the user picks a non-default amount. The shape mirrors the three
 * non-zero keyframes in WatercolorWash.module.css. */
interface KeyframePoint {
  scale: number;
  rotate: number;
  tx: number;
  ty: number;
}

const KEYFRAME_BASE: Record<LayerName, [KeyframePoint, KeyframePoint, KeyframePoint]> = {
  mist: [
    { scale: 1.15, rotate: -7.5, tx: 6, ty: -3 },
    { scale: 1.09, rotate: 6, tx: -4.5, ty: 4.5 },
    { scale: 1.18, rotate: -3, tx: 3, ty: 1.5 },
  ],
  primary: [
    { scale: 1.06, rotate: 3, tx: -2, ty: 2 },
    { scale: 1.08, rotate: -4, tx: 3, ty: -1 },
    { scale: 1.04, rotate: 2, tx: -1, ty: 2 },
  ],
  core: [
    { scale: 1.08, rotate: -2, tx: 1, ty: -1 },
    { scale: 0.92, rotate: 3, tx: -2, ty: 1 },
    { scale: 1.06, rotate: 1, tx: 1, ty: 1 },
  ],
};

const SHAPE_PRESETS = {
  'wide cloud':
    'M 5,40 C 15,20 35,10 55,15 C 75,10 90,20 95,40 C 98,60 85,80 65,85 C 45,90 25,85 10,70 C 0,55 0,50 5,40 Z',
  'diagonal stroke':
    'M 10,85 C 20,70 35,55 50,40 C 65,25 80,15 90,10 C 95,15 85,35 70,50 C 55,65 35,80 20,90 C 15,92 10,90 10,85 Z',
  'compact mark':
    'M 35,35 C 45,25 60,25 70,35 C 80,45 80,60 70,70 C 60,80 45,80 35,70 C 25,60 25,45 35,35 Z',
  'vertical drag':
    'M 40,5 C 50,10 60,20 58,35 C 55,50 60,65 55,80 C 50,90 45,95 42,90 C 38,80 42,65 40,50 C 38,35 35,20 38,10 C 39,7 40,5 40,5 Z',
} as const;
type PresetName = keyof typeof SHAPE_PRESETS;

/* ─── Panel state shape ─────────────────────────────────────────────── */

interface LayerCSS {
  peakOpacity: number;
  fadeInDuration: number;
  fadeInDelay: number;
  fadeOutDuration: number;
  fadeOutDelay: number;
  speed: SpeedKey;
  amount: AmountKey;
}

interface CSSState {
  inset: { top: number; right: number; bottom: number; left: number };
  layers: Record<LayerName, LayerCSS>;
}

const DEFAULT_CSS_STATE: CSSState = {
  inset: { ...HARDCODED_DEFAULTS.inset },
  layers: {
    mist: {
      peakOpacity: HARDCODED_DEFAULTS.layers.mist.peakOpacity,
      fadeInDuration: HARDCODED_DEFAULTS.layers.mist.fadeInDuration,
      fadeInDelay: HARDCODED_DEFAULTS.layers.mist.fadeInDelay,
      fadeOutDuration: HARDCODED_DEFAULTS.layers.mist.fadeOutDuration,
      fadeOutDelay: HARDCODED_DEFAULTS.layers.mist.fadeOutDelay,
      speed: 'default',
      amount: 'default',
    },
    primary: {
      peakOpacity: HARDCODED_DEFAULTS.layers.primary.peakOpacity,
      fadeInDuration: HARDCODED_DEFAULTS.layers.primary.fadeInDuration,
      fadeInDelay: HARDCODED_DEFAULTS.layers.primary.fadeInDelay,
      fadeOutDuration: HARDCODED_DEFAULTS.layers.primary.fadeOutDuration,
      fadeOutDelay: HARDCODED_DEFAULTS.layers.primary.fadeOutDelay,
      speed: 'default',
      amount: 'default',
    },
    core: {
      peakOpacity: HARDCODED_DEFAULTS.layers.core.peakOpacity,
      fadeInDuration: HARDCODED_DEFAULTS.layers.core.fadeInDuration,
      fadeInDelay: HARDCODED_DEFAULTS.layers.core.fadeInDelay,
      fadeOutDuration: HARDCODED_DEFAULTS.layers.core.fadeOutDuration,
      fadeOutDelay: HARDCODED_DEFAULTS.layers.core.fadeOutDelay,
      speed: 'default',
      amount: 'default',
    },
  },
};

/* ─── CSS variable names ─────────────────────────────────────────────── */

const insetVarName = (side: 'top' | 'right' | 'bottom' | 'left') =>
  `--wash-inset-${side}`;
const layerVarName = (layer: LayerName, suffix: string) =>
  `--wash-${layer}-${suffix}`;
const animVarName = (layer: LayerName) => `--wash-anim-${layer}`;

/* ─── CSS var sync ───────────────────────────────────────────────────── */

const ALL_VAR_NAMES = (() => {
  const names: string[] = [];
  (['top', 'right', 'bottom', 'left'] as const).forEach((s) => names.push(insetVarName(s)));
  for (const layer of LAYER_NAMES) {
    names.push(layerVarName(layer, 'peak'));
    names.push(layerVarName(layer, 'fade-in-ms'));
    names.push(layerVarName(layer, 'fade-in-delay-ms'));
    names.push(layerVarName(layer, 'fade-out-ms'));
    names.push(layerVarName(layer, 'fade-out-delay-ms'));
    names.push(animVarName(layer));
  }
  return names;
})();

function applyCSSVars(state: CSSState) {
  const root = document.documentElement.style;
  root.setProperty(insetVarName('top'), `${state.inset.top}%`);
  root.setProperty(insetVarName('right'), `${state.inset.right}%`);
  root.setProperty(insetVarName('bottom'), `${state.inset.bottom}%`);
  root.setProperty(insetVarName('left'), `${state.inset.left}%`);
  for (const layer of LAYER_NAMES) {
    const l = state.layers[layer];
    root.setProperty(layerVarName(layer, 'peak'), `${l.peakOpacity}`);
    root.setProperty(layerVarName(layer, 'fade-in-ms'), `${l.fadeInDuration}ms`);
    root.setProperty(layerVarName(layer, 'fade-in-delay-ms'), `${l.fadeInDelay}ms`);
    root.setProperty(layerVarName(layer, 'fade-out-ms'), `${l.fadeOutDuration}ms`);
    root.setProperty(layerVarName(layer, 'fade-out-delay-ms'), `${l.fadeOutDelay}ms`);
    root.setProperty(animVarName(layer), buildAnimationShorthand(layer, l.speed));
  }
}

function clearCSSVars() {
  const root = document.documentElement.style;
  for (const name of ALL_VAR_NAMES) root.removeProperty(name);
}

function buildAnimationShorthand(layer: LayerName, speed: SpeedKey): string {
  if (speed === 'default') {
    // Empty value would invalidate the var; emit the production shorthand.
    return `ink-drift-${layer} ${HARDCODED_DEFAULTS.layers[layer].periodSeconds}s ease-in-out infinite`;
  }
  if (speed === 'off') return 'none';
  return `ink-drift-${layer} ${SPEED_PERIOD[speed]}s ease-in-out infinite`;
}

/* ─── Keyframes <style> generation ───────────────────────────────────── */

function buildKeyframesCSS(state: CSSState): string {
  const blocks: string[] = [];
  for (const layer of LAYER_NAMES) {
    const amount = state.layers[layer].amount;
    if (amount === 'default') continue;
    const factor = AMOUNT_FACTOR[amount];
    const base = KEYFRAME_BASE[layer];
    const points: [KeyframePoint, KeyframePoint, KeyframePoint] = [
      scaleKeyframe(base[0], factor),
      scaleKeyframe(base[1], factor),
      scaleKeyframe(base[2], factor),
    ];
    blocks.push(renderKeyframes(`ink-drift-${layer}`, points));
  }
  return blocks.join('\n\n');
}

function scaleKeyframe(p: KeyframePoint, factor: number): KeyframePoint {
  return {
    scale: 1 + (p.scale - 1) * factor,
    rotate: p.rotate * factor,
    tx: p.tx * factor,
    ty: p.ty * factor,
  };
}

function renderKeyframes(
  name: string,
  points: [KeyframePoint, KeyframePoint, KeyframePoint],
): string {
  const lines = ['@keyframes ' + name + ' {'];
  lines.push('  0% { transform: scale(1) rotate(0deg) translate(0, 0); }');
  [25, 50, 75].forEach((pct, i) => {
    const p = points[i];
    lines.push(
      `  ${pct}% { transform: scale(${round(p.scale, 3)}) rotate(${round(p.rotate, 1)}deg) translate(${round(p.tx, 1)}%, ${round(p.ty, 1)}%); }`,
    );
  });
  lines.push('  100% { transform: scale(1) rotate(0deg) translate(0, 0); }');
  lines.push('}');
  return lines.join('\n');
}

function round(n: number, decimals: number): string {
  return Number(n.toFixed(decimals)).toString();
}

/* ─── Diff helpers ───────────────────────────────────────────────────── */

function isEqualLayer(a: LayerSVGState, b: LayerSVGState): boolean {
  if (a.path !== b.path) return false;
  if (a.gradient.cx !== b.gradient.cx) return false;
  if (a.gradient.cy !== b.gradient.cy) return false;
  if (a.gradient.r !== b.gradient.r) return false;
  if (a.gradient.stops.length !== b.gradient.stops.length) return false;
  for (let i = 0; i < a.gradient.stops.length; i++) {
    if (a.gradient.stops[i].offset !== b.gradient.stops[i].offset) return false;
    if (a.gradient.stops[i].alpha !== b.gradient.stops[i].alpha) return false;
  }
  if (a.filter.baseFrequency !== b.filter.baseFrequency) return false;
  if (a.filter.numOctaves !== b.filter.numOctaves) return false;
  if (a.filter.seed !== b.filter.seed) return false;
  if (a.filter.scale !== b.filter.scale) return false;
  if (a.filter.blur !== b.filter.blur) return false;
  return true;
}

/* ─── Export generators ──────────────────────────────────────────────── */

function buildCopyAsOverrides(css: CSSState, svg: WashSVGState): string {
  const cssLines: string[] = [];
  cssLines.push('/* WashTunePanel overrides — paste into tokens.css :root */');
  cssLines.push(':root {');

  const pushIfDiff = <T,>(name: string, value: T, def: T, format: (v: T) => string) => {
    if (value !== def) cssLines.push(`  ${name}: ${format(value)};`);
  };

  pushIfDiff(insetVarName('top'), css.inset.top, HARDCODED_DEFAULTS.inset.top, (v) => `${v}%`);
  pushIfDiff(insetVarName('right'), css.inset.right, HARDCODED_DEFAULTS.inset.right, (v) => `${v}%`);
  pushIfDiff(insetVarName('bottom'), css.inset.bottom, HARDCODED_DEFAULTS.inset.bottom, (v) => `${v}%`);
  pushIfDiff(insetVarName('left'), css.inset.left, HARDCODED_DEFAULTS.inset.left, (v) => `${v}%`);

  for (const layer of LAYER_NAMES) {
    const l = css.layers[layer];
    const d = HARDCODED_DEFAULTS.layers[layer];
    pushIfDiff(layerVarName(layer, 'peak'), l.peakOpacity, d.peakOpacity, (v) => `${v}`);
    pushIfDiff(layerVarName(layer, 'fade-in-ms'), l.fadeInDuration, d.fadeInDuration, (v) => `${v}ms`);
    pushIfDiff(layerVarName(layer, 'fade-in-delay-ms'), l.fadeInDelay, d.fadeInDelay, (v) => `${v}ms`);
    pushIfDiff(layerVarName(layer, 'fade-out-ms'), l.fadeOutDuration, d.fadeOutDuration, (v) => `${v}ms`);
    pushIfDiff(layerVarName(layer, 'fade-out-delay-ms'), l.fadeOutDelay, d.fadeOutDelay, (v) => `${v}ms`);
    if (l.speed !== 'default') {
      cssLines.push(`  ${animVarName(layer)}: ${buildAnimationShorthand(layer, l.speed)};`);
    }
  }
  cssLines.push('}');

  // Keyframes for non-default amount
  const kf = buildKeyframesCSS(css);
  if (kf) {
    cssLines.push('');
    cssLines.push('/* Drift-amount overrides — paste at the bottom of tokens.css */');
    cssLines.push(kf);
  }

  // SVG overrides as JSON
  const svgDiff: Partial<WashSVGState> = {};
  for (const layer of LAYER_NAMES) {
    if (!isEqualLayer(svg[layer], DEFAULT_SVG_STATE[layer])) {
      svgDiff[layer] = svg[layer];
    }
  }
  const jsonBlock =
    Object.keys(svgDiff).length === 0
      ? '/* (no SVG overrides) */'
      : '/* SVG overrides — paste into a presets file */\n' +
        JSON.stringify(svgDiff, null, 2);

  return cssLines.join('\n') + '\n\n' + jsonBlock;
}

function buildSourceReplacement(css: CSSState, svg: WashSVGState): string {
  const out: string[] = [];

  /* NotebookCover.module.css — wash inset + per-layer fade-in/out */
  out.push('// ─── NotebookCover.module.css ───');
  out.push('.wash {');
  out.push(`  inset: ${css.inset.top}% ${css.inset.right}% ${css.inset.bottom}% ${css.inset.left}%;`);
  out.push('}');
  out.push('');

  for (const layer of LAYER_NAMES) {
    const l = css.layers[layer];
    out.push(`.button [data-wash-layer='${layer}'] {`);
    out.push(`  transition: opacity ${l.fadeOutDuration}ms var(--ease-out) ${l.fadeOutDelay}ms;`);
    out.push('}');
    out.push('');
  }
  for (const layer of LAYER_NAMES) {
    const l = css.layers[layer];
    out.push(`.button:hover [data-wash-layer='${layer}'],`);
    out.push(`.button:focus-visible [data-wash-layer='${layer}'] {`);
    out.push(`  opacity: ${l.peakOpacity};`);
    out.push(`  transition: opacity ${l.fadeInDuration}ms var(--ease-out) ${l.fadeInDelay}ms;`);
    out.push('}');
    out.push('');
  }

  /* WatercolorWash.module.css — animation period + keyframes */
  out.push('// ─── WatercolorWash.module.css ───');
  for (const layer of LAYER_NAMES) {
    const period =
      css.layers[layer].speed === 'default'
        ? HARDCODED_DEFAULTS.layers[layer].periodSeconds
        : css.layers[layer].speed === 'off'
          ? 0
          : SPEED_PERIOD[css.layers[layer].speed as Exclude<SpeedKey, 'default' | 'off'>];
    if (css.layers[layer].speed === 'off') {
      out.push(`[data-wash-layer='${layer}'] { animation: none; }`);
    } else {
      out.push(`[data-wash-layer='${layer}'] {`);
      out.push(`  animation: ink-drift-${layer} ${period}s ease-in-out infinite;`);
      out.push('}');
    }
    out.push('');
  }
  const kf = buildKeyframesCSS(css);
  if (kf) {
    out.push(kf);
    out.push('');
  }

  /* InkFilters.tsx — gradients + filters */
  out.push('// ─── InkFilters.tsx ───');
  for (const layer of LAYER_NAMES) {
    const g = svg[layer].gradient;
    out.push(`<radialGradient id="${GRADIENT_ID[layer]}" cx="${g.cx}%" cy="${g.cy}%" r="${g.r}%">`);
    for (const stop of g.stops) {
      out.push(`  <stop offset="${stop.offset}%" stopColor="rgba(22, 38, 94, ${stop.alpha})" />`);
    }
    out.push('</radialGradient>');
    out.push('');
  }
  for (const layer of LAYER_NAMES) {
    const f = svg[layer].filter;
    out.push(`<filter id="${FILTER_ID[layer]}" ...>`);
    out.push(`  <feTurbulence type="fractalNoise" baseFrequency="${f.baseFrequency}" numOctaves="${f.numOctaves}" seed="${f.seed}" result="noise" />`);
    out.push(`  <feDisplacementMap in="SourceGraphic" in2="noise" scale="${f.scale}" result="displaced" />`);
    out.push(`  <feGaussianBlur in="displaced" stdDeviation="${f.blur}" />`);
    out.push('</filter>');
    out.push('');
  }

  /* WatercolorWash.tsx — path d strings */
  out.push('// ─── WatercolorWash.tsx (per-layer path d) ───');
  for (const layer of LAYER_NAMES) {
    out.push(`// ${layer}:`);
    out.push(`d="${svg[layer].path}"`);
    out.push('');
  }

  return out.join('\n');
}

/* ─── UI sub-components ──────────────────────────────────────────────── */

interface SectionProps {
  id: string;
  title: string;
  active: string | null;
  setActive: (id: string | null) => void;
  children: ReactNode;
}

function Section({ id, title, active, setActive, children }: SectionProps) {
  const open = active === id;
  return (
    <section className={styles.section}>
      <button
        type="button"
        className={styles.sectionHeader}
        onClick={() => setActive(open ? null : id)}
      >
        <span>{title}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>
          ›
        </span>
      </button>
      {open ? <div className={styles.sectionBody}>{children}</div> : null}
    </section>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, format, onChange }: SliderProps) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className={styles.rowValue}>{format ? format(value) : value}</span>
    </div>
  );
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}

function Select<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span />
    </div>
  );
}

/* ─── Main panel ─────────────────────────────────────────────────────── */

export default function WashTunePanel() {
  const { svg, setSvg } = useWashTune();
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>('where');
  const [forceHover, setForceHover] = useState(false);
  const [showBounds, setShowBounds] = useState(false);
  const [css, setCss] = useState<CSSState>(DEFAULT_CSS_STATE);
  const [showAdvanced, setShowAdvanced] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<'overrides' | 'source' | null>(null);
  const copyTimer = useRef<number | null>(null);

  /* Sync CSS vars to documentElement on every change. */
  useEffect(() => {
    applyCSSVars(css);
    return () => {
      // Only clean up on full unmount, not on every state change.
    };
  }, [css]);

  /* Cleanup: remove all CSS vars when the panel unmounts. */
  useEffect(() => {
    return () => {
      clearCSSVars();
      document.documentElement.classList.remove('wash-force-hover', 'wash-show-bounds');
    };
  }, []);

  /* Force-hover and show-bounds → classes on documentElement. */
  useEffect(() => {
    document.documentElement.classList.toggle('wash-force-hover', forceHover);
  }, [forceHover]);
  useEffect(() => {
    document.documentElement.classList.toggle('wash-show-bounds', showBounds);
  }, [showBounds]);

  /* Cmd/Ctrl+. toggles visibility. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Updaters ── */

  const setInset = useCallback(
    (side: 'top' | 'right' | 'bottom' | 'left', value: number) =>
      setCss((s) => ({ ...s, inset: { ...s.inset, [side]: value } })),
    [],
  );

  const setAllInsets = useCallback(
    (value: number) =>
      setCss((s) => ({
        ...s,
        inset: { top: value, right: value, bottom: value, left: value },
      })),
    [],
  );

  const setLayerCSS = useCallback(
    <K extends keyof LayerCSS>(layer: LayerName, key: K, value: LayerCSS[K]) =>
      setCss((s) => ({
        ...s,
        layers: { ...s.layers, [layer]: { ...s.layers[layer], [key]: value } },
      })),
    [],
  );

  const setSvgLayer = useCallback(
    (layer: LayerName, partial: Partial<LayerSVGState>) =>
      setSvg((s) => ({ ...s, [layer]: { ...s[layer], ...partial } })),
    [setSvg],
  );

  const setSvgGradient = useCallback(
    (layer: LayerName, partial: Partial<LayerSVGState['gradient']>) =>
      setSvg((s) => ({
        ...s,
        [layer]: {
          ...s[layer],
          gradient: { ...s[layer].gradient, ...partial },
        },
      })),
    [setSvg],
  );

  const setSvgFilter = useCallback(
    (layer: LayerName, partial: Partial<LayerSVGState['filter']>) =>
      setSvg((s) => ({
        ...s,
        [layer]: { ...s[layer], filter: { ...s[layer].filter, ...partial } },
      })),
    [setSvg],
  );

  const setGradientStop = useCallback(
    (layer: LayerName, index: number, field: keyof GradientStop, value: number) =>
      setSvg((s) => {
        const stops = s[layer].gradient.stops.map((stop, i) =>
          i === index ? { ...stop, [field]: value } : stop,
        );
        return {
          ...s,
          [layer]: { ...s[layer], gradient: { ...s[layer].gradient, stops } },
        };
      }),
    [setSvg],
  );

  /* Cascade direction shortcut. */
  const setCascadeDirection = useCallback((dir: CascadeDirection) => {
    setCss((s) => ({
      ...s,
      layers: {
        mist: { ...s.layers.mist, fadeInDelay: CASCADE_DELAYS[dir].mist },
        primary: { ...s.layers.primary, fadeInDelay: CASCADE_DELAYS[dir].primary },
        core: { ...s.layers.core, fadeInDelay: CASCADE_DELAYS[dir].core },
      },
    }));
  }, []);

  /* Cascade timing master scaler. */
  const [cascadeScaler, setCascadeScaler] = useState(1.0);
  const applyCascadeScaler = useCallback((scale: number) => {
    setCascadeScaler(scale);
    setCss((s) => ({
      ...s,
      layers: {
        mist: scaleLayerTimings(s.layers.mist, HARDCODED_DEFAULTS.layers.mist, scale),
        primary: scaleLayerTimings(s.layers.primary, HARDCODED_DEFAULTS.layers.primary, scale),
        core: scaleLayerTimings(s.layers.core, HARDCODED_DEFAULTS.layers.core, scale),
      },
    }));
  }, []);

  /* Filter intensity master per layer. */
  const setFilterIntensity = useCallback(
    (layer: LayerName, multiplier: number) => {
      const def = DEFAULT_SVG_STATE[layer].filter;
      setSvgFilter(layer, {
        scale: round1(def.scale * multiplier),
        blur: round1(def.blur * multiplier),
      });
    },
    [setSvgFilter],
  );

  /* Reset everything to defaults. */
  const resetAll = useCallback(() => {
    setCss(DEFAULT_CSS_STATE);
    setSvg(DEFAULT_SVG_STATE);
    setForceHover(false);
    setShowBounds(false);
    setCascadeScaler(1.0);
    clearCSSVars();
  }, [setSvg]);

  /* Copy handlers. */
  const copy = useCallback((type: 'overrides' | 'source', text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(null), 1500);
  }, []);

  /* Keyframes <style> for drift-amount overrides. */
  const keyframesText = useMemo(() => buildKeyframesCSS(css), [css]);

  if (!visible) {
    return (
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => setVisible(true)}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}
        aria-label="Show wash tuning panel"
      >
        ◉
      </button>
    );
  }

  return (
    <div className={styles.panel} role="dialog" aria-label="Wash tuning panel">
      {/* Inject overriding @keyframes for drift-amount changes. */}
      {keyframesText ? <style>{keyframesText}</style> : null}

      <header className={styles.header}>
        <h2 className={styles.title}>Wash · tune</h2>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setVisible(false)}
            aria-label="Hide panel (Cmd/Ctrl+.)"
            title="Hide (Cmd/Ctrl+.)"
          >
            ×
          </button>
        </div>
      </header>

      <div className={styles.toggles}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={forceHover}
            onChange={(e) => setForceHover(e.target.checked)}
          />
          Force hover
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showBounds}
            onChange={(e) => setShowBounds(e.target.checked)}
          />
          Show wash bounds
        </label>
      </div>

      <div className={styles.body}>
        {/* ─── WHERE ─── */}
        <Section
          id="where"
          title="Where · positioning"
          active={activeSection}
          setActive={setActiveSection}
        >
          <Slider
            label="Inset top"
            value={css.inset.top}
            min={-50}
            max={0}
            step={1}
            format={(v) => `${v}%`}
            onChange={(v) => setInset('top', v)}
          />
          <Slider
            label="Inset right"
            value={css.inset.right}
            min={-50}
            max={0}
            step={1}
            format={(v) => `${v}%`}
            onChange={(v) => setInset('right', v)}
          />
          <Slider
            label="Inset bottom"
            value={css.inset.bottom}
            min={-50}
            max={0}
            step={1}
            format={(v) => `${v}%`}
            onChange={(v) => setInset('bottom', v)}
          />
          <Slider
            label="Inset left"
            value={css.inset.left}
            min={-50}
            max={0}
            step={1}
            format={(v) => `${v}%`}
            onChange={(v) => setInset('left', v)}
          />
          <Slider
            label="Pull all sides"
            value={Math.round((css.inset.top + css.inset.right + css.inset.bottom + css.inset.left) / 4)}
            min={-50}
            max={0}
            step={1}
            format={(v) => `${v}%`}
            onChange={setAllInsets}
          />
        </Section>

        {/* ─── DENSITY ─── */}
        <Section
          id="density"
          title="Density · ink visibility"
          active={activeSection}
          setActive={setActiveSection}
        >
          {LAYER_NAMES.map((layer) => (
            <Slider
              key={layer}
              label={`${layer} peak`}
              value={css.layers[layer].peakOpacity}
              min={0}
              max={1}
              step={0.01}
              format={(v) => v.toFixed(2)}
              onChange={(v) => setLayerCSS(layer, 'peakOpacity', v)}
            />
          ))}

          <button
            type="button"
            className={styles.advancedToggle}
            onClick={() =>
              setShowAdvanced((s) => ({ ...s, density: !s.density }))
            }
          >
            {showAdvanced.density ? '− advanced' : '+ advanced (gradient stops)'}
          </button>
          {showAdvanced.density ? (
            <div className={styles.advancedBody}>
              {LAYER_NAMES.map((layer) => (
                <div key={layer} className={styles.layerGroup}>
                  <h4 className={styles.layerLabel}>{layer}</h4>
                  {svg[layer].gradient.stops.map((stop, i) => (
                    <Fragment key={i}>
                      <Slider
                        label={`stop ${i + 1} offset`}
                        value={stop.offset}
                        min={0}
                        max={100}
                        step={1}
                        format={(v) => `${v}%`}
                        onChange={(v) => setGradientStop(layer, i, 'offset', v)}
                      />
                      <Slider
                        label={`stop ${i + 1} alpha`}
                        value={stop.alpha}
                        min={0}
                        max={1}
                        step={0.01}
                        format={(v) => v.toFixed(2)}
                        onChange={(v) => setGradientStop(layer, i, 'alpha', v)}
                      />
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </Section>

        {/* ─── CHARACTER ─── */}
        <Section
          id="character"
          title="Character · shape & filter"
          active={activeSection}
          setActive={setActiveSection}
        >
          {LAYER_NAMES.map((layer) => {
            const layerSvg = svg[layer];
            const def = DEFAULT_SVG_STATE[layer].filter;
            const intensity =
              def.scale === 0 ? 1 : layerSvg.filter.scale / def.scale;
            const advKey = `character-${layer}`;
            return (
              <div key={layer} className={styles.layerGroup}>
                <h4 className={styles.layerLabel}>{layer}</h4>
                <div className={styles.presetRow}>
                  {(Object.keys(SHAPE_PRESETS) as PresetName[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={styles.presetBtn}
                      onClick={() => setSvgLayer(layer, { path: SHAPE_PRESETS[p] })}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.advancedToggle}
                  onClick={() =>
                    setShowAdvanced((s) => ({ ...s, [advKey]: !s[advKey] }))
                  }
                >
                  {showAdvanced[advKey] ? '− editor & primitives' : '+ editor & primitives'}
                </button>
                {showAdvanced[advKey] ? (
                  <div className={styles.advancedBody}>
                    <div className={styles.rowFull}>
                      <span className={styles.rowLabel}>path d</span>
                      <textarea
                        className={styles.textarea}
                        value={layerSvg.path}
                        onChange={(e) => setSvgLayer(layer, { path: e.target.value })}
                      />
                    </div>
                    <Slider
                      label="filter intensity"
                      value={intensity}
                      min={0}
                      max={2}
                      step={0.05}
                      format={(v) => `${v.toFixed(2)}×`}
                      onChange={(v) => setFilterIntensity(layer, v)}
                    />
                    <Slider
                      label="baseFrequency"
                      value={layerSvg.filter.baseFrequency}
                      min={0.005}
                      max={0.05}
                      step={0.001}
                      format={(v) => v.toFixed(3)}
                      onChange={(v) => setSvgFilter(layer, { baseFrequency: v })}
                    />
                    <Slider
                      label="numOctaves"
                      value={layerSvg.filter.numOctaves}
                      min={1}
                      max={5}
                      step={1}
                      onChange={(v) => setSvgFilter(layer, { numOctaves: v })}
                    />
                    <Slider
                      label="seed"
                      value={layerSvg.filter.seed}
                      min={0}
                      max={50}
                      step={1}
                      onChange={(v) => setSvgFilter(layer, { seed: v })}
                    />
                    <Slider
                      label="displacement"
                      value={layerSvg.filter.scale}
                      min={0}
                      max={60}
                      step={1}
                      onChange={(v) => setSvgFilter(layer, { scale: v })}
                    />
                    <Slider
                      label="blur stdDev"
                      value={layerSvg.filter.blur}
                      min={0}
                      max={8}
                      step={0.1}
                      format={(v) => v.toFixed(1)}
                      onChange={(v) => setSvgFilter(layer, { blur: v })}
                    />
                    <Slider
                      label="gradient cx"
                      value={layerSvg.gradient.cx}
                      min={0}
                      max={100}
                      step={1}
                      format={(v) => `${v}%`}
                      onChange={(v) => setSvgGradient(layer, { cx: v })}
                    />
                    <Slider
                      label="gradient cy"
                      value={layerSvg.gradient.cy}
                      min={0}
                      max={100}
                      step={1}
                      format={(v) => `${v}%`}
                      onChange={(v) => setSvgGradient(layer, { cy: v })}
                    />
                    <Slider
                      label="gradient r"
                      value={layerSvg.gradient.r}
                      min={0}
                      max={100}
                      step={1}
                      format={(v) => `${v}%`}
                      onChange={(v) => setSvgGradient(layer, { r: v })}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </Section>

        {/* ─── MOTION ─── */}
        <Section
          id="motion"
          title="Motion · drift"
          active={activeSection}
          setActive={setActiveSection}
        >
          {LAYER_NAMES.map((layer) => (
            <div key={layer} className={styles.layerGroup}>
              <h4 className={styles.layerLabel}>{layer}</h4>
              <Select
                label="Drift speed"
                value={css.layers[layer].speed}
                options={['default', 'off', 'slow', 'medium', 'fast'] as const}
                onChange={(v) => setLayerCSS(layer, 'speed', v)}
              />
              <Select
                label="Drift amount"
                value={css.layers[layer].amount}
                options={['default', 'none', 'subtle', 'medium', 'bold'] as const}
                onChange={(v) => setLayerCSS(layer, 'amount', v)}
              />
            </div>
          ))}
        </Section>

        {/* ─── REVEAL ─── */}
        <Section
          id="reveal"
          title="Reveal · hover cascade"
          active={activeSection}
          setActive={setActiveSection}
        >
          <Slider
            label="Timing scaler"
            value={cascadeScaler}
            min={0.5}
            max={2}
            step={0.05}
            format={(v) => `${v.toFixed(2)}×`}
            onChange={applyCascadeScaler}
          />
          <div className={styles.row}>
            <span className={styles.rowLabel}>Direction</span>
            <select
              className={styles.select}
              defaultValue="outside-in"
              onChange={(e) =>
                setCascadeDirection(e.target.value as CascadeDirection)
              }
            >
              <option value="outside-in">outside-in</option>
              <option value="inside-out">inside-out</option>
              <option value="simultaneous">simultaneous</option>
            </select>
            <span />
          </div>

          <button
            type="button"
            className={styles.advancedToggle}
            onClick={() =>
              setShowAdvanced((s) => ({ ...s, reveal: !s.reveal }))
            }
          >
            {showAdvanced.reveal ? '− per-layer timings' : '+ per-layer timings'}
          </button>
          {showAdvanced.reveal ? (
            <div className={styles.advancedBody}>
              {LAYER_NAMES.map((layer) => {
                const l = css.layers[layer];
                return (
                  <div key={layer} className={styles.layerGroup}>
                    <h4 className={styles.layerLabel}>{layer}</h4>
                    <Slider
                      label="fade-in dur"
                      value={l.fadeInDuration}
                      min={0}
                      max={2000}
                      step={10}
                      format={(v) => `${v}ms`}
                      onChange={(v) => setLayerCSS(layer, 'fadeInDuration', v)}
                    />
                    <Slider
                      label="fade-in delay"
                      value={l.fadeInDelay}
                      min={0}
                      max={1000}
                      step={10}
                      format={(v) => `${v}ms`}
                      onChange={(v) => setLayerCSS(layer, 'fadeInDelay', v)}
                    />
                    <Slider
                      label="fade-out dur"
                      value={l.fadeOutDuration}
                      min={0}
                      max={2500}
                      step={10}
                      format={(v) => `${v}ms`}
                      onChange={(v) => setLayerCSS(layer, 'fadeOutDuration', v)}
                    />
                    <Slider
                      label="fade-out delay"
                      value={l.fadeOutDelay}
                      min={0}
                      max={1000}
                      step={10}
                      format={(v) => `${v}ms`}
                      onChange={(v) => setLayerCSS(layer, 'fadeOutDelay', v)}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </Section>

        {/* ─── EXPORT ─── */}
        <Section
          id="export"
          title="Export"
          active={activeSection}
          setActive={setActiveSection}
        >
          <div className={styles.exportRow}>
            <button
              type="button"
              className={`${styles.exportBtn} ${copied === 'overrides' ? styles.exportBtnCopied : ''}`}
              onClick={() => copy('overrides', buildCopyAsOverrides(css, svg))}
            >
              {copied === 'overrides' ? 'Copied' : 'Copy as overrides'}
            </button>
            <button
              type="button"
              className={`${styles.exportBtn} ${copied === 'source' ? styles.exportBtnCopied : ''}`}
              onClick={() => copy('source', buildSourceReplacement(css, svg))}
            >
              {copied === 'source' ? 'Copied' : 'Replace source values'}
            </button>
            <button type="button" className={styles.resetBtn} onClick={resetAll}>
              Reset
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ─── Internal helpers ────────────────────────────────────────────────── */

function scaleLayerTimings(
  current: LayerCSS,
  def: { fadeInDuration: number; fadeInDelay: number; fadeOutDuration: number; fadeOutDelay: number },
  scale: number,
): LayerCSS {
  return {
    ...current,
    fadeInDuration: Math.round(def.fadeInDuration * scale),
    fadeInDelay: Math.round(def.fadeInDelay * scale),
    fadeOutDuration: Math.round(def.fadeOutDuration * scale),
    fadeOutDelay: Math.round(def.fadeOutDelay * scale),
  };
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
