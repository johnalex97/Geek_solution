import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import AboutPage from './AboutPage.jsx'
import PortalPage from './PortalPage.jsx'
import TermsPage from './TermsPage.jsx'

afterEach(() => {
  cleanup()
  document.title = ''
  document.querySelector('meta[name="description"]')?.remove()
})

describe('informational pages', () => {
  it.each([
    ['/nosotros', AboutPage, 'Nosotros | Geek Solution', 'Conoce a Geek Solution, una pyme hondureña con más de 12 años de experiencia en informática y servicios ejecutados bajo normativas SLA.'],
    ['/portal-ayuda', PortalPage, 'Portal de soporte | Geek Solution', 'Accede al portal de soporte de Geek Solution para gestionar tus solicitudes y dar seguimiento a tus tickets.'],
    ['/terminos', TermsPage, 'Términos de servicio | Geek Solution', 'Consulta las condiciones de ingreso de equipos, diagnóstico, costos, garantía y pagos de los servicios de Geek Solution.'],
  ])('renders %s with its own metadata and main landmark', (route, Page, title, description) => {
    expect(() => render(<MemoryRouter initialEntries={[route]}><Page /></MemoryRouter>)).not.toThrow()

    expect(document.title).toBe(title)
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', description)
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('links the terms index to all four titled sections with semantic condition lists', () => {
    render(<MemoryRouter><TermsPage /></MemoryRouter>)

    const navigation = screen.getByRole('navigation', { name: 'Secciones de los términos' })
    const index = within(navigation).getByRole('list')
    expect(index.tagName).toBe('UL')
    expect(within(index).getAllByRole('link')).toHaveLength(4)

    for (const [title, id, itemCount] of [
      ['Ingreso de equipos', 'ingreso-de-equipos', 4],
      ['Costos', 'costos', 3],
      ['Garantía', 'garantia', 3],
      ['Pagos', 'pagos', 3],
    ]) {
      const link = within(index).getByRole('link', { name: title })
      expect(link).toHaveAttribute('href', `#${id}`)
      const section = document.getElementById(id)
      expect(section?.tagName).toBe('SECTION')
      expect(within(section).getByRole('heading', { name: title, level: 2 })).toBeInTheDocument()
      const conditions = within(section).getByRole('list')
      expect(conditions.tagName).toBe('UL')
      expect(within(conditions).getAllByRole('listitem')).toHaveLength(itemCount)
    }
  })

  it('offers one external Freshdesk action and secondary Services and Contact routes', () => {
    render(<MemoryRouter><PortalPage /></MemoryRouter>)

    const portal = screen.getByRole('link', { name: /abrir portal de soporte/i })
    expect(portal).toHaveAttribute('href', 'https://portaldeayudatecnicageeksolution.freshdesk.com/')
    expect(portal).toHaveAttribute('target', '_blank')
    expect(portal.getAttribute('rel')).toContain('noreferrer')
    expect(screen.getAllByRole('link').filter((link) => link.getAttribute('href').startsWith('https://'))).toEqual([portal])
    expect(screen.getByRole('link', { name: 'Revisar servicios' })).toHaveAttribute('href', '/servicios')
    expect(screen.getByRole('link', { name: 'Contactar al equipo' })).toHaveAttribute('href', '/contacto')
  })
})
