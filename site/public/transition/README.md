# Transition assets

Three PNG layers consumed by `src/components/transition/NotebookTransition.tsx`. The two-color discipline holds: dark navy ink (`#16265e`) on warm cream paper (`#f4f1ea`).

| File | Purpose | Size (rendered) | Source |
|---|---|---|---|
| `notebook-closed.png` | Closed notebook visible at the very start of the open transition (matched-pixel handoff with the desk's notebook) and at the very end of the close transition. | ~340 × 500 (rendered to desk-rect) | Re-cut from the existing desk `notebook.png` to the same proportions, transparent background. |
| `notebook-cover-front.png` | Just the front cover, isolated, with the spine flush at the LEFT edge so `transform-origin: 0% 50%` rotates around the spine. The rotating piece. | ~340 × 500 (start) → ~half-spread (end) | Photoshop alpha-cut from `notebook-closed.png`. |
| `open-notebook.png` | Open spread destination state. **Lives in `/public/canvas/`, not here** — shared with `NotebookSpread` which already references that path. | matches canvas spread geometry | Existing canvas v0.8.1 asset. |

Full asset prompts and pixel-alignment requirements: [`00-brief/transition-asset-prompts.md`](../../../00-brief/transition-asset-prompts.md).

---

## Pixel-alignment checklist

Before shipping a regenerated asset:

- [ ] `notebook-closed.png` and `notebook-cover-front.png` are aligned at 100% zoom — the cover face on the closed notebook matches the cover-front asset in size, position, label placement.
- [ ] `notebook-cover-front.png`'s LEFTMOST pixel is the spine edge — no transparent gap, no shadow extending past. The rotation hinge depends on this; any bleed creates a visible offset during rotation.
- [ ] Cross-fade test: stack `notebook-cover-front.png` over the LEFT half of `/canvas/open-notebook.png`. The cover's right edge should land on the binding crease (the spread's horizontal midpoint) — that's where the rotated cover ends up at -180°.

---

## Optional asset (not currently shipped)

`notebook-cover-back.png` — the inside face of the front cover (cream endpaper, possibly an ex-libris stamp). Visible during the rotation between 90° and 180°. Without it, `backface-visibility: hidden` makes the cover disappear cleanly past 90°.

The current implementation skips this asset per the PRD's recommendation. Revisit if the v1 transition feels too abrupt at the cover-flip moment.

---

## Generation note

These were generated as placeholders by the build agent. If they don't match the desk's notebook geometry exactly, the open transition's first beat (the closed-notebook handoff) will visibly jump. Regenerate to spec and the handoff becomes invisible.

The `[NotebookTransition]` overlay logs a console warning if any of these assets fail to load, so missing files are visible in DevTools.
