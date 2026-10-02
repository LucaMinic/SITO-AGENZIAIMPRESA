import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { about, allLocations, apriAgenzia, home, sedi, solutions, telHref } from '../content/site.js'
import { areasByFamily, areaIndex, areaUrl, serviceCount, services } from '../content/services.js'
import { photos } from '../content/images.js'
import { ArrowLink, Button, Eyebrow, FramedPhoto, Icon, Photo, Reveal } from '../components/ui.jsx'

// Slide dell'hero: i titoli sono contenuti già presenti nel sito.
const SLIDES = [
  {
    photo: photos.skyline,
    eyebrow: 'AgenziaImpresa · Buffetti Group',
    label: 'AgenziaImpresa',
    title: home.claim,
    long: true,
    ctas: [
      { to: '/servizi', label: 'Scopri i servizi' },
      { to: '/contatti', label: 'Contattaci' },
    ],
  },
  {
    photo: photos.officeView,
    eyebrow: 'Soluzioni',
    label: 'Soluzioni',
    title: about.solutionsTitle,
    ctas: [
      { to: '/soluzioni/imprese', label: solutions.imprese.title },
      { to: '/soluzioni/professionisti', label: solutions.professionisti.title },
    ],
  },
  {
    photo: photos.teamwork,
    eyebrow: 'Apri la tua Agenzia',
    label: 'Apri la tua Agenzia',
    title: apriAgenzia.title,
    ctas: [{ to: '/apri-la-tua-agenzia', label: 'Apri la tua Agenzia' }],
  },
]
const SLIDE_MS = 7000

