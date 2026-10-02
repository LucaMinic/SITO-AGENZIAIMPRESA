// Contenuti istituzionali, ripresi dal sito agenziaimpresa.com (ottobre 2026).
// Modifiche concordate col cliente: riferimenti a "Gruppo APM" sostituiti con
// "AgenziaImpresa Buffetti Group"; numeri, certificazioni ISO/231 e "Microsoft ISV
// Partner" rimossi; shop/webinar eliminati; refusi corretti.
import { maps } from './maps.generated.js'

export const SITE_URL = 'https://www.agenziaimpresa.com'
export const BRAND = 'AgenziaImpresa'
export const BRAND_GROUP = 'AgenziaImpresa Buffetti Group'

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
    login: 'http://agenziaimpresa.milano.eccosolution.it',
    maps: maps.milano,
  },
  {
    slug: 'mantova',
    city: 'Mantova',
    locations: [{ address: 'Piazza Alcide de Gasperi 23 / 24', cap: '46100', city: 'Mantova', phone: '0376 222020', coords: [45.15186, 10.77625] }],
    login: 'http://agenziaimpresa.mantova.eccosolution.it',
    maps: maps.mantova,
  },
  {
    slug: 'modena',
    city: 'Modena',
    locations: [{ address: 'Via Carlo Zucchi 21 Scala B', cap: '41123', city: 'Modena', phone: '0376 222020', coords: [44.65284, 10.91058] }],
    login: 'http://agenziaimpresa.mantova.eccosolution.it',
    maps: maps.modena,
  },
  {
    slug: 'brescia',
    city: 'Brescia',
    locations: [
      { address: 'Via Romanino 1', cap: '25122', city: 'Brescia', phone: '030 3771630', coords: [45.53342, 10.21401] },
      { address: 'Via Roccole 76/A', cap: '25047', city: 'Darfo Boario Terme', phone: '0364 535740', coords: [45.89657, 10.18912] },
    ],
    login: 'http://agenziaimpresa.brescia.eccosolution.it',
    maps: maps.brescia,
  },
  {
    slug: 'bologna',
    city: 'Bologna',
    locations: [{ address: 'Via Amendola 8/E', cap: '40121', city: 'Bologna (BO)', phone: '051.4211114', coords: [44.50399, 11.33796] }],
    login: 'http://agenziaimpresa.mantova.eccosolution.it',
    maps: maps.bologna,
  },
]

export const allLocations = sedi.flatMap((s) => s.locations.map((l) => ({ ...l, sede: s.slug })))

// Link della voce "Registrati" nel menu.
// Registrazione sulla piattaforma Adempio (link indicato dal cliente, ottobre 2026).
export const REGISTER_URL = 'https://www.adempio.it/#/register'

// Dichiarazione di accessibilità (EAA – D.Lgs. 82/2022).
// TODO: indicare l'indirizzo email per le segnalazioni quando fornito dal cliente.
export const accessibility = {
  email: '',
  date: '2026-10-02',
  reviewed: '2026-10-02',
}

// Mappe Google delle sedi: false = visibili subito; true = caricate solo dopo un clic
// (da usare se il banner dei cookie non gestisce il consenso per Google Maps).
export const MAPS_REQUIRE_CONSENT = false

export const telHref = (phone) => 'tel:+39' + phone.replace(/[^\d]/g, '')

// Raggruppamento delle 10 aree per la navigazione (nuova information architecture).
export const families = [
  { id: 'impresa', title: 'Impresa e Registri' },
  { id: 'fisco', title: 'Fisco e Patrimonio' },
  { id: 'autorizzazioni', title: 'Autorizzazioni, Ambiente ed Estero' },
  { id: 'certificati', title: 'Certificati, Uffici e Digitale' },
]

export const home = {
  claim:
    'Servizi di digitalizzazione dei processi telematici in ambito amministrativo rivolti alla Pubblica Amministrazione',
}

