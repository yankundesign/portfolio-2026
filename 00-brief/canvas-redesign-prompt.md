# Canvas Identity Redesign — Claude Code Prompt

Delta from current implementation. Read these files first:
- `src/components/canvas/Canvas.tsx` + `Canvas.module.css`
- `src/components/canvas/PosterCard.tsx` + `PosterCard.module.css`
- `src/components/canvas/ProjectCard.tsx` + `ProjectCard.module.css`
- `src/routes/CanvasRoute.tsx` + `CanvasRoute.module.css`
- `src/data/projects.ts`
- `src/styles/tokens.css`
- `00-brief/decisions-log.md` (v0.6 entry for context)

---

```
Redesign the canvas to feel like a designed field notebook page — not a neutral layout surface. The thesis becomes surface typography, cards are physical objects with shadows (no borders), the grid is stronger. Read all the files listed above before starting.

## 1. Delete PosterCard — thesis becomes surface text

Delete `src/components/canvas/PosterCard.tsx` and `PosterCard.module.css`.

The thesis statement and bookplate content move into `Canvas.tsx` as elements rendered directly on the canvas surface (not inside a card container). They're part of the page, like a heading written on notebook paper.

**Thesis text** — positioned absolutely on the canvas. Large Fraunces Display, 80–100px. Two lines:
- `I MAKE THE INVISIBLE` — font-weight: 700, uppercase
- `handleable.` — font-weight: 300, italic

Color: `var(--ink)` but at reduced opacity (~0.12–0.15) so it reads as a surface marking, not foreground content. The project cards will partially overlap this text — that's intentional, it creates depth.

Position: left side, roughly vertically centered (e.g., `left: 3%; top: 28%`). Adjust so the text sits behind/underneath some project cards.

CSS: `pointer-events: none; user-select: none; z-index: 0;` — it's background furniture, not interactive.

**Bookplate content** — absorb into the running header area. The existing running header already has `WORKS · VOL. V` and `YK · 002`. Update it to include the bookplate identity:
- Left side: `YANKUN WANG · FIELD NOTES · VOL. V`
- Right side: `SAN FRANCISCO · 2021–PRESENT`

This replaces the separate bookplate card. The page metadata IS the bookplate.

**Remove** the poster card from CanvasRoute.tsx (the import, the component render, the POSTER_POSITION constant, the entrance delay for poster).

## 2. Strengthen the grid

In `Canvas.module.css`, change the grid line color from `var(--ink-faint)` to `var(--ink-muted)`:

```css
background-image:
  linear-gradient(var(--ink-muted) 1px, transparent 1px),
  linear-gradient(90deg, var(--ink-muted) 1px, transparent 1px);
```

`--ink-muted` is `rgba(22, 38, 94, 0.2)` — clearly visible, like a real field notebook page. The grid is the paper's identity, not wallpaper.

Also update the `.gridHidden` state to use `transparent` (already does this — just verify).

## 3. Cards: shadows replace borders

In `ProjectCard.module.css`, make these changes:

**Remove explicit borders from both `.featured` and `.standard`.** Replace with resting drop shadows:

```css
.card {
  /* ... existing styles ... */
  border: none;  /* was 1px or 2px solid */
  box-shadow:
    0 2px 8px rgba(22, 38, 94, 0.10),
    0 1px 2px rgba(22, 38, 94, 0.06);
}

