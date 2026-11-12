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
  - It writes transforms and lighting straight to the DOM, with no React render per frame. Lighting variables go on the two shadows that read them, never on the book (that restyled the whole book every frame). The shadows keep one blur radius.
  - While closed it cracks the cover on request (`peek`, a critically damped spring) and swings the ribbon tail as a damped pendulum.
  - API: `open()`, `close()`, `showOpen()` (instant, for direct `/works` visits), `aim()` for pointer extras, `peek()`, and `ref(part)` callbacks.
- **`useNotebook`**: creates the engine once, configures it, and attaches it to the slot element.
- **`monographPointer.ts`** (`MonographPointer`, via `useMonographPointer`): the homepage's one frame loop.
  - The lamp, moved by transform.
  - The book's tilt and shadow, with an eased hover amount.
  - The name's per-letter weight and SOFT. Letter centres are measured once, never inside the write loop.
  - The top rule that rings where the cursor crosses it.
  - “Open →” as the cursor over the book.
  - Each part writes only when its value changes.
- **`cursorLabel.ts`** (`CursorLabel`): a label that is the cursor over one surface (“Open →”, and “Close ×” via `useFollowLabel`). Position goes in `translate`, size in `transform: scale()` about the pointer, and centring on an inner span. Don't put `scale` and `transform` on one rule: the CSS minifier merges them.
- **`plateFlight.ts`** (`PlateFlight`, via `usePlateFlight`): on the works page, the plate grows out of its thumbnail and flies home. It animates the frame's box in px, and every flight starts from where the frame is.
- **`useTrailingPeek`**: the About photo that trails the cursor (its loop runs only while shown).
- **`contentsStamp.ts`** (`ContentsStamp`, via `useContentsStamp`): on the works page, the row pointed at becomes a solid object. A copy of the rows, paper on ink, sits exactly over the list and is clipped to that row (`clip-path: inset`), so letters turn paper as the band crosses them. It rises out of the row's rule, slides between rows, and sinks back into the rule. Its shadow is a drop-shadow on the copy's wrapper: a separate shadow element ran a frame behind on fast moves.
- **The raised plate's notes** (in `NotebookContents`, data in `projects.ts` → `notes`): the caption, a summary, at most two figures in the contact sheet's two columns, and a facts line on the page's foot. The caption is a flex column that runs to the foot. Don't position the facts absolutely: while the caption slides in it has a transform, which makes it their containing block. The notes block is keyed by project, so its parts play in again, one after another, on each swap.
- **`useContentsSelection`**: nothing selected by default, with a short grace period on leave. A thumbnail only marks its row. `last` keeps the plate's picture while it flies home.
- **`usePlateLoop`**: the preview loop in the raised plate.
- **Smaller helpers:**
  - `useInputModality`: keyboard vs. pointer.
  - `useMediaQuery`.
  - `useReducedMotion`.
- **`motion.ts`**: cubic-bezier easing and a cancellable tween. The interface easing is the `--ease-settle` token: the cover's spring, gentled.

Reduced motion:
- The book's open and close become a short cross-fade.
- The intro, name, lamp, tilt, rule, pendulum, peek and plate flight are off.
- The contents band fades in and out instead of rising, sliding and sinking.
- The cursor labels still replace the cursor.

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
