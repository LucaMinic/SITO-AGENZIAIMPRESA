import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBox, SearchResults } from '../components/Search.jsx'
import { PageHero } from '../components/ui.jsx'

export default function SearchPage() {
  const { search: qs } = useLocation()
  // La query si legge dopo l'idratazione: la pagina è pre-renderizzata senza parametri.
  const [query, setQuery] = useState('')
  useEffect(() => {
    setQuery(new URLSearchParams(qs).get('q') ?? '')
  }, [qs])

  return (
    <>
      <PageHero eyebrow="Ricerca" title="Cerca nel sito" crumbs={[{ label: 'Home', to: '/' }, { label: 'Cerca' }]}>
        <div className="mt-10 max-w-2xl">
          <SearchBox key={query} initial={query} />
        </div>
      </PageHero>
      <section className="wrap section pt-12 md:pt-16">
        <SearchResults query={query} />
      </section>
    </>
  )
}