.card:hover {
  transform: rotate(var(--card-rot, 0deg)) translateY(-6px);
  box-shadow:
    0 12px 24px rgba(22, 38, 94, 0.14),
    0 4px 8px rgba(22, 38, 94, 0.08);
}
```

The shadow is what defines the card edge — like a photo placed on a desk. On hover, the shadow deepens and spreads (card lifts higher off the surface).

**Featured card (`.featured`):**
- Keep `background: var(--ink)` and all text in `var(--paper)`
- Remove `border: 2px solid var(--paper)` — shadow only
- Add a slightly stronger resting shadow: `0 3px 12px rgba(22, 38, 94, 0.15), 0 1px 3px rgba(22, 38, 94, 0.08)` (it sits higher off the page)

**Standard cards (`.standard`):**
- Change background from `var(--paper-soft)` to `var(--paper)` — pure paper white, cleaner against the grid
- Remove `border: 1px solid var(--ink)` — shadow only

**Screenshot plate (`.plate`):**
- Remove the explicit border (`border-width`, `border-style`, `border-color`)
- The screenshot fills more of the card: reduce card padding from 12px to 8px, but keep the visual spacing via margins on title/impact below the screenshot
- The plate should be ~75-80% of the card's visual area

## 4. Featured card bigger

In `projects.ts`, update CHAI:
- `containerWidth: 440` (was 380)

In `ProjectCard.module.css`:
- `.featured .title` font-size: 32px (was 28px)

## 5. Update entrance sequence

With the poster card gone, update the choreography in `CanvasRoute.tsx`:

```
0–300ms   Grid fades in (already works)
300ms     Thesis surface text fades in (opacity 0 → 0.12–0.15)
500ms     Featured card drops in with settle
700ms     First standard
800ms     Second standard
900ms     Third standard
1000ms    Running header/footer + hand-drawn mark
```

The thesis text needs its own entrance animation. Add a CSS class pair (`.thesisHidden` / `.thesisVisible`) in Canvas.module.css that transitions opacity from 0 to the target value (0.12–0.15) over 400ms. Control this via a prop or state from CanvasRoute.

## 6. Update running header with bookplate identity

In `Canvas.tsx`, update the running header content:

```tsx
<div className={styles.runningHeader}>
  <span>YANKUN WANG · FIELD NOTES · VOL. V</span>
  <span>SAN FRANCISCO · 2021–PRESENT</span>
</div>
```

Update the running footer:
```tsx
<div className={styles.runningFooter}>
  <span>p. 03–04</span>
  <span>2021–2025</span>
</div>
```

## 7. Reposition cards for the new layout

With the poster card gone, cards have the full canvas. The large thesis text sits behind them on the left. Redistribute cards to use the viewport well:

In `projects.ts`, update positions:
- CHAI (featured, 440px): `left: '5%', top: '12%'` — anchors upper-left, partially overlapping the thesis text
- Smart Search (240px): `left: '55%', top: '8%'` — upper-right area
- Write-like-Webex (260px): `left: '52%', top: '52%'` — lower-right
- SAP Fieldglass (220px): `left: '22%', top: '58%'` — lower-center-left

These are starting points — adjust until the composition fills the viewport and no card is stranded. The thesis text (left side, ~3% left, ~28% top) should be partially behind the CHAI card and partially visible in the open space.

Keep existing `canvasRotation` values (CHAI: 1°, Smart Search: -1°, Write-like-Webex: 1.5°, SAP: -0.5°).

## 8. Keep the hand-drawn mark

Keep the existing SVG arrow in Canvas.tsx. Reposition if needed based on the new card layout — it should be in open space between cards, pointing from the thesis text area toward the project cards. Update the position in Canvas.module.css (`.handMark` left/top values).

## Files to delete
- `src/components/canvas/PosterCard.tsx`
- `src/components/canvas/PosterCard.module.css`

## Files to modify
- `src/components/canvas/Canvas.tsx` — add thesis surface text, update running header/footer
- `src/components/canvas/Canvas.module.css` — stronger grid, thesis text styles, thesis entrance animation
- `src/components/canvas/ProjectCard.module.css` — shadows replace borders, bigger screenshots, paper background for standards
- `src/data/projects.ts` — CHAI width 440, reposition all cards
- `src/routes/CanvasRoute.tsx` — remove PosterCard, update entrance sequence for thesis text

## Don't touch
- Desk components, project detail route, shared components, tokens.css

## After changes
- `npm run build` — no type errors
- Verify in browser: thesis text is visible but subtle behind cards, cards cast shadows, grid is clearly visible, entrance sequence flows naturally
- Check WCAG AA contrast on featured card (paper text on ink bg, no border to help define edge now — shadow must provide enough separation)
```
