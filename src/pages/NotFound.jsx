import { Button, PageHero } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Errore 404" title="Pagina non trovata" lead="La pagina che stai cercando non esiste o è stata spostata.">
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Torna alla Home</Button>
          <Button to="/servizi" variant="secondary" icon={null}>
            I nostri Servizi
          </Button>
        </div>
      </PageHero>
      <div className="h-24" />
    </>
  )
}
