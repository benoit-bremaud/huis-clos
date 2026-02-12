import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens } from '@velia/shared';

const TOKENS_KEY = '@velia/auth-tokens';

export const tokenStorage = {
  async setTokens(tokens: AuthTokens): Promise<void> {
    await AsyncStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  },

  async getTokens(): Promise<AuthTokens | null> {
    try {
      const raw = await AsyncStorage.getItem(TOKENS_KEY);
      return raw ? (JSON.parse(raw) as AuthTokens) : null;
    } catch {
      return null;
    }
  },

  async clearTokens(): Promise<void> {
    await AsyncStorage.removeItem(TOKENS_KEY);
  },
};
