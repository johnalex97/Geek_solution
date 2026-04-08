import { services } from '../data/siteContent.js'
import { fadeUp, MotionArticle, MotionSection } from '../components/motion.js'
import { SectionTag } from '../components/ui.jsx'

function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp}>
        <SectionTag>Servicios</SectionTag>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-6xl">
          Un portafolio real para helpdesk, redes, seguridad, antivirus, cloud y educacion.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          Geek Solution integra servicios tecnicos y de infraestructura para hogares, pymes e instituciones que necesitan soporte confiable, implementacion ordenada y acompanamiento profesional.
        </p>
      </MotionSection>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <MotionArticle
            key={service.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/30"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{service.eyebrow}</p>
            <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-white">{service.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.bullets.map((bullet) => (
                <span key={bullet} className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-300">
                  {bullet}
                </span>
              ))}
            </div>
          </MotionArticle>
        ))}
      </div>
    </main>
  )
}

export default ServicesPage
