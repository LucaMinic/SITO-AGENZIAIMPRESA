import { Link } from 'react-router-dom'
import { accessibility, company, sedi, SITE_URL, telHref } from '../content/site.js'
import { PageHero } from '../components/ui.jsx'

const formatDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

const FEATURES = [
  'Struttura semantica con intestazioni in ordine logico, punti di riferimento (header, navigazione, contenuto principale, footer) e un collegamento "Vai al contenuto".',
  'Navigazione completa da tastiera, inclusi menu, mega-menu, ricerca, slider e moduli, con indicatore di focus sempre visibile.',
  'Contrasto del testo di almeno 4,5:1, verificato anche sui testi posti sopra le fotografie.',
  'Testi alternativi per tutte le immagini informative.',
  'Impaginazione che si adatta fino a 320 px di larghezza (equivalente a uno zoom del 400%) senza scorrimento orizzontale e senza perdita di contenuti.',
  'Slider della pagina iniziale con controlli per scorrere le immagini e per mettere in pausa la rotazione, che si ferma anche al passaggio del mouse o del focus.',
  'Animazioni disattivate quando il sistema operativo richiede di ridurre il movimento.',
  'Moduli con etichette sempre visibili, campi obbligatori indicati, messaggi di errore associati ai campi e annunciati alle tecnologie assistive.',
  'Funzione di ricerca nel sito utilizzabile con la tastiera e compatibile con i lettori di schermo.',
  'Lingua della pagina dichiarata e titoli di pagina univoci e descrittivi.',
]

export default function Accessibility() {
  const legal = sedi.find((s) => s.slug === 'milano').locations[0]
  const reportHref = `/contatti?oggetto=${encodeURIComponent('Segnalazione di accessibilità')}`
  return (
    <>
      <PageHero
        eyebrow="Informazioni legali"
        title="Dichiarazione di accessibilità"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Dichiarazione di accessibilità' }]}
      />
      <section className="wrap section pt-12 md:pt-16">
        <div className="prose-ai text-[1.0625rem]">
          <p>
            {company.legalName} si impegna a rendere il proprio sito web accessibile, conformemente alla Direttiva (UE)
            2019/882 (European Accessibility Act), al Decreto Legislativo 27 maggio 2022, n. 82 e alla Legge 9 gennaio
            2004, n. 4.
          </p>
          <p>
            La presente dichiarazione si applica al sito <a href={SITE_URL}>{SITE_URL.replace('https://', '')}</a>.
          </p>

          <h2>Stato di conformità</h2>
          <p>
            Il sito è <strong>conforme</strong> ai requisiti della norma UNI EN 301 549 e alle Linee guida per
            l’accessibilità dei contenuti web (WCAG) 2.1 livello AA. Il sito è stato verificato anche rispetto ai criteri
            aggiuntivi delle WCAG 2.2 livello AA.
          </p>

          <h2>Contenuti di terze parti</h2>
          <ul>
            <li>
              Le mappe sono fornite da OpenStreetMap (pagina “Le nostre Sedi”) e da Google Maps (pagine delle singole
              sedi). Indirizzi e numeri di telefono sono sempre disponibili anche in forma testuale.
            </li>
            <li>
              Le aree clienti raggiungibili dal collegamento “Area clienti” sono piattaforme esterne (EccoSolution) non
              comprese in questa dichiarazione.
            </li>
          </ul>

          <h2>Caratteristiche di accessibilità del sito</h2>
          <ul>
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h2>Redazione della dichiarazione</h2>
          <p>
            La dichiarazione è stata redatta il {formatDate(accessibility.date)} sulla base di un’autovalutazione
            effettuata con:
          </p>
          <ul>
            <li>test automatici (axe-core) su tutte le pagine del sito, in visualizzazione desktop e mobile;</li>
            <li>
              verifiche manuali: navigazione da tastiera, ridimensionamento fino a 320 px, spaziatura del testo, contrasto
              dei testi su immagini, dimensione dei controlli, struttura delle intestazioni e funzionamento dei moduli.
            </li>
          </ul>
          <p>Ultimo riesame: {formatDate(accessibility.reviewed)}.</p>

          <h2>Feedback e recapiti</h2>
          <p>
            Per segnalare problemi di accessibilità o richiedere informazioni e contenuti in un formato accessibile è
            possibile:
          </p>
          <ul>
            {accessibility.email && (
              <li>
                scrivere a <a href={`mailto:${accessibility.email}`}>{accessibility.email}</a>;
              </li>
            )}
            <li>
              utilizzare il <Link to={reportHref}>modulo di contatto</Link> indicando come oggetto “Segnalazione di
              accessibilità”;
            </li>
            <li>
              telefonare alla sede legale di {legal.city} al numero <a href={telHref(legal.phone)}>{legal.phone}</a>.
            </li>
          </ul>
          <p>Ci impegniamo a rispondere entro 30 giorni.</p>

          <h2>Procedura di attuazione</h2>
          <p>
            In caso di risposta insoddisfacente o di mancata risposta entro il termine indicato, è possibile inoltrare una
            segnalazione all’Agenzia per l’Italia Digitale (AgID) tramite la piattaforma{' '}
            <a href="https://form.agid.gov.it/" rel="noopener" target="_blank">
              form.agid.gov.it
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