function Hero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const running = !paused && !userPaused && !reduced
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [running, index])

  const go = (i) => setIndex((i + SLIDES.length) % SLIDES.length)
  const slide = SLIDES[index]
  const Title = index === 0 ? 'h1' : 'h2'

  return (
    <section
      aria-roledescription="carosello"
      aria-label="In evidenza"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="on-dark relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-brand-dark text-white"
    >
      {/* Fotografie in dissolvenza con lento zoom (Ken Burns) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <div
            key={s.photo.id}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className={`h-full w-full ${i === index && !reduced ? 'hero-kenburns' : ''}`}>
              <Photo photo={s.photo} eager={i === 0} sizes="100vw" />
            </div>
          </div>
        ))}
        {/* Velatura nei colori del brand per leggibilità e coerenza cromatica */}
        <div className="absolute inset-0 bg-brand-dark/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00103f]/90 via-[#00103f]/55 to-transparent" />
        {/* Su schermi stretti il testo occupa tutta la larghezza: velatura uniforme più scura (contrasto ≥ 4.5:1) */}
        <div className="absolute inset-0 bg-[#00103f]/45 xl:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#00103f]/80 to-transparent" />
        {/* Taglio diagonale a 45° in Main Blu (layout system guideline) */}
        <div className="absolute -bottom-px right-0 hidden h-[38%] w-[30%] bg-brand/90 [clip-path:polygon(100%_0,100%_100%,0_100%)] md:block" />
      </div>

      <div className="wrap relative flex flex-1 flex-col justify-center pb-10 pt-32 md:pt-40">
        {/* Il titolo principale della pagina resta sempre presente per le tecnologie assistive. */}
        {index !== 0 && <h1 className="sr-only">{home.claim}</h1>}
        <div key={index} className="hero-in max-w-[62rem]">
          <Eyebrow className="mb-8 text-white">{slide.eyebrow}</Eyebrow>
          <Title className={`${slide.long ? 'text-h1 md:text-display max-w-[19ch]' : 'text-display max-w-[16ch]'} text-balance`}>
            {slide.title}
          </Title>
          <div className="mt-12 flex flex-wrap gap-3">
            {slide.ctas.map((c, i) => (
              <Button key={c.to} to={c.to} variant={i === 0 ? 'light' : 'ghostLight'} icon={i === 0 ? 'arrow' : null}>
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Controlli: avanzamento per slide, frecce, pausa */}
      <div className="wrap relative pb-8 md:pb-10">
        <div className="flex items-end gap-6">
          <ol className="grid flex-1 grid-cols-3 gap-3 md:max-w-xl md:gap-4">
            {SLIDES.map((s, i) => (
              <li key={s.photo.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Vai alla slide ${i + 1}: ${s.label}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group block w-full py-3 text-left"
                >
                  <span className="flex items-baseline gap-2 text-xs font-semibold tabular-nums text-white/60 group-hover:text-white">
                    <span className={i === index ? 'text-white' : ''}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="hidden truncate font-medium md:inline">{s.label}</span>
                  </span>
                  <span className="mt-2.5 block h-0.5 w-full overflow-hidden bg-white/25">
                    <span
                      key={`${index}-${i}`}
                      className={`block h-full origin-left bg-white ${
                        i < index ? 'scale-x-100' : i === index ? (running ? 'hero-progress' : 'scale-x-100') : 'scale-x-0'
                      }`}
                      style={{ '--slide-ms': `${SLIDE_MS}ms` }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" onClick={() => go(index - 1)} aria-label="Slide precedente" className="flex size-11 items-center justify-center hover:bg-white/10">
              <Icon name="arrow" className="size-5 rotate-180" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Slide successiva" className="flex size-11 items-center justify-center hover:bg-white/10">
              <Icon name="arrow" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused(!userPaused)}
              aria-label={userPaused ? 'Riprendi la rotazione' : 'Metti in pausa la rotazione'}
              aria-pressed={userPaused}
              className="hidden size-11 items-center justify-center hover:bg-white/10 sm:flex"
            >
              <Icon name={userPaused ? 'play' : 'pause'} className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-8 lg:items-center lg:gap-6">
        <Reveal className="lg:col-span-3">
          <FramedPhoto photo={photos.executiveOffice} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 36vw, 92vw" />
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-5">
          <Eyebrow className="mb-8 text-brand">Chi siamo</Eyebrow>
          <blockquote>
            <p className="text-h2 font-light text-balance">
              <span aria-hidden="true" className="mr-1 text-brand">“</span>
              {about.quote}
              <span aria-hidden="true" className="text-brand">”</span>
            </p>
          </blockquote>
          <p className="mt-10 text-muted">{about.story[0]}</p>
          <ArrowLink to="/chi-siamo" className="mt-8">
            Chi siamo
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}

/* Indice delle aree: righe numerate al posto dei box. */
export function AreaIndexRow({ area, index = 0 }) {
  const preview = area.services.slice(0, 3).map((s) => services[s].title)
  const more = area.services.length - preview.length
  return (
    <li style={{ '--i': index }}>
      <Link
        to={areaUrl(area)}
        className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-t border-line py-6 transition-colors md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_auto] md:py-7"
      >
        <span
          aria-hidden="true"
          className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-x-100"
        />
        <span className="text-sm font-semibold text-brand tabular-nums">{areaIndex(area)}</span>
        <span className="text-[1.375rem] font-normal leading-tight tracking-[-0.015em] transition-colors group-hover:text-brand md:text-[1.625rem]">
          {area.title}
        </span>
        <span className="col-start-2 row-start-2 text-sm leading-snug text-muted md:col-start-3 md:row-start-1">
          {preview.join(' · ')}
          {more > 0 && ` · +${more}`}
        </span>
        <span className="col-start-3 row-start-1 flex items-center gap-3 md:col-start-4">
          <span className="hidden text-sm text-muted tabular-nums sm:inline">
            {serviceCount(area)} {serviceCount(area) === 1 ? 'servizio' : 'servizi'}
          </span>
          <Icon name="arrow" className="size-5 text-ink transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand" />
        </span>
      </Link>
    </li>
  )
}

// Colore leggero in trasparenza per ciascuna famiglia di aree (palette Buffetti Group).
const FAMILY_TINTS = {
  impresa: { bg: '#0007e012', bar: '#0007e0' },
  fisco: { bg: '#00268514', bar: '#002685' },
  autorizzazioni: { bg: '#00b7e617', bar: '#00b7e6' },
  certificati: { bg: '#bb78ff17', bar: '#bb78ff' },
}

function Areas() {
  return (
    <section className="section bg-mist/50" aria-labelledby="aree">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6 text-brand">Servizi</Eyebrow>
            <h2 id="aree" className="text-h1 text-balance">
              Aree di servizio
            </h2>
          </div>
          <div className="flex items-end lg:col-span-3 lg:justify-end">
            <Button to="/servizi" variant="secondary">
              Tutti i servizi
            </Button>
          </div>
        </Reveal>
        <div className="mt-16 space-y-14 md:mt-20">
          {areasByFamily.map((f) => (
            <Reveal key={f.id} className="grid gap-4 lg:grid-cols-8 lg:gap-6">
              <div
                className="relative overflow-hidden px-5 py-4 lg:col-span-2 lg:mr-4 lg:px-6 lg:py-7"
                style={{ background: FAMILY_TINTS[f.id].bg }}
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px]" style={{ background: FAMILY_TINTS[f.id].bar }} />
                <h3 className="eyebrow text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">
                  {f.areas.length} {f.areas.length === 1 ? 'area' : 'aree'}
                </p>
              </div>
              <ul data-stagger="" className="border-b border-line lg:col-span-6">
                {f.areas.map((a, i) => (
                  <AreaIndexRow key={a.slug} area={a} index={i} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Solutions() {
  const s = Object.values(solutions)
  return (
    <section className="section" aria-labelledby="soluzioni">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-2">
            <Eyebrow className="text-brand">Soluzioni</Eyebrow>
          </div>
          <h2 id="soluzioni" className="text-h1 text-balance lg:col-span-6">
            {about.solutionsTitle}
          </h2>
        </Reveal>
        <Reveal className="draw-line mt-14 grid border-t border-ink [--line-color:var(--color-ink)] md:mt-20 md:grid-cols-2 lg:ml-[25%]">
          {s.map((x, i) => (
            <Reveal
              key={x.slug}
              className={`py-10 md:py-12 ${i === 0 ? 'border-b border-line md:border-b-0 md:border-r md:pr-10' : 'md:pl-10'}`}
            >
              <h3 className="text-h2">{x.label}</h3>
              <p className="mt-4 max-w-[40ch] text-muted">{x.teaser}</p>
              <ArrowLink to={`/soluzioni/${x.slug}`} className="mt-8">
                {x.title}
              </ArrowLink>
            </Reveal>
          ))}
        </Reveal>
        <Reveal as="ol" data-stagger="" className="draw-line mt-4 grid gap-10 border-t border-line pt-12 [--line-color:var(--color-line)] md:grid-cols-3 md:gap-8 lg:ml-[25%]">
          {s[0].principles.map((p, i) => (
            <li key={p.title} style={{ '--i': i }}>
              <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-h3 mt-3">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-muted">{p.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Locations() {
  return (
    <section className="section" aria-labelledby="sedi">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-6 text-brand">Presenza territoriale</Eyebrow>
            <h2 id="sedi" className="text-h1">
              Le nostre Sedi
            </h2>
          </div>
          <div className="flex items-end lg:col-span-3 lg:justify-end">
            <Button to="/sedi" variant="secondary">
              Contatta le nostre Sedi
            </Button>
          </div>
        </Reveal>
        <Reveal className="mt-14 md:mt-20">
          <FramedPhoto photo={photos.portaNuova} aspect="aspect-[16/9] md:aspect-[21/7]" sizes="(min-width: 1440px) 1280px, 92vw" />
        </Reveal>
        <Reveal as="ul" data-stagger="" className="mt-6 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {sedi.flatMap((s) =>
            s.locations.map((l) => (
              <li
                key={l.city}
                style={{ '--i': allLocations.findIndex((x) => x.city === l.city) }}
                className="group relative border-b border-r border-line p-6 transition-colors hover:bg-mist/50 md:p-8"
              >
                <h3 className="text-h2">
                  <Link to={`/sedi/${s.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">
                    {l.city}
                  </Link>
                </h3>
                {s.note && <p className="eyebrow mt-2 text-muted">{s.note}</p>}
                <p className="mt-6 text-[0.9375rem] text-muted">
                  {l.address}
                  <br />
                  {l.cap} {l.city}
                </p>
                <a
                  href={telHref(l.phone)}
                  className="relative z-10 mt-4 inline-flex min-h-11 items-center gap-2 font-semibold hover:text-brand"
                >
                  <Icon name="phone" className="size-4 text-brand" />
                  {l.phone}
                </a>
              </li>
            )),
          )}
        </Reveal>
      </div>
    </section>
  )
}

export function OpenAgencyBand() {
  return (
    <section aria-labelledby="apri" className="section pt-0">
      <div className="wrap">
        <Reveal className="grid overflow-hidden lg:grid-cols-8">
          <div className="bg-mist/70 p-8 md:p-14 lg:col-span-5">
            <Eyebrow className="mb-6 text-brand">Apri la tua Agenzia</Eyebrow>
            <h2 id="apri" className="text-h1">
              {apriAgenzia.title}
            </h2>
            <p className="mt-8 max-w-[58ch] text-muted">{apriAgenzia.text}</p>
          </div>
          <div className="on-dark relative isolate flex min-h-72 items-end overflow-hidden bg-brand p-8 text-white md:p-14 lg:col-span-3 lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:pl-24">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <Photo photo={photos.boardroom} sizes="(min-width: 1024px) 36vw, 92vw" />
              <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
            </div>
            <Button to="/apri-la-tua-agenzia" variant="light" className="relative">
              Apri la tua Agenzia
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Areas />
      <Solutions />
      <Locations />
      <OpenAgencyBand />
    </>
  )
}
