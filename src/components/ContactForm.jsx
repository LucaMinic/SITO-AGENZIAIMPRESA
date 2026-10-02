import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { sedi, telHref } from '../content/site.js'
import { Button, Icon } from './ui.jsx'

/*
 * Modulo di contatto. Invia allo script PHP contact.php (hosting definitivo), che
 * inoltra il messaggio alla casella della sede scelta. In alternativa l'indirizzo si
 * imposta con VITE_CONTACT_ENDPOINT (es. /api/contact per la funzione Vercel).
 * Finché i destinatari email non sono configurati l'API risponde 503 e
 * il modulo mostra i recapiti telefonici come alternativa.
 */
export default function ContactForm({ sede = '', origin = 'contatti', showSede = !sede, defaultSubject = '' }) {
  const id = useId()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | unavailable
  const [errors, setErrors] = useState({})
  const [subject, setSubject] = useState(defaultSubject)

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
    setErrors(errs)
    if (Object.keys(errs).length) {
      form.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_ENDPOINT || `${import.meta.env.BASE_URL}contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, origin, page: window.location.pathname }),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        setSubject('')
      } else setStatus(res.status === 503 ? 'unavailable' : 'error')
    } catch {
      setStatus('error')
    }
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
        {(status === 'error' || status === 'unavailable') && <SendFallback sede={sede} />}
      </div>
    </form>
  )
}

function SendFallback({ sede }) {
  const list = sede ? sedi.filter((s) => s.slug === sede) : sedi
  return (
    <div role="alert" className="border-l-2 border-brand bg-mist/60 p-6">
      <p className="font-semibold">Non è stato possibile inviare il messaggio.</p>
      <p className="mt-1 text-muted">Puoi contattarci telefonicamente:</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {list.flatMap((s) =>
          s.locations.map((l) => (
            <li key={l.city}>
              <a href={telHref(l.phone)} className="inline-flex items-center gap-2 font-medium hover:text-brand">
                <Icon name="phone" className="size-4 text-brand" />
                {l.city} · {l.phone}
              </a>
            </li>
          )),
        )}
      </ul>
    </div>
  )
}
