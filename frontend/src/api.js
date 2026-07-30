import axios from 'axios';
import { getRecaptchaToken } from './utils/recaptcha';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

if (!API_BASE_URL) {
  console.error('REACT_APP_BACKEND_URL is not defined');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add reCAPTCHA token to POST requests
api.interceptors.request.use(async (config) => {
  if (config.method === 'post') {
    const token = await getRecaptchaToken('submit');
    if (token) config.headers['X-Recaptcha-Token'] = token;
  }
  return config;
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
