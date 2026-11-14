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
  - The right page is printed: its plates are there whenever the book is not shut (`data-printed` on the spread), so the cover lifts off an inked page. The left page lies under the cover's lining until the cover is down (k = 0.85 of the open); the engine then swaps the cover for the whole spread and marks the pages `data-flat`, and the left page's type settles in while the camera finishes.
  - The back of the cover has no backing colour, and its shade is clipped to the board: either one past the board's edge shows as a pale panel while the cover swings.
  - API: `open()`, `close()`, `showOpen()` (instant, for direct `/works` visits), `aim()` for pointer extras, `peek()`, and `ref(part)` callbacks.
- **`useNotebook`**: creates the engine once, configures it, and attaches it to the slot element.
- **`monographPointer.ts`** (`MonographPointer`, via `useMonographPointer`): the homepage's one frame loop.
  - The lamp, moved by transform.
  - The book's tilt and shadow, with an eased hover amount.
  - The name's per-letter weight and SOFT. Letter centres are measured once, never inside the write loop.
  - The top rule that rings where the cursor crosses it.
  - “Open →” as the cursor over the book.
  - The index (`MonographIndex`), and the cover's crack while Works is pointed at or focused.
  - Each part writes only when its value changes.
- **`pluckedLine.ts`** (`PluckedLine`): a hairline that is a string. Crossing it plucks it where the cursor crossed, harder the faster it crossed. It rings with the cover line's spring, e^(−4.4t)·cos(2π·3.2t), falls off as a Gaussian around the pluck, and is pinned at both ends. Plucks add up, so a sweep across several lines strums them. Used for the top rule and the index's five rules.
- **`monographIndex.ts`** (`MonographIndex`): the homepage index, run from `MonographPointer`'s loop.
  - Its rules are `PluckedLine`s drawn in one SVG over the list (the `li` borders stay, transparent, for layout). A click pushes the row's own rule down.
  - Each label is one span per letter (`data-glyph`). Weight and SOFT swell under the cursor in a Gaussian field about two letters wide and one row tall; the row pointed at also gets a little heavier as a whole. Keyboard focus counts as a gentle field along the whole word.
  - The row's rule inks outward from where the cursor came in and gathers back to where it left: a dash pattern on the line's own path (`pathLength="1"`), so the ink rings with the string. By keyboard it draws from the left and runs out to the right. It eases but never slower than 1.4 rule lengths a second, so no ink is left behind after a fast sweep.
  - Letter centres and rule positions are measured with the page (intro, land, resize), never in the write loop. The index's top is rounded to whole pixels so the drawn rules stay crisp.
- **`cursorLabel.ts`** (`CursorLabel`): a label that is the cursor over one surface (“Open →”, and “Close ×” via `useFollowLabel`). Position goes in `translate`, size in `transform: scale()` about the pointer, and centring on an inner span. Don't put `scale` and `transform` on one rule: the CSS minifier merges them.
- **`plateFlight.ts`** (`PlateFlight`, via `usePlateFlight`): on the works page, the plate grows out of its thumbnail and flies home. It animates the frame's box in px, and every flight starts from where the frame is.
- **`plateCarry.ts`** (`plateCarry`, one for the app; `PlateCarrier` in `components/shared/`, mounted in `App.tsx` outside the routes; `usePlateLanding`): the plate carried between the works page and a case study that opens on a board (`data/caseOpeners.ts`). One rule, the works page's own: the frame moves, the picture changes inside it.
  - Out: a click on a row or a thumbnail picks the plate up. The carrier takes the frame's exact place (with the preview loop's current frame, if it was playing), comes up 2.5%, and the notebook fades (`data-leaving`); the page changes after 180 ms. The case study's opener lands it (`usePlateLanding`, before first paint): the opening board starts at the carrier's box and both fly to the board's place while the carrier's picture gives way to the board. The opener's type inks in around it (`data-arriving`).
  - Back: “← Works”, while the opening board's top edge is still on screen under the running head. The carrier takes the board's place with a copy of it, the page fades, and on the works page the carrier flies to the project's thumbnail (hidden meanwhile by `data-carried`) as the plate's picture comes back. Nothing is selected when it lands. Further down the page, the link is a plain link.
  - The carrier's box and the board's transform are written by one frame loop. Don't split them into a layout animation and a compositor one: the compositor runs ahead whenever the page is busy, and the two frames come apart.
  - A resize, a scroll or the wheel sets everything down at once; so does the page going away. If nothing comes for the carrier within 900 ms, it fades.
  - Reduced motion, phones and case studies without an opening board never start a carry.
