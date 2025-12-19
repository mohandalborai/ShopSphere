import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ProductSlider from '../components/home/ProductSlider';
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
        console.error(err);
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
   

      <section  className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 py-19 sm:py-19.5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate__bounceInDown animate__animated animate__slow animate__delay-1s   ">
         

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

          

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-5xl p-6 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/shopping_hero_banner_1763932114007.png"
                  alt="Online Shopping Experience"
                  className="w-full h-auto rounded-lg"
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
              </div>
            </div>
          </div>
        </div>

      

        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-30 -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-700 rounded-full blur-3xl opacity-20 -z-0"></div>
      </section>

      {/* 3D Navigation Section */}
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
                  {t('browse_products') || 'Browse Products'}
                </h3>
                <p className="text-gray-600 group-hover:text-green-50 text-center transition-colors duration-300">
                  {t('explore_collection') || 'Explore our full collection'}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Slider Section */}
      <ProductSlider />

      <section id="about" className="py-20 bg-white animate-fade-left">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about_us')}</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about_us_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-stagger">
         

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('our_mission')}</h3>
              <p className="text-gray-700 text-center">
                {t('our_mission_desc')}
              </p>
            </div>


            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('our_vision')}</h3>
              <p className="text-gray-700 text-center">
                {t('our_vision_desc')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('our_values')}</h3>
              <p className="text-gray-700 text-center">
                {t('our_values_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="services" className="py-20 bg-gray-100 animate-fade-right">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('our_services')}</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('our_services_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
            
            {/* Free Shipping with 3D Image */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_shopping_bags.png" alt="Free Shipping" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('free_shipping')}</h3>
              <p className="text-gray-600 text-center">
                {t('free_shipping_desc')}
              </p>
            </div>

            {/* 24/7 Support with 3D Image */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_shopping_cart.png" alt="24/7 Support" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('support_24_7')}</h3>
              <p className="text-gray-600 text-center">
                {t('support_24_7_desc')}
              </p>
            </div>

            {/* Secure Payment with 3D Image */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_credit_card.png" alt="Secure Payment" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('secure_payment')}</h3>
              <p className="text-gray-600 text-center">
                {t('secure_payment_desc')}
              </p>
            </div>

            {/* Easy Returns with 3D Image */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-24 h-24 mb-4 mx-auto">
                <img src="/3d_gift_box.png" alt="Easy Returns" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{t('easy_returns')}</h3>
              <p className="text-gray-600 text-center">
                {t('easy_returns_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="vendors" className="py-20 bg-white relative overflow-hidden animate-scale">
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('our_trusted_vendors')}</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('trusted_vendors_desc')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 animate-stagger">
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
                  <div
                    key={index}
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
                  </div>
                );
              })
            )}
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
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
          </div>
        </div>
      </section>

    
    
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
