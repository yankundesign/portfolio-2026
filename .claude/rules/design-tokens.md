# Design Tokens

Copy-pasteable values from `00-brief/vibe-guideline.md`. Use these exactly.

## Color

```css
--ink: #16265e;            /* Primary: type, rules, marks, most UI */
--ink-soft: #2a3a7a;       /* Secondary: captions, metadata inline */
--ink-muted: rgba(22, 38, 94, 0.2); /* Hairline rules, dividers */
--ink-faint: rgba(22, 38, 94, 0.08);
--paper: #f4f1ea;          /* Background */
--paper-soft: #ebe6d9;     /* Callouts, quote blocks, subtle panels */
--paper-shadow: #ddd6c2;
--sticky: #f1e6b8;         /* Sticky note process artifacts */
```

Only two colors (ink + paper). No grays, no accent colors. If a third color feels needed, use ink blue at heavier weight instead.

## Typography

| Role | Font | Weights | Size |
|---|---|---|---|
| Display XL (cover) | Fraunces | 300–500, `opsz` 144 | 88–104px, lh 0.88, tracking -0.03em |
| Display L (project titles) | Fraunces | 300–500 | 56–64px, lh 0.95 |
| Display M (section heads) | Fraunces | 300–500 | 32–40px |
| Body large (essay lead) | Fraunces | 300, 400i | 22px / 1.5 |
| Body (essay) | Fraunces | 300, 400i | 18px / 1.55 |
| Caption / metadata | JetBrains Mono | 300, 400 | 11–12px, tracked 0.1em |
| Marginalia (v1) | Caveat | 400, 500 | 2–6 words max |

## Spacing & Grid

- **Max content width:** 1280px
- **Columns:** 12 desktop, 6 tablet, 4 mobile
- **Gutter:** 24px desktop, 20px tablet, 16px mobile
- **Margins:** 60px desktop, 32px tablet, 24px mobile
- **Baseline unit:** 8px

## Motion

- Small reveals: 240ms ease-out
- Page transitions: 480ms custom ease-out with slight overshoot
- Page turn / cover open: 600–800ms, `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Hover states: 160ms ease-out
- Cover unfold easing: `cubic-bezier(0.34, 1.2, 0.64, 1)`

## Paper Grain

SVG noise at ~6% opacity, fixed to viewport, multiply blend mode. Inline in CSS, not a separate asset.
