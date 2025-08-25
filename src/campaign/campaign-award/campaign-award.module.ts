// campaign-award.module.ts
import { Module } from '@nestjs/common';
import { CampaignAwardService } from './campaign-award.service';
import { CampaignAwardController } from './campaign-award.controller';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Module({
  controllers: [CampaignAwardController],
  providers: [CampaignAwardService, PrismaService], // Add PrismaService here
})
export class CampaignAwardModule {}
