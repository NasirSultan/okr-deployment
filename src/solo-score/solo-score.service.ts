import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';


export class CreateSoloScoreDto {
  userId: number;
  score: number;
  scor?: number;
  percentage: number;
  alignmentStrategy: number;
  objectiveClarity: number;
  keyResultQuality: number;
  initiativeRelevance: number;
  challengeAdoption: number;
  badge?: string;
  trophy?: string;
}


@Injectable()
export class SoloScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSoloScoreDto) {
    return this.prisma.soloScore.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.soloScore.findMany();
  }

  async findOne(id: number) {
    return this.prisma.soloScore.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<CreateSoloScoreDto>) {
    return this.prisma.soloScore.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.soloScore.delete({
      where: { id },
    });
  }
}
