import { Link } from 'react-router-dom'
import { cookiePolicy, privacyPolicy } from '../content/legal.generated.js'
import { company, sedi, telHref } from '../content/site.js'
import { PageHero } from '../components/ui.jsx'

const DOCS = {
  privacy: { title: 'Privacy Policy', html: privacyPolicy },
  cookie: { title: 'Cookie Policy', html: cookiePolicy },
}

export default function Legal({ doc }) {
  if (doc === 'note') return <NoteLegali />
  const d = DOCS[doc]
  return (
    <>
      <PageHero eyebrow="Informazioni legali" title={d.title} crumbs={[{ label: 'Home', to: '/' }, { label: d.title }]} />
      <section className="wrap section pt-12 md:pt-16">
        {/* Testo legale originale, sanificato in fase di estrazione. */}
        <div
          className="prose-ai text-[1.0625rem]"
          dangerouslySetInnerHTML={{ __html: d.html.replaceAll('href="/', `href="${import.meta.env.BASE_URL}`) }}
        />
      </section>
    </>
  )
}

/* Dati societari di AGENZIAIMPRESA SRL (indirizzo storico /note-legali). */
function NoteLegali() {
  const rows = [
    ['Ragione sociale', company.legalName],
    ['Codice fiscale e Partita IVA', company.vat],
    ['Capitale sociale', company.capital],
    ['Sede legale', company.legalSeat],
    [
      'PEC',
      <a key="pec" href={`mailto:${company.pec}`} className="underline underline-offset-2 hover:text-brand">
        {company.pec}
      </a>,
    ],
    ['Direzione e coordinamento', company.group.replace('Società soggetta a direzione e coordinamento di ', '')],
  ]
  return (
    <>
      <PageHero
        eyebrow="Informazioni legali"
        title="Dati societari"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Dati societari' }]}
      />
      <section className="wrap section pt-12 md:pt-16">
        <div className="grid gap-16 lg:grid-cols-8 lg:gap-6">
          <dl className="border-t border-ink lg:col-span-5">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1 text-muted">{k}</dt>
                <dd className="text-lg">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow mb-4 text-muted">Sedi operative</h2>
            <ul className="space-y-4 border-t border-line pt-4 text-[0.9375rem]">
              {sedi.flatMap((s) =>
                s.locations.map((l) => (
                  <li key={l.city}>
                    <Link to={`/sedi/${s.slug}`} className="font-semibold hover:text-brand">
                      {l.city}
                    </Link>
                    <span className="block text-muted">
                      {l.address}, {l.cap} {l.city}
                    </span>
                    <a href={telHref(l.phone)} className="inline-flex min-h-6 items-center text-muted hover:text-brand">
                      tel. {l.phone}
                    </a>
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
