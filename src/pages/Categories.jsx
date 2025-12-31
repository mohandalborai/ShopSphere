import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/products/ProductCard';
import { motion } from 'framer-motion';
import { productService } from '../services/api';
import { CATEGORY_CONFIG } from '../utils/constants';

const Categories = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Use the URL parameter as the source of truth
  const activeCategory = category || 'all';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  // Ref to track if we are currently mounting/fetching to prevent race conditions
  const abortControllerRef = useRef(null);
  
  const ITEMS_PER_PAGE = 12;

  // Fetch Categories List (Only once if possible, but due to remount in App.jsx it happens on every nav)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
        // Don't block UI if categories fail, just show empty list
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products when activeCategory changes
  const fetchProducts = useCallback(async (isLoadMore = false, currentSkip = 0) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoadingProducts(true);
    setError(null);

    try {
      let data;
      const skip = isLoadMore ? currentSkip : 0;
      
      // Log for debugging
      // console.log(`Fetching products for ${activeCategory}, skip: ${skip}`);

      if (activeCategory === 'all') {
        data = await productService.getAllProducts(ITEMS_PER_PAGE, skip);
      } else {
        data = await productService.getProductsByCategory(activeCategory, ITEMS_PER_PAGE, skip);
      }
      
      if (controller.signal.aborted) return;

      if (isLoadMore) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
      
      // Check if we have more products to load
      const totalLoaded = skip + data.products.length;
      setHasMore(totalLoaded < data.total);

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error fetching products:", err);
        setError(t('failed_load_products'));
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingProducts(false);
      }
    }
  }, [activeCategory, t]);

  // Initial fetch when category changes
  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    fetchProducts(false, 0);
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProducts]);

  const handleCategoryClick = (slug) => {
    navigate(slug === 'all' ? '/categories' : `/categories/${slug}`);
  };

  const handleLoadMore = () => {
    if (!loadingProducts && hasMore) {
      fetchProducts(true, products.length);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: location,
          message: 'login_desc'
        } 
      });
      return;
    }
    addToCart(product);
    alert(t('added_to_cart'));
  };

  if (loadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('browse_categories')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('categories_subtitle')}
          </p>
        </div>

        {/* Categories Navigation */}
        <div className="mb-10 sticky top-20 z-10 bg-gray-50/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:mx-0 sm:px-0 transition-all duration-300">
          <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar sm:flex-wrap sm:justify-center px-2">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-orange-500 text-white shadow-orange-200 ring-2 ring-orange-300 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-orange-500 border border-gray-200'
              }`}
            >
              <span>🛍️</span>
              {t('all_products')}
            </button>
            
            {categories.map((cat) => {
              const config = CATEGORY_CONFIG[cat.slug] || {};
              const icon = config.icon || '📦';
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 ${
                    activeCategory === cat.slug
                      ? 'bg-orange-500 text-white shadow-orange-200 ring-2 ring-orange-300 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-orange-500 border border-gray-200'
                  }`}
                >
                  <span>{icon}</span>
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 && !loadingProducts && !error ? (
           <div className="text-center py-20">
             <p className="text-gray-500 text-xl">{t('no_products_category')}</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                categoryIcon={CATEGORY_CONFIG[product.category]?.icon || '📦'}
              />
            ))}
            
            {/* Skeletons for loading state (appended or initial) */}
            {loadingProducts && (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-xl shadow-md p-4 animate-pulse h-[400px]">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="mt-auto h-10 bg-gray-200 rounded"></div>
                </div>
              ))
            )}
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              {t('retry')}
            </button>
          </div>
        )}

        {/* Load More Button (Lazy Load) */}
        {!loadingProducts && hasMore && products.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              {t('load_more') || 'Load More Products'}
            </button>
          </div>
        )}
        
        {!hasMore && products.length > 0 && (
          <p className="text-center text-gray-500 mt-12 italic">
            {t('no_more_products') || 'You have reached the end of the list'}
          </p>
        )}

      </div>
    </div>
  );
};
export default Categories;
