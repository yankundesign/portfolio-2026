# Architecture Plan · Desk + Canvas + Scroll

*April 2026 · Updated: desk scene homepage, spatial canvas for works, vertical scroll for projects. The Field Notebook prototype established the visual language; the interaction model has evolved beyond paginated spreads. See `prd-homepage-desk.md` and `prd-notebook-canvas.md` for full experience specs.*

---

## 0. Design philosophy for the build

The Field Notebook prototype (HTML/CSS) establishes the visual language: ink-on-paper palette, Fraunces typography, notebook-object feel, editorial plates. That language is locked. The display format has evolved into three layers:

1. **Desk scene** — angled perspective view of a workspace. Physical objects as navigation portals. Draggable.
2. **Canvas / pinboard** — spatial, pannable 2D world inside the notebook. Projects as hand-composed clusters. Not paginated, not a grid.
3. **Project detail** — vertical scroll editorial layout. Freed from two-page spreads.

The build should support:

- Rich transitions between layers (desk → canvas portal, canvas → project zoom)
- 3D CSS perspective for the desk scene
- Pannable canvas with positioned elements
- Drag interactions (desk objects, canvas panning)
- The whole site as an interactive experience, not a content container with sprinkled JS

This means a React SPA with client-side routing, not a static site generator.

---

## 1. Folder structure

```
portfolio-2026/
│
├── .claude/                          ← Claude Code configuration
│   ├── CLAUDE.md                     ← Project-wide context (brief, constraints)
│   ├── rules/
│   │   ├── design-tokens.md          ← Color, type, spacing from vibe-guideline
│   │   ├── code-style.md             ← React/TS/CSS conventions
│   │   ├── voice.md                  ← Writing voice rules
│   │   └── portfolio-scope.md        ← v1 scope, open questions
│   └── agents/
│       ├── content-writer.md         ← Case study drafting, voice enforcement
│       ├── visual-designer.md        ← Layout, spacing, visual QA
│       └── frontend-engineer.md      ← React components, animation, interactions
│
├── 00-brief/                         ← Design thinking (not deployed)
│   ├── brief-01.md
│   ├── vibe-guideline.md             ← Source of truth for visual system
│   ├── decisions-log.md
│   └── architecture-plan.md          ← This file
│
├── 01-content/                       ← Raw writing (markdown drafts)
│   ├── chai.md
│   ├── smart-search.md
│   ├── write-like-webex.md
│   ├── sap-fieldglass.md
│   ├── journal-on-search.md
│   ├── journal-on-endings.md
│   └── colophon.md
│
├── 02-assets/                        ← Design assets (not deployed)
│
├── 03-prototype-explore/             ← HTML prototypes (reference, not deployed)
│   └── ...
│
├── 04-reference/                     ← Visual references (not deployed)
│   ├── marry-kim/
│   ├── jackie-zhang/
│   └── type-specimen.html
│
├── site/                             ← THE BUILD — Vite + React
│   ├── index.html                    ← Single entry point
│   ├── vite.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   │
│   ├── public/
│   │   ├── fonts/
│   │   │   ├── fraunces-variable.woff2
│   │   │   ├── jetbrains-mono-300.woff2
│   │   │   ├── jetbrains-mono-400.woff2
│   │   │   └── caveat-400.woff2
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   │   ├── chai/
│   │   │   │   ├── smart-search/
│   │   │   │   ├── write-like-webex/
│   │   │   │   └── sap-fieldglass/
│   │   │   └── marks/                ← Hand-drawn SVG hero marks
│   │   ├── og-image.png
│   │   └── favicon.svg
│   │
│   └── src/
│       ├── main.tsx                  ← App entry, router mount
│       ├── App.tsx                   ← Root component, route definitions
│       │
│       ├── styles/
│       │   ├── tokens.css            ← Design tokens
│       │   ├── reset.css
│       │   ├── typography.css        ← @font-face, type scale
│       │   └── global.css            ← Imports all base styles
│       │
│       ├── components/
│       │   ├── desk/                 ← Desk scene (homepage)
│       │   │   ├── DeskScene.tsx     ← 3D perspective container + desk surface
│       │   │   ├── DeskSurface.tsx   ← The desk surface with grain/texture
│       │   │   ├── NotebookCover.tsx ← Closed notebook object (clickable → canvas)
│       │   │   ├── ResumePaper.tsx   ← Folded paper object (placeholder v1)
│       │   │   └── AboutObject.tsx   ← Personal object (placeholder v1)
│       │   │
│       │   ├── canvas/               ← Spatial pinboard (works view)
│       │   │   ├── Canvas.tsx        ← Pannable container (overflow + transform)
│       │   │   ├── ProjectCluster.tsx ← A project's artifact cluster
│       │   │   ├── ClusterArtifact.tsx ← Individual artifact within a cluster
│       │   │   └── CanvasEnvironment.tsx ← Decorative: pins, tape, pencil marks
│       │   │
│       │   ├── project/              ← Project detail (vertical scroll)
│       │   │   ├── ProjectHeader.tsx  ← Title, metadata, lead paragraph
│       │   │   ├── ProjectBody.tsx    ← Essay content, plates, pull quotes
│       │   │   ├── MetricDisplay.tsx  ← Large metric callout (e.g., "3% → 18%")
│       │   │   ├── PullQuote.tsx      ← Wide pull quote
│       │   │   └── Credits.tsx        ← Collaborator credits
│       │   │
│       │   └── shared/               ← Reusable across all layers
│       │       ├── EditorialPlate.tsx ← Image with 1px border + mono caption
│       │       ├── Marginalia.tsx
│       │       ├── StickyNote.tsx
│       │       ├── Grain.tsx         ← SVG noise overlay
│       │       └── Transition.tsx    ← Shared transition wrapper
│       │
│       ├── interactions/
│       │   ├── useDraggable.ts       ← Drag-to-move for desk objects
│       │   ├── usePanCanvas.ts       ← Click-drag / touch / keyboard panning
│       │   ├── useDeskToCanvas.ts    ← Portal transition: desk → canvas
│       │   ├── useCanvasToProject.ts ← Zoom transition: canvas → project
│       │   ├── useImageOverlay.ts    ← Click-to-expand for editorial plates
│       │   └── useReducedMotion.ts   ← prefers-reduced-motion check
│       │
│       ├── routes/
│       │   ├── DeskRoute.tsx         ← / (desk scene homepage)
│       │   ├── CanvasRoute.tsx       ← /works (spatial pinboard)
│       │   ├── ProjectRoute.tsx      ← /works/:slug (vertical scroll case study)
│       │   ├── JournalRoute.tsx      ← /journal/:slug (journal entries)
│       │   ├── ColophonRoute.tsx     ← /colophon
│       │   └── NotFoundRoute.tsx     ← * (404)
│       │
│       ├── data/
│       │   └── projects.ts           ← Project metadata + cluster positions
│       │
│       └── CLAUDE.md                 ← Build-specific rules (React patterns)
│
├── .gitignore
└── README.md
```

