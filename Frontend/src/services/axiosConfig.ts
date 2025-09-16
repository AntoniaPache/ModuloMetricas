import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Configuration - Environment variables only
const ANALYTICS_BASE_URL = process.env.REACT_APP_ANALYTICS_BASE_URL;
const INGEST_BASE_URL = process.env.REACT_APP_INGEST_BASE_URL;
const ANALYTICS_API_KEY = process.env.REACT_APP_ANALYTICS_API_KEY;
const INGEST_API_KEY = process.env.REACT_APP_INGEST_API_KEY;

// Debug environment variables in development
if (process.env.NODE_ENV === 'development') {
  console.log('Environment variables loaded:', {
    ANALYTICS_BASE_URL: ANALYTICS_BASE_URL ? '✓ Loaded' : '✗ Missing',
    INGEST_BASE_URL: INGEST_BASE_URL ? '✓ Loaded' : '✗ Missing',
    ANALYTICS_API_KEY: ANALYTICS_API_KEY ? '✓ Loaded' : '✗ Missing',
    INGEST_API_KEY: INGEST_API_KEY ? '✓ Loaded' : '✗ Missing',
  });
}

// Validate required environment variables
if (!ANALYTICS_BASE_URL || !INGEST_BASE_URL || !ANALYTICS_API_KEY || !INGEST_API_KEY) {
  const missingVars = [];
  if (!ANALYTICS_BASE_URL) missingVars.push('REACT_APP_ANALYTICS_BASE_URL');
  if (!INGEST_BASE_URL) missingVars.push('REACT_APP_INGEST_BASE_URL');
  if (!ANALYTICS_API_KEY) missingVars.push('REACT_APP_ANALYTICS_API_KEY');
  if (!INGEST_API_KEY) missingVars.push('REACT_APP_INGEST_API_KEY');
  
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please check your .env file and restart the development server.`);
}

// Create Analytics API instance
const analyticsApi: AxiosInstance = axios.create({
  baseURL: ANALYTICS_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': ANALYTICS_API_KEY,
  },
});

// Create Ingest API instance
const ingestApi: AxiosInstance = axios.create({
  baseURL: INGEST_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': INGEST_API_KEY,
  },
});

// Request interceptor for Analytics API
analyticsApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Request interceptor for Ingest API
ingestApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log events for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Ingesting event:', config.data);
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for both APIs
const responseInterceptor = (response: AxiosResponse) => {
  // Log successful responses in development
  if (process.env.NODE_ENV === 'development') {
    console.log('API Response:', response.config.url, response.data);
  }
  return response;
};

const errorInterceptor = (error: any) => {
  // Enhanced error logging
  console.error('API Error:', {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    message: error.message,
    data: error.response?.data,
  });
  
  // Transform error for consistent handling
  const transformedError = {
    message: error.response?.data?.message || error.message || 'An error occurred',
    status: error.response?.status,
    data: error.response?.data,
  };
  
  return Promise.reject(transformedError);
};

// Apply interceptors
analyticsApi.interceptors.response.use(responseInterceptor, errorInterceptor);
ingestApi.interceptors.response.use(responseInterceptor, errorInterceptor);

// Generic API request wrapper
export const apiRequest = async <T>(
  apiInstance: AxiosInstance,
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiInstance.request<T>(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export API instances for direct use
export { analyticsApi, ingestApi };
