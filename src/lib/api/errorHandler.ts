/**
 * Error Handler Utility
 * Provides consistent error formatting for API errors
 */

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ApiError } from './types';

/**
 * Format API error from Axios error and return user-friendly message
 * This function extracts the error message but doesn't show it (for manual handling)
 */
export const formatApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Check if it's a network error
    if (!error.response) {
      return 'Network error. Please check your internet connection.';
    }

    // Get error message from response
    const apiError = error.response.data as ApiError;
    
    if (apiError?.message) {
      return apiError.message;
    }

    // Fallback to status text
    if (error.response.statusText) {
      return error.response.statusText;
    }

    // Default error messages by status code
    switch (error.response.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
};

/**
 * Show error toast notification
 * Use this to display errors to users
 */
export const showErrorToast = (error: unknown): void => {
  const message = formatApiError(error);
  toast.error(message);
};

/**
 * Show success toast notification
 */
export const showSuccessToast = (message: string): void => {
  toast.success(message);
};

/**
 * Extract validation errors from API response
 */
export const getValidationErrors = (error: unknown): Record<string, string[]> => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    if (apiError?.errors) {
      return apiError.errors;
    }
  }
  return {};
};

