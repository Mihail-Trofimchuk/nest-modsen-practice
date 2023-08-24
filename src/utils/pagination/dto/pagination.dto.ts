import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: true })
  @IsNumber()
  page: number;

  @ApiProperty({ required: true })
  @IsNumber()
  perPage: number;
}
