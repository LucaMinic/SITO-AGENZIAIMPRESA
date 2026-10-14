import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './ui.jsx'
import { categoryTexts, fill, ui } from '../consent/consentTexts.js'
import { SERVICES, activeCategories, serviceById } from '../consent/cookieConfig.js'
import {
  allCategories,
  closePreferences,
  currentCategories,
  grantCategory,
  openPreferences,
  saveChoice,
} from '../consent/consentStore.js'
import { useConsentState, useHasConsent } from '../consent/useConsent.js'

// Le tre scelte hanno lo stesso identico aspetto: nessuna opzione è favorita visivamente.
const CHOICE_BTN =
  'inline-flex min-h-12 w-full items-center justify-center bg-brand px-5 py-3 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-brand-dark sm:w-auto sm:flex-1'

/** Banner (primo livello) + pannello preferenze (secondo livello). Montato una volta in App. */
export default function CookieConsent() {
  return (
    <>
      <CookieBanner />
      <CookiePreferences />
    </>
  )
}

/** Primo livello: visibile finché il visitatore non sceglie. Il sito resta utilizzabile. */
function CookieBanner() {
  const { needsChoice, preferencesOpen } = useConsentState()
  const ref = useRef(null)
  const visible = needsChoice && !preferencesOpen

  // Sposta il focus sul banner quando compare, così chi usa tastiera o screen reader lo raggiunge.
  useEffect(() => {
    if (visible) ref.current?.focus()
  }, [visible])

  if (!needsChoice) return null

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
      tabIndex={-1}
      hidden={preferencesOpen}
      data-cookie-banner
      className="fixed inset-x-0 bottom-0 z-[60] p-3 outline-none sm:p-4"
    >
      <div className="relative mx-auto max-h-[85vh] max-w-4xl overflow-y-auto border-t-4 border-brand bg-white p-5 text-ink shadow-[0_-8px_40px_rgb(0_16_63/0.25)] sm:p-7">
        <button
          type="button"
          onClick={() => saveChoice('reject_all', allCategories(false))}
          className="absolute right-2 top-2 flex size-11 items-center justify-center text-ink/70 hover:bg-mist hover:text-ink"
          aria-label={ui.closeBanner}
          title={ui.closeBanner}
        >
          <Icon name="close" className="size-5" />
        </button>

        <h2 id="cookie-banner-title" className="text-h3 mb-2 pr-12">
          {ui.bannerTitle}
        </h2>
        <p id="cookie-banner-text" className="mb-5 text-[0.9375rem] leading-relaxed text-muted">
          {ui.bannerText}{' '}
          <Link to="/cookie-policy" className="font-semibold text-ink underline underline-offset-2 hover:text-brand">
            {ui.policyLink}
          </Link>
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" className={CHOICE_BTN} onClick={() => saveChoice('reject_all', allCategories(false))}>
            {ui.rejectAll}
          </button>
          <button type="button" className={CHOICE_BTN} onClick={openPreferences}>
            {ui.customize}
          </button>
          <button type="button" className={CHOICE_BTN} onClick={() => saveChoice('accept_all', allCategories(true))}>
            {ui.acceptAll}
          </button>
        </div>
      </div>
    </div>
  )
}

