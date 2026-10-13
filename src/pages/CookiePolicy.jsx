import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui.jsx'
import { company } from '../content/site.js'
import { SERVICES, activeCategories } from '../consent/cookieConfig.js'
import { categoryTexts } from '../consent/consentTexts.js'
import { openPreferences } from '../consent/consentStore.js'

// Cookie Policy: le tabelle dei cookie sono generate da src/consent/cookieConfig.js, la stessa
// configurazione del banner, così pagina e banner restano allineati. Se cambia un servizio,
// aggiorna anche UPDATED e VITE_COOKIE_POLICY_VERSION (.env) / la versione sul backend.
const UPDATED = '13 ottobre 2026'
const PRIVACY_EMAIL = 'privacy.agenziaimpresa@legalmail.it'

const BROWSERS = [
  ['Google Chrome', 'https://support.google.com/chrome/answer/95647?hl=it'],
  ['Mozilla Firefox', 'https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie'],
  ['Apple Safari', 'https://support.apple.com/it-it/guide/safari/manage-cookies-and-website-data-sfri11471/'],
  ['Microsoft Edge', 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'],
  ['Brave', 'https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing'],
  ['Opera', 'https://help.opera.com/en/latest/web-preferences/#cookies'],
]

const TYPE = { cookie: 'Cookie', localStorage: 'Local Storage' }

export default function CookiePolicy() {
  return (
    <>
      <PageHero
        eyebrow="Informazioni legali"
        title="Cookie Policy"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Cookie Policy' }]}
      />
      <section className="wrap section pt-12 md:pt-16">
        <div className="prose-ai text-[1.0625rem]">
          <p>
            Questa pagina descrive i cookie e gli altri strumenti di memorizzazione usati dal sito www.agenziaimpresa.com,
            ai sensi dell’art. 122 del Codice Privacy (D.Lgs. 196/2003), del Regolamento (UE) 2016/679 (GDPR) e delle Linee
            guida del Garante per la protezione dei dati personali del 10 giugno 2021.
          </p>
          <p>
            I cookie sono piccoli file di testo che il sito salva nel browser di chi lo visita. Il Local Storage è uno spazio
            del browser con la stessa funzione. Alcuni sono indispensabili al funzionamento del sito, altri vengono usati
            solo con il tuo consenso.
          </p>

          <h2>Titolare del trattamento</h2>
          <p>
            {company.legalName} – Sede legale {company.legalSeat} – CF e P.IVA {company.vat}.
            <br />
            Email: <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> – PEC: <a href={`mailto:${company.pec}`}>{company.pec}</a>
          </p>

          <h2>Cookie usati dal sito</h2>
          <p>
            Il sito non usa cookie di profilazione propri né strumenti di statistica (per esempio Google Analytics). Usa solo
            le categorie qui sotto.
          </p>
          {activeCategories().map((category) => (
            <CategorySection key={category} category={category} />
          ))}

          <h2>Contenuti esterni che non usano cookie</h2>
          <p>
            Alcuni contenuti sono caricati da server di terzi senza impostare cookie. Come per ogni risorsa web, questi
            fornitori ricevono l’indirizzo IP e i dati tecnici della richiesta (browser, pagina di provenienza):
          </p>
          <ul>
            <li>
              <strong>OpenStreetMap</strong> (OpenStreetMap Foundation): le mappe delle sedi in home page e nella pagina{' '}
              <Link to="/sedi">Le nostre sedi</Link> –{' '}
              <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">
                informativa privacy
              </a>
              .
            </li>
            <li>
              <strong>Unsplash</strong> (Unsplash Inc.): alcune fotografie del sito –{' '}
              <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer">
                informativa privacy
              </a>
              .
            </li>
          </ul>
          <p>I caratteri tipografici sono serviti direttamente dal sito, senza richieste a servizi esterni.</p>

          <h2>Come dare, modificare o revocare il consenso</h2>
          <p>
            Alla prima visita un banner ti permette di accettare tutti i cookie, rifiutarli o scegliere quali categorie
            attivare. Nessun cookie facoltativo viene usato prima della tua scelta, e scorrere la pagina o continuare la
            navigazione non vale come consenso. Chiudendo il banner con la X restano attivi solo i cookie tecnici.
          </p>
          <p>
            La scelta viene ricordata per 6 mesi se rifiuti i cookie facoltativi e per 12 mesi se ne accetti almeno uno; il
            banner viene riproposto anche quando questa informativa o i servizi usati cambiano. Nelle pagine delle sedi, al
            posto della mappa Google, il pulsante “Attiva contenuto” consente solo la categoria necessaria a mostrarla.
          </p>
          <p>
            Puoi cambiare idea o revocare il consenso in qualsiasi momento dal link “Preferenze cookie” in fondo a ogni pagina
            oppure da qui:
          </p>
          <p>
            <button
              type="button"
              onClick={openPreferences}
              className="inline-flex min-h-12 items-center bg-brand px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Modifica le preferenze cookie
            </button>
          </p>
          <p>
            Per dimostrare il consenso ricevuto (art. 7 GDPR), ogni scelta viene registrata insieme a un identificativo
            casuale, alle categorie scelte, alla versione di questa informativa e alla data e ora. Il sito non invia nome,
            email o altri dati che ti identificano direttamente.
          </p>

          <h2>Gestire i cookie dal browser</h2>
          <p>
            Puoi anche bloccare o cancellare i cookie dalle impostazioni del browser. Bloccando i cookie tecnici il sito
            potrebbe non ricordare le tue scelte. Le istruzioni per i browser più diffusi:
          </p>
          <ul>
            {BROWSERS.map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </li>
            ))}
          </ul>

          <h2>I tuoi diritti</h2>
          <p>
            Puoi esercitare i diritti previsti dagli artt. 15–22 GDPR (accesso, rettifica, cancellazione, limitazione,
            opposizione, portabilità) e proporre reclamo al Garante per la protezione dei dati personali. I dettagli sono
            nella <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>

          <p className="text-muted">Ultimo aggiornamento: {UPDATED}</p>
        </div>
      </section>
    </>
  )
}

