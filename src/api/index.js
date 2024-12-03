import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "./services/auth";

const authToken = localStorage.getItem('X-AUTH-TOKEN');

const apiURL = 'https://apiadm.nextfit.com.br/api/'

const api = axios.create({
    baseURL: apiURL, 
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${authToken}`,
    },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('X-AUTH-TOKEN');
  if (isTokenExpired(token)) {
    try {
      const response = await refreshToken();
      token = response.data.access_token;
      localStorage.setItem('X-AUTH-TOKEN', token);
    } catch (error) {
      localStorage.removeItem('X-AUTH-TOKEN');
      localStorage.removeItem('X-REFRESH-TOKEN');
      window.location.href = '/';  
      return Promise.reject(error);
    }
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    console.log('JSON retornado pela API:', response.data); 
    return response;
  },  
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await refreshToken();
        const { access_token } = response.data;
        localStorage.setItem('X-AUTH-TOKEN', access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem('X-AUTH-TOKEN');
        localStorage.removeItem('X-REFRESH-TOKEN');
        window.location.href = '/';  
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
  

export const logout = () => {
    localStorage.removeItem('X-AUTH-TOKEN');
    localStorage.removeItem('X-REFRESH-TOKEN');
};

export default api;

