import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import ProductPagination from '../components/products/ProductPagination';
import LoginModal from '../components/common/LoginModal';
import SuccessToast from '../components/common/SuccessToast';
import { useProducts } from '../hooks/useProducts';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Products = () => {
  const { products, loading: productsLoading, categories } = useProducts();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
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

  // Optimize search with debounce
  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    let result = products
      .filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter(p => category === 'All' ? true : p.category === category)
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sort === 'price-asc') result.sort((a,b)=> a.price-b.price);
    else if (sort === 'price-desc') result.sort((a,b)=> b.price-a.price);
    else if (sort === 'rating-desc') result.sort((a,b)=> b.rating-a.rating);

    return result;
  }, [products, debouncedSearch, category, priceRange, sort]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Memoize current products slice
  const currentProducts = useMemo(() => 
    filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
    [filteredProducts, indexOfFirstProduct, indexOfLastProduct]
  );

  // Memoize handlers
  const handleNext = useCallback(() => setCurrentPage(prev => Math.min(prev + 1, totalPages)), [totalPages]);
  const handlePrev = useCallback(() => setCurrentPage(prev => Math.max(prev - 1, 1)), []);
  
  const handleAddToCart = useCallback((product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    addToCart(product);
    setAddedProduct(product);
    setShowSuccessToast(true);
  }, [user, addToCart]);

  if (productsLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-600">
        {t('our_products')}
      </h1>

      <ProductFilters 
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
        productCount={filteredProducts.length}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setCurrentPage={setCurrentPage}
      />

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

      <ProductPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Success Toast */}
      <SuccessToast 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)}
        message={t('added_to_cart')}
        subMessage={addedProduct?.title}
      />
    </div>
  );
};

export default Products;
