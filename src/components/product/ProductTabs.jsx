import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const ProductTabs = memo(({ activeTab, setActiveTab, product, discountedPrice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-8"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex-1 py-2 px-4 font-bold text-sm transition-all duration-300 ${
              activeTab === 'description'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2 px-4 font-bold text-sm transition-all duration-300 ${
              activeTab === 'details'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex-1 py-2 px-4 font-bold text-sm transition-all duration-300 ${
              activeTab === 'shipping'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Shipping & Returns
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Key Features:</h4>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">High-quality {product.category} from {product.brand}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">Rated {product.rating.toFixed(1)} out of 5 stars</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{product.warrantyInformation}</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Brand:</span>
                      <span className="text-gray-900">{product.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Category:</span>
                      <span className="text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">SKU:</span>
                      <span className="text-gray-900">{product.sku}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Stock:</span>
                      <span className="text-gray-900">{product.stock} units</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Weight:</span>
                      <span className="text-gray-900">{product.weight} kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Dimensions:</span>
                      <span className="text-gray-900">
                        {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Return Policy:</span>
                      <span className="text-gray-900">{product.returnPolicy}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                      <span className="font-semibold text-gray-700">Availability:</span>
                      <span className="text-gray-900">{product.availabilityStatus}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping & Returns</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-3 border border-orange-200">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      Shipping Information
                    </h4>
                    <p className="text-gray-700 mb-1 text-sm"><strong>Shipping Time:</strong> {product.shippingInformation}</p>
                    <p className="text-gray-700 mb-1 text-sm"><strong>Minimum Order Amount:</strong> ${product.minimumOrderQuantity * discountedPrice.toFixed(2)}</p>
                    <p className="text-gray-700 text-sm"><strong>Free Shipping:</strong> Available on orders over $50</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Return Policy
                    </h4>
                    <p className="text-gray-700 mb-1 text-sm"><strong>Policy:</strong> {product.returnPolicy}</p>
                    <p className="text-gray-700 mb-1 text-sm"><strong>Warranty:</strong> {product.warrantyInformation}</p>
                    <p className="text-gray-700 text-sm">Items must be returned in original packaging with all accessories.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

ProductTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  discountedPrice: PropTypes.number.isRequired
};

export default ProductTabs;
