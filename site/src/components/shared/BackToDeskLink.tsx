import { Link } from 'react-router';
import styles from './BackToDeskLink.module.css';

export default function BackToDeskLink() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      <Link to="/" className={styles.link} aria-label="Back to the desk">
        <span className={styles.icon} aria-hidden="true">
          ←
        </span>
        <span>Back to desk</span>
      </Link>
    </nav>
  );
}
