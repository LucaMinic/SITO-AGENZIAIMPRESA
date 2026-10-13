import { Link } from 'react-router-dom'
import { telHref } from '../content/site.js'
import { ConsentGate } from './CookieConsent.jsx'
import { ArrowLink, Icon } from './ui.jsx'

/*
 * Mappa Google della sede: Google Maps imposta cookie di terze parti, quindi l'iframe viene
 * caricato solo con il consenso alla categoria "Marketing e contenuti esterni" (banner cookie);
 * fino ad allora c'è un segnaposto con "Attiva contenuto" e il link alla mappa su Google.
 */
export function MapFacade({ src, title, query }) {
  const box = 'aspect-[4/3] w-full md:aspect-[16/10]'
  return (
    <ConsentGate
      service="google-maps"
      className={`${box} min-h-80`}
      externalUrl={query && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
    >
      <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className={`${box} border-0 bg-mist`} />
    </ConsentGate>
  )
}

export function Address({ location, className = '' }) {
  return (
    <address className={`not-italic ${className}`}>
      <span className="block">{location.address}</span>
      <span className="block">
        {location.cap} {location.city}
      </span>
      {location.phone && (
        <a href={telHref(location.phone)} className="mt-3 inline-flex min-h-6 items-center gap-2 font-semibold text-ink hover:text-brand">
          <Icon name="phone" className="size-4 text-brand" />
          <span className="link-draw">tel: {location.phone}</span>
        </a>
      )}
    </address>
  )
}

/* Riga sede in elenco: città grande, indirizzi, azioni. */
export function SedeRow({ sede, index }) {
  return (
    <li style={{ '--i': index }} className="grid gap-6 border-t border-line py-10 md:grid-cols-8 md:gap-6 md:py-12">
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
      </div>
    </li>
  )
}
