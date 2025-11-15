/**
 * Axios Client Configuration
 * Centralized HTTP client with interceptors for token management
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getAccessToken, getRefreshToken, setTokens, removeTokens } from './tokenManager';
import { AUTH_ENDPOINTS } from './endpoints';
import { ApiResponse, TokenResponse } from './types';
import { showErrorToast } from './errorHandler';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor: Add JWT token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle token refresh and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // List of public endpoints that don't require authentication
    // These should NOT trigger token refresh logic
    const publicEndpoints = [
      AUTH_ENDPOINTS.LOGIN,
      AUTH_ENDPOINTS.REGISTER,
      AUTH_ENDPOINTS.CHECK_EXISTING,
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      AUTH_ENDPOINTS.RESET_PASSWORD,
      AUTH_ENDPOINTS.VERIFY_EMAIL,
      AUTH_ENDPOINTS.REFRESH, // Refresh endpoint itself shouldn't trigger refresh
    ];

    // Check if this is a public endpoint
    const isPublicEndpoint = originalRequest.url && 
      publicEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));

    // Handle 401 Unauthorized - try to refresh token
    // BUT: Skip token refresh for public endpoints (login, register, etc.)
    if (error.response?.status === 401 && !originalRequest._retry && !isPublicEndpoint) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          // No refresh token, remove tokens and redirect to login
          removeTokens();
          showErrorToast('Session expired. Please login again.');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        const response = await axios.post<ApiResponse<{ tokens: TokenResponse }>>(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${AUTH_ENDPOINTS.REFRESH}`,
          { refreshToken }
        );

        if (response.data.success && response.data.data?.tokens) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.data.tokens;
          
          // Store new tokens
          setTokens(accessToken, newRefreshToken);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, remove tokens and redirect to login
        removeTokens();
        showErrorToast('Session expired. Please login again.');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

