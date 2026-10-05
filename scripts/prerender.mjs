// Pre-rendering statico: genera un file HTML per ogni pagina, con title, meta,
// canonical e dati strutturati, più sitemap.xml, robots.txt e 404.html.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const { render, routes, metaFor, sedi, company, SITE_URL } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)

// PREVIEW=1: build di anteprima (es. GitHub Pages), esclusa dai motori di ricerca.
const PREVIEW = !!process.env.PREVIEW

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function jsonLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AgenziaImpresa',
    legalName: company.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/agenzia-impresa.svg`,
    vatID: `IT${company.vat}`,
    email: company.pec,
    parentOrganization: { '@type': 'Organization', name: 'Buffetti Group' },
    address: { '@type': 'PostalAddress', streetAddress: 'Via Feltre 32', postalCode: '20132', addressLocality: 'Milano', addressCountry: 'IT' },
    department: sedi.flatMap((s) =>
      s.locations.map((l) => ({
        '@type': 'LocalBusiness',
        name: `AgenziaImpresa ${l.city}`,
        telephone: l.phone,
        url: `${SITE_URL}/sedi/${s.slug}`,
        address: { '@type': 'PostalAddress', streetAddress: l.address, postalCode: l.cap, addressLocality: l.city, addressCountry: 'IT' },
      })),
    ),
  }
  return `<script type="application/ld+json">${JSON.stringify(org)}</script>`
}

function page(url, meta, { notFound = false } = {}) {
  const canonical = SITE_URL + (url === '/' ? '/' : url)
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="AgenziaImpresa – Buffetti Group" />`,
    `<meta property="og:locale" content="it_IT" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    PREVIEW
      ? '<meta name="robots" content="noindex, nofollow" />'
      : meta.noindex || notFound
        ? '<meta name="robots" content="noindex" />'
        : '',
    url === '/' ? jsonLd() : '',
  ]
    .filter(Boolean)
    .join('\n    ')
  return template
    .replace('<!--app-head-->', head)
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace('<meta name="description" content="" />', `<meta name="description" content="${esc(meta.description)}" />`)
    .replace('<!--app-html-->', render(url))
}

let count = 0
for (const r of routes) {
  // /servizi → servizi/index.html: formato servito da GitHub Pages, Vercel e hosting tradizionali.
  const file = path.join(dist, r.path, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page(r.path, metaFor(r.path)))
  count++
}
// Redirect per hosting statici (GitHub Pages, hosting tradizionali), dove vercel.json non vale:
// stessa fonte dei redirect 301 di Vercel (scripts/gen-redirects.mjs → vercel.json).
const BASE = process.env.BASE_PATH || '/'
const { redirects } = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf-8'))
const target = (dest) => BASE.replace(/\/$/, '') + dest
let redirectPages = 0
for (const { source, destination } of redirects.filter((r) => !r.source.includes(':'))) {
  const file = path.join(dist, source, 'index.html')
  if (fs.existsSync(file)) continue // mai sovrascrivere una pagina vera
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(
    file,
    `<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <title>Pagina spostata – AgenziaImpresa</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${SITE_URL}${destination === '/' ? '/' : destination}" />
    <meta http-equiv="refresh" content="0; url=${target(destination)}" />
    <script>location.replace(${JSON.stringify(target(destination))} + location.hash)</script>
  </head>
  <body>
    <p>La pagina è stata spostata: <a href="${target(destination)}">vai alla nuova pagina</a>.</p>
  </body>
</html>
`,
  )
  redirectPages++
}
// Redirect con prefisso (es. /prodotto/…): gestiti dalla pagina 404.
const prefixes = redirects
  .filter((r) => r.source.endsWith('/:path*'))
  .map((r) => [r.source.replace('/:path*', '/'), target(r.destination)])
const prefixScript = `<script>(function(){var b=${JSON.stringify(BASE)},p=location.pathname;if(p.indexOf(b)===0)p='/'+p.slice(b.length);var r=${JSON.stringify(prefixes)};for(var i=0;i<r.length;i++)if(p.indexOf(r[i][0])===0){location.replace(r[i][1]);return}})()</script>`
fs.writeFileSync(
  path.join(dist, '404.html'),
  page('/404', metaFor('/404'), { notFound: true }).replace('</head>', `  ${prefixScript}\n  </head>`),
)

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .filter((r) => !r.noindex)
  .map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`)
if (!PREVIEW) {
  fs.writeFileSync(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  )
}
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  PREVIEW ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)
// GitHub Pages: pubblica i file così come sono, senza elaborazione Jekyll.
fs.writeFileSync(path.join(dist, '.nojekyll'), '')
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Pre-render${PREVIEW ? " (anteprima, noindex)" : ""}: ${count} pagine + 404, ${redirectPages} pagine di redirect${PREVIEW ? "" : `, sitemap con ${urls.length} URL`}.`)
