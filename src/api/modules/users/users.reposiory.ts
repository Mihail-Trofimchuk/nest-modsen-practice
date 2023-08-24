import { Injectable } from '@nestjs/common';
import { $Enums, User } from '@prisma/client';

import { PrismaService } from '../db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/users.response';

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(
    createUsersDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<UserResponse> {
    return await this.db.user.create({
      data: {
        ...createUsersDto,
        role: $Enums.Role.USER,
        password: hashedPassword,
      },
    });
  }

  public async findUserByEmail(email: string): Promise<UserResponse> {
    return await this.db.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  public async findUserByEmailWithPassword(email: string): Promise<User> {
    return await this.db.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
