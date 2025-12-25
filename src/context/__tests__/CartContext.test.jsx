import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../CartContext';

// Test component to access context
const TestComponent = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  return (
    <div>
      <div data-testid="cart-count">{cartItems.length}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <button onClick={() => addToCart({ id: 1, title: 'Test Product', price: 100 })} data-testid="add-btn">Add</button>
      <button onClick={() => removeFromCart(1)} data-testid="remove-btn">Remove</button>
      <button onClick={() => updateQuantity(1, 5)} data-testid="update-btn">Update</button>
      <button onClick={() => clearCart()} data-testid="clear-btn">Clear</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides empty cart initially', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      screen.getByTestId('add-btn').click();
    });

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('100');
  });

  it('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      screen.getByTestId('add-btn').click();
    });
    
    act(() => {
      screen.getByTestId('update-btn').click();
    });

    expect(screen.getByTestId('cart-total')).toHaveTextContent('500'); // 100 * 5
  });

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      screen.getByTestId('add-btn').click();
    });
    
    act(() => {
      screen.getByTestId('remove-btn').click();
    });

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      screen.getByTestId('add-btn').click();
    });
    
    act(() => {
      screen.getByTestId('clear-btn').click();
    });

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
});
