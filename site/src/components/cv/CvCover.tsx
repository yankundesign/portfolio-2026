import { contact } from '../../data/cv';
import styles from './CvCover.module.css';

/**
 * CV cover block — the Mary Kim moment.
 *
 * Type is stacked at display-XL. An italic word ("Designer") intrudes
 * between the first and last name, the way Mary Kim mixes italic Fraunces
 * into otherwise-roman headlines.
 *
 * The tagline sits off to the right in mono, pinned to the edge of the
 * content column — deliberately asymmetric. Contact metadata hangs in
 * the bottom-left gutter.
 */
export default function CvCover() {
  return (
    <header className={styles.cover} aria-labelledby="cv-cover-title">
      <h1 id="cv-cover-title" className={styles.name}>
        <span className={styles.nameRow}>
          <span className={styles.firstName}>Yankun</span>
        </span>
        <span className={styles.nameRow}>
          <span className={styles.midTag}>
            <em>a</em> product
          </span>
        </span>
        <span className={styles.nameRow}>
          <span className={styles.lastName}>Wang</span>
          <em className={styles.designer}>designer</em>
        </span>
      </h1>

      <p className={styles.tagline}>
        Curriculum vitae,
        <br />
        <span>April 2026</span>
      </p>

      <dl className={styles.contact}>
        <div className={styles.contactRow}>
          <dt>tel</dt>
          <dd>{contact.phone}</dd>
        </div>
        <div className={styles.contactRow}>
          <dt>email</dt>
          <dd>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dd>
        </div>
        <div className={styles.contactRow}>
          <dt>web</dt>
          <dd>
            <a href={`https://${contact.portfolio}`}>{contact.portfolio}</a>
          </dd>
        </div>
      </dl>
    </header>
  );
}
