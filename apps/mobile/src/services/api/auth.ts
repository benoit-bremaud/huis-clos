import { AuthTokens, LoginRequest, RegisterRequest, User } from '@velia/shared';
import axios, { AxiosInstance } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

class AuthApi {
  private client: AxiosInstance;
  private tokensKey = '@velia/auth-tokens';

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api/auth`,
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

  async login(data: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.client.post('/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.client.post('/signup', data);
    return response.data;
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const response = await this.client.post('/refresh', { refreshToken });
    return response.data;
  }

  async logout(): Promise<void> {
    await this.client.post('/logout');
  }

  async getMe(): Promise<User> {
    const response = await this.client.get('/me');
    return response.data;
  }

  async storeTokens(tokens: AuthTokens): Promise<void> {
    // In a real app, use secure storage (Keychain/Keystore)
    await AsyncStorage.setItem(this.tokensKey, JSON.stringify(tokens));
  }

  async getStoredTokens(): Promise<AuthTokens | null> {
    // In a real app, use secure storage (Keychain/Keystore)
    try {
      const data = await AsyncStorage.getItem(this.tokensKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  async clearTokens(): Promise<void> {
    // In a real app, use secure storage (Keychain/Keystore)
    await AsyncStorage.removeItem(this.tokensKey);
  }
}

export const authApi = new AuthApi();
