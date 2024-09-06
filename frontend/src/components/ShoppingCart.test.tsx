import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ShoppingCart from './ShoppingCart'; 
const mock = new MockAdapter(axios);

const mockCartItems = [
  { uuid: 1, name: 'Product 1', price: '10.00' },
  { uuid: 2, name: 'Product 2', price: '20.00' },
];

describe('ShoppingCart Component', () => {
  beforeEach(() => {
    mock.onPost('/checkout').reply(200, {
      totalCost: 30.00,
      promotion: '10% off on total greater than $20'
    });
  });

  test('renders cart items correctly', () => {
    render(<ShoppingCart cartItems={mockCartItems} onCheckoutComplete={() => {}} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });

  test('handles checkout correctly', async () => {
    const handleCheckoutComplete = jest.fn();

    render(<ShoppingCart cartItems={mockCartItems} onCheckoutComplete={handleCheckoutComplete} />);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    await waitFor(() => {
      expect(handleCheckoutComplete).toHaveBeenCalledWith(30.00, '10% off on total greater than $20');
    });
  });

  test('handles errors during checkout', async () => {
    mock.onPost('/checkout').reply(500);

    const handleCheckoutComplete = jest.fn();

    render(<ShoppingCart cartItems={mockCartItems} onCheckoutComplete={handleCheckoutComplete} />);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    await waitFor(() => {
      expect(handleCheckoutComplete).not.toHaveBeenCalled();
    });
  });
});
