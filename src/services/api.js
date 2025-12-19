import { API_BASE_URL } from '../utils/constants';

const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
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
