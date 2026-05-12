import styles from './Ephemera.module.css';

/**
 * Ephemera — supporting material assets on the desk surface around the
 * 5 navigation objects (notebook, CV, about, pen, roulette). Mounted as
 * the first child of `.scene` so the navigation objects paint on top —
 * the architectural sketch and blueprint peek out from behind the notebook;
 * the postage stamp sits on the surface between the notebook and the CV.
 *
 * Pure presentational, decorative, pointer-events disabled. Honors the
 * refined material-integrity rule (see Decisions Log 2026-04-29):
 * each asset is depicted as a real material on the desk surface — never
 * a vector decoration.
 *
 * Skipped from the original asset list (see desk-asset-prompts.md):
 *   - Asset 3 (fabric swatch) — pulled per 2026-04-29 design review
 *   - Asset 5 (sticky note)   — not in current design reference
 *   - Asset 6 (binder clip SVG) — clip is baked into Asset 1's image
 */
export default function Ephemera() {
  return (
    <div className={styles.ephemera} aria-hidden="true">
      <img
        className={styles.sketch}
        src="/desk/architectural-sketch.webp"
        alt=""
      />
      <img
        className={styles.blueprint}
        src="/desk/blueprint-fragment.webp"
        alt=""
      />
      <img
        className={styles.postage}
        src="/desk/postage-stamp.webp"
        alt=""
      />
    </div>
  );
}
