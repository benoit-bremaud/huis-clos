import axios, { AxiosInstance } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000';

export interface ProfileResponse {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  preferredLanguage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileData {
  username?: string;
  bio?: string;
  avatarUrl?: string;
  preferredLanguage?: string;
}

class ProfileApi {
  private client: AxiosInstance;
  private tokensKey = '@velia/auth-tokens';

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api/profile`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth interceptor
    this.client.interceptors.request.use(async (config) => {
      const tokens = await this.getStoredTokens();
      if (tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      return config;
    });

    // Handle token refresh on 401
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const tokens = await this.getStoredTokens();
            if (tokens?.refreshToken) {
              const newTokens = await this.refresh(tokens.refreshToken);
              await this.storeTokens(newTokens);
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              return this.client(originalRequest);
            }
          } catch {
            await this.clearTokens();
          }
        }
        return Promise.reject(error);
      },
    );
  }

  async getProfile(userId: string): Promise<ProfileResponse> {
    const response = await this.client.get(`/${userId}`);
    return response.data;
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileData,
  ): Promise<ProfileResponse> {
    const response = await this.client.put(`/${userId}`, data);
    return response.data;
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await this.client.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  async storeTokens(tokens: { accessToken: string; refreshToken: string }): Promise<void> {
    await AsyncStorage.setItem(this.tokensKey, JSON.stringify(tokens));
  }

  async getStoredTokens(): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const data = await AsyncStorage.getItem(this.tokensKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  async clearTokens(): Promise<void> {
    await AsyncStorage.removeItem(this.tokensKey);
  }
}

export const profileApi = new ProfileApi();
