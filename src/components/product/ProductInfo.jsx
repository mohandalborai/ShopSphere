import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ProductInfo = memo(({ 
  product, 
  quantity, 
  setQuantity, 
  handleAddToCart, 
  handleContinueShopping, 
  discountedPrice 
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Category & Brand */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold">
            {product.category}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">
            {product.brand}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-base font-semibold text-gray-700">
            {product.rating.toFixed(1)} / 5.0
          </span>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-3 mb-3 border border-orange-200">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-orange-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-green-600 font-semibold mt-1 text-sm">
              {t('you_save_amount', { 
                amount: (product.price - discountedPrice).toFixed(2), 
                percent: product.discountPercentage.toFixed(0) 
              })}
            </p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm font-semibold text-gray-700">{t('quantity_label')}</label>
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 font-bold text-base transition"
            >
              -
            </button>
            <span className="px-4 py-1.5 font-bold text-base bg-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 font-bold text-base transition"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {t('add_to_cart')}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinueShopping}
            className="w-full bg-white hover:bg-gray-50 text-orange-600 font-bold py-3 px-6 rounded-lg border-2 border-orange-500 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('continue_shopping')}
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-white rounded-lg p-2 shadow-md border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">{t('free_shipping')}</p>
                <p className="font-bold text-gray-900 text-sm">{t('free_shipping_threshold')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-2 shadow-md border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">{t('warranty')}</p>
                <p className="font-bold text-gray-900 text-sm">{product.warrantyInformation}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleContinueShopping: PropTypes.func.isRequired,
  discountedPrice: PropTypes.number.isRequired
};

export default ProductInfo;
