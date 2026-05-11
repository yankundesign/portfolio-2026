# Site Build — Claude Code Context

This is the Vite + React SPA for the portfolio. Three-layer interaction model: desk scene → canvas/pinboard → project detail (vertical scroll). Loaded when working in `site/src/`.

## React component patterns

- Functional components with TypeScript interfaces for props
- Use `children` for composition where appropriate
- Forward refs when components need DOM access for animations
- CSS Modules for scoped styles: `import styles from './Component.module.css'`

## Component organization

- **`components/desk/`** — the homepage desk scene (3D perspective, draggable objects)
- **`components/canvas/`** — the spatial pinboard inside the notebook (pannable, project clusters)
- **`components/project/`** — project detail vertical scroll (editorial layout, plates, metrics)
- **`components/shared/`** — reusable across all layers (EditorialPlate, Marginalia, StickyNote, Grain, Transition)

## CSS Module conventions

- One `.module.css` per component, same directory
- Reference tokens via `var(--token-name)` — never hardcode values
- Global styles (`reset.css`, `typography.css`) imported once in `main.tsx`

## Interaction hooks

Hooks in `src/interactions/` return state and handlers:

- `useDraggable` — drag-to-move for desk objects. Returns `{ position, handlers, isDragging }`. Distinguishes drag vs. click (5px threshold). Constrains to container bounds.
- `usePanCanvas` — click-drag / touch / keyboard panning for the canvas. Returns `{ position, handlers, panTo }`. Arrow keys pan 100px. Home returns to default position.
- `useDeskToCanvas` — manages the portal transition from desk to canvas. Notebook cover opens, camera pushes in, canvas content staggers in. ~1000–1400ms total.
- `useCanvasToProject` — manages the zoom transition from canvas cluster to project detail. Cluster scales up, other elements fade, project view loads. ~600–800ms total.
- `useImageOverlay` — `{ activeImage, open(src), close }`. Click-to-expand for editorial plates.
- `useReducedMotion` — `boolean`. Checks `prefers-reduced-motion`. All transitions simplify to crossfade (300ms).

## Routing

React Router v7 with client-side routing:
- `/` → `DeskRoute` (desk scene homepage)
- `/works` → `CanvasRoute` (spatial canvas/pinboard)
- `/works/:slug` → `ProjectRoute` (vertical scroll case study)
- `/journal/:slug` → `JournalRoute` (journal entries)
- `/colophon` → `ColophonRoute` (how this was made)
- `*` → `NotFoundRoute` (blank page)

Route components wire together layer components and data. Keep them thin.

## Image handling

- Screenshots in `public/images/projects/{slug}/` — WebP preferred, PNG fallback
- Wrap in `<EditorialPlate>` component (1px ink border, mono caption)
- Hand-drawn marks: SVG in `public/images/marks/`, inline when small
- Lazy-load with `loading="lazy"` on `<img>` tags

## Canvas layout

- Project cluster positions are defined in `data/projects.ts` as `{ x, y }` coordinates — hand-composed, not computed
- The canvas is a large div (~3–4 viewports wide, ~2–2.5 tall) with `overflow: hidden` on its container
- Panning changes `transform: translate(x, y)` on the canvas element
- Clusters vary in size and artifact count based on project status (full vs. stub)

## Deploy

SPA needs a fallback rewrite rule — all routes serve `index.html`. Configure in Vercel (`rewrites` in `vercel.json`) or Cloudflare Pages (`_redirects`).
