import { Link } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton.jsx'
import { IconArrow } from '../components/ui.jsx'

export default function NotFoundPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto min-h-[70vh] max-w-7xl px-5 pb-24 pt-36 sm:px-6 sm:pt-44 lg:px-8">
      <div className="max-w-3xl border-l-4 border-[var(--geek-green)] pl-6 sm:pl-10">
        <p className="font-mono text-sm font-semibold tracking-[0.12em] text-[#007a3f]">ERROR 404</p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Página no encontrada</h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[var(--technical-gray)]">
          El enlace puede haber cambiado o la dirección está incompleta. Vuelve al inicio para encontrar nuestros servicios o entra al portal para gestionar tu soporte.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ActionButton to="/">Volver al inicio <IconArrow aria-hidden="true" /></ActionButton>
          <ActionButton to="/portal-ayuda" variant="portal">Portal de soporte</ActionButton>
        </div>
        <p className="mt-8 text-sm leading-7 text-[var(--technical-gray)]">
          ¿Necesitas ayuda para encontrar algo? <Link to="/contacto" className="rounded-sm font-semibold text-[#007a3f] underline underline-offset-4">Ir a Contacto</Link>
        </p>
      </div>
    </main>
  )
}
