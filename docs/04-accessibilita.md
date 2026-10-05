# Accessibilità – Rapporto di verifica (EAA / WCAG)

| | |
|---|---|
| **Data** | 02/10/2026 |
| **Riferimenti** | Direttiva (UE) 2019/882 (European Accessibility Act); D.Lgs. 82/2022; Legge 4/2004; UNI EN 301 549 → WCAG 2.1 livello AA. Sono stati verificati anche i criteri aggiuntivi WCAG 2.2 AA. |
| **Ambito** | Tutte le 87 pagine del sito, più la pagina 404, in visualizzazione desktop (1440 px) e mobile (390 px). |
| **Dichiarazione pubblicata** | Nessuna: la pagina `/dichiarazione-accessibilita` e la voce "Accessibilità" nel footer sono state eliminate su richiesta (05/10/2026). |

> **Nota sull'ambito normativo.** L'EAA si applica ai servizi indicati dalla direttiva rivolti ai consumatori: e-commerce, servizi bancari, trasporti, comunicazioni elettroniche e simili. L'applicabilità a un sito B2B informativo, e l'eventuale obbligo previsto dalla Legge 4/2004 (art. 3, c. 1-bis) per le grandi imprese, va confermata dal consulente legale. Il sito è comunque realizzato per essere conforme.

## 1. Test automatici

**Strumento:** axe-core 4.10, eseguito su tutte le pagine nei due viewport.

**Regole applicate:**
- `wcag2a`, `wcag2aa`
- `wcag21a`, `wcag21aa`
- `wcag22aa`
- `best-practice`

| Esito | Dettaglio |
|---|---|
| Violazioni WCAG A/AA | **0** |
| Indicazioni best-practice | **0**. L'unica rilevata, `landmark-complementary-is-top-level`, è stata corretta. |

## 2. Verifiche manuali

| Criterio WCAG | Verifica | Esito |
|---|---|---|
| 1.1.1 Contenuti non testuali | Testo alternativo descrittivo per ogni fotografia; icone decorative con `aria-hidden` | ✅ |
| 1.3.1 Informazioni e correlazioni | Una sola H1 per pagina, nessun salto di livello nei titoli (controllo automatico su ogni pagina); landmark; elenchi semantici | ✅ |
| 1.3.5 Scopo degli input | `autocomplete` su nome ed email | ✅ |
| 1.4.3 Contrasto (minimo) | Token di colore verificati. Testi sopra le foto dell'hero misurati sul pixel più chiaro dello sfondo, da 360 a 1920 px: minimo **4,95:1**. Su schermi fino a 1279 px è stata aggiunta una velatura uniforme. | ✅ |
| 1.4.4 / 1.4.10 Ridimensionamento e reflow | 320 px su tutte le pagine, senza scorrimento orizzontale. Le parole molto lunghe vanno a capo. | ✅ |
| 1.4.12 Spaziatura del testo | Interlinea 1,5, spaziatura lettere 0,12 em, parole 0,16 em, paragrafi 2 em: nessun contenuto tagliato. L'hero ora si allunga invece di avere altezza fissa; le anteprime delle schede mostrano la frase completa. | ✅ |
| 1.4.13 Contenuto al passaggio del mouse | Mega-menu e menu a tendina: si chiudono con Esc, restano aperti al passaggio del puntatore e non scompaiono finché non si esce | ✅ |
| 2.1.1 / 2.1.2 Tastiera, nessun blocco | Percorso di 139 Tab sulla Home: tutti i controlli raggiungibili, nessun blocco del focus. Menu, ricerca (frecce, Invio, Esc), slider e moduli utilizzabili da tastiera | ✅ |
| 2.2.2 Pausa, stop, nascondi | Slider: pulsante di pausa, arresto al passaggio del mouse o del focus, nessuna rotazione se è attiva la riduzione del movimento | ✅ |
| 2.3.3 Animazioni da interazioni | `prefers-reduced-motion` rispettato | ✅ |
| 2.4.1 Salto dei blocchi | Link "Vai al contenuto" | ✅ |
| 2.4.2 Titolo della pagina | Titoli univoci e descrittivi | ✅ |
| 2.4.7 / 2.4.11 Focus visibile, non oscurato | Contorno di 2 px su ogni elemento. Nessun elemento con il focus coperto dall'header fisso. | ✅ |
| 2.5.8 Dimensione dell'obiettivo (WCAG 2.2) | Tutti i controlli alti almeno 24 px; link di footer, breadcrumb e telefoni adeguati | ✅ |
| 3.1.1 Lingua della pagina | `lang="it"` | ✅ |
| 3.2.3 / 3.2.6 Navigazione e aiuto coerenti | Header e footer identici in tutte le pagine; recapiti sempre nel footer | ✅ |
| 3.3.1 / 3.3.2 / 3.3.3 Errori ed etichette | Etichette sempre visibili, campi obbligatori indicati, errori associati con `aria-describedby`, focus sul primo errore | ✅ |
| 4.1.2 / 4.1.3 Nome, ruolo, valore; messaggi di stato | Pulsanti con `aria-expanded` e `aria-controls`, ricerca come combobox ARIA, esito dei moduli con `role="status"` o `role="alert"` | ✅ |

## 3. Limiti della verifica e raccomandazioni

- **Lettore di schermo.** La verifica è un'autovalutazione tecnica e non è stata fatta con un lettore di schermo vero (NVDA, JAWS o VoiceOver). Prima della pubblicazione definitiva si raccomanda una prova manuale con NVDA su Windows e VoiceOver su iOS.
- **Contenuti di terze parti.** Le mappe Google (caricate su richiesta) e i portali EccoSolution (area clienti) sono esclusi dalla dichiarazione.
- **Nuovi contenuti.** Testi e foto aggiunti in futuro devono mantenere le stesse regole: testo alternativo, titoli in ordine, contrasto. Ripetere axe a ogni rilascio.
- **Dichiarazione.** La pagina è stata eliminata il 05/10/2026. Se il cliente deciderà di pubblicare le informazioni sull'accessibilità, andrà creata una nuova pagina collegata dal footer, da riesaminare almeno una volta l'anno e a ogni modifica sostanziale.
