import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Server error occurred';
      throw new Error(`Server Error (${error.response.status}): ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: Unable to connect to server');
    } else {
      // Something else happened
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

// API Functions
export const fetchCryptocurrencies = async () => {
  try {
    const response = await api.get('/coins');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch cryptocurrencies:', error);
    throw error;
  }
};

export const fetchCachedCryptocurrencies = async () => {
  try {
    const response = await api.get('/coins/cached');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch cached cryptocurrencies:', error);
    throw error;
  }
};

export const storeHistorySnapshot = async () => {
  try {
    const response = await api.post('/history');
    return response.data.data;
  } catch (error) {
    console.error('Failed to store history snapshot:', error);
    throw error;
  }
};

export const fetchCoinHistory = async (coinId, days = 7) => {
  try {
    const response = await api.get(`/history/${coinId}`, {
      params: { days }
    });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch history for ${coinId}:`, error);
    throw error;
  }
};

export const fetchAllHistory = async (page = 1, limit = 50, coinId = null) => {
  try {
    const params = { page, limit };
    if (coinId) params.coinId = coinId;
    
    const response = await api.get('/history', { params });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch history:', error);
    throw error;
  }
};

// Health check
export const checkAPIHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('API health check failed:', error);
    throw error;
  }
};

export default api;