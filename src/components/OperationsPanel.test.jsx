import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import OperationsPanel from './OperationsPanel.jsx'

afterEach(cleanup)

describe('OperationsPanel', () => {
  it('associates every system with its supplied status and service detail', () => {
    render(<OperationsPanel systems={[
      { name: 'Soporte', status: 'Activo', detail: 'Atención técnica y helpdesk' },
      { name: 'Redes', status: 'En revisión', detail: 'Conectividad e infraestructura' },
    ]} />)

    const panel = screen.getByRole('region', { name: 'Centro de operaciones' })
    const items = within(panel).getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('Soporte')
    expect(items[0]).toHaveTextContent('Activo')
    expect(items[0]).toHaveTextContent('Atención técnica y helpdesk')
    expect(items[1]).toHaveTextContent('Redes')
    expect(items[1]).toHaveTextContent('En revisión')
    expect(items[1]).toHaveTextContent('Conectividad e infraestructura')
  })

  it('hides decorative connection graphics from assistive technology', () => {
    const { container } = render(<OperationsPanel systems={[
      { name: 'Cloud', status: 'Activo', detail: 'Respaldo y administración' },
    ]} />)

    const connections = container.querySelectorAll('svg')
    expect(connections.length).toBeGreaterThan(0)
    for (const connection of connections) {
      expect(connection).toHaveAttribute('aria-hidden', 'true')
      expect(connection).toHaveAttribute('focusable', 'false')
    }
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
