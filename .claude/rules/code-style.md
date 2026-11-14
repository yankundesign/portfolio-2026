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

Three subdirectories in `src/components/`, one per layer, plus `shared/`. The homepage itself is `routes/HomeRoute.tsx`, which serves both `/` and `/works`.

- **`notebook/`**: the Field Notebook (homepage object and works page).
  - `Notebook.tsx`: the 3D book.
  - `SettleCover.tsx`: the front board.
  - `NotebookContents.tsx`: the works spread.
  - `MobileContents.tsx`: the works list on phones.
- **`project/`**: project detail (vertical scroll, plate and reading layouts).
- **`shared/`**: reusable across layers: `Grain.tsx`, `FigCaption.tsx`, ink filters, the wash tuner.

## CSS

- Use design tokens from `tokens.css` via `var(--token-name)` — never hardcode color or spacing values
- CSS Modules for components (`.module.css`), global styles only for tokens/reset/typography
- No icon libraries — use inline SVG or omit

## TypeScript

- Strict mode enabled
- Interaction code lives in `src/interactions/`:
  - `notebookEngine.ts`: a plain class that drives the book.
  - `useNotebook`: the thin hook around the engine.
  - Plain classes: `monographPointer.ts`, `monographIndex.ts`, `pluckedLine.ts`, `cursorLabel.ts`, `plateFlight.ts`, `plateCarry.ts` (the plate carried between the works page and a case study), `contentsStamp.ts`, `ruleStrings.ts` (the case studies' ringing rules), `screenView.ts` (a board's screen enlarged).
  - Hooks: `useMonographPointer`, `useTrailingPeek`, `useContentsSelection`, `useContentsStamp`, `useFollowLabel`, `usePlateFlight`, `usePlateLoop`, `usePlateLanding`, `useInputModality`, `useMediaQuery`, `useReducedMotion`, `useRunningHead`, `useBoardVideo`, `useInspect`.
  - `motion.ts`: easing and tween.
- Each hook returns state and handlers that components consume.
- Per-frame, imperative animation belongs in a plain class or inside effects, not in hook bodies. The project's React hooks lint rules reject refs read or written during render.

## Animation

- Start with CSS transitions and Web Animations API
- Add Framer Motion only if CSS/WAAPI feel limited — don't pre-install
- All motion respects `prefers-reduced-motion` with dignified static fallback (cross-fade, not instant cut)

## Images

- Screenshots: WebP with PNG fallback
- Always use the editorial plate pattern: 1px ink rule border, mono caption below (`fig. 01 · description` in case studies; the works page drops "fig." and uses `01 · Title`)
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
- Keyboard navigable:
  - Enter or Space on the notebook opens it, and focus lands on the first contents entry.
  - Tab moves through the contents.
  - Esc or the Close tab closes the book.
- Typography uses `rem` units
