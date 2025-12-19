import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../context/LanguageContext";

const ProductCard = ({ product, onAddToCart, categoryIcon }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      <div 
        onClick={handleViewDetails}
        className="cursor-pointer overflow-hidden"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-contain bg-gray-100 hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
           <span className="text-lg">{categoryIcon}</span>
           <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
             {product.category}
           </span>
        </div>
        <h2 
          onClick={handleViewDetails}
          className="font-bold text-lg text-gray-900 mb-2 truncate cursor-pointer hover:text-orange-600 transition"
        >
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-600 font-bold">${product.price}</span>
          <span className="text-yellow-500 font-semibold">⭐ {product.rating}</span>
        </div>
        <div className="mt-auto space-y-2">
          <button
            onClick={handleViewDetails}
            className="w-full bg-white hover:bg-gray-50 text-orange-600 font-semibold py-2 rounded-lg border-2 border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
