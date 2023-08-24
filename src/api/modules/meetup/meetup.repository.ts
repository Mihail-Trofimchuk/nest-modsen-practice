import { Injectable } from '@nestjs/common';

import { PrismaService } from '../db/prisma.service';
import { MeetupResponse } from './response/meetups.response';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import {
  PaginateOptions,
  PaginatedResult,
  paginator,
} from 'src/utils/pagination/paginator';
import { MeetupsQuery } from './dto/query-meetup.dto';

@Injectable()
export class MeetupRepository {
  constructor(private readonly db: PrismaService) {}

  private meetupfullSelect = {
    id: true,
    title: true,
    description: true,
    tags: {
      select: {
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    meetingTime: true,
    location: true,
  };

  public async create(
    createMeetupDto: CreateMeetupDto,
    createdBy: number,
  ): Promise<MeetupResponse> {
    const { tags, ...rest } = createMeetupDto;

    return await this.db.meetup.create({
      data: {
        tags: { createMany: { data: tags } },
        createdBy: createdBy,
        ...rest,
      },
      select: this.meetupfullSelect,
    });
  }

  public async findAllWithPagination(
    meetupsQuery: MeetupsQuery,
  ): Promise<PaginatedResult<MeetupResponse[]>> {
    const where = {
      title: meetupsQuery?.title,
      date: meetupsQuery?.meetingTime,
      location: meetupsQuery?.location,
      tags: {
        some: {
          tag: {
            name: meetupsQuery?.tags,
          },
        },
      },
    };

    const orderBy = {
      title: meetupsQuery?.sortByTitle,
      date: meetupsQuery?.sortByDate,
      location: meetupsQuery?.sortByLocation,
    };

    const defaultOptions: PaginateOptions = { perPage: meetupsQuery.perPage };

    const paginatedResult: PaginatedResult<MeetupResponse[]> = await paginator(
      defaultOptions,
    )(
      this.db.meetup,
      { where, orderBy },
      { page: meetupsQuery.page, perPage: meetupsQuery.perPage },
      this.meetupfullSelect,
    );

    return paginatedResult;
  }

  public async findOne(id: number): Promise<MeetupResponse> {
    return this.db.meetup.findFirst({
      where: { id },
      select: this.meetupfullSelect,
    });
  }

  public async update(
    id: number,
    updateMeetupDto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    const { tags, ...rest } = updateMeetupDto;

    await this.db.meetupTag.deleteMany({ where: { meetupId: id } });

    return await this.db.meetup.update({
      where: { id: id },
      data: {
        tags: { createMany: { data: tags } },
        ...rest,
      },
      select: this.meetupfullSelect,
    });
  }

  public async remove(id: number): Promise<void> {
    await this.db.meetup.deleteMany({ where: { id: id } });
  }
}
