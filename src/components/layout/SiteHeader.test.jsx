import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import SiteHeader from './SiteHeader.jsx'

afterEach(cleanup)

describe('SiteHeader mobile navigation', () => {
  it('opens and closes with an accurate accessible label and expanded state', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-navigation')
    expect(screen.queryByRole('navigation', { name: 'Navegación móvil' })).not.toBeInTheDocument()

    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Navegación móvil' })).toHaveAttribute('id', 'mobile-navigation')

    await user.click(toggle)
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Navegación móvil' })).not.toBeInTheDocument()
  })

  it('closes on Escape from a menu link and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    await user.click(toggle)
    const navigation = screen.getByRole('navigation', { name: 'Navegación móvil' })
    within(navigation).getByRole('link', { name: 'Servicios' }).focus()
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('navigation', { name: 'Navegación móvil' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('closes after selecting a mobile destination', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><SiteHeader /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    await user.click(within(screen.getByRole('navigation', { name: 'Navegación móvil' })).getByRole('link', { name: 'Servicios' }))

    expect(screen.queryByRole('navigation', { name: 'Navegación móvil' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
  })
})
