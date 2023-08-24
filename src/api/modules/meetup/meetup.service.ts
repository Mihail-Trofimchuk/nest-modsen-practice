import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupRepository } from './meetup.repository';
import { MeetupResponse } from './response/meetups.response';
import { PaginatedResult } from 'src/utils/pagination/paginator';
import { MeetupsQuery } from './dto/query-meetup.dto';
import { DUPLICATES_TAG_WARNING, NOT_FOUND_ERROR } from './meetup.constants';

@Injectable()
export class MeetupService {
  constructor(private readonly meetupRepository: MeetupRepository) {}
  public async create(
    createMeetupDto: CreateMeetupDto,
    createdBy: number,
  ): Promise<MeetupResponse> {
    const { tags } = createMeetupDto;

    if (!this.hasUniqueTagIds(tags)) {
      throw new BadRequestException(DUPLICATES_TAG_WARNING);
    }

    return await this.meetupRepository.create(createMeetupDto, createdBy);
  }

  public async findAllWithPagination(
    meetupsQuery: MeetupsQuery,
  ): Promise<PaginatedResult<MeetupResponse[]>> {
    const allMeetups = await this.meetupRepository.findAllWithPagination(
      meetupsQuery,
    );

    if (!allMeetups)
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    return allMeetups;
  }

  public async findOne(id: number) {
    return await this.meetupRepository.findOne(id);
  }

  public async update(
    id: number,
    updateMeetupDto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    return await this.meetupRepository.update(id, updateMeetupDto);
  }

  public async remove(id: number) {
    return await this.meetupRepository.remove(id);
  }

  public async checkAccess(userId: number, meetupId: number): Promise<void> {
    const meetup = await this.findOne(meetupId);

    if (userId !== meetup.createdBy) {
      throw new ForbiddenException();
    }
  }

  private hasUniqueTagIds(arr) {
    const seenTagIds = new Set();

    for (const element of arr) {
      if (seenTagIds.has(element.tagId)) {
        return false;
      }
      seenTagIds.add(element.tagId);
    }

    return true;
  }
}
