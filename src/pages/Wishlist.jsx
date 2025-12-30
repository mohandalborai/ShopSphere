import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/products/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SuccessToast from '../components/common/SuccessToast';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [showToast, setShowToast] = React.useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowToast(true);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-red-100 p-6 rounded-full inline-block mb-4">
             <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
             </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('empty_wishlist')}</h2>
          <p className="text-gray-600 mb-8 max-w-md">{t('empty_wishlist_desc')}</p>
          <Link 
            to="/products" 
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-xl"
          >
            {t('start_shopping')}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('my_wishlist')}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {wishlistItems.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
       <SuccessToast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        message={t('added_to_cart')}
      />
    </div>
  );
};

export default Wishlist;