- **`useTrailingPeek`**: the About photo that trails the cursor (its loop runs only while shown).
- **`contentsStamp.ts`** (`ContentsStamp`, via `useContentsStamp`): on the works page, the row pointed at becomes a solid object. A copy of the rows, paper on ink, sits exactly over the list and is clipped to that row (`clip-path: inset`), so letters turn paper as the band crosses them. It rises out of the row's rule, slides between rows, and sinks back into the rule. Its shadow is a drop-shadow on the copy's wrapper: a separate shadow element ran a frame behind on fast moves.
- **The raised plate's notes** (in `NotebookContents`, data in `projects.ts` → `notes`): the caption, a summary, at most two figures in the contact sheet's two columns, and a facts line on the page's foot. The caption is a flex column that runs to the foot. Don't position the facts absolutely: while the caption slides in it has a transform, which makes it their containing block. The notes block is keyed by project, so its parts play in again, one after another, on each swap.
- **`useContentsSelection`**: nothing selected by default, with a short grace period on leave. A thumbnail only marks its row. `last` keeps the plate's picture while it flies home.
- **`usePlateLoop`**: the preview loop in the raised plate.
- **Case study (notebook layout: Control Hub Workflows and the AI Assistant, `NotebookCase.tsx`):**
  - `useRunningHead`: the chapter named in the running head. The current chapter is the last one whose top has passed 40% down the window; it's worked out from where every chapter is, so long jumps land right.
  - `useBoardVideo`: a recording on a cloth board plays, silent, while 40% of its board is on screen. A pause the reader chose holds. Reduced motion never starts it.
  - `screenView.ts` (`ScreenView`, via `ScreenInspector` and `useInspect`): a still on a board, enlarged. It grows out of its place to twice its size on the page, never past its capture's pixels and never smaller than the window allows. Where that is larger than the window, the pointer's place in the window is the reader's place on the screen; on touch it scrolls. A click, Esc, the wheel or the page scrolling sends it back. The field is the board's own material, and over it the cursor is “Close ×”. Reduced motion cross-fades.
  - `ruleStrings.ts` (`RuleStrings`, via `StringRule`): the full-measure chapter rules are `PluckedLine`s with the homepage top rule's feel. One pointer listener and one frame loop for the page; the loop runs only while a string rings, and off-screen rules are never measured. Each rule draws in from the left when it first comes on screen. Touch and reduced motion get the drawn rule only.
  - `SpringRule`: the cover's line, y = e^(−4.4u)·cos(2π·3.2u), then flat across the measure, as the case study's closing rule. It draws in on view.
  - `RevealOnScroll` variants: `set` (boards: set down, settling with the cover's spring), `ink` (quotes: fade in place), `rise` (the default, used by the older layouts).
- **Smaller helpers:**
  - `useInputModality`: keyboard vs. pointer.
  - `useMediaQuery`.
  - `useReducedMotion`.
- **`motion.ts`**: cubic-bezier easing and a cancellable tween. The interface easing is the `--ease-settle` token: the cover's spring, gentled.

Reduced motion:
- The book's open and close become a short cross-fade.
- The intro, name, lamp, tilt, rule, pendulum, peek and plate flight are off.
- The index's rules don't ring and its letters don't follow the cursor. The row's rule cross-fades to ink, its label gets a little heavier, and the arrows stay put.
- The contents band fades in and out instead of rising, sliding and sinking.
- The cursor labels still replace the cursor.

## Routing

React Router v7 with client-side routing:

| Path | Route |
| --- | --- |
| `/` and `/works` | `HomeRoute`, rendered directly in `App.tsx` so it stays mounted across the two. The URL decides whether the book is open. Opening pushes `/works` with `state.fromHome`; closing goes back if it can. A visit that starts on `/works` starts with the book's state `open`, so the name and index never show and slide away. |
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
- **Project mockups:** in `public/canvas/mockups/` (PNG), each with a light copy in `public/canvas/thumbs/` (640px WebP) for the contact sheet. The raised plate stacks the copy under the PNG, which loads once the book is first opened. Case study screenshots are in `public/images/{slug}/`.
- **Fonts:** self-hosted in `public/fonts/` (`@font-face` in `styles/typography.css`, three faces preloaded in `index.html`).
- **Tab titles:** `titleFor` in `App.tsx` sets one per route.
- **Plate pattern:** 1px ink border, mono caption. The works page drops "fig." and uses `01 · Title`.
- **Hand-drawn marks:** inline SVG when small.
- **Lazy-loading:** use `loading="lazy"` on `<img>` tags below the fold.

## Deploy

SPA needs a fallback rewrite rule — all routes serve `index.html`. Cloudflare Pages uses `public/_redirects`. See the root `CLAUDE.md` for the manual Wrangler workflow.
