import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CATEGORY_CONFIG } from '../../utils/constants';

const CategoryNav = ({ categories, activeCategory, onCategoryClick, t }) => {
  return (
    <div className="mb-10 sticky top-20 z-10 bg-gray-50/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:mx-0 sm:px-0 transition-all duration-300">
      <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar sm:flex-wrap sm:justify-center px-2">
        <button
          onClick={() => onCategoryClick('all')}
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
              onClick={() => onCategoryClick(cat.slug)}
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
  );
};

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(CategoryNav);
