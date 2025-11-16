/**
 * Authentication Utility Functions
 * Common functions for checking authentication status
 */

import { getAccessToken } from '../api/tokenManager';

/**
 * Check if user has an access token in localStorage
 * This is a quick check - doesn't verify token validity
 * @returns true if access token exists, false otherwise
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = getAccessToken();
  return token !== null && token !== '';
};

/**
 * Check if user is authenticated (has valid token)
 * This is a synchronous check that only verifies token existence
 * For actual token validation, use the useAuthCheck hook which calls the API
 */
export const hasAuthToken = (): boolean => {
  return isAuthenticated();
};

