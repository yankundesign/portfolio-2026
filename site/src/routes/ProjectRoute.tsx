import { useEffect, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router';
import ChaiProject from '../components/project/ChaiProject';
import ControlHubAgenticProject from '../components/project/ControlHubAgenticProject';
import SapFieldglassProject from '../components/project/SapFieldglassProject';
import BuildWithAiProject from '../components/project/BuildWithAiProject';
import Grain from '../components/shared/Grain';
import { projects } from '../data/projects';
import styles from './ProjectRoute.module.css';

/**
 * /works/:slug — project detail route.
 *
 * CHAI, Control Hub Agentic, Build with AI, and SAP Fieldglass have bespoke
 * layouts. Other projects render a stub with the canvas-card info.
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

    return () => {
      document.documentElement.style.overflow = prev.htmlOverflow;
      document.body.style.overflow = prev.bodyOverflow;
    };
  }, []);

  // Project-to-project links keep the browser's current scroll position unless
  // this route explicitly resets it after the new slug renders.
  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);

    return () => window.cancelAnimationFrame(frame);
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
        ) : slug === 'control-hub-agentic' ? (
          <ControlHubAgenticProject />
        ) : slug === 'build-with-ai' ? (
          <BuildWithAiProject />
        ) : slug === 'sap-fieldglass' ? (
          <SapFieldglassProject />
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
