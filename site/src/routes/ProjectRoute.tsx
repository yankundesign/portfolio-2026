import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import ChaiProject from '../components/project/ChaiProject';
import Grain from '../components/shared/Grain';
import { projects } from '../data/projects';
import styles from './ProjectRoute.module.css';

/**
 * /works/:slug — project detail route.
 *
 * For now, only the CHAI case study has a bespoke layout. Other projects
 * (control-hub-agentic, build-with-ai, sap-fieldglass) render a stub with
 * the canvas-card info — the writing for those is still in 01-content/ as
 * empty shells, and the layout is planned after CHAI stabilizes.
 *
 * /works/smart-search was retired in canvas v0.7 — the slug now resolves to
 * the 404 stub. Smart Search remains a proof beat *inside* the CHAI case
 * study (see chaiContent.ts), it just no longer exists as a top-level work.
 *
 * Scroll handling follows the CvRoute pattern: global html/body have
 * overflow:hidden to pin the desk scene; this route toggles them to auto
 * while mounted, then restores on unmount.
 */
export default function ProjectRoute() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  // Enable scroll only while this route is mounted.
  useEffect(() => {
    const prev = {
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
    };
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);

    return () => {
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };
  }, [slug]);

  return (
    <div className={styles.page}>
      <Grain />

      <nav className={styles.topNav} aria-label="Primary">
        <Link to="/works" className={styles.back}>
          <span aria-hidden="true">←</span>
          <span className={styles.backLabel}>back to works</span>
        </Link>
      </nav>

      <main className={styles.main}>
        {slug === 'chai' ? (
          <ChaiProject />
        ) : project ? (
          <ProjectStub project={project} />
        ) : (
          <ProjectNotFound />
        )}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stub for non-CHAI projects (writing still in progress)
// ---------------------------------------------------------------------------

interface ProjectStubProps {
  project: {
    slug: string;
    title: string;
    subtitle: string;
    year: string;
    impact: string;
    figNumber: number;
  };
}

function ProjectStub({ project }: ProjectStubProps) {
  const figLabel = `fig. 0${project.figNumber}`;
  return (
    <article className={styles.stub}>
      <p className={styles.stubFig}>{figLabel}</p>
      <h1 className={styles.stubTitle}>{project.title}</h1>
      <p className={styles.stubSubtitle}>
        <em>{project.subtitle}</em>
      </p>
      <p className={styles.stubMeta}>
        <span>{project.year}</span>
        <span aria-hidden="true" className={styles.stubSep}>·</span>
        <span>{project.impact}</span>
      </p>
      <div className={styles.stubBody}>
        <p className={styles.stubLabel}>Case study in progress</p>
        <p className={styles.stubDesc}>
          This project is stubbed for v1. A full write-up is on the way —
          until then, you can see it in context on the canvas.
        </p>
        <Link to="/works" className={styles.stubBack}>
          <span aria-hidden="true">←</span> back to works
        </Link>
      </div>
    </article>
  );
}

function ProjectNotFound() {
  return (
    <article className={styles.stub}>
      <p className={styles.stubFig}>404</p>
      <h1 className={styles.stubTitle}>This page is blank.</h1>
      <p className={styles.stubSubtitle}>
        <em>There's no project here.</em>
      </p>
      <div className={styles.stubBody}>
        <Link to="/works" className={styles.stubBack}>
          <span aria-hidden="true">←</span> back to works
        </Link>
      </div>
    </article>
  );
}
