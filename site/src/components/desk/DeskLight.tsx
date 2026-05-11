import styles from './DeskLight.module.css';

/**
 * DeskLight — a static directional wash on the desk content area.
 *
 * Reads as a desk lamp or window off-frame to the upper-left. Total
 * contrast across the surface is ~5–7% — felt, not seen. Static; no
 * transitions, no reduced-motion concerns. Tunable via the CSS custom
 * properties declared in the stylesheet.
 */
export default function DeskLight() {
  return <div className={styles.light} aria-hidden="true" />;
}
