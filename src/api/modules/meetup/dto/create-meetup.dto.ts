import { ApiProperty } from '@nestjs/swagger';

import { Meetup } from '@prisma/client';

import {
  IsArray,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { MeetupTagsDto } from './link/meetup-tags.dto';

type CreateMeetupType = Omit<Meetup, 'id' | 'createdBy'>;

export class CreateMeetupDto implements CreateMeetupType {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeetupTagsDto)
  tags: MeetupTagsDto[];

  @ApiProperty()
  @IsDateString()
  meetingTime: Date;

  @ApiProperty()
  @IsString()
  location: string;
}
