import { AuthResult } from '../../domain/types/auth.types';
import { LoginRequest } from '@velia/shared';
import { authApiClient } from '../../infrastructure/api/auth-api.client';
import { mapUserToModel } from '../../infrastructure/mappers/user.mapper';

export async function loginUseCase(data: LoginRequest): Promise<AuthResult> {
  const result = await authApiClient.login(data);

  await authApiClient.storeTokens(result.tokens);

  return {
    user: mapUserToModel(result.user),
    tokens: result.tokens,
  };
}
