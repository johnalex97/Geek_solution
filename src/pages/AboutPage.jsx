import { companyProfile, educationHighlights, pillars, stats } from '../data/siteContent.js'
import { fadeUp, MotionArticle, MotionSection } from '../components/motion.js'
import { SectionTag } from '../components/ui.jsx'

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionTag>Nosotros</SectionTag>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-6xl">
            Una PYME hondurena enfocada en soluciones tecnologicas de alto nivel.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            {companyProfile.summary}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="font-display text-3xl font-semibold tracking-[-0.06em] text-white">{stat.value}</div>
              <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        {pillars.map((item) => (
          <MotionArticle key={item} {...fadeUp} className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-sm leading-7 text-slate-300">{item}</p>
          </MotionArticle>
        ))}
        {educationHighlights.map((item) => (
          <MotionArticle key={item} {...fadeUp} className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur-sm">
            <p className="text-sm leading-7 text-slate-300">{item}</p>
          </MotionArticle>
        ))}
      </section>
    </main>
  )
}

export default AboutPage
