// Unico punto di configurazione del consenso cookie: categorie, servizi e cookie di ogni
// servizio. Banner, pannello preferenze e segnaposto dei contenuti esterni sono generati da qui.
//
// Per aggiungere un servizio: una voce in SERVICES (vedi src/consent/README.md). Aggiungere o
// togliere un servizio cambia la "firma" dei servizi, quindi il banner viene riproposto a tutti.

export const CATEGORY_ORDER = ['necessary', 'preferences', 'statistics', 'marketing']

// Versione del testo della Cookie Policy: se cambia, il banner viene riproposto.
// Il backend (POST /consent/config) può sostituirla con la sua.
export const POLICY_VERSION = import.meta.env.VITE_COOKIE_POLICY_VERSION || '1.0.0'

export const CONSENT_COOKIE = 'cc_consent'
/** Un rifiuto di tutto ciò che è facoltativo dura 6 mesi, qualsiasi accettazione 12 mesi. */
export const REJECT_MAX_AGE_DAYS = 182
export const ACCEPT_MAX_AGE_DAYS = 365

export const SERVICES = [
  {
    id: 'site',
    category: 'necessary',
    name: 'Agenzia Impresa',
    provider: 'Agenzia Impresa SRL',
    description: 'Funzionamento del sito e memorizzazione delle tue scelte.',
    cookies: [
      {
        name: CONSENT_COOKIE,
        party: 'first',
        type: 'cookie',
        duration: '6 mesi (rifiuto) / 12 mesi (accettazione)',
        purpose: 'Memorizza le tue scelte sui cookie (identificativo anonimo, categorie, versione della policy, data).',
      },
      {
        name: 'cc_queue',
        party: 'first',
        type: 'localStorage',
        duration: 'Fino all’invio',
        purpose: 'Conserva temporaneamente la registrazione del consenso se l’invio non riesce.',
      },
    ],
  },
  {
    id: 'google-maps',
    category: 'marketing',
    name: 'Google Maps',
    provider: 'Google Ireland Limited',
    privacyPolicyUrl: 'https://policies.google.com/privacy',
    description:
      'Mappe interattive nelle pagine delle sedi. Google raccoglie dati sul dispositivo e sulla navigazione e può usare i suoi cookie anche per altre finalità.',
    cookies: [
      {
        name: 'NID',
        party: 'third',
        type: 'cookie',
        duration: '6 mesi',
        purpose: 'Memorizza preferenze e informazioni usate da Google, anche per la pubblicità.',
      },
      {
        name: 'AEC',
        party: 'third',
        type: 'cookie',
        duration: '6 mesi',
        purpose: 'Sicurezza: impedisce che le richieste vengano fatte da terzi a nome dell’utente.',
      },
    ],
  },
]

/** Categorie che hanno davvero dei servizi: solo queste vengono mostrate al visitatore. */
export function activeCategories() {
  return CATEGORY_ORDER.filter((c) => SERVICES.some((s) => s.category === c))
}

/** Cambia quando si aggiunge o toglie un servizio: serve a richiedere di nuovo il consenso. */
export function servicesSignature() {
  return SERVICES.map((s) => `${s.id}:${s.category}`).sort().join(',')
}

export function serviceById(id) {
  return SERVICES.find((s) => s.id === id)
}
