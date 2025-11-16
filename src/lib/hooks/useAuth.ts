/**
 * Auth Hooks
 * React Query hooks for authentication
 */

import { useMutation } from '@tanstack/react-query';
import { login, register, logout, verifyOTP, resendOTP } from '../api/services/auth.service';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, VerifyOTPRequest, VerifyOTPResponse } from '../api/types';
import { showErrorToast, showSuccessToast } from '../api/errorHandler';
import { useRouter } from 'next/navigation';

/**
 * Login mutation hook
 * Provides isLoading, isError, error, isSuccess, mutate, mutateAsync
 * Note: Does not redirect automatically - component handles redirect based on email verification
 */
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.user.isEmailVerified) {
        showSuccessToast('Login successful!');
        // Redirect will be handled by component
      } else {
        showSuccessToast('Please verify your email to continue.');
        // Component will show OTP screen
      }
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
 * Note: Does not redirect automatically - component should show OTP screen
 */
export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      showSuccessToast('Registration successful! Please check your email for the verification code.');
      // Do NOT redirect - component will handle showing OTP screen
    },
    onError: (error) => {
      // Error toast is shown automatically via showErrorToast
      showErrorToast(error);
    },
  });
};

/**
 * Verify OTP mutation hook
 * Provides isLoading, isError, error, isSuccess, mutate, mutateAsync
 */
export const useVerifyOTP = () => {
  const router = useRouter();

  return useMutation<VerifyOTPResponse, Error, VerifyOTPRequest>({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      showSuccessToast('Email verified successfully!');
      // Redirect to dashboard after successful verification
      router.push('/dashboard');
    },
    onError: (error) => {
      // Error toast is shown automatically via showErrorToast
      showErrorToast(error);
    },
  });
};

/**
 * Resend OTP mutation hook
 * Provides isLoading, isError, error, isSuccess, mutate, mutateAsync
 */
export const useResendOTP = () => {
  return useMutation<void, Error, string>({
    mutationFn: resendOTP,
    onSuccess: () => {
      showSuccessToast('OTP sent successfully! Please check your email.');
    },
    onError: (error) => {
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