/** Secondo livello: un interruttore per categoria, tutte le facoltative spente di default. */
function CookiePreferences() {
  const { preferencesOpen } = useConsentState()
  const ref = useRef(null)
  const [choice, setChoice] = useState(currentCategories)

  // <dialog> nativo: tiene il focus nel pannello, Esc lo chiude, ripristina il focus alla chiusura.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (preferencesOpen && !dialog.open) {
      setChoice(currentCategories())
      dialog.showModal()
    } else if (!preferencesOpen && dialog.open) {
      dialog.close()
    }
  }, [preferencesOpen])

  return (
    <dialog
      ref={ref}
      onClose={closePreferences}
      aria-labelledby="cookie-prefs-title"
      aria-describedby="cookie-prefs-intro"
      className="m-auto max-h-[90vh] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto bg-white p-5 text-ink shadow-2xl backdrop:bg-ink/60 sm:p-8"
    >
      {preferencesOpen && (
        <>
          <div className="mb-3 flex items-start justify-between gap-4">
            <h2 id="cookie-prefs-title" className="text-h3">
              {ui.prefsTitle}
            </h2>
            <button
              type="button"
              onClick={closePreferences}
              className="-m-2 flex size-11 shrink-0 items-center justify-center text-ink/70 hover:bg-mist hover:text-ink"
              aria-label={ui.closePrefs}
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>
          <p id="cookie-prefs-intro" className="mb-6 text-[0.9375rem] leading-relaxed text-muted">
            {ui.prefsIntro}
          </p>

          <ul className="mb-6 space-y-4">
            {activeCategories().map((category) => (
              <CategoryRow
                key={category}
                category={category}
                checked={choice[category]}
                onChange={(value) => setChoice((prev) => ({ ...prev, [category]: value }))}
              />
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className={CHOICE_BTN} onClick={() => saveChoice('reject_all', allCategories(false))}>
              {ui.rejectAll}
            </button>
            <button type="button" className={CHOICE_BTN} onClick={() => saveChoice('custom', choice)}>
              {ui.savePrefs}
            </button>
            <button type="button" className={CHOICE_BTN} onClick={() => saveChoice('accept_all', allCategories(true))}>
              {ui.acceptAll}
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}

function CategoryRow({ category, checked, onChange }) {
  const texts = categoryTexts[category]
  const services = SERVICES.filter((s) => s.category === category)
  const titleId = `cookie-cat-${category}`
  const descId = `cookie-cat-${category}-desc`

  return (
    <li className="border border-line p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 id={titleId} className="font-semibold">
          {texts.title}
        </h3>
        {category === 'necessary' ? (
          <span className="whitespace-nowrap text-sm font-semibold text-brand">{ui.alwaysActive}</span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-labelledby={titleId}
            aria-describedby={descId}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-muted'}`}
          >
            <span
              aria-hidden="true"
              className={`ml-0.5 block size-6 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
            />
          </button>
        )}
      </div>
      <p id={descId} className="mt-1 text-sm leading-relaxed text-muted">
        {texts.description}
      </p>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold underline underline-offset-2">{ui.showDetails}</summary>
        <div className="mt-3 space-y-4">
          {services.map((service) => (
            <div key={service.id} className="text-sm">
              <p className="font-semibold">{service.name}</p>
              <p className="text-muted">{service.description}</p>
              <p className="text-muted">
                {ui.provider}: {service.provider}
                {service.privacyPolicyUrl && (
                  <>
                    {' · '}
                    <a href={service.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline">
                      {ui.privacyPolicy}
                    </a>
                  </>
                )}
              </p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="py-1 pr-3 font-semibold">{ui.cookieName}</th>
                      <th scope="col" className="py-1 pr-3 font-semibold">{ui.cookieDuration}</th>
                      <th scope="col" className="py-1 font-semibold">{ui.cookiePurpose}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.cookies.map((cookie) => (
                      <tr key={cookie.name} className="border-b border-line/60 align-top text-muted">
                        <td className="py-1 pr-3 font-mono break-all">
                          {cookie.name}
                          <span className="block font-sans">{cookie.party === 'first' ? ui.firstParty : ui.thirdParty}</span>
                        </td>
                        <td className="py-1 pr-3">{cookie.duration}</td>
                        <td className="py-1">{cookie.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </details>
    </li>
  )
}

/**
 * Mostra il contenuto di terze parti solo con il consenso alla sua categoria; altrimenti un
 * segnaposto con "Attiva contenuto". `service` è un id di SERVICES in cookieConfig.js.
 */
export function ConsentGate({ service: serviceId, children, externalUrl, className = '' }) {
  const service = serviceById(serviceId)
  if (!service) throw new Error(`ConsentGate: servizio "${serviceId}" sconosciuto (aggiungilo a cookieConfig.js)`)
  const allowed = useHasConsent(service.category)
  if (allowed) return children

  const values = { service: service.name, provider: service.provider, category: categoryTexts[service.category].title }
  return (
    <div
      data-consent-placeholder={serviceId}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-mist p-6 text-center ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <span className="relative flex size-12 items-center justify-center bg-brand text-white cut-corner [--cut:10px]">
        <Icon name={service.icon || 'pin'} className="size-5" />
      </span>
      <p className="relative font-semibold">{fill(ui.placeholderTitle, values)}</p>
      <p className="relative max-w-[36ch] text-xs leading-relaxed text-muted">{fill(ui.placeholderText, values)}</p>
      <div className="relative flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => grantCategory(service.category)}
          className="inline-flex min-h-11 items-center bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          {ui.placeholderButton}
        </button>
        <button type="button" onClick={openPreferences} className="min-h-11 text-sm font-semibold underline underline-offset-2">
          {ui.footerLink}
        </button>
      </div>
      {externalUrl && (
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="relative text-sm text-muted underline">
          {fill(ui.placeholderOpenExternal, values)}
        </a>
      )}
    </div>
  )
}
