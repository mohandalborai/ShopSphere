import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
    //fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500"></div>
          <p className="mt-6 text-xl font-semibold text-gray-700">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
          <nav className="flex items-center space-x-1.5 text-xs text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-orange-600 transition">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-orange-600 transition">
              Products
            </button>
            <span>/</span>
            <span className="text-orange-600 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Image Gallery */}
          <div className="space-y-2">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="aspect-square flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-white">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Discount Badge */}
              {product.discountPercentage > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full font-bold text-xs shadow-lg"
                >
                  -{product.discountPercentage.toFixed(0)}%
                </motion.div>
              )}

              {/* Stock Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full font-bold text-xs shadow-lg ${
                  product.stock > 50 
                    ? 'bg-green-500 text-white' 
                    : product.stock > 0 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {product.stock > 50 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </span>
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-orange-500 shadow-lg' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
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
                    You save ${(product.price - discountedPrice).toFixed(2)} ({product.discountPercentage.toFixed(0)}% off)
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mb-3">
                <label className="text-sm font-semibold text-gray-700">Quantity:</label>
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
                  Add to Cart
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
                  Continue Shopping
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
                      <p className="text-xs text-gray-600">Free Shipping</p>
                      <p className="font-bold text-gray-900 text-sm">On orders $50+</p>
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
                      <p className="text-xs text-gray-600">Warranty</p>
                      <p className="font-bold text-gray-900 text-sm">{product.warrantyInformation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs Section */}
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

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{review.reviewerName}</h4>
                      <p className="text-xs text-gray-600">{review.reviewerEmail}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login_required')}</h3>
              <p className="text-gray-600 mb-6">
                {t('login_desc')}
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-lg border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200"
                >
                  {t('register')}
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition text-sm"
                >
                  {t('continue_browsing')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3"
          >
            <div className="bg-white rounded-full p-1">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Added to Cart!</p>
              <p className="text-sm text-green-100">{quantity} × {product.title}</p>
            </div>
            <button 
              onClick={() => setShowSuccessToast(false)}
              className="ml-4 hover:bg-green-600 rounded p-1 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
