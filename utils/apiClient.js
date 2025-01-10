import axios from 'axios';

// Use an environment variable injected at build time
const port = process.env.REACT_APP_PORT || 4000;
console.log('Using PORT:', port);

const apiClient = axios.create({
  baseURL: `http://localhost:${port}`,
  timeout: 10000,
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(
      error.response?.data?.message || error.message || 'An unexpected error occurred'
    );
  }
);

export default apiClient;