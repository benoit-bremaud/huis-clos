import { apiClient } from '../../features/auth/infrastructure/api/auth-api.client';

export interface ProfileResponse {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  preferredLanguage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  username?: string;
  bio?: string;
  avatarUrl?: string;
  preferredLanguage?: string;
}

class ProfileApi {
  async getProfile(userId: string): Promise<ProfileResponse> {
    const response = await apiClient.get(`/profile/${userId}`);
    return response.data;
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileData,
  ): Promise<ProfileResponse> {
    const response = await apiClient.put(`/profile/${userId}`, data);
    return response.data;
  }
}

export const profileApi = new ProfileApi();
