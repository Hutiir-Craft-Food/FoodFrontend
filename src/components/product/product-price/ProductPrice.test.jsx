import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import ProductPrice from './ProductPrice';

const productWithMultiplePrices = {
  id: 1,
  prices: [
    { unitId: 2, qty: 250, price: 35 },
    { unitId: 2, qty: 500, price: 60 },
    { unitId: 1, qty: 1, price: 180 },
  ],
  units: [
    { id: 1, name: 'кг' },
    { id: 2, name: 'гр' },
  ],
};

const productWithSinglePrice = {
  id: 2,
  prices: [
    { unitId: 1, qty: 1, price: 180 },
  ],
  units: [
    { id: 1, name: 'кг' },
    { id: 2, name: 'гр' },
  ],
};

const productWithNoPrices = {
  id: 3,
  prices: [],
  units: [
    { id: 1, name: 'кг' },
  ],
};

describe('ProductPrice', () => {
  test('displays first price in the list as default', () => {
    render(<ProductPrice product={productWithMultiplePrices} />);
    expect(screen.getByText('35 грн')).toBeInTheDocument();
  });

  test('shows all packaging buttons', () => {
    render(<ProductPrice product={productWithMultiplePrices} />);
    expect(screen.getByText('250 гр')).toBeInTheDocument();
    expect(screen.getByText('500 гр')).toBeInTheDocument();
    expect(screen.getByText('1 кг')).toBeInTheDocument();
  });

  test('changes the price when clicking on the button', () => {
    render(<ProductPrice product={productWithMultiplePrices} />);
    fireEvent.click(screen.getByText('500 гр'));
    expect(screen.getByText('60 грн')).toBeInTheDocument();
  });

  test('displays "Немає ціни" when no prices are available', () => {
    render(<ProductPrice product={productWithNoPrices} />);
    expect(screen.getByText('Немає ціни')).toBeInTheDocument();
  });

  test('does not show packaging buttons when no prices', () => {
    render(<ProductPrice product={productWithNoPrices} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('displays price for single price product', () => {
    render(<ProductPrice product={productWithSinglePrice} />);
    expect(screen.getByText('180 грн')).toBeInTheDocument();
  });

  test('shows single packaging button', () => {
    render(<ProductPrice product={productWithSinglePrice} />);
    expect(screen.getByText('1 кг')).toBeInTheDocument();
  });
});