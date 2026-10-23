import RevealOnScroll from './RevealOnScroll';
import { SketchFrame, SketchRule } from './Sketch';
import styles from './GroundedPanels.module.css';

export interface GroundedPanel {
  label: string;
  src: string;
  alt: string;
}

export interface GroundedPanelsProps {
  panels: readonly GroundedPanel[];
  /** The platform the panels stand on, e.g. "Workflows · the engine · not our design". */
  ground: string;
}

/**
 * Slide 33's layout: what I added, side by side, each with a footing down
 * into the platform underneath. The platform is the ground — dashed,
 * because it's another team's — and arrows never run down into ours.
 */
export default function GroundedPanels({ panels, ground }: GroundedPanelsProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <div className={styles.panels}>
        {panels.map((panel) => (
          <div key={panel.label} className={styles.panel}>
            <p className={styles.label}>{panel.label}</p>
            <SketchFrame seed={`grounded · ${panel.label}`} tone="dashed" className={styles.frame}>
              <div className={styles.well}>
                <img src={panel.src} alt={panel.alt} className={styles.image} loading="lazy" />
              </div>
            </SketchFrame>
            <SketchRule seed={`grounded · footing ${panel.label}`} className={styles.footing} />
          </div>
        ))}
      </div>
      <SketchFrame seed="grounded · ground" tone="dashed" wash className={styles.ground}>
        <figcaption className={styles.groundLabel}>{ground}</figcaption>
      </SketchFrame>
    </RevealOnScroll>
  );
}
