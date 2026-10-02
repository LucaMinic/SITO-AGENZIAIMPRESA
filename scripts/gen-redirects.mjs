// Genera vercel.json con i redirect 301 dalle URL del vecchio WordPress.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { areas, services, approfondimenti } = await import(pathToFileURL(path.join(REPO, 'src/content/services.generated.js')).href)

const map = {
  '/home': '/',
  '/cosa-facciamo': '/chi-siamo',
  '/imprese': '/soluzioni/imprese',
  '/professionisti': '/soluzioni/professionisti',
  '/formazione': '/chi-siamo',
  '/restainup': '/chi-siamo',
  '/paolo-pistoni': '/chi-siamo',
  '/stefano-colli': '/chi-siamo',
  '/i-nostri-centri': '/sedi',
  '/contatti-milano': '/sedi/milano',
  '/contatti-mantova': '/sedi/mantova',
  '/contatti-modena': '/sedi/modena',
  '/contatti-brescia': '/sedi/brescia',
  '/contatti-bologna': '/sedi/bologna',
  '/iban': '/pagamenti',
  '/blog': '/',
  '/il-rilascio-del-certificato': '/servizi/uffici-esterni',
  '/nasce-restainup': '/chi-siamo',
  '/obbligatorio-pagare-online-il-certificato-dorigine': '/servizi/servizio-estero/il-certificato-d-origine',
  '/fabio-guadagnini-intervista-paolo-pistoni': '/chi-siamo',
  '/author/:path*': '/',
  '/category/:path*': '/servizi',
  '/privacy-cookie-policy': '/privacy-policy',
  '/privacy-policy-2': '/privacy-policy',
  '/privacy-policy-termini-e-condizioni': '/privacy-policy',
  // News, Tecnologia, Formazione, RestainUp e Team eliminati (decisione cliente 02/10/2026)
  // Shop eliminato (decisione cliente 02/10/2026)
  '/negozio': '/',
  '/prodotto/:path*': '/',
  '/categoria-prodotto/:path*': '/',
  '/tag-prodotto/:path*': '/',
  '/carrello': '/',
  '/check-out': '/',
  '/mio-account/:path*': '/',
  '/mio-account': '/',
  '/termini-e-condizioni-duso': '/',
  '/compliance': '/chi-siamo',
}
for (const a of areas) map[`/${a.oldSlug}`] = `/servizi/${a.slug}`
for (const [slug, s] of Object.entries(services)) {
  map[`/${s.oldSlug}`] = s.transversal ? `/servizi/${slug}` : `/servizi/${s.area}/${slug}`
}
for (const [slug, s] of Object.entries(approfondimenti)) map[`/${s.oldSlug}`] = `/servizi/${s.area}/${slug}`
// Il vecchio /contatti era l'elenco sedi: il nuovo /contatti è il modulo, resta valido.

const redirects = Object.entries(map).map(([source, destination]) => ({
  source,
  destination,
  permanent: true,
}))

const config = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  buildCommand: 'npm run build',
  outputDirectory: 'dist',
  cleanUrls: true,
  trailingSlash: false,
  redirects,
  headers: [
    {
      source: '/assets/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ],
    },
  ],
}
fs.writeFileSync(`${REPO}/vercel.json`, JSON.stringify(config, null, 2) + '\n')
console.log(redirects.length, 'redirects')
