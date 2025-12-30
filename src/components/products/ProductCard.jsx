import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../context/LanguageContext";
import { useWishlist } from "../../context/WishlistContext";

/**
 * ProductCard Component
 * 
 * Displays individual product information in a grid layout.
 * Supports hover animations, click to view details, and add to cart functionality.
 * wrapped in React.memo for performance optimization.
 * 
 * @param {Object} props
 * @param {Object} props.product - The product data object
 * @param {Function} props.onAddToCart - Handler for adding to cart
 * @param {string|React.Node} [props.categoryIcon] - Icon to display for category
 */


const ProductCard = React.memo(({ product, onAddToCart, categoryIcon }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        y: -10, 
        rotateY: 10,
        rotateX: -5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col [transform-style:preserve-3d] [perspective:1000px] relative group"
    >
      <div 
        onClick={handleViewDetails}
        className="cursor-pointer overflow-hidden relative"
        aria-hidden="true"
      >
        <img
          src={product.thumbnail}
          alt="" 
          className="w-full h-52 object-contain bg-gray-100 hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all duration-200 z-10"
            aria-label={isWishlisted ? t('remove_from_wishlist') : t('add_to_wishlist')}
        >
            <svg 
              className={`w-6 h-6 transition-colors duration-300 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
           <span className="text-lg" aria-hidden="true">{categoryIcon}</span>
           <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
             {product.category}
           </span>
        </div>
        <h2 
          onClick={handleViewDetails}
          className="font-bold text-lg text-gray-900 mb-2 truncate cursor-pointer hover:text-orange-600 transition"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleViewDetails()}
        >
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold">${product.price}</span>
          <span className="text-yellow-500 font-semibold" aria-label={`Rating ${product.rating} out of 5`}>
            ⭐ {product.rating}
          </span>
        </div>
        <div className="mt-auto space-y-2">
          <button
            onClick={handleViewDetails}
            className="w-full bg-white hover:bg-gray-50 text-orange-600 font-semibold py-2 rounded-lg border-2 border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label={`View details for ${product.title}`}
          >
            {t('view_details')}
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            aria-label={`Add ${product.title} to cart`}
          >
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  categoryIcon: PropTypes.node,
};

export default ProductCard;
