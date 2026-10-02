import { cookiePolicy, noteLegali, privacyPolicy } from '../content/legal.generated.js'
import { PageHero } from '../components/ui.jsx'

const DOCS = {
  privacy: { title: 'Privacy Policy', html: privacyPolicy },
  cookie: { title: 'Cookie Policy', html: cookiePolicy },
  note: { title: 'Note legali', html: noteLegali },
}

export default function Legal({ doc }) {
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
