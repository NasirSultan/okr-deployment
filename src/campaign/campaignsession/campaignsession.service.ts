import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddStrategyDto } from './dto/add-strategy.dto';
import { CompleteLevelDto } from './dto/complete-level.dto';

@Injectable()
export class CampaignSessionService {
  constructor(private prisma: PrismaService) {}

  async createSession(dto: CreateSessionDto) {
    return this.prisma.campaignSession.create({
      data: {
        playerId: dto.playerId,
        username: dto.username,
        progress: [
          { level: 1, score: null, passed: false, unlocked: true }
        ],
      },
    });
  }

  async addStrategy(sessionId: string, dto: AddStrategyDto) {
    const session = await this.prisma.campaignSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Session not found');

    return this.prisma.campaignSession.update({
      where: { id: sessionId },
      data: { strategyId: dto.strategyId },
    });
  }

  async completeLevel(sessionId: string, level: number, dto: CompleteLevelDto) {
  const session = await this.prisma.campaignSession.findUnique({ where: { id: sessionId } });
  if (!session) throw new NotFoundException('Session not found');
  if (!session.strategyId) throw new BadRequestException('Strategy must be set before playing levels');

  let progress = session.progress as any[];

  const currentLevel = progress.find(p => p.level === level);
  if (!currentLevel) throw new BadRequestException(`Level ${level} not found`);
  if (currentLevel.passed) throw new BadRequestException(`Level ${level} already completed`);

  // check if previous level is passed
  if (level > 1) {
    const prevLevel = progress.find(p => p.level === level - 1);
    if (!prevLevel || !prevLevel.passed) {
      throw new BadRequestException(`You must complete Level ${level - 1} first`);
    }
  }

  // update level
  currentLevel.score = dto.score;
  currentLevel.passed = true;
  currentLevel.unlocked = true;

  // unlock next level (only if less than 3 total levels)
  if (level < 3) {
    const nextLevel = level + 1;

    if (!progress.find(p => p.level === nextLevel)) {
      progress.push({ level: nextLevel, score: null, passed: false, unlocked: true });
    }
  }

  return this.prisma.campaignSession.update({
    where: { id: sessionId },
    data: { progress },
  });
}

async getSession(playerId: string, sessionId: string) {
  const session = await this.prisma.campaignSession.findFirst({
    where: {
      id: sessionId,
      playerId: playerId,
    },
  });
  

  if (!session) {
    throw new NotFoundException('Session not found for this player');
  }

  return session;
}

async unlockNextLevel(sessionId: string) {
  const session = await this.prisma.campaignSession.findUnique({ where: { id: sessionId } });
  if (!session) throw new NotFoundException('Session not found');

  const progress = session.progress as any[];


  const lastPassed = progress.filter(p => p.passed).sort((a, b) => b.level - a.level)[0];
  if (!lastPassed) throw new BadRequestException('No completed level found');

  const nextLevel = lastPassed.level + 1;
  if (nextLevel > 3) throw new BadRequestException('All levels are already unlocked');

 
  let nextLevelEntry = progress.find(p => p.level === nextLevel);
  if (!nextLevelEntry) {
    progress.push({ level: nextLevel, score: null, passed: false, unlocked: true });
  } else {
    nextLevelEntry.unlocked = true;
  }

  return this.prisma.campaignSession.update({
    where: { id: sessionId },
    data: { progress },
  });
}



}
