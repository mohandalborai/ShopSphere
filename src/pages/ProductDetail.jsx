import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/api';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';
import LoginModal from '../components/common/LoginModal';
import SuccessToast from '../components/common/SuccessToast';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import ProductReviews from '../components/product/ProductReviews';

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
    productService.getProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    setShowSuccessToast(true);
  }, [user, quantity, product, addToCart]);

  const handleContinueShopping = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
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
          <ProductGallery 
            images={product.images}
            title={product.title}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            discountPercentage={product.discountPercentage}
            stock={product.stock}
          />

          {/* Product Info */}
          <ProductInfo 
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            handleContinueShopping={handleContinueShopping}
            discountedPrice={discountedPrice}
          />
        </motion.div>

        {/* Tabs Section */}
        <ProductTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          product={product}
          discountedPrice={discountedPrice}
        />

        {/* Reviews Section */}
        <ProductReviews reviews={product.reviews} />
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Success Toast */}
      <SuccessToast 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)}
        message="Added to Cart!"
        subMessage={`${quantity} × ${product.title}`}
      />
    </div>
  );
};

export default ProductDetail;
