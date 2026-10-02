import { useParams } from 'react-router-dom'
import { apriAgenzia, contactIntro, iban, sedi } from '../content/site.js'
import ContactForm from '../components/ContactForm.jsx'
import { Address, MapFacade, SedeRow } from '../components/Sede.jsx'
import SediMap from '../components/SediMap.jsx'
import { Icon, PageHero, Reveal } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'
import { photos } from '../content/images.js'

const HOME_CRUMB = { label: 'Home', to: '/' }

export function Sedi() {
  return (
    <>
      <PageHero
        eyebrow="Contatta le nostre Sedi"
        title="Le nostre Sedi"
        lead={contactIntro}
        media={<SediMap />}
        crumbs={[HOME_CRUMB, { label: 'Sedi' }]}
      />
      <section className="wrap section pt-8 md:pt-12">
        <Reveal as="ul" data-stagger="" className="border-b border-line">
          {sedi.map((s, i) => (
            <SedeRow key={s.slug} sede={s} index={i} />
          ))}
        </Reveal>
      </section>
    </>
  )
}

export function SedePage() {
  const { slug } = useParams()
  const sede = sedi.find((s) => s.slug === slug)
  if (!sede) return <NotFound />
  return (
    <>
      <PageHero
        eyebrow={sede.note ?? 'Sede'}
        title={sede.city}
        lead={contactIntro}
        crumbs={[HOME_CRUMB, { label: 'Sedi', to: '/sedi' }, { label: sede.city }]}
      />
      <section className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 className="text-h2 mb-10">Scrivici</h2>
            <ContactForm sede={sede.slug} origin={`sede-${sede.slug}`} />
          </div>
          <div className="space-y-10 lg:col-span-3">
            {sede.locations.map((l, i) => (
              <div key={l.city}>
                <h2 className="text-h3">{l.city}</h2>
                <Address location={l} className="mt-3 text-muted" />
                {sede.maps[i] && (
                  <div className="mt-6">
                    <MapFacade src={sede.maps[i]} title={`Mappa – ${l.address}, ${l.city}`} />
                  </div>
                )}
              </div>
            ))}
            <a
              href={sede.login}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-between border-y border-line py-5 font-semibold hover:text-brand"
            >
              <span className="flex items-center gap-3">
                <Icon name="login" className="size-5 text-brand" />
                Login area clienti
              </span>
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export function Contatti() {
  return (
    <>
      <PageHero eyebrow="Contatti" title="Contattaci" lead={contactIntro} crumbs={[HOME_CRUMB, { label: 'Contatti' }]} />
      <section className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <div className="lg:col-span-5">
            <ContactForm origin="contatti" />
          </div>
          <div className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow mb-6 text-muted">Le nostre Sedi</h2>
            <ul className="space-y-6 border-t border-line pt-6">
              {sedi.flatMap((s) =>
                s.locations.map((l) => (
                  <li key={l.city}>
                    <p className="font-semibold">{l.city}</p>
                    <Address location={l} className="mt-1 text-sm text-muted" />
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export function ApriAgenzia() {
  return (
    <>
      <PageHero
        eyebrow="Apri la tua Agenzia"
        title={apriAgenzia.title}
        lead={apriAgenzia.text}
        image={photos.newOffice}
        crumbs={[HOME_CRUMB, { label: 'Apri la tua Agenzia' }]}
      />
      <section className="wrap section pt-12 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-8 lg:gap-6">
          <h2 className="text-h2 lg:col-span-2">Scrivici</h2>
          <div className="lg:col-span-5 lg:col-start-4">
            <ContactForm origin="apri-la-tua-agenzia" defaultSubject="Apri la tua Agenzia" />
          </div>
        </div>
      </section>
    </>
  )
}

export function Pagamenti() {
  const rows = [
    ['Iban', iban.iban],
    ['Intestatario', iban.holder],
    ['Causale', iban.reason],
  ]
  return (
    <>
      <PageHero eyebrow="Pagamenti" title="Coordinate bancarie" crumbs={[HOME_CRUMB, { label: 'Pagamenti' }]} />
      <section className="wrap section pt-12">
        <dl className="max-w-3xl border-t border-ink">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-line py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="eyebrow pt-1 text-muted">{k}</dt>
              <dd className={k === 'Iban' ? 'font-mono text-lg tracking-wide break-all md:text-xl' : 'text-lg'}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
