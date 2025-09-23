import { Injectable, BadRequestException, ForbiddenException,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class StrategyService {
    private requestCounter = 0
  constructor(private prisma: PrismaService) {}

  async addStrategy(title: string, file: Express.Multer.File | undefined, cardId: number) {
    if (!title || cardId === undefined) throw new BadRequestException('Title and cardId are required');

    let fileUrl: string | null = null;

    if (file) {
      const uploadDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = Date.now() + '-' + file.originalname;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, file.buffer);
      fileUrl = `/uploads/${fileName}`;
    }

    return this.prisma.strategy.create({
      data: { title, fileUrl, cardId },
    });
  }

async getRandomStrategy() {
    const strategies = await this.prisma.strategy.findMany()
    if (!strategies.length) throw new NotFoundException('No strategies found')

    const randomIndex = Math.floor(Math.random() * strategies.length)
    const strategy = strategies[randomIndex]

    this.requestCounter += 1

    return { ...strategy, strategyID: this.requestCounter }
  }
  private startedTeams = new Map<number, boolean>();

async startOrGetStrategy(teamId: number, role: string) {
  if (!teamId || !role) throw new BadRequestException('Team ID and role are required')

  const team = await this.prisma.team.findUnique({ where: { id: teamId } })
  if (!team) throw new NotFoundException('Team not found')

  const SESSION_DURATION_MINUTES = 20
  let session = await this.prisma.session.findUnique({ where: { teamId } })
  const sessionStarted = this.startedTeams.get(teamId) || false

  if (role === 'HOST') {
    this.startedTeams.set(teamId, true)

    if (!session) {
      // Create session if it doesn't exist
      session = await this.prisma.session.create({
        data: {
          teamId,
          startedAt: new Date(),
        },
      })
    } else if (!session.startedAt) {
      // Update startedAt if session exists but hasn't started
      session = await this.prisma.session.update({
        where: { teamId },
        data: { startedAt: new Date() },
      })
    }
  } else if (!sessionStarted) {
    return {
      status: 'reject',
      message: 'Wait for team host to start',
    }
  }

  // Ensure session is not null before accessing startedAt
  if (!session || !session.startedAt) {
    throw new BadRequestException('Session has not started yet')
  }

  // Calculate remaining time
  const now = new Date()
  const endTime = new Date(session.startedAt)
  endTime.setMinutes(endTime.getMinutes() + SESSION_DURATION_MINUTES)
  const remainingMs = endTime.getTime() - now.getTime()
  const remainingMinutes = Math.max(Math.floor(remainingMs / 60000), 0)
  const remainingSeconds = Math.max(Math.floor((remainingMs % 60000) / 1000), 0)

  const strategies = await this.prisma.strategy.findMany()
  if (!strategies.length) throw new NotFoundException('No strategies found')

  const randomIndex = Math.floor(Math.random() * strategies.length)
  const strategy = strategies[randomIndex]

  return {
    status: 'success',
    message: 'Session active',
    remainingTime: {
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    },
    strategy,
  }
}




}
