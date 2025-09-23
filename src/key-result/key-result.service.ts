import { Injectable } from '@nestjs/common'
import { PrismaService } from '../lib/prisma/prisma.service'

@Injectable()
export class KeyResultService {
  constructor(private prisma: PrismaService) {}

  async create(data: { objectiveId?: number | null; strategyId?: number; text: string }) {
    if (data.strategyId) {
      await this.prisma.keyResult.deleteMany({ where: { strategyId: data.strategyId } })
    }
    return this.prisma.keyResult.create({ data })
  }

  async findAll() {
    return this.prisma.keyResult.findMany()
  }

  async findByObjective(objectiveId: number) {
    return this.prisma.keyResult.findMany({ where: { objectiveId } })
  }

  async deleteByStrategy(strategyId: number) {
    return this.prisma.keyResult.deleteMany({ where: { strategyId } })
  }

async findByStrategy(strategyId: number) {
  return this.prisma.keyResult.findMany({ where: { strategyId } })
}


}
