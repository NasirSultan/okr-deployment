import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../lib/prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { AddObjectiveDto } from './dto/add-objective.dto';
import { AddKeyResultsDto } from './dto/add-keyresults.dto';
import { AddInnovativesDto } from './dto/add-innovatives.dto';

@Injectable()
export class CertificationDataService {
  constructor(private prisma: PrismaService) {}

  async createChallenge(data: CreateChallengeDto) {
    return this.prisma.certificationChallenge.create({
      data: {
        userId: data.userId,
        name: data.name,
        scenario: data.scenario,
        strategy: data.strategy,
        type: 'CHALLENGE',
      },
    });
  }

  async addObjective(data: AddObjectiveDto) {
    const parent = await this.prisma.certificationChallenge.findUnique({
      where: { id: data.challengeId },
    });

    if (!parent) throw new Error('Parent challenge not found');

    return this.prisma.certificationChallenge.create({
      data: {
        name: data.text,
        type: 'OBJECTIVE',
        parentId: parent.id,
        userId: parent.userId,
        scenario: parent.scenario,
        strategy: parent.strategy,
      },
    });
  }

  async addKeyResults(data: AddKeyResultsDto) {
    const parent = await this.prisma.certificationChallenge.findUnique({
      where: { id: data.objectiveId },
    });

    if (!parent) throw new Error('Parent objective not found');

    return Promise.all(
      data.keyResults.map(text =>
        this.prisma.certificationChallenge.create({
          data: {
            name: text,
            type: 'KEY_RESULT',
            parentId: parent.id,
            userId: parent.userId,
            scenario: parent.scenario,
            strategy: parent.strategy,
          },
        }),
      ),
    );
  }

  async addInnovatives(data: AddInnovativesDto) {
    const parent = await this.prisma.certificationChallenge.findUnique({
      where: { id: data.objectiveId },
    });

    if (!parent) throw new Error('Parent objective not found');

    return Promise.all(
      data.innovatives.map(text =>
        this.prisma.certificationChallenge.create({
          data: {
            name: text,
            type: 'INNOVATIVE',
            parentId: parent.id,
            userId: parent.userId,
            scenario: parent.scenario,
            strategy: parent.strategy,
          },
        }),
      ),
    );
  }

  async getChallengeResult(challengeId: number) {
    return this.prisma.certificationChallenge.findUnique({
      where: { id: challengeId },
      include: {
        children: {
          include: {
            children: true, 
          },
        },
      },
    });
  }
}
