// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 403 (profile incomplete)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 403 with profile_incomplete flag
    if (error.response?.status === 403 && error.response?.data?.profile_incomplete) {
      // Only redirect if we're not already on profile-setup page
      if (window.location.pathname !== '/student/profile-setup') {
        window.location.href = '/student/profile-setup';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
