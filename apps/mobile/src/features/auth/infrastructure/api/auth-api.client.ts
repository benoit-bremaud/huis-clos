import { AuthTokens, LoginRequest, RegisterRequest, User } from '@velia/shared';
import axios, { AxiosInstance } from 'axios';

import { tokenStorage } from '../storage/token-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const refreshClient = axios.create({
  baseURL: `${API_URL}/api/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const tokens = await tokenStorage.getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401
      && !originalRequest?._retry
      && !String(originalRequest?.url || '').includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const tokens = await tokenStorage.getTokens();
        if (!tokens?.refreshToken) {
          await tokenStorage.clearTokens();
          return Promise.reject(error);
        }

        const response = await refreshClient.post<AuthTokens>('/refresh', {
          refreshToken: tokens.refreshToken,
        });

        const newTokens = response.data;
        await tokenStorage.setTokens(newTokens);

        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        await tokenStorage.clearTokens();
      }
    }

    return Promise.reject(error);
  },
);

class AuthApiClient {
  async login(data: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post('/auth/signup', data);
    return response.data;
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const response = await refreshClient.post('/refresh', { refreshToken });
    return response.data;
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }

  async getMe(): Promise<User> {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  async storeTokens(tokens: AuthTokens): Promise<void> {
    await tokenStorage.setTokens(tokens);
  }

  async getStoredTokens(): Promise<AuthTokens | null> {
    return tokenStorage.getTokens();
  }

  async clearTokens(): Promise<void> {
    await tokenStorage.clearTokens();
  }
}

export const authApiClient = new AuthApiClient();
