import { Link } from 'react-router-dom'
import { about, process, solutions, territory } from '../content/site.js'
import { areaBySlug, areaUrl, services, serviceUrl } from '../content/services.js'
import { ArrowLink, Button, Eyebrow, Icon, PageHero, Reveal } from '../components/ui.jsx'
import { photos } from '../content/images.js'

const HOME_CRUMB = { label: 'Home', to: '/' }

export function ChiSiamo() {
  return (
    <>
      <PageHero eyebrow="Chi siamo" title={about.storyTitle} image={photos.glassOffice} crumbs={[HOME_CRUMB, { label: 'Chi siamo' }]} />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-8 lg:gap-6">
          <Reveal className="lg:col-span-3">
            <blockquote className="border-l-2 border-brand pl-6">
              <p className="text-h3 font-normal leading-snug">“{about.quote}”</p>
            </blockquote>
          </Reveal>
          <Reveal className="space-y-6 text-lg lg:col-span-4 lg:col-start-5">
            {about.story.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-lead' : 'text-muted'}>
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="soluzioni">
        <div className="wrap">
          <h2 id="soluzioni" className="text-h2 max-w-[22ch]">
            {about.solutionsTitle}
          </h2>
          <Reveal className="draw-line mt-12 grid border-t border-ink [--line-color:var(--color-ink)] md:grid-cols-2">
            {Object.values(solutions).map((s, i) => (
              <Link
                key={s.slug}
                to={`/soluzioni/${s.slug}`}
                className={`group py-10 ${i === 0 ? 'border-b border-line md:border-b-0 md:border-r md:pr-10' : 'md:pl-10'}`}
              >
                <h3 className="text-h2 group-hover:text-brand">{s.label}</h3>
                <p className="mt-4 max-w-[40ch] text-muted">{s.teaser}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-brand">
                  {s.title} <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

    </>
  )
}

const needLinks = (slugs) =>
  slugs.map((slug) =>
    areaBySlug[slug]
      ? { to: areaUrl(areaBySlug[slug]), label: areaBySlug[slug].title }
      : { to: serviceUrl(slug), label: slug === 'diritto-durgenza' ? services[slug].title : 'Assistenza normativa e procedurale' },
  )

export function Soluzioni({ kind }) {
  const s = solutions[kind]
  const other = Object.values(solutions).find((x) => x.slug !== kind)
  const requestHref = `/contatti?oggetto=${encodeURIComponent(s.title)}`
  return (
    <>
      <PageHero
        eyebrow="AgenziaImpresa Buffetti Group"
        title={s.title}
        lead={s.intro}
        image={kind === 'imprese' ? photos.brightOffice : photos.laptop}
        crumbs={[HOME_CRUMB, { label: 'Soluzioni' }, { label: s.label }]}
      />

      {/* A chi ci rivolgiamo + principi */}
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-8 lg:gap-6">
          <Reveal className="lg:col-span-3">
            <Eyebrow className="mb-6 text-brand">A chi ci rivolgiamo</Eyebrow>
            <ul data-stagger="" className="border-t border-line">
              {s.audience.map((a, i) => (
                <li key={a} style={{ '--i': i }} className="flex items-baseline gap-4 border-b border-line py-4">
                  <span aria-hidden="true" className="size-2 shrink-0 bg-brand [clip-path:polygon(0_0,100%_0,0_100%)]" />
                  <span className="text-lg">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-5">
            <p className="text-lead">{s.text}</p>
          </Reveal>
        </div>
        <Reveal as="ol" data-stagger="" className="wrap mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6">
          {s.principles.map((p, i) => (
            <li key={p.title} style={{ '--i': i }} className="border-t border-ink pt-8">
              <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-h2 mt-4">{p.title}</h2>
              <p className="mt-4 text-muted">{p.text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Ambiti di intervento */}
      <section className="section bg-mist/50" aria-labelledby="ambiti">
        <div className="wrap">
          <Reveal className="grid gap-8 lg:grid-cols-8 lg:gap-6">
            <div className="lg:col-span-5">
              <Eyebrow className="mb-6 text-brand">Ambiti di intervento</Eyebrow>
              <h2 id="ambiti" className="text-h1 text-balance">
                {s.needsTitle}
              </h2>
            </div>
          </Reveal>
          <Reveal as="ol" data-stagger="" className="mt-14 border-b border-line md:mt-20">
            {s.needs.map((n, i) => (
              <li key={n.title} style={{ '--i': i }} className="grid gap-5 border-t border-line py-10 lg:grid-cols-8 lg:gap-6 lg:py-12">
                <div className="flex gap-5 lg:col-span-3">
                  <span className="shrink-0 whitespace-nowrap pt-1.5 text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-h2">{n.title}</h3>
                </div>
                <p className="text-muted lg:col-span-3">{n.text}</p>
                <ul className="flex flex-wrap content-start gap-2 lg:col-span-2 lg:justify-end">
                  {needLinks(n.areas).map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="group inline-flex min-h-10 items-center gap-2 bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-inset ring-line transition-colors hover:bg-brand hover:text-white hover:ring-brand"
                      >
                        {l.label}
                        <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="section" aria-labelledby="metodo">
        <div className="wrap">
          <Reveal>
            <Eyebrow className="mb-6 text-brand">Come lavoriamo</Eyebrow>
            <h2 id="metodo" className="text-h1">
              Dalla richiesta all’esito
            </h2>
          </Reveal>
          <Reveal as="ol" data-stagger="" className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-6">
            {process.map((p, i) => (
              <li key={p.title} style={{ '--i': i }} className="border-t-2 border-brand pt-6">
                <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-h3 mt-3">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted">{p.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Territorio e richiesta */}
      <section className="section pt-0">
        <Reveal className="wrap">
          <div className="grid gap-10 border-t border-ink pt-12 lg:grid-cols-8 lg:items-end lg:gap-6">
            <div className="lg:col-span-5">
              <h2 className="text-h2">{territory.title}</h2>
              <p className="mt-4 max-w-[60ch] text-muted">{territory.text}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
              <Button to={requestHref}>Richiedi informazioni</Button>
              <Button to="/sedi" variant="secondary" icon={null}>
                Le nostre Sedi
              </Button>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <ArrowLink to="/servizi">Prodotti e Servizi</ArrowLink>
            <ArrowLink to={`/soluzioni/${other.slug}`}>{other.title}</ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
