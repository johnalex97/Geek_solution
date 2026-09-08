import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { services } from '../data/siteContent.js'
import ServiceResolver from './ServiceResolver.jsx'

afterEach(cleanup)

describe('ServiceResolver', () => {
  it('links all six business services to their explicit filter query', () => {
    render(<MemoryRouter><ServiceResolver services={services} /></MemoryRouter>)

    const list = screen.getByRole('list', { name: 'Servicios' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(6)
    expect(within(list).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/servicios?categoria=soporte',
      '/servicios?categoria=redes',
      '/servicios?categoria=seguridad',
      '/servicios?categoria=antivirus',
      '/servicios?categoria=cloud',
      '/servicios?categoria=educacion',
    ])
  })

  it('keeps the slug destination when a display label changes', () => {
    render(<MemoryRouter><ServiceResolver services={[
      { slug: 'soporte', eyebrow: 'Ayuda con tu equipo', title: 'Revisión técnica', bullets: ['Helpdesk'] },
    ]} /></MemoryRouter>)

    expect(screen.getByRole('link', { name: /Ayuda con tu equipo/ }))
      .toHaveAttribute('href', '/servicios?categoria=soporte')
  })
})
