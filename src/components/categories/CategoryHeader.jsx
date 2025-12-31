import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CategoryHeader = ({ t }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {t('browse_categories')}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {t('categories_subtitle')}
      </p>
    </div>
  );
};

CategoryHeader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default memo(CategoryHeader);
