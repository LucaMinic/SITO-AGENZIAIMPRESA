# Consenso cookie

Sistema interno, senza CMP esterne: lo stesso usato su restainup e ffb-salvador, adattato a questo sito (JS, solo italiano, stile del sito). Conforme a GDPR, Direttiva ePrivacy, art. 122 Codice Privacy e Linee guida del Garante del 10 giugno 2021.

| File | Ruolo |
|---|---|
| `cookieConfig.js` | **Unico punto di configurazione**: categorie, servizi, cookie e durate, versione della policy |
| `consentTexts.js` | Testi del banner, del pannello e dei segnaposto |
| `consentStore.js` | Logica: cookie `cc_consent`, `hasConsent()`, `openPreferences()`, revoca, sblocco degli script |
| `consentApi.js` | Backend (`VITE_CONSENT_API_URL`): `POST /consent/config` all'avvio, `POST /consent` a ogni scelta, con coda e nuovi tentativi |
| `useConsent.js` | Hook React (`useConsentState`, `useHasConsent`) |
| `../components/CookieConsent.jsx` | Banner, pannello preferenze (`<dialog>`) e `ConsentGate` (segnaposto "Attiva contenuto") |

## Servizi

- **Necessari:** `cc_consent` (cookie), `cc_queue` (Local Storage).
- **Marketing e contenuti esterni:** Google Maps nelle pagine `/sedi/:slug`. Senza consenso al posto della mappa c'è il segnaposto, con il link per aprirla su Google.
- Senza cookie, quindi fuori dal banner: la mappa Leaflet con le tile OpenStreetMap (home e `/sedi`), le foto da images.unsplash.com e i font (serviti dal sito tramite `@fontsource-variable`).

## Pre-rendering

Le pagine sono pre-renderizzate: nell'HTML statico e durante l'idratazione vale `SERVER_STATE` (nessun consenso, nessun banner). Il banner compare solo nel browser e le mappe Google si caricano solo dopo il consenso.

## Configurazione (.env)

```
VITE_CONSENT_API_URL=https://amosport.it   # vuoto = scelte applicate ma non registrate
VITE_COOKIE_POLICY_VERSION=2026-10-13      # usata finché non arriva quella del backend
```

Il backend riconosce il sito dall'origine (`agenziaimpresa.com`, CORS per `https://www.agenziaimpresa.com`).

## Aggiungere un servizio

1. Una voce in `SERVICES` (`cookieConfig.js`). Il banner viene riproposto a tutti.
2. Blocco: embed e iframe dentro `<ConsentGate service="id">…</ConsentGate>`; script come `<script type="text/plain" data-cookie-category="statistics" src="…">`.
3. Testi in `consentTexts.js` e Cookie Policy.
