import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  areaBySlug,
  areaIndex,
  areas,
  areaSummary,
  areaUrl,
  searchIndex,
  serviceItems,
  services,
  serviceUrl,
  totalServices,
  totalSubareas,
  TRANSVERSAL,
} from '../content/services.js'
import { home, serviceCta } from '../content/site.js'
import { areaPhotos } from '../content/images.js'
import { Button, FramedPhoto, Icon, PageHero, Reveal } from '../components/ui.jsx'
import { AreaIndexRow } from './Home.jsx'
import NotFound from './NotFound.jsx'

const contactHref = (subject) => `/contatti?oggetto=${encodeURIComponent(subject)}`
const asItems = (list) => list.map((text) => ({ type: 'item', text }))

/* Servizi di una sotto-area (voci del listino): riga descrittiva e righe numerate. */
function Prestazioni({ blocks, compact = false }) {
  const items = blocks.filter((b) => b.type === 'item' || b.type === 'li')
  const text = blocks.filter((b) => b.type === 'p')
  return (
    <>
      {text.map((b, i) => (
        <p key={i} className={compact ? 'mb-3 text-[0.9375rem] text-muted' : 'text-lead mb-6'}>
          {b.text}
        </p>
      ))}
      {items.length > 0 && (
        <ol className={compact ? 'space-y-2' : 'border-t border-line'}>
          {items.map((b, i) =>
            compact ? (
              <li key={i} className="relative pl-5 text-[0.9375rem] leading-snug text-muted">
                <span aria-hidden="true" className="absolute left-0 top-[0.6em] h-px w-2.5 bg-brand" />
                {b.text}
              </li>
            ) : (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5">
                <span className="pt-0.5 text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="leading-snug">{b.text}</span>
              </li>
            ),
          )}
        </ol>
      )}
    </>
  )
}

