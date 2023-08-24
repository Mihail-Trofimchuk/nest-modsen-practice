import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MeetupModule } from './api/modules/meetup/meetup.module';
import { PrismaModule } from './api/modules/db/prisma.module';
import { TagsModule } from './api/modules/tags/tags.module';
import { AuthModule } from './api/modules/auth/auth.module';
import { UsersModule } from './api/modules/users/users.module';
import { SessionsModule } from './api/modules/sessions/sessions.module';
import { UsermeetupModule } from './api/modules/usermeetup/usermeetup.module';
import { UserMeetupModule } from './api/modules/user-meetup/user-meetup.module';
import { UserMeetupModule } from './api/modules/user-meetup/user-meetup.module';
import { UserMeetupModule } from './api/modules/user-meetup/user-meetup.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    MeetupModule,
    PrismaModule,
    TagsModule,
    AuthModule,
    UsersModule,
    SessionsModule,
    UsermeetupModule,
    UserMeetupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
