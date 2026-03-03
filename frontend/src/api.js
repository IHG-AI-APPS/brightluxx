import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = (params) => api.get('/api/products', { params });
export const getProduct = (slug) => api.get(`/api/products/${slug}`);
export const getProductCategories = () => api.get('/api/products/categories');
export const compareProducts = (productCodes) => api.post('/api/products/compare', productCodes);

// Calculator
export const calculateScreenSize = (data) => api.post('/api/calculator/screen-size', data);

// Inspirations
export const getInspirations = (params) => api.get('/api/inspirations', { params });

// Projects
export const getProjects = (params) => api.get('/api/projects', { params });
export const getProject = (slug) => api.get(`/api/projects/${slug}`);

// Leads
export const createLead = (data) => api.post('/api/leads', data);

// Search
export const search = (query) => api.get('/api/search', { params: { q: query } });

export default api;
