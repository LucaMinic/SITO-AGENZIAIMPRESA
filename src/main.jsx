import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Le pagine sono pre-renderizzate in build: in produzione si idrata, in sviluppo si monta.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
