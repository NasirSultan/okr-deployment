import { Module } from '@nestjs/common';
import { SoloScoreService } from './solo-score.service';
import { SoloScoreController } from './solo-score.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [SoloScoreController],
  providers: [SoloScoreService, PrismaService],
})
export class SoloScoreModule {}
