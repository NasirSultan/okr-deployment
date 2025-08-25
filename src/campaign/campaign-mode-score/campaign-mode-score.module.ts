import { Module } from '@nestjs/common';
import { CampaignModeScoreService } from './campaign-mode-score.service';
import { CampaignModeScoreController } from './campaign-mode-score.controller';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Module({
  controllers: [CampaignModeScoreController],
  providers: [CampaignModeScoreService, PrismaService],
})
export class CampaignModeScoreModule {}
