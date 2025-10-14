import axios from 'axios';

// Choose the appropriate base URL for your environment:
// For production use:
const api = axios.create({ 
  baseURL: 'https://letsapp.polijrinternal.com',
  timeout: 15000, // 15 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// For local development on Android emulator use:
// const api = axios.create({ baseURL: 'http://10.0.2.2:3030' });

// For local development with ngrok use:
// const api = axios.create({ baseURL: 'https://your-ngrok-url.ngrok-free.app' });

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🔴 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('🔴 API Timeout Error:', error);
      error.message = 'Request timeout. Please check your internet connection.';
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('🔴 API Network Error:', error);
      error.message = 'Network Error. Please check your internet connection.';
    } else {
      console.error('🔴 API Error:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export { api };
