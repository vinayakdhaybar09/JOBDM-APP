/**
 * Auth Service
 * API calls for authentication
 */

import apiClient from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';
import { ApiResponse, LoginRequest, LoginResponse } from '../types';
import { setTokens } from '../tokenManager';

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

