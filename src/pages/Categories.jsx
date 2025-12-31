import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/products/ProductCard';
import { motion } from 'framer-motion';
import { productService } from '../services/api';
import { CATEGORY_CONFIG } from '../utils/constants';
import SuccessToast from '../components/common/SuccessToast';
import CategoryHeader from '../components/categories/CategoryHeader';
import CategoryNav from '../components/categories/CategoryNav';
import ProductPagination from '../components/products/ProductPagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  // Ref to track if we are currently mounting/fetching to prevent race conditions
  const abortControllerRef = useRef(null);
  
  const ITEMS_PER_PAGE = 12;

  // Fetch Categories List (Only once if possible, but due to remount in App.jsx it happens on every nav)
  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        if (mounted) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        if (mounted) {
          setLoadingCategories(false);
        }
      }
    };
    fetchCategories();
    return () => { mounted = false; };
  }, []);

  // Fetch Products
  const fetchProducts = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoadingProducts(true);
    setError(null);

    try {
      let data;
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;

      if (activeCategory === 'all') {
        data = await productService.getAllProducts(ITEMS_PER_PAGE, skip);
      } else {
        data = await productService.getProductsByCategory(activeCategory, ITEMS_PER_PAGE, skip);
      }
      
      if (controller.signal.aborted) return;

      setProducts(data.products);
      setTotalProducts(data.total);

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
  }, [activeCategory, currentPage, t]);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Fetch when dependency changes (category or page)
  useEffect(() => {
    fetchProducts();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProducts]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleCategoryClick = useCallback((slug) => {
    navigate(slug === 'all' ? '/categories' : `/categories/${slug}`);
  }, [navigate]);

  const handleNextPage = useCallback(() => {
    if (currentPage < Math.ceil(totalProducts / ITEMS_PER_PAGE)) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalProducts]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const handleAddToCart = useCallback((product) => {
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
    setAddedProduct(product);
    setShowSuccessToast(true);
  }, [user, navigate, location, addToCart]);

  if (loadingCategories) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <CategoryHeader t={t} />

        <CategoryNav 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
          t={t}
        />

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

        {/* Pagination */}
        {!loadingProducts && !error && products.length > 0 && (
          <ProductPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}

        {/* Success Toast */}
        <SuccessToast 
          show={showSuccessToast} 
          onClose={() => setShowSuccessToast(false)}
          message={t('added_to_cart')}
          subMessage={addedProduct?.title}
        />
      </div>
    </div>
  );
};
export default Categories;
