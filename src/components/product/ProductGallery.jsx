import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProductGallery = ({ images, title, selectedImage, setSelectedImage, discountPercentage, stock }) => {
  return (
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
            src={images[selectedImage]}
            alt={title}
            className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full font-bold text-xs shadow-lg"
          >
            -{discountPercentage.toFixed(0)}%
          </motion.div>
        )}

        {/* Stock Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full font-bold text-xs shadow-lg ${
            stock > 50 
              ? 'bg-green-500 text-white' 
              : stock > 0 
              ? 'bg-yellow-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {stock > 50 ? 'In Stock' : stock > 0 ? `Only ${stock} left` : 'Out of Stock'}
          </span>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
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
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-contain p-2"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  selectedImage: PropTypes.number.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
  discountPercentage: PropTypes.number,
  stock: PropTypes.number.isRequired,
};

export default ProductGallery;
