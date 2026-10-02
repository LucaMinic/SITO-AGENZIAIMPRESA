// Server statico locale per verificare la build (index.html per cartella, 404.html).
// Uso: npm run preview → http://localhost:4173
// Anteprima GitHub Pages: BASE_PATH=/SITO-AGENZIAIMPRESA/ (stesso valore usato in build)
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
}
const port = Number(process.env.PORT) || 4173
const base = process.env.BASE_PATH || '/'

http
  .createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (req.method === 'POST' && p.endsWith('/api/contact')) {
      res.writeHead(503, { 'Content-Type': 'application/json' })
      return res.end('{"error":"not_configured"}')
    }
    // Pubblicazione in sottocartella (BASE_PATH), come su GitHub Pages.
    if (base !== '/') {
      if (!p.startsWith(base) && p !== base.slice(0, -1)) {
        res.writeHead(302, { Location: base })
        return res.end()
      }
      p = p.length < base.length ? '/' : '/' + p.slice(base.length)
    }
    const candidates = p === '/' ? ['index.html'] : [p, `${p}.html`, `${p}/index.html`]
    for (const c of candidates) {
      const f = path.join(dist, c)
      if (f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile()) {
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] ?? 'application/octet-stream' })
        return fs.createReadStream(f).pipe(res)
      }
    }
    res.writeHead(404, { 'Content-Type': TYPES['.html'] })
    fs.createReadStream(path.join(dist, '404.html')).pipe(res)
  })
  .listen(port, () => console.log(`dist servita su http://localhost:${port}${base}`))
