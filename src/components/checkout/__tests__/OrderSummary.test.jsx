import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import OrderSummary from '../OrderSummary';
import { LanguageProvider } from '../../../context/LanguageContext';

describe('OrderSummary', () => {
  const mockCartItems = [
    {
      id: 1,
      title: 'Item 1',
      price: 10,
      quantity: 2,
      thumbnail: 'item1.jpg',
    },
    {
      id: 2,
      title: 'Item 2',
      price: 20,
      quantity: 1,
      thumbnail: 'item2.jpg',
    },
  ];

  const subtotal = 40;
  const tax = 4;
  const shipping = 0;
  const total = 44;

  const renderOrderSummary = () => {
    return render(
      <LanguageProvider>
        <OrderSummary
          cartItems={mockCartItems}
          subtotal={subtotal}
          tax={tax}
          shipping={shipping}
          total={total}
        />
      </LanguageProvider>
    );
  };

  it('renders order summary and totals correctly', () => {
    renderOrderSummary();

    // Check titles
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Check individual prices (item price * quantity)
    // Item 1: 10 * 2 = 20.00
    // Item 2: 20 * 1 = 20.00
    expect(screen.getAllByText('$20.00').length).toBe(2);

    // Check quantities
    expect(screen.getByText('Qty: 2')).toBeInTheDocument();
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();

    // Check totals
    expect(screen.getByText('$40.00')).toBeInTheDocument(); // Subtotal
    expect(screen.getByText('$4.00')).toBeInTheDocument();  // Tax
    expect(screen.getByText('$44.00')).toBeInTheDocument(); // Total
  });
});
