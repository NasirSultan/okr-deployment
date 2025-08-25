import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';   

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  async addStrategy(title: string, file: Express.Multer.File) {
    if (!title || !file) throw new BadRequestException('Title and file are required');

    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = Date.now() + '-' + file.originalname;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    return this.prisma.strategy.create({
      data: { title, fileUrl: `/uploads/${fileName}` },
    });
  }

  async getRandomStrategy() {
    const strategies = await this.prisma.strategy.findMany();
    if (!strategies.length) throw new NotFoundException('No strategies found');

    const randomIndex = Math.floor(Math.random() * strategies.length);
    return strategies[randomIndex];
  }

 private startedTeams = new Map<number, boolean>();

  async startOrGetStrategy(teamId: number, role: string) {
    if (!teamId || !role) {
      throw new BadRequestException('Team ID and role are required');
    }

    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Team not found');

    if (role === 'admin') {

      this.startedTeams.set(teamId, true);
      return { message: 'Admin session started. Players can now fetch strategy.' };
    } else if (role === 'player') {

      if (!this.startedTeams.get(teamId)) {
        return { message: 'Wait for team admin to start' };
      }


      const strategies = await this.prisma.strategy.findMany();
      if (!strategies.length) throw new NotFoundException('No strategies found');

      const randomIndex = Math.floor(Math.random() * strategies.length);
      return strategies[randomIndex];
    } else {
      throw new BadRequestException('Invalid role');
    }
  }
  
}
