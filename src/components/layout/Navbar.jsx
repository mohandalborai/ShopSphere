import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getCartCount, clearCart } = useCart();
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const cartCount = getCartCount();

  return (
    <nav className="bg-orange-500/90 backdrop-blur-md text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-18 py-2">

          <motion.div
            whileHover={{ perspective: 1000, rotateY: 15, rotateX: -10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="[transform-style:preserve-3d]"
          >
            <Link to="/" className="flex items-center gap-2 hover:opacity-95 transition pl-2">
              <img src="/shopsphere_logo.png" alt="ShopSphere" className="h-14 w-14 drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)] [transform:translateZ(20px)]" />
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent [transform:translateZ(10px)]">ShopSphere</span>
            </Link>
          </motion.div>

       
          <div className="hidden md:flex gap-8 text-lg pr-2 items-center">

            
            <Link to="/" className="hover:text-orange-200 transition">{t('home')}</Link>
            <Link to="/products" className="hover:text-orange-200 transition">{t('products')}</Link>
            <Link to="/categories" className="hover:text-orange-200 transition">{t('categories') }</Link>
            
            
            {/* Wishlist Link */}
            <Link to="/wishlist" className="hover:text-orange-200 transition relative" title={t('wishlist')}>
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </Link>

            <Link to="/cart" className="hover:text-orange-200 transition flex items-center gap-2 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {t('cart')}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Toggle Desktop */}
            <button 
              onClick={toggleLanguage}
              className="hover:text-orange-800 transition font-semibold border border-white/20 px-2 py-0.5 rounded uppercase text-sm"
              aria-label="Toggle language"
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="bg-white text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg font-semibold transition shadow-md hover:shadow-lg flex items-center gap-2"
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user.name}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    <Link 
                      to="/orders" 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition flex items-center gap-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                       </svg>
                       {t('my_orders')}
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        clearCart();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('logout')}
                    </button>
                    
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-orange-500 hover:bg-orange-50 p-2 rounded-full font-semibold transition shadow-md hover:shadow-lg"
                title="Profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
          </div>

        
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-orange-600 px-6 pb-4">
          <Link to="/" className="block py-2 hover:text-orange-200 transition">{t('home')}</Link>
          <Link to="/products" className="block py-2 hover:text-orange-200 transition">{t('products')}</Link>
          <Link to="/categories" className="block py-2 hover:text-orange-200 transition">{t('categories') || 'Categories'}</Link>
          
          {/* Language Toggle Mobile */}
          <button 
            onClick={toggleLanguage}
            className="block w-full text-left py-2 hover:text-orange-200 transition font-semibold"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <Link to="/cart" className=" py-2 hover:text-orange-200 transition flex items-center gap-2 relative" aria-label={t('cart')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            {t('cart')}
            {cartCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="border-t border-orange-500 pt-2 mt-2">
              <div className="px-2 py-2">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-orange-100">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  logout();
                  clearCart();
                  setIsOpen(false);
                }}
                className="w-full text-left px-2 py-2 hover:text-orange-200 transition flex items-center gap-2 font-semibold text-red-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {t('logout')}
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 py-2 hover:text-orange-200 transition font-semibold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t('profile')}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
