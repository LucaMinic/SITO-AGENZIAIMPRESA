# Decisioni e punti aperti

## Decisioni del cliente (02/10/2026)

| # | Tema | Decisione | Applicazione |
|---|---|---|---|
| 1 | Riferimenti a Gruppo APM | Sostituire con "AgenziaImpresa Buffetti Group" | Applicata a Chi siamo, Soluzioni Imprese/Professionisti, RestainUp e alle news "Nasce Resta in Up!" e "DigEat 2021". Eccezione: vedi punto aperto A. |
| 2 | Numeri, ISO 27001/27017/27018, Modello 231, "Microsoft ISV Partner" | Rimuovere | Rimossi. Il link `/compliance` (404) ora rimanda a `/chi-siamo`. |
| 3 | Shop e webinar | Eliminare | Eliminati prodotti, carrello, checkout, account e i Termini e condizioni della sezione webinar. Le vecchie URL rimandano alla Home. |
| 4 | Dati delle sedi | Lasciarli come sono | Indirizzi, telefoni, login e mappe sono identici all'originale. |
| 5 | Colore del logo | Usare il Main Blu delle guideline | Simbolo in `#0007e0`. Versione negativa (bianca) creata dall'SVG ufficiale. |
| 6 | Moduli di contatto | Destinatari per sede comunicati dal cliente | `public/contact.php` (hosting PHP): Milano → milano@, Mantova → brescia@ *(da confermare)*, Modena → modena@, Brescia → brescia@, Bologna → adempio.pratiche@ (tutti @agenziaimpresa.com). Apri la tua Agenzia → network@; il modulo generale senza sede va a milano@ *(da confermare)*. |
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

## Modifiche del 05/10/2026