### Component organization rationale

**`components/` is organized by layer.** Four subdirectories: `desk/` for the homepage scene, `canvas/` for the spatial works view, `project/` for case study detail, and `shared/` for reusable pieces. Each layer has its own interaction model and layout strategy.

**Interactions are React hooks.** `useDraggable`, `usePanCanvas`, `useDeskToCanvas`, `useCanvasToProject` — each returns state and handlers that components consume. Transition hooks manage the animated handoff between layers.

**Routes are separate from components.** Route files wire together components and data for a given URL. Components stay pure (props in, JSX out). The three-layer structure maps cleanly to routes: `/` → desk, `/works` → canvas, `/works/:slug` → project.

---

## 2. Build tooling

**Vite + React + TypeScript.** Minimal, fast, flexible.

- **Vite** — instant HMR, native ESM, no config bloat. Builds to static files for deploy.
- **React 19** — component composition, hooks for interaction logic, large ecosystem for animation.
- **TypeScript** strict mode — type safety for interaction state machines and component props.
- **React Router v7** — client-side routing with real URLs. Supports route-level code splitting if needed later.

**CSS approach (unchanged from vibe-guideline):**

- Plain CSS with design tokens in `tokens.css`. No Tailwind, no CSS-in-JS, no component libraries.
- CSS Modules (`.module.css`) for component-scoped styles. Vite supports these out of the box.
- Global styles (`reset.css`, `typography.css`) imported once in `main.tsx`.

**Animation library — add when needed, not upfront.** Start with CSS transitions and the Web Animations API. When you need more (spring physics, gesture-driven animation, orchestrated sequences), add one of:

- **Framer Motion** — easiest React integration, great for layout animations and gestures
- **React Spring** — spring physics, more control, steeper learning curve
- **GSAP** — most powerful, best for complex timelines, not React-native but works well

Don't pick now. Build the desk-to-canvas transition and canvas panning with CSS/WAAPI first. If they feel limited, introduce Framer Motion as a single dependency.

**Self-hosted fonts.** Same as before: Fraunces (variable), JetBrains Mono (300, 400), Caveat (400) as woff2. `font-display: swap`.

---

## 3. GitHub setup

Same as before:

```
Repository: yankunwang/portfolio-2026 (private until launch)
Default branch: main
```

**Branch strategy:** `main` → `dev` → feature branches. Solo project, keep it simple.

**.gitignore:**

```
node_modules/
dist/
.DS_Store
*.local
.env
```

---

## 4. Deployment

**Vercel** (or Cloudflare Pages).

