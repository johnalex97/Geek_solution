import { ActionButton } from '../components/ActionButton.jsx'
import OperationsPanel from '../components/OperationsPanel.jsx'
import PageMeta from '../components/PageMeta.jsx'
import ServiceResolver from '../components/ServiceResolver.jsx'
import { MotionDiv, useRevealMotion } from '../components/motion.js'
import { IconArrow, SectionIntro } from '../components/ui.jsx'
import { audienceContent, companyProfile, contactCards, operationsSystems, pageMeta, processSteps, services } from '../data/siteContent.js'

function HomePage() {
  const reveal = useRevealMotion()
  const whatsapp = contactCards.find((contact) => contact.label === 'WhatsApp')

  return (
    <main id="main-content" tabIndex={-1}>
      <PageMeta {...pageMeta['/']} />
      <section className="border-b border-black/10 pt-32 sm:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-24">
          <MotionDiv {...reveal}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">Tecnología con respaldo local</p>
            <h1 className="mt-6 max-w-2xl text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl xl:text-[4.5rem]">
              Tecnología que mantiene tu operación <span className="text-[#007a3f]">funcionando.</span>
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-8 text-[var(--technical-gray)] sm:text-lg">Soporte, redes, seguridad y nube para hogares y empresas en Honduras.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ActionButton to="/contacto">Solicitar asesoría <IconArrow /></ActionButton>
              <ActionButton href={whatsapp.href} variant="secondary">Hablar por WhatsApp</ActionButton>
            </div>
            <p className="mt-8 font-mono text-xs leading-6 text-[var(--technical-gray)]">{companyProfile.location} <span aria-hidden="true">/</span> PYME hondureña</p>
          </MotionDiv>
          <OperationsPanel systems={operationsSystems} />
        </div>
      </section>

      <ServiceResolver services={services} />

      <section aria-label="Soluciones para empresas y hogares" className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid overflow-hidden rounded-2xl border border-black/15 bg-white md:grid-cols-2">
          {audienceContent.map((audience) => (
            <article key={audience.name} className="p-6 first:border-b first:border-black/15 sm:p-10 md:first:border-r md:first:border-b-0">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">{audience.name}</p>
              <h2 className="mt-5 max-w-md text-balance font-display text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl">{audience.title}</h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--technical-gray)]">{audience.description}</p>
              <p className="mt-7 border-t border-black/10 pt-5 font-mono text-xs leading-6 text-[#007a3f]">{audience.services}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8 lg:py-20">
          <div>
            <SectionIntro eyebrow="Experiencia y compromiso" title="Más de 12 años resolviendo necesidades tecnológicas." />
            <p className="mt-6 max-w-xl leading-8 text-[var(--technical-gray)]">{companyProfile.summary}</p>
            <ActionButton to="/nosotros" variant="secondary" className="mt-7">Conoce Geek Solution <IconArrow /></ActionButton>
          </div>
          <div className="flex flex-col justify-center border-l-2 border-[#007a3f] pl-6 sm:pl-9">
            <p className="font-mono text-sm font-semibold text-[#007a3f]">SLA / Acuerdos de nivel de servicio</p>
            <h3 className="mt-5 font-display text-3xl font-medium tracking-tight">Tiempos definidos. Un alcance claro.</h3>
            <p className="mt-4 leading-8 text-[var(--technical-gray)]">Ejecutamos servicios en tiempos establecidos bajo normativas SLA, optimizando costos y agregando valor a cada entrega.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionIntro eyebrow="Cómo trabajamos" title="De la consulta a la solución." />
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border-t border-black/15 pt-5">
              <span aria-hidden="true" className="font-mono text-sm text-[#007a3f]">0{index + 1}</span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--technical-gray)]">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-black/15 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <SectionIntro eyebrow="Hablemos de tu tecnología" title="Cuéntanos qué necesitas resolver." description="Solicita una evaluación técnica para tu hogar o empresa." />
          <ActionButton to="/contacto" className="w-full shrink-0 sm:w-auto">Solicitar asesoría <IconArrow /></ActionButton>
        </div>
      </section>
    </main>
  )
}

export default HomePage
