import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-orange-200 tracking-widest">404</h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-3 py-1 text-sm rounded rotate-12 uppercase font-bold">
          Page Not Found
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 md:text-3xl mt-4">
        {t('page_not_found') || "Oops! We can't find that page."}
      </p>
      <p className="mt-4 text-gray-600 max-w-md">
        {t('page_not_found_desc') || "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-orange-500/30"
      >
        {t('back_to_home') || "Back to Home"}
      </Link>
    </div>
  );
};

export default NotFound;
