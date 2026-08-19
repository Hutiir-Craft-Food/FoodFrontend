import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartItem from './CartItem'

const sampleCartItem = {
  product: {
    id: 42,
    name: 'Wild Honey from the Carpathians',
    images: { thumbnail: '/images/honey.jpg' },
  },
  unit: { name: '500 г' },
  price: { price: 150 },
  currency: 'UAH',
  quantity: 2,
  subtotal: 300,
  seller: { name: 'Best Seller' },
}

const renderCartItem = (props) =>
  render(
    <MemoryRouter>
      <CartItem {...props} />
    </MemoryRouter>
  )

describe('CartItem', () => {
  it('renders cart item details and quantity controls', () => {
    const onIncrement = jest.fn()
    const onDecrement = jest.fn()

    renderCartItem({ cartItem: sampleCartItem, onIncrement, onDecrement })

    expect(screen.getByText(/Best Seller/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Wild Honey from the Carpathians/i })
    ).toHaveAttribute('href', '/products/42')
    expect(
      screen.getByRole('img', { name: /Wild Honey from the Carpathians/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/500 г/i)).toBeInTheDocument()
    expect(screen.getByText('150.00 ₴')).toBeInTheDocument()
    expect(screen.getByText('300.00 ₴')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Increase quantity/i }))
    fireEvent.click(screen.getByRole('button', { name: /Decrease quantity/i }))

    expect(onIncrement).toHaveBeenCalledTimes(1)
    expect(onDecrement).toHaveBeenCalledTimes(1)
  })

  it('renders nothing when cartItem is missing', () => {
    const { container } = renderCartItem({ cartItem: null })
    expect(container).toBeEmptyDOMElement()
  })
})
