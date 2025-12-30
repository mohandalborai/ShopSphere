import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import logger from '../utils/logger';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      logger.error('Failed to load orders from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      logger.error('Failed to save orders to localStorage:', error);
    }
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const value = useMemo(() => ({
    orders,
    addOrder,
    getOrderById
  }), [orders]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export default OrderContext;
