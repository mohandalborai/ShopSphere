import React from 'react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const { orders } = useOrders();
  const { t } = useLanguage();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-blue-100 p-6 rounded-full inline-block mb-4">
             <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
             </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('no_orders')}</h2>
          <p className="text-gray-600 mb-8">{t('no_orders_desc')}</p>
          <Link 
            to="/products" 
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-xl"
          >
            {t('start_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('my_orders')}</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div>
                   <p className="text-sm text-gray-500">{t('order_id')}</p>
                   <p className="font-bold text-gray-900">{order.id}</p>
                </div>
                <div>
                   <p className="text-sm text-gray-500">{t('date')}</p>
                   <p className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                   <p className="text-sm text-gray-500">{t('order_total')}</p>
                   <p className="font-bold text-orange-600">${order.total?.toFixed(2)}</p>
                </div>
                <div>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                     ${order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : ''}
                     ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : ''}
                   `}>
                     {/* Try to translate status, fallback to English */}
                     {t(`order_status_${order.status?.toLowerCase()}`) || order.status}
                   </span>
                </div>
              </div>
              
              <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-4">{t('items')}:</h4>
                  <div className="space-y-4">
                      {order.items?.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{item.title}</h5>
                                  <p className="text-gray-500 text-sm">{t('qty')} {item.quantity}</p>
                              </div>
                              <p className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
