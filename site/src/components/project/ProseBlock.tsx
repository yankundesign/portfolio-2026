import { type ReactNode } from 'react';
import styles from './ProseBlock.module.css';

export interface ProseBlockProps {
  /** Array of paragraph strings, OR children if a single custom paragraph. */
  paragraphs?: readonly string[] | null;
  /** Variant: lead is 22px (opening), body is 18px (default). */
  variant?: 'lead' | 'body';
  /** Width mode: 'read' (standard 640-680px column), 'narrow' (tighter, reflection). */
  width?: 'read' | 'narrow';
  /** Optional short list rendered after the paragraphs. */
  points?: readonly string[];
  children?: ReactNode;
}

/**
 * Prose block — Fraunces at either body (18px) or lead (22px) with
 * literary line-height.
 *
 * Pass `paragraphs` (an array) for data-driven prose. If `paragraphs` is
 * null the caller should render a TodoSlot instead (this component renders
 * nothing in that case, to make the omission loud).
 */
export default function ProseBlock({
  paragraphs,
  variant = 'body',
  width = 'read',
  points,
  children,
}: ProseBlockProps) {
  if (children) {
    return (
      <div className={[styles.block, styles[variant], styles[width]].join(' ')}>{children}</div>
    );
  }

  const hasParagraphs = Boolean(paragraphs && paragraphs.length > 0);
  const hasPoints = Boolean(points && points.length > 0);

  if (!hasParagraphs && !hasPoints) {
    // Loud omission — caller should have rendered TodoSlot.
    return null;
  }

  return (
    <div className={[styles.block, styles[variant], styles[width]].join(' ')}>
      {paragraphs?.map((p, i) => (
        <p key={i} className={styles.p}>
          {p}
        </p>
      ))}
      {hasPoints && points && (
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
