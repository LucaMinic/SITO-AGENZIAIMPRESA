// Elenco delle pagine e relativi meta: usato dal pre-rendering (title, description,
// canonical, sitemap) e dal client per aggiornare il titolo durante la navigazione.
import { areas, services, ownSubareas, serviceUrl, TRANSVERSAL } from './content/services.js'
import { sedi, solutions, BRAND, home, phoneText } from './content/site.js'

const SUFFIX = ` – ${BRAND} Buffetti Group`

const pages = [
  { path: '/', title: `${BRAND} – Buffetti Group`, description: home.claim },
  { path: '/servizi', title: 'Servizi' + SUFFIX, description: `Le aree di servizio di Agenzia Impresa: ${areas.map((a) => a.title.replace(/^Area /, '')).join(', ')}.` },
  ...areas.map((a) => ({
    path: `/servizi/${a.slug}`,
    title: a.title + SUFFIX,
    description: `${a.title}: ${(a.items ?? a.services.map((s) => services[s].title)).join(', ')}.`.slice(0, 158),
  })),
  ...areas.flatMap((a) =>
    ownSubareas(a).map((slug) => ({
      path: serviceUrl(slug),
      title: `${services[slug].title} – ${a.title}${SUFFIX}`,
      description: `${services[slug].title}: ${services[slug].blocks.map((b) => b.text).join(', ')}`.slice(0, 158),
    })),
  ),
  ...TRANSVERSAL.map((slug) => ({
    path: serviceUrl(slug),
    title: services[slug].title + SUFFIX,
    description: `${services[slug].title}: ${services[slug].blocks.map((b) => b.text).join(' ')}`.slice(0, 158),
  })),
  ...Object.values(solutions).map((s) => ({ path: `/soluzioni/${s.slug}`, title: s.title + SUFFIX, description: s.intro.slice(0, 158) })),
  { path: '/chi-siamo', title: 'Chi siamo' + SUFFIX, description: 'Agenzia Impresa affianca le Aziende e gli Studi Professionali nella gestione e nella conservazione della documentazione digitalizzata.' },
  { path: '/sedi', title: 'Le nostre sedi' + SUFFIX, description: 'Milano, Mantova, Modena, Brescia, Darfo Boario Terme, Bologna, Reggio Emilia: indirizzi e contatti delle sedi Agenzia Impresa.' },
  ...sedi.map((s) => ({
    path: `/sedi/${s.slug}`,
    title: `Sede di ${s.city}${SUFFIX}`,
    description: s.locations.map((l) => [`${l.address}, ${l.cap} ${l.city}`, phoneText(l)].filter(Boolean).join(' – ')).join(' · '),
  })),
  { path: '/contatti', title: 'Contatti' + SUFFIX, description: 'Scrivici il tuo messaggio, ti proporremo la Soluzione Digitale che stai cercando.' },
  { path: '/privacy-policy', title: 'Privacy Policy' + SUFFIX, description: 'Informativa privacy di Agenzia Impresa S.r.l.' },
  { path: '/cookie-policy', title: 'Cookie Policy' + SUFFIX, description: 'Cookie policy di agenziaimpresa.com.' },
  { path: '/note-legali', title: 'Dati societari' + SUFFIX, description: 'Dati societari di AGENZIAIMPRESA SRL: ragione sociale, partita IVA, capitale sociale, sede legale e PEC.' },
  { path: '/cerca', title: 'Cerca' + SUFFIX, description: 'Cerca servizi, prestazioni, sedi e notizie nel sito Agenzia Impresa.', noindex: true },
  { path: '/pagamenti', title: 'Coordinate per i pagamenti' + SUFFIX, description: 'Coordinate bancarie per i pagamenti.', noindex: true },
]

export const routes = pages
export const metaFor = (raw) => {
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw
  return pages.find((p) => p.path === path) ?? { path, title: 'Pagina non trovata' + SUFFIX, description: '', noindex: true }
}
