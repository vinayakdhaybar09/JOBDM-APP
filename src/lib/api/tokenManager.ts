/**
 * Token Management Utility
 * Handles JWT token storage and retrieval from localStorage
 * 
 * Security Note: localStorage is used for JWT tokens which is a common practice for SPAs.
 * While httpOnly cookies are more secure, localStorage works well with JWT tokens and
 * is acceptable when combined with:
 * - HTTPS in production
 * - Short-lived access tokens
 * - Refresh token rotation
 * - Proper XSS protection
 * 
 * See TOKEN_STORAGE_SECURITY.md for detailed explanation and alternatives.
 */

const ACCESS_TOKEN_KEY = 'jobdm_access_token';
const REFRESH_TOKEN_KEY = 'jobdm_refresh_token';

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Set access token in localStorage
 */
export const setAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set refresh token in localStorage
 */
export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Remove all tokens from localStorage
 */
export const removeTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Set both access and refresh tokens
 */
export const setTokens = (accessToken: string, refreshToken: string): void => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

