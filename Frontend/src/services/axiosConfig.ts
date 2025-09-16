import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Configuration
const ANALYTICS_BASE_URL = process.env.REACT_APP_ANALYTICS_BASE_URL || 'https://f5le0z2f39.execute-api.us-east-1.amazonaws.com/dev/analytics';
const INGEST_BASE_URL = process.env.REACT_APP_INGEST_BASE_URL || 'https://f5le0z2f39.execute-api.us-east-1.amazonaws.com/dev';
const ANALYTICS_API_KEY = process.env.REACT_APP_ANALYTICS_API_KEY || '3M9yMIH8FCYUF7ATzgg7mIlkFOsRiB46KiExY450';
const INGEST_API_KEY = process.env.REACT_APP_INGEST_API_KEY || 'FYCbauyxRO6UGZREyB77c9BXie6csqDR3FgtjljM';

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
