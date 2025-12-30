import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';

const OrderSummary = memo(({ cartItems, subtotal, tax, shipping, total }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('order_summary')}</h2>

      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-contain bg-gray-100 rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-sm text-gray-600">{t('qty')}: {item.quantity}</p>
              <p className="text-orange-600 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>{t('subtotal')}:</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>{t('shipping')}:</span>
          <span className="font-semibold text-green-600">{t('free')}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>{t('tax')} (10%):</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-bold text-gray-900">
          <span>{t('total')}:</span>
          <span className="text-orange-600">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-2 text-green-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-semibold">{t('secure_checkout')}</span>
        </div>
        <p className="text-xs text-green-600 mt-1">{t('secure_checkout_desc')}</p>
      </div>
    </div>
  );
});

OrderSummary.propTypes = {
  cartItems: PropTypes.array.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default OrderSummary;
