# Site Build — Claude Code Context

This is the Vite + React SPA for the portfolio. Interaction model: Monograph homepage with the Field Notebook → the open notebook (works) → project detail (vertical scroll). Loaded when working in `site/src/`.

## React component patterns

- Functional components with TypeScript interfaces for props
- Use `children` for composition where appropriate
- Components register DOM nodes for animation through callback refs (e.g. `engine.ref('cover')`)
- CSS Modules for scoped styles: `import styles from './Component.module.css'`

## Component organization

- **`routes/HomeRoute.tsx`**: the homepage and the works page in one component, mounted for both `/` and `/works`. It holds the name, the index, the About photo, and the URL-to-book sync.
- **`components/notebook/`**: the Field Notebook.
  - `Notebook`: the 3D book.
  - `SettleCover`: the front board.
  - `NotebookContents`: the works spread.
  - `MobileContents`: the works list on phones.
- **`components/project/`**: project detail, vertical scroll (plate and reading layouts, metrics).
- **`components/shared/`**: reusable pieces (`Grain`, `FigCaption`, ink filters, the wash tuner).

## CSS Module conventions

- One `.module.css` per component, same directory
- Reference tokens via `var(--token-name)` — never hardcode values
- Global styles (`reset.css`, `typography.css`) imported once in `main.tsx`
- The notebook's spread is a size container: its contents are sized in `cqh` so they scale with the book; mono labels stay ≥ 11px via `clamp()`

## Interaction code

In `src/interactions/`:

- **`notebookEngine.ts`**: a plain class, `NotebookEngine`.
  - Two numbers drive the book: camera `t` (from the slot on the homepage to the centred spread) and cover `p` (closed to flat).
  - It writes transforms and lighting straight to the DOM, with no React render per frame.
  - API: `open()`, `close()`, `showOpen()` (instant, for direct `/works` visits), `aim()` for pointer extras, and `ref(part)` callbacks.
- **`useNotebook`**: creates the engine once, configures it, and attaches it to the slot element.
- **`useMonographPointer`**: one frame loop for three effects: the lamp (`--mx` and `--my`), the book's tilt and shadow, and the name's per-letter weight and SOFT.
- **`useTrailingPeek`**: the About photo that trails the cursor.
- **`useContentsSelection`**: nothing selected by default, with a short grace period on leave.
- **Smaller helpers:**
  - `useFollowLabel`: the "Close ×" label.
  - `useInputModality`: keyboard vs. pointer.
  - `useMediaQuery`.
  - `useReducedMotion`.
- **`motion.ts`**: cubic-bezier easing and a cancellable tween.

Reduced motion: the book's open and close become a short cross-fade; the name, lamp and peek effects are off.

## Routing

React Router v7 with client-side routing:

| Path | Route |
| --- | --- |
| `/` and `/works` | `HomeRoute`, rendered directly in `App.tsx` so it stays mounted across the two. The URL decides whether the book is open. Opening pushes `/works` with `state.fromHome`; closing goes back if it can. |
| `/works/:slug` | `ProjectRoute` (case study). Its back link returns to `/works`, which shows the open spread without replaying the opening. |
| `/cv` | `CvRoute` |
| `/about` | `AboutRoute` |
| `/radio` | `RadioRoute` |
| `/journal/:slug` | `JournalRoute` |
| `/colophon` | `ColophonRoute` |
| `*` | `NotFoundRoute` |

Route components wire together layer components and data. Keep them thin.

## Image handling

- **Notebook assets:** in `public/notebook/` (cover board, v2 spread, ribbon), as WebP at q85. Geometry is in `data/notebook.ts`. The cover's face is the spread's right-hand board, so nothing stretches when it opens.
- **Project mockups:** in `public/canvas/mockups/` (PNG). Case study screenshots are in `public/images/{slug}/`.
- **Plate pattern:** 1px ink border, mono caption. The works page drops "fig." and uses `01 · Title`.
- **Hand-drawn marks:** inline SVG when small.
- **Lazy-loading:** use `loading="lazy"` on `<img>` tags below the fold.

## Deploy

SPA needs a fallback rewrite rule — all routes serve `index.html`. Cloudflare Pages uses `public/_redirects`. See the root `CLAUDE.md` for the manual Wrangler workflow.
