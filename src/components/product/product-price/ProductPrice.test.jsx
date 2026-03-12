import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import ProductPrice from './ProductPrice';

const product = {
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

describe('ProductPrice', () => {
  test('показує першу ціну за замовчуванням', () => {
    render(<ProductPrice product={product} />);
    expect(screen.getByText('35 грн')).toBeInTheDocument();
  });

  test('показує всі кнопки пакування', () => {
    render(<ProductPrice product={product} />);
    expect(screen.getByText('250 гр')).toBeInTheDocument();
    expect(screen.getByText('500 гр')).toBeInTheDocument();
    expect(screen.getByText('1 кг')).toBeInTheDocument();
  });

  test('змінює ціну при кліку на кнопку', () => {
    render(<ProductPrice product={product} />);
    fireEvent.click(screen.getByText('500 гр'));
    expect(screen.getByText('60 грн')).toBeInTheDocument();
  });
});