export const about = {
  quote:
    'Offriamo da sempre Soluzioni Digitali all’avanguardia in grado di rispondere a tutte le esigenze operative a norma di legge in continua evoluzione.',
  storyTitle: 'Una storia di Passione Successi e Soddisfazioni.',
  story: [
    'AgenziaImpresa Buffetti Group è attiva da anni nel settore dei servizi digitali, affianchiamo da sempre le Imprese e gli Studi Professionali nella gestione e nella conservazione di tutti i documenti digitali prodotti nel corso della loro attività.',
    'Con l’avanzamento dei processi di digitalizzazione le Aziende e gli Studi Professionali sono obbligati ad aggiornarsi di continuo partendo dagli adempimenti telematici rivolti alla PA, alla gestione di PEC, all’utilizzo di FIRME DIGITALI, alla CONSERVAZIONE DIGITALE e alla FATTURAZIONE ELETTRONICA.',
    'AgenziaImpresa tramite la piattaforma WEB EccoSolution offre in un unico “luogo” servizi in grado di rispondere a tutte le esigenze operative a norma di legge mediante i più moderni processi di Digitalizzazione all’avanguardia.',
    'Nel 2020 con la fusione di 3 società, amplia l’offerta rivolta ai propri clienti introducendo Servizi di Comunicazione e Programmi di Fidelizzazione digitale.',
  ],
  solutionsTitle: 'Soluzioni Digitali per Imprese e Professionisti',
}

// Contenuti delle pagine Soluzioni. Testi ampliati su richiesta del cliente (ottobre 2026),
// basati esclusivamente sui servizi realmente offerti (nessun dato, cliente o certificazione).
const principlesImprese = [
  {
    title: 'Semplicità',
    text: 'L’interfaccia di ogni prodotto è sviluppata per essere estremamente semplice ed intuitiva, inoltre i clienti possono fruire dell’assistenza del nostro personale specializzato per tutte le esigenze.',
  },
  {
    title: 'Funzionalità',
    text: 'Ogni prodotto sviluppato da AgenziaImpresa Buffetti Group rappresenta uno strumento funzionale in grado di rispondere alle esigenze più articolate.',
  },
  {
    title: 'Efficacia',
    text: 'Grazie alle Soluzioni di AgenziaImpresa Buffetti Group, le imprese Clienti possono usufruire di uno strumento efficiente ed efficace.',
  },
]

const principlesProfessionisti = [
  {
    title: 'Semplicità',
    text: 'L’interfaccia di ogni prodotto è sviluppata per essere estremamente semplice ed intuitiva, inoltre lo Studio può fruire dell’assistenza del nostro personale specializzato per tutte le esigenze.',
  },
  {
    title: 'Funzionalità',
    text: 'Ogni prodotto sviluppato da AgenziaImpresa Buffetti Group rappresenta uno strumento funzionale in grado di rispondere alle esigenze più articolate dello Studio e dei suoi clienti.',
  },
  {
    title: 'Efficacia',
    text: 'Grazie alle Soluzioni di AgenziaImpresa Buffetti Group, gli Studi Professionali possono usufruire di uno strumento efficiente ed efficace.',
  },
]

// Modalità di lavoro, comune alle due pagine.
export const process = [
  {
    title: 'Richiesta',
    text: 'Ci contatti tramite il modulo, per telefono o rivolgendoti alla sede più vicina, indicando la pratica di cui hai bisogno.',
  },
  {
    title: 'Verifica',
    text: 'Verifichiamo documentazione, requisiti e procedure applicabili presso gli enti competenti.',
  },
  {
    title: 'Predisposizione e invio',
    text: 'Predisponiamo la pratica e la trasmettiamo in via telematica all’ufficio competente.',
  },
  {
    title: 'Esito',
    text: 'Ti aggiorniamo sull’esito della pratica e ti trasmettiamo ricevute e documenti.',
  },
]

