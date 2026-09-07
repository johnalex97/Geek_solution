import { describe, expect, it } from 'vitest'
import { createContactPayload, validateContactForm } from './contactForm.js'

describe('validateContactForm', () => {
  it('requires name, email, audience and message', () => {
    expect(validateContactForm({ name: '', email: '', audience: '', message: '' })).toEqual({
      name: 'Ingresa tu nombre.',
      email: 'Ingresa un correo válido.',
      audience: 'Selecciona si buscas ayuda para una empresa o un hogar.',
      message: 'Cuéntanos qué necesitas resolver.',
    })
  })

  it('rejects an invalid email', () => {
    expect(validateContactForm({ name: 'Ana', email: 'ana', audience: 'empresa', message: 'Redes' })).toEqual({
      email: 'Ingresa un correo válido.',
    })
  })
})

describe('createContactPayload', () => {
  it('trims values and includes the audience', () => {
    expect(createContactPayload({
      name: ' Ana ', email: ' ana@example.com ', phone: ' 9999 ', audience: 'empresa', message: ' Redes ',
    })).toEqual({
      name: 'Ana', email: 'ana@example.com', phone: '9999', audience: 'empresa', message: 'Redes',
      source: 'Sitio web Geek Solution',
    })
  })
})
