import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const startupsAPI = {
  getAll: (params) => api.get('/startups', { params }),
  getBySlug: (slug) => api.get(`/startups/${slug}`),
};

export const editaisAPI = {
  getAll: (params) => api.get('/editais', { params }),
  getBySlug: (slug) => api.get(`/editais/${slug}`),
};

export const parceirosAPI = {
  getAll: () => api.get('/parceiros'),
  getBySlug: (slug) => api.get(`/parceiros/${slug}`),
};

export default api;
