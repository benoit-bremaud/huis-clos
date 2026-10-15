import { AuthResult } from '../../domain/types/auth.types';
import { RegisterRequest } from '@huis-clos/shared';
import { authApiClient } from '../../infrastructure/api/auth-api.client';
import { mapUserToModel } from '../../infrastructure/mappers/user.mapper';

export async function registerUseCase(data: RegisterRequest): Promise<AuthResult> {
  const result = await authApiClient.register(data);

  await authApiClient.storeTokens(result.tokens);

  return {
    user: mapUserToModel(result.user),
    tokens: result.tokens,
  };
}
