# Redesign agenziaimpresa.com — Fase 1: analisi e piano

Data: 02/10/2026
Fonti:
- sito live `https://www.agenziaimpresa.com` (sitemap XML + crawl di tutti i link interni);
- `BuffettiGroup_BrandGuidelines.pdf` (Landor, marzo 2026, 78 pagine);
- `Logo Agenzia Impresa Gruppo Buffetti.svg`;
- `COMPANY_DATA.md`.

Allegati:
- [`02-content-inventory.md`](02-content-inventory.md): tabella completa URL → contenuto → categoria → nuova destinazione (122 righe);
- [`contenuti-originali/`](contenuti-originali/): testo integrale estratto da ogni pagina, da usare come fonte nello sviluppo.

---

## A. Sitemap del sito attuale

Il sito è un WordPress con tema Salient, WPBakery e WooCommerce. **120 pagine raggiungibili più 2 link interni rotti.**

```
/ (Home) ─ slider + claim + 10 riquadri "AREA …"
│
├─ Menu header (3 voci): I nostri Servizi (= Home) · Contatta le nostre Sedi · Apri la tua Agenzia
│   + ricerca + icona carrello
│
├─ 10 AREE DI SERVIZIO (linkate solo dalla Home)
│   ├─ /area-registro-imprese-comunica/ → 14 pagine servizio
│   ├─ /area-pratiche-suap/             → 11 pagine servizio
│   ├─ /area-agenzia-entrate-adm/       →  6 pagine servizio
│   ├─ /area-agenzia-territorio/        →  3 pagine servizio
│   ├─ /area-servizi-ambientali/        →  6 pagine servizio
│   ├─ /area-marchi/                    →  1 pagina servizio
│   ├─ /area-servizio-estero/           →  3 pagine servizio
│   ├─ /area-uffici-esterni/            →  4 pagine servizio
│   ├─ /area-servizi-digitali/          →  3 pagine servizio
│   └─ /area-varie/                     →  1 pagina servizio
│      (Diritto d'urgenza è ripetuto in 6 aree, Assistenza normativa in 2)
│
├─ CONTATTI
│   ├─ /contatti/ (= /i-nostri-centri/, duplicato) → 5 schede sede con "Contatta ora" + "Login"
│   └─ /contatti-milano|mantova|modena|brescia|bologna/ → form + mappa
│
├─ /apri-la-tua-agenzia/ → testo + form
│
├─ PAGINE ISTITUZIONALI NON PRESENTI NEL MENU (raggiungibili solo da link interni o sitemap)
│   ├─ /chi-siamo/ → /cosa-facciamo/ → /imprese/, /professionisti/
│   ├─ /formazione/, /restainup/
│   ├─ /paolo-pistoni/, /stefano-colli/
│   └─ /iban/
│
├─ 12 SCHEDE INFORMATIVE ORFANE (nessun link in ingresso)
│   cpi, hccp, banca-dati-f-gas, registro-f-gas, registro-nazionale-accumulatori-pile,
│   valutazione-dellimpatto-acustico, il-carnet-ata, il-certificato-d-origine,
│   il-codice-meccanografico, visti-consolari-e-legalizzazioni, il-codice-lei-legal-entity-identifier,
│   bolle-doganali-digitali
│
├─ BLOG: /blog/ + 4 articoli (aprile 2021) + 5 archivi categoria + 1 archivio autore
│
├─ SHOP (WooCommerce): /negozio/ + 4 prodotti + 4 categorie + 3 tag + carrello, checkout, account
│
├─ LEGALE: privacy-cookie-policy (hub), privacy-policy (+ 2 duplicati), cookie-policy,
│          termini-e-condizioni-duso (webinar), note-legali
│
└─ Footer: logo · AgenziaImpresa · Privacy & Cookie Policy · Le nostre Sedi
          + riga societaria + "Powered by: Resta in up Srl"

Link rotti: /servizi/ (pulsante "Prodotti e Servizi" in 4 pagine) · /compliance/ (ISO e 231 in Chi siamo)
```

---

## B. Elenco completo di aree e servizi

Per ogni servizio il contenuto originale è un **elenco di prestazioni**, oppure una riga singola. Il sito non contiene descrizioni discorsive né prezzi. I testi integrali sono in `contenuti-originali/<slug>.md`.

