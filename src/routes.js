// Elenco delle pagine e relativi meta: usato dal pre-rendering (title, description,
// canonical, sitemap) e dal client per aggiornare il titolo durante la navigazione.
import { areas, services, approfondimenti, areaBySlug, serviceUrl, TRANSVERSAL } from './content/services.js'
import { sedi, solutions, BRAND, home } from './content/site.js'

const SUFFIX = ` – ${BRAND} Buffetti Group`

const pages = [
  { path: '/', title: `${BRAND} – Buffetti Group`, description: home.claim },
  { path: '/servizi', title: 'Servizi' + SUFFIX, description: 'Le aree di servizio di AgenziaImpresa: Registro Imprese, SUAP, Agenzia Entrate, Territorio, Ambiente, Marchi, Estero, Uffici Esterni, Servizi Digitali.' },
  ...areas.map((a) => ({
    path: `/servizi/${a.slug}`,
    title: a.title + SUFFIX,
    description: `${a.title}: ${a.services.map((s) => services[s].title).join(', ')}.`,
  })),
  ...areas.flatMap((a) =>
    a.services.map((slug) => ({
      path: serviceUrl(slug),
      title: `${services[slug].title} – ${a.title}${SUFFIX}`,
      description: `${services[slug].title}: ${services[slug].blocks.map((b) => b.text).join(', ')}`.slice(0, 158),
    })),
  ),
  ...Object.entries(approfondimenti).map(([slug, s]) => ({
    path: serviceUrl(slug),
    title: `${s.title} – ${areaBySlug[s.area].title}${SUFFIX}`,
    description: s.blocks[0].text.slice(0, 158),
  })),
  ...TRANSVERSAL.map((slug) => ({
    path: serviceUrl(slug),
    title: services[slug].title + SUFFIX,
    description: `${services[slug].title}: ${services[slug].blocks.map((b) => b.text).join(' ')}`.slice(0, 158),
  })),
  ...Object.values(solutions).map((s) => ({ path: `/soluzioni/${s.slug}`, title: s.title + SUFFIX, description: s.intro.slice(0, 158) })),
  { path: '/chi-siamo', title: 'Chi siamo' + SUFFIX, description: 'AgenziaImpresa affianca le Aziende e gli Studi Professionali nella gestione e nella conservazione della documentazione digitalizzata.' },
  { path: '/sedi', title: 'Le nostre sedi' + SUFFIX, description: 'Milano, Mantova, Modena, Brescia, Darfo Boario Terme, Bologna: indirizzi e contatti delle sedi AgenziaImpresa.' },
  ...sedi.map((s) => ({
    path: `/sedi/${s.slug}`,
    title: `Sede di ${s.city}${SUFFIX}`,
    description: s.locations.map((l) => `${l.address}, ${l.cap} ${l.city} – tel. ${l.phone}`).join(' · '),
  })),
  { path: '/contatti', title: 'Contatti' + SUFFIX, description: 'Scrivici il tuo messaggio, ti proporremo la Soluzione Digitale che stai cercando.' },
  { path: '/apri-la-tua-agenzia', title: 'Apri la tua Agenzia' + SUFFIX, description: 'Con AGENZIA IMPRESA potrai diventare un professionista nel mondo della digitalizzazione dei processi telematici rivolti alla Pubblica amministrazione.' },
  { path: '/privacy-policy', title: 'Privacy Policy' + SUFFIX, description: 'Informativa privacy di Agenzia Impresa S.r.l.' },
  { path: '/cookie-policy', title: 'Cookie Policy' + SUFFIX, description: 'Cookie policy di agenziaimpresa.com.' },
  { path: '/dichiarazione-accessibilita', title: 'Dichiarazione di accessibilità' + SUFFIX, description: 'Dichiarazione di accessibilità del sito AgenziaImpresa ai sensi del D.Lgs. 82/2022 (European Accessibility Act).' },
  { path: '/note-legali', title: 'Dati societari' + SUFFIX, description: 'Dati societari di AGENZIAIMPRESA SRL: ragione sociale, partita IVA, capitale sociale, sede legale e PEC.' },
  { path: '/cerca', title: 'Cerca' + SUFFIX, description: 'Cerca servizi, prestazioni, sedi e notizie nel sito AgenziaImpresa.', noindex: true },
  { path: '/pagamenti', title: 'Coordinate per i pagamenti' + SUFFIX, description: 'Coordinate bancarie per i pagamenti.', noindex: true },
]

export const routes = pages
export const metaFor = (raw) => {
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw
  return pages.find((p) => p.path === path) ?? { path, title: 'Pagina non trovata' + SUFFIX, description: '', noindex: true }
}
