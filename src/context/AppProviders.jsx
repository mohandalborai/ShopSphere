import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { WishlistProvider } from './WishlistContext';
import { OrderProvider } from './OrderContext';
import { CartProvider } from './CartContext';

/**
 * AppProviders Component
 * 
 * Centralizes all context providers for the application.
 * Defines the order of provider nesting to avoid circular dependencies and ensure
 * contexts are available where needed.
 * 
 * Order:
 * 1. AuthProvider: User authentication state (might satisfy Language preferences)
 * 2. LanguageProvider: Internationalization (might be needed by Cart for localized messages)
 * 3. WishlistProvider: Wishlist state
 * 4. OrderProvider: Order history state
 * 5. CartProvider: Shopping cart state (needs User and Language potentially)
 */
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <WishlistProvider>
          <OrderProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </OrderProvider>
        </WishlistProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
