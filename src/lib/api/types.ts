/**
 * API Type Definitions
 * TypeScript interfaces for API requests and responses
 */

// Common API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// API Error structure
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// User types (matching backend)
export type UserType = 'hr' | 'employee' | 'company' | 'admin';
export type AuthStatus = 'authorized' | 'unauthorized';
export type Gender = 'male' | 'female' | 'other';

// User interface (simplified for frontend)
export interface User {
  _id: string;
  fullName: string;
  email: string;
  contactNo?: string;
  gender?: Gender;
  type: UserType;
  authStatus: AuthStatus;
  profileCompletion: number;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Token Response
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

// Login Request
export interface LoginRequest {
  email: string;
  password: string;
}

// Login Response
export interface LoginResponse {
  user: User;
  tokens: TokenResponse;
}

// Register Request
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  type: 'hr' | 'employee' | 'company';
  contactNo?: string;
  gender?: Gender;
}

// Register Response
export interface RegisterResponse {
  user: User;
  tokens: TokenResponse;
}

