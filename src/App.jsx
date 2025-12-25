import { Suspense, lazy } from 'react'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import './App.css'
import Navbar from './components/layout/Navbar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTopButton from './components/common/ScrollToTopButton.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import Footer from './components/layout/Footer.jsx'


// Lazy load pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Categories = lazy(() => import('./pages/Categories.jsx'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar/>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        }>
          <Routes> 
            <Route path="/" element={<Home/>}/>
             <Route path="/products" element={<Products/>}/>
             <Route path="/categories" element={<Categories/>}/>
             <Route path="/categories/:category" element={<Categories/>}/>
             <Route path="/product/:id" element={<ProductDetail/>}/>
             <Route path="/cart" element={<Cart/>}/>
             <Route path="/checkout" element={<Checkout/>}/>
             <Route path="/login" element={<Login/>}/>
             <Route path="/register" element={<Register/>}/>
          </Routes>
        </Suspense>
        <ScrollToTopButton />
        <Footer/>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