export const solutions = {
  imprese: {
    slug: 'imprese',
    label: 'Imprese',
    title: 'Soluzioni per le imprese',
    teaser: 'Scopri le Soluzioni Digitali di AgenziaImpresa sviluppate appositamente per le Imprese.',
    text: 'Agenziaimpresa studia e sviluppa Soluzioni Digitali all’avanguardia per rispondere alle esigenze specifiche delle imprese. Oltre ad essere Funzionali e a norma di legge, i Prodotti ed i Servizi che AgenziaImpresa Buffetti Group offre alle sue imprese clienti sono accomunati da tre principi fondamentali:',
    intro:
      'Dalla costituzione della società alle autorizzazioni per avviare l’attività, dagli adempimenti ambientali ai rapporti con l’estero: AgenziaImpresa gestisce per conto dell’impresa le pratiche telematiche rivolte alla Pubblica Amministrazione, così che imprenditori e uffici amministrativi possano dedicare tempo ed energie al proprio lavoro.',
    audience: [
      'Società di capitali e di persone',
      'Ditte individuali e imprese artigiane',
      'Esercizi commerciali e pubblici esercizi',
      'Strutture ricettive',
      'Imprese che operano con l’estero',
      'Imprese soggette ad adempimenti ambientali',
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
    principles: principlesImprese,
  },
  professionisti: {
    slug: 'professionisti',
    label: 'Professionisti',
    title: 'Soluzioni per Professionisti',
    teaser: 'Scopri le Soluzioni Digitali di AgenziaImpresa sviluppate appositamente per i Professionisti.',
    text: 'Agenziaimpresa studia e sviluppa Soluzioni Digitali all’avanguardia per rispondere alle esigenze specifiche dei Professionisti. Oltre ad essere Funzionali e a norma di legge, i Prodotti ed i Servizi che AgenziaImpresa Buffetti Group offre agli Studi Professionali sono accomunati da tre principi fondamentali:',
    intro:
      'Commercialisti, consulenti e studi professionali gestiscono ogni giorno pratiche telematiche per conto dei propri clienti. AgenziaImpresa diventa un’estensione operativa dello studio: predispone e deposita le pratiche, reperisce visure e certificati presso gli uffici pubblici e mette a disposizione gli strumenti digitali necessari, lasciando al professionista il rapporto con il cliente e la consulenza.',
    audience: [
      'Commercialisti e ragionieri',
      'Consulenti del lavoro',
      'Studi professionali e associati',
      'Società di consulenza',
      'Centri di elaborazione dati',
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
    principles: principlesProfessionisti,
  },
}

export const territory = {
  title: 'Sul territorio',
  text: 'Milano, Mantova, Modena, Brescia, Darfo Boario Terme e Bologna: un riferimento diretto sul territorio e un’area clienti online sulla piattaforma EccoSolution.',
}

export const apriAgenzia = {
  title: 'Entra nel nostro mondo',
  text: 'Con AGENZIA IMPRESA potrai diventare un professionista nel mondo della digitalizzazione dei processi telematici in ambito amministrativo rivolti alla Pubblica amministrazione. Avrai la possibilità di aprire una tua impresa e offrire ai tuoi clienti nuovi servizi innovativi. Attraverso un nostro team di esperti e con le nostre soluzioni in cloud siamo in grado di fornirti tutti gli strumenti necessari per diventare uno dei protagonisti del nostro mercato di riferimento.',
}

export const contactIntro = 'Scrivici il tuo messaggio, ti proporremo la Soluzione Digitale che stai cercando.'
export const serviceCta = 'Contattaci ora per maggiori informazioni e per attivare subito il Servizio!'

export const iban = {
  iban: 'IT71S0200811510000012861517',
  holder: 'Agenzia Impresa Srl',
  reason: 'Nr. Ordine/Cliente/tipo di pratica richiesta',
}

