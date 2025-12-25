import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const VendorsSection = ({ brands, loading }) => {
    const { t } = useLanguage();
    return (
      <section id="vendors" className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg className="w-96 h-96 text-orange-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('our_trusted_vendors')}</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('trusted_vendors_desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-xl p-6 h-20 animate-pulse"
                ></div>
              ))
            ) : (
              brands.map((brand, index) => {
                // Array of 3D images to cycle through
                const backgroundImages = [
                  '/3d_shopping_bags.png',
                  '/3d_shopping_cart.png',
                  '/3d_credit_card.png',
                  '/3d_gift_box.png'
                ];
                
                // Select image based on index
                const bgImage = backgroundImages[index % backgroundImages.length];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 flex items-center justify-center hover:bg-orange-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 shadow-sm relative overflow-hidden group"
                  >
                    {/* 3D Background Image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                      <img 
                        src={bgImage} 
                        alt="" 
                        className="w-24 h-24 object-contain transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                      />
                    </div>
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    
                    {/* Brand Name */}
                    <span className="text-xl md:text-2xl font-bold text-gray-700 text-center relative z-10 group-hover:text-orange-600 transition-colors duration-300">{brand}</span>
                  </motion.div>
                );
              })
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden"
          >
            {/* Background pattern for CTA card */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">{t('become_vendor')}</h3>
              <p className="text-lg mb-6 text-orange-100 max-w-2xl mx-auto">
                {t('become_vendor_desc')}
              </p>
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                {t('partner_with_us')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
};

VendorsSection.propTypes = {
    brands: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default VendorsSection;
