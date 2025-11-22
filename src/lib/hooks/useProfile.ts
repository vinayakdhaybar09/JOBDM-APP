/**
 * Profile Hooks
 * React Query hooks for user profile management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile, getProfileCompletion } from '../api/services/user.service';
import { User, UpdateProfileRequest, ProfileCompletionResponse } from '../api/types';
import { showErrorToast, showSuccessToast } from '../api/errorHandler';
import { useRouter } from 'next/navigation';

/**
 * Hook to fetch user profile
 * Provides user data, loading state, and error handling
 */
export const useProfile = () => {
  return useQuery<User, Error>({
    queryKey: ['userProfile'],
    queryFn: getProfile,
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to update user profile
 * Provides mutation function with automatic cache invalidation
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<User, Error, UpdateProfileRequest>({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profileCompletion'] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] }); // Also invalidate auth user
      showSuccessToast('Profile updated successfully!');
      router.push('/dashboard/profile');
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

/**
 * Hook to fetch profile completion status
 * Provides completion percentage and breakdown
 */
export const useProfileCompletion = () => {
  return useQuery<ProfileCompletionResponse, Error>({
    queryKey: ['profileCompletion'],
    queryFn: getProfileCompletion,
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    refetchOnWindowFocus: false,
  });
};
