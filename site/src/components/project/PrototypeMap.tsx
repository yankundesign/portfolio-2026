import type { CSSProperties } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { SketchFrame, SketchMark, SketchRule, type SketchMarkKind } from './Sketch';
import type { MapMove, MapStopKind } from '../../data/controlHubAgenticContent';
import styles from './PrototypeMap.module.css';

export interface PrototypeMapProps {
  moves: readonly MapMove[];
  caption: string;
}

const MARK: Record<MapStopKind, SketchMarkKind> = {
  prototype: 'ring',
  final: 'disc',
  tested: 'ringDot',
  tick: 'tick',
};

/**
 * The prototype map, drawn by hand: explore · turn · bridge on one line.
 *
 * Sequence, not calendar — no months. Prototypes are rings, the research
 * and the pause are ticks, 05 is the solid disc, WebexOne is a ring with a
 * dot. After 05 the line gets heavy: that's the direction. Cloud Control
 * sits underneath as the ground: Agent Builder faint and dashed (being
 * built, never built on), Workflows dashed with a wash (built on). Each
 * stop links to its beat, so the map doubles as the section's index.
 */
export default function PrototypeMap({ moves, caption }: PrototypeMapProps) {
  return (
    <RevealOnScroll as="figure" className={styles.figure}>
      <ol
        className={styles.moves}
        style={{ '--map-columns': moves.map((m) => `${m.stops.length}fr`).join(' ') } as CSSProperties}
      >
        {moves.map((move, i) => {
          const last = i === moves.length - 1;
          return (
            <li key={move.move} className={styles.move}>
              <div className={styles.bracket}>
                <p className={styles.moveLabel}>{move.move}</p>
                <SketchRule seed={`map · bracket ${move.move}`} ticks weight="light" className={styles.bracketRule} />
              </div>
              <div className={styles.track}>
                <SketchRule
                  seed={`map · line ${move.move}`}
                  weight={last ? 'heavy' : 'light'}
                  className={styles.line}
                />
                <ol className={styles.stops}>
                  {move.stops.map((stop) => (
                    <li key={stop.label} className={styles.stop}>
                      <a href={stop.href} className={styles.stopLink}>
                        <SketchMark seed={`map · ${stop.label}`} kind={MARK[stop.kind]} className={styles.mark} />
                        <span className={styles.stopLabel}>{stop.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
              {move.ground ? (
                <SketchFrame
                  seed={`map · ground ${move.ground.label}`}
                  tone={move.ground.dashed ? 'faint' : 'dashed'}
                  wash={!move.ground.dashed}
                  className={styles.ground}
                >
                  <span className={styles.groundInner}>
                    <span className={[styles.groundLabel, move.ground.dashed ? styles.groundFaint : ''].join(' ')}>
                      {move.ground.label}
                    </span>
                    <span className={styles.groundNote}>{move.ground.note}</span>
                  </span>
                </SketchFrame>
              ) : (
                <div className={styles.groundEmpty} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </RevealOnScroll>
  );
}
