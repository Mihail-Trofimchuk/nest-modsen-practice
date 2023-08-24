import { Injectable } from '@nestjs/common';

import { SessionRepository } from './session.repository';

@Injectable()
export class SessionsService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async upsertSession(userId: number, refreshToken: string): Promise<void> {
    return await this.sessionRepository.upsertSession(userId, refreshToken);
  }

  async findRefreshToken(userId: number) {
    return (await this.sessionRepository.findRefreshToken(userId)).refreshToken;
  }
}
