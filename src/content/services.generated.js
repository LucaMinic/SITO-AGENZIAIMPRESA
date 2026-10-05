// Aree, sotto-aree e servizi: Listino 2026 di Agenzia Impresa (nomi, ordine e gerarchia; prezzi esclusi).
// areas[].services = sotto-aree (pagina propria); services[].blocks = riga descrittiva (p) e servizi (item);
// areas[].items = servizi delle aree senza sotto-aree (Marchi, Varie).

export const areas = [
  {
    "slug": "registro-imprese-comunica",
    "title": "Area Registro Imprese",
    "oldSlug": "area-registro-imprese-comunica",
    "services": [
      "deposito-atti-reg-imprese",
      "deposito-comunicazioni-reg-imprese",
      "deposito-denunce-rea-per-attivita-non-regolate",
      "deposito-denunce-rea-per-attivita-regolate",
      "deposito-comunicazioni-rea",
      "deposito-comunicazione-anagrafiche-dati-iva",
      "deposito-comunicazione-anagrafiche-dati-inps",
      "deposito-comunicazione-anagrafiche-dati-inail",
      "deposito-bilancio",
      "trasformazione-file-xbrl",
      "compilazione-elenco-soci",
      "codice-lei-legal-entity-identifier",
      "assistenza-normativa-e-procedurale",
      "diritto-durgenza"
    ]
  },
  {
    "slug": "pratiche-suap",
    "title": "Area Pratiche SUAP",
    "oldSlug": "area-pratiche-suap",
    "services": [
      "attivita-di-vendita-vicinato-commercio-elettronico-commercio-ingrosso",
      "attivita-artigianali-produttive",
      "attivita-di-intrattenimento",
      "attivita-di-vendita-medie-e-grandi-strutture",
      "attivita-ricettive-alberghi-ostelli",
      "attivita-ricettive-casa-vacanze-affitta-camere-airbnb",
      "somministrazione-alimenti-e-bevande",
      "altre-attivita-ex-ps-agenzia-daffari",
      "altre-autorizzazioni-comunali-scia",
      "altre-prestazioni-professionali-suap",
      "carta-esercizio-ambulanti",
      "assistenza-normativa-e-procedurale",
      "diritto-durgenza"
    ]
  },
  {
    "slug": "marchi",
    "title": "Area Marchi",
    "oldSlug": "area-marchi",
    "services": [],
    "items": [
      "Assistenza Registrazione Marchi",
      "Verifica preventiva dell’esistenza di registrazione di Brand seguita da registrazione"
    ]
  },
  {
    "slug": "agenzia-entrate-adm",
    "title": "Area Agenzia Entrate – ADM",
    "oldSlug": "area-agenzia-entrate-adm",
    "services": [
      "ufficio-successioni",
      "ufficio-del-registro",
      "iva",
      "adm",
      "ries",
      "diritto-durgenza"
    ]
  },
  {
    "slug": "agenzia-territorio",
    "title": "Area Agenzia Territorio",
    "oldSlug": "area-agenzia-territorio",
    "services": [
      "catasto",
      "conservatoria-e-registri-immobiliari",
      "diritto-durgenza"
    ]
  },
  {
    "slug": "servizi-ambientali",
    "title": "Area Servizi Ambientali",
    "oldSlug": "area-servizi-ambientali",
    "services": [
      "rentri",
      "r-a-e-e-a-e-e-registro-pile-ed-apparecchiature-elettroniche",
      "albo-gestori-ambientali",
      "mud",
      "altre-prestazioni-professionali",
      "diritto-durgenza"
    ]
  },
  {
    "slug": "servizio-estero",
    "title": "Area Servizio Estero",
    "oldSlug": "area-servizio-estero",
    "services": [
      "consolati-ambasciate",
      "documenti-commerciali",
      "diritto-durgenza"
    ]
  },
  {
    "slug": "varie",
    "title": "Area Varie",
    "oldSlug": "area-varie",
    "services": [],
    "items": [
      "Accesso agli uffici degli Enti Pubblici",
      "Accesso agli uffici in altri comuni",
      "Pagamento c/o banche – poste",
      "Pagamento – PAGO PA",
      "Codice LEI - Legal Entity Identifier - (richiesta – rinnovo con attestato)",
      "Pubblicazioni on line Gazzetta Ufficiale",
      "Estratti e vidimazioni presso Notaio",
      "Traduzione documenti legali",
      "Piantine in scala a cura di professionisti abilitati",
      "Diritto d’urgenza",
      "Consegna/ritiro documenti",
      "Diritto fisso"
    ]
  },
  {
    "slug": "uffici-esterni",
    "title": "Area Uffici Esterni",
    "oldSlug": "area-uffici-esterni",
    "services": [
      "camera-di-commercio-industria-e-artigianato",
      "comune-anagrafiche-certificazioni",
      "tribunale",
      "agenzia-entrate"
    ]
  },
  {
    "slug": "operatori-finanziari",
    "title": "Area Operatori Finanziari",
    "oldSlug": null,
    "services": [
      "servizi-in-outsourcing"
    ]
  },
  {
    "slug": "servizi-digitali",
    "title": "Area Servizi Digitali",
    "oldSlug": "area-servizi-digitali",
    "services": [
      "firma-digitale-e-marche-temporali",
      "pec"
    ]
  }
]

