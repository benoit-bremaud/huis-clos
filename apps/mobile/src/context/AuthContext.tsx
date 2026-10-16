import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { User } from '@huis-clos/shared';
import { useAuthHook } from '../features/auth/application/hooks/use-auth.hook';

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
  const { loadCurrentUser, login: loginAction, register: registerAction, logout: logoutAction, refreshToken: refreshTokenAction } = useAuthHook();

  useEffect(() => {
    async function loadAuthData() {
      try {
        const userData = await loadCurrentUser();
        setUser(userData);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthData();
  }, [loadCurrentUser]);

  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true);
    try {
      const result = await loginAction({ email, password });
      setUser(result.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email: string, password: string, username: string): Promise<void> {
    setIsLoading(true);
    try {
      const result = await registerAction({ email, password, username });
      setUser(result.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout(): Promise<void> {
    try {
      await logoutAction();
    } finally {
      setUser(null);
    }
  }

  async function refreshToken(): Promise<void> {
    await refreshTokenAction();
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
