import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { t } = useLanguage();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{t('cart_empty')}</h2>
          <p className="mt-2 text-gray-600">{t('add_products_msg')}</p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {t('continue_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-orange-600">{t('shopping_cart')}</h1>
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('clear_cart')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
     
     
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-32 h-32 object-contain bg-gray-100 rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-orange-600 font-bold text-lg">${item.price}</p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>

                
                

                  <p className="text-gray-900 font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                 
                 
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>



          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('order_summary')}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>{t('subtotal')}:</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t('shipping')}:</span>
                  <span className="font-semibold">{t('free')}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t('tax')} (10%):</span>
                  <span className="font-semibold">${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>{t('total')}:</span>
                  <span className="text-orange-600">${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 mb-4 text-center"
              >
                {t('proceed_to_checkout')}
              </Link>

              <Link
                to="/products"
                className="block text-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300"
              >
                {t('continue_shopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
