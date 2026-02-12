import { authApiClient } from '../../infrastructure/api/auth-api.client';

export async function logoutUseCase(): Promise<void> {
  try {
    await authApiClient.logout();
  } finally {
    await authApiClient.clearTokens();
  }
}
