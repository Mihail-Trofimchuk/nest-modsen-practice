import { Injectable } from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsRepository } from './tags.repository';
import { TagsResponse } from './response/tags.response';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  public async create(createTagDto: CreateTagDto): Promise<TagsResponse> {
    return await this.tagsRepository.create(createTagDto);
  }

  public async remove(id: number) {
    return await this.tagsRepository.remove(id);
  }

  public async findAll() {
    return await this.tagsRepository.findAll();
  }
}
