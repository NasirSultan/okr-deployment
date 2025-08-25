import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  providers: [TeamService, PrismaService],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
