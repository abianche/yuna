import { Test, TestingModule } from '@nestjs/testing';
import type { Response, Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create user and set cookie', async () => {
      const signupDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = {
        user: {
          id: 'user-id',
          email: signupDto.email,
          name: signupDto.name,
        },
        token: 'jwt-token',
      };

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockAuthService.signup.mockResolvedValue(result);

      const response = await controller.signup(signupDto, mockResponse);

      expect(mockAuthService.signup).toHaveBeenCalledWith(signupDto);
      expect(mockResponse.cookie).toHaveBeenCalledWith('session', result.token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
      });
      expect(response).toEqual({ user: result.user });
    });
  });

  describe('login', () => {
    it('should authenticate user and set cookie', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = {
        user: {
          id: 'user-id',
          email: loginDto.email,
          name: 'Test User',
        },
        token: 'jwt-token',
      };

      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      mockAuthService.login.mockResolvedValue(result);

      const response = await controller.login(loginDto, mockResponse);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(mockResponse.cookie).toHaveBeenCalledWith('session', result.token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
      });
      expect(response).toEqual({ user: result.user });
    });
  });

  describe('logout', () => {
    it('should clear cookie', () => {
      const mockResponse = {
        clearCookie: jest.fn(),
      } as unknown as Response;

      const response = controller.logout(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('session');
      expect(response).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('me', () => {
    it('should return current user', () => {
      const user = {
        id: 'user-id',
        email: 'test@example.com',
        name: 'Test User',
      };

      const mockRequest = {
        user,
      } as Request & { user: { id: string; email: string; name: string } };

      const response = controller.me(mockRequest);

      expect(response).toEqual({ user });
    });
  });
});
