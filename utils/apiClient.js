import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
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
