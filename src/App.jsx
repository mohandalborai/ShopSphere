import { Suspense, lazy } from 'react'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import './App.css'
import Navbar from './components/layout/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTopButton from './components/common/ScrollToTopButton.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import Footer from './components/layout/Footer.jsx';

// Lazy load pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Categories = lazy(() => import('./pages/Categories.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const OrderHistory = lazy(() => import('./pages/OrderHistory.jsx'));

function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Navbar/>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
        </div>
      }>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Routes location={location} key={location.pathname}> 
              <Route path="/" element={<Home/>}/>
               <Route path="/products" element={<Products/>}/>
               <Route path="/categories" element={<Categories/>}/>
               <Route path="/categories/:category" element={<Categories/>}/>
               <Route path="/product/:id" element={<ProductDetail/>}/>
               <Route path="/cart" element={<Cart/>}/>
               <Route path="/checkout" element={<Checkout/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route path="/wishlist" element={<Wishlist/>}/>
               <Route path="/orders" element={<OrderHistory/>}/>
               <Route path="*" element={<NotFound/>}/>
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
      <ScrollToTopButton />
      <Footer/>
    </ErrorBoundary>
  )
}

export default App
