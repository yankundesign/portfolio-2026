# Code Style

## Stack

- **Vite + React 19 + TypeScript** — single-page application with client-side routing
- **React Router v7** — real URLs, SPA fallback on deploy
- **CSS Modules** (`*.module.css`) for component-scoped styles
- **Plain CSS** with design tokens — no Tailwind, no CSS-in-JS, no component libraries
- **Self-hosted fonts** (woff2) with `font-display: swap`

## React conventions

- Functional components only, TypeScript strict mode
- Props defined as interfaces, exported alongside the component
- Interaction logic lives in custom hooks (`src/interactions/`), not inline in components
- Components are pure: props in, JSX out. Route components wire together components and data.
- CSS Modules for component-scoped styles; global styles in `src/styles/`

## Component organization

Four subdirectories in `src/components/`, one per layer plus shared:

- **`desk/`** — Desk scene (homepage): `DeskScene.tsx`, `DeskSurface.tsx`, `NotebookCover.tsx`, `ResumePaper.tsx`, `AboutObject.tsx`
- **`canvas/`** — Spatial pinboard (works): `Canvas.tsx`, `ProjectCluster.tsx`, `ClusterArtifact.tsx`, `CanvasEnvironment.tsx`
- **`project/`** — Project detail (vertical scroll): `ProjectHeader.tsx`, `ProjectBody.tsx`, `MetricDisplay.tsx`, `PullQuote.tsx`, `Credits.tsx`
- **`shared/`** — Reusable across all layers: `EditorialPlate.tsx`, `Marginalia.tsx`, `StickyNote.tsx`, `Grain.tsx`, `Transition.tsx`

## CSS

- Use design tokens from `tokens.css` via `var(--token-name)` — never hardcode color or spacing values
- CSS Modules for components (`.module.css`), global styles only for tokens/reset/typography
- No icon libraries — use inline SVG or omit

## TypeScript

- Strict mode enabled
- Interaction hooks in `src/interactions/`: `useDraggable`, `usePanCanvas`, `useDeskToCanvas`, `useCanvasToProject`, `useImageOverlay`, `useReducedMotion`
- Each hook returns state and handlers that components consume

## Animation

- Start with CSS transitions and Web Animations API
- Add Framer Motion only if CSS/WAAPI feel limited — don't pre-install
- All motion respects `prefers-reduced-motion` with dignified static fallback (cross-fade, not instant cut)

## Images

- Screenshots: WebP with PNG fallback
- Always use the editorial plate pattern: 1px ink rule border, mono caption below (`fig. 01 · description`)
- Lazy-load below the fold
- Hand-drawn marks: inline SVG, stroke 1.2–1.6px, ink blue, round line caps
- Process artifact rotation via CSS `transform: rotate(±2deg)` — never bake rotation into images

## Performance targets

- Lighthouse 95+ across all categories
- Fonts self-hosted, `font-display: swap` with `size-adjust` fallback
- Paper grain SVG inlined in CSS, not a separate request

## Accessibility

- All color contrast WCAG AA minimum
- Hand-drawn SVGs: descriptive `aria-label` or `aria-hidden="true"` if decorative
- Marginalia has real text for screen readers
- Focus states: 1.5px ink rule, offset 2px
- Keyboard navigable (arrow keys for canvas panning, Enter/Space for desk objects, Tab between clusters)
- Typography uses `rem` units
