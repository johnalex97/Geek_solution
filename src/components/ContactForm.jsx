import { useContext, useId, useLayoutEffect, useRef, useState } from 'react'
import { contactCards } from '../data/siteContent.js'
import { createContactPayload, validateContactForm } from '../utils/contactForm.js'
import { ActionButton } from './ActionButton.jsx'
import AudienceSelector from './AudienceSelector.jsx'
import { ContactDraftContext, initialContactForm } from './contactDraft.js'

const inputClass = 'contact-input w-full rounded-xl border bg-white px-4 py-3 text-[var(--ink)] placeholder:text-[var(--technical-gray)]'

export default function ContactForm({ endpoint }) {
  const localDraft = useState(initialContactForm)
  const retainedDraft = useContext(ContactDraftContext)
  const [form, setForm] = retainedDraft ?? localDraft
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [focusRequest, setFocusRequest] = useState(null)
  const invalidAttempts = useRef(0)
  const fields = useRef({})
  const id = useId()
  const whatsapp = contactCards.find((channel) => channel.label === 'WhatsApp')

  useLayoutEffect(() => {
    if (focusRequest) fields.current[focusRequest.name]?.focus()
  }, [focusRequest])

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleChange(event) {
    updateField(event.target.name, event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status.type === 'loading') return
    const nextErrors = validateContactForm(form)
    setErrors(nextErrors)
    const firstError = ['name', 'email', 'audience', 'message'].find((name) => nextErrors[name])
    if (firstError) {
      invalidAttempts.current += 1
      const count = Object.keys(nextErrors).length
      setStatus({
        type: 'validation',
        message: `Intento ${invalidAttempts.current}: revisa ${count === 1 ? 'el campo indicado' : `los ${count} campos indicados`} antes de enviar.`,
      })
      // A fresh request also focuses repeated invalid submissions, after ARIA commits.
      setFocusRequest({ name: firstError })
      return
    }
    if (form.website) {
      setStatus({ type: 'success', message: 'Consulta enviada correctamente.' })
      setForm(initialContactForm)
      return
    }
    if (!endpoint) {
      setStatus({ type: 'error', message: 'El formulario no está disponible en este momento. Escríbenos por WhatsApp o utiliza los canales de contacto.' })
      return
    }
    setStatus({ type: 'loading', message: 'Enviando…' })
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(createContactPayload(form)),
      })
      if (!response.ok) throw new Error('request_failed')
      setStatus({ type: 'success', message: 'Consulta enviada correctamente. Pronto nos pondremos en contacto.' })
      setForm(initialContactForm)
      setErrors({})
    } catch {
      setStatus({ type: 'error', message: 'No se pudo enviar la consulta en este momento. Intenta de nuevo o escríbenos por WhatsApp.' })
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate aria-labelledby={`${id}-heading`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#007a3f]">Formulario</p>
        <h2 id={`${id}-heading`} className="mt-3 font-display text-3xl font-semibold">Solicite una asesoría técnica</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--technical-gray)]">Cuéntanos qué necesitas resolver. Los campos marcados con * son obligatorios.</p>
      </div>
      {[
        ['name', 'Nombre *', 'text', 'name'],
        ['email', 'Correo *', 'email', 'email'],
        ['phone', 'Teléfono (opcional)', 'tel', 'tel'],
      ].map(([name, label, type, autoComplete]) => (
        <div key={name} className="grid gap-2 text-sm">
          <label htmlFor={`${id}-${name}`} className="font-semibold">{label}</label>
          <input id={`${id}-${name}`} ref={(node) => { fields.current[name] = node }} type={type} name={name} autoComplete={autoComplete} spellCheck={name === 'email' ? false : undefined} value={form[name]} onChange={handleChange} aria-required={name !== 'phone'} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-${name}-error` : undefined} className={inputClass} />
          {errors[name] ? <p id={`${id}-${name}-error`} className="text-sm text-red-700">{errors[name]}</p> : null}
        </div>
      ))}
      <AudienceSelector value={form.audience} onChange={(value) => updateField('audience', value)} error={errors.audience} inputRef={(node) => { fields.current.audience = node }} />
      <div className="grid gap-2 text-sm">
        <label htmlFor={`${id}-message`} className="font-semibold">Mensaje *</label>
        <textarea id={`${id}-message`} ref={(node) => { fields.current.message = node }} rows={6} name="message" value={form.message} onChange={handleChange} aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? `${id}-message-error` : undefined} className={inputClass} />
        {errors.message ? <p id={`${id}-message-error`} className="text-sm text-red-700">{errors.message}</p> : null}
      </div>
      <label className="sr-only" aria-hidden="true">
        No completar este campo
        <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
      </label>
      <div role="status" aria-live="polite" aria-atomic="true" className={status.message ? 'rounded-xl border border-black/15 bg-[var(--paper)] p-4 text-sm leading-6' : undefined}>{status.message}</div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ActionButton type="submit" disabled={status.type === 'loading'} className="disabled:cursor-wait disabled:opacity-70">{status.type === 'loading' ? 'Enviando…' : 'Enviar consulta'}</ActionButton>
        <ActionButton href={whatsapp.href} variant="secondary" target="_blank" rel="noreferrer">Abrir WhatsApp</ActionButton>
      </div>
    </form>
  )
}
