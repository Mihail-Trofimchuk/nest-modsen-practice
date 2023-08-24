import { ApiProperty } from '@nestjs/swagger';

import { IsNumber } from 'class-validator';

export class UserMeetupDto {
  @ApiProperty()
  @IsNumber()
  meetupId: number;
}
