import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import { CONTACT_EMAIL, sedi, telHref } from '../content/site.js'
import { ConsentGate } from './CookieConsent.jsx'
import { Button, Icon } from './ui.jsx'

/*
 * Modulo di contatto. Invia il messaggio al servizio email EccoSolution (lo stesso del
 * sito Gruppo APM), indirizzato alla casella della sede scelta (sedi[].email in site.js)
 * o, senza sede, a CONTACT_EMAIL. L'indirizzo del servizio si può cambiare con
 * VITE_CONTACT_ENDPOINT. Se l'invio non riesce il modulo mostra i telefoni delle sedi.
 *
 * Il servizio verifica il Google reCAPTCHA v2 (captchaToken). reCAPTCHA imposta cookie di Google,
 * quindi si carica solo dopo il consenso (servizio "recaptcha" in consent/cookieConfig.js).
 */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || 'https://eccopec-v2.eccosolution.it/Email/SendKaleyraMessage'
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

export default function ContactForm({ sede = '', origin = 'contatti', showSede = !sede, defaultSubject = '' }) {
  const id = useId()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const [subject, setSubject] = useState(defaultSubject)
  const recaptchaRef = useRef(null)

  // Oggetto precompilato dalle pagine servizio (?oggetto=…).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('oggetto')
    if (q) setSubject(q)
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const errs = {}
    if (!data.name?.trim()) errs.name = 'Inserisci il tuo nome.'
    if (!data.email?.trim()) errs.email = 'Inserisci la tua email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Controlla l’indirizzo email.'
    if (!data.message?.trim()) errs.message = 'Scrivi il tuo messaggio.'
    const captchaToken = recaptchaRef.current?.getValue() || ''
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      errs.captcha = recaptchaRef.current
        ? 'Conferma di non essere un robot.'
        : 'Per inviare il modulo attiva la verifica antispam qui sopra.'
    }
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      if (first === 'captcha') form.querySelector('[data-captcha] iframe, [data-captcha] button')?.focus()
      else form.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    // Campo trappola compilato: è un bot. Mostriamo l'esito positivo senza inviare nulla.
    if (data.website) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const target = sedi.find((s) => s.slug === data.sede)
      const to = target?.email || CONTACT_EMAIL
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: to,
          to,
          subject: `[Sito] ${data.subject?.trim() || 'Richiesta informazioni'}${target ? ` – ${target.city}` : ''}`,
          text: [
            'Nuovo messaggio dal sito Agenzia Impresa',
            '',
            `Nome: ${data.name.trim()}`,
            `Email: ${data.email.trim()}`,
            `Sede: ${target?.city || '—'}`,
            `Oggetto: ${data.subject?.trim() || '—'}`,
            `Provenienza: ${origin} (${window.location.pathname})`,
            '',
            'Messaggio:',
            data.message.trim(),
          ].join('\n'),
          captchaToken,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        setSubject('')
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
    // Il token vale per un solo invio.
    recaptchaRef.current?.reset()
  }

  if (status === 'sent') {
    return (
      <div role="status" className="border-l-2 border-brand bg-mist/60 p-8">
        <p className="text-h3">Grazie, il tuo messaggio è stato inviato.</p>
        <p className="mt-2 text-muted">Ti risponderemo il prima possibile.</p>
      </div>
    )
  }

  const field =
    'mt-2 block w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-700'
  const label = 'text-sm font-semibold'
  const err = (k) =>
    errors[k] && (
      <p id={`${id}-${k}-err`} className="mt-2 text-sm text-red-700">
        {errors[k]}
      </p>
    )
  const a11y = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined })

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <div>
        <label htmlFor={`${id}-name`} className={label}>
          Il tuo nome <span aria-hidden="true" className="text-brand">*</span>
        </label>
        <input id={`${id}-name`} name="name" autoComplete="name" required className={field} {...a11y('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={label}>
          La tua email <span aria-hidden="true" className="text-brand">*</span>
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          className={field}
          {...a11y('email')}
        />
        {err('email')}
      </div>
      {showSede ? (
        <div>
          <label htmlFor={`${id}-sede`} className={label}>
            Sede
          </label>
          <select id={`${id}-sede`} name="sede" defaultValue="" className={`${field} appearance-none`}>
            <option value="">Nessuna preferenza</option>
            {sedi.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.city}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <input type="hidden" name="sede" value={sede} />
      )}
      <div className={showSede ? '' : 'sm:col-span-2'}>
        <label htmlFor={`${id}-subject`} className={label}>
          Oggetto
        </label>
        <input
          id={`${id}-subject`}
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={field}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          Il tuo messaggio <span aria-hidden="true" className="text-brand">*</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={5} required className={`${field} resize-y`} {...a11y('message')} />
        {err('message')}
      </div>
      {RECAPTCHA_SITE_KEY && (
        <div data-captcha className="sm:col-span-2">
          <ConsentGate service="recaptcha" className="max-w-md">
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} hl="it" />
          </ConsentGate>
          {err('captcha')}
        </div>
      )}
      {/* Campo trappola anti-spam: invisibile alle persone. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Lascia vuoto questo campo</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-muted">
          I campi con <span className="text-brand">*</span> sono obbligatori. Inviando il modulo dichiari di aver letto
          l’
          <Link to="/privacy-policy" className="text-ink underline underline-offset-2">
            informativa privacy
          </Link>
          .
        </p>
        <Button type="submit" disabled={status === 'sending'} className="shrink-0 disabled:opacity-60">
          {status === 'sending' ? 'Invio in corso…' : 'Invia'}
        </Button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {status === 'error' && <SendFallback sede={sede} />}
      </div>
    </form>
  )
}

function SendFallback({ sede }) {
  const list = sede ? sedi.filter((s) => s.slug === sede) : sedi
  return (
    <div role="alert" className="border-l-2 border-brand bg-mist/60 p-6">
      <p className="font-semibold">Non è stato possibile inviare il messaggio.</p>
      <p className="mt-1 text-muted">Puoi contattare direttamente le nostre sedi:</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {list.flatMap((s) =>
          s.locations.map((l) => (
            <li key={l.city}>
              {l.phone ? (
                <a href={telHref(l.phone)} className="inline-flex items-center gap-2 font-medium hover:text-brand">
                  <Icon name="phone" className="size-4 text-brand" />
                  {l.city} · {l.phone}
                </a>
              ) : (
                // Sede senza telefono (per ora Reggio Emilia): indirizzo.
                <span className="inline-flex items-center gap-2 font-medium">
                  <Icon name="pin" className="size-4 text-brand" />
                  {l.city} · {l.address}
                </span>
              )}
            </li>
          )),
        )}
      </ul>
    </div>
  )
}
