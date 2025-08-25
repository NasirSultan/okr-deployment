import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CreateCampaignModeScoreDto } from './dto/create-campaign-mode-score.dto';
import { UpdateCampaignModeScoreDto } from './dto/update-campaign-mode-score.dto';

@Injectable()
export class CampaignModeScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCampaignModeScoreDto) {
    return this.prisma.campaignModeScore.create({ data });
  }

  async findAll() {
    return this.prisma.campaignModeScore.findMany();
  }

  async findByUserId(userId: number) {
    return this.prisma.campaignModeScore.findMany({ where: { userId } });
  }

  async findBySession(campaignId: number, userId?: number) {
    const where: any = { campaignId };
    if (userId) where.userId = userId;
    return this.prisma.campaignModeScore.findMany({ where });
  }
}
