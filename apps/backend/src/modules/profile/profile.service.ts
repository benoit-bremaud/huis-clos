import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from '../users/users.service';

export interface ProfileResponse {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  preferredLanguage?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async getProfile(userId: string): Promise<ProfileResponse> {
    const actualUserId = userId === 'me' ? undefined : userId;
    const user = await this.usersService.findById(actualUserId || '');
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      preferredLanguage: user.preferredLanguage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponse> {
    const user = await this.usersService.update(userId, {
      username: updateProfileDto.username,
      avatarUrl: updateProfileDto.avatarUrl,
      bio: updateProfileDto.bio,
      preferredLanguage: updateProfileDto.preferredLanguage,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      preferredLanguage: user.preferredLanguage,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
