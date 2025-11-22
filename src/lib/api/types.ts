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

// SMTP Credentials interface
export interface SmtpCredentials {
  email?: string;
  appPasswordEncrypted?: string;
}

// Job Preferences interface
export interface Preferences {
  industry?: string;
  jobRoles?: string[];
  cities?: string[];
  skills?: string[];
  experience?: number;
}

// Work Experience interface
export interface WorkExperience {
  companyName: string;
  yourCompanyEmail: string;
  hrEmail: string;
}

// Subscription interface
export interface Subscription {
  coins: number;
  plan?: string;
}

// Technical Info (frontend-specific structure)
export interface TechnicalInfo {
  roleLookingFor?: string;
  skills?: string[];
  totalExperience?: number;
}

// Professional Info (frontend-specific structure)
export interface ProfessionalInfo {
  currentCompany?: string;
  companyEmail?: string;
  linkedIn?: string;
  portfolio?: string;
  resumeLink?: string;
}

// User interface (extended with all profile fields)
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
  smtpCredentials?: SmtpCredentials;
  linkedInUrl?: string;
  resumeUrl?: string;
  preferences?: Preferences;
  workExperience?: WorkExperience[];
  subscription?: Subscription;
  // Frontend-specific fields (derived from backend data)
  technicalInfo?: TechnicalInfo;
  professionalInfo?: ProfessionalInfo;
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

// Register Response (without tokens - OTP verification required)
export interface RegisterResponse {
  user: User;
}

// Verify OTP Request
export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

// Verify OTP Response
export interface VerifyOTPResponse {
  user: User;
  tokens: TokenResponse;
}

// Update Profile Request (matching backend UpdateUserDto)
export interface UpdateProfileRequest {
  fullName?: string;
  contactNo?: string;
  gender?: Gender;
  linkedInUrl?: string;
  resumeUrl?: string;
  preferences?: Partial<Preferences>;
  workExperience?: WorkExperience[];
}

// Profile Completion Response
export interface ProfileCompletionResponse {
  profileCompletion: number;
  completionBreakdown: {
    basicInfo: {
      fullName: boolean;
      email: boolean;
      contactNo: boolean;
      gender: boolean;
    };
    professionalInfo: {
      linkedInUrl: boolean;
      resumeUrl: boolean;
      workExperience: boolean;
    };
    preferences: {
      industry: boolean;
      jobRoles: boolean;
      cities: boolean;
      skills: boolean;
    };
    smtpCredentials: boolean;
  };
}

