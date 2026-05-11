import {
  FILTER_ID,
  FILTER_REGION,
  GRADIENT_ID,
  LAYER_NAMES,
  useWashTune,
} from './WashTuneContext';

/**
 * InkFilters — global SVG filter and gradient definitions for the
 * three-layer ink wash (modeled on Chinese ink wash painting, 水墨画).
 *
 * Mounted once at the app root so any element can reference these via
 * `filter="url(#…)"` or `fill="url(#…)"`. Renders an off-screen 0×0 SVG
 * so it never affects layout.
 *
 * Three layers — mist (soft outer halo), primary (body of the wash),
 * core (concentrated dense pool) — each with its own gradient and filter.
 *
 * Values come from WashTuneContext, which defaults to the production
 * hardcoded values. The WashTunePanel can override the values live; when
 * the panel isn't mounted the defaults are used and behavior is unchanged.
 */
export default function InkFilters() {
  const { svg } = useWashTune();
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {LAYER_NAMES.map((name) => {
          const g = svg[name].gradient;
          return (
            <radialGradient
              key={`grad-${name}`}
              id={GRADIENT_ID[name]}
              cx={`${g.cx}%`}
              cy={`${g.cy}%`}
              r={`${g.r}%`}
            >
              {g.stops.map((stop, i) => (
                <stop
                  key={i}
                  offset={`${stop.offset}%`}
                  stopColor={`rgba(22, 38, 94, ${stop.alpha})`}
                />
              ))}
            </radialGradient>
          );
        })}

        {LAYER_NAMES.map((name) => {
          const f = svg[name].filter;
          const region = FILTER_REGION[name];
          return (
            <filter
              key={`filter-${name}`}
              id={FILTER_ID[name]}
              x={`${region.xy}%`}
              y={`${region.xy}%`}
              width={`${region.wh}%`}
              height={`${region.wh}%`}
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={f.baseFrequency}
                numOctaves={f.numOctaves}
                seed={f.seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={f.scale}
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation={f.blur} />
            </filter>
          );
        })}
      </defs>
    </svg>
  );
}
