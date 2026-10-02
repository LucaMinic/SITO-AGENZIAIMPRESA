# Decisioni e punti aperti

## Decisioni del cliente (02/10/2026)

| # | Tema | Decisione | Applicazione |
|---|---|---|---|
| 1 | Riferimenti a Gruppo APM | Sostituire con "AgenziaImpresa Buffetti Group" | Applicata a Chi siamo, Soluzioni Imprese/Professionisti, RestainUp e alle news "Nasce Resta in Up!" e "DigEat 2021". Eccezione: vedi punto aperto A. |
| 2 | Numeri, ISO 27001/27017/27018, Modello 231, "Microsoft ISV Partner" | Rimuovere | Rimossi. Il link `/compliance` (404) ora rimanda a `/chi-siamo`. |
| 3 | Shop e webinar | Eliminare | Eliminati prodotti, carrello, checkout, account e i Termini e condizioni della sezione webinar. Le vecchie URL rimandano alla Home. |
| 4 | Dati delle sedi | Lasciarli come sono | Indirizzi, telefoni, login e mappe sono identici all'originale. |
| 5 | Colore del logo | Usare il Main Blu delle guideline | Simbolo in `#0007e0`. Versione negativa (bianca) creata dall'SVG ufficiale. |
| 6 | Moduli di contatto | Destinatari per sede comunicati dal cliente | `public/contact.php` (hosting PHP): Milano → milano@, Mantova → brescia@ *(da confermare)*, Modena → modena@, Brescia → brescia@, Bologna → adempio.pratiche@ (tutti @agenziaimpresa.com). Il modulo generale e Apri la tua Agenzia vanno a milano@ *(da confermare)*. |
| 7 | Refusi | Correggerli | "Presentazionedocumenti", "BUSINNESS", "notra", "Richeste", "anuale", "ufficali", "HCCP" → HACCP, "Un storia", "Inizia, variazioni", una parentesi non chiusa, una voce duplicata nel Tribunale, spaziature. |

## Modifiche successive (02/10/2026)

**Pagine eliminate** (le vecchie URL rimandano con redirect 301 alla pagina più pertinente):
- Team, Formazione, RestainUp, Tecnologia: rimandano a `/chi-siamo`.
- News: i quattro articoli rimandano ai servizi o a Chi siamo collegati.

**Sezioni eliminate:**
- tutte le sezioni "AgenziaImpresa Technologies": Home, Chi siamo e la slide dello slider;
- l'intervista Dig.eat "10 minuti con Agenziaimpresa".

**Aggiunte:**
- **Ricerca:** voce "Cerca" nel menu, con suggerimenti mentre si digita e navigazione da tastiera. La pagina `/cerca` mostra tutti i risultati. Si cercano aree, servizi, prestazioni, schede, sedi e pagine.
- **Hero slider in Home:** 3 slide, dissolvenza, zoom lento, avanzamento, pausa. I titoli sono testi già presenti nel sito.
- **Fotografie Unsplash** (licenza con uso commerciale gratuito), servite dal CDN di Unsplash in formato e dimensione automatici. Elenco in `src/content/images.js`.
- **Voce "Registrati"** nel menu, nel pannello Area clienti e nel menu mobile. Punta alla registrazione sulla piattaforma Adempio: `https://www.adempio.it/#/register`, che si apre in una nuova scheda (`REGISTER_URL` in `src/content/site.js`).

**Header:** ottimizzato per tutte le larghezze, verificato da 1024 a 2560 px. Contenuti fino a 1600 px di larghezza.

## Punti aperti da verificare

**A. Note legali.**
- **Risolto il 02/10/2026.** Su decisione del cliente la pagina contiene ora i dati societari di AGENZIAIMPRESA SRL. Il vecchio testo sugli aiuti di Stato 2021 di Gruppo Apm srl è stato rimosso.
- **Da fare:** se AGENZIAIMPRESA SRL dovesse avere aiuti pubblici da dichiarare (L. 124/2017), la dichiarazione va aggiunta a questa pagina.

**B. Cookie policy.**
- **Situazione:** il testo originale cita Google Analytics e il "Privacy Shield", invalidato nel 2020. Il nuovo sito **non installa** Google Analytics né altri cookie di tracciamento. L'unico servizio di terze parti è Google Maps: le mappe delle sedi sono visibili subito, e il consenso sarà gestito dal banner dei cookie che il cliente integrerà. Finché il banner non c'è, l'interruttore `MAPS_REQUIRE_CONSENT` in `src/content/site.js` permette di farle caricare solo dopo un clic.
- **Da fare:** il testo va aggiornato da chi segue la parte legale.

**C. Video.**
- **Situazione:** non ho ripreso il video istituzionale (`agenzia-impresa-gruppo-apm-hd_DEF-OK.mp4`), che dal nome è brandizzato Gruppo APM. L'intervista DigEat è stata eliminata su richiesta.

**D. Data center Azure.**
- **Situazione:** superato, perché la pagina Tecnologia è stata eliminata.

**E. Logo su mobile.**
- **Situazione:** le guideline indicano un'altezza minima digitale di 48 px. Il lockup orizzontale "Agenzia Impresa – Buffetti Group" su mobile è largo 208 px, con altezza di circa 31 px, per stare nell'header a 360–390 px di larghezza.
- **Da fare:** in alternativa si può usare il solo simbolo, ma il nome AgenziaImpresa sparirebbe.

**F. Foto.**
- **Situazione:** ora sono foto di repertorio Unsplash. Le immagini del vecchio sito restano in `public/images/` ma non sono usate.
- **Da fare:** quando disponibili, conviene sostituirle con foto reali secondo le guideline (Human Soul, Smart Interaction, Pure Tech).

**G. Raggruppamento aree.**
- **Situazione:** le etichette "Impresa e Registri", "Fisco e Patrimonio", "Autorizzazioni, Ambiente ed Estero", "Certificati, Uffici e Digitale" sono etichette di navigazione nuove.
- **Da fare:** si modificano in `src/content/site.js` (`families`).
