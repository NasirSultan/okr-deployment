// campaign-mode-score.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CreateCampaignModeScoreDto } from './dto/create-campaign-mode-score.dto';

@Injectable()
export class CampaignModeScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCampaignModeScoreDto) {
    return this.prisma.campaignModeScore.create({ data });
  }

  async findAll() {
    return this.prisma.campaignModeScore.findMany();
  }

  // userId is string now
  async findByUserId(userId: string) {
    return this.prisma.campaignModeScore.findMany({ where: { userId } });
  }

  async findLatestByUser(userId: string) {
    return this.prisma.campaignModeScore.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

