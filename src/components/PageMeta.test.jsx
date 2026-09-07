import { cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import PageMeta from './PageMeta.jsx'

let originalHead

beforeEach(() => {
  originalHead = document.head.innerHTML
  document.querySelectorAll('meta[name="description"], meta[name="theme-color"]').forEach((meta) => meta.remove())
  document.title = 'Previous page'
})

afterEach(() => {
  cleanup()
  document.head.innerHTML = originalHead
})

describe('PageMeta', () => {
  it('sets the title and creates a missing description', () => {
    render(<PageMeta title="Servicios | Geek Solution" description="Soporte para tu operación." />)
    expect(document.title).toBe('Servicios | Geek Solution')
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Soporte para tu operación.')
  })

  it('updates existing metadata when the page changes without adding duplicates', () => {
    const description = document.createElement('meta')
    description.name = 'description'
    description.content = 'Previous description'
    document.head.append(description)
    const theme = document.createElement('meta')
    theme.name = 'theme-color'
    theme.content = '#000000'
    document.head.append(theme)

    const { rerender } = render(<PageMeta title="Inicio | Geek Solution" description="Tecnología para tu empresa." />)
    expect(description).toHaveAttribute('content', 'Tecnología para tu empresa.')
    expect(theme).toHaveAttribute('content', '#F5F8F6')

    rerender(<PageMeta title="Contacto | Geek Solution" description="Cuéntanos qué necesitas resolver." />)
    expect(document.title).toBe('Contacto | Geek Solution')
    expect(description).toHaveAttribute('content', 'Cuéntanos qué necesitas resolver.')
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1)
  })
})
