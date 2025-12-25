import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';

const ProductPagination = memo(({ currentPage, totalPages, onNext, onPrev }) => {
  const { t } = useLanguage();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-5 py-2 bg-orange-400 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500 transition-shadow shadow"
      >
        {t('prev')}
      </button>
      <span className="text-gray-700 font-semibold">{t('page_info', { current: currentPage, total: totalPages })}</span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-5 py-2 bg-orange-400 text-white rounded-lg disabled:opacity-50 hover:bg-orange-500 transition-shadow shadow"
      >
        {t('next')}
      </button>
    </div>
  );
});

ProductPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
};

export default ProductPagination;
