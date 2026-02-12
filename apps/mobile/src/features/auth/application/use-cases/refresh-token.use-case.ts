import { AuthTokens } from '@velia/shared';
import { authApiClient } from '../../infrastructure/api/auth-api.client';

export async function refreshTokenUseCase(): Promise<AuthTokens | null> {
  const tokens = await authApiClient.getStoredTokens();
  if (!tokens?.refreshToken) {
    return null;
  }

  const newTokens = await authApiClient.refresh(tokens.refreshToken);
  await authApiClient.storeTokens(newTokens);

  return newTokens;
}
