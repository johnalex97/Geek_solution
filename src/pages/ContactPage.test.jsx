import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import ContactPage from './ContactPage.jsx'

afterEach(cleanup)

it('composes the audience form with the established direct channels and one main landmark', () => {
  render(<ContactPage />)
  expect(screen.getAllByRole('main')).toHaveLength(1)
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  expect(screen.getByRole('group', { name: /tipo de atención/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'consultas@geeksolutionhn.com' })).toHaveAttribute('href', 'mailto:consultas@geeksolutionhn.com')
  expect(screen.getByRole('link', { name: '+504 2213-0624' })).toHaveAttribute('href', 'tel:+50422130624')
  expect(screen.getByRole('link', { name: '+504 3383-7341' })).toHaveAttribute('href', 'https://wa.me/50433837341')
  expect(screen.getByText('Lunes a viernes · 8:00 am a 5:00 pm')).toBeInTheDocument()
  expect(document.title).toMatch(/contacto/i)
})
