import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { metaFor } from './routes.js'
import Home from './pages/Home.jsx'
import { AreaPage, ServicePage, ServicesHub } from './pages/Services.jsx'
import { ChiSiamo, Soluzioni } from './pages/About.jsx'
import { ApriAgenzia, Contatti, Pagamenti, SedePage, Sedi } from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import SearchPage from './pages/SearchPage.jsx'
import Accessibility from './pages/Accessibility.jsx'

function RouteEffects() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <main id="contenuto" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servizi" element={<ServicesHub />} />
          <Route path="/servizi/:area" element={<AreaPage />} />
          <Route path="/servizi/:area/:slug" element={<ServicePage />} />
          <Route path="/soluzioni/imprese" element={<Soluzioni kind="imprese" />} />
          <Route path="/soluzioni/professionisti" element={<Soluzioni kind="professionisti" />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/sedi" element={<Sedi />} />
          <Route path="/sedi/:slug" element={<SedePage />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/apri-la-tua-agenzia" element={<ApriAgenzia />} />
          <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
          <Route path="/cookie-policy" element={<Legal doc="cookie" />} />
          <Route path="/note-legali" element={<Legal doc="note" />} />
          <Route path="/dichiarazione-accessibilita" element={<Accessibility />} />
          <Route path="/pagamenti" element={<Pagamenti />} />
          <Route path="/cerca" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