- **Pagina "Accessibilità" eliminata** su richiesta: rimossi la pagina `/dichiarazione-accessibilita`, la voce "Accessibilità" nel footer, il risultato nella ricerca, la voce nella sitemap e la configurazione `accessibility` in `src/content/site.js`. Non serve un redirect, perché la URL esisteva solo nel nuovo sito.
- **Nuova sede Reggio Emilia** (Via Bernardino Zacchetti 32, 42124), in coda alle altre: pagina `/sedi/reggio-emilia`, elenco sedi, mappa, footer, Home, Contatti, Dati societari, ricerca e sitemap. **Telefono da fornire**: finché manca non viene mostrato. Il modulo della sede invia provvisoriamente a milano@agenziaimpresa.com (destinatario da indicare).
- **Area clienti su Adempio:** eliminati i login EccoSolution delle singole sedi. Al loro posto c'è un unico "Login Adempio" (https://www.adempio.it/#/register) nel pannello Area clienti e nel menu mobile, e ovunque la scritta "EccoSolution" è sostituita da "Adempio". Nelle pagine delle sedi la CTA "Login area clienti" diventa "Registrati sul nostro portale Adempio e verrai immediatamente contattato da uno dei nostri funzionari", con link alla registrazione Adempio.
- **Testi della Home aggiornati dal cliente:** claim, citazione, storia, titolo "Servizi e Soluzioni Digitali per Imprese e Professionisti - il portale Adempio", teaser Imprese, testi di Semplicità, Funzionalità ed Efficacia. Questi ultimi compaiono anche nella pagina Soluzioni per le imprese. Davanti a ogni principio c'è il simbolo Adempio e sotto la sezione il logo completo, ripresi dal logo ufficiale di adempio.it (`public/brand/adempio*.svg`).
- **"Apri la tua Agenzia" eliminata:** pagina con modulo, sezione in Home, slide dello slider, voci di menu e footer, ricerca e sitemap. La vecchia URL rimanda alla Home con un redirect in `vercel.json`.
- **Servizi allineati al Listino 2026** (`listino2026.pdf`). Il listino è la fonte di nomi, ordine e gerarchia: **Area → Sotto-aree → Servizi**. Prezzi e note commerciali sono esclusi; i titoli d'area ripetuti a cambio pagina compaiono una volta sola.
  - **11 aree nell'ordine del listino**, con "Area" nel nome: Registro Imprese, Pratiche SUAP, Marchi, Agenzia Entrate – ADM, Agenzia Territorio, Servizi Ambientali, Servizio Estero, Varie, Uffici Esterni, Operatori Finanziari (nuova), Servizi Digitali. Eliminati i 4 raggruppamenti del menu ("Impresa e Registri" ecc.), che non sono nel listino.
  - **Sotto-aree e servizi con i nomi del listino.** Le code descrittive ("comprensivo di istruttoria compilazione e deposito…") compaiono come riga sotto il nome. Assistenza normativa e Diritto d'urgenza sono sotto-aree delle aree in cui il listino le riporta, nella stessa posizione. Marchi e Varie non hanno sotto-aree: i servizi sono direttamente nella pagina dell'area.
  - **Eliminati** (con redirect all'area): le 12 schede informative, le pagine intermedie "Registrazione Marchio d'Impresa" e "Varie", la sotto-area "Banche Dati".
  - **Correzioni rispetto al listino:** "Legal Entity Identifier" (il listino ha "Identity"), "dal cliente", "outsourcing", "Comunicazioni annuali Utenze". Esclusi anche "(per ogni nota da consultare)", "(per 100 pag.)" e "Per ulteriori multipli…", che sono indicazioni di prezzo.
  - **Da verificare col cliente:** la pagina *Soluzioni per Professionisti* cita ancora "accesso alle banche dati camerali" (servizio non più a listino).
- **Slider della Home:** scegliendo una slide con i pulsanti numerati, il focus passa al primo link della slide. Così i link della slide (es. "Soluzioni per le imprese" e "Soluzioni per Professionisti") si raggiungono e si attivano da tastiera. L'aspetto non cambia.

## Modifiche del 05/10/2026 (testi e pagine Soggetti)

- **Nome:** in tutto il sito "AgenziaImpresa" diventa "Agenzia Impresa" (titoli, testi, dati strutturati). Restano invariati la ragione sociale **AGENZIAIMPRESA SRL** e domini ed email `agenziaimpresa.com`.
- **Menu:** la voce "Soluzioni" diventa "Soggetti" (anche nel percorso di navigazione); i titoli delle pagine "Soluzioni per le imprese / per Professionisti" restano.
- **Frase di contatto** (fondo pagina, Sedi, Contatti): "Scrivici: analizzeremo il tuo caso e ti indicheremo gli adempimenti necessari."
- **Pagine Imprese e Professionisti:** nuovo testo introduttivo e nuovo elenco "A chi ci rivolgiamo". Dopo c'è la sezione dei principi Adempio della Home (stesso componente, con loghi); sulla pagina Imprese è seguita dalla frase sul portale Adempio. In "Cosa facciamo…" sono tolti i bottoni verso i servizi. "Come lavoriamo" ha il titolo "Dalla richiesta al risultato" e i 4 passi riscritti, distinti per Imprese e Professionisti; l'ultimo passo si chiama "Risultato".
- **Chi siamo:** riscritti il 2° e il 3° paragrafo della storia, aggiunto "In questo modo Agenzia Impresa…", eliminato il paragrafo sulla fusione del 2020.
- **Foto delle pagine Soggetti:** Imprese ha un mosaico di 4 settori (Commercio, Ristorazione, Artigianato, Logistica), tre con persone al lavoro. Professionisti ha una foto di professionisti in abito formale, donne e uomini. Tutte le foto vengono da Unsplash, gratuite, e si svelano con l'animazione diagonale del sito (disattivata con "riduci movimento"). Su desktop il testo di "A chi ci rivolgiamo" è più grande e centrato in verticale sull'elenco; il logo Adempio sotto i principi è centrato.
- **Refusi corretti nei testi forniti:** "il disbrigo degli adempimenti", "Centri elaborazione dati", "pubbliche amministrazioni", spazi dopo le virgole, doppio punto finale.

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
