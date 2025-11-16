/**
 * Auth Service
 * API calls for authentication
 */

import apiClient from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types';
import { setTokens, removeTokens } from '../tokenManager';

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.LOGIN,
    credentials
  );

  if (response.data.success && response.data.data) {
    // Store tokens in localStorage
    const { tokens } = response.data.data;
    setTokens(tokens.accessToken, tokens.refreshToken);
    
    return response.data.data;
  }

  throw new Error(response.data.message || 'Login failed');
};

/**
 * Register user
 * POST /api/auth/register
 */
export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<ApiResponse<RegisterResponse>>(
    AUTH_ENDPOINTS.REGISTER,
    userData
  );

  if (response.data.success && response.data.data) {
    // Store tokens in localStorage
    const { tokens } = response.data.data;
    setTokens(tokens.accessToken, tokens.refreshToken);
    
    return response.data.data;
  }

  throw new Error(response.data.message || 'Registration failed');
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT);
  } catch (error) {
    // Even if API call fails, remove tokens locally
    console.error('Logout API call failed:', error);
  } finally {
    // Always remove tokens from localStorage
    removeTokens();
  }
};

