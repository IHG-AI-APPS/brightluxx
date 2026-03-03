import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTechnologies = (params) => api.get('/api/technologies', { params });
export const getTechnology = (slug) => api.get(`/api/technologies/${slug}`);

export const getApplications = (params) => api.get('/api/applications', { params });
export const getApplication = (slug) => api.get(`/api/applications/${slug}`);

export const getCaseStudies = (params) => api.get('/api/case-studies', { params });
export const getCaseStudy = (slug) => api.get(`/api/case-studies/${slug}`);

export const getUpdates = (params) => api.get('/api/updates', { params });
export const getUpdate = (slug) => api.get(`/api/updates/${slug}`);

export const getResources = () => api.get('/api/resources');

export const createLead = (data) => api.post('/api/leads', data);

export const search = (query) => api.get('/api/search', { params: { q: query } });

export default api;