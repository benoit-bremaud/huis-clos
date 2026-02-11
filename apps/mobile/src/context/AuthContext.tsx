import { AuthTokens, User } from '@velia/shared';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { authApi } from '../services/api/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tokens and user on mount
  useEffect(() => {
    async function loadAuthData() {
      try {
        const tokens = await authApi.getStoredTokens();
        if (tokens) {
          const userData = await authApi.getMe();
          setUser(userData);
        }
      } catch {
        await authApi.clearTokens();
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthData();
  }, []);

  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password });
      await authApi.storeTokens(response.tokens);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email: string, password: string, username: string): Promise<void> {
    setIsLoading(true);
    try {
      const response = await authApi.register({ email, password, username });
      await authApi.storeTokens(response.tokens);
      setUser(response.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      await authApi.clearTokens();
      setUser(null);
    }
  }

  async function refreshToken(): Promise<void> {
    const tokens = await authApi.getStoredTokens();
    if (tokens?.refreshToken) {
      const newTokens = await authApi.refresh(tokens.refreshToken);
      await authApi.storeTokens(newTokens);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
