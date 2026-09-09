import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import App from '../App.jsx'

let navigate
function NavigationDriver() {
  const routerNavigate = useNavigate()
  useEffect(() => { navigate = routerNavigate }, [routerNavigate])
  return null
}

function renderSite(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><NavigationDriver /><App /></MemoryRouter>)
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  vi.stubGlobal('scrollX', 0)
  vi.stubGlobal('scrollY', 0)
  vi.stubGlobal('scrollTo', vi.fn(({ left, top }) => {
    window.scrollX = left
    window.scrollY = top
    fireEvent.scroll(window)
  }))
  // JSDOM has no layout or scrolling APIs; observe the application's browser calls.
  HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  delete HTMLElement.prototype.scrollIntoView
})

function scrollToPosition(top) {
  window.scrollY = top
  fireEvent.scroll(window)
}

it('orients the final Home advisory CTA at Contact and restores Back and Forward positions', async () => {
  const user = userEvent.setup()
  renderSite()
  scrollToPosition(1800)
  const advisoryLinks = within(screen.getByRole('main')).getAllByRole('link', { name: /solicitar asesoría/i })
  await user.click(advisoryLinks.at(-1))
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/conversemos/i)
  expect(screen.getByRole('main')).toHaveFocus()
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 0, behavior: 'instant' })
  scrollToPosition(640)
  await act(() => navigate(-1))
  expect(screen.getByRole('main')).toHaveFocus()
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 1800, behavior: 'instant' })
  await act(() => navigate(1))
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 640, behavior: 'instant' })
})

it('keeps query filtering in place and restores each filter entry on Back', async () => {
  const user = userEvent.setup()
  renderSite('/servicios')
  scrollToPosition(420)
  const filter = screen.getByRole('button', { name: 'Redes' })
  await user.click(filter)
  expect(filter).toHaveFocus()
  expect(filter).toHaveAttribute('aria-pressed', 'true')
  expect(window.scrollTo).not.toHaveBeenCalled()
  expect(window.scrollY).toBe(420)
  scrollToPosition(720)
  await act(() => navigate(-1))
  expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true')
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 420, behavior: 'instant' })
})

it('focuses explicit hash destinations on pathname and same-page navigation', async () => {
  const user = userEvent.setup()
  renderSite()
  await act(() => navigate('/terminos#costos'))
  const costs = document.getElementById('costos')
  expect(costs).toHaveFocus()
  expect(costs.scrollIntoView).toHaveBeenLastCalledWith({ block: 'start', behavior: 'instant' })
  expect(HTMLElement.prototype.scrollIntoView.mock.contexts.at(-1)).toBe(costs)
  scrollToPosition(480)
  await user.click(screen.getByRole('link', { name: 'Pagos' }))
  expect(document.getElementById('pagos')).toHaveFocus()
  expect(HTMLElement.prototype.scrollIntoView.mock.contexts.at(-1)).toBe(document.getElementById('pagos'))
  const anchorScrolls = HTMLElement.prototype.scrollIntoView.mock.calls.length
  await user.click(screen.getByRole('link', { name: 'Pagos' }))
  expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(anchorScrolls + 1)
  scrollToPosition(850)
  await act(() => navigate(-1))
  expect(costs).toHaveFocus()
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 480, behavior: 'instant' })
})

it('honors initial hash links and safely falls back for a missing destination', async () => {
  renderSite('/terminos#costos')
  expect(document.getElementById('costos')).toHaveFocus()
  await act(() => navigate('/contacto#missing'))
  expect(screen.getByRole('main')).toHaveFocus()
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 0, behavior: 'instant' })
})

it('recovers an inquiry across site navigation and clears the retained draft after success', async () => {
  const user = userEvent.setup()
  vi.stubEnv('VITE_CONTACT_FORM_ENDPOINT', 'https://example.test/contact')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })))
  const localWrites = vi.spyOn(Storage.prototype, 'setItem')
  renderSite('/contacto')
  await user.type(screen.getByRole('textbox', { name: /^nombre/i }), 'Ana Pérez')
  await user.type(screen.getByRole('textbox', { name: /^correo/i }), 'ana@example.com')
  await user.type(screen.getByRole('textbox', { name: /teléfono/i }), '+504 9999-0000')
  await user.click(screen.getByRole('radio', { name: /hogar/i }))
  await user.type(screen.getByRole('textbox', { name: /^mensaje/i }), 'Necesito soporte de red.')
  await act(() => navigate('/servicios'))
  await act(() => navigate(-1))
  expect(screen.getByRole('textbox', { name: /^nombre/i })).toHaveValue('Ana Pérez')
  expect(screen.getByRole('textbox', { name: /^correo/i })).toHaveValue('ana@example.com')
  expect(screen.getByRole('textbox', { name: /teléfono/i })).toHaveValue('+504 9999-0000')
  expect(screen.getByRole('radio', { name: /hogar/i })).toBeChecked()
  expect(screen.getByRole('textbox', { name: /^mensaje/i })).toHaveValue('Necesito soporte de red.')
  await user.click(screen.getByRole('button', { name: /enviar consulta/i }))
  expect(screen.getByRole('status')).toHaveTextContent(/enviada correctamente/i)
  await act(() => navigate('/terminos'))
  await act(() => navigate('/contacto'))
  for (const field of screen.getAllByRole('textbox')) expect(field).toHaveValue('')
  for (const radio of screen.getAllByRole('radio')) expect(radio).not.toBeChecked()
  expect(localWrites).not.toHaveBeenCalled()
})
