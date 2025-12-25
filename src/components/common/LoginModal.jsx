import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('login_required')}</h3>
          <p className="text-gray-600 mb-6">
            {t('login_desc')}
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
            >
              {t('login')}
            </button>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-lg border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200"
            >
              {t('register')}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition text-sm"
            >
              {t('continue_browsing')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoginModal;
