// Testi del banner, del pannello preferenze e dei segnaposto dei contenuti esterni.

export const categoryTexts = {
  necessary: {
    title: 'Necessari',
    description: 'Indispensabili per il funzionamento del sito e per ricordare le tue scelte. Non possono essere disattivati.',
  },
  preferences: {
    title: 'Preferenze',
    description: 'Permettono di ricordare impostazioni facoltative per migliorare la tua esperienza.',
  },
  statistics: {
    title: 'Statistici',
    description: 'Ci aiutano a capire, in forma aggregata, come viene usato il sito.',
  },
  marketing: {
    title: 'Marketing e contenuti esterni',
    description:
      'Permettono di usare Google reCAPTCHA, la protezione antispam dei moduli di contatto, e le mappe di Google Maps nelle pagine delle sedi. Google può usare i suoi cookie anche per pubblicità personalizzata.',
  },
}

export const ui = {
  bannerTitle: 'Questo sito usa i cookie',
  bannerText:
    'Usiamo cookie tecnici, necessari al funzionamento del sito. Con il tuo consenso usiamo anche cookie di terze parti di Google (reCAPTCHA, per proteggere i moduli di contatto dallo spam, e Google Maps, per le mappe delle sedi), che Google può usare anche per pubblicità personalizzata. Puoi accettare, rifiutare o scegliere quali attivare. Chiudendo questo avviso con la X restano attivi solo i cookie tecnici.',
  policyLink: 'Cookie Policy',
  acceptAll: 'Accetta tutti',
  rejectAll: 'Rifiuta tutti',
  customize: 'Personalizza',
  closeBanner: 'Chiudi: mantieni solo i cookie tecnici',
  prefsTitle: 'Preferenze cookie',
  prefsIntro:
    'Scegli quali categorie di cookie consentire. Puoi cambiare idea in qualsiasi momento dal link "Preferenze cookie" nel footer.',
  alwaysActive: 'Sempre attivi',
  savePrefs: 'Salva scelte',
  closePrefs: 'Chiudi',
  showDetails: 'Vedi servizi e cookie',
  provider: 'Fornitore',
  cookieName: 'Nome',
  cookieDuration: 'Durata',
  cookiePurpose: 'Finalità',
  firstParty: 'prima parte',
  thirdParty: 'terza parte',
  privacyPolicy: 'Informativa privacy',
  footerLink: 'Preferenze cookie',
  placeholderTitle: 'Contenuto di {service} bloccato',
  placeholderText:
    'Per vedere questo contenuto devi accettare i cookie della categoria "{category}". {provider} potrà usare cookie anche per pubblicità personalizzata.',
  placeholderButton: 'Attiva contenuto',
  placeholderOpenExternal: 'Apri su {service}',
}

export function fill(text, values) {
  return text.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '')
}
