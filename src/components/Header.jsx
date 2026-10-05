import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { areaIndex, areas, areaUrl } from '../content/services.js'
import { LOGIN_URL, REGISTER_URL, solutions } from '../content/site.js'
import { asset, Button, Icon, SmartLink } from './ui.jsx'
import { SearchBox } from './Search.jsx'

const SOLUTION_LINKS = Object.values(solutions).map((s) => ({ to: `/soluzioni/${s.slug}`, label: s.label, text: s.teaser }))

export function Logo({ negative = false, className = '' }) {
  return (
    <img
      src={asset(negative ? 'brand/agenzia-impresa-negativo.svg' : 'brand/agenzia-impresa.svg')}
      alt="Agenzia Impresa – Buffetti Group"
      width="544"
      height="82"
      className={`h-auto w-[208px] sm:w-[248px] lg:w-[200px] xl:w-[268px] ${className}`}
    />
  )
}

/* Pannello del mega-menu "Servizi": le aree nell'ordine del listino. */
function ServicesPanel() {
  return (
    <div className="wrap py-12">
      <ul className="grid gap-x-6 gap-y-1 lg:grid-cols-3">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link to={areaUrl(a)} className="group -mx-3 flex items-baseline gap-3 px-3 py-2.5 transition-colors hover:bg-mist/70">
              <span className="w-6 shrink-0 text-xs font-semibold text-brand tabular-nums">{areaIndex(a)}</span>
              <span className="flex-1 font-medium leading-snug group-hover:text-brand">{a.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 border-t border-line pt-6">
        <Link to="/servizi" className="group inline-flex items-center gap-2 font-semibold text-brand">
          Tutte le aree
          <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function ListPanel({ links, columns = 1 }) {
  return (
    <ul className={`grid gap-1 p-3 ${columns > 1 ? 'sm:grid-cols-2' : ''}`}>
      {links.map((l) => (
        <li key={l.to}>
          {l.external ? (
            <a href={l.to} target="_blank" rel="noopener" className="group flex items-center justify-between gap-6 px-4 py-3 hover:bg-mist/70">
              <span className="font-medium group-hover:text-brand">{l.label}</span>
              <Icon name="arrowUpRight" className="size-4 text-muted group-hover:text-brand" />
            </a>
          ) : (
            <Link to={l.to} className="group block px-4 py-3 hover:bg-mist/70">
              <span className="font-medium group-hover:text-brand">{l.label}</span>
              {l.text && <span className="mt-1 block text-sm leading-snug text-muted">{l.text}</span>}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

// Area clienti: login unico sul portale Adempio.
const LOGIN_LINKS = [{ to: LOGIN_URL, label: 'Login Adempio', external: true }]

const MENUS = {
  servizi: { label: 'Servizi', mega: true },
  soluzioni: { label: 'Soluzioni', links: SOLUTION_LINKS, width: 'w-[22rem]' },
}

export default function Header() {
  const { pathname } = useLocation()
  const overlay = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)
  const hoverTimer = useRef(null)
  const headerRef = useRef(null)
  const baseId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Chiudi tutto al cambio pagina.
  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname])

  const close = useCallback((returnFocus) => {
    setOpen((cur) => {
      if (returnFocus && cur) document.getElementById(`${baseId}-${cur}-btn`)?.focus()
      return null
    })
  }, [baseId])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close(true)
        setMobile(false)
      }
    }
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [close])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const hoverOpen = (key) => {
    if (!window.matchMedia('(hover: hover)').matches) return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(key), 90)
  }
  const hoverClose = () => {
    if (!window.matchMedia('(hover: hover)').matches) return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setOpen(null), 160)
  }

  const solid = !overlay || scrolled || open || mobile
  const dark = !solid

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-150 ${
        solid ? 'bg-white text-ink shadow-[0_1px_0_var(--color-line)]' : 'on-dark bg-transparent text-white'
      }`}
    >
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Vai al contenuto
      </a>
      <div className="wrap flex h-[72px] items-center gap-6 lg:h-20 lg:gap-3 xl:gap-6">
        <Link to="/" className="shrink-0" aria-label="Agenzia Impresa – Home">
          <Logo negative={dark} />
        </Link>

        <nav aria-label="Principale" className="ml-2 hidden h-full lg:block xl:ml-8">
          <ul className="flex h-full items-stretch">
            {Object.entries(MENUS).map(([key, m]) => (
              <li key={key} className="relative flex" onMouseEnter={() => hoverOpen(key)} onMouseLeave={hoverClose}>
                <button
                  id={`${baseId}-${key}-btn`}
                  type="button"
                  aria-expanded={open === key}
                  aria-controls={`${baseId}-${key}`}
                  onClick={() => setOpen(open === key ? null : key)}
                  className={`group relative flex items-center gap-1.5 whitespace-nowrap px-3 text-[0.9375rem] font-medium xl:px-4 ${
                    open === key ? 'text-brand' : ''
                  }`}
                >
                  {m.label}
                  <Icon
                    name="chevron"
                    className={`size-4 transition-transform duration-200 ${open === key ? 'rotate-180' : ''}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-brand transition-transform duration-200 xl:inset-x-4 ${
                      open === key ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
                {!m.mega && (
                  <div
                    id={`${baseId}-${key}`}
                    hidden={open !== key}
                    className={`absolute left-0 top-full ${m.width} border border-line bg-white text-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)]`}
                  >
                    <ListPanel links={m.links} />
                  </div>
                )}
              </li>
            ))}
            {[
              { to: '/chi-siamo', label: 'Chi siamo' },
              { to: '/sedi', label: 'Sedi' },
            ].map((l) => (
              <li key={l.to} className="flex">
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative flex items-center whitespace-nowrap px-3 text-[0.9375rem] font-medium xl:px-4 ${isActive ? 'text-brand' : 'hover:text-brand'} ${dark ? 'hover:text-white/80' : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="flex">
              <button
                id={`${baseId}-cerca-btn`}
                type="button"
                aria-expanded={open === 'cerca'}
                aria-controls={`${baseId}-cerca`}
                onClick={() => setOpen(open === 'cerca' ? null : 'cerca')}
                aria-label="Cerca"
                className={`relative flex items-center gap-2 whitespace-nowrap px-3 text-[0.9375rem] font-medium xl:px-4 ${
                  open === 'cerca' ? 'text-brand' : 'hover:text-brand'
                }`}
              >
                <Icon name={open === 'cerca' ? 'close' : 'search'} className="size-[1.125rem]" />
                <span className="hidden xl:inline">Cerca</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-brand transition-transform duration-200 xl:inset-x-4 ${
                    open === 'cerca' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 xl:gap-4">
          <div className="relative hidden lg:block" onMouseEnter={() => hoverOpen('login')} onMouseLeave={hoverClose}>
            <button
              id={`${baseId}-login-btn`}
              type="button"
              aria-expanded={open === 'login'}
              aria-controls={`${baseId}-login`}
              onClick={() => setOpen(open === 'login' ? null : 'login')}
              aria-label="Area clienti"
              className="flex h-12 items-center gap-2 whitespace-nowrap px-3 text-[0.9375rem] font-medium"
            >
              <Icon name="login" className="size-[1.125rem]" />
              <span className="hidden xl:inline">Area clienti</span>
            </button>
            <div
              id={`${baseId}-login`}
              hidden={open !== 'login'}
              className="absolute right-0 top-full w-64 border border-line bg-white text-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)]"
            >
              <p className="eyebrow px-7 pt-5 text-muted">Adempio</p>
              <ListPanel links={LOGIN_LINKS} />
              <div className="border-t border-line p-3">
                <SmartLink to={REGISTER_URL} className="group flex items-center justify-between px-4 py-3 font-semibold text-brand hover:bg-mist/70">
                  Non sei registrato? Registrati
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </SmartLink>
              </div>
            </div>
          </div>
          <SmartLink
            to={REGISTER_URL}
            className={`hidden h-10 items-center gap-2 whitespace-nowrap px-4 text-[0.9375rem] font-medium ring-1 ring-inset transition-colors lg:inline-flex ${
              dark ? 'ring-white/50 hover:bg-white hover:text-brand-dark' : 'ring-ink/25 hover:bg-ink hover:text-white hover:ring-ink'
            }`}
          >
            <Icon name="userPlus" className="size-[1.125rem]" />
            Registrati
          </SmartLink>
          <div className="hidden whitespace-nowrap sm:block">
            <Button to="/contatti" variant={dark ? 'light' : 'primary'} icon={null}>
              Contattaci
            </Button>
          </div>
          <button
            type="button"
            className="flex size-12 items-center justify-center lg:hidden"
            aria-expanded={open === 'cerca'}
            aria-controls={`${baseId}-cerca`}
            aria-label={open === 'cerca' ? 'Chiudi ricerca' : 'Cerca'}
            onClick={() => {
              setMobile(false)
              setOpen(open === 'cerca' ? null : 'cerca')
            }}
          >
            <Icon name={open === 'cerca' ? 'close' : 'search'} className="size-6" />
          </button>
          <button
            type="button"
            className="-mr-2 flex size-12 items-center justify-center lg:hidden"
            aria-expanded={mobile}
            aria-controls={`${baseId}-mobile`}
            aria-label={mobile ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => {
              setOpen(null)
              setMobile(!mobile)
            }}
          >
            <Icon name={mobile ? 'close' : 'menu'} className="size-6" />
          </button>
        </div>
      </div>

      {/* Mega-menu Servizi */}
      <div
        id={`${baseId}-servizi`}
        hidden={open !== 'servizi'}
        onMouseEnter={() => hoverOpen('servizi')}
        onMouseLeave={hoverClose}
        className="absolute inset-x-0 top-full hidden border-t border-line bg-white text-ink shadow-[0_32px_64px_-32px_rgb(0_0_0/0.3)] lg:block"
      >
        <ServicesPanel />
      </div>

      {/* Pannello di ricerca */}
      {open === 'cerca' && (
        <div
          id={`${baseId}-cerca`}
          className="absolute inset-x-0 top-full max-h-[calc(100svh-72px)] overflow-y-auto border-t border-line bg-white text-ink shadow-[0_32px_64px_-32px_rgb(0_0_0/0.3)]"
        >
          <div className="wrap py-8 md:py-12">
            <div className="max-w-3xl">
              <SearchBox autoFocus onNavigate={() => setOpen(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Menu mobile */}
      <MobileMenu id={`${baseId}-mobile`} open={mobile} />
    </header>
  )
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="flex min-h-16 w-full items-center justify-between text-left text-2xl font-light tracking-[-0.02em]"
      >
        {title}
        <Icon name="chevron" className={`size-6 transition-transform ${open ? 'rotate-180 text-brand' : ''}`} />
      </button>
      <div id={id} hidden={!open} className="pb-6">
        {children}
      </div>
    </div>
  )
}

function MobileMenu({ id, open }) {
  return (
    <div
      id={id}
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto overscroll-contain bg-white text-ink lg:hidden"
    >
      <nav aria-label="Menu mobile" className="wrap flex min-h-full flex-col pb-32 pt-2">
        <Accordion title="Servizi">
          <ul className="mb-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link to={areaUrl(a)} className="flex min-h-12 items-center gap-3 py-2">
                  <span className="w-6 text-xs font-semibold text-brand tabular-nums">{areaIndex(a)}</span>
                  <span className="font-medium">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/servizi" className="inline-flex min-h-12 items-center gap-2 font-semibold text-brand">
            Tutte le aree <Icon name="arrow" className="size-4" />
          </Link>
        </Accordion>
        <Accordion title="Soluzioni">
          <ul>
            {SOLUTION_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="flex min-h-12 items-center font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Accordion>
        {[
          { to: '/chi-siamo', label: 'Chi siamo' },
          { to: '/sedi', label: 'Sedi' },
        ].map((l) => (
          <Link key={l.to} to={l.to} className="flex min-h-16 items-center border-b border-line text-2xl font-light tracking-[-0.02em]">
            {l.label}
          </Link>
        ))}
        <Accordion title="Area clienti">
          <ul>
            {LOGIN_LINKS.map((l) => (
              <li key={l.to + l.label}>
                <a href={l.to} target="_blank" rel="noopener" className="flex min-h-12 items-center justify-between font-medium">
                  {l.label}
                  <Icon name="arrowUpRight" className="size-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
        </Accordion>
        <div className="fixed inset-x-0 bottom-0 grid grid-cols-2 gap-3 border-t border-line bg-white p-4">
          <Button to={REGISTER_URL} variant="secondary" icon="userPlus">
            Registrati
          </Button>
          <Button to="/contatti" icon={null}>
            Contattaci
          </Button>
        </div>
      </nav>
    </div>
  )
}