function CategorySection({ category }) {
  const services = SERVICES.filter((s) => s.category === category)
  const necessary = category === 'necessary'
  return (
    <>
      <h3>{categoryTexts[category].title}</h3>
      <p>
        {necessary
          ? 'Servono al funzionamento del sito e a ricordare le tue scelte sui cookie. Non richiedono consenso (art. 122, comma 1, Codice Privacy).'
          : `${categoryTexts[category].description} Vengono usati solo con il tuo consenso.`}
      </p>
      {services.map((service) => (
        <div key={service.id}>
          <p>
            <strong>{service.name}</strong> – {service.provider}. {service.description}
            {service.privacyPolicyUrl && (
              <>
                {' '}
                <a href={service.privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
                  Informativa privacy del fornitore
                </a>
                .
              </>
            )}
          </p>
          {service.id === 'google-maps' && (
            <p>
              Google può trasferire i dati negli Stati Uniti; Google LLC aderisce all’EU-U.S. Data Privacy Framework. I cookie
              di Google indicati sono quelli principali: l’elenco completo e aggiornato è nell’informativa di Google.
            </p>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="py-2 pr-4 font-semibold">Nome</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Tipo</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Durata</th>
                  <th scope="col" className="py-2 font-semibold">Finalità</th>
                </tr>
              </thead>
              <tbody>
                {service.cookies.map((c) => (
                  <tr key={c.name} className="border-b border-line align-top">
                    <td className="py-2 pr-4 font-mono text-sm">{c.name}</td>
                    <td className="py-2 pr-4 text-muted">
                      {TYPE[c.type]}, {c.party === 'first' ? 'prima parte' : 'terza parte'}
                    </td>
                    <td className="py-2 pr-4 text-muted">{c.duration}</td>
                    <td className="py-2 text-muted">{c.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  )
}
