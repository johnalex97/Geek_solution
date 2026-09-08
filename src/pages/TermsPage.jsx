import PageMeta from '../components/PageMeta.jsx'
import { pageMeta, termsBlocks } from '../data/siteContent.js'

const sectionIds = {
  'Ingreso de equipos': 'ingreso-de-equipos',
  Costos: 'costos',
  Garantía: 'garantia',
  Pagos: 'pagos',
}

function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <PageMeta {...pageMeta['/terminos']} />
      <header className="max-w-4xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">Términos de servicio</p>
        <h1 className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">Condiciones claras para cada servicio.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--technical-gray)] sm:text-lg">Consulta las condiciones de ingreso de equipos, revisión, costos, garantía y pagos.</p>
      </header>

      <div className="mt-12 grid items-start gap-10 border-t border-black/15 pt-8 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <nav aria-label="Secciones de los términos" className="lg:sticky lg:top-28">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--technical-gray)]">En esta página</p>
          <ul className="divide-y divide-black/15">
            {termsBlocks.map((block) => (
              <li key={block.title}>
                <a href={`#${sectionIds[block.title]}`} className="flex min-h-12 items-center py-3 text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:text-[#007a3f]">{block.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-3xl divide-y divide-black/15">
          {termsBlocks.map((block) => (
            <section key={block.title} id={sectionIds[block.title]} className="py-9 first:pt-0 last:pb-0">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{block.title}</h2>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-8 text-[var(--technical-gray)] marker:text-[#007a3f]">
                {block.items.map((item) => <li key={item} className="pl-2">{item}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

export default TermsPage
