// Contenuti istituzionali, ripresi dal sito agenziaimpresa.com (ottobre 2026).
// Modifiche concordate col cliente: riferimenti a "Gruppo APM" sostituiti con
// "Agenzia Impresa Buffetti Group"; numeri, certificazioni ISO/231 e "Microsoft ISV
// Partner" rimossi; shop/webinar eliminati; refusi corretti.
import { maps } from './maps.generated.js'

export const SITE_URL = 'https://www.agenziaimpresa.com'
export const BRAND = 'Agenzia Impresa'
export const BRAND_GROUP = 'Agenzia Impresa Buffetti Group'

export const company = {
  legalName: 'AGENZIAIMPRESA SRL',
  vat: '01653610202',
  capital: '100.000 Euro',
  legalSeat: 'Via Feltre 32, 20132 Milano',
  pec: 'agenziaimpresa@legalmail.it',
  group: 'Società soggetta a direzione e coordinamento di GRUPPO BUFFETTI',
  poweredBy: { label: 'Resta in up Srl', href: 'http://www.restainup.it' },
}

// Dati delle sedi così come pubblicati nella pagina /contatti originale.
// coords: [latitudine, longitudine] per la mappa delle sedi (Mantova: indirizzo dichiarato).
export const sedi = [
  {
    slug: 'milano',
    city: 'Milano',
    note: 'Sede legale',
    locations: [{ address: 'Via Feltre 32', cap: '20132', city: 'Milano', phone: '02 86453881', coords: [45.49015, 9.23950] }],
    maps: maps.milano,
  },
  {
    slug: 'mantova',
    city: 'Mantova',
    locations: [{ address: 'Piazza Alcide de Gasperi 23 / 24', cap: '46100', city: 'Mantova', phone: '0376 222020', coords: [45.15186, 10.77625] }],
    maps: maps.mantova,
  },
  {
    slug: 'modena',
    city: 'Modena',
    locations: [{ address: 'Via Carlo Zucchi 21 Scala B', cap: '41123', city: 'Modena', phone: '0376 222020', coords: [44.65284, 10.91058] }],
    maps: maps.modena,
  },
  {
    slug: 'brescia',
    city: 'Brescia',
    locations: [
      { address: 'Via Romanino 1', cap: '25122', city: 'Brescia', phone: '030 3771630', coords: [45.53342, 10.21401] },
      { address: 'Via Roccole 76/A', cap: '25047', city: 'Darfo Boario Terme', phone: '0364 535740', coords: [45.89657, 10.18912] },
    ],
    maps: maps.brescia,
  },
  {
    slug: 'bologna',
    city: 'Bologna',
    locations: [{ address: 'Via Amendola 8/E', cap: '40121', city: 'Bologna (BO)', phone: '051.4211114', coords: [44.50399, 11.33796] }],
    maps: maps.bologna,
  },
  {
    // Sede aggiunta su indicazione del cliente (05/10/2026). Telefono non ancora fornito.
    // coords a livello di via: il civico non è presente in OpenStreetMap.
    slug: 'reggio-emilia',
    city: 'Reggio Emilia',
    locations: [{ address: 'Via Bernardino Zacchetti 32', cap: '42124', city: 'Reggio Emilia', coords: [44.70889, 10.63818] }],
    maps: ['https://maps.google.com/maps?q=Via%20Bernardino%20Zacchetti%2032%2C%2042124%20Reggio%20Emilia&output=embed&hl=it'],
  },
]

export const allLocations = sedi.flatMap((s) => s.locations.map((l) => ({ ...l, sede: s.slug })))

// Link della voce "Registrati" nel menu.
// Registrazione sulla piattaforma Adempio (link indicato dal cliente, ottobre 2026).
export const REGISTER_URL = 'https://www.adempio.it/#/register'
// Login unico dell'area clienti sul portale Adempio (sostituisce i login EccoSolution delle singole sedi).
export const LOGIN_URL = 'https://www.adempio.it/'

