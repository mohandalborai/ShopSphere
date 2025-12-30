import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WishlistProvider, useWishlist } from '../WishlistContext';

describe('WishlistContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <WishlistProvider>{children}</WishlistProvider>;

  it('provides initial empty wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    expect(result.current.wishlistItems).toEqual([]);
  });

  it('can add item to wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    const product = { id: 1, title: 'Test Product' };

    act(() => {
      result.current.addToWishlist(product);
    });

    expect(result.current.wishlistItems).toHaveLength(1);
    expect(result.current.wishlistItems[0]).toEqual(product);
  });

  it('can remove item from wishlist', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    const product = { id: 1, title: 'Test Product' };

    act(() => {
      result.current.addToWishlist(product);
    });

    act(() => {
      result.current.removeFromWishlist(product.id);
    });

    expect(result.current.wishlistItems).toHaveLength(0);
  });

  it('can toggle wishlist item', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });
    const product = { id: 1, title: 'Test Product' };

    // Toggle On
    act(() => {
      const added = result.current.toggleWishlist(product);
      expect(added).toBe(true);
    });
    expect(result.current.isInWishlist(product.id)).toBe(true);

    // Toggle Off
    act(() => {
      const added = result.current.toggleWishlist(product);
      expect(added).toBe(false);
    });
    expect(result.current.isInWishlist(product.id)).toBe(false);
  });
});
