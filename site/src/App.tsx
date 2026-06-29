import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import DeskRoute from './routes/DeskRoute'
import CanvasRoute from './routes/CanvasRoute'
import ProjectRoute from './routes/ProjectRoute'
import JournalRoute from './routes/JournalRoute'
import ColophonRoute from './routes/ColophonRoute'
import CvRoute from './routes/CvRoute'
import AboutRoute from './routes/AboutRoute'
import RadioRoute from './routes/RadioRoute'
import NotFoundRoute from './routes/NotFoundRoute'
import InkFilters from './components/shared/InkFilters'
import NotebookTransition from './components/transition/NotebookTransition'
import { WashTuneProvider } from './components/shared/WashTuneContext'
import WashTuneMount from './components/shared/WashTuneMount'

/**
 * Routes wrapped in AnimatePresence so the desk ↔ canvas transition can
 * coordinate route mount/unmount with the NotebookTransition overlay.
 * `mode="wait"` keeps the previous route mounted briefly while the new one
 * mounts — useful if any route ever wants its own enter/exit animation.
 *
 * Today the routes don't animate themselves; the overlay paints the
 * transition. AnimatePresence is a no-op for non-motion children, so this
 * wrapper costs nothing for instant route changes (e.g. /cv, /about).
 */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<DeskRoute />} />
        <Route path="/works" element={<CanvasRoute />} />
        <Route path="/works/:slug" element={<ProjectRoute />} />
        <Route path="/cv" element={<CvRoute />} />
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/radio" element={<RadioRoute />} />
        <Route path="/experiments/data-specimen" element={<DataSpecimenRedirect />} />
        <Route path="/experiments/data-specimen/" element={<DataSpecimenRedirect />} />
        <Route path="/journal/:slug" element={<JournalRoute />} />
        <Route path="/colophon" element={<ColophonRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </AnimatePresence>
  )
}

function DataSpecimenRedirect() {
  useEffect(() => {
    window.location.replace('/experiments/data-specimen/index.html')
  }, [])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <WashTuneProvider>
        {/* Global SVG filter defs — referenced by url(#…) from any element. */}
        <InkFilters />
        <AnimatedRoutes />
        {/* The desk → canvas signature transition. Mounted at the root so
         * it sits above all route content. Listens for notebook:open /
         * notebook:close events and orchestrates the choreography. Idle
         * cost is essentially zero (overlay is pointer-events: none and
         * empty unless a transition is in flight). */}
        <NotebookTransition />
        {/* In-production tuning overlay. Mounts only when ?tune=wash is in the
         * URL on initial render, so production traffic pays no overhead. */}
        <WashTuneMount />
      </WashTuneProvider>
    </BrowserRouter>
  )
}