// Mappe Google delle sedi: false = visibili subito; true = caricate solo dopo un clic
// (da usare se il banner dei cookie non gestisce il consenso per Google Maps).
export const MAPS_REQUIRE_CONSENT = false

export const telHref = (phone) => 'tel:+39' + phone.replace(/[^\d]/g, '')
// Testo "tel. …" di una sede, vuoto se il telefono non è ancora disponibile.
export const phoneText = (l, prefix = 'tel. ') => (l.phone ? `${prefix}${l.phone}` : '')


export const home = {
  claim:
    'Servizi di intermediazione telematica degli adempimenti rivolti alla pubblica amministrazione',
}

export const about = {
  quote:
    'Offriamo da sempre Servizi Telematici all’avanguardia in grado di rispondere a tutte le esigenze operative, nei confronti della pubblica amministrazione, a norma di legge in continua evoluzione.',
  storyTitle: 'Una storia di Passione Successi e Soddisfazioni.',
  story: [
    'Agenzia Impresa Buffetti Group è attiva dal 1992 nel settore dei servizi di intermediazione degli adempimenti rivolti alla pubblica amministrazione per le imprese e gli studi professionali, gestendo con competenza ogni adempimento previsto dalle normative che nel corso degli anni si sono evolute, dando modo alle imprese stesse di certificare a norma le proprie attività.',
    'Con l’avanzamento dei processi di digitalizzazione le Aziende e gli Studi Professionali sono obbligati ad aggiornarsi di continuo per compiere gli adempimenti telematici rivolti alla pubblica amministrazione, gestendo caselle di posta elettronica certificate, Firme digitali, e la governance delle procedure telematiche che di volta in volta le pubbliche amministrazioni introducono all’interno dei loro processi.',
    'Agenzia Impresa tramite la piattaforma WEB Adempio offre in un unico “luogo” presso il quale offrire uno svolgimento di servizi telematici in grado di rispondere a tutte le esigenze operative a norma di legge mediante i più moderni processi di Digitalizzazione all’avanguardia.',
    'In questo modo Agenzia Impresa è in grado di essere un valido supporto per le imprese e gli studi professionali nella gestione degli adempimenti.',
  ],
  solutionsTitle: 'Servizi e Soluzioni Digitali per Imprese e Professionisti - il portale Adempio',
}

// Contenuti delle pagine Soggetti (Soluzioni per le imprese / per Professionisti). Testi ampliati su richiesta del cliente (ottobre 2026),
// basati esclusivamente sui servizi realmente offerti (nessun dato, cliente o certificazione).
// Principi del portale Adempio: stessa sezione in Home e nelle due pagine.
export const adempioPrinciples = [
  {
    title: 'Semplicità',
    text: 'L’interfaccia di Adempio è stata sviluppata per essere estremamente semplice ed intuitiva, i nostri clienti possono effettuare le loro richieste di servizio e fruire dell’assistenza del nostro personale specializzato per tutte le esigenze.',
  },
  {
    title: 'Funzionalità',
    text: 'Adempio è il portale sviluppato da Agenzia Impresa Buffetti Group per essere uno strumento funzionale in grado di rispondere a tutte le esigenze anche le più articolate, dei nostri clienti.',
  },
  {
    title: 'Efficacia',
    text: 'Adempio è uno strumento efficiente ed efficace, i nostri clienti possono in qualsiasi momento richiedere istruttorie sui vari adempimenti che devono essere rivolti alla Pubblica Amministrazione, verificare in tempo reale il loro relativo stato d’avanzamento.',
  },
]



