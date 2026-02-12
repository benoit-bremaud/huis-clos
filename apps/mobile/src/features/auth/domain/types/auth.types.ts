import { AuthTokens } from '@velia/shared';
import { UserModel } from '../models/user.model';

export interface AuthResult {
  user: UserModel;
  tokens: AuthTokens;
}

export interface AuthSession {
  user: UserModel | null;
  isLoading: boolean;
}
