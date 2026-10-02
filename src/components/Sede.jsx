import { useState } from 'react'
import { Link } from 'react-router-dom'
import { telHref } from '../content/site.js'
import { ArrowLink, Icon } from './ui.jsx'

/* Mappa Google caricata solo su richiesta (niente iframe di terze parti al caricamento). */
export function MapFacade({ src, title }) {
  const [on, setOn] = useState(false)
  if (on) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full border-0 bg-mist md:aspect-[16/10]"
      />
    )
  }
  return (
    <button
      type="button"
      onClick={() => setOn(true)}
      className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-mist text-left md:aspect-[16/10]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <span className="relative flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center bg-brand text-white cut-corner [--cut:10px] transition-transform duration-200 group-hover:-translate-y-1">
          <Icon name="pin" className="size-6" />
        </span>
        <span className="font-semibold">Mostra la mappa</span>
        <span className="max-w-[28ch] text-xs text-muted">Il caricamento attiva Google Maps, che può utilizzare cookie di terze parti.</span>
      </span>
    </button>
  )
}

export function Address({ location, className = '' }) {
  return (
    <address className={`not-italic ${className}`}>
      <span className="block">{location.address}</span>
      <span className="block">
        {location.cap} {location.city}
      </span>
      <a href={telHref(location.phone)} className="mt-3 inline-flex min-h-6 items-center gap-2 font-semibold text-ink hover:text-brand">
        <Icon name="phone" className="size-4 text-brand" />
        <span className="link-draw">tel: {location.phone}</span>
      </a>
    </address>
  )
}

/* Riga sede in elenco: città grande, indirizzi, azioni. */
export function SedeRow({ sede, index }) {
  return (
    <li className="grid gap-6 border-t border-line py-10 md:grid-cols-8 md:gap-6 md:py-12">
      <div className="md:col-span-3">
        <span className="text-xs font-semibold text-brand tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <h2 className="text-h2 mt-2">
          <Link to={`/sedi/${sede.slug}`} className="hover:text-brand">
            {sede.city}
          </Link>
        </h2>
        {sede.note && <p className="eyebrow mt-3 text-muted">{sede.note}</p>}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:col-span-3">
        {sede.locations.map((l) => (
          <div key={l.city}>
            {sede.locations.length > 1 && <p className="mb-2 font-semibold">{l.city}</p>}
            <Address location={l} className="text-muted" />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-start gap-3 md:col-span-2 md:items-end">
        <ArrowLink to={`/sedi/${sede.slug}`}>Contatta ora</ArrowLink>
        <a
          href={sede.login}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
        >
          <Icon name="login" className="size-4" />
          <span className="link-draw">Login</span>
        </a>
      </div>
    </li>
  )
}
