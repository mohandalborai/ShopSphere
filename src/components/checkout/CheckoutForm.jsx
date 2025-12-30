import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/**
 * CheckoutForm Component
 * 
 * Renders the checkout form with personal, shipping, and payment information sections.
 * Optimized with React.memo.
 * 
 * @param {Object} props
 * @param {Object} props.formData - Form data state
 * @param {Function} props.handleInputChange - Handler for input changes
 * @param {Function} props.handleSubmit - Handler for form submission
 * @param {Object} props.errors - Validation errors object
 * @param {boolean} props.processing - Processing state flag
 */
const CheckoutForm = memo(({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  errors, 
  processing 
}) => {
  const { t } = useLanguage();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('personal_info')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('first_name')} *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-sm text-red-500" role="alert">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('last_name')} *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-sm text-red-500" role="alert">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')} *
            </label>
            <input
              type="email"
              id="checkout-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
               aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "checkout-email-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p id="checkout-email-error" className="mt-1 text-sm text-red-500" role="alert">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
               aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('shipping_address')}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('street_address')} *
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123 Main Street, Apt 4B"
            />
            {errors.address && (
              <p id="address-error" className="mt-1 text-sm text-red-500" role="alert">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                {t('city')} *
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "city-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="New York"
              />
              {errors.city && (
                <p id="city-error" className="mt-1 text-sm text-red-500" role="alert">{errors.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                {t('state')} *
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? "state-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="NY"
              />
              {errors.state && (
                <p id="state-error" className="mt-1 text-sm text-red-500" role="alert">{errors.state}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                {t('zip_code')} *
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                aria-invalid={!!errors.zipCode}
                aria-describedby={errors.zipCode ? "zipCode-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10001"
              />
              {errors.zipCode && (
                <p id="zipCode-error" className="mt-1 text-sm text-red-500" role="alert">{errors.zipCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                {t('country')} *
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? "country-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="United States"
              />
              {errors.country && (
                <p id="country-error" className="mt-1 text-sm text-red-500" role="alert">{errors.country}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('payment_info')}</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {t('card_number')} *
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              aria-invalid={!!errors.cardNumber}
              aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            {errors.cardNumber && (
              <p id="cardNumber-error" className="mt-1 text-sm text-red-500" role="alert">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('cardholder_name')} *
            </label>
            <input
              type="text"
              name="cardName"
              id="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              aria-invalid={!!errors.cardName}
              aria-describedby={errors.cardName ? "cardName-error" : undefined}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.cardName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.cardName && (
              <p id="cardName-error" className="mt-1 text-sm text-red-500" role="alert">{errors.cardName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                {t('expiry_date')} *
              </label>
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                aria-invalid={!!errors.expiryDate}
                aria-describedby={errors.expiryDate ? "expiryDate-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && (
                <p id="expiryDate-error" className="mt-1 text-sm text-red-500" role="alert">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                {t('cvv')} *
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                aria-invalid={!!errors.cvv}
                aria-describedby={errors.cvv ? "cvv-error" : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && (
                <p id="cvv-error" className="mt-1 text-sm text-red-500" role="alert">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('order_notes')}</h2>
        <textarea
          name="orderNotes"
          id="orderNotes"
          value={formData.orderNotes}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder={t('order_notes_placeholder')}
          aria-label={t('order_notes')}
        ></textarea>
      </div>

      <div className="flex gap-4">
        <Link
          to="/cart"
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-center transition-colors duration-300"
        >
          {t('back_to_cart')}
        </Link>
        <button
          type="submit"
          disabled={processing}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? t('processing') : t('place_order')}
        </button>
      </div>
    </form>
  );
});

CheckoutForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default CheckoutForm;
