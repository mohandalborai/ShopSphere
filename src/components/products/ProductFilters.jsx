import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';

const ProductFilters = memo(({
  search,
  setSearch,
  isSearching,
  category,
  setCategory,
  sort,
  setSort,
  categories,
  productCount,
  priceRange,
  setPriceRange,
  setCurrentPage
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap gap-3 items-end mb-3">
        {/* Search */}
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

        {/* Category */}
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

        {/* Sort */}
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

        {/* Count */}
        <div className="ml-auto">
          <span className="inline-block bg-orange-50 text-orange-600 px-3 py-2 rounded-md font-medium text-xs border border-orange-200">
            {t('product_count', { count: productCount })}
          </span>
        </div>
      </div>

      {/* Price Range */}
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
                className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
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
                className="absolute top-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
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
  );
});

ProductFilters.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  category: PropTypes.string,
  setCategory: PropTypes.func,
  sort: PropTypes.string,
  setSort: PropTypes.func,
  categories: PropTypes.array,
  productCount: PropTypes.number,
  priceRange: PropTypes.array,
  setPriceRange: PropTypes.func,
  setCurrentPage: PropTypes.func
};

export default ProductFilters;
