import styles from './CanvasPager.module.css';

export interface CanvasPagerProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

/**
 * Desktop-only folio control for the viewport-fitted notebook spreads.
 *
 * The current two-spread composition uses one stable control: it advances
 * from the first spread and returns from the last. Keeping the button in one
 * place preserves keyboard focus while the project plates change beneath it.
 */
export default function CanvasPager({
  currentPage,
  pageCount,
  onPageChange,
}: CanvasPagerProps) {
  const isLastPage = currentPage === pageCount - 1;
  const targetPage = isLastPage ? currentPage - 1 : currentPage + 1;
  const directionLabel = isLastPage ? 'previous page' : 'next page';

  return (
    <nav className={styles.pager} aria-label="Project spreads">
      <span className={styles.status} aria-live="polite" aria-atomic="true">
        spread {String(currentPage + 1).padStart(2, '0')} /{' '}
        {String(pageCount).padStart(2, '0')}
      </span>

      <button
        type="button"
        className={styles.button}
        data-direction={isLastPage ? 'previous' : 'next'}
        onClick={() => onPageChange(targetPage)}
        aria-label={`${directionLabel}, spread ${targetPage + 1} of ${pageCount}`}
      >
        {isLastPage && (
          <span className={styles.arrow} aria-hidden="true">
            ←
          </span>
        )}
        <span>{directionLabel}</span>
        {!isLastPage && (
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        )}
      </button>
    </nav>
  );
}
