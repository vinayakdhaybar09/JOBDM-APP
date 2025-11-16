/**
 * Authentication Check Hook
 * React hook for checking authentication status using React Query
 */

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/services/auth.service';
import { User } from '../api/types';
import { isAuthenticated } from '../utils/auth';

interface UseAuthCheckReturn {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Hook to check if user is authenticated
 * Calls /api/auth/me to verify token validity
 * Returns authentication status and user data
 */
export const useAuthCheck = (): UseAuthCheckReturn => {
  const hasToken = isAuthenticated();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: hasToken, // Only run query if token exists
    retry: false, // Don't retry on 401 errors
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });

  // If no token, user is not authenticated
  if (!hasToken) {
    return {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  return {
    isAuthenticated: !!user && !isError,
    user: user || null,
    isLoading,
    isError,
    error: error || null,
  };
};

