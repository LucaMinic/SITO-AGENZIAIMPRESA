import { Link } from 'react-router-dom'
import { areas, areaUrl } from '../content/services.js'
import { company, contactIntro, sedi, telHref } from '../content/site.js'
import { Logo } from './Header.jsx'
import { BrandField, Button } from './ui.jsx'

const COMPANY_LINKS = [
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/soluzioni/imprese', label: 'Soluzioni per le imprese' },
  { to: '/soluzioni/professionisti', label: 'Soluzioni per Professionisti' },
  { to: '/apri-la-tua-agenzia', label: 'Apri la tua Agenzia' },
]
const LEGAL_LINKS = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
  { to: '/note-legali', label: 'Dati societari' },
]

function Col({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-white/60">{title}</h2>
      {children}
    </div>
  )
}

export default function Footer({ cta = true }) {
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-brand-dark text-white">
      {cta && (
        <section className="relative isolate overflow-hidden" aria-labelledby="footer-cta">
          <BrandField variant="b" />
          <div className="wrap relative grid gap-10 py-20 md:py-28 lg:grid-cols-8 lg:items-end">
            <div className="lg:col-span-5">
              <h2 id="footer-cta" className="text-h1 text-balance">
                {contactIntro}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
              <Button to="/contatti" variant="light">
                Contattaci
              </Button>
              <Button to="/sedi" variant="ghostLight" icon={null}>
                Le nostre Sedi
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="wrap pt-16 md:pt-20">
        <Link to="/" aria-label="Agenzia Impresa – Home" className="inline-block">
          <Logo negative />
        </Link>
      </div>
      <div className="wrap grid gap-12 pb-16 pt-12 md:grid-cols-2 md:pb-20 lg:grid-cols-8 lg:gap-6">
        <div className="lg:col-span-2">
        <Col title="Servizi">
          <ul className="space-y-2.5 text-[0.9375rem]">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link to={areaUrl(a)} className="link-draw inline-block py-0.5 text-white/85 hover:text-white">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        </div>
        <div className="lg:col-span-2">
          <Col title="Azienda">
            <ul className="space-y-2.5 text-[0.9375rem]">
              {COMPANY_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-draw inline-block py-0.5 text-white/85 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </div>
        <div className="md:col-span-2 lg:col-span-4">
          <Col title="Le nostre Sedi">
            <ul className="grid gap-x-6 gap-y-4 text-[0.9375rem] sm:grid-cols-2">
              {sedi.flatMap((s) =>
                s.locations.map((l) => (
                  <li key={l.city}>
                    <Link to={`/sedi/${s.slug}`} className="link-draw inline-block py-0.5 font-semibold">
                      {l.city}
                    </Link>
                    <span className="block text-white/70">{l.address}</span>
                    <a href={telHref(l.phone)} className="link-draw inline-block py-0.5 text-white/85 hover:text-white">
                      {l.phone}
                    </a>
                  </li>
                )),
              )}
            </ul>
          </Col>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-6 py-8 pr-20 text-[0.8125rem] leading-relaxed text-white/70 md:pr-28 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl">
            {company.legalName} – CF / P.IVA {company.vat} – Capitale Sociale {company.capital} – Sede Legale{' '}
            {company.legalSeat} –{' '}
            <a href={`mailto:${company.pec}`} className="link-draw inline-block hover:text-white">
              {company.pec}
            </a>
            <br />({company.group})
          </p>
          <div className="flex flex-col gap-3 lg:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-draw inline-block py-1 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Powered by:{' '}
              <a href={company.poweredBy.href} target="_blank" rel="noopener" className="link-draw inline-block py-1 hover:text-white">
                {company.poweredBy.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
