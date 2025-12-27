import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ProductSlider from '../components/home/ProductSlider';
import HeroSection from '../components/home/HeroSection';
import QuickNavigation from '../components/home/QuickNavigation';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import VendorsSection from '../components/home/VendorsSection';
import { productService } from '../services/api';

const Home = () => {
  const { t } = useLanguage();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAllProducts()
      .then(data => {
        const uniqueBrands = [...new Set(data.products.map(product => product.brand).filter(Boolean))];
        setBrands(uniqueBrands.slice(0, 6)); 
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.animate-on-scroll, .animate-fade-left, .animate-fade-right, .animate-scale, .animate-stagger');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [brands]);

  return (
    <div className="min-h-screen bg-gray-50 ">
   
      <HeroSection />

      {/* 3D Navigation Section */}
      <QuickNavigation />

      {/* Product Slider Section */}
      <ProductSlider />

      <AboutSection />

      <ServicesSection />

      <VendorsSection brands={brands} loading={loading} />

      <section className="py-24 relative overflow-hidden">
        {/* Background 3D blobs for the section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-400 opacity-20 blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-400 opacity-20 blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-4"
        >
          <div className="relative bg-white/40 backdrop-blur-xl rounded-[40px] p-12 md:p-20 text-center shadow-[0_20px_50px_rgba(255,165,0,0.2)] border border-white/40 [transform-style:preserve-3d] [perspective:1000px]">
            {/* Inner Glow and Depth */}
            <div className="absolute inset-0 rounded-[40px] shadow-inner opacity-40 pointer-events-none border-2 border-white/20" />
            
            <div className="relative z-10 [transform:translateZ(30px)]">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-gray-900 bg-clip-text text-transparent">
                {t('ready_to_shop')}
              </h2>
              <p className="text-xl mb-10 text-gray-700 max-w-2xl mx-auto font-medium">
                {t('explore_collection')}
              </p>
              
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-lg font-bold text-white rounded-2xl group bg-gradient-to-br from-orange-400 to-pink-500 group-hover:from-orange-500 group-hover:to-pink-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(255,100,0,0.4)] transform hover:-translate-y-1"
              >
                <span className="relative px-12 py-5 transition-all ease-in duration-75 bg-orange-600 dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0">
                  {t('browse_products')}
                </span>
                
                {/* 3D Reflection Effect on button hover */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </div>
            
            {/* Floating 3D Icon Decorations */}
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 hidden md:block"
            >
              <img src="/3d_gift_box.png" alt="" className="w-full h-full object-contain [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.1))]"/>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 -left-10 w-24 h-24 hidden md:block"
            >
              <img src="/3d_shopping_bags.png" alt="" className="w-full h-full object-contain [filter:drop-shadow(0_10px_20px_rgba(0,0,0,0.1))]"/>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
