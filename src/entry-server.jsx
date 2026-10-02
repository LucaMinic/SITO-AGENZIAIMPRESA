import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export { routes, metaFor } from './routes.js'
export { sedi, company, SITE_URL } from './content/site.js'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={import.meta.env.BASE_URL.replace(/\/$/, '') + url} basename={import.meta.env.BASE_URL}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
