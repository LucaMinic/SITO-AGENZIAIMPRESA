# agenziaimpresa.com — nuovo sito

Redesign completo di agenziaimpresa.com. Lo stack è:
- Vite + React 19 + Tailwind CSS 4;
- pagine **pre-renderizzate in HTML statico** in fase di build;
- deploy su Vercel.

Analisi e piano sono in [`docs/`](docs/):
- [`01-analisi-fase-1.md`](docs/01-analisi-fase-1.md): sitemap, architettura, design direction, problemi;
- [`02-content-inventory.md`](docs/02-content-inventory.md): vecchie URL → nuove destinazioni;
- [`contenuti-originali/`](docs/contenuti-originali/): testi estratti dal sito precedente.

## Comandi

```bash
npm install
npm run dev        # sviluppo con hot reload (http://localhost:5173)
npm run build      # build client + SSR + pre-rendering di tutte le pagine in dist/
npm run preview    # serve dist/ come su Vercel (http://localhost:4173)
npm run lint
npm run redirects  # rigenera vercel.json (redirect 301 dalle vecchie URL WordPress)
```

## Pubblicazione

- **Anteprima su GitHub Pages:** <https://lucaminic.github.io/SITO-AGENZIAIMPRESA/>
  - si pubblica da sola a ogni push su `main` (`.github/workflows/pages.yml`);
  - la prima volta va attivata in *Settings → Pages → Source: GitHub Actions*;
  - è esclusa dai motori di ricerca;
  - i moduli mostrano i telefoni delle sedi, perché GitHub Pages non esegue codice lato server.
- **Hosting definitivo:** `npm run build` e caricare il contenuto di `dist/` nella radice del dominio.
  - Ogni pagina è `cartella/index.html`, quindi funziona su qualsiasi hosting statico (Apache, nginx…).
  - I redirect dalle vecchie URL sono in `vercel.json`: su un altro hosting vanno riportati nella sua configurazione, per esempio `.htaccess`.
  - Per i moduli serve un endpoint di invio: `VITE_CONTACT_ENDPOINT` in build, oppure `api/contact.js` su Vercel.
- **Sottocartella:** per pubblicare in una sottocartella, `BASE_PATH=/cartella/ npm run build`. Con `PREVIEW=1` il sito viene escluso dai motori di ricerca.

## Struttura

| Percorso | Contenuto |
|---|---|
| `src/content/site.js` | Dati societari, sedi, testi istituzionali, link "Registrati" (`REGISTER_URL`) |
| `src/content/images.js` | Fotografie (Unsplash) usate nelle pagine |
| `src/content/search.js` | Indice e funzione di ricerca del sito |
| `src/content/services.generated.js` | Le 10 aree, i 46 servizi e le 12 schede informative (testi originali) |
| `src/content/legal.generated.js` | Privacy policy, cookie policy, note legali (testi originali) |
| `src/content/services.js` | Funzioni di supporto: URL, conteggi, indice di ricerca |
| `src/routes.js` | Elenco pagine con title e description (usato per pre-rendering e sitemap) |
| `src/components/` | Header + mega-menu, Footer, form contatti, sedi, componenti UI |
| `src/pages/` | Template di pagina |
| `scripts/prerender.mjs` | Genera un HTML per pagina, `404.html`, `sitemap.xml`, `robots.txt` |
| `api/contact.js` | Funzione serverless Vercel per l'invio dei moduli |
| `public/brand/` | Logo (positivo, negativo) e simbolo in Main Blu `#0007e0` |

### Modificare i contenuti

- I testi istituzionali e le sedi si modificano in `src/content/site.js`.
- Servizi e prestazioni si modificano in `src/content/services.generated.js`, che è un normale file dati. Dopo una modifica agli slug dei servizi, eseguire `npm run redirects`.

## Moduli di contatto

I moduli inviano a `contact.php` (in `public/`), uno script PHP per l'hosting definitivo. Lo script inoltra il messaggio alla casella della sede scelta; il "Rispondi" va al mittente.

| Sede | Destinatario |
|---|---|
| Milano | milano@agenziaimpresa.com |
| Mantova | brescia@agenziaimpresa.com *(indicato dal cliente, da confermare)* |
| Modena | modena@agenziaimpresa.com |
| Brescia (e Darfo Boario Terme) | brescia@agenziaimpresa.com |
| Bologna | adempio.pratiche@agenziaimpresa.com |
| Nessuna sede scelta / Apri la tua Agenzia | milano@agenziaimpresa.com *(da confermare)* |

Gli indirizzi e il mittente tecnico (`noreply@agenziaimpresa.com`, che deve appartenere al dominio dell'hosting) si modificano in testa a `public/contact.php`.

- Lo script usa la funzione `mail()` di PHP. Se l'hosting richiede SMTP autenticato, va adattato.
- **Su GitHub Pages** lo script non viene eseguito: il modulo mostra i numeri di telefono delle sedi.
- **Su Vercel** si può usare la funzione `api/contact.js` (invio con Resend). In quel caso va impostato `VITE_CONTACT_ENDPOINT=/api/contact` in build, più le variabili `RESEND_API_KEY`, `CONTACT_FROM` e, facoltativa, `CONTACT_TO`.

## Design system

Il design segue le Brand Guidelines Buffetti Group (marzo 2026):
- font Hanken Grotesk, self-hosted;
- palette Main Blu `#0007e0`, Dark Blu `#002685`, Light Blu `#426fde`, Gray `#ebebeb`;
- tagli a 45°;
- gradiente di brand (`BrandField` in `src/components/ui.jsx`);
- griglia a 8 colonne con margini ≈ 1/25 del lato lungo.

I token sono in `src/index.css`.
