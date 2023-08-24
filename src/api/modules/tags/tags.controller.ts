import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsResponse } from './response/tags.response';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiCreatedResponse({ type: TagsResponse })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTagDto: CreateTagDto): Promise<TagsResponse> {
    return this.tagsService.create(createTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }

  @Get()
  findAll(): Promise<TagsResponse[]> {
    return this.tagsService.findAll();
  }
}
