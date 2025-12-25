import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ServicesSection = () => {
    const { t } = useLanguage();
    return (
      <section id="services" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('our_services')}</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('our_services_desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Free Shipping with 3D Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_shopping_bags.png" alt="Free Shipping" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('free_shipping')}</h3>
              <p className="text-gray-600 text-center">
                {t('free_shipping_desc')}
              </p>
            </motion.div>

            {/* 24/7 Support with 3D Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_shopping_cart.png" alt="24/7 Support" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('support_24_7')}</h3>
              <p className="text-gray-600 text-center">
                {t('support_24_7_desc')}
              </p>
            </motion.div>

            {/* Secure Payment with 3D Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_credit_card.png" alt="Secure Payment" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('secure_payment')}</h3>
              <p className="text-gray-600 text-center">
                {t('secure_payment_desc')}
              </p>
            </motion.div>

            {/* Easy Returns with 3D Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_gift_box.png" alt="Easy Returns" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('easy_returns')}</h3>
              <p className="text-gray-600 text-center">
                {t('easy_returns_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
};

export default ServicesSection;
