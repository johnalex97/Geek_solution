import { useState } from 'react'
import { contactCards } from '../data/siteContent.js'
import { fadeUp, MotionSection } from '../components/motion.js'
import { useTheme } from '../components/theme.jsx'
import { IconArrow, SectionTag } from '../components/ui.jsx'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
  website: '',
}

function ContactPage() {
  const { isLight } = useTheme()
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  function validateForm() {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Ingresa tu nombre.'
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Ingresa tu correo.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Ingresa un correo valido.'
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Escribe tu consulta.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    if (formData.website) {
      setStatus({ type: 'success', message: 'Consulta enviada correctamente.' })
      setFormData(initialForm)
      return
    }

    if (!endpoint) {
      setStatus({
        type: 'error',
        message:
          'El formulario aún no está configurado. Define VITE_CONTACT_FORM_ENDPOINT para recibir consultas por correo.',
      })
      return
    }

    setStatus({ type: 'loading', message: 'Enviando consulta...' })

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          source: 'Sitio web Geek Solution',
        }),
      })

      if (!response.ok) {
        throw new Error('request_failed')
      }

      setStatus({ type: 'success', message: 'Consulta enviada correctamente. Pronto nos pondremos en contacto.' })
      setFormData(initialForm)
      setErrors({})
    } catch {
      setStatus({
        type: 'error',
        message:
          'No se pudo enviar la consulta en este momento. Intenta de nuevo o escríbenos por WhatsApp.',
      })
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <MotionSection {...fadeUp} className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className={`rounded-[2rem] border p-7 backdrop-blur-sm ${isLight ? 'border-slate-200 bg-white/80' : 'border-white/10 bg-white/[0.04]'}`}>
          <SectionTag>Contacto</SectionTag>
          <h1 className={`mt-6 font-display text-4xl font-semibold leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl ${isLight ? 'text-slate-950' : 'text-white'}`}>
            Si tienes alguna consulta puedes escribirnos o llamarnos.
          </h1>
          <p className={`mt-5 text-base leading-8 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Atendemos consultas comerciales y técnicas de lunes a viernes, de 8:00 am a 5:00 pm, con canales directos para correo, teléfono y WhatsApp.
          </p>

          <div className="mt-8 grid gap-4">
            {contactCards.map((item) => (
              <div key={item.label} className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/70'}`}>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`mt-2 block font-display text-xl transition hover:text-cyan-200 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {item.value}
                  </a>
                ) : (
                  <p className={`mt-2 font-display text-xl ${isLight ? 'text-slate-950' : 'text-white'}`}>{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-[2rem] border p-7 backdrop-blur-sm ${isLight ? 'border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(239,246,255,0.92))]' : 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]'}`}>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div>
              <p className={`text-xs uppercase tracking-[0.28em] ${isLight ? 'text-cyan-600' : 'text-cyan-200'}`}>Formulario</p>
              <h2 className={`mt-4 font-display text-3xl font-semibold ${isLight ? 'text-slate-950' : 'text-white'}`}>Solicite una asesoría técnica</h2>
              <p className={`mt-3 text-sm leading-7 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Complete sus datos y enviaremos la consulta al canal configurado de atención comercial.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={`grid gap-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Nombre
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={`rounded-2xl border px-4 py-3.5 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 ${errors.name ? 'border-rose-400' : ''} ${isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-slate-950/80 text-white'}`}
                />
                {errors.name ? <span className="text-xs text-rose-500">{errors.name}</span> : null}
              </label>
              <label className={`grid gap-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Correo
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@empresa.com"
                  className={`rounded-2xl border px-4 py-3.5 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 ${errors.email ? 'border-rose-400' : ''} ${isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-slate-950/80 text-white'}`}
                />
                {errors.email ? <span className="text-xs text-rose-500">{errors.email}</span> : null}
              </label>
            </div>

            <label className={`grid gap-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Teléfono
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+504 0000-0000"
                className={`rounded-2xl border px-4 py-3.5 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 ${isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-slate-950/80 text-white'}`}
              />
            </label>

            <label className={`grid gap-2 text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Mensaje
              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos qué tipo de soporte o solución necesitas"
                className={`rounded-[1.5rem] border px-4 py-3.5 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 ${errors.message ? 'border-rose-400' : ''} ${isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-slate-950/80 text-white'}`}
              />
              {errors.message ? <span className="text-xs text-rose-500">{errors.message}</span> : null}
            </label>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {status.type !== 'idle' ? (
              <p className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-300/40 bg-emerald-400/10 text-emerald-700' : status.type === 'loading' ? 'border-cyan-300/40 bg-cyan-400/10 text-cyan-700' : 'border-rose-300/40 bg-rose-400/10 text-rose-700'}`}>
                {status.message}
              </p>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 ${isLight ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'}`}
              >
                {status.type === 'loading' ? 'Enviando...' : 'Enviar consulta'}
                <IconArrow />
              </button>
              <a href="https://wa.me/50433837341" target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-4 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-emerald-400/10 ${isLight ? 'border-slate-300 bg-white text-slate-900' : 'border-white/12 bg-white/6 text-white'}`}>
                Abrir WhatsApp
              </a>
            </div>
          </form>
        </div>
      </MotionSection>
    </main>
  )
}

export default ContactPage
