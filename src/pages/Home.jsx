import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      .catch(err => {
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

      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white animate-on-scroll">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('ready_to_shop')}</h2>
          <p className="text-xl mb-8 text-orange-100">
            {t('explore_collection')}
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {t('browse_products')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
