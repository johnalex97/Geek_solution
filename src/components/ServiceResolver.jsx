import { Link } from 'react-router-dom'
import { IconArrow, SectionIntro } from './ui.jsx'

export default function ServiceResolver({ services }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionIntro eyebrow="Nuestros servicios" title="¿Qué necesitas resolver?" description="Encuentra el servicio que necesitas y conoce cómo podemos ayudarte." />
      <ul aria-label="Servicios" className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="border-t border-black/15">
            <Link to={`/servicios?categoria=${service.slug}`} className="group flex min-h-36 items-start justify-between gap-5 rounded-sm py-6 transition-colors hover:text-[#007a3f]">
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight">{service.eyebrow}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--technical-gray)]">{service.title}</p>
              </div>
              <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-black/15 text-[#007a3f] transition-colors group-hover:border-[#007a3f]"><IconArrow /></span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
