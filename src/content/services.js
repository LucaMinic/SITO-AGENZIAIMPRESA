import { areas, services } from './services.generated.js'

export { areas, services }

// Sotto-aree presenti in più aree (Assistenza normativa, Diritto d'urgenza): pagina unica /servizi/<slug>.
export const TRANSVERSAL = ['diritto-durgenza', 'assistenza-normativa-e-procedurale']

export const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]))

export const areaUrl = (area) => `/servizi/${area.slug ?? area}`
export const serviceUrl = (slug) => (TRANSVERSAL.includes(slug) ? `/servizi/${slug}` : `/servizi/${services[slug].area}/${slug}`)

// Sotto-aree con pagina propria all'interno dell'area (escluse quelle comuni a più aree).
export const ownSubareas = (area) => area.services.filter((s) => !TRANSVERSAL.includes(s))

// Servizi (voci del listino) di una sotto-area.
export const serviceItems = (slug) => services[slug].blocks.filter((b) => b.type === 'item').map((b) => b.text)

// Contenuto di un'area: sotto-aree, oppure servizi diretti per le aree senza sotto-aree (Marchi, Varie).
export const subareaCount = (area) => area.services.length
export const areaServiceCount = (area) => (area.items ?? []).length + area.services.reduce((n, s) => n + serviceItems(s).length, 0)
export const areaSummary = (area) =>
  area.items
    ? `${area.items.length} ${area.items.length === 1 ? 'servizio' : 'servizi'}`
    : `${subareaCount(area)} ${subareaCount(area) === 1 ? 'sotto-area' : 'sotto-aree'}`

export const totalSubareas = new Set(areas.flatMap((a) => a.services)).size
export const totalServices =
  areas.reduce((n, a) => n + (a.items ?? []).length, 0) + Object.keys(services).reduce((n, s) => n + serviceItems(s).length, 0)

export const areaIndex = (area) => String(areas.indexOf(area) + 1).padStart(2, '0')

// Testo indicizzabile per la ricerca nella pagina /servizi.
export const searchIndex = [
  ...areas
    .filter((a) => a.items)
    .map((a) => ({
      url: areaUrl(a),
      title: a.title,
      area: null,
      kind: 'area',
      haystack: [a.title, ...a.items].join(' ').toLowerCase(),
    })),
  ...areas.flatMap((a) =>
    ownSubareas(a).map((slug) => ({
      url: serviceUrl(slug),
      title: services[slug].title,
      area: a,
      kind: 'sotto-area',
      haystack: [services[slug].title, a.title, ...services[slug].blocks.map((b) => b.text)].join(' ').toLowerCase(),
    })),
  ),
  ...TRANSVERSAL.map((slug) => ({
    url: serviceUrl(slug),
    title: services[slug].title,
    area: null,
    kind: 'sotto-area',
    haystack: [services[slug].title, ...services[slug].blocks.map((b) => b.text)].join(' ').toLowerCase(),
  })),
]
