import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// AUTH
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  }
};

// EDITAIS
export const editaisAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/editais', { params });
    return response.data;
  },
  
  getBySlug: async (slug) => {
    const response = await api.get(`/editais/${slug}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/editais', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/editais/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/editais/${id}`);
    return response.data;
  }
};

// PARCEIROS
export const parceirosAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/parceiros', { params });
    return response.data;
  },
  
  getBySlug: async (slug) => {
    const response = await api.get(`/parceiros/${slug}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/parceiros', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/parceiros/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/parceiros/${id}`);
    return response.data;
  }
};

// PLANILHAS
export const planilhasAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/planilhas', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/planilhas/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/planilhas', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/planilhas/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/planilhas/${id}`);
    return response.data;
  },
  
  addColuna: async (id, data) => {
    const response = await api.post(`/planilhas/${id}/colunas`, data);
    return response.data;
  },
  
  addLinha: async (id) => {
    const response = await api.post(`/planilhas/${id}/linhas`);
    return response.data;
  },
  
  updateCelula: async (celulaId, data) => {
    const response = await api.put(`/planilhas/celulas/${celulaId}`, data);
    return response.data;
  }
};

// MEDIA
export const mediaAPI = {
  upload: async (file, metadata = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    const response = await api.post('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  getAll: async (params = {}) => {
    const response = await api.get('/media', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/media/${id}`);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  }
};

// STARTUPS
export const startupsAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/startups', { params });
    return response.data;
  },
  
  getBySlug: async (slug) => {
    const response = await api.get(`/startups/${slug}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/startups', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/startups/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/startups/${id}`);
    return response.data;
  }
};

export default api;
