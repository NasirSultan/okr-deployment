// src/final-team-score/final-team-score.module.ts
import { Module } from '@nestjs/common';
import { FinalTeamScoreService } from './final-team-score.service';
import { FinalTeamScoreController } from './final-team-score.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [FinalTeamScoreController],
  providers: [FinalTeamScoreService, PrismaService],
})
export class FinalTeamScoreModule {}
