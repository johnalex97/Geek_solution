import { ActionButton } from '../components/ActionButton.jsx'
import PageMeta from '../components/PageMeta.jsx'
import ServiceCatalog from '../components/ServiceCatalog.jsx'
import { IconArrow, SectionIntro } from '../components/ui.jsx'
import { pageMeta, services } from '../data/siteContent.js'

function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageMeta {...pageMeta['/servicios']} />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-20">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">Servicios</p>
        <h1 className="mt-6 max-w-4xl text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
          Soluciones para mantener tu tecnología en operación.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-[var(--technical-gray)] sm:text-lg">
          Identifica lo que necesitas resolver y revisa el resultado que cada servicio puede aportar a tu hogar o empresa.
        </p>

        <div className="mt-12">
          <ServiceCatalog services={services} />
        </div>
      </section>

      <section className="border-t border-black/15 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <SectionIntro
            eyebrow="Siguiente paso"
            title="Conversemos sobre tu operación."
            description="Cuéntanos qué está ocurriendo y te ayudamos a definir el servicio adecuado."
          />
          <ActionButton to="/contacto" className="w-full shrink-0 sm:w-auto">
            Solicitar asesoría <IconArrow />
          </ActionButton>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
