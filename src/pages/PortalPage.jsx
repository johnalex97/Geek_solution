import { Link } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton.jsx'
import PageMeta from '../components/PageMeta.jsx'
import { IconArrow } from '../components/ui.jsx'
import { pageMeta } from '../data/siteContent.js'

function PortalPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <PageMeta {...pageMeta['/portal-ayuda']} />
      <section className="overflow-hidden rounded-3xl bg-[var(--ink)] text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-6 py-5 sm:px-10 lg:px-14">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--signal-green)]">Portal de soporte</p>
          <p className="font-mono text-xs text-white/65">Geek Solution / Freshdesk</p>
        </div>
        <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <h1 className="max-w-3xl text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
            Tu punto de contacto con soporte técnico.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Soporte orientado a continuidad, disponibilidad y calidad del servicio. En Freshdesk puedes crear solicitudes, seguir incidencias y comunicarte con nuestro equipo de soporte.
          </p>
          <div className="mt-10">
            <ActionButton href="https://portaldeayudatecnicageeksolution.freshdesk.com/" target="_blank" rel="noopener noreferrer" className="w-full focus-visible:outline-[var(--signal-green)] sm:w-auto" aria-describedby="portal-window-note">
              Abrir portal de soporte <IconArrow />
            </ActionButton>
            <p id="portal-window-note" className="mt-3 text-xs leading-6 text-white/65">Se abre en una nueva pestaña en Freshdesk.</p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
        <p className="text-sm text-[var(--technical-gray)]">¿Necesitas orientación antes de crear una solicitud?</p>
        <Link to="/servicios" className="inline-flex min-h-12 items-center text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:text-[#007a3f]">Revisar servicios</Link>
        <Link to="/contacto" className="inline-flex min-h-12 items-center text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:text-[#007a3f]">Contactar al equipo</Link>
      </div>
    </main>
  )
}

export default PortalPage
