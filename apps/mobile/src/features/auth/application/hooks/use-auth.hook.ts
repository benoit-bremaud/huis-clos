import { useCallback, useMemo } from 'react';

import { UserModel } from '../../domain/models/user.model';
import { authApiClient } from '../../infrastructure/api/auth-api.client';
import { loginUseCase } from '../use-cases/login.use-case';
import { logoutUseCase } from '../use-cases/logout.use-case';
import { mapUserToModel } from '../../infrastructure/mappers/user.mapper';
import { refreshTokenUseCase } from '../use-cases/refresh-token.use-case';
import { registerUseCase } from '../use-cases/register.use-case';

export function useAuthHook() {
  const loadCurrentUser = useCallback(async (): Promise<UserModel | null> => {
    try {
      const tokens = await authApiClient.getStoredTokens();
      if (!tokens) {
        return null;
      }

      const user = await authApiClient.getMe();
      return mapUserToModel(user);
    } catch {
      await authApiClient.clearTokens();
      return null;
    }
  }, []);

  return useMemo(
    () => ({
      loadCurrentUser,
      login: loginUseCase,
      register: registerUseCase,
      logout: logoutUseCase,
      refreshToken: refreshTokenUseCase,
    }),
    [loadCurrentUser],
  );
}
