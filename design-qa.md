# Ebb case study design QA

## Comparison target

- Source visual truth path: `https://www.centertimer.com/`
- CTA source visual truth path: `/var/folders/4f/rnrbfqs946q04wxjtk4pg4vw0000gn/T/codex-clipboard-22b3c909-3b64-4d01-b338-861575261f49.png`
- Layout source visual truth path: `/Users/yankunwang/Desktop/Screenshot 2026-08-08 at 2.14.53 PM.png` (CHAI)
- Earlier Ebb comparison path: `/Users/yankunwang/Desktop/Screenshot 2026-08-08 at 2.15.08 PM.png`
- Implementation screenshot path: `http://127.0.0.1:5181/works/ebb`
- Source state: Center homepage, top of page
- Implementation states: Ebb page header, App Store CTA closed/open, first chapter, Visual system chapter, and mobile header/first chapter
- Layout-comparison viewport: 2048 × 1280 CSS px at DPR 1; the CHAI source and revised Ebb implementation captures were both 2048 × 1280 px
- Mobile viewport: 390 × 844 CSS px at DPR 1; implementation capture was 390 × 844 px
- Density normalization: none required; the compared desktop captures were the same pixel size and DPR

The source and implementation were opened and captured in the same in-app browser session. The reference supplied structural direction rather than a skin to clone: narrow reading measure, one concise idea per chapter, generous vertical separation, and one dominant product visual after the copy. Ebb intentionally retains the portfolio's paper, ink, Fraunces, JetBrains Mono, editorial plates, and sticky chapter rail.

## Full-view comparison evidence

- The header now presents one thesis, authorship metadata, an App Store CTA, and one dominant product image, matching the source's product-first hierarchy while making Ebb's real-app status explicit.
- The App Store action sits beneath the hero and matches the supplied reference at 282 × 52px, 6px radius, 16px mixed-case system type, and centered placement.
- Ebb now inherits CHAI's article, grid, section, prose, and plate measures without any Ebb-only width wrappers. At 2048px both pages measured a 1764px article, a 1762px grid, a 1368px body/section, `76em` reading measure, and `192px 1368px 122px` grid tracks.
- Five chapters replace the former seven-chapter essay. Each follows the same repeatable sequence: chapter label, title, short copy, then media.
- The sticky rail remains visible at 1280px and is removed at the existing sub-1024px breakpoint.
- The 390px implementation capture has no horizontal overflow; the rail is absent, the article is 327px wide, the body/section is 325px wide, and the reading order remains intact.

## Focused-region comparison evidence

The first body section was inspected at desktop and mobile sizes because its rail-to-copy relationship, text wrapping, and media alignment were too small to judge from a full-page capture. The revised desktop view shows the same wide reading track as CHAI; the mobile view shows the shared single-column collapse with no clipping or overflow.

## Required fidelity surfaces

- Fonts and typography: Center's sans serif was not copied. Ebb correctly keeps Fraunces for display/body and JetBrains Mono for metadata. The hierarchy remains clear at desktop and mobile sizes with no clipping or truncation.
- Spacing and layout rhythm: Ebb now uses the exact CHAI `article`, `grid`, `body`, `beat`, and `proof` classes. The former 76rem article cap, 52rem reading measure, 42rem copy cap, and extra Ebb-only section gaps were removed. Mobile sections remain single-column.
- Colors and visual tokens: The approved ink-blue and warm-paper palette, grain, thin rules, and plate shadows remain unchanged. This is an intentional portfolio-system difference from Center's dark monochrome surface.
- Image quality and asset fidelity: The supplied 1920 × 1080 hero is sharp and correctly framed at desktop and mobile sizes. Four requested stills and the intercept video are intentionally represented by exact-path pending states until the user supplies the final media; no fake replacement art was introduced.
- Copy and content: The header identifies Ebb as an independent iOS app and credits it as “Designed & built by me”; the retired research-prototype label is absent. The rail contains exactly Why Ebb exists, What Ebb is, How it works, Visual system, and Outcomes. Repeated summary/body sentences were removed without adding unsupported claims. Outcomes and the AI process note remain explicitly pending.
- Interaction and accessibility: The App Store button reveals a persistent, in-flow publication-status message with `role="status"`, `aria-live="polite"`, and an accurate `aria-expanded` state. All five rail links updated the hash and active state to the requested chapter. Back to works navigated to `/works`. The button and rail anchors expose visible focus outlines, headings and regions are semantic, retained media has alternative text, and the browser console reported no warnings or errors.
- Motion: `VideoPlate` disables autoplay, exposes controls, and uses metadata preload when `prefers-reduced-motion` is active. Runtime media-query emulation was not available in the selected browser, so this remains a code-level verification.

