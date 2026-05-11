import { type ReactNode } from 'react';
import styles from './ProseBlock.module.css';

export interface ProseBlockProps {
  /** Array of paragraph strings, OR children if a single custom paragraph. */
  paragraphs?: readonly string[] | null;
  /** Variant: lead is 22px (opening), body is 18px (default). */
  variant?: 'lead' | 'body';
  /** Width mode: 'read' (standard 640-680px column), 'narrow' (tighter, reflection). */
  width?: 'read' | 'narrow';
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
  children,
}: ProseBlockProps) {
  if (children) {
    return (
      <div className={[styles.block, styles[variant], styles[width]].join(' ')}>{children}</div>
    );
  }

  if (!paragraphs || paragraphs.length === 0) {
    // Loud omission — caller should have rendered TodoSlot.
    return null;
  }

  return (
    <div className={[styles.block, styles[variant], styles[width]].join(' ')}>
      {paragraphs.map((p, i) => (
        <p key={i} className={styles.p}>
          {p}
        </p>
      ))}
    </div>
  );
}
