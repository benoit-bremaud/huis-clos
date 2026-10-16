import * as bcrypt from 'bcrypt';

import { AuthTokens, User } from '@huis-clos/shared';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../users/users.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: User; tokens: AuthTokens }> {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.username,
      password: hashedPassword,
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user: this.toSharedUser(user), tokens };
  }

  async login(loginDto: LoginDto): Promise<{ user: User; tokens: AuthTokens }> {
    // Find user
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user: this.toSharedUser(user), tokens };
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || `${process.env.JWT_SECRET}-refresh`,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getCurrentUser(userId: string): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.toSharedUser(user);
  }

  async logout(userId: string): Promise<void> {
    // In a real app, you would invalidate the refresh token
    // For now, we just return success
    void userId;
    return Promise.resolve();
  }

  private toSharedUser(user: UserEntity): User {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  private async generateTokens(user: Pick<UserEntity, 'id' | 'email' | 'username'>): Promise<AuthTokens> {
    const payload = { sub: user.id, email: user.email, username: user.username };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || `${process.env.JWT_SECRET}-refresh`,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN || '900', 10), // 15 minutes default
    };
  }
}
