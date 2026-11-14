import { useEffect, useRef } from 'react';
import { ruleStrings } from '../../interactions/ruleStrings';
import styles from './StringRule.module.css';

export interface StringRuleProps {
  /** Where the rule sits on its (positioned) parent: its bottom edge or its top edge. */
  edge?: 'bottom' | 'top';
}

/**
 * StringRule — a full-measure ink rule that is a string, as on the homepage:
 * it draws itself in from the left when it comes on screen, and rings where
 * the cursor crosses it (RuleStrings, PluckedLine).
 *
 * It replaces a 1px border on a positioned parent: keep that border,
 * transparent, for the layout.
 */
export default function StringRule({ edge = 'bottom' }: StringRuleProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    return ruleStrings.add(svg);
  }, []);

  return (
    <svg ref={ref} className={`${styles.rule} ${edge === 'top' ? styles.top : ''}`} aria-hidden="true">
      <path pathLength={1} d="" />
    </svg>
  );
}
