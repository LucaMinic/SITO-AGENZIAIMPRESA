import { Link } from 'react-router-dom'
import { about, solutions } from '../content/site.js'
import { ArrowLink, Button, Icon, PageHero, Reveal } from '../components/ui.jsx'
import { photos } from '../content/images.js'

const HOME_CRUMB = { label: 'Home', to: '/' }

export function ChiSiamo() {
  return (
    <>
      <PageHero eyebrow="Chi siamo" title={about.storyTitle} image={photos.corridor} crumbs={[HOME_CRUMB, { label: 'Chi siamo' }]} />

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
          <div className="mt-12 grid border-t border-ink md:grid-cols-2">
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
          </div>
        </div>
      </section>

    </>
  )
}

export function Soluzioni({ kind }) {
  const s = solutions[kind]
  const other = Object.values(solutions).find((x) => x.slug !== kind)
  return (
    <>
      <PageHero
        eyebrow="AgenziaImpresa Buffetti Group"
        title={s.title}
        image={kind === 'imprese' ? photos.meeting : photos.desk}
        crumbs={[HOME_CRUMB, { label: 'Soluzioni' }, { label: s.label }]}
      />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-8 lg:gap-6">
          <p className="text-lead lg:col-span-5">{s.text}</p>
        </div>
        <ol className="wrap mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-6">
          {s.principles.map((p, i) => (
            <Reveal as="li" key={p.title} className="border-t border-ink pt-8">
              <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-h2 mt-4">{p.title}</h2>
              <p className="mt-4 text-muted">{p.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="wrap mt-20 flex flex-wrap items-center gap-x-10 gap-y-6">
          <Button to="/servizi">Prodotti e Servizi</Button>
          <ArrowLink to={`/soluzioni/${other.slug}`}>{other.title}</ArrowLink>
        </div>
      </section>
    </>
  )
}
