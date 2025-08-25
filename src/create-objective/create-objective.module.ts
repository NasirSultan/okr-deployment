// src/create-objective/create-objective.module.ts
import { Module } from '@nestjs/common';
import { CreateObjectiveService } from './create-objective.service';
import { CreateObjectiveController } from './create-objective.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [CreateObjectiveController],
  providers: [CreateObjectiveService, PrismaService],
})
export class CreateObjectiveModule {}
