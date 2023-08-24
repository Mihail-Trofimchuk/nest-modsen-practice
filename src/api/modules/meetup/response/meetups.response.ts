import { ApiProperty } from '@nestjs/swagger';

import { MeetupsTagsResponse } from './link/meetup-tags.response';
import { Meetup } from '@prisma/client';

type MeetupResponseType = Omit<Meetup, 'description' | 'createdBy'> &
  Partial<Pick<Meetup, 'description' | 'createdBy'>>;

export class MeetupResponse implements MeetupResponseType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  tags: MeetupsTagsResponse[];

  @ApiProperty()
  meetingTime: Date;

  @ApiProperty()
  location: string;

  @ApiProperty({ required: false })
  createdBy?: number;
}
