import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProducts } from '../useProducts';
import { productService } from '../../services/api';

// Mock the api service
vi.mock('../../services/api', () => ({
  productService: {
    getAllProducts: vi.fn(),
  },
}));

describe('useProducts', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1', category: 'Electronics' },
    { id: 2, title: 'Product 2', category: 'Fashion' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initially returns loading state and empty products', () => {
    productService.getAllProducts.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.categories).toEqual([]);
  });

  it('fetches products and extracts unique categories correctly', async () => {
    productService.getAllProducts.mockResolvedValue({ products: mockProducts });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.categories).toEqual(['All', 'Electronics', 'Fashion']);
    expect(result.current.error).toBeNull();
  });

  it('handles error during fetching', async () => {
    const mockError = new Error('Failed to fetch');
    productService.getAllProducts.mockRejectedValue(mockError);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.products).toEqual([]);
  });
});
