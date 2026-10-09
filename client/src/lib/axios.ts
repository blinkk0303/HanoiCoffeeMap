import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    'Content-Type': 'application/json',
  },
});

//gắn access token vào header của request nếu có
api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken; //lấy access token từ store
  console.log('interceptor:', config.url, 'accessToken =', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`; //gắn access token vào header của request
  }
  return config;
});

export default api;