import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import VariantSelector from './VariantSelector'

const prices = [
  { id: 1, unitId: 2, qty: 250, price: 35 },
  { id: 2, unitId: 2, qty: 500, price: 60 },
  { id: 3, unitId: 1, qty: 1, price: 180 },
]

const units = [
  { id: 1, name: 'кг' },
  { id: 2, name: 'гр' },
]

describe('VariantSelector', () => {
  test('renders all price and unit options', () => {
    render(<VariantSelector prices={prices} units={units} />)

    expect(screen.getByText('250 гр')).toBeInTheDocument()
    expect(screen.getByText('500 гр')).toBeInTheDocument()
    expect(screen.getByText('1 кг')).toBeInTheDocument()
  })

  test('selects the first option by default', () => {
    render(<VariantSelector prices={prices} units={units} />)

    expect(screen.getByRole('button', { name: '250 гр' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: '500 гр' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  test('updates the selection and calls onSelect with the selected price', () => {
    const onSelect = jest.fn()
    render(
      <VariantSelector prices={prices} units={units} onSelect={onSelect} />
    )

    fireEvent.click(screen.getByText('500 гр'))

    expect(screen.getByRole('button', { name: '500 гр' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: '250 гр' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    expect(onSelect).toHaveBeenCalledWith(prices[1])
  })

  test('does not call onSelect when the active option is clicked again', () => {
    const onSelect = jest.fn()
    render(
      <VariantSelector prices={prices} units={units} onSelect={onSelect} />
    )

    fireEvent.click(screen.getByRole('button', { name: '250 гр' }))

    expect(onSelect).not.toHaveBeenCalled()
  })

  test('renders no options when prices are empty', () => {
    render(<VariantSelector prices={[]} units={units} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('supports a single price without an onSelect callback', () => {
    render(<VariantSelector prices={[prices[0]]} units={units} />)

    expect(screen.getByRole('button', { name: '250 гр' })).toBeInTheDocument()
  })
})
