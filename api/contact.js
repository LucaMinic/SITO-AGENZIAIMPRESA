// Funzione serverless Vercel: riceve i moduli di contatto e li inoltra via email (Resend).
//
// Variabili d'ambiente (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY              chiave API di Resend (https://resend.com)
//   CONTACT_FROM                mittente verificato, es. "Sito AgenziaImpresa <sito@agenziaimpresa.com>"
//   CONTACT_TO                  destinatario predefinito
//   CONTACT_TO_MILANO … _BOLOGNA destinatari per sede (opzionali)
//   CONTACT_TO_APRI_AGENZIA     destinatario per "Apri la tua Agenzia" (opzionale)
//
// Finché RESEND_API_KEY / CONTACT_FROM / CONTACT_TO non sono impostate risponde 503
// e il modulo mostra i recapiti telefonici delle sedi.

const SEDI = ['milano', 'mantova', 'modena', 'brescia', 'bologna']
// Destinatari per sede indicati dal cliente (sovrascrivibili con CONTACT_TO_<SEDE>).
const RECIPIENTS = {
  milano: 'milano@agenziaimpresa.com',
  mantova: 'brescia@agenziaimpresa.com',
  modena: 'modena@agenziaimpresa.com',
  brescia: 'brescia@agenziaimpresa.com',
  bologna: 'adempio.pratiche@agenziaimpresa.com',
}
const clip = (v, n) => String(v ?? '').trim().slice(0, n)
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}

  // Campo trappola compilato: è un bot. Rispondiamo OK senza inviare nulla.
  if (body.website) return res.status(200).json({ ok: true })

  const data = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    subject: clip(body.subject, 200),
    message: clip(body.message, 5000),
    sede: SEDI.includes(body.sede) ? body.sede : '',
    origin: clip(body.origin, 60),
    page: clip(body.page, 300),
  }
  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ error: 'invalid' })
  }

  const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env
  const to =
    (data.origin === 'apri-la-tua-agenzia' && (process.env.CONTACT_TO_APRI_AGENZIA || 'network@agenziaimpresa.com')) ||
    (data.sede && (process.env[`CONTACT_TO_${data.sede.toUpperCase()}`] || RECIPIENTS[data.sede])) ||
    CONTACT_TO ||
    RECIPIENTS.milano
  if (!RESEND_API_KEY || !CONTACT_FROM || !to) return res.status(503).json({ error: 'not_configured' })

  const rows = [
    ['Nome', data.name],
    ['Email', data.email],
    ['Sede', data.sede || '—'],
    ['Oggetto', data.subject || '—'],
    ['Provenienza', `${data.origin} (${data.page})`],
  ]
  const html =
    `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
      .map(([k, v]) => `<tr><td style="color:#555">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
      .join('')}</table>` +
    `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>`

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: to.split(',').map((s) => s.trim()),
      reply_to: data.email,
      subject: `[Sito] ${data.subject || 'Richiesta informazioni'}${data.sede ? ` – ${data.sede}` : ''}`,
      html,
    }),
  })
  if (!r.ok) return res.status(502).json({ error: 'send_failed' })
  return res.status(200).json({ ok: true })
}
