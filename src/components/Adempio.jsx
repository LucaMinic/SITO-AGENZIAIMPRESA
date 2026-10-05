import { adempioPrinciples } from '../content/site.js'
import { asset, Reveal } from './ui.jsx'

/*
 * Principi del portale Adempio (Semplicità, Funzionalità, Efficacia) con il simbolo Adempio
 * prima di ogni titolo e il logo completo sotto. Stessa sezione in Home e nelle pagine Soggetti.
 */
// offset: allineamento laterale comune a elenco e logo; className: classi aggiuntive dell'elenco.
export default function AdempioPrinciples({ className = '', offset = '', heading: Heading = 'h3', note }) {
  return (
    <>
      <Reveal
        as="ol"
        data-stagger=""
        className={`draw-line grid gap-10 border-t border-line pt-12 [--line-color:var(--color-line)] md:grid-cols-3 md:gap-8 ${offset} ${className}`}
      >
        {adempioPrinciples.map((p, i) => (
          <li key={p.title} style={{ '--i': i }}>
            <span className="text-sm font-semibold text-brand tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <Heading className="text-h3 mt-3 flex items-center gap-3">
              <img src={asset('brand/adempio-simbolo.svg')} alt="" width="59" height="56" className="h-[1.1em] w-auto shrink-0" />
              {p.title}
            </Heading>
            <p className="mt-3 text-[0.9375rem] text-muted">{p.text}</p>
          </li>
        ))}
      </Reveal>
      <div className={`mt-14 md:mt-20 ${offset}`}>
        <img src={asset('brand/adempio.svg')} alt="Adempio" width="268" height="56" className="mx-auto block h-10 w-auto md:h-12" />
        {note && <p className="text-lead mt-8 max-w-[52ch]">{note}</p>}
      </div>
    </>
  )
}