## Comparison history

### Pass 1

- Earlier finding: [P2] At 1280px the shared 60em reading measure pushed Ebb's body and media 53px beyond the right viewport edge.
- Fix made: Added an Ebb-only 76rem article maximum and 52rem media measure, preserving the shared case-study grid and sticky rail.
- Post-fix evidence: The article measured left 60px / right 1205px, the body measured left 285px / right 1117px, and document scroll width matched the 1280px viewport.

### Pass 2

- Earlier finding: [P2] What Ebb is, How it works, and Visual system repeated their italic summaries in the first body paragraph, weakening the simplified cadence.
- Fix made: Removed only duplicated source sentences and retained the approved facts and canonical strings.
- Post-fix evidence: The final Visual system capture opens with one thesis followed directly by the toll-versus-mark explanation; no duplicate first paragraph remains.

### Pass 3

- Earlier finding: [P2] The independent-app and authorship metadata appeared below the hero, delaying the strongest proof that Ebb is a real product designed and built by the author.
- Fix made: Replaced the research-prototype language, moved the metadata above the CTA, and added the reference-inspired App Store action with an honest publication-in-progress response.
- Post-fix evidence: Desktop and 390 × 844 captures show `Independent iOS app · July 2026 · Designed & built by me` in the opening header before the hero. Clicking the button changes `aria-expanded` to `true` and reveals the publication-status panel without navigation or layout overflow.

### Pass 4

- Requested change: Match the supplied light App Store button reference and move the action beneath the hero.
- Fix made: Reordered the optional header action after the hero, changed it to the reference's mixed-case 282 × 52px rounded treatment, added the Apple mark, and kept the status panel immediately beneath it.
- Post-fix evidence: Desktop and 390 × 844 captures show the hero ending before the CTA begins. Mobile measurements were hero bottom 356px, button top 395px, button width 282px, and page scroll width equal to the 390px viewport.

### Pass 5

- Earlier finding: [P1] Ebb's Ebb-only 76rem article, 52rem reading measure, 42rem copy wrapper, and oversized section gaps made the page visibly narrower than CHAI and created excessive side whitespace.
- Fix made: Removed `EbbProject.module.css`, removed every Ebb-specific copy wrapper, and applied CHAI's shared `article`, `beat`, and `proof` classes directly to the Ebb structure.
- Post-fix visual evidence: At 2048 × 1280, CHAI and Ebb now share the same 1764px article, 1762px grid, 1368px body/section, `76em` reading measure, and `192px 1368px 122px` desktop grid. The revised Ebb screenshot visibly uses the wide CHAI reading column and plate width. At 390 × 844, the rail is hidden, the body/section is 325px wide, document scroll width equals the 390px viewport, and no horizontal overflow is present.

## Findings

No actionable P0, P1, or P2 findings remain.

## Open questions

- Final crop and text legibility for the four pending stills cannot be assessed until those assets are supplied.
- Reduced-motion video behavior was verified from the rendered component contract but not through browser preference emulation.

## Implementation checklist

- [x] Five-section story and sticky desktop rail
- [x] Visual system replaces the former key-decision/intercept split
- [x] Six-media contract with exact pending paths
- [x] Desktop and mobile overflow checks
- [x] Exact CHAI article, grid, section, and breakpoint layout inheritance
- [x] Rail links, active state, focus visibility, and Back to works
- [x] App Store CTA, status response, and reference-sized mobile treatment
- [x] Console error check
- [x] Production build and focused lint

## Follow-up polish

- [P3] Recheck crop, caption wrapping, and perceived plate spacing after the four final stills and intercept video are added.

final result: passed
