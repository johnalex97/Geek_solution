import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import NotFoundPage from './NotFoundPage.jsx'

afterEach(cleanup)

describe('NotFoundPage', () => {
  it('offers recovery routes', () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /página no encontrada/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /portal de soporte/i })).toHaveAttribute('href', '/portal-ayuda')
    expect(screen.getByRole('link', { name: /contacto/i })).toHaveAttribute('href', '/contacto')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })
})
