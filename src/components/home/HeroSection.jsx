import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = () => {
    const { t } = useLanguage();
    return (
      <section  className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 py-19 sm:py-19.5">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="text-center lg:text-left z-10 ">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight ">
                {t('welcome_to_shopsphere')}
              </h1>
              <p className="text-xl sm:text-2xl mb-8 text-orange-100">
                {t('global_shopping_destination')}
              </p>
              <p className="text-lg mb-8 text-orange-50">
                {t('discover_amazing_products')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {t('shop_now')}
                </Link>
                <a
                  href="#about"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-lg transition-all duration-300"
                >
                  {t('learn_more')}
                </a>
              </div>
            </div>

            <motion.div 
              className="relative [perspective:1000px]"
              whileHover={{ rotateX: 5, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div 
                className="bg-white rounded-3xl shadow-5xl p-6 [transform-style:preserve-3d]"
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/shopping_hero_banner_1763932114007.png"
                  alt={t('hero_alt')}
                  className="w-full h-auto rounded-lg drop-shadow-2xl translate-z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-12 h-64">
                        <svg class="w-32 h-32 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      </div>`;
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive 3D Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-orange-700/10 rounded-full blur-[120px]"
          />
          
          {/* Floating 3D Elements */}
          <motion.div
            animate={{ y: [0, -40, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg shadow-2xl [transform:rotateX(45deg)_rotateY(45deg)]"
          />
          <motion.div
            animate={{ y: [0, 60, 0], rotate: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-orange-300/30 backdrop-blur-md rounded-full shadow-2xl"
          />
        </div>
      </section>
    );
};

export default HeroSection;
