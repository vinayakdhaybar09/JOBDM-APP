/**
 * Auth Service
 * API calls for authentication
 */

import apiClient from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, VerifyOTPRequest, VerifyOTPResponse, User } from '../types';
import { setTokens, removeTokens } from '../tokenManager';

/**
 * Login user
 * POST /api/auth/login
 * Note: Tokens are only stored if user's email is verified
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.LOGIN,
    credentials
  );

  if (response.data.success && response.data.data) {
    const { tokens, user } = response.data.data;
    
    // Only store tokens if email is verified
    // If not verified, user must verify OTP first
    if (user.isEmailVerified) {
      setTokens(tokens.accessToken, tokens.refreshToken);
    }
    // If not verified, tokens are returned but not stored
    // They will be stored after OTP verification
    
    return response.data.data;
  }

  throw new Error(response.data.message || 'Login failed');
};

/**
 * Register user
 * POST /api/auth/register
 * Note: Does not return tokens - user must verify OTP first
 */
export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiClient.post<ApiResponse<RegisterResponse>>(
    AUTH_ENDPOINTS.REGISTER,
    userData
  );

  if (response.data.success && response.data.data) {
    // Do NOT store tokens - they will be returned after OTP verification
    return response.data.data;
  }

  throw new Error(response.data.message || 'Registration failed');
};

/**
 * Verify OTP
 * POST /api/auth/verify-otp
 */
export const verifyOTP = async (otpData: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
  const response = await apiClient.post<ApiResponse<VerifyOTPResponse>>(
    AUTH_ENDPOINTS.VERIFY_OTP,
    otpData
  );

  if (response.data.success && response.data.data) {
    // Store tokens in localStorage after successful OTP verification
    const { tokens } = response.data.data;
    setTokens(tokens.accessToken, tokens.refreshToken);
    
    return response.data.data;
  }

  throw new Error(response.data.message || 'OTP verification failed');
};

/**
 * Resend OTP
 * POST /api/auth/resend-otp
 */
export const resendOTP = async (email: string): Promise<void> => {
  const response = await apiClient.post<ApiResponse<void>>(
    AUTH_ENDPOINTS.RESEND_OTP,
    { email }
  );

  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to resend OTP');
  }
};

/**
 * Get current authenticated user
 * GET /api/auth/me
 * Note: This endpoint requires authentication (Bearer token in header)
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<{ user: User }>>(
    AUTH_ENDPOINTS.GET_CURRENT_USER
  );

  if (response.data.success && response.data.data?.user) {
    return response.data.data.user;
  }

  throw new Error(response.data.message || 'Failed to get current user');
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

