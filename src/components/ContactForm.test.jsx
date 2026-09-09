import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import ContactForm from './ContactForm.jsx'
import { contactCards } from '../data/siteContent.js'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

async function fillValidForm(user) {
  await user.type(screen.getByRole('textbox', { name: /^nombre/i }), ' Ana Pérez ')
  await user.type(screen.getByRole('textbox', { name: /^correo/i }), 'ana@example.com')
  await user.type(screen.getByRole('textbox', { name: /teléfono/i }), ' +504 9999-0000 ')
  await user.click(screen.getByRole('radio', { name: /hogar/i }))
  await user.type(screen.getByRole('textbox', { name: /^mensaje/i }), ' Necesito soporte de red. ')
}

it('associates inline errors and focuses the first invalid field in form order', async () => {
  const user = userEvent.setup()
  render(<ContactForm endpoint="https://example.test/contact" />)
  const submit = screen.getByRole('button', { name: /enviar consulta/i })
  await user.click(submit)
  const name = screen.getByRole('textbox', { name: /^nombre/i })
  const email = screen.getByRole('textbox', { name: /^correo/i })
  const audience = screen.getByRole('radio', { name: /empresa/i })
  const message = screen.getByRole('textbox', { name: /^mensaje/i })
  expect(name).toHaveFocus()
  for (const field of [name, email, audience, message]) {
    expect(field).toHaveAttribute('aria-invalid', 'true')
    expect(field).toHaveAccessibleDescription()
  }
  expect(submit).toBeEnabled()
  await user.type(name, 'Ana')
  await user.click(submit)
  expect(email).toHaveFocus()
  await user.type(email, 'ana@example.com')
  await user.click(submit)
  expect(audience).toHaveFocus()
  await user.click(audience)
  await user.click(submit)
  expect(message).toHaveFocus()
  expect(name).toHaveAttribute('autocomplete', 'name')
  expect(email).toHaveAttribute('autocomplete', 'email')
  expect(email).toHaveAttribute('spellcheck', 'false')
  expect(screen.getByRole('textbox', { name: /teléfono/i })).toHaveAttribute('autocomplete', 'tel')
})

it('commits error descriptions before focus and announces every invalid submission', async () => {
  const user = userEvent.setup()
  render(<ContactForm endpoint="" />)
  const name = screen.getByRole('textbox', { name: /^nombre/i })
  const focusSnapshots = []
  name.addEventListener('focus', () => {
    focusSnapshots.push({
      invalid: name.getAttribute('aria-invalid'),
      description: document.getElementById(name.getAttribute('aria-describedby'))?.textContent,
    })
  })
  const submit = screen.getByRole('button', { name: /enviar consulta/i })
  await user.click(submit)
  const firstSummary = screen.getByRole('status').textContent
  expect(firstSummary).toMatch(/revisa.*4.*campos/i)
  await user.click(submit)
  expect(screen.getByRole('status')).toHaveTextContent(/revisa.*4.*campos/i)
  expect(screen.getByRole('status').textContent).not.toBe(firstSummary)
  expect(focusSnapshots).toHaveLength(2)
  for (const snapshot of focusSnapshots) {
    expect(snapshot.invalid).toBe('true')
    expect(snapshot.description).toBeTruthy()
  }
})

it('offers an accessible next step when the endpoint is missing', async () => {
  const user = userEvent.setup()
  render(<ContactForm endpoint="" />)
  await fillValidForm(user)
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  expect(screen.getByRole('status')).toHaveTextContent(/WhatsApp/i)
  expect(screen.getByRole('link', { name: /WhatsApp/i })).toHaveAttribute('href', contactCards.find((channel) => channel.label === 'WhatsApp').href)
  expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeEnabled()
  expect(screen.getByRole('textbox', { name: /^nombre/i })).toHaveValue(' Ana Pérez ')
})

it('sends the selected audience in the normalized payload, announces loading and clears on success', async () => {
  const user = userEvent.setup()
  let resolveRequest
  const fetchRequest = vi.fn(() => new Promise((resolve) => { resolveRequest = resolve }))
  vi.stubGlobal('fetch', fetchRequest)
  render(<ContactForm endpoint="https://example.test/contact" />)
  await fillValidForm(user)
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  expect(screen.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
  expect(screen.getByRole('status')).toHaveTextContent('Enviando…')
  expect(fetchRequest).toHaveBeenCalledTimes(1)
  const [endpoint, request] = fetchRequest.mock.calls[0]
  expect(endpoint).toBe('https://example.test/contact')
  expect(request.method).toBe('POST')
  expect(JSON.parse(request.body)).toEqual({
    name: 'Ana Pérez', email: 'ana@example.com', phone: '+504 9999-0000',
    audience: 'hogar', message: 'Necesito soporte de red.', source: 'Sitio web Geek Solution',
  })
  await act(async () => resolveRequest(new Response(null, { status: 200 })))
  expect(screen.getByRole('status')).toHaveTextContent(/enviada correctamente/i)
  expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeEnabled()
  for (const field of screen.getAllByRole('textbox')) expect(field).toHaveValue('')
  for (const radio of screen.getAllByRole('radio')) expect(radio).not.toBeChecked()
})

it('reports honeypot success without an external request and keeps the trap outside assistive and tab order', async () => {
  const user = userEvent.setup()
  const fetchRequest = vi.fn()
  vi.stubGlobal('fetch', fetchRequest)
  render(<ContactForm endpoint="https://example.test/contact" />)
  await fillValidForm(user)
  const honeypot = screen.getByLabelText('No completar este campo')
  expect(honeypot).toHaveAttribute('tabindex', '-1')
  expect(honeypot.closest('[aria-hidden="true"]')).not.toBeNull()
  expect(screen.getAllByRole('textbox')).not.toContain(honeypot)
  fireEvent.change(honeypot, { target: { value: 'https://spam.example' } })
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  expect(screen.getByRole('status')).toHaveTextContent(/enviada correctamente/i)
  expect(fetchRequest).not.toHaveBeenCalled()
  expect(honeypot).toHaveValue('')
  expect(screen.getByRole('textbox', { name: /^nombre/i })).toHaveValue('')
})

it.each(['http', 'network'])('keeps the inquiry available to retry after a %s failure', async (failure) => {
  const user = userEvent.setup()
  const fetchRequest = vi.fn(() => failure === 'http'
    ? Promise.resolve(new Response(null, { status: 503 }))
    : Promise.reject(new Error('Network unavailable')))
  vi.stubGlobal('fetch', fetchRequest)
  render(<ContactForm endpoint="https://example.test/contact" />)
  await fillValidForm(user)
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/no se pudo enviar/i))
  expect(screen.getByRole('status')).toHaveTextContent(/WhatsApp/i)
  expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeEnabled()
  expect(screen.getByRole('textbox', { name: /^nombre/i })).toHaveValue(' Ana Pérez ')
  expect(screen.getByRole('radio', { name: /hogar/i })).toBeChecked()
  fetchRequest.mockResolvedValue(new Response(null, { status: 200 }))
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/enviada correctamente/i))
})
