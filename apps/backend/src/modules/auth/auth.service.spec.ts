import * as bcrypt from 'bcrypt';

import { ConflictException, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const mockBcryptHash = bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;
const mockBcryptCompare = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>;

describe('AuthService', () => {
  let authService: AuthService;

  const usersServiceMock = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  } as unknown as UsersService;

  const jwtServiceMock = {
    sign: jest.fn(),
    verify: jest.fn(),
  } as unknown as JwtService;

  const makeUserEntity = () => ({
    id: 'user-1',
    email: 'john@velia.app',
    username: 'john',
    password: 'hashed-password',
    avatarUrl: undefined,
    bio: undefined,
    preferredLanguage: 'fr',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(usersServiceMock, jwtServiceMock);
  });

  describe('register', () => {
    it('should create user and return mapped user + tokens', async () => {
      const dto: RegisterDto = {
        email: 'john@velia.app',
        username: 'john',
        password: 'password123',
      };

      usersServiceMock.findByEmail = jest.fn().mockResolvedValue(null);
      usersServiceMock.create = jest.fn().mockResolvedValue(makeUserEntity());
      mockBcryptHash.mockResolvedValue('hashed-password' as never);
      jwtServiceMock.sign = jest
        .fn()
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await authService.register(dto);

      expect(usersServiceMock.create).toHaveBeenCalledWith({
        email: dto.email,
        username: dto.username,
        password: 'hashed-password',
      });
      expect(result.user).toMatchObject({
        id: 'user-1',
        email: dto.email,
        username: dto.username,
      });
      expect(result.tokens).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 900,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      const dto: RegisterDto = {
        email: 'john@velia.app',
        username: 'john',
        password: 'password123',
      };

      usersServiceMock.findByEmail = jest.fn().mockResolvedValue(makeUserEntity());

      await expect(authService.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return mapped user + tokens when credentials are valid', async () => {
      const dto: LoginDto = { email: 'john@velia.app', password: 'password123' };

      usersServiceMock.findByEmail = jest.fn().mockResolvedValue(makeUserEntity());
      mockBcryptCompare.mockResolvedValue(true as never);
      jwtServiceMock.sign = jest
        .fn()
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await authService.login(dto);

      expect(result.user.email).toBe(dto.email);
      expect(result.tokens.accessToken).toBe('access-token');
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      const dto: LoginDto = { email: 'nobody@velia.app', password: 'password123' };
      usersServiceMock.findByEmail = jest.fn().mockResolvedValue(null);

      await expect(authService.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const dto: LoginDto = { email: 'john@velia.app', password: 'bad-password' };

      usersServiceMock.findByEmail = jest.fn().mockResolvedValue(makeUserEntity());
      mockBcryptCompare.mockResolvedValue(false as never);

      await expect(authService.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshTokens', () => {
    it('should generate fresh tokens for a valid refresh token', async () => {
      jwtServiceMock.verify = jest.fn().mockReturnValue({ sub: 'user-1' });
      usersServiceMock.findById = jest.fn().mockResolvedValue(makeUserEntity());
      jwtServiceMock.sign = jest
        .fn()
        .mockReturnValueOnce('new-access-token')
        .mockReturnValueOnce('new-refresh-token');

      const result = await authService.refreshTokens('valid-refresh-token');

      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 900,
      });
    });

    it('should throw UnauthorizedException for invalid refresh token', async () => {
      jwtServiceMock.verify = jest.fn().mockImplementation(() => {
        throw new Error('invalid token');
      });

      await expect(authService.refreshTokens('invalid')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getCurrentUser', () => {
    it('should return mapped user when user exists', async () => {
      usersServiceMock.findById = jest.fn().mockResolvedValue(makeUserEntity());

      const result = await authService.getCurrentUser('user-1');

      expect(result).toMatchObject({
        id: 'user-1',
        email: 'john@velia.app',
        username: 'john',
      });
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      usersServiceMock.findById = jest.fn().mockResolvedValue(null);

      await expect(authService.getCurrentUser('missing')).rejects.toThrow(UnauthorizedException);
    });
  });
});
