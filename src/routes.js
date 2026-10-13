// Elenco delle pagine e relativi meta: usato dal pre-rendering (title, description,
// canonical, sitemap) e dal client per aggiornare il titolo durante la navigazione.
import { areas, services, ownSubareas, serviceUrl, TRANSVERSAL } from './content/services.js'
import { sedi, solutions, BRAND, home, phoneText } from './content/site.js'

const SUFFIX = ` – ${BRAND}`

// Meta description entro ~155 caratteri, tagliata a fine parola (Google ne mostra circa 155).
const clip = (text, max = 155) => {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[\s,;:.–-]+$/, '') + '…'
}

const subTitles = areas.flatMap((a) => ownSubareas(a).map((slug) => services[slug].title))
const sharedTitles = new Set(subTitles.filter((t, i) => subTitles.indexOf(t) !== i))

const pages = [
  { path: '/', title: `${BRAND} – Buffetti Group`, description: home.claim },
  { path: '/servizi', title: 'Servizi' + SUFFIX, description: clip(`Le aree di servizio di Agenzia Impresa: ${areas.map((a) => a.title.replace(/^Area /, '')).join(', ')}.`) },
  ...areas.map((a) => ({
    path: `/servizi/${a.slug}`,
    title: a.title + SUFFIX,
    description: clip(`${a.title}: ${(a.items ?? a.services.map((s) => services[s].title)).join(', ')}.`),
  })),
  ...areas.flatMap((a) =>
    ownSubareas(a).map((slug) => ({
      path: serviceUrl(slug),
      // L'area si aggiunge solo ai nomi presenti in più aree, per avere title unici.
      title: (sharedTitles.has(services[slug].title) ? `${services[slug].title} – ${a.title.replace(/^Area /, '')}` : services[slug].title) + SUFFIX,
      description: clip(`${services[slug].title} (${a.title}): ${services[slug].blocks.map((b) => b.text).join(', ')}`),
    })),
  ),
  ...TRANSVERSAL.map((slug) => ({
    path: serviceUrl(slug),
    title: services[slug].title + SUFFIX,
    description: clip(`${services[slug].title}: ${services[slug].blocks.map((b) => b.text).join(' ')}`),
  })),
  ...Object.values(solutions).map((s) => ({ path: `/soluzioni/${s.slug}`, title: s.title + SUFFIX, description: clip(s.intro) })),
  { path: '/chi-siamo', title: 'Chi siamo' + SUFFIX, description: 'Agenzia Impresa affianca le Aziende e gli Studi Professionali nella gestione e nella conservazione della documentazione digitalizzata.' },
  { path: '/sedi', title: 'Le nostre sedi' + SUFFIX, description: 'Milano, Mantova, Modena, Brescia, Darfo Boario Terme, Bologna, Reggio Emilia: indirizzi e contatti delle sedi Agenzia Impresa.' },
  ...sedi.map((s) => ({
    path: `/sedi/${s.slug}`,
    title: `Sede di ${s.city}${SUFFIX}`,
    description: clip(`Sede Agenzia Impresa di ${s.city}: ` + s.locations.map((l) => [`${l.address}, ${l.cap} ${l.city}`, phoneText(l)].filter(Boolean).join(' – ')).join(' · ') + '. Indirizzo, contatti e modulo per scriverci.'),
  })),
  { path: '/contatti', title: 'Contatti' + SUFFIX, description: 'Scrivici il tuo messaggio, ti proporremo la Soluzione Digitale che stai cercando.' },
  { path: '/privacy-policy', title: 'Privacy Policy' + SUFFIX, description: 'Informativa privacy di Agenzia Impresa SRL: come vengono trattati i dati personali di chi visita il sito e di chi ci contatta.' },
  { path: '/cookie-policy', title: 'Cookie Policy' + SUFFIX, description: 'Cookie policy di agenziaimpresa.com: quali cookie usa il sito, a cosa servono e come dare o revocare il consenso.' },
  { path: '/note-legali', title: 'Dati societari' + SUFFIX, description: 'Dati societari di Agenzia Impresa SRL: ragione sociale, partita IVA, capitale sociale, sede legale e PEC.' },
  { path: '/cerca', title: 'Cerca' + SUFFIX, description: 'Cerca servizi, prestazioni, sedi e notizie nel sito Agenzia Impresa.', noindex: true },
  { path: '/pagamenti', title: 'Coordinate per i pagamenti' + SUFFIX, description: 'Coordinate bancarie per i pagamenti.', noindex: true },
]

export const routes = pages
export const metaFor = (raw) => {
  const path = raw.length > 1 ? raw.replace(/\/+$/, '') : raw
  return pages.find((p) => p.path === path) ?? { path, title: 'Pagina non trovata' + SUFFIX, description: '', noindex: true }
}
