// Indice di ricerca dell'intero sito (lato client, nessun servizio esterno).
import { areas, services, approfondimenti, areaUrl, serviceUrl, areaBySlug, TRANSVERSAL } from './services.js'
import { about, apriAgenzia, sedi, solutions, contactIntro, home } from './site.js'

export const normalize = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, ' ')

const textOf = (blocks) => blocks.map((b) => b.text ?? (b.items ?? []).join(' ')).join(' ')

const entries = [
  ...areas.map((a) => ({
    kind: 'Area di servizio',
    title: a.title,
    url: areaUrl(a),
    excerpt: a.services.map((s) => services[s].title).join(' · '),
    text: a.services.map((s) => services[s].title + ' ' + textOf(services[s].blocks)).join(' '),
  })),
  ...areas.flatMap((a) =>
    a.services.map((slug) => ({
      kind: 'Servizio',
      context: a.title,
      title: services[slug].title,
      url: serviceUrl(slug),
      excerpt: textOf(services[slug].blocks),
      text: textOf(services[slug].blocks),
    })),
  ),
  ...TRANSVERSAL.map((slug) => ({
    kind: 'Servizio',
    context: 'Tutte le aree',
    title: services[slug].title,
    url: serviceUrl(slug),
    excerpt: textOf(services[slug].blocks),
    text: textOf(services[slug].blocks),
  })),
  ...Object.entries(approfondimenti).map(([slug, s]) => ({
    kind: 'Scheda informativa',
    context: areaBySlug[s.area].title,
    title: s.title,
    url: serviceUrl(slug),
    excerpt: textOf(s.blocks),
    text: textOf(s.blocks),
  })),
  ...sedi.flatMap((s) =>
    s.locations.map((l) => ({
      kind: 'Sede',
      title: l.city,
      url: `/sedi/${s.slug}`,
      excerpt: `${l.address}, ${l.cap} ${l.city} – tel. ${l.phone}`,
      text: `${l.address} ${l.cap} ${l.city} ${l.phone} sede contatti`,
    })),
  ),
  { kind: 'Pagina', title: 'Chi siamo', url: '/chi-siamo', excerpt: about.quote, text: [about.quote, ...about.story].join(' ') },
  ...Object.values(solutions).map((s) => ({
    kind: 'Pagina',
    title: s.title,
    url: `/soluzioni/${s.slug}`,
    excerpt: s.teaser,
    text: [s.text, ...s.principles.map((p) => p.title + ' ' + p.text)].join(' '),
  })),
  { kind: 'Pagina', title: 'I nostri Servizi', url: '/servizi', excerpt: home.claim, text: home.claim },
  { kind: 'Pagina', title: 'Le nostre Sedi', url: '/sedi', excerpt: contactIntro, text: 'sedi contatti indirizzi telefoni login area clienti' },
  { kind: 'Pagina', title: 'Contattaci', url: '/contatti', excerpt: contactIntro, text: contactIntro + ' contatti modulo email' },
  { kind: 'Pagina', title: 'Apri la tua Agenzia', url: '/apri-la-tua-agenzia', excerpt: apriAgenzia.title, text: apriAgenzia.text },
  { kind: 'Pagina', title: 'Privacy Policy', url: '/privacy-policy', excerpt: 'Informativa privacy', text: 'privacy dati personali gdpr' },
  { kind: 'Pagina', title: 'Dichiarazione di accessibilità', url: '/dichiarazione-accessibilita', excerpt: 'Accessibilità del sito, stato di conformità e recapiti per le segnalazioni.', text: 'accessibilità dichiarazione disabilità wcag eaa segnalazione' },
  { kind: 'Pagina', title: 'Cookie Policy', url: '/cookie-policy', excerpt: 'Informativa cookie', text: 'cookie tracciamento' },
].map((e) => ({ ...e, _title: normalize(e.title), _all: normalize(`${e.title} ${e.context ?? ''} ${e.text}`) }))

/* Ricerca: tutte le parole devono comparire; il titolo pesa più del testo. */
export function search(query, limit = Infinity) {
  const words = normalize(query).trim().split(/\s+/).filter((w) => w.length > 1)
  if (!words.length) return []
  const results = []
  for (const e of entries) {
    if (!words.every((w) => e._all.includes(w))) continue
    let score = 0
    for (const w of words) {
      if (e._title.startsWith(w)) score += 6
      else if (e._title.includes(w)) score += 4
      else score += 1
    }
    if (e.kind === 'Area di servizio') score += 1
    results.push({ ...e, score })
  }
  results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'it'))
  return results.slice(0, limit)
}

/* Estratto centrato sulla prima parola trovata. */
export function snippet(text, query, len = 140) {
  if (!text) return ''
  const words = normalize(query).trim().split(/\s+/).filter((w) => w.length > 1)
  const n = normalize(text)
  const i = Math.min(...words.map((w) => n.indexOf(w)).filter((x) => x >= 0), Infinity)
  if (!isFinite(i) || i < len / 2) return text.length > len ? text.slice(0, len).trimEnd() + '…' : text
  const start = Math.max(0, i - 40)
  return '…' + text.slice(start, start + len).trim() + (start + len < text.length ? '…' : '')
}
