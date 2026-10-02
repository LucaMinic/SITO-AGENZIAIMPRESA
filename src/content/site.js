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
export const sedi = [
  {
    slug: 'milano',
    city: 'Milano',
    note: 'Sede legale',
    locations: [{ address: 'Via Feltre 32', cap: '20132', city: 'Milano', phone: '02 86453881' }],
    login: 'http://agenziaimpresa.milano.eccosolution.it',
    maps: maps.milano,
  },
  {
    slug: 'mantova',
    city: 'Mantova',
    locations: [{ address: 'Piazza Alcide de Gasperi 23 / 24', cap: '46100', city: 'Mantova', phone: '0376 222020' }],
    login: 'http://agenziaimpresa.mantova.eccosolution.it',
    maps: maps.mantova,
  },
  {
    slug: 'modena',
    city: 'Modena',
    locations: [{ address: 'Via Carlo Zucchi 21 Scala B', cap: '41123', city: 'Modena', phone: '0376 222020' }],
    login: 'http://agenziaimpresa.mantova.eccosolution.it',
    maps: maps.modena,
  },
  {
    slug: 'brescia',
    city: 'Brescia',
    locations: [
      { address: 'Via Romanino 1', cap: '25122', city: 'Brescia', phone: '030 3771630' },
      { address: 'Via Roccole 76/A', cap: '25047', city: 'Darfo Boario Terme', phone: '0364 535740' },
    ],
    login: 'http://agenziaimpresa.brescia.eccosolution.it',
    maps: maps.brescia,
  },
  {
    slug: 'bologna',
    city: 'Bologna',
    locations: [{ address: 'Via Amendola 8/E', cap: '40121', city: 'Bologna (BO)', phone: '051.4211114' }],
    login: 'http://agenziaimpresa.mantova.eccosolution.it',
    maps: maps.bologna,
  },
]

export const allLocations = sedi.flatMap((s) => s.locations.map((l) => ({ ...l, sede: s.slug })))

// Link della voce "Registrati" nel menu.
// TODO: sostituire con il link definitivo indicato dal cliente.
export const REGISTER_URL = '/contatti?oggetto=Registrazione'

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

const principles = [
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

export const solutions = {
  imprese: {
    slug: 'imprese',
    label: 'Imprese',
    title: 'Soluzioni per le imprese',
    teaser: 'Scopri le Soluzioni Digitali di AgenziaImpresa sviluppate appositamente per le Imprese.',
    text: 'Agenziaimpresa studia e sviluppa Soluzioni Digitali all’avanguardia per rispondere alle esigenze specifiche delle imprese. Oltre ad essere Funzionali e a norma di legge, i Prodotti ed i Servizi che AgenziaImpresa Buffetti Group offre alle sue imprese clienti sono accomunate da tre principi fondamentali:',
    principles,
  },
  professionisti: {
    slug: 'professionisti',
    label: 'Professionisti',
    title: 'Soluzioni per Professionisti',
    teaser: 'Scopri le Soluzioni Digitali di AgenziaImpresa sviluppate appositamente per i Professionisti.',
    text: 'Agenziaimpresa studia e sviluppa Soluzioni Digitali all’avanguardia per rispondere alle esigenze specifiche dei Professionisti. Oltre ad essere Funzionali e a norma di legge, i Prodotti ed i Servizi che AgenziaImpresa Buffetti Group offre alle sue imprese clienti sono accomunate da tre principi fondamentali:',
    principles,
  },
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

