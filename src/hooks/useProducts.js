import { useState, useEffect } from 'react';
import { productService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    productService.getAllProducts()
      .then(data => {
        setProducts(data.products);
        const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, categories, error };
};