/* Richiesta di informazioni sulla singola sotto-area, sobria, su ogni riga dell'elenco. */
function RowCta({ service, area, className = '' }) {
  return (
    <Link
      to={contactHref(`${service} – ${area}`)}
      aria-label={`Richiedi informazioni su ${service}`}
      className={`group inline-flex min-h-6 items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark ${className}`}
    >
      <span className="link-draw">Richiedi informazioni</span>
      <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

function CtaAside({ subject }) {
  return (
    <div className="border-t-2 border-brand pt-6">
      <p className="font-semibold leading-snug">{serviceCta}</p>
      <Button to={contactHref(subject)} className="mt-6">
        Richiedi informazioni
      </Button>
      <p className="mt-6 text-sm text-muted">
        oppure{' '}
        <Link to="/sedi" className="text-ink underline underline-offset-2 hover:text-brand">
          contatta la sede più vicina
        </Link>
      </p>
    </div>
  )
}

/* ---------- /servizi ---------- */
export function ServicesHub() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const results = useMemo(() => {
    if (query.length < 2) return null
    const words = query.split(/\s+/)
    return searchIndex.filter((r) => words.every((w) => r.haystack.includes(w)))
  }, [query])

  const stats = [
    [areas.length, 'Aree'],
    [totalSubareas, 'Sotto-aree'],
    [totalServices, 'Servizi'],
  ]

  return (
    <>
      <PageHero
        eyebrow="Servizi"
        title="I nostri Servizi"
        lead={home.claim}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi' }]}
        aside={
          <dl className="grid grid-cols-3 border-t border-ink lg:mt-6">
            {stats.map(([n, label], i) => (
              <div key={label} className={`flex flex-col-reverse py-5 ${i > 0 ? 'border-l border-line pl-4' : 'pr-4'}`}>
                <dt className="mt-1 text-sm text-muted">{label}</dt>
                <dd className="text-4xl font-light tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <div className="wrap section pt-12 md:pt-16">
        <div role="search" className="relative mb-16 max-w-2xl md:mb-20">
          <label htmlFor="cerca" className="eyebrow mb-3 block text-muted">
            Cerca un’area, una sotto-area o un servizio
          </label>
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-0 top-1/2 size-6 -translate-y-1/2 text-brand" />
            <input
              id="cerca"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="es. visura, PEC, SCIA, bilancio…"
              className="w-full border-0 border-b-2 border-ink bg-transparent py-4 pl-10 text-xl font-light placeholder:text-muted/60 focus:border-brand focus:outline-none md:text-2xl"
            />
          </div>
        </div>

        {results ? (
          <section aria-live="polite">
            <p className="mb-6 text-sm text-muted">
              {results.length === 0 ? 'Nessun risultato.' : `${results.length} risultat${results.length === 1 ? 'o' : 'i'}`}
            </p>
            <ul className="border-b border-line">
              {results.map((r) => (
                <li key={r.url}>
                  <Link to={r.url} className="group grid gap-1 border-t border-line py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6">
                    <span className="text-xl font-normal group-hover:text-brand">{r.title}</span>
                    <span className="text-sm text-muted">
                      {r.kind === 'area' ? 'Area' : r.area ? `Sotto-area · ${r.area.title}` : 'Sotto-area · più aree'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <Reveal as="ul" data-stagger="" className="border-b border-line">
            {areas.map((a, i) => (
              <AreaIndexRow key={a.slug} area={a} index={i} />
            ))}
          </Reveal>
        )}
      </div>
    </>
  )
}

/* ---------- /servizi/:area ---------- */
export function AreaPage() {
  const { area: slug } = useParams()
  if (TRANSVERSAL.includes(slug)) return <TransversalPage slug={slug} />
  const area = areaBySlug[slug]
  if (!area) return <NotFound />
  const i = areas.indexOf(area)
  const prev = areas[(i - 1 + areas.length) % areas.length]
  const next = areas[(i + 1) % areas.length]
  const serviceTotal = area.services.reduce((n, s) => n + serviceItems(s).length, 0)

  return (
    <>
      <PageHero
        eyebrow={`Servizi · ${areaIndex(area)}`}
        title={area.title}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi', to: '/servizi' }, { label: area.title }]}
        aside={
          // Foto e richiesta di informazioni accanto al titolo solo su desktop:
          // su schermi stretti l'indice e l'elenco vengono prima.
          <div className="hidden space-y-8 lg:block">
            <FramedPhoto photo={areaPhotos[area.slug]} eager aspect="aspect-[4/3]" sizes="(min-width: 1440px) 480px, 30vw" />
            <CtaAside subject={area.title} />
          </div>
        }
      >
        <p className="mt-6 text-muted">
          {areaSummary(area)}
          {!area.items && ` · ${serviceTotal} ${serviceTotal === 1 ? 'servizio' : 'servizi'}`}
        </p>
        {/* Indice delle sotto-aree: mostra subito il contenuto della pagina e porta alla sotto-area nell'elenco */}
        {area.services.length > 0 && (
          <nav aria-label={`Sotto-aree della ${area.title}`} className="mt-8">
            <p className="eyebrow mb-3 text-muted">Sotto-aree</p>
            <ul className="flex flex-wrap gap-2">
              {area.services.map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    className="inline-flex min-h-10 items-center bg-mist/70 px-3.5 py-2 text-sm font-medium leading-snug text-ink transition-colors hover:bg-brand hover:text-white"
                  >
                    {services[s].title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </PageHero>

      <div className="wrap section pt-10 md:pt-14">
        {area.items ? (
          <section aria-labelledby="servizi" className="max-w-4xl">
            <h2 id="servizi" className="eyebrow mb-6 text-muted">
              Servizi
            </h2>
            <Prestazioni blocks={asItems(area.items)} />
          </section>
        ) : (
          <section aria-labelledby="sotto-aree">
            <h2 id="sotto-aree" className="eyebrow mb-2 text-muted">
              Sotto-aree e servizi
            </h2>
            <ul>
              {area.services.map((s) => (
                <Reveal as="li" id={s} key={s} className="grid scroll-mt-28 gap-6 border-b border-line py-10 md:py-12 lg:grid-cols-8 lg:gap-6">
                  <div className="lg:col-span-3">
                    <h3 className="text-h3 text-[1.375rem] md:text-[1.5rem]">
                      <Link to={serviceUrl(s)} className="group inline-flex items-start gap-3 hover:text-brand">
                        {services[s].title}
                        <Icon name="arrow" className="mt-1.5 size-5 shrink-0 text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    </h3>
                    <div className="mt-4 hidden lg:block">
                      <RowCta service={services[s].title} area={area.title} />
                    </div>
                  </div>
                  <div className="lg:col-span-4 lg:col-start-5">
                    <Prestazioni blocks={services[s].blocks} compact />
                    <div className="mt-5 lg:hidden">
                      <RowCta service={services[s].title} area={area.title} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* Su schermi stretti la richiesta di informazioni arriva dopo l'elenco */}
        <div className="mt-14 lg:hidden">
          <CtaAside subject={area.title} />
        </div>

        <nav aria-label="Altre aree" className="mt-20 grid grid-cols-2 border-y border-line md:mt-28">
          <Link to={areaUrl(prev)} className="group border-r border-line py-8 pr-4">
            <span className="eyebrow text-muted">Area precedente</span>
            <span className="mt-2 block text-lg font-medium group-hover:text-brand md:text-xl">← {prev.title}</span>
          </Link>
          <Link to={areaUrl(next)} className="group py-8 pl-4 text-right">
            <span className="eyebrow text-muted">Area successiva</span>
            <span className="mt-2 block text-lg font-medium group-hover:text-brand md:text-xl">{next.title} →</span>
          </Link>
        </nav>
      </div>
    </>
  )
}

/* ---------- /servizi/:area/:slug (sotto-area) ---------- */
export function ServicePage() {
  const { area: areaSlug, slug } = useParams()
  const area = areaBySlug[areaSlug]
  const svc = services[slug]
  if (!area || !svc || svc.area !== areaSlug) return <NotFound />
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Servizi', to: '/servizi' },
    { label: area.title, to: areaUrl(area) },
    { label: svc.title },
  ]

  return (
    <>
      <PageHero eyebrow={area.title} title={svc.title} crumbs={crumbs} />
      <div className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <section aria-labelledby="servizi" className="lg:col-span-5">
            <h2 id="servizi" className="eyebrow mb-6 text-muted">
              Servizi
            </h2>
            <Prestazioni blocks={svc.blocks} />
          </section>
          <div className="space-y-10 lg:col-span-2 lg:col-start-7">
            <FramedPhoto photo={areaPhotos[area.slug]} sizes="(min-width: 1024px) 24vw, 92vw" />
            <CtaAside subject={`${svc.title} – ${area.title}`} />
          </div>
        </div>
        <OtherSubareas area={area} current={slug} />
      </div>
    </>
  )
}

function OtherSubareas({ area, current }) {
  const others = area.services.filter((s) => s !== current)
  if (!others.length) return null
  return (
    <section aria-labelledby="altre" className="mt-20 md:mt-28">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="altre" className="eyebrow text-muted">
          Altre sotto-aree · {area.title}
        </h2>
        <Link to={areaUrl(area)} className="group inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark">
          <span className="link-draw pb-0.5">Vai all’area</span>
          <Icon name="arrow" className="size-[1.1em] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {others.map((s) => (
          <li key={s} className="border-b border-r border-line">
            <Link to={serviceUrl(s)} className="group flex h-full items-start justify-between gap-4 p-5 hover:bg-mist/60 md:p-6">
              <span className="font-medium leading-snug group-hover:text-brand">{services[s].title}</span>
              <Icon name="arrow" className="mt-0.5 size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---------- /servizi/<sotto-area presente in più aree> ---------- */
function TransversalPage({ slug }) {
  const svc = services[slug]
  const inAreas = areas.filter((a) => a.services.includes(slug))
  return (
    <>
      <PageHero
        eyebrow="Sotto-area presente in più aree"
        title={svc.title}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi', to: '/servizi' }, { label: svc.title }]}
      />
      <div className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 className="eyebrow mb-6 text-muted">Servizi</h2>
            <Prestazioni blocks={svc.blocks} />
            <h2 className="eyebrow mb-4 mt-16 text-muted">Aree in cui è presente</h2>
            <ul className="border-t border-line">
              {inAreas.map((a) => (
                <li key={a.slug}>
                  <Link to={areaUrl(a)} className="group flex items-center justify-between border-b border-line py-4">
                    <span className="flex items-baseline gap-4">
                      <span className="text-sm font-semibold text-brand tabular-nums">{areaIndex(a)}</span>
                      <span className="font-medium group-hover:text-brand">{a.title}</span>
                    </span>
                    <Icon name="arrow" className="size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 lg:col-start-7">
            <CtaAside subject={svc.title} />
          </div>
        </div>
      </div>
    </>
  )
}
