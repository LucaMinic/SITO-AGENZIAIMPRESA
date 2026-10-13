// Logica del consenso, indipendente dall'interfaccia: legge e scrive il cookie cc_consent,
// risponde a hasConsent(), sblocca gli script bloccati e avvisa chi ascolta
// (i componenti React e consentApi.js, che registra ogni scelta sul backend).
import {
  ACCEPT_MAX_AGE_DAYS,
  CONSENT_COOKIE,
  POLICY_VERSION,
  REJECT_MAX_AGE_DAYS,
  SERVICES,
  servicesSignature,
} from './cookieConfig.js'

const OPTIONAL = ['preferences', 'statistics', 'marketing']
const COOKIE_PATH = import.meta.env.BASE_URL || '/'
const isBrowser = typeof document !== 'undefined'

function uuidv4() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

function readCookie(name) {
  if (!isBrowser) return null
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null
}

function writeCookie(name, value, maxAgeDays) {
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeDays * 86400}; Path=${COOKIE_PATH}; SameSite=Lax${secure}`
}

function deleteCookie(name) {
  // Il cookie può essere stato scritto sulla radice o sulla cartella del sito.
  for (const path of new Set(['/', COOKIE_PATH])) {
    document.cookie = `${name}=; Max-Age=0; Path=${path}`
  }
}

function loadRecord() {
  try {
    const raw = readCookie(CONSENT_COOKIE)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed.consent_id === 'string' && parsed.categories ? parsed : null
  } catch {
    return null
  }
}

// Versione della policy e stato del banner: valori locali, sostituiti dalla configurazione
// del backend (POST /consent/config) appena arriva.
let policyVersion = POLICY_VERSION
let bannerActive = true

function isCurrent(record) {
  return !!record && record.policy_version === policyVersion && record.services === servicesSignature()
}

const initialRecord = loadRecord()
let state = {
  record: initialRecord,
  needsChoice: isBrowser && !isCurrent(initialRecord),
  preferencesOpen: false,
}
// Stato usato nel pre-rendering e durante l'idratazione: nessun consenso e nessun banner,
// così l'HTML statico è uguale per tutti e il banner compare solo nel browser.
export const SERVER_STATE = { record: null, needsChoice: false, preferencesOpen: false }

// Generato alla prima visita e riusato per questo browser: preso dalla scelta salvata se c'è,
// altrimenti creato ora e salvato con la prima scelta.
const consentId = initialRecord?.consent_id ?? (isBrowser ? uuidv4() : '')

const stateListeners = new Set()
const choiceListeners = new Set()

function setState(patch) {
  state = { ...state, ...patch }
  stateListeners.forEach((l) => l())
}

/**
 * Applica la configurazione del backend. Una versione della policy diversa richiede di nuovo
 * il consenso; `active: false` nasconde il banner (i contenuti facoltativi restano bloccati).
 */
export function applyRemoteConfig({ policyVersion: remoteVersion, active }) {
  if (remoteVersion) policyVersion = remoteVersion
  bannerActive = active !== false
  setState({ needsChoice: bannerActive && !isCurrent(state.record) })
}

export function getConsentState() {
  return state
}

export function subscribe(listener) {
  stateListeners.add(listener)
  return () => stateListeners.delete(listener)
}

/** Chiamato dopo ogni scelta con l'azione e il record salvato (usato per registrare il consenso). */
export function onConsentChoice(listener) {
  choiceListeners.add(listener)
  return () => choiceListeners.delete(listener)
}

/** True se nello stato dato la categoria è accettata ('necessary' è sempre true). */
export function hasConsentIn(s, category) {
  if (category === 'necessary') return true
  return isCurrent(s.record) && s.record.categories[category] === true
}

export function hasConsent(category) {
  return hasConsentIn(state, category)
}

/** Categorie concesse in questo momento (tutte le facoltative spente se non c'è una scelta valida). */
export function currentCategories() {
  return {
    necessary: true,
    preferences: hasConsent('preferences'),
    statistics: hasConsent('statistics'),
    marketing: hasConsent('marketing'),
  }
}

/** "Accetta tutti" concede ogni categoria facoltativa, "Rifiuta tutti" nessuna. */
export function allCategories(granted) {
  return { necessary: true, preferences: granted, statistics: granted, marketing: granted }
}

export function openPreferences() {
  setState({ preferencesOpen: true })
}

export function closePreferences() {
  setState({ preferencesOpen: false })
}

/**
 * Salva una scelta. `kind` dice come è stata fatta ('accept_all' | 'reject_all' | 'custom');
 * se esiste già una scelta valida l'azione registrata è 'update', oppure 'withdraw' se revoca
 * tutto ciò che era stato concesso.
 */
export function saveChoice(kind, categories) {
  const previous = isCurrent(state.record) ? state.record.categories : null
  const next = { ...categories, necessary: true }

  let action = kind
  if (previous) {
    const hadOptional = OPTIONAL.some((c) => previous[c])
    const hasOptional = OPTIONAL.some((c) => next[c])
    action = hadOptional && !hasOptional ? 'withdraw' : 'update'
  }

  const record = {
    consent_id: consentId,
    policy_version: policyVersion,
    services: servicesSignature(),
    categories: next,
    timestamp: new Date().toISOString(),
  }
  const anyOptional = OPTIONAL.some((c) => next[c])
  writeCookie(CONSENT_COOKIE, JSON.stringify(record), anyOptional ? ACCEPT_MAX_AGE_DAYS : REJECT_MAX_AGE_DAYS)

  const revokedCategories = previous ? OPTIONAL.filter((c) => previous[c] && !next[c]) : []
  setState({ record, needsChoice: false, preferencesOpen: false })
  choiceListeners.forEach((l) => l(action, record))

  if (revokedCategories.length) cleanUpRevoked(revokedCategories)
  activateBlockedScripts()
}

/** Concede una categoria in più (pulsante "Attiva contenuto" di un segnaposto). */
export function grantCategory(category) {
  saveChoice('custom', { ...currentCategories(), [category]: true })
}

// --- Revoca -----------------------------------------------------------------

const activatedCategories = new Set()

function cleanUpRevoked(categories) {
  for (const service of SERVICES) {
    if (!categories.includes(service.category)) continue
    for (const cookie of service.cookies) {
      if (cookie.party !== 'first') continue
      if (cookie.type === 'cookie') deleteCookie(cookie.name)
      else {
        try {
          localStorage.removeItem(cookie.name)
        } catch {
          // storage non disponibile
        }
      }
    }
  }
  // Gli script già eseguiti non si possono scaricare: si ricarica la pagina.
  if (categories.some((c) => activatedCategories.has(c))) location.reload()
}

// --- Script bloccati --------------------------------------------------------
// Gli script di terze parti si inseriscono come
//   <script type="text/plain" data-cookie-category="statistics" src="..."></script>
// e diventano script veri solo quando la loro categoria è accettata.

export function activateBlockedScripts() {
  if (!isBrowser) return
  document.querySelectorAll('script[type="text/plain"][data-cookie-category]').forEach((original) => {
    const category = original.dataset.cookieCategory
    if (!hasConsent(category)) return
    const script = document.createElement('script')
    for (const attr of original.getAttributeNames()) {
      if (attr !== 'type') script.setAttribute(attr, original.getAttribute(attr))
    }
    script.type = original.dataset.type || 'text/javascript'
    if (!original.src) script.text = original.text
    original.replaceWith(script)
    activatedCategories.add(category)
  })
}

// API pubblica per il codice fuori da React (script inline o console del browser).
if (isBrowser) {
  window.cookieConsent = { hasConsent, openPreferences }
  activateBlockedScripts()
}
