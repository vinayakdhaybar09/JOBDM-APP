/**
 * Auth Hooks
 * React Query hooks for authentication
 */

import { useMutation } from '@tanstack/react-query';
import { login, register, logout } from '../api/services/auth.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../api/types';
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

/**
 * Register mutation hook
 * Provides isLoading, isError, error, isSuccess, mutate, mutateAsync
 */
export const useRegister = () => {
  const router = useRouter();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      showSuccessToast('Registration successful!');
      // Redirect handled in component via isSuccess state
    },
    onError: (error) => {
      // Error toast is shown automatically via showErrorToast
      showErrorToast(error);
    },
  });
};

/**
 * Logout mutation hook
 * Provides isLoading, isError, error, isSuccess, mutate, mutateAsync
 */
export const useLogout = () => {
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      showSuccessToast('Logged out successfully');
      router.push('/login');
    },
    onError: (error) => {
      // Even on error, redirect to login since tokens are removed
      showErrorToast(error);
      router.push('/login');
    },
  });
};

