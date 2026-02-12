import { User } from '@velia/shared';
import { UserModel } from '../../domain/models/user.model';

export function mapUserToModel(user: User): UserModel {
  return user;
}
