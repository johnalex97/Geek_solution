import { contactCards } from '../data/siteContent.js'
import { fadeUp, MotionSection } from '../components/motion.js'
import { IconArrow, SectionTag } from '../components/ui.jsx'

function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp} className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
          <SectionTag>Contacto</SectionTag>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-6xl">
            Si tienes alguna consulta puedes escribirnos o llamarnos.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Atendemos consultas comerciales y tecnicas de lunes a viernes, de 8:00 am a 5:00 pm, con canales directos para correo, telefono y WhatsApp.
          </p>

          <div className="mt-8 grid gap-4">
            {contactCards.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-2 block font-display text-xl text-white transition hover:text-cyan-200">
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 font-display text-xl text-white">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-7 backdrop-blur-sm">
          <div className="grid gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Formulario</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-white">Solicite una asesoria tecnica</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Nombre
                <input type="text" placeholder="Tu nombre" className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40" />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Correo
                <input type="email" placeholder="tu@empresa.com" className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40" />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-slate-300">
              Mensaje
              <textarea rows="6" placeholder="Cuentanos que tipo de soporte o solucion necesitas" className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40" />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300">
                Enviar consulta
                <IconArrow />
              </button>
              <a href="https://wa.me/50433837341" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-6 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-400/10">
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </MotionSection>
    </main>
  )
}

export default ContactPage
