import { useEffect, useRef } from 'react'
import { sedi, telHref } from '../content/site.js'

/*
 * Mappa interattiva di tutte le sedi (OpenStreetMap + Leaflet).
 * Leaflet viene caricato solo nel browser e solo su questa pagina; nell'HTML
 * pre-renderizzato resta il riquadro vuoto con lo sfondo neutro.
 */
// Simbolo "B" di Buffetti Group usato come segnaposto.
const SYMBOL =
  '<svg viewBox="0 0 81.62 81.62" aria-hidden="true" focusable="false"><polygon points="57.13 65.3 40.81 81.62 0 81.62 16.32 65.3 57.13 65.3"/><rect x="43.04" y="35.9" width="17.31" height="28.86" transform="translate(-20.45 51.29) rotate(-45)"/><polygon points="27.21 10.88 10.88 27.21 10.88 68.02 27.21 51.69 27.21 10.88"/><rect x="33.51" y="1.9" width="17.31" height="28.86" transform="translate(.81 34.6) rotate(-45)"/></svg>'

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

export default function SediMap() {
  const ref = useRef(null)

  useEffect(() => {
    let map
    let cancelled = false
    let io
    const init = () =>
    Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]).then(([{ default: L }]) => {
      if (cancelled || !ref.current) return
      map = L.map(ref.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false,
      })
      // Attribuzione obbligatoria OpenStreetMap in basso a sinistra (l'angolo destro è tagliato a 45°).
      L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
      }).addTo(map)

      const icon = L.divIcon({
        className: 'sede-pin',
        html: `<span class="sede-pin__badge">${SYMBOL}</span><span class="sede-pin__tip"></span>`,
        iconSize: [44, 54],
        iconAnchor: [22, 54],
        popupAnchor: [0, -52],
      })

      const base = import.meta.env.BASE_URL
      const points = []
      for (const s of sedi) {
        for (const l of s.locations) {
          if (!l.coords) continue
          points.push(l.coords)
          L.marker(l.coords, { icon, title: `${l.city} – ${l.address}`, alt: `Sede di ${l.city}`, riseOnHover: true })
            .addTo(map)
            .bindPopup(
              `<div class="sede-popup">
                <p class="sede-popup__city">${esc(l.city)}</p>
                <p>${esc(l.address)}<br>${esc(l.cap)} ${esc(l.city)}</p>
                <p><a href="${telHref(l.phone)}">tel: ${esc(l.phone)}</a></p>
                <p><a class="sede-popup__cta" href="${base}sedi/${s.slug}">Contatta la sede →</a></p>
              </div>`,
              { closeButton: true, maxWidth: 260 },
            )
        }
      }
      map.fitBounds(L.latLngBounds(points), { padding: [48, 48] })

      // Zoom con la rotellina solo dopo un clic sulla mappa (non blocca lo scorrimento della pagina).
      map.on('click focus', () => map.scrollWheelZoom.enable())
      map.on('mouseout blur', () => map.scrollWheelZoom.disable())
    })

    // Leaflet e i riquadri della mappa si caricano solo quando la mappa si avvicina allo schermo.
    if ('IntersectionObserver' in window && ref.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect()
            init()
          }
        },
        { rootMargin: '400px 0px' },
      )
      io.observe(ref.current)
    } else init()

    return () => {
      cancelled = true
      io?.disconnect()
      map?.remove()
    }
  }, [])

  return (
    <figure className="relative isolate overflow-hidden bg-mist cut-corner [--cut:28px]">
      <div
        ref={ref}
        role="region"
        aria-label="Mappa delle sedi AgenziaImpresa"
        className="sedi-map aspect-[4/5] w-full sm:aspect-[16/10] md:aspect-[21/9]"
      />
    </figure>
  )
}