export const solutions = {
  imprese: {
    slug: 'imprese',
    label: 'Imprese',
    title: 'Soluzioni per le imprese',
    teaser: 'Scopri i Servizi e le Soluzioni Digitali di Agenzia Impresa sviluppate appositamente per le Imprese.',
    text: 'Agenzia Impresa studia, sviluppa e fornisce istruttorie per tutti gli adempimenti necessari per avviare modificare e cessare qualsiasi attività di impresa.',
    intro:
      'Dalla costituzione della società alle autorizzazioni per avviare l’attività, dagli adempimenti ambientali ai rapporti con l’estero: Agenzia Impresa gestisce per conto dell’impresa le pratiche telematiche rivolte alla Pubblica Amministrazione, così che imprenditori e uffici amministrativi possano dedicare tempo ed energie al proprio lavoro.',
    audience: [
      'Società di capitali',
      'Società di persone',
      'Cooperative',
      'Consorzi',
      'Ditte individuali',
      'Consulenti non ordinistici',
      'Associazioni',
      'Fondazioni',
    ],
    needsTitle: 'Cosa facciamo per la tua impresa',
    needs: [
      {
        title: 'Costituire e gestire la società',
        text: 'Costituzioni, modifiche statutarie, cariche sociali, trasferimenti di quote, deposito del bilancio e comunicazione del titolare effettivo: seguiamo ogni passaggio verso il Registro Imprese, insieme alla tutela del marchio e al rilascio del codice LEI.',
        areas: ['registro-imprese-comunica', 'marchi'],
      },
      {
        title: 'Avviare e autorizzare l’attività',
        text: 'Predisponiamo e presentiamo le pratiche SUAP per l’apertura, la variazione o la cessazione dell’attività: vendita, somministrazione di alimenti e bevande, attività artigianali, ricettive e di intrattenimento, autorizzazioni comunali e carta di esercizio per gli ambulanti.',
        areas: ['pratiche-suap'],
      },
      {
        title: 'Adempimenti ambientali',
        text: 'Iscrizioni e rinnovi all’Albo Gestori Ambientali e ai registri R.A.E.E./A.E.E., dichiarazione MUD e adesione al RENTRI, con il servizio di tenuta del registro di carico e scarico e dei formulari.',
        areas: ['servizi-ambientali'],
      },
      {
        title: 'Lavorare con l’estero',
        text: 'Certificati di origine, legalizzazioni e visti consolari, Carnet ATA, codice meccanografico e comunicazioni Intrastat: i documenti necessari per importare ed esportare, gestiti con le Camere di Commercio, i Consolati e l’Agenzia delle Dogane e dei Monopoli.',
        areas: ['servizio-estero', 'agenzia-entrate-adm'],
      },
      {
        title: 'Identità digitale e comunicazioni',
        text: 'Firma digitale su smart card, business key o remota, SPID e caselle PEC: gli strumenti indispensabili per firmare, comunicare e dialogare con la Pubblica Amministrazione.',
        areas: ['servizi-digitali'],
      },
    ],
    principles: adempioPrinciples,
    adempioNote: 'Le imprese nostre clienti utilizzano il portale Adempio per dialogare a distanza con i nostri operatori.',
    process: [
      { title: 'Richiesta', text: 'Attraverso il portale Adempio i nostri clienti inviano le loro richieste di servizio.' },
      { title: 'Verifica', text: 'Le richieste di servizio una volta ricevute vengono attentamente istruite dai nostri operatori per individuare i relativi adempimenti necessari.' },
      { title: 'Predisposizione e invio', text: 'I nostri operatori, una volta individuati gli adempimenti da rivolgere alla pubblica amministrazione, predispongono ed inviano le pratiche previste.' },
      { title: 'Risultato', text: 'I nostri clienti attraverso la dashboard del portale Adempio, possono consultare gli stati d’avanzamento e gestire le relative ricevute degli adempimenti eseguiti.' },
    ],
  },
  professionisti: {
    slug: 'professionisti',
    label: 'Professionisti',
    title: 'Soluzioni per Professionisti',
    teaser: 'Scopri le Soluzioni Digitali di Agenzia Impresa sviluppate appositamente per i Professionisti.',
    text: 'Agenzia Impresa effettua il disbrigo degli adempimenti rivolti alla Pubblica Amministrazione in nome e per conto dei clienti che gli studi professionali di volta in volta ci affidano.',
    intro:
      'Commercialisti, consulenti e studi professionali gestiscono ogni giorno pratiche telematiche per conto dei propri clienti. Agenzia Impresa diventa un’estensione operativa dello studio: predispone e deposita le pratiche, reperisce visure e certificati presso gli uffici pubblici e mette a disposizione gli strumenti digitali necessari, lasciando al professionista il rapporto con il cliente e la consulenza.',
    audience: [
      'Commercialisti',
      'Avvocati',
      'Notai',
      'Architetti',
      'Medici',
      'Geometri',
      'Ingegneri',
      'Associazioni professionali',
      'Consulenti del lavoro',
      'STP',
      'Centri elaborazione dati',
      'Tecnici e professionisti dell’area immobiliare',
    ],
    needsTitle: 'Cosa facciamo per il tuo studio',
    needs: [
      {
        title: 'Pratiche per conto dei clienti',
        text: 'Deposito di atti e bilanci al Registro Imprese, trasformazione dei file XBRL, compilazione dell’elenco soci, denunce e comunicazioni REA e comunicazioni ComUnica verso Agenzia delle Entrate, INPS e INAIL.',
        areas: ['registro-imprese-comunica'],
      },
      {
        title: 'Visure, certificati e accessi agli uffici',
        text: 'Visure e certificati camerali, catastali e ipotecari, certificati del Tribunale e anagrafici, copie di atti e accessi presso gli uffici pubblici, anche in altri Comuni, per raccogliere la documentazione necessaria allo studio.',
        areas: ['uffici-esterni', 'agenzia-territorio', 'varie'],
      },
      {
        title: 'Fisco, successioni e registrazione atti',
        text: 'Dichiarazioni di successione, registrazione di contratti di locazione e di atti, rimborsi IVA, istanze CIVIS e verifica delle cartelle di pagamento presso l’Agenzia delle Entrate.',
        areas: ['agenzia-entrate-adm', 'uffici-esterni'],
      },
      {
        title: 'Supporto normativo e scadenze',
        text: 'Approfondimenti sui quesiti normativi e procedurali, verifiche preventive presso gli enti e gestione delle pratiche urgenti in prossimità delle scadenze.',
        areas: ['assistenza-normativa-e-procedurale', 'diritto-durgenza'],
      },
      {
        title: 'Strumenti digitali per lo studio',
        text: 'Firma digitale remota, marche temporali, caselle PEC e accesso alle banche dati camerali: gli strumenti per lavorare in modo sicuro e a norma.',
        areas: ['servizi-digitali'],
      },
    ],
    principles: adempioPrinciples,
    process: [
      { title: 'Richiesta', text: 'Attraverso il portale Adempio i nostri clienti professionisti inviano le richieste di servizio per i loro clienti.' },
      { title: 'Verifica', text: 'Le richieste di servizio una volta ricevute vengono attentamente istruite dai nostri operatori per individuare i relativi adempimenti necessari e comunicati tramite il portale direttamente al professionista.' },
      { title: 'Predisposizione e invio', text: 'I nostri operatori, individuati gli adempimenti e una volta ricevuta l’approvazione dai professionisti, predispongono ed inviano le pratiche alla Pubblica Amministrazione.' },
      { title: 'Risultato', text: 'I nostri clienti professionisti, attraverso la dashboard del portale Adempio, possono consultare gli stati d’avanzamento e gestire le relative ricevute di esecuzione dell’adempimento.' },
    ],
  },
}

export const territory = {
  title: 'Sul territorio',
  text: 'Milano, Mantova, Modena, Brescia, Darfo Boario Terme, Bologna e Reggio Emilia: un riferimento diretto sul territorio e un’area clienti online sul portale Adempio.',
}


export const contactIntro = 'Scrivici: analizzeremo il tuo caso e ti indicheremo gli adempimenti necessari.'
export const serviceCta = 'Contattaci ora per maggiori informazioni e per attivare subito il Servizio!'

export const iban = {
  iban: 'IT71S0200811510000012861517',
  holder: 'Agenzia Impresa Srl',
  reason: 'Nr. Ordine/Cliente/tipo di pratica richiesta',
}

