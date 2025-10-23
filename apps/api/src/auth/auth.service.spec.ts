import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user and return token', async () => {
      const signupDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const hashedPassword = 'hashedPassword123';
      const createdUser = {
        id: 'user-id',
        email: signupDto.email,
        name: signupDto.name,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = 'jwt-token';

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(createdUser);
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.signup(signupDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: signupDto.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(signupDto.password, 10);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: signupDto.email,
          password: hashedPassword,
          name: signupDto.name,
        },
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: createdUser.id,
        email: createdUser.email,
      });
      expect(result).toEqual({
        user: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
        },
        token,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      const signupDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'existing-user-id',
        email: signupDto.email,
      });

      await expect(service.signup(signupDto)).rejects.toThrow(ConflictException);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: signupDto.email },
      });
      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should authenticate user and return token', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: 'user-id',
        email: loginDto.email,
        password: 'hashedPassword123',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = 'jwt-token';

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.login(loginDto);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.password);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
      });
      expect(result).toEqual({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const user = {
        id: 'user-id',
        email: loginDto.email,
        password: 'hashedPassword123',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, user.password);
    });
  });

  describe('validateUser', () => {
    it('should return user if found', async () => {
      const userId = 'user-id';
      const user = {
        id: userId,
        email: 'test@example.com',
        password: 'hashedPassword123',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.validateUser(userId);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });

    it('should return null if user not found', async () => {
      const userId = 'non-existent-user-id';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser(userId);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(result).toBeNull();
    });
  });
});
