import { Injectable } from '@nestjs/common';

import { UserMeetupDto } from './dto/user-meetup.dto';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UserMeetupRepository {
  constructor(private readonly db: PrismaService) {}

  async addUserToMeetup(dto: UserMeetupDto, userId: number) {
    return this.db.userMeetup.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findUserAndMeetup(dto: UserMeetupDto, userId: number) {
    return await this.db.userMeetup.findUnique({
      where: {
        userId_meetupId: {
          userId,
          ...dto,
        },
      },
    });
  }

  async removeUserFromMeetup(meetupId: number, userId: number) {
    try {
      return await this.db.userMeetup.delete({
        where: {
          userId_meetupId: { userId, meetupId },
        },
      });
    } catch (err) {
      return;
    }
  }
}
