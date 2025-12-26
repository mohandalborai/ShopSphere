import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const QuickNavigation = () => {
    const { t } = useLanguage();
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('quick_navigation')}
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('explore_sections')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger">
            {/* About Us Card */}
            <a
              href="#about"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img 
                    src="/3d_shopping_bags.png" 
                    alt="About Us" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white text-center mb-3 transition-colors duration-300">
                  {t('about_us')}
                </h3>
                <p className="text-gray-600 group-hover:text-orange-50 text-center transition-colors duration-300">
                  {t('learn_about_mission')}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </a>

            {/* Services Card */}
            <a
              href="#services"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img 
                    src="/3d_shopping_cart.png" 
                    alt="Our Services" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white text-center mb-3 transition-colors duration-300">
                  {t('our_services')}
                </h3>
                <p className="text-gray-600 group-hover:text-blue-50 text-center transition-colors duration-300">
                  {t('discover_services')}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </a>

            {/* Vendors Card */}
            <a
              href="#vendors"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img 
                    src="/3d_credit_card.png" 
                    alt="Our Vendors" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white text-center mb-3 transition-colors duration-300">
                  {t('our_trusted_vendors')}
                </h3>
                <p className="text-gray-600 group-hover:text-purple-50 text-center transition-colors duration-300">
                  {t('meet_partners')}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </a>

            {/* Products Card */}
            <Link
              to="/products"
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <img 
                    src="/3d_gift_box.png" 
                    alt="Browse Products" 
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white text-center mb-3 transition-colors duration-300">
                  {t('browse_products')}
                </h3>
                <p className="text-gray-600 group-hover:text-green-50 text-center transition-colors duration-300">
                  {t('explore_collection')}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>
    );
};

export default QuickNavigation;