export const services = {
  "assistenza-normativa-e-procedurale": {
    "title": "Assistenza e approfondimenti sui quesiti specifici inerenti gli aspetti normativi e procedurali",
    "oldSlug": "assistenza-e-approfondimenti-sui-quesiti-specifici-inerenti-gli-aspetti-normativi-e-procedurali",
    "blocks": [
      {
        "type": "item",
        "text": "Verifica presso gli enti delle corrette procedure, verifiche soggettive, verifica requisito professionale, verifica di fattibilità allo svolgimento dell’attività d’impresa ecc."
      }
    ],
    "transversal": true
  },
  "diritto-durgenza": {
    "title": "Diritto d’urgenza",
    "oldSlug": "diritto-durgenza",
    "blocks": [
      {
        "type": "p",
        "text": "A partire dai 2 giorni al giorno di scadenza"
      }
    ],
    "transversal": true
  },
  "deposito-atti-reg-imprese": {
    "title": "Deposito Atti Registro Imprese",
    "oldSlug": "deposito-atti-reg-imprese",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "p",
        "text": "Comprensivo di istruttoria compilazione e deposito"
      },
      {
        "type": "item",
        "text": "Costituzioni"
      },
      {
        "type": "item",
        "text": "Modifiche Statutarie"
      },
      {
        "type": "item",
        "text": "Cariche Sociali"
      },
      {
        "type": "item",
        "text": "Poteri organo amministrativo"
      },
      {
        "type": "item",
        "text": "Fusioni"
      },
      {
        "type": "item",
        "text": "Scissioni"
      },
      {
        "type": "item",
        "text": "Cessioni Azienda"
      },
      {
        "type": "item",
        "text": "Conferimenti Azienda"
      },
      {
        "type": "item",
        "text": "Cessioni Quote/Trasferimenti Mortis Causa"
      },
      {
        "type": "item",
        "text": "Liquidazioni-scioglimenti - cancellazioni"
      },
      {
        "type": "item",
        "text": "Bilancio Finale di Liquidazione"
      },
      {
        "type": "item",
        "text": "Procedure Concorsuali"
      },
      {
        "type": "item",
        "text": "Start Up - PMI Innovative"
      },
      {
        "type": "item",
        "text": "Cessione Crediti"
      }
    ]
  },
  "deposito-comunicazioni-reg-imprese": {
    "title": "Deposito Comunicazioni Registro Imprese",
    "oldSlug": "deposito-comunicazioni-reg-imprese",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "p",
        "text": "Comprensivo di istruttoria compilazione e deposito"
      },
      {
        "type": "item",
        "text": "Modifica dati anagrafici"
      },
      {
        "type": "item",
        "text": "Comunicazione PEC"
      },
      {
        "type": "item",
        "text": "Versamento Capitale"
      },
      {
        "type": "item",
        "text": "Socio Unico - Pluralità dei Soci"
      },
      {
        "type": "item",
        "text": "Titolare Effettivo"
      },
      {
        "type": "item",
        "text": "Direzione e Coordinamento"
      },
      {
        "type": "item",
        "text": "Depositi a Rettifica Atti"
      },
      {
        "type": "item",
        "text": "Cambio Sede"
      }
    ]
  },
  "deposito-denunce-rea-per-attivita-non-regolate": {
    "title": "Deposito Denunce REA per attività non Regolate",
    "oldSlug": "deposito-denunce-rea-per-attivita-non-regolate",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "p",
        "text": "Comprensivo di istruttoria compilazione e deposito"
      },
      {
        "type": "item",
        "text": "Iscrizione Ditte Individuali con Inizio attività - Variazione Attività"
      },
      {
        "type": "item",
        "text": "Apertura - Variazione UL"
      },
      {
        "type": "item",
        "text": "Albo Artigiani sia per Società che per Ditte individuali"
      }
    ]
  },
  "deposito-denunce-rea-per-attivita-regolate": {
    "title": "Deposito Denunce REA per attività Regolate",
    "oldSlug": "deposito-denunce-rea-per-attivita-regolate",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "p",
        "text": "Comprensivo di istruttoria compilazione e deposito dell’apposita SCIA Camerale"
      },
      {
        "type": "item",
        "text": "Iscrizione Ditte Individuali con Inizio attività - Variazione Attività"
      },
      {
        "type": "item",
        "text": "Apertura - Variazione UL"
      },
      {
        "type": "item",
        "text": "Variazione Responsabile Tecnico"
      },
      {
        "type": "item",
        "text": "Albo Artigiani sia per Società che per Ditte Individuali"
      }
    ]
  },
  "deposito-comunicazioni-rea": {
    "title": "Deposito Comunicazioni REA",
    "oldSlug": "deposito-comunicazioni-rea",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "p",
        "text": "Comprensivo di istruttoria compilazione e deposito"
      },
      {
        "type": "item",
        "text": "Iscrizione Ditte Individuali inattive"
      },
      {
        "type": "item",
        "text": "Cancellazioni di ditte individuali"
      },
      {
        "type": "item",
        "text": "Cessazione Attività"
      },
      {
        "type": "item",
        "text": "Cessazione UL Società e Ditte Individuali"
      },
      {
        "type": "item",
        "text": "Modifiche di ditte individuali"
      },
      {
        "type": "item",
        "text": "Iscrizione - Variazione - Cessazione Collaboratori Familiari per le Ditte Individuali"
      }
    ]
  },
  "deposito-comunicazione-anagrafiche-dati-iva": {
    "title": "Deposito Comunicazione anagrafiche dati IVA",
    "oldSlug": "deposito-comunicazione-anagrafiche-dati-iva",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "AdE comunica"
      }
    ]
  },
  "deposito-comunicazione-anagrafiche-dati-inps": {
    "title": "Deposito Comunicazione anagrafiche dati INPS",
    "oldSlug": "deposito-comunicazione-anagrafiche-dati-inps",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "INPS comunica"
      }
    ]
  },
  "deposito-comunicazione-anagrafiche-dati-inail": {
    "title": "Deposito Comunicazione anagrafiche dati INAIL",
    "oldSlug": "deposito-comunicazione-anagrafiche-dati-inail",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "INAIL comunica"
      }
    ]
  },
  "deposito-bilancio": {
    "title": "Deposito Bilancio",
    "oldSlug": "deposito-bilancio",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "Micro - Abbreviato – Ordinario - Consolidato"
      }
    ]
  },
  "trasformazione-file-xbrl": {
    "title": "Trasformazione file in XBRL",
    "oldSlug": "trasformazione-file-xbrl",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "Per abbreviato-ordinario-consolidato"
      },
      {
        "type": "item",
        "text": "Per micro-imprese"
      }
    ]
  },
  "compilazione-elenco-soci": {
    "title": "Compilazione Elenco Soci",
    "oldSlug": "compilazione-elenco-soci",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "Fino a 10 Soci"
      },
      {
        "type": "item",
        "text": "Oltre 10"
      }
    ]
  },
  "codice-lei-legal-entity-identifier": {
    "title": "Codice LEI – Legal Entity Identifier",
    "oldSlug": "codice-lei-legal-entity-identifier",
    "area": "registro-imprese-comunica",
    "blocks": [
      {
        "type": "item",
        "text": "Richiesta – Rinnovo con attestato – Ripristino – Trasferimento"
      }
    ]
  },
  "attivita-di-vendita-vicinato-commercio-elettronico-commercio-ingrosso": {
    "title": "Attività di vendita (vicinato, commercio elettronico, commercio ingrosso)",
    "oldSlug": "attivita-di-vendita-vicinato-commercio-elettronico-commercio-ingrosso",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "attivita-artigianali-produttive": {
    "title": "Attività artigianali/produttive",
    "oldSlug": "attivita-artigianali-produttive",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "attivita-di-intrattenimento": {
    "title": "Attività di intrattenimento",
    "oldSlug": "attivita-di-intrattenimento",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "attivita-di-vendita-medie-e-grandi-strutture": {
    "title": "Attività di vendita (medie e grandi strutture)",
    "oldSlug": null,
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "attivita-ricettive-alberghi-ostelli": {
    "title": "Attività ricettive (alberghi, ostelli)",
    "oldSlug": "attivita-ricettive-alberghi-ostelli",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "attivita-ricettive-casa-vacanze-affitta-camere-airbnb": {
    "title": "Attività ricettive (casa vacanze, affitta camere, Airbnb)",
    "oldSlug": "attivita-ricettive-casa-vacanze-affitta-camere-airbnb",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività per alberghi con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "somministrazione-alimenti-e-bevande": {
    "title": "Somministrazione alimenti e bevande",
    "oldSlug": "somministrazione-alimenti-e-bevande",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "altre-attivita-ex-ps-agenzia-daffari": {
    "title": "Altre attività – EX PS (Agenzia d’affari)",
    "oldSlug": "altre-attivita-ex-ps-agenzia-daffari",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica"
      },
      {
        "type": "item",
        "text": "Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente"
      },
      {
        "type": "item",
        "text": "Comunicazione di cessazione"
      }
    ]
  },
  "altre-autorizzazioni-comunali-scia": {
    "title": "Altre autorizzazioni COMUNALI - SCIA",
    "oldSlug": "altre-autorizzazioni-comunali-scia",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "SCIA pratica occupazione suolo pubblico"
      },
      {
        "type": "item",
        "text": "SCIA pratica insegne"
      }
    ]
  },
  "altre-prestazioni-professionali-suap": {
    "title": "Altre Prestazioni Professionali",
    "oldSlug": null,
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Tecnico impatto acustico"
      },
      {
        "type": "item",
        "text": "Tecnico piantina"
      }
    ]
  },
  "carta-esercizio-ambulanti": {
    "title": "Carta esercizio ambulanti",
    "oldSlug": "carta-esercizio-ambulanti",
    "area": "pratiche-suap",
    "blocks": [
      {
        "type": "item",
        "text": "Rilascio / Variazione"
      },
      {
        "type": "item",
        "text": "Attestazione annuale / Revoca"
      }
    ]
  },
  "ufficio-successioni": {
    "title": "Successioni",
    "oldSlug": "ufficio-successioni",
    "area": "agenzia-entrate-adm",
    "blocks": [
      {
        "type": "item",
        "text": "Predisposizione dichiarazioni di successione"
      },
      {
        "type": "item",
        "text": "Deposito telematico della dichiarazione di successione"
      },
      {
        "type": "item",
        "text": "Richiesta di copie e certificati presso Ufficio Successioni"
      }
    ]
  },
  "ufficio-del-registro": {
    "title": "Ufficio del Registro",
    "oldSlug": "ufficio-del-registro",
    "area": "agenzia-entrate-adm",
    "blocks": [
      {
        "type": "item",
        "text": "Registrazione atti - Privati, Pubblici - (presso sportello)"
      },
      {
        "type": "item",
        "text": "Registrazione Contratti locazione / comodato (presso sportello)"
      },
      {
        "type": "item",
        "text": "Registrazione Contratti locazione / comodato (telematico)"
      },
      {
        "type": "item",
        "text": "Pagamento imposta telematica delle annualità successive, proroghe, risoluzioni per i contratti di locazione"
      },
      {
        "type": "item",
        "text": "Registrazione Preliminare di compravendita Immobiliare (presso sportello)"
      },
      {
        "type": "item",
        "text": "Registrazione Preliminare di compravendita Immobiliare (telematico)"
      }
    ]
  },
  "iva": {
    "title": "IVA",
    "oldSlug": "iva",
    "area": "agenzia-entrate-adm",
    "blocks": [
      {
        "type": "item",
        "text": "Inizio, variazioni, chiusure P.IVA"
      }
    ]
  },
  "adm": {
    "title": "ADM",
    "oldSlug": "adm",
    "area": "agenzia-entrate-adm",
    "blocks": [
      {
        "type": "item",
        "text": "Comunicazioni Intrastat Acquisti – (modelli precompilati dal Cliente fino a 5 righe di dettaglio)"
      },
      {
        "type": "item",
        "text": "Comunicazioni Intrastat Vendite – (modelli precompilati dal Cliente fino a 5 righe di dettaglio)"
      },
      {
        "type": "item",
        "text": "Comunicazioni Intrastat Acquisti (solo invio predisposto dal cliente)"
      },
      {
        "type": "item",
        "text": "Comunicazioni Intrastat Vendite (solo invio predisposto dal cliente)"
      },
      {
        "type": "item",
        "text": "Comunicazioni Intrastat Acquisti (da compilare sulla base delle fatture pervenute direttamente dal cliente)"
      },
      {
        "type": "item",
        "text": "Comunicazioni Intrastat Vendite (da compilare sulla base delle fatture pervenute direttamente dal cliente)"
      },
      {
        "type": "item",
        "text": "Licenza Alcolici (somministrazione e vendita alimentari)"
      }
    ]
  },
  "ries": {
    "title": "Ries",
    "oldSlug": "ries",
    "area": "agenzia-entrate-adm",
    "blocks": [
      {
        "type": "item",
        "text": "Richiesta / Variazione / Rinnovo annuale"
      }
    ]
  },
  "catasto": {
    "title": "Catasto",
    "oldSlug": "catasto",
    "area": "agenzia-territorio",
    "blocks": [
      {
        "type": "item",
        "text": "Visure e certificati Catastali"
      },
      {
        "type": "item",
        "text": "Planimetrie"
      },
      {
        "type": "item",
        "text": "Estratto di Mappa"
      },
      {
        "type": "item",
        "text": "Volture catastali"
      },
      {
        "type": "item",
        "text": "Presentazioni di istanze di Rettifiche e Mod. 701"
      }
    ]
  },
  "conservatoria-e-registri-immobiliari": {
    "title": "Conservatoria dei Registri Immobiliari",
    "oldSlug": "conservatoria-e-registri-immobiliari",
    "area": "agenzia-territorio",
    "blocks": [
      {
        "type": "item",
        "text": "Certificazione storica ventennale"
      },
      {
        "type": "item",
        "text": "Ispezioni ipotecarie – Accesso"
      },
      {
        "type": "item",
        "text": "Richiesta di copia atti di Trascrizione, etc."
      },
      {
        "type": "item",
        "text": "Presentazione note di Trascrizione, Annotamenti e Iscrizioni (comprensiva di analisi e compilazione del relativo adempimento)"
      },
      {
        "type": "item",
        "text": "Accessi ipocatastali su tutta Italia"
      }
    ]
  },
  "rentri": {
    "title": "Rentri",
    "oldSlug": "rentri",
    "area": "servizi-ambientali",
    "blocks": [
      {
        "type": "item",
        "text": "Adesione"
      },
      {
        "type": "item",
        "text": "Iscrizione - modifica"
      },
      {
        "type": "item",
        "text": "Tenuta Formulario"
      },
      {
        "type": "item",
        "text": "Tenuta del Registro di Carico e Scarico rifiuti"
      }
    ]
  },
  "r-a-e-e-a-e-e-registro-pile-ed-apparecchiature-elettroniche": {
    "title": "R.a.e.e / A.e.e. (Registro Pile ed apparecchiature elettroniche)",
    "oldSlug": "r-a-e-e-a-e-e-registro-pile-ed-apparecchiature-elettroniche",
    "area": "servizi-ambientali",
    "blocks": [
      {
        "type": "item",
        "text": "Iscrizione/rinnovo annuale"
      },
      {
        "type": "item",
        "text": "Variazione"
      }
    ]
  },
  "albo-gestori-ambientali": {
    "title": "Albo Gestori Ambientali",
    "oldSlug": "albo-gestori-ambientali",
    "area": "servizi-ambientali",
    "blocks": [
      {
        "type": "item",
        "text": "Iscrizione"
      },
      {
        "type": "item",
        "text": "Variazione / rinnovo iscrizione"
      }
    ]
  },
  "mud": {
    "title": "Mud",
    "oldSlug": "mud",
    "area": "servizi-ambientali",
    "blocks": [
      {
        "type": "item",
        "text": "Comunicazione Annuale (compilazione + spedizione)"
      },
      {
        "type": "item",
        "text": "Comunicazione Annuale (sola spedizione file del cliente)"
      }
    ]
  },
  "altre-prestazioni-professionali": {
    "title": "Altre Prestazioni Professionali",
    "oldSlug": "altre-prestazioni-professionali",
    "area": "servizi-ambientali",
    "blocks": [
      {
        "type": "item",
        "text": "Valutazione impatto acustico"
      },
      {
        "type": "item",
        "text": "Autorizzazione emissioni in atmosfera"
      }
    ]
  },
  "consolati-ambasciate": {
    "title": "Consolati - Ambasciate",
    "oldSlug": "consolati-ambasciate",
    "area": "servizio-estero",
    "blocks": [
      {
        "type": "item",
        "text": "Richiesta Visti e Vidimazioni sui documenti per l’estero"
      }
    ]
  },
  "documenti-commerciali": {
    "title": "Documenti commerciali",
    "oldSlug": "documenti-commerciali",
    "area": "servizio-estero",
    "blocks": [
      {
        "type": "item",
        "text": "Richiesta e stampa Certificati di Origine"
      },
      {
        "type": "item",
        "text": "Legalizzazioni dei documenti per l’estero"
      },
      {
        "type": "item",
        "text": "Richiesta/rinnovo cod. meccanografico"
      },
      {
        "type": "item",
        "text": "Carnet ATA"
      }
    ]
  },
  "camera-di-commercio-industria-e-artigianato": {
    "title": "Camera di Commercio Industria e Artigianato",
    "oldSlug": "camera-di-commercio-industria-e-artigianato",
    "area": "uffici-esterni",
    "blocks": [
      {
        "type": "item",
        "text": "Copia Atti/Bilanci"
      },
      {
        "type": "item",
        "text": "Certificati Registro Imprese"
      },
      {
        "type": "item",
        "text": "Certificato Storico Registro Imprese"
      },
      {
        "type": "item",
        "text": "Certificazioni Albi e Ruoli tenuti dalla C.C.I.A.A."
      },
      {
        "type": "item",
        "text": "Visura Registro Imprese"
      },
      {
        "type": "item",
        "text": "Visura assetto proprietario Registro Imprese"
      },
      {
        "type": "item",
        "text": "Visura protesti"
      },
      {
        "type": "item",
        "text": "Visura albi ruoli"
      },
      {
        "type": "item",
        "text": "Visura storica Registro Imprese"
      },
      {
        "type": "item",
        "text": "Controllo per diritti annuali Camerali"
      },
      {
        "type": "item",
        "text": "Copia atti da fascicolo Registro Imprese"
      },
      {
        "type": "item",
        "text": "Consultazioni fascicoli Registro Imprese"
      },
      {
        "type": "item",
        "text": "Visti/ Vidimazione firma presso C.C.I.A.A."
      },
      {
        "type": "item",
        "text": "Vidimazione listino prezzi"
      },
      {
        "type": "item",
        "text": "Vidimazione libri sociali e registri"
      },
      {
        "type": "item",
        "text": "Fascicolazione e Stampa libri e registri"
      },
      {
        "type": "item",
        "text": "Raccoglitori ad anelli per registri"
      }
    ]
  },
  "comune-anagrafiche-certificazioni": {
    "title": "Comune – anagrafiche certificazioni",
    "oldSlug": "comune-anagrafiche-certificazioni",
    "area": "uffici-esterni",
    "blocks": [
      {
        "type": "item",
        "text": "Certificato anagrafico A.I.R.E."
      },
      {
        "type": "item",
        "text": "Certificato anagrafico"
      },
      {
        "type": "item",
        "text": "Estratti e certificati di Stato Civile"
      },
      {
        "type": "item",
        "text": "Certificato iscrizione liste elettorali"
      },
      {
        "type": "item",
        "text": "Copia integrale atti di Stato Civile"
      },
      {
        "type": "item",
        "text": "Vidimazione registri"
      },
      {
        "type": "item",
        "text": "Richiesta copie condoni, licenze e certificazioni"
      }
    ]
  },
  "tribunale": {
    "title": "Tribunale",
    "oldSlug": "tribunale",
    "area": "uffici-esterni",
    "blocks": [
      {
        "type": "item",
        "text": "Certificato della Cancelleria Fallimentare"
      },
      {
        "type": "item",
        "text": "Certificato carichi pendenti"
      },
      {
        "type": "item",
        "text": "Certificato generale del Casellario Giudiziale"
      },
      {
        "type": "item",
        "text": "Certificato di non opposizione"
      },
      {
        "type": "item",
        "text": "Registrazioni per giornali e periodici"
      },
      {
        "type": "item",
        "text": "Certificato per giornali e periodici"
      },
      {
        "type": "item",
        "text": "Certificato Esecuzioni Immobiliari"
      },
      {
        "type": "item",
        "text": "Legalizzazione documenti Civili"
      },
      {
        "type": "item",
        "text": "Notifiche Ufficiali Giudiziari"
      },
      {
        "type": "item",
        "text": "Accesso ritiro notifiche"
      },
      {
        "type": "item",
        "text": "Presentazione e ritiro atti-documenti presso le cancellerie"
      },
      {
        "type": "item",
        "text": "Copia atti Archivio Notarile"
      }
    ]
  },
  "agenzia-entrate": {
    "title": "Agenzia Entrate",
    "oldSlug": "agenzia-entrate",
    "area": "uffici-esterni",
    "blocks": [
      {
        "type": "item",
        "text": "Presentazione documenti per rimborso IVA"
      },
      {
        "type": "item",
        "text": "Certificazioni IVA"
      },
      {
        "type": "item",
        "text": "Richiesta codice fiscale"
      },
      {
        "type": "item",
        "text": "Certificati (Carichi pendenti fiscali / Doppie Imposizioni)"
      },
      {
        "type": "item",
        "text": "Certificato DURF"
      },
      {
        "type": "item",
        "text": "CIVIS (gestione istanze di autotutela)"
      },
      {
        "type": "item",
        "text": "Verifica cartelle di pagamento Agenzia Riscossione"
      }
    ]
  },
  "servizi-in-outsourcing": {
    "title": "Servizi in outsourcing",
    "oldSlug": null,
    "area": "operatori-finanziari",
    "blocks": [
      {
        "type": "item",
        "text": "Gestione anagrafica dei rapporti mensili"
      },
      {
        "type": "item",
        "text": "Gestione delle indagini finanziarie"
      },
      {
        "type": "item",
        "text": "Comunicazione REI – Registro Indirizzo Pec"
      },
      {
        "type": "item",
        "text": "CRS comunicazione dei rapporti esteri"
      },
      {
        "type": "item",
        "text": "Comunicazioni annuali Utenze"
      },
      {
        "type": "item",
        "text": "Antiriciclaggio"
      }
    ]
  },
  "firma-digitale-e-marche-temporali": {
    "title": "Firma Digitale e Marche Temporali",
    "oldSlug": "firma-digitale-e-marche-temporali",
    "area": "servizi-digitali",
    "blocks": [
      {
        "type": "item",
        "text": "Rilascio firma digitale SMART CARD CNS"
      },
      {
        "type": "item",
        "text": "Rilascio firma digitale BUSINESS KEY CNS"
      },
      {
        "type": "item",
        "text": "Rilascio firma digitale REMOTA"
      },
      {
        "type": "item",
        "text": "Rilascio SPID"
      },
      {
        "type": "item",
        "text": "Rinnovo SMART CARD – BUSINESS KEY"
      },
      {
        "type": "item",
        "text": "Fornitura Lettore SMART CARD"
      },
      {
        "type": "item",
        "text": "Accesso per attività di riconoscimento a domicilio – firma digitale"
      },
      {
        "type": "item",
        "text": "Marche temporali (pacchetto da 100)"
      },
      {
        "type": "item",
        "text": "Assistenza di primo livello per utilizzo della Firma Digitale"
      }
    ]
  },
  "pec": {
    "title": "PEC",
    "oldSlug": "pec",
    "area": "servizi-digitali",
    "blocks": [
      {
        "type": "item",
        "text": "Rilascio/rinnovo casella PEC adempiopec.it Lite"
      },
      {
        "type": "item",
        "text": "Rilascio/rinnovo casella PEC adempiopec.it Pro"
      },
      {
        "type": "item",
        "text": "Rilascio/rinnovo casella PEC adempiopec.it Ultra"
      },
      {
        "type": "item",
        "text": "Rilascio/rinnovo casella PEC Legalmail standard - bronze"
      },
      {
        "type": "item",
        "text": "Rilascio/rinnovo casella PEC Legalmail silver"
      },
      {
        "type": "item",
        "text": "Rilascio/rinnovo casella PEC Legalmail gold"
      }
    ]
  }
}
