import { Link } from 'react-router-dom'
import { fadeUp, MotionSection } from '../components/motion.js'
import { useTheme } from '../components/theme.jsx'
import { IconArrow, SectionTag } from '../components/ui.jsx'

function PortalPage() {
  const { isLight } = useTheme()

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp} className={`rounded-[2rem] border p-8 backdrop-blur-sm ${isLight ? 'border-cyan-100 bg-[linear-gradient(180deg,rgba(186,230,253,0.55),rgba(255,255,255,0.9))]' : 'border-white/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))]'}`}>
        <SectionTag>Portal de Ayuda</SectionTag>
        <h1 className={`mt-6 max-w-4xl font-display text-4xl font-semibold leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl ${isLight ? 'text-slate-950' : 'text-white'}`}>
          Soporte técnico orientado a continuidad, disponibilidad y calidad del servicio.
        </h1>
        <p className={`mt-6 max-w-3xl text-base leading-8 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Acceda directamente a nuestro portal de tickets en Freshdesk para crear solicitudes, dar seguimiento a incidencias y mantener comunicación con el equipo de soporte.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://portaldeayudatecnicageeksolution.freshdesk.com/"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${isLight ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'}`}
          >
            Acceso a portal de asistencia
            <IconArrow />
          </a>
          <Link to="/servicios" className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5 ${isLight ? 'border-slate-300 bg-white text-slate-900 hover:border-cyan-400 hover:bg-cyan-50' : 'border-white/12 bg-white/6 text-white hover:border-cyan-300/30 hover:bg-white/10'}`}>
            Revisar servicios
          </Link>
        </div>
      </MotionSection>
    </main>
  )
}

export default PortalPage
