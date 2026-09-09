import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import SiteFooter from './SiteFooter.jsx'

afterEach(cleanup)

it('identifies the copyright owner and site creator', () => {
  render(<MemoryRouter><SiteFooter /></MemoryRouter>)

  expect(screen.getByText('Geek Solution © 2026 | TODOS LOS DERECHOS RESERVADOS.')).toBeInTheDocument()
  expect(screen.getByText('Hecho por Jonatan Maradiaga')).toBeInTheDocument()
})
