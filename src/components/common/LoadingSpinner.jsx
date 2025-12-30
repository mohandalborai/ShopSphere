import React from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';

/**
 * LoadingSpinner Component
 * 
 * Displays a loading spinner with customizable size and color.
 * Can be displayed full screen or inline.
 * 
 * @param {Object} props - Component props
 * @param {boolean} [props.fullScreen=false] - Whether to show the spinner full screen
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Size of the spinner
 * @param {'orange'|'blue'|'white'} [props.color='orange'] - Color theme of the spinner
 */
const LoadingSpinner = ({ fullScreen = false, size = 'medium', color = 'orange' }) => {
  const { t } = useLanguage();

  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
  };

  const colorClasses = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    white: 'border-white',
  };

  const spinner = (
    <div className="text-center">
      <div 
        className={`inline-block animate-spin rounded-full border-t-4 border-b-4 ${colorClasses[color]} ${sizeClasses[size]}`}
      ></div>
      <p className={`mt-4 text-xl font-semibold ${fullScreen ? 'text-gray-700' : ''}`}>
        {t('loading')}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

LoadingSpinner.propTypes = {
  fullScreen: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['orange', 'blue', 'white']),
};

export default LoadingSpinner;
