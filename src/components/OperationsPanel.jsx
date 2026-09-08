import { useId } from 'react'
import { useReducedMotion } from 'motion/react'
import { MotionSection } from './motion.js'

export default function OperationsPanel({ systems }) {
  const headingId = useId()
  const reduceMotion = useReducedMotion()

  return (
    <MotionSection
      aria-labelledby={headingId}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.15 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink)] p-5 text-white shadow-[0_24px_64px_-32px_rgba(11,15,13,0.5)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3 border-b border-white/15 pb-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--signal-green)]">Geek Solution / Honduras</p>
          <h2 id={headingId} className="mt-2 font-display text-2xl font-medium tracking-tight">Centro de operaciones</h2>
        </div>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 28 28" fill="none" stroke="currentColor" className="mt-1 size-7 shrink-0 text-[var(--signal-green)]">
          <rect x="3" y="3" width="22" height="9" rx="2" />
          <rect x="3" y="16" width="22" height="9" rx="2" />
          <path d="M7 7.5h2m3 0h9M7 20.5h2m3 0h9" />
        </svg>
      </div>
      <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">
        <span>Atención</span><span aria-hidden="true" className="h-px flex-1 bg-white/15" /><span>Sistemas conectados</span>
      </div>
      <div className="relative mt-4 grid grid-cols-[44px_minmax(0,1fr)] items-center sm:grid-cols-[64px_minmax(0,1fr)]">
        <div aria-hidden="true" className="relative z-10 flex h-16 items-center justify-center rounded-lg border border-[var(--signal-green)] bg-[var(--graphite)] font-display text-lg text-[var(--signal-green)] sm:text-2xl">GS</div>
        <ul aria-label="Sistemas" className="grid gap-3">
          {systems.map((system, index) => (
            <li key={system.name} className="relative pl-7 sm:pl-10">
              <svg aria-hidden="true" focusable="false" viewBox="0 0 40 100" preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-7 text-[var(--signal-green)] sm:w-10" fill="none" stroke="currentColor" strokeWidth="1">
                <path d={`M20 ${index === 0 ? 50 : 0} V${index === systems.length - 1 ? 50 : 100} M20 50 H40`} />
              </svg>
              {index < systems.length - 1 && <span aria-hidden="true" className="absolute -bottom-3 left-3.5 h-3 w-px bg-[var(--signal-green)] sm:left-5" />}
              <div className="rounded-lg border border-white/15 bg-[var(--graphite)] px-3 py-4 sm:px-4">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-medium">{system.name}</h3>
                  <p className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--signal-green)]">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{system.status}
                  </p>
                </div>
                <p className="mt-1 text-xs leading-5 text-white/70">{system.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="absolute left-11 top-1/2 h-px w-3.5 bg-[var(--signal-green)] sm:left-16 sm:w-5" />
      </div>
      <div className="mt-6 flex flex-wrap justify-between gap-2 border-t border-white/15 pt-4 font-mono text-[10px] leading-5 text-white/60">
        <p>Helpdesk · Infraestructura · Respaldo</p>
        <p>Mapa de servicios ilustrativo</p>
      </div>
    </MotionSection>
  )
}
