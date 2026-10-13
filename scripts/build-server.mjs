// Build per il nostro server (npm run build:server): il contenuto di dist/ va caricato nella
// cartella /frontend/agenziaimpresa/ del server, che è la radice del dominio
// https://www.agenziaimpresa.com (quindi base "/", come per restainup). Il server è Nginx.
//  - build di produzione indicizzabile (niente PREVIEW): robots.txt aperto, sitemap.xml, canonical;
//  - genera deploy/nginx/www.agenziaimpresa.com.conf con i redirect 301 dalle vecchie URL
//    WordPress (stessa fonte di vercel.json, vedi scripts/gen-redirects.mjs);
//  - apre dist/.
// I consensi cookie vanno a VITE_CONSENT_API_URL (file .env).
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = 'https://www.agenziaimpresa.com'
const DOMAIN = 'agenziaimpresa.com'
const SERVER_DIR = '/var/www/frontend/agenziaimpresa'

const env = { ...process.env, BASE_PATH: '/' }
delete env.PREVIEW
execSync('npm run build', { cwd: root, stdio: 'inherit', env })

// Redirect 301 delle vecchie URL. Le pagine meta-refresh in dist/ restano come riserva, ma
// con Nginx rispondono prima questi 301 veri (meglio per Google). Mai sopra una pagina vera.
const { redirects } = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf-8'))
const isRealPage = (source) => {
  const file = path.join(dist, source, 'index.html')
  return fs.existsSync(file) && !fs.readFileSync(file, 'utf-8').includes('http-equiv="refresh"')
}
const exact = redirects
  .filter((r) => !r.source.includes(':') && !isRealPage(r.source))
  .map((r) => `    location = ${r.source} { return 301 ${r.destination}; }`)
const prefix = redirects
  .filter((r) => r.source.endsWith('/:path*'))
  .map((r) => `    location ^~ ${r.source.replace('/:path*', '/')} { return 301 ${r.destination}; }`)

const conf = `# Nginx: https://www.${DOMAIN} (indirizzo principale, con www). Generato da
# scripts/build-server.mjs (npm run build:server): non modificarlo a mano, rigeneralo.
# Copialo in /etc/nginx/sites-available/, collegalo in sites-enabled/, poi:
#   sudo nginx -t && sudo systemctl reload nginx
#
# Il sito è pre-renderizzato: ogni pagina è un file <percorso>/index.html. Gli indirizzi
# che non esistono ricevono la pagina 404.html con stato 404 (niente "soft 404" per Google).
# Nginx ignora il file .htaccess.
#
# Certificato per entrambi i nomi:
#   sudo certbot certonly --nginx -d ${DOMAIN} -d www.${DOMAIN}
# Sostituisci i percorsi qui sotto se sono diversi.

# Cache: HTML sempre aggiornato dopo un nuovo caricamento, il resto per una settimana.
map $sent_http_content_type $agenziaimpresa_cache {
    default    "public, max-age=604800";
    ~text/html "no-cache";
}

# http -> https (entrambi i nomi)
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};
    return 301 https://www.${DOMAIN}$request_uri;
}

# https senza www -> https con www (canonical, sitemap e link usano www)
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name ${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    return 301 https://www.${DOMAIN}$request_uri;
}

# Il sito
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    # Cartella in cui si carica il contenuto di dist/ (adegua al percorso reale).
    root ${SERVER_DIR};
    index index.html;
    charset utf-8;
    error_page 404 /404.html;

    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Cache-Control $agenziaimpresa_cache;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml application/xml text/xml text/plain;

    # Indirizzi canonici senza barra finale: /servizi/ -> /servizi (le vecchie URL WordPress
    # finivano tutte con la barra).
    rewrite ^/(.+)/$ /$1 permanent;

    # Mai servire i file nascosti (es. .htaccess).
    location ~ /\\. {
        deny all;
    }

    # Vecchie URL del sito WordPress -> nuove pagine (301).
${exact.join('\n')}
${prefix.join('\n')}

    # Pagine pre-renderizzate: /servizi -> /servizi/index.html; il resto 404.
    location / {
        try_files $uri $uri/index.html =404;
    }

    # JS/CSS generati hanno l'hash nel nome: cache di un anno.
    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Strict-Transport-Security "max-age=31536000" always;
        add_header X-Content-Type-Options "nosniff" always;
    }

    # Modulo contatti (public/contact.php): funziona solo se sul server c'è PHP-FPM.
    # Togli il commento e adegua il socket, oppure imposta VITE_CONTACT_ENDPOINT verso un altro servizio.
    # location = /contact.php {
    #     include snippets/fastcgi-php.conf;
    #     fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    # }
    location = /contact.php {
        return 503;
    }
}
`
const confFile = path.join(root, 'deploy', 'nginx', `www.${DOMAIN}.conf`)
fs.mkdirSync(path.dirname(confFile), { recursive: true })
fs.writeFileSync(confFile, conf)
// File di servizio di GitHub Pages: non serve sul server.
fs.rmSync(path.join(dist, '.nojekyll'), { force: true })

console.log(`\nNginx: ${path.relative(root, confFile)} (${exact.length + prefix.length} redirect 301)`)
console.log(`Build pronta in dist/ -> carica il suo contenuto in /frontend/agenziaimpresa/ sul server (${SITE}/)`)
const opener = process.platform === 'win32' ? 'explorer' : process.platform === 'darwin' ? 'open' : 'xdg-open'
try {
  execSync(`${opener} "${dist}"`, { stdio: 'ignore' })
} catch {
  // explorer.exe esce con codice 1 anche quando apre la cartella.
}
