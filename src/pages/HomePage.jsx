import { Link } from 'react-router-dom'
import { companyProfile, pillars, services, stats } from '../data/siteContent.js'
import { fadeUp, MotionArticle, MotionDiv, MotionSection } from '../components/motion.js'
import { IconArrow, SectionTag } from '../components/ui.jsx'

function HomePage() {
  return (
    <main>
      <section className="relative pt-32 sm:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28">
          <MotionDiv {...fadeUp} className="relative">
            <SectionTag>Geek Solution</SectionTag>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Soluciones tecnologicas de alto nivel para soporte, redes, seguridad y nube.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {companyProfile.summary}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link to="/servicios" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300">
                Explorar servicios
                <IconArrow />
              </Link>
              <Link to="/contacto" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/10">
                Hablar con un asesor
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <MotionArticle key={stat.label} {...fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="font-display text-3xl font-semibold tracking-[-0.06em] text-white">{stat.value}</div>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </MotionArticle>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv {...fadeUp} className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              <div className="grid gap-5">
                <div className="rounded-[1.75rem] border border-cyan-300/14 bg-[linear-gradient(135deg,rgba(8,145,178,0.18),rgba(37,99,235,0.08))] p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Operacion segura</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-white">
                    Especialistas en instalaciones de red y sistemas de seguridad.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Ejecutamos servicios en tiempos establecidos bajo normativas SLA, con enfoque en calidad, optimizacion de costos y valor agregado.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Especialidad</p>
                    <p className="mt-3 font-display text-xl text-white">Helpdesk, redes, seguridad y cloud</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Base operativa</p>
                    <p className="mt-3 font-display text-xl text-white">{companyProfile.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <MotionSection {...fadeUp} className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionTag>Servicios destacados</SectionTag>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Servicios reales para continuidad operativa, conectividad y proteccion.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 3).map((service, index) => (
            <MotionArticle
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/30 hover:bg-white/[0.06]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{service.eyebrow}</p>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.04em] text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
            </MotionArticle>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/servicios" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/10">
            Ver todos los servicios
            <IconArrow />
          </Link>
        </div>
      </MotionSection>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionDiv {...fadeUp} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
            <SectionTag>Nosotros</SectionTag>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-white">
              Mas de 12 anos respaldando operaciones tecnologicas en Honduras.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Geek Solution es una PYME hondurena enfocada en soporte tecnico, instalaciones de red, sistemas de seguridad, soluciones cloud y formacion tecnologica.
            </p>
          </MotionDiv>

          <MotionDiv {...fadeUp} className="space-y-4">
            {pillars.map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/8 bg-slate-950/70 p-4">
                <div className="mt-1 size-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </MotionDiv>
        </div>
      </section>
    </main>
  )
}

export default HomePage
