import { useEffect, useState } from 'react'
import { Icon } from './ui.jsx'

/* Pulsante "Torna su": compare dopo circa una schermata e mezza di scorrimento. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' })
    // Il focus torna in cima alla pagina per chi naviga da tastiera.
    document.querySelector('header a[aria-label]')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Torna su"
      title="Torna su"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-4 right-4 z-40 flex size-12 items-center justify-center text-white drop-shadow-[0_8px_16px_rgb(0_16_63/0.35)] transition-[opacity,transform] duration-300 ease-[var(--ease-brand)] md:bottom-8 md:right-8 md:size-14 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-brand ring-1 ring-inset ring-white/40 cut-corner [--cut:12px] transition-colors group-hover:bg-brand-dark"
      />
      <Icon name="arrow" className="relative size-5 -rotate-90 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  )
}
