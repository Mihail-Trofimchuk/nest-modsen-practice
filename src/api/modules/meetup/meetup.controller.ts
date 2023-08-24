import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '@prisma/client';

import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { PaginatedResult } from 'src/utils/pagination/paginator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { MeetupsQuery } from './dto/query-meetup.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/api/decorators/roles.decorator';
import RequestWithUser from '../auth/interfaces/request-with-user.interface';

@ApiTags('meetup')
@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Roles(Role.ORGANIZER)
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: MeetupResponse })
  @Post()
  create(
    @Body() createMeetupDto: CreateMeetupDto,
    @Req() req: RequestWithUser,
  ): Promise<MeetupResponse> {
    return this.meetupService.create(createMeetupDto, req.user.id);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll(
    @Query() query: MeetupsQuery,
  ): Promise<PaginatedResult<MeetupResponse[]>> {
    return this.meetupService.findAllWithPagination(query);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupService.findOne(+id);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMeetupDto: UpdateMeetupDto,
    @Req() req: RequestWithUser,
  ) {
    await this.meetupService.checkAccess(req.user.id, +id);
    return this.meetupService.update(+id, updateMeetupDto);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    await this.meetupService.checkAccess(req.user.id, +id);
    return this.meetupService.remove(+id);
  }
}
