import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import RequestWithUser from './interfaces/request-with-user.interface';
import { RefreshAuthGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    return await this.authService.registration(createUserDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: RequestWithUser) {
    return await this.authService.login(req);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: RequestWithUser) {
    return this.authService.refresh(req);
  }
}
