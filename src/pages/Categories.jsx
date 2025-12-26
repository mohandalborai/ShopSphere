import React, { useState, useEffect } from 'react';
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

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(t('failed_load_categories'));
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setError(null);
      try {
        let data;
        if (selectedCategory === 'all') {
          data = await productService.getAllProducts();
        } else {
          data = await productService.getProductsByCategory(selectedCategory);
        }
        setProducts(data.products);
        setCurrentPage(1);
      } catch (err) {
        setError(t('failed_load_products'));
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    navigate(slug === 'all' ? '/categories' : `/categories/${slug}`);
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

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
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

        {/* Categories Navigation - Horizontal Scroll */}
        <div className="mb-10 sticky top-20 z-10 bg-gray-50/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:mx-0 sm:px-0 transition-all duration-300">
          <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar sm:flex-wrap sm:justify-center px-2">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 ${
                selectedCategory === 'all'
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
                    selectedCategory === cat.slug
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
        {loadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse h-[400px]">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="mt-auto h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              {t('retry')}
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">{t('no_products_category')}</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  categoryIcon={CATEGORY_CONFIG[product.category]?.icon || '📦'}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {products.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('prev') || 'Previous'}
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? 'bg-orange-500 text-white font-bold'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('next') || 'Next'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Categories;
