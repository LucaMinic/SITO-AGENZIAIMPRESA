import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  approfondimenti,
  areaBySlug,
  areaIndex,
  areas,
  areasByFamily,
  areaUrl,
  searchIndex,
  serviceCount,
  services,
  serviceUrl,
  totalServices,
  TRANSVERSAL,
} from '../content/services.js'
import { families, home, serviceCta } from '../content/site.js'
import { areaPhotos } from '../content/images.js'
import { ArrowLink, Blocks, Button, FramedPhoto, Icon, PageHero, Reveal } from '../components/ui.jsx'
import { AreaIndexRow } from './Home.jsx'
import NotFound from './NotFound.jsx'

const familyTitle = (id) => families.find((f) => f.id === id)?.title
// Prima frase completa del testo (anteprima senza troncamenti).
const firstSentence = (t) => (t.match(/^.*?[.!?](?=\s|$)/) ?? [t])[0]
const contactHref = (subject) => `/contatti?oggetto=${encodeURIComponent(subject)}`

/* Elenco prestazioni di un servizio: righe numerate o testo singolo. */
function Prestazioni({ blocks, compact = false }) {
  const items = blocks.filter((b) => b.type === 'item' || b.type === 'li')
  const text = blocks.filter((b) => b.type === 'p')
  return (
    <>
      {text.map((b, i) => (
        <p key={i} className={compact ? 'text-[0.9375rem] text-muted' : 'text-lead'}>
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

function TransversalNote({ slugs }) {
  if (!slugs.length) return null
  return (
    <div className="grid gap-px bg-line sm:grid-cols-2">
      {slugs.map((s) => (
        <Link key={s} to={serviceUrl(s)} className="group bg-white p-6 transition-colors hover:bg-mist/60">
          <p className="eyebrow text-muted">Disponibile anche</p>
          <p className="mt-3 font-semibold leading-snug group-hover:text-brand">{services[s].title}</p>
          <p className="mt-2 text-sm text-muted">{services[s].blocks.map((b) => b.text).join(' ')}</p>
        </Link>
      ))}
    </div>
  )
}

function SchedeList({ slugs, title = 'Schede informative' }) {
  if (!slugs.length) return null
  return (
    <section aria-labelledby="schede" className="mt-20 md:mt-28">
      <h2 id="schede" className="eyebrow mb-6 text-muted">
        {title}
      </h2>
      <ul className="grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
        {slugs.map((s) => (
          <li key={s} className="bg-white">
            <Link to={serviceUrl(s)} className="group flex h-full flex-col p-6 transition-colors hover:bg-mist/60 md:p-8">
              <span className="text-h3 group-hover:text-brand">{approfondimenti[s].title}</span>
              <span className="mt-3 text-[0.9375rem] text-muted">{firstSentence(approfondimenti[s].blocks[0].text)}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                Leggi la scheda <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
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

  return (
    <>
      <PageHero
        eyebrow="Servizi"
        title="I nostri Servizi"
        lead={home.claim}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi' }]}
        aside={
          <dl className="grid grid-cols-2 border-t border-ink lg:mt-6">
            <div className="border-r border-line py-5 pr-4">
              <dd className="text-4xl font-light tabular-nums">{areas.length}</dd>
              <dt className="mt-1 text-sm text-muted">Aree</dt>
            </div>
            <div className="py-5 pl-5">
              <dd className="text-4xl font-light tabular-nums">{totalServices}</dd>
              <dt className="mt-1 text-sm text-muted">Servizi</dt>
            </div>
          </dl>
        }
      />
      <div className="wrap section pt-12 md:pt-16">
        <div role="search" className="relative mb-16 max-w-2xl md:mb-20">
          <label htmlFor="cerca" className="eyebrow mb-3 block text-muted">
            Cerca un servizio o una prestazione
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
                <li key={r.slug}>
                  <Link
                    to={serviceUrl(r.slug)}
                    className="group grid gap-1 border-t border-line py-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-6"
                  >
                    <span className="text-xl font-normal group-hover:text-brand">{r.title}</span>
                    <span className="text-sm text-muted">
                      {r.kind === 'scheda' ? 'Scheda informativa · ' : ''}
                      {r.area ? r.area.title : 'Tutte le aree'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="space-y-16 md:space-y-20">
            {areasByFamily.map((f) => (
              <Reveal key={f.id} as="section" aria-labelledby={`fam-${f.id}`} className="grid gap-4 lg:grid-cols-8 lg:gap-6">
                <h2 id={`fam-${f.id}`} className="eyebrow pt-7 text-muted lg:col-span-2">
                  {f.title}
                </h2>
                <ul data-stagger="" className="border-b border-line lg:col-span-6">
                  {f.areas.map((a, i) => (
                    <AreaIndexRow key={a.slug} area={a} index={i} />
                  ))}
                </ul>
              </Reveal>
            ))}
            <section aria-labelledby="trasversali" className="grid gap-4 lg:grid-cols-8 lg:gap-6">
              <h2 id="trasversali" className="eyebrow pt-2 text-muted lg:col-span-2">
                In tutte le aree
              </h2>
              <div className="lg:col-span-6">
                <TransversalNote slugs={TRANSVERSAL} />
              </div>
            </section>
          </div>
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

  return (
    <>
      <PageHero
        eyebrow={`${areaIndex(area)} · ${familyTitle(area.family)}`}
        title={area.title}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi', to: '/servizi' }, { label: area.title }]}
        aside={
          // Foto e richiesta di informazioni accanto al titolo solo su desktop:
          // su schermi stretti l'indice e l'elenco dei servizi vengono prima.
          <div className="hidden space-y-8 lg:block">
            <FramedPhoto photo={areaPhotos[area.slug]} eager aspect="aspect-[4/3]" sizes="(min-width: 1440px) 480px, 30vw" />
            <CtaAside subject={area.title} />
          </div>
        }
      >
        <p className="mt-6 text-muted">
          {serviceCount(area)} {serviceCount(area) === 1 ? 'servizio' : 'servizi'}
          {area.approfondimenti.length > 0 && ` · ${area.approfondimenti.length} schede informative`}
        </p>
        {/* Indice dei servizi: mostra subito il contenuto della pagina e porta al servizio nell'elenco */}
        <nav aria-label={`Servizi dell'area ${area.title}`} className="mt-8">
          <p className="eyebrow mb-3 text-muted">In quest’area</p>
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
            {area.approfondimenti.length > 0 && (
              <li>
                <a
                  href="#schede"
                  className="inline-flex min-h-10 items-center px-3.5 py-2 text-sm font-semibold text-brand ring-1 ring-inset ring-brand/30 transition-colors hover:bg-brand hover:text-white"
                >
                  Schede informative
                </a>
              </li>
            )}
          </ul>
        </nav>
      </PageHero>

      <div className="wrap section pt-10 md:pt-14">
        <h2 className="eyebrow mb-2 text-muted">Servizi e prestazioni</h2>
        <ul>
          {area.services.map((s) => (
            <Reveal as="li" id={s} key={s} className="grid scroll-mt-28 gap-6 border-b border-line py-10 md:py-12 lg:grid-cols-8 lg:gap-6">
              <div className="lg:col-span-3">
                <h2 className="text-h3 text-[1.375rem] md:text-[1.5rem]">
                  <Link to={serviceUrl(s)} className="group inline-flex items-start gap-3 hover:text-brand">
                    {services[s].title}
                    <Icon name="arrow" className="mt-1.5 size-5 shrink-0 text-brand opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-5">
                <Prestazioni blocks={services[s].blocks} compact />
              </div>
            </Reveal>
          ))}
        </ul>

        {area.transversal.length > 0 && (
          <div className="mt-12">
            <TransversalNote slugs={area.transversal} />
          </div>
        )}

        {/* Su schermi stretti la richiesta di informazioni arriva dopo l'elenco */}
        <div className="mt-14 lg:hidden">
          <CtaAside subject={area.title} />
        </div>

        <SchedeList slugs={area.approfondimenti} />

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

/* ---------- /servizi/:area/:slug ---------- */
export function ServicePage() {
  const { area: areaSlug, slug } = useParams()
  const area = areaBySlug[areaSlug]
  const svc = services[slug]
  const scheda = approfondimenti[slug]
  if (!area || (!(svc && svc.area === areaSlug) && !(scheda && scheda.area === areaSlug))) return <NotFound />
  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Servizi', to: '/servizi' },
    { label: area.title, to: areaUrl(area) },
    { label: (svc ?? scheda).title },
  ]

  if (scheda) {
    return (
      <>
        <PageHero eyebrow={`Scheda informativa · ${area.title}`} title={scheda.title} crumbs={crumbs} />
        <div className="wrap section pt-12 md:pt-16">
          <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
            <Blocks blocks={scheda.blocks} className="text-[1.0625rem] md:text-lg lg:col-span-5" />
            <div className="space-y-10 lg:col-span-2 lg:col-start-7">
              <FramedPhoto photo={areaPhotos[area.slug]} sizes="(min-width: 1024px) 24vw, 92vw" />
              <CtaAside subject={scheda.title} />
            </div>
          </div>
          <OtherServices area={area} />
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero eyebrow={area.title} title={svc.title} crumbs={crumbs} />
      <div className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <section aria-labelledby="prestazioni" className="lg:col-span-5">
            <h2 id="prestazioni" className="eyebrow mb-6 text-muted">
              Prestazioni
            </h2>
            <Prestazioni blocks={svc.blocks} />
            {area.transversal.length > 0 && (
              <div className="mt-12">
                <TransversalNote slugs={area.transversal} />
              </div>
            )}
          </section>
          <div className="space-y-10 lg:col-span-2 lg:col-start-7">
            <FramedPhoto photo={areaPhotos[area.slug]} sizes="(min-width: 1024px) 24vw, 92vw" />
            <CtaAside subject={`${svc.title} – ${area.title}`} />
          </div>
        </div>
        <SchedeList slugs={area.approfondimenti} title={`Schede informative · ${area.title}`} />
        <OtherServices area={area} current={slug} />
      </div>
    </>
  )
}

function OtherServices({ area, current }) {
  const others = area.services.filter((s) => s !== current)
  if (!others.length) return null
  return (
    <section aria-labelledby="altri" className="mt-20 md:mt-28">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="altri" className="eyebrow text-muted">
          Altri servizi · {area.title}
        </h2>
        <ArrowLink to={areaUrl(area)} className="text-sm">
          Vai all’area
        </ArrowLink>
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

function TransversalPage({ slug }) {
  const svc = services[slug]
  const inAreas = areas.filter((a) => a.transversal.includes(slug))
  return (
    <>
      <PageHero
        eyebrow="Servizio disponibile in più aree"
        title={svc.title}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Servizi', to: '/servizi' }, { label: svc.title }]}
      />
      <div className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-5">
            <Prestazioni blocks={svc.blocks} />
            <h2 className="eyebrow mb-4 mt-16 text-muted">Aree in cui è disponibile</h2>
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
