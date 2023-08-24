import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { genSalt, hash } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.reposiory';
import { ALREADY_REGISTERED_ERROR } from './users.constants';
import { UserResponse } from './response/users.response';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const oldUser = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );

    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const salt = await genSalt(10);

    const hashedPassword = await hash(createUserDto.password, salt);

    return await this.userRepository.create(createUserDto, hashedPassword);
  }

  public async findUserByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findUserByEmailWithPassword(email);
  }

  public async findUserByEmail(email: string): Promise<UserResponse> {
    return await this.userRepository.findUserByEmail(email);
  }
}
