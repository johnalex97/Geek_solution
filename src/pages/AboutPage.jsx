import PageMeta from '../components/PageMeta.jsx'
import { SectionIntro } from '../components/ui.jsx'
import { companyProfile, educationHighlights, pageMeta, pillars, stats } from '../data/siteContent.js'

function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <PageMeta {...pageMeta['/nosotros']} />
      <header className="max-w-4xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#007a3f]">Nosotros · {companyProfile.location}</p>
        <h1 className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
          Una PYME hondureña enfocada en soluciones tecnológicas de alto nivel.
        </h1>
        <p className="mt-8 max-w-3xl text-pretty text-lg leading-8 text-[var(--technical-gray)]">{companyProfile.summary}</p>
      </header>

      <dl className="mt-12 grid max-w-4xl gap-8 border-y border-black/15 py-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <dt className="order-2 max-w-48 text-sm leading-6 text-[var(--technical-gray)]">{stat.label}</dt>
            <dd className="font-display text-4xl font-semibold tracking-[-0.04em]">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section className="max-w-3xl py-14 sm:py-16">
        <SectionIntro eyebrow="Nuestra experiencia" title="Tecnología con compromiso local." />
        <div className="mt-8 space-y-6 text-base leading-8 text-[var(--technical-gray)]">
          {pillars.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>

      <section className="grid gap-8 border-t border-black/15 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionIntro eyebrow="Educación" title="Compartimos conocimiento." description="Tecnología, emprendimiento y desarrollo profesional en colegios y universidades." />
        <ul className="divide-y divide-black/15 border-y border-black/15">
          {educationHighlights.map((item) => (
            <li key={item} className="py-4 text-base leading-7">{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default AboutPage
