import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProductList from './ProductList'; // Adjust the path as needed

// Setup a mock adapter for axios
const mock = new MockAdapter(axios);

const mockProducts = [
  { uuid: 1, name: 'Product 1', price: '10.00' },
  { uuid: 2, name: 'Product 2', price: '20.00' },
];

describe('ProductList Component', () => {
  beforeEach(() => {
    mock.onGet('/products').reply(200, mockProducts);
  });

  test('renders a list of products', async () => {
    const handleAddToCart = jest.fn();

    render(<ProductList onAddToCart={handleAddToCart} />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  test('displays product prices correctly', async () => {
    const handleAddToCart = jest.fn();

    render(<ProductList onAddToCart={handleAddToCart} />);

    await waitFor(() => {
      expect(screen.getByText('$10.00')).toBeInTheDocument();
      expect(screen.getByText('$20.00')).toBeInTheDocument();
    });
  });

  test('calls onAddToCart with correct product when button is clicked', async () => {
    const handleAddToCart = jest.fn();

    render(<ProductList onAddToCart={handleAddToCart} />);

    await waitFor(() => {
      const addButton = screen.getAllByText('Add to Cart')[0];
      fireEvent.click(addButton);

      expect(handleAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });
  });

  test('handles errors when fetching products', async () => {
    mock.onGet('/products').reply(500);

    const handleAddToCart = jest.fn();

    render(<ProductList onAddToCart={handleAddToCart} />);

    await waitFor(() => {
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
  });
});
