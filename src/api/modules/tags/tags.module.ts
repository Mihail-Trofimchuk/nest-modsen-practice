import { Module } from '@nestjs/common';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { PrismaModule } from '../db/prisma.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  imports: [PrismaModule],
})
export class TagsModule {}
