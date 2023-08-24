import { Module } from '@nestjs/common';

import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { MeetupRepository } from './meetup.repository';
import { PrismaModule } from '../db/prisma.module';

@Module({
  controllers: [MeetupController],
  providers: [MeetupService, MeetupRepository],
  imports: [PrismaModule],
})
export class MeetupModule {}
