import { Link } from 'react-router-dom'
import { fadeUp, MotionSection } from '../components/motion.js'
import { IconArrow, SectionTag } from '../components/ui.jsx'

function PortalPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))] p-8 backdrop-blur-sm">
        <SectionTag>Portal de Ayuda</SectionTag>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-6xl">
          Soporte tecnico orientado a continuidad, disponibilidad y calidad del servicio.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          Esta seccion representa el acceso al portal corporativo de asistencia tecnica para clientes que requieren seguimiento y soporte especializado.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link to="/contacto" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300">
            Acceso a portal de asistencia
            <IconArrow />
          </Link>
          <Link to="/servicios" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/10">
            Revisar servicios
          </Link>
        </div>
      </MotionSection>
    </main>
  )
}

export default PortalPage
