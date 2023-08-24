import { Module } from '@nestjs/common';

import { SessionsService } from './sessions.service';
import { SessionRepository } from './session.repository';
import { PrismaModule } from '../db/prisma.module';

@Module({
  controllers: [],
  imports: [PrismaModule],
  providers: [SessionsService, SessionRepository],
  exports: [SessionsService],
})
export class SessionsModule {}
