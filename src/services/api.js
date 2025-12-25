import { API_BASE_URL } from '../utils/constants';

const cache = new Map();

const fetchFromApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Simple caching for GET requests
  const isGet = !options.method || options.method === 'GET';
  if (isGet && cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    const data = await response.json();
    
    if (isGet) {
      cache.set(url, data);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const productService = {
  getCategories: async () => {
    return fetchFromApi('/products/categories');
  },

  getAllProducts: async (limit = 100, skip = 0) => {
    return fetchFromApi(`/products?limit=${limit}&skip=${skip}`);
  },

  getProductsByCategory: async (category) => {
    return fetchFromApi(`/products/category/${category}`);
  },

  getProductById: async (id) => {
    return fetchFromApi(`/products/${id}`);
  },

  searchProducts: async (query) => {
    return fetchFromApi(`/products/search?q=${query}`);
  }
};