| Area | Servizi (pagine) | Prestazioni elencate |
|---|---|---|
| **Registro Imprese – ComUnica** | Deposito Atti Reg. Imprese · Deposito Comunicazioni Reg. Imprese · Deposito Denunce REA per attività non Regolate · Deposito Denunce REA per attività Regolate · Deposito Comunicazioni REA · Deposito Comunicazione anagrafiche dati IVA · … dati INPS · … dati INAIL · Deposito Bilancio · Trasformazione File XBRL · Compilazione Elenco Soci · Codice LEI · *Assistenza normativa* · *Diritto d'urgenza* | 15 + 8 + 5 + 7 + 6 + 1 + 1 + 1 + 1 + 2 + 2 + 1 |
| **Pratiche SUAP** | Attività di vendita · Attività artigianali/produttive · Attività di intrattenimento · Attività ricettive (alberghi, ostelli) · Attività ricettive (casa vacanze, affitta camere, airbnb) · Somministrazione alimenti e bevande · Altre attività EX PS (Agenzia d'affari) · Altre autorizzazioni COMUNALI – SCIA · Carta Esercizio Ambulanti · *Assistenza normativa* · *Diritto d'urgenza* | 3 per attività (4 per casa vacanze), 2 per SCIA comunali e Ambulanti |
| **Agenzia Entrate – ADM** | Ufficio Successioni · Ufficio del Registro · IVA · ADM (Intrastat, Licenza Alcolici) · RIES · *Diritto d'urgenza* | 3 + 6 + 1 + 7 + 1 |
| **Agenzia Territorio** | Catasto · Conservatoria e Registri Immobiliari · *Diritto d'urgenza* | 5 + 6 |
| **Servizi Ambientali** | Rentri · R.A.E.E./A.E.E. · Albo Gestori Ambientali · MUD · Altre Prestazioni Professionali · *Diritto d'urgenza* | 5 + 2 + 2 + 2 + 2 |
| **Marchi** | Registrazione Marchio d'Impresa | 2 |
| **Servizio Estero** | Consolati – Ambasciate · Documenti commerciali · *Diritto d'urgenza* | 1 + 4 |
| **Uffici Esterni** | Camera di Commercio · Comune – Anagrafiche Certificazioni · Tribunale · Agenzia Entrate | 17 + 7 + 13 + 7 |
| **Servizi Digitali** | Firma Digitale e Marche Temporali · PEC · Banche Dati | 9 + 3 + 1 |
| **Varie** | Varie | 11 |

**Totale:** 10 aree, 44 servizi distinti, 2 servizi trasversali e 12 schede informative orfane.

### Schede informative orfane e collegamento proposto

Hanno contenuto descrittivo vero (normativa, definizioni) ma oggi nessuna pagina le linka. Propongo di agganciarle come **approfondimenti** dell'area pertinente:

| Scheda | Area proposta | Servizio collegato |
|---|---|---|
| CPI, HACCP ("HCCP" nel sito) | Pratiche SUAP | Somministrazione, attività produttive |
| Banca Dati F-GAS, Registro F-GAS, Registro Nazionale Accumulatori Pile, Valutazione impatto acustico | Servizi Ambientali | R.A.E.E./A.E.E., Altre Prestazioni Professionali |
| Carnet ATA, Certificato d'origine, Codice meccanografico, Visti consolari e legalizzazioni | Servizio Estero | Documenti commerciali, Consolati – Ambasciate |
| Bolle doganali digitali (EccoExtra) | Servizio Estero ⚠ (è un software: in alternativa va in Servizi Digitali) | — |
| Il Codice LEI | Registro Imprese – ComUnica | Codice LEI (oggi esistono 2 pagine LEI distinte) |

---

## C. Nuova sitemap proposta

Principio guida: **Area → Servizio → Prestazioni / azione**, con un unico hub `/servizi` che oggi manca (ed è proprio il link rotto `/servizi/`).

```
/                                   Home
│
├─ /servizi                         Hub: le 10 aree raggruppate in 4 famiglie
│   ├─ /servizi/<area>              Landing area: intro, indice servizi, approfondimenti, CTA sede
│   │   └─ /servizi/<area>/<servizio>     Scheda servizio: elenco prestazioni + CTA
│   │   └─ /servizi/<area>/<approfondimento>  Schede informative (ex orfane)
│   ├─ /servizi/diritto-durgenza                     (trasversale, richiamato in ogni area)
│   └─ /servizi/assistenza-normativa-e-procedurale   (trasversale)
│
├─ /soluzioni/imprese               (ex /imprese)
├─ /soluzioni/professionisti        (ex /professionisti)
│
├─ /chi-siamo                       Storia, citazione, video, Gruppo
│   ├─ /chi-siamo/tecnologia        (ex /cosa-facciamo: EccoSolution, Azure)
│   ├─ /chi-siamo/team              Paolo Pistoni, Stefano Colli (+ pagine singole)
│   ├─ /chi-siamo/formazione
│   └─ /chi-siamo/restainup
│
├─ /sedi                            Le 6 sedi (mappa e schede)
│   └─ /sedi/<città>                Indirizzo, telefono, mappa, form, login area clienti
│
├─ /apri-la-tua-agenzia
├─ /approfondimenti                 Blog: 4 articoli (+ eventuale archivio webinar)
├─ /contatti                        Form generale + rimando alle sedi
│
└─ Legale: /privacy-policy · /cookie-policy · /termini-e-condizioni · /note-legali · /pagamenti (IBAN, noindex)
```

Le vecchie URL vengono reindirizzate con **redirect 301** in `vercel.json` (mappa completa nella colonna destinazione dell'inventario), così non si perde il posizionamento.

### Raggruppamento delle 10 aree in 4 famiglie

Solo per navigazione e mega-menu. Le etichette delle famiglie sono un elemento di IA, non nuovo copy: se le preferite diverse, si cambiano.

| Famiglia | Aree |
|---|---|
| **Impresa e Registri** | Registro Imprese – ComUnica · Marchi |
| **Fisco e Patrimonio** | Agenzia Entrate – ADM · Agenzia Territorio |
| **Autorizzazioni, Ambiente ed Estero** | Pratiche SUAP · Servizi Ambientali · Servizio Estero |
| **Certificati, Uffici e Digitale** | Uffici Esterni · Servizi Digitali · Varie |

---

## D. Menu principale

```
[Logo]   Servizi ▾   Soluzioni ▾   Chi siamo ▾   Sedi   Approfondimenti        [Area clienti]  [Contattaci]
```

- **Servizi**: mega-menu a 4 colonne (le famiglie), con le aree sotto ciascuna e il numero di servizi accanto al nome. A piè di pannello: "Tutti i servizi →", "Diritto d'urgenza", "Apri la tua Agenzia".
- **Soluzioni**: dropdown con Imprese e Professionisti.
- **Chi siamo**: dropdown con Chi siamo, Tecnologia, Team, Formazione, RestainUp.
- **Sedi**: link diretto. Le 6 città sono comunque a 1 clic nella pagina.
- **Area clienti**: utility link a un pannello con i login EccoSolution per sede (oggi i pulsanti "Login" stanno nella pagina contatti).
- **Contattaci**: CTA primaria.
- **Apri la tua Agenzia**: in header resta come link secondario (testo) accanto ad Area clienti, perché era una voce del menu attuale.

**Mobile:** drawer a schermo intero con accordion di primo livello, CTA "Contattaci" fissa in basso e telefoni delle sedi a portata di tap.

**Footer:**
- Colonna Servizi: le 10 aree.
- Colonna Azienda: Chi siamo, Tecnologia, Team, Formazione, RestainUp, Apri la tua Agenzia.
- Colonna Sedi: le 6 sedi con telefono.
- Colonna Legale: Privacy, Cookie, Termini, Note legali.
- Fascia societaria: AGENZIAIMPRESA SRL, P.IVA, capitale sociale, sede legale, PEC, "Società soggetta a direzione e coordinamento di GRUPPO BUFFETTI".
- Credit: "Powered by: Resta in up Srl", presente nel sito attuale.

---

## E. Struttura della Home

Solo contenuti esistenti; tra parentesi la fonte di ciascuna sezione.

1. **Hero istituzionale.** Testo: "Servizi di digitalizzazione dei processi telematici in ambito amministrativo rivolti alla Pubblica Amministrazione" (Home). CTA: *Scopri i servizi* e *Contattaci*. Visual: campo Main Blu con gradiente diagonale del brand e cornici a 45°, niente slider né stock.
2. **Introduzione.** Citazione "Offriamo da sempre Soluzioni Digitali all'avanguardia…" più il primo paragrafo della storia ("…affianchiamo da sempre le Imprese e gli Studi Professionali…") (Chi siamo). Link *Chi siamo*.
3. **Aree di servizio.** Indice tipografico numerato 01–10, raggruppato per famiglia, con il conteggio dei servizi, al posto dei 10 riquadri GIF. Link a ogni area e a *Tutti i servizi*.
4. **Per chi lavoriamo.** Due colonne, Imprese e Professionisti, con i 3 principi Semplicità, Funzionalità, Efficacia (pagine Imprese/Professionisti).
5. **Tecnologia e solidità.** EccoSolution su data center Microsoft Azure, certificazioni ISO 27001/27018 dei data center, Modello 231 (Chi siamo, Cosa facciamo). ⚠ Vedi problemi 2 e 3.
6. **Numeri.** 25K clienti attivi, 4,8 Mln fatture elettroniche gestite, 32 Mln documenti digitalizzati, 1,5K imprese digitalizzate (Chi siamo). ⚠ Solo se li confermate: vedi problema 2.
7. **Presenza territoriale.** Le 6 sedi con indirizzo e telefono e la CTA *Trova la sede più vicina* (Contatti).
8. **Apri la tua Agenzia.** Fascia a tutta larghezza con il testo "Entra nel nostro mondo…" e la CTA (Apri la tua Agenzia).
9. **Contatto finale.** Form breve oppure CTA verso le sedi.
10. **Footer corporate.**

---

## F. Design direction (dalle Brand Guidelines Buffetti Group)

### Inquadramento del brand

Il logo fornito è il caso **"Endorsement di Gruppo – A"** delle guideline: simbolo "B" di Gruppo, nome "Agenzia Impresa" in Hanken Grotesk e descriptor "Buffetti Group". Ne seguono tre cose:
- il sito adotta **tipografia, colori e segno a 45° del Gruppo**;
- non introduce un'identità propria;
- conserva il nome AgenziaImpresa come protagonista.

Brand line di Gruppo: "All ways there." **Non la uso come claim**: non è un contenuto del sito attuale e il brief vieta claim nuovi.

### Colori

| Token | Hex | Uso |
|---|---|---|
| `--blue` (Main Blu) | `#0007e0` | Colore guida: CTA, link, campi hero e fasce brand |
| `--blue-dark` (Dark Blu) | `#002685` | Sezioni scure, footer, hover delle CTA |
| `--blue-light` (Light Blu) | `#426fde` | Accenti, stati, elementi grafici (non per testo piccolo su bianco: contrasto 4.6:1 al limite) |
| `--ink` | `#000000` → nel web `#0b0b12` | Testo |
| `--paper` | `#ffffff` | Sfondo principale |
| `--gray` (Gray) | `#ebebeb` | Superfici secondarie, divisori |
| Secondari | `#78c932` `#00b7e6` `#bb78ff` | Come da guideline, "solo highlight in piccole percentuali": nel sito al massimo per indicatori di stato. Nessuna superficie colorata. |

Distribuzione: prevalenza di bianco e nero, blu come accento forte, gradienti solo in hero, fascia "Apri la tua Agenzia" e footer. Il brief vieta i gradienti gratuiti: quelli usati sono il gradiente di brand codificato a p. 52 (Main Blu più due quadrati neri in moltiplica al 60%, diagonali, speculari), non decorazioni.

### Tipografia

**Hanken Grotesk**, open source, self-hosted come font variabile WOFF2 con `font-display: swap` e preload del solo peso usato above-the-fold.

| Livello | Peso / tracking (da guideline p. 38–41) | Desktop → mobile |
|---|---|---|
| Display (hero) | Light 300, −0.02em, interlinea 1.0 | 88 → 44 px (clamp) |
| H1 | Light 300, −0.02em | 64 → 36 |
| H2 | Regular 400, −0.02em | 44 → 28 |
| H3 / titolo paragrafo | SemiBold 600, −0.01em | 22 → 19 |
| Body | Regular 400, 0 | 18 → 17, interlinea 1.6, max 68ch |
| Label / small caps | Bold 700, maiuscolo, +0.06em | 12–13 |

Le guideline indicano "pesi leggeri per titoli, regolari per i testi lunghi, pesi marcati solo per elementi funzionali": la gerarchia nasce dal contrasto tra Light grande e Bold piccolo, non da molti pesi diversi.

### Griglia e spaziatura

- **Griglia**: le guideline prevedono 8 colonne con margine pari a 1/25 del lato lungo. Nel web diventano 8 colonne su desktop, 4 su tablet e 2 su mobile.
  - Margine laterale: `clamp(16px, 4vw, 80px)`, cioè circa 1/25 del viewport.
  - Gutter: 24 px, 16 px su mobile.
  - Larghezza massima del contenuto: 1440 px.
- **Spaziatura**: base 4 px, scala 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
  - Padding verticale delle sezioni: `clamp(72px, 10vw, 160px)`, per sezioni ampie e ariose.
- **Angoli**: vivi (0 radius), coerenti con i tagli a 45°. L'unico elemento caratterizzante è l'angolo tagliato a 45° (`clip-path`) su CTA primaria, cornici immagine e badge.

### Linguaggio grafico

- **Matrice diagonale** (p. 9): linee a 45° derivate dal simbolo, usate come struttura che organizza l'hero e le fasce brand. Mai come texture di riempimento.
- **Frame a tagli diagonali** (p. 64): due moduli a 45° di colore diverso fanno da contenitori per testo e immagini. Si usano nell'hero e nella fascia "Apri la tua Agenzia".
- **Full frame** (p. 64): il gradiente di brand a tutta pagina, solo nel footer.
- **Icone** (p. 44): griglia 24×24, 2 spessori di tratto, accento triangolare blu. Le uso solo per funzioni (telefono, email, sede, login, freccia, menu, ricerca), **non** per illustrare le aree: le aree si distinguono con numerazione e tipografia, come chiede il brief ("icone generiche ovunque" da evitare).

### Componenti principali

| Componente | Note |
|---|---|
| **Header** | Sticky, trasparente sull'hero e bianco con bordo sottile dopo lo scroll. Altezza 80 → 64 px. Logo a 48 px di altezza, il minimo digitale da guideline. |
| **Mega-menu** | Pannello a tutta larghezza in 4 colonne. Apertura su clic e su hover con ritardo, chiusura con Esc, focus trap da tastiera. |
| **Menu mobile** | Drawer a schermo intero con accordion, target di tocco ≥ 48 px e CTA fissa. |
| **Button system** | **Primario**: pieno Main Blu, angolo tagliato a 45°. **Secondario**: outline nero o bianco. **Terziario**: testo con freccia che trasla di 4 px all'hover. Altezza 48 px (52 su mobile). |
| **Card system** | Ridotto al minimo, come chiede il brief. Gli elenchi sono **righe con divisori** (pattern indice) e non box; la card esiste solo per sedi e articoli. |
| **Index row** | Riga numerata (01–10) con nome area, conteggio, freccia e hover con barra blu da sinistra. È il componente chiave di home e hub servizi. |
| **Service list** | Elenco prestazioni a due colonne, con link di ritorno all'area e CTA "Richiedi informazioni" che precompila l'oggetto del form. |
| **Altri componenti** | Breadcrumb, Section header (eyebrow, titolo, intro), Quote, Stat row (condizionale), Scheda sede (indirizzo, telefono cliccabile, mappa caricata on-demand, login), Form (label sempre visibili, errori inline, niente "capitale d'Italia": antispam con honeypot), Footer. |

### Fotografia

Le guideline vietano l'uso delle foto dimostrative del PDF e chiedono foto autentiche (categorie Human Soul, Smart Interaction, Pure Tech) con luce naturale e un tocco di blu. Le immagini del vecchio sito sono GIF di prodotto, stock datato e grafiche Ecco*, quindi **non le riuso** come visual: farebbero subito "vecchio sito".

Nella prima release la percezione premium si regge su tipografia, griglia e gradiente di brand. Restano le foto reali del team, Pistoni e Colli, trattate in bianco e nero o con una correzione colore uniforme. Si potranno aggiungere fotografie nuove in seguito.

### Motion e micro-interazioni

- Durate 150–250 ms con `cubic-bezier(.2,.7,.2,1)`.
- Cosa si anima:
  - underline che si disegna sui link;
  - freccia che trasla sulle CTA;
  - fade + 8 px sul mega-menu;
  - reveal delle sezioni allo scroll, una sola volta e solo `opacity`/`transform`.
- Nessuna parallasse né slider.
- Con `prefers-reduced-motion` le animazioni si disattivano.

### Accessibilità, performance e SEO tecnico

- **Accessibilità**:
  - HTML semantico e landmark;
  - skip link e focus ring visibile (2 px Main Blu + offset);
  - contrasto AA verificato su tutti i token;
  - navigazione completa da tastiera.
- **Performance**:
  - mappe Google caricate solo al clic (facade);
  - immagini in AVIF/WebP con dimensioni esplicite;
  - un solo font variabile.
- **SEO**:
  - title e meta per pagina (quelli attuali sono quasi tutti duplicati "EccoBook…" e vanno corretti);
  - JSON-LD Organization e LocalBusiness per le sedi;
  - sitemap.xml;
  - redirect 301.
- **Rendering**: raccomando il **pre-rendering statico** delle pagine in fase di build (SSG) invece della SPA pura, per indicizzazione e Core Web Vitals. Lo stack resta Vite + React + Tailwind.

---

## G. Problemi e contenuti mancanti

Nessuno di questi contenuti è stato eliminato: sono tutti nell'inventario. Servono vostre decisioni dove indicato con **→ decisione**.

### Coerenza societaria e di brand

1. **Gruppo APM e Gruppo Buffetti.** Molti testi citano "AgenziaImpresa Gruppo Apm", "brand di GRUPPO APM SRL", "Gruppo APM S.r.l." come titolare dei Termini (sede in Via Savona 2/a, non Via Feltre) e "Gruppo Apm srl" nelle Note legali 2021. Footer, privacy e cookie parlano invece di AGENZIAIMPRESA SRL "soggetta a direzione e coordinamento di GRUPPO BUFFETTI". **→ decisione:** mantengo i riferimenti a Gruppo APM alla lettera (regola "non modificare i contenuti") o li aggiornate voi prima del go-live?
2. **Numeri di Chi siamo** (25K clienti, 4,8 Mln fatture, 32 Mln documenti, 1,5K imprese). Sono nel sito, quindi non inventati, ma non hanno data e sono probabilmente del 2020–21. **→ decisione:** confermarli, aggiornarli o toglierli dalla Home.
3. **Certificazioni e partnership.** "ISO 27001 – 27017 – 27018 … adottato da marzo 2021" e "Modello 231" sono intestati a Gruppo APM, e il loro link `/compliance/` è un 404. Anche "Microsoft ISV Partner" è un claim forte. **→ decisione:** sono ancora validi per AgenziaImpresa SRL? Se sì, servono il testo completo della pagina Compliance e gli eventuali documenti (codice etico, whistleblowing).
4. **Ruoli.** Paolo Pistoni è "Co-Founder and CEO – AGENZIA IMPRESA SRL" nella scheda, ma "Presidente di AgenziaImpresa Gruppo APM" nell'articolo DigEat.

### Dati delle sedi

5. **Mantova:** la mappa punta a *Largo di Porta Pradella 11*, l'indirizzo dichiarato è *Piazza Alcide de Gasperi 23/24*.
6. **Modena:** ha lo stesso telefono di Mantova (0376 222020).
7. **Login di Modena e Bologna:** puntano al sottodominio `mantova.eccosolution.it`. Darfo non ha un login proprio.
8. **Footer:** elenca "MILANO – MANTOVA – MODENA – BRESCIA – DARFO BOARIO TERME" ma non Bologna.

**→ decisione:** potete confermare indirizzi, telefoni e login per sede?

### Contenuti datati o funzionalità

9. **Shop WooCommerce.** I 3 webinar del 2022 sono esauriti; il prodotto "Sistema FAI DA TE" (forfettari, luglio 2022) ha prezzi. Carrello, checkout e account **non sono migrabili** in un sito statico senza un backend e-commerce. **→ decisione:** propongo di mantenere le schede come archivio "Formazione e prodotti" senza acquisto online, con CTA "Richiedi informazioni". Restano invariati i testi, le date, i docenti e i prezzi indicati come "esaurito".
10. **Blog:** 4 articoli di aprile 2021. Li mantengo in "Approfondimenti", con data visibile.
11. **Formazione:** contiene solo un titolo e il bottone "A breve on line il nuovo calendario Corsi", che punta a `#`.
12. **Note legali:** riguardano gli aiuti di Stato del 2021 di Gruppo Apm srl.
13. **Pagina IBAN** (`/iban/`): orfana, contiene coordinate bancarie. La mantengo come `/pagamenti` in `noindex`. **→ decisione:** linkarla o no?

### Duplicati e qualità del contenuto

14. **Pagine duplicate:**
    - `/i-nostri-centri/` duplica `/contatti/`;
    - `/privacy-policy-2/` duplica `/privacy-policy/`;
    - `/privacy-policy-termini-e-condizioni/` è quasi identica;
    - Codice LEI ha due pagine (servizio e scheda informativa);
    - Imprese e Professionisti hanno testi quasi uguali: in Professionisti c'è anche "alle sue imprese clienti".
15. **Refusi nel testo originale.** Li mantengo come sono, salvo vostro via libera a correggerli: "Presentazionedocumenti", "BUSINNESS KEY", "notra", "Richeste", "anuale", "ufficali", "HCCP" (= HACCP), "Un storia", "fai da tè", "Inizia, variazioni, chiusure P.IVA", "Accesso ritiro Notifiche" (ripetuto). **→ decisione:** posso correggere solo i refusi ortografici, senza toccare il copy?
16. **Meta description:** quasi tutte le pagine servizio usano la stessa meta copiata da EccoBook ("EccoBook è la soluzione web-based…"). È un errore SEO: in questa fase le lascio vuote o le genero dal titolo della pagina, senza inventare testo.
17. **Pagine servizio prive di descrizione.** Contengono solo l'elenco delle prestazioni: è il contenuto reale, e la nuova UX lo valorizza con una struttura chiara. Il copy descrittivo arriverà nella fase 2.

### Contenuti mancanti o da fornire

18. **Foto** coerenti con le guideline (oggi non ce ne sono di utilizzabili, a parte il team).
19. **Logo in negativo** (bianco) per hero e footer blu. Le guideline lo prevedono e posso ricavarlo dall'SVG ricolorando in bianco, che è la versione "Negativo" ufficiale. **→ decisione:** va bene così o ve lo fornisce il Gruppo?
20. **Colore del simbolo nel logo:** l'SVG usa `#2b4697`, un blu desaturato diverso dal Main Blu `#0007e0` delle guideline. Potrebbe essere una conversione CMYK→RGB. **→ decisione:** quale usare per il simbolo? Senza indicazioni userei `#0007e0` come da guideline.
21. **Destinazione dei form.** Oggi c'è un form per sede e uno per "Apri la tua Agenzia" (Contact Form 7). **→ decisione:** indirizzi email di destinazione per sede e servizio di invio (es. funzione serverless su Vercel + provider email, oppure Formspree).
22. **Video:** il video istituzionale (mp4 in `wp-content`) e il video RestainUp vanno scaricati e ospitati, oppure caricati su YouTube. L'intervista DigEat è già su YouTube.
23. **Pagina Compliance**, oggi 404: vedi punto 3.

---

## H. Prossimi passi

1. Le vostre risposte alle decisioni del punto G: le più bloccanti sono 1, 2, 3, 9, 20 e 21.
2. Approvazione di sitemap (C), menu (D) e Home (E).
3. Sviluppo:
   - design token e componenti base (header, mega-menu, footer, bottoni, index row);
   - Home;
   - template area e servizio, generati da un unico file dati con tutti i contenuti originali;
   - sedi e contatti;
   - istituzionali;
   - legali;
   - redirect 301 e SEO tecnico.
