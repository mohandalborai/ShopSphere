import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useLanguage } from '../context/LanguageContext';

const Products = () => {
  const { products, loading, categories } = useProducts();
  const { t, isRTL } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const columns = 4; 
  const rows = 2;
  const productsPerPage = columns * rows; 

  useEffect(() => {
    if (search !== debouncedSearch) {
      setIsSearching(true);
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
        setIsSearching(false);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [search, debouncedSearch]);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">{t('loading')}</p>
        </div>
      </div>
    );
  }


  let filteredProducts = products
    .filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter(p => category === 'All' ? true : p.category === category)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);


  if (sort === 'price-asc') filteredProducts.sort((a,b)=> a.price-b.price);
  if (sort === 'price-desc') filteredProducts.sort((a,b)=> b.price-a.price);
  if (sort === 'rating-desc') filteredProducts.sort((a,b)=> b.rating-a.rating);


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  const handleAddToCart = (product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    addToCart(product);
    setAddedProduct(product);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-600">
        {t('our_products')}
      </h1>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end mb-3">

          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-gray-600 mb-1">{t('search')}</label>
            <div className="relative">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="border border-gray-300 px-3 py-2 text-sm rounded-md w-full focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none pr-10"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>

         
          <div className="w-40">
            <label className="block text-xs font-medium text-gray-600 mb-1">{t('category')}</label>
            <select
              value={category}
              onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}
              className="border border-gray-300 px-3 py-2 text-sm rounded-md w-full focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="w-48">
            <label className="block text-xs font-medium text-gray-600 mb-1">{t('sort_by')}</label>
            <select
              value={sort}
              onChange={e => { setSort(e.target.value); setCurrentPage(1); }}
              className="border border-gray-300 px-3 py-2 text-sm rounded-md w-full focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
            >
              <option value="default">{t('default')}</option>
              <option value="price-asc">{t('price_low_high')}</option>
              <option value="price-desc">{t('price_high_low')}</option>
              <option value="rating-desc">{t('rating_high_low')}</option>
            </select>
          </div>


          <div className="ml-auto">
            <span className="inline-block bg-orange-50 text-orange-600 px-3 py-2 rounded-md font-medium text-xs border border-orange-200">
              {t('product_count', { count: filteredProducts.length })}
            </span>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center gap-4">
            <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
              {t('price_range')}: ${priceRange[0].toLocaleString('en-US')} - ${priceRange[1].toLocaleString('en-US')}
            </label>
            
            <div className="flex items-center gap-3 flex-1">

              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="text"
                  value={priceRange[0].toLocaleString('en-US')}
                  onChange={e => {
                    const value = e.target.value.replace(/,/g, '');
                    const newMin = Math.max(0, parseInt(value) || 0);
                    if (newMin <= priceRange[1]) {
                      setPriceRange([newMin, priceRange[1]]);
                      setCurrentPage(1);
                    }
                  }}
                  placeholder="0"
                  className="border border-gray-300 pl-5 pr-2 py-1.5 text-sm rounded-md w-24 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="flex-1 relative px-2">
                <div className="relative h-1 bg-gray-200 rounded-full">
                  <div 
                    className="absolute h-1 bg-orange-500 rounded-full"
                    style={{
                      left: isRTL 
                        ? `${100 - (priceRange[1] / 2000) * 100}%` 
                        : `${(priceRange[0] / 2000) * 100}%`,
                      right: isRTL 
                        ? `${(priceRange[0] / 2000) * 100}%` 
                        : `${100 - (priceRange[1] / 2000) * 100}%`
                    }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[0]}
                  onChange={e => {
                    const newMin = parseInt(e.target.value);
                    if (newMin <= priceRange[1]) {
                      setPriceRange([newMin, priceRange[1]]);
                      setCurrentPage(1);
                    }
                  }}
                  className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                />
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={e => {
                    const newMax = parseInt(e.target.value);
                    if (newMax >= priceRange[0]) {
                      setPriceRange([priceRange[0], newMax]);
                      setCurrentPage(1);
                    }
                  }}
                  className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                />
              </div>

              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                <input
                  type="text"
                  value={priceRange[1].toLocaleString('en-US')}
                  onChange={e => {
                    const value = e.target.value.replace(/,/g, '');
                    const newMax = Math.min(2000, parseInt(value) || 2000);
                    if (newMax >= priceRange[0]) {
                      setPriceRange([priceRange[0], newMax]);
                      setCurrentPage(1);
                    }
                  }}
                  placeholder="2,000"
                  className="border border-gray-300 pl-5 pr-2 py-1.5 text-sm rounded-md w-24 focus:ring-1 focus:ring-orange-400 focus:border-orange-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('no_products_found')}</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            {t('no_products_desc')}
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('All');
              setPriceRange([0, 2000]);
              setSort('default');
              setCurrentPage(1);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {t('clear_filters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-5 py-2 bg-orange-400 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500 transition-shadow shadow"
        >
          {t('prev')}
        </button>
        <span className="text-gray-700 font-semibold">{t('page_info', { current: currentPage, total: totalPages })}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-5 py-2 bg-orange-400 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500 transition-shadow shadow"
        >
          {t('next')}
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login_required')}</h3>
              <p className="text-gray-600 mb-6">
                {t('login_desc')}
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-lg border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200"
                >
                  {t('register')}
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition text-sm"
                >
                  {t('continue_browsing')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && addedProduct && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-in flex items-center gap-3">
          <div className="bg-white rounded-full p-1">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-bold">{t('added_to_cart')}</p>
            <p className="text-sm text-green-100">{addedProduct.title}</p>
          </div>
          <button 
            onClick={() => setShowSuccessToast(false)}
            className="ml-4 hover:bg-green-600 rounded p-1 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
