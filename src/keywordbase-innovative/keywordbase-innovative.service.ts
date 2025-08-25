import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { CreateKeywordBaseInnovativeDto } from './dto/create-keywordbase-innovative.dto';
import { UpdateKeywordBaseInnovativeDto } from './dto/update-keywordbase-innovative.dto';

@Injectable()
export class KeywordBaseInnovativeService {
  constructor(private prisma: PrismaService) {}

 async create(data: CreateKeywordBaseInnovativeDto) {

  const existing = await this.prisma.keywordBaseInnovative.findFirst({
    where: { strategy_id: data.strategy_id },
  });

  if (existing) {
    await this.prisma.keywordBaseInnovative.delete({
      where: { id: existing.id },
    });
  }

  return this.prisma.keywordBaseInnovative.create({ data });
}


  findAll() {
    return this.prisma.keywordBaseInnovative.findMany();
  }

findOne(id: number) {
  return this.prisma.keywordBaseInnovative.findUnique({
    where: { id },
  });
}


  update(id: number, data: UpdateKeywordBaseInnovativeDto) {
    return this.prisma.keywordBaseInnovative.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.keywordBaseInnovative.delete({ where: { id } });
  }
}
