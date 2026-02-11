import { Injectable, NotFoundException } from '@nestjs/common';

export interface UserEntity {
  id: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  private readonly users: Map<string, UserEntity> = new Map();

  async create(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const id = crypto.randomUUID();
    const now = new Date();

    const user: UserEntity = {
      id,
      email: data.email,
      username: data.username,
      password: data.password,
      createdAt: now,
      updatedAt: now,
    };

    this.users.set(id, user);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.get(id) || null;
  }

  async update(
    id: string,
    data: Partial<Omit<UserEntity, 'id' | 'createdAt'>>,
  ): Promise<UserEntity> {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser: UserEntity = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new NotFoundException('User not found');
    }
    this.users.delete(id);
  }
}
