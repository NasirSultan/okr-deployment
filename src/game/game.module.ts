import { Module } from '@nestjs/common';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [StrategyController],
  providers: [StrategyService, PrismaService],
})
export class GameModule {}
