import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { normalize, search, snippet } from '../content/search.js'
import { Icon } from './ui.jsx'

/* Evidenzia le parole cercate (senza distinzione di accenti/maiuscole). */
export function Highlight({ text, query }) {
  const words = normalize(query).trim().split(/\s+/).filter((w) => w.length > 1)
  if (!words.length) return text
  const n = normalize(text)
  const marks = []
  for (const w of words) {
    let i = n.indexOf(w)
    while (i !== -1) {
      marks.push([i, i + w.length])
      i = n.indexOf(w, i + w.length)
    }
  }
  if (!marks.length) return text
  marks.sort((a, b) => a[0] - b[0])
  const out = []
  let pos = 0
  for (const [s, e] of marks) {
    if (s < pos) continue
    if (s > pos) out.push(text.slice(pos, s))
    out.push(
      <mark key={s} className="bg-brand/10 text-inherit [box-shadow:inset_0_-2px_0_var(--color-brand)]">
        {text.slice(s, e)}
      </mark>,
    )
    pos = e
  }
  out.push(text.slice(pos))
  return out
}

/*
 * Campo di ricerca con suggerimenti (pattern combobox ARIA):
 * frecce ↑/↓ per scorrere, Invio per aprire, Esc per chiudere.
 */
export function SearchBox({ autoFocus = false, onNavigate, initial = '', dark = false }) {
  const [q, setQ] = useState(initial)
  const [active, setActive] = useState(-1)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const id = useId()
  const all = useMemo(() => search(q), [q])
  const results = all.slice(0, 7)
  const hasQuery = normalize(q).trim().length > 1

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  const go = (url) => {
    onNavigate?.()
    navigate(url)
  }
  const submit = (e) => {
    e.preventDefault()
    if (active >= 0 && results[active]) return go(results[active].url)
    if (hasQuery) go(`/cerca?q=${encodeURIComponent(q.trim())}`)
  }
  const onKey = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a <= 0 ? results.length - 1 : a - 1))
    }
  }

  return (
    <form role="search" onSubmit={submit} className="w-full">
      <label htmlFor={`${id}-q`} className="sr-only">
        Cerca nel sito
      </label>
      <div className="relative">
        <Icon
          name="search"
          className={`pointer-events-none absolute left-0 top-1/2 size-6 -translate-y-1/2 ${dark ? 'text-white' : 'text-brand'}`}
        />
        <input
          ref={inputRef}
          id={`${id}-q`}
          type="search"
          role="combobox"
          aria-expanded={hasQuery}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
          autoComplete="off"
          enterKeyHint="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setActive(-1)
          }}
          onKeyDown={onKey}
          placeholder="Cerca servizi, prestazioni, sedi…"
          className="w-full border-0 border-b-2 border-ink bg-transparent py-4 pl-10 pr-2 text-xl font-light placeholder:text-muted/70 focus:border-brand focus:outline-none md:text-2xl"
        />
      </div>

      <div aria-live="polite" className="sr-only">
        {hasQuery && `${all.length} risultati`}
      </div>

      {hasQuery && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="py-4 text-muted">
              Nessun risultato per “{q.trim()}”. Prova con un altro termine o{' '}
              <Link to="/contatti" onClick={onNavigate} className="text-brand underline underline-offset-2">
                contattaci
              </Link>
              .
            </p>
          ) : (
            <>
              <ul id={`${id}-list`} role="listbox" aria-label="Risultati" className="divide-y divide-line">
                {results.map((r, i) => (
                  <li key={r.url} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
                    <Link
                      to={r.url}
                      onClick={onNavigate}
                      onMouseEnter={() => setActive(i)}
                      className={`group grid gap-1 px-3 py-3.5 transition-colors md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-6 ${
                        i === active ? 'bg-mist/80' : ''
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block font-medium leading-snug group-hover:text-brand">
                          <Highlight text={r.title} query={q} />
                        </span>
                        {r.excerpt && (
                          <span className="mt-1 block truncate text-sm text-muted">
                            <Highlight text={snippet(r.excerpt, q, 110)} query={q} />
                          </span>
                        )}
                      </span>
                      <span className="eyebrow text-[0.6875rem] text-muted">
                        {r.kind}
                        {r.context ? ` · ${r.context}` : ''}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {all.length > results.length && (
                <Link
                  to={`/cerca?q=${encodeURIComponent(q.trim())}`}
                  onClick={onNavigate}
                  className="mt-4 inline-flex items-center gap-2 px-3 font-semibold text-brand"
                >
                  Vedi tutti i {all.length} risultati <Icon name="arrow" className="size-4" />
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </form>
  )
}

/* Pagina /cerca: tutti i risultati, raggruppati per tipo. */
export function SearchResults({ query }) {
  const results = useMemo(() => search(query), [query])
  const groups = useMemo(() => {
    const g = new Map()
    for (const r of results) {
      if (!g.has(r.kind)) g.set(r.kind, [])
      g.get(r.kind).push(r)
    }
    return [...g.entries()]
  }, [results])

  if (normalize(query).trim().length < 2) return null
  if (!results.length) {
    return (
      <p className="text-lead text-muted">
        Nessun risultato per “{query}”. Prova con un altro termine o{' '}
        <Link to="/contatti" className="text-brand underline underline-offset-2">
          contattaci
        </Link>
        .
      </p>
    )
  }
  return (
    <div className="space-y-14">
      <p className="text-muted">
        {results.length} {results.length === 1 ? 'risultato' : 'risultati'} per “{query}”
      </p>
      {groups.map(([kind, items]) => (
        <section key={kind} className="grid gap-4 lg:grid-cols-8 lg:gap-6">
          <h2 className="eyebrow pt-6 text-muted lg:col-span-2">
            {kind} <span className="tabular-nums">({items.length})</span>
          </h2>
          <ul className="border-b border-line lg:col-span-6">
            {items.map((r) => (
              <li key={r.url}>
                <Link to={r.url} className="group block border-t border-line py-5">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-xl leading-snug group-hover:text-brand">
                      <Highlight text={r.title} query={query} />
                    </span>
                    {r.context && <span className="hidden shrink-0 text-sm text-muted sm:inline">{r.context}</span>}
                  </span>
                  {r.excerpt && (
                    <span className="mt-2 block text-[0.9375rem] text-muted">
                      <Highlight text={snippet(r.excerpt, query, 180)} query={query} />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
