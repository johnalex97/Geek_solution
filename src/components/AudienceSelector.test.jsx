import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import AudienceSelector from './AudienceSelector.jsx'

it('announces and changes the selected audience', async () => {
  const user = userEvent.setup()
  const onChange = vi.fn()
  render(<AudienceSelector value="" onChange={onChange} error="Selecciona una opción." />)
  expect(screen.getByRole('group', { name: /tipo de atención/i })).toHaveAccessibleDescription('Selecciona una opción.')
  await user.click(screen.getByRole('radio', { name: /empresa/i }))
  expect(onChange).toHaveBeenCalledWith('empresa')
})
