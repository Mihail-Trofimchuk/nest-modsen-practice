import { ApiProperty } from '@nestjs/swagger';

import { Tag } from '@prisma/client';

import { IsString } from 'class-validator';

type TagsType = Omit<Tag, 'id'>;

export class CreateTagDto implements TagsType {
  @ApiProperty()
  @IsString()
  name: string;
}
