import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserRepository } from './users.reposiory';
import { PrismaModule } from '../db/prisma.module';

@Module({
  controllers: [],
  providers: [UsersService, UserRepository],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
