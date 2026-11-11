import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import HomeRoute from './routes/HomeRoute'
import ProjectRoute from './routes/ProjectRoute'
import JournalRoute from './routes/JournalRoute'
import ColophonRoute from './routes/ColophonRoute'
import CvRoute from './routes/CvRoute'
import AboutRoute from './routes/AboutRoute'
import RadioRoute from './routes/RadioRoute'
import NotFoundRoute from './routes/NotFoundRoute'
import InkFilters from './components/shared/InkFilters'
import { WashTuneProvider } from './components/shared/WashTuneContext'
import WashTuneMount from './components/shared/WashTuneMount'

/**
 * "/" and "/works" are one place: the homepage and its notebook, closed or
 * open. HomeRoute stays mounted across the two so the notebook can animate
 * between them; every other path renders through Routes as before.
 */
function AnimatedRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/works'
  return (
    <AnimatePresence mode="wait">
      {isHome ? <HomeRoute key="home" /> : (
      <Routes location={location} key={location.pathname}>
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
      )}
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
        {/* In-production tuning overlay. Mounts only when ?tune=wash is in the
         * URL on initial render, so production traffic pays no overhead. */}
        <WashTuneMount />
      </WashTuneProvider>
    </BrowserRouter>
  )
}
