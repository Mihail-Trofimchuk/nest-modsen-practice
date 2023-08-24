import { Injectable } from '@nestjs/common';

import { PrismaService } from '../db/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsResponse } from './response/tags.response';

@Injectable()
export class TagsRepository {
  constructor(private readonly db: PrismaService) {}

  public async create(createTagDto: CreateTagDto): Promise<TagsResponse> {
    return await this.db.tag.create({
      data: { ...createTagDto },
    });
  }

  public async remove(id: number): Promise<void> {
    await this.db.tag.deleteMany({
      where: { id },
    });
  }

  public async findAll(): Promise<TagsResponse[]> {
    return await this.db.tag.findMany();
  }
}
