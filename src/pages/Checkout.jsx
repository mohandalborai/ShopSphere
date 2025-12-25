import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    

    
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
   
    

    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
  
    
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    
    if (!formData.firstName.trim()) newErrors.firstName = t('required_field');
    if (!formData.lastName.trim()) newErrors.lastName = t('required_field');
    if (!formData.email.trim()) {
      newErrors.email = t('required_field');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('invalid_email');
    }
    if (!formData.phone.trim()) newErrors.phone = t('required_field');


    
    if (!formData.address.trim()) newErrors.address = t('required_field');
    if (!formData.city.trim()) newErrors.city = t('required_field');
    if (!formData.state.trim()) newErrors.state = t('required_field');
    if (!formData.zipCode.trim()) newErrors.zipCode = t('required_field');
    if (!formData.country.trim()) newErrors.country = t('required_field');

   
    
    // Luhn Algorithm for basic credit card validation
    const luhnCheck = (val) => {
        let checksum = 0; 
        let j = 1; 
        for (let i = val.length - 1; i >= 0; i--) {
          let calc = 0;
          calc = Number(val.charAt(i)) * j;
          if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
          }
          checksum = checksum + calc;
          if (j == 1) {j = 2} else {j = 1};
        }
        return (checksum % 10) == 0;
    };

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = t('required_field');
    } else {
        const cleanNum = formData.cardNumber.replace(/\s/g, '');
        if (cleanNum.length < 13 || cleanNum.length > 19) {
             newErrors.cardNumber = t('card_length_error');
        } else if (!luhnCheck(cleanNum)) {
             newErrors.cardNumber = 'Invalid card number';
        }
    }

    if (!formData.cardName.trim()) newErrors.cardName = t('required_field');
    
    if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = t('required_field');
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid format (MM/YY)';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = t('required_field');
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = t('cvv_length_error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setProcessing(true);
      
      // Simulate API call
      setTimeout(() => {
        // Clear cart and redirect
        // In a real app, we would handle the server response here
        clearCart();
        // Replacing alert with a more subtle notification would be better, 
        // using the existing Toast system if globally available, for now keeping simple redirection
        navigate('/', { state: { message: 'Order placed successfully!' } });
      }, 2000);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{t('cart_empty')}</h2>
          <p className="mt-2 text-gray-600">{t('add_products_msg')}</p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {t('continue_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const shipping = 0; 
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('checkout')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              errors={errors}
              processing={processing}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
