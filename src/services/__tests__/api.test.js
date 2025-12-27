import { describe, it, expect, vi, beforeEach } from 'vitest';
import { productService } from '../api';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('api service', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    // Cache is a private variable in api.js, so we might need to be careful with tests that rely on it or clear it if possible.
    // However, since it's a module level variable, it persists between tests.
  });

  describe('productService', () => {
    it('getAllProducts calls correct endpoint', async () => {
      const mockData = { products: [], total: 0 };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await productService.getAllProducts(10, 0);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/products?limit=10&skip=0'),
        expect.any(Object)
      );
      expect(result).toEqual(mockData);
    });

    it('getProductsByCategory calls correct endpoint', async () => {
      const mockData = { products: [] };
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      const result = await productService.getProductsByCategory('electronics');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/products/category/electronics'),
        expect.any(Object)
      );
      expect(result).toEqual(mockData);
    });

    it('handles API errors correctly', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(productService.getProductById(999)).rejects.toThrow('API Error: Not Found');
    });
  });
});