- Root directory: `site/`
- Build command: `npm run build`
- Output: `dist/`
- Framework preset: Vite
- Add a `_redirects` or Vercel rewrite rule to send all routes to `index.html` (SPA fallback)

---

## 5. CLAUDE.md placement

### Root: `.claude/CLAUDE.md`

Auto-loaded every session. Under 500 words:

- Project summary: Field Notebook portfolio, React SPA, visual language from vibe-guideline
- Design source of truth: `00-brief/vibe-guideline.md`
- Hard constraints: no CSS frameworks, no component libraries, no placeholder content, no AI prose
- v1 scope
- Pointer to this architecture doc

### Modular rules: `.claude/rules/`

Auto-loaded every session:

- **`design-tokens.md`** — color, type, spacing values (copy-pasteable CSS custom properties)
- **`code-style.md`** — React conventions (functional components, hooks, CSS Modules, TypeScript strict), no Tailwind, no icon libraries
- **`voice.md`** — writing rules from vibe-guideline
- **`portfolio-scope.md`** — v1 scope, open questions

### Build-specific: `site/src/CLAUDE.md`

Loaded when Claude Code works inside `site/src/`:

- React component patterns (props interface, children vs. slots, ref forwarding)
- CSS Module conventions (naming, how to use tokens)
- Hook patterns for interactions (useDraggable, usePanCanvas, transition hooks)
- Route structure and how to add new routes
- Image handling (editorial plate pattern, lazy loading)

### Local: `.claude.local.md`

Gitignored. Machine-specific overrides.

---

## 6. Multi-agent system

Three agents in `.claude/agents/`:

### `content-writer.md`

```yaml
---
description: "Writes case studies, journal entries, and colophon copy. Voice: first-person, reflective, literary. Invoke with @content-writer."
tools: ["Read", "Write", "Edit"]
---
```

Works in `01-content/` only. Voice rules from vibe-guideline baked into the prompt. Never touches React code. Flags missing information rather than inventing it.

### `visual-designer.md`

```yaml
---
description: "Reviews layout, spacing, typography, and visual consistency against the vibe-guideline. Invoke with @visual-designer."
tools: ["Read", "Write", "Edit"]
---
```

Works primarily in CSS files (`tokens.css`, `typography.css`, `*.module.css`) and JSX markup. Thinks in the 12-column grid, type scale, and notebook metaphor. Flags deviations from the guideline.

### `frontend-engineer.md`

```yaml
---
description: "Builds React components, interaction hooks, and route pages. Invoke with @frontend-engineer."
tools: ["Read", "Write", "Edit", "Bash"]
---
```

Builds in `site/src/`. React functional components, TypeScript strict, CSS Modules. Writes interaction hooks (`useDraggable`, `usePanCanvas`, transition hooks). Cares about performance, accessibility (keyboard nav, reduced motion, semantic HTML), and clean component APIs. No frameworks beyond React, no CSS libraries.

### Orchestration

You are the orchestrator. Typical flow:

1. **Content-writer** drafts copy in `01-content/`
2. You review and edit
3. **Frontend-engineer** builds the component
4. **Visual-designer** reviews against the guideline
5. You make final calls

---

## 7. Getting started sequence

1. `cd site && npm create vite@latest . -- --template react-ts`
2. Install React Router: `npm install react-router`
3. Set up `tokens.css`, `reset.css`, `typography.css`, `global.css`
4. Download and add self-hosted fonts to `public/fonts/`
5. Write `.claude/CLAUDE.md` and rules files
6. Write the three agent `.md` files
7. Create `01-content/` with stub files
8. Build the first component: the desk scene with notebook cover
9. `git init`, first commit, push to GitHub

---

## 8. Decisions log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-18 | Field Notebook over Liner Notes | Process/polish spread metaphor is a stronger thesis about how Yankun works |
| 2026-04-18 | Vite + React over Astro | Site needs app-level interactivity and flexibility to change display formats. Astro optimizes for minimal JS, which is the opposite of what we need |
| 2026-04-18 | CSS Modules over CSS-in-JS | Stays close to plain CSS (vibe-guideline constraint), component-scoped, zero runtime |
| 2026-04-18 | Animation library deferred | Start with CSS transitions + WAAPI. Add Framer Motion only if needed |
| 2026-04-18 | SPA with client-side routing | Enables seamless transitions between views. Can revisit if SSR/SEO becomes important |
| 2026-04-18 | Desk scene replaces bare cover | Three objects on an angled desk as navigation portals. See `prd-homepage-desk.md` |
| 2026-04-18 | Spatial canvas replaces paginated book | Pinboard layout with hand-composed clusters. See `prd-notebook-canvas.md` |
| 2026-04-18 | Vertical scroll for case studies | Projects are editorial long-scroll, not two-page spreads |

---

*Field Notebook prototype established the visual language. The desk + canvas + scroll model is the interaction architecture.*
