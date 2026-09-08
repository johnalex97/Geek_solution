import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import ServiceCatalog from './ServiceCatalog.jsx'

const services = [
  { slug: 'redes', eyebrow: 'Redes', title: 'Redes administradas', description: 'Conectividad', problem: 'Caídas', result: 'Continuidad', bullets: [] },
  { slug: 'cloud', eyebrow: 'Cloud', title: 'Nube administrada', description: 'Respaldos', problem: 'Pérdida', result: 'Recuperación', bullets: [] },
]

function LocationProbe() { return <output>{useLocation().search}</output> }

afterEach(cleanup)

describe('ServiceCatalog', () => {
  it('filters services and reflects the category in the URL', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><ServiceCatalog services={services} /><LocationProbe /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: 'Redes' }))
    expect(screen.getByText('Redes administradas')).toBeInTheDocument()
    expect(screen.queryByText('Nube administrada')).not.toBeInTheDocument()
    expect(screen.getByText('?categoria=redes')).toBeInTheDocument()
  })

  it.each([
    {
      initialEntry: '/servicios?categoria=redes',
      pressedFilter: 'Redes',
      visibleTitles: ['Redes administradas'],
      hiddenTitle: 'Nube administrada',
    },
    {
      initialEntry: '/servicios?categoria=desconocida',
      pressedFilter: 'Todos',
      visibleTitles: ['Redes administradas', 'Nube administrada'],
      hiddenTitle: null,
    },
  ])('uses the initial URL selection and safely falls back for $initialEntry', ({ initialEntry, pressedFilter, visibleTitles, hiddenTitle }) => {
    render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <ServiceCatalog services={services} />
      </MemoryRouter>,
    )

    visibleTitles.forEach((title) => expect(screen.getByText(title)).toBeInTheDocument())
    if (hiddenTitle) expect(screen.queryByText(hiddenTitle)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: pressedFilter })).toHaveAttribute('aria-pressed', 'true')
  })
})
