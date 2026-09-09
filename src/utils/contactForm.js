const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(formData) {
  const errors = {}
  if (!formData.name?.trim()) errors.name = 'Ingresa tu nombre.'
  if (!emailPattern.test(formData.email?.trim() ?? '')) errors.email = 'Ingresa un correo válido.'
  if (!['empresa', 'hogar'].includes(formData.audience)) {
    errors.audience = 'Selecciona si buscas ayuda para una empresa o un hogar.'
  }
  if (!formData.message?.trim()) errors.message = 'Cuéntanos qué necesitas resolver.'
  return errors
}

export function createContactPayload(formData, accessKey) {
  return {
    access_key: accessKey.trim(),
    subject: 'Nueva consulta desde Geek Solution',
    from_name: 'Geek Solution',
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    audience: formData.audience,
    message: formData.message.trim(),
    source: 'Sitio web Geek Solution',
  }
}
