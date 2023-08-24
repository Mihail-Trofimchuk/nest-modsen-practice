import { ApiProperty } from '@nestjs/swagger';

import { MeetupTag } from '@prisma/client';

import { IsNumber } from 'class-validator';

type TagsType = Omit<MeetupTag, 'meetupId'>;

export class MeetupTagsDto implements TagsType {
  @ApiProperty()
  @IsNumber()
  tagId: number;
}
