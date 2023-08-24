import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcryptjs';
import { serialize } from 'cookie';

import { PrismaService } from '../db/prisma.service';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
  WRONG_REFRESH_TOKEN_ERROR,
} from './auth.constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import RequestWithUser from './interfaces/request-with-user.interface';
import ITokenPayload from './interfaces/token-payload.interface';
import { SessionsService } from '../sessions/sessions.service';
import { IRefreshTokenCookie } from './interfaces/refresh-token-cookie.interface';
import { AccessTokenResponse } from './response/access-token.response';
import { LoginResponse } from './response/login.response';
import { UserResponse } from '../users/response/users.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionsService,
    private readonly configService: ConfigService,
  ) {}

  public async registration(createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.create(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersService.findUserByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { id: user.id, email: user.email, role: user.role };
  }

  async login(req: RequestWithUser): Promise<LoginResponse> {
    const payload: ITokenPayload = { email: req.user.email };

    const accessToken = this.getAccessToken(payload);

    const { refreshToken, refreshTokenCookie } =
      this.getCookieWithJwtRefreshToken(payload);

    await this.sessionService.upsertSession(req.user.id, refreshToken);

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return {
      accessToken,
      user: req.user,
    };
  }

  private getAccessToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  private getCookieWithJwtRefreshToken(
    payload: ITokenPayload,
  ): IRefreshTokenCookie {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const refreshTokenCookie = serialize('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    return { refreshToken, refreshTokenCookie };
  }

  async refresh(req: RequestWithUser): Promise<AccessTokenResponse> {
    const payload: ITokenPayload = { email: req.user.email };

    const accessToken = this.getAccessToken(payload);

    const { refreshToken, refreshTokenCookie } =
      this.getCookieWithJwtRefreshToken(payload);

    await this.sessionService.upsertSession(req.user.id, refreshToken);

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return { accessToken };
  }

  async getUserIfRefreshTokenMatches(email: string, refreshToken: string) {
    const user = await this.usersService.findUserByEmail(email);

    const refreshTokenFromDB = await this.sessionService.findRefreshToken(
      user.id,
    );

    if (refreshToken !== refreshTokenFromDB) {
      throw new ForbiddenException(WRONG_REFRESH_TOKEN_ERROR);
    }
    return user;
  }
}
