import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from 'src/utils/pagination/dto/pagination.dto';
import { SortingOrderType } from 'src/utils/constants/sorting-order';

export class MeetupsQuery implements PaginationDto {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: false })
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  tags: string;

  @ApiProperty({ required: false })
  meetingTime: Date;

  @ApiProperty({ required: false })
  location: string;

  @ApiProperty({ required: true })
  page: number;

  @ApiProperty({ required: true })
  perPage: number;

  @ApiProperty({ required: false })
  sortByTitle: SortingOrderType;

  @ApiProperty({ required: false })
  sortByDate: SortingOrderType;

  @ApiProperty({ required: false })
  sortByLocation: SortingOrderType;
}
