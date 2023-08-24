import { Module } from '@nestjs/common';
import { UserMeetupService } from './user-meetup.service';
import { UserMeetupsController } from './user-meetup.controller';
import { UserMeetupRepository } from './user-meetup.repository';
import { PrismaModule } from '../db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserMeetupsController],
  providers: [UserMeetupService, UserMeetupRepository],
})
export class UserMeetupModule {}
