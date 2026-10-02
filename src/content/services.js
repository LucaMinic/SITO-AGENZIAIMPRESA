import { areas, services, approfondimenti } from './services.generated.js'
import { families } from './site.js'

export { areas, services, approfondimenti }

export const TRANSVERSAL = ['diritto-durgenza', 'assistenza-normativa-e-procedurale']

export const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]))

export const areaUrl = (area) => `/servizi/${area.slug ?? area}`
export const serviceUrl = (slug) => {
  if (TRANSVERSAL.includes(slug)) return `/servizi/${slug}`
  const s = services[slug] ?? approfondimenti[slug]
  return `/servizi/${s.area}/${slug}`
}

export const areasByFamily = families.map((f) => ({
  ...f,
  areas: areas.filter((a) => a.family === f.id),
}))

// Numero di servizi visibili in un'area (servizi propri + trasversali richiamati).
export const serviceCount = (area) => area.services.length + area.transversal.length

export const totalServices = areas.reduce((n, a) => n + a.services.length, 0) + TRANSVERSAL.length

export const areaIndex = (area) => String(areas.indexOf(area) + 1).padStart(2, '0')

// Testo indicizzabile per la ricerca nella pagina /servizi.
export const searchIndex = [
  ...areas.flatMap((a) =>
    a.services.map((slug) => ({
      slug,
      title: services[slug].title,
      area: a,
      kind: 'servizio',
      haystack: [services[slug].title, a.title, ...services[slug].blocks.map((b) => b.text)].join(' ').toLowerCase(),
    })),
  ),
  ...Object.entries(approfondimenti).map(([slug, s]) => ({
    slug,
    title: s.title,
    area: areaBySlug[s.area],
    kind: 'scheda',
    haystack: [s.title, areaBySlug[s.area].title, ...s.blocks.map((b) => b.text)].join(' ').toLowerCase(),
  })),
  ...TRANSVERSAL.map((slug) => ({
    slug,
    title: services[slug].title,
    area: null,
    kind: 'servizio',
    haystack: [services[slug].title, ...services[slug].blocks.map((b) => b.text)].join(' ').toLowerCase(),
  })),
]
