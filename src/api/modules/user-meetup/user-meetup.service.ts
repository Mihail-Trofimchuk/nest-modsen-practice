import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserMeetupDto } from './dto/user-meetup.dto';
import { UserMeetupRepository } from './user-meetup.repository';
import {
  DUBLICATE_MEETUP_WARNING,
  NOT_FOUND_ERROR,
} from './user-meetup.constants';

@Injectable()
export class UserMeetupService {
  constructor(private readonly userMeetupRepository: UserMeetupRepository) {}

  async addUserToMeetup(dto: UserMeetupDto, userId: number) {
    const result = await this.userMeetupRepository.findUserAndMeetup(
      dto,
      userId,
    );
    if (result) {
      throw new HttpException(
        DUBLICATE_MEETUP_WARNING,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return await this.userMeetupRepository.addUserToMeetup(dto, userId);
  }

  async removeUserFromMeetup(meetupId: number, userId: number) {
    const result = await this.userMeetupRepository.removeUserFromMeetup(
      meetupId,
      userId,
    );
    if (!result) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
