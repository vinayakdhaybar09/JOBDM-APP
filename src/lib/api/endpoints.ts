/**
 * API Endpoints
 * Centralized endpoint URLs for API calls
 */

const API_BASE = '/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE}/auth/register`,
  LOGIN: `${API_BASE}/auth/login`,
  LOGOUT: `${API_BASE}/auth/logout`,
  REFRESH: `${API_BASE}/auth/refresh`,
  CHECK_EXISTING: `${API_BASE}/auth/check-existing`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
  RESEND_VERIFICATION: `${API_BASE}/auth/resend-verification`,
  CHANGE_PASSWORD: `${API_BASE}/auth/change-password`,
  GET_CURRENT_USER: `${API_BASE}/auth/me`,
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: `${API_BASE}/users/profile`,
  UPDATE_PROFILE: `${API_BASE}/users/profile`,
  PROFILE_COMPLETION: `${API_BASE}/users/profile-completion`,
  SMTP_CREDENTIALS: `${API_BASE}/users/smtp-credentials`,
  TEST_SMTP: `${API_BASE}/users/test-smtp`,
  STATS: `${API_BASE}/users/stats`,
  CHANGE_PASSWORD: `${API_BASE}/users/change-password`,
  ADD_COINS: `${API_BASE}/users/add-coins`,
  FILTER: `${API_BASE}/users/filter`,
  DELETE_ACCOUNT: `${API_BASE}/users/delete-account`,
} as const;

// Email endpoints
export const EMAIL_ENDPOINTS = {
  TEST_SMTP: `${API_BASE}/emails/test-smtp`,
  SEND_TEST: `${API_BASE}/emails/send-test`,
  LOGS: `${API_BASE}/emails/logs`,
  STATS: `${API_BASE}/emails/stats`,
} as const;

