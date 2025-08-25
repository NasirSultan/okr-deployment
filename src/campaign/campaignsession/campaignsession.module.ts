import { Module } from '@nestjs/common';
import { CampaignSessionController } from './campaignsession.controller';
import { CampaignSessionService } from './campaignsession.service';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Module({
  controllers: [CampaignSessionController],
  providers: [CampaignSessionService, PrismaService],
})
export class CampaignSessionModule {}
