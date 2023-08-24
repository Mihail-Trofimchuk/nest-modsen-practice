import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserMeetupDto } from './dto/user-meetup.dto';
import { UserMeetupService } from './user-meetup.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import RequestWithUser from '../auth/interfaces/request-with-user.interface';

@ApiTags('user-meetup')
@Controller('user-meetup')
export class UserMeetupsController {
  constructor(private readonly userMeetupService: UserMeetupService) {}

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addUserToMeetup(
    @Body() dto: UserMeetupDto,
    @Req() req: RequestWithUser,
  ) {
    return await this.userMeetupService.addUserToMeetup(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async removeUserFromMeetup(
    @Param('id') meetupId: string,
    @Req() req: RequestWithUser,
  ) {
    return await this.userMeetupService.removeUserFromMeetup(
      +meetupId,
      req.user.id,
    );
  }
}
