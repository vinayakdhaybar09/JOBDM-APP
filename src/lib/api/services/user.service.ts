/**
 * User Service
 * API calls for user profile management
 */

import apiClient from '../client';
import { USER_ENDPOINTS } from '../endpoints';
import { ApiResponse, User, UpdateProfileRequest, ProfileCompletionResponse } from '../types';

/**
 * Get current user profile
 * GET /api/users/profile
 */
export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<{ user: User }>>(
    USER_ENDPOINTS.PROFILE
  );

  if (response.data.success && response.data.data?.user) {
    return response.data.data.user;
  }

  throw new Error(response.data.message || 'Failed to get profile');
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<User> => {
  const response = await apiClient.put<ApiResponse<{ user: User }>>(
    USER_ENDPOINTS.UPDATE_PROFILE,
    data
  );

  if (response.data.success && response.data.data?.user) {
    return response.data.data.user;
  }

  throw new Error(response.data.message || 'Failed to update profile');
};

/**
 * Get profile completion status
 * GET /api/users/profile-completion
 */
export const getProfileCompletion = async (): Promise<ProfileCompletionResponse> => {
  const response = await apiClient.get<ApiResponse<ProfileCompletionResponse>>(
    USER_ENDPOINTS.PROFILE_COMPLETION
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to get profile completion');
};
