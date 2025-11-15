/**
 * Auth Hooks
 * React Query hooks for authentication
 */

import { useMutation } from '@tanstack/react-query';
import { login } from '../api/services/auth.service';
import { LoginRequest, LoginResponse } from '../api/types';
import { showErrorToast, showSuccessToast } from '../api/errorHandler';
import { useRouter } from 'next/navigation';

/**
 * Login mutation hook
 * Provides isLoading, isError, error, isSuccess, mutate, mutateAsync
 */
export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      showSuccessToast('Login successful!');
      // Redirect handled in component via isSuccess state
    },
    onError: (error) => {
      // Error toast is shown automatically via showErrorToast
      showErrorToast(error);
    },
  });
};

