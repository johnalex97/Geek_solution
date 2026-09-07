import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ActionButton } from './ActionButton.jsx'

afterEach(cleanup)

describe('ActionButton', () => {
  it.each([undefined, 'https://example.com/portal'])(
    'uses the internal destination when to is provided (href: %s)',
    async (href) => {
      const user = userEvent.setup()
      render(
        <MemoryRouter>
          <ActionButton to="/contacto" href={href}>Solicitar soporte</ActionButton>
          <Routes>
            <Route path="/" element={<h1>Inicio</h1>} />
            <Route path="/contacto" element={<h1>Contacto</h1>} />
          </Routes>
        </MemoryRouter>,
      )

      const link = screen.getByRole('link', { name: 'Solicitar soporte' })
      expect(link).toHaveAttribute('href', '/contacto')
      await user.click(link)
      expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument()
    },
  )

  it('renders an external link with its destination and link attributes', () => {
    render(
      <ActionButton href="https://example.com/portal" target="_blank" rel="noopener noreferrer">
        Abrir portal
      </ActionButton>,
    )

    const link = screen.getByRole('link', { name: 'Abrir portal' })
    expect(link).toHaveAttribute('href', 'https://example.com/portal')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders an operable button when no destination is provided', async () => {
    const user = userEvent.setup()
    let activations = 0
    render(
      <ActionButton type="button" onClick={() => { activations += 1 }}>
        Enviar solicitud
      </ActionButton>,
    )

    const button = screen.getByRole('button', { name: 'Enviar solicitud' })
    expect(button).toHaveAttribute('type', 'button')
    await user.click(button)
    expect(activations).toBe(1)
  })
})
