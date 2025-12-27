import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../ProductCard';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../../context/LanguageContext';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    rating: 4.5,
    thumbnail: 'test.jpg',
    category: 'test-category',
    description: 'This is a test description',
  };

  const mockOnAddToCart = vi.fn();

  const renderProductCard = () => {
    return render(
      <BrowserRouter>
        <LanguageProvider>
          <ProductCard 
            product={mockProduct} 
            onAddToCart={mockOnAddToCart} 
            categoryIcon="📁" 
          />
        </LanguageProvider>
      </BrowserRouter>
    );
  };

  it('renders product information correctly', () => {
    renderProductCard();

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('test-category')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
  });

  it('calls onAddToCart when "Add to Cart" button is clicked', () => {
    renderProductCard();

    const addToCartButton = screen.getByLabelText('Add Test Product to cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('navigates to product details when title or image is clicked', () => {
    renderProductCard();

    const title = screen.getByRole('button', { name: 'Test Product' });
    fireEvent.click(title);
    expect(mockNavigate).toHaveBeenCalledWith('/product/1');

    const image = screen.getByAltText('Test Product');
    fireEvent.click(image.parentElement); // The div around the image has the onClick
    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });
});
