import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { llm } from '../lib/llm/llm';
import { okrPrompt } from '../lib/prompt/createObjective';

@Injectable()
export class CreateObjectiveService {
  // Track fetch counts per strategy ID
  private fetchCounts: Map<number, number> = new Map();

  constructor(private prisma: PrismaService) {}

  async generateAndSaveObjectives(
    strategyId: number,
    strategy: string,
    role: string,
    industry: string,
  ) {
    let attempt = 0;
    let objectivesData: string[] = [];

    while (attempt < 3 && objectivesData.length === 0) {
      attempt++;
      const prompt = okrPrompt(strategy, role, industry);

      const response = await llm.call([{ role: 'user', content: prompt }]);
      let text = response.text;

      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      try {
        const data = JSON.parse(text);
        objectivesData = data.okrs || [];
      } catch (err) {
        // ignore parse error
      }
    }

    if (objectivesData.length === 0) {
      return { error: 'Failed to generate OKRs after 3 attempts' };
    }

    await this.prisma.objective.deleteMany({
      where: { strategy_id: strategyId },
    });

    const createData = objectivesData.map((title) => ({
      strategy_id: strategyId,
      title,
    }));

    await this.prisma.objective.createMany({
      data: createData,
    });

    const savedObjectives = await this.prisma.objective.findMany({
      where: { strategy_id: strategyId },
      orderBy: { id: 'asc' },
    });

    return { message: 'Objectives saved', objectives: savedObjectives };
  }

  async getObjectives(strategyId?: number) {
    if (!strategyId) {
      // no strategyId, return all objectives without limit
      return this.prisma.objective.findMany({
        orderBy: { id: 'asc' },
      });
    }

    const count = this.fetchCounts.get(strategyId) || 0;
    if (count >= 3) {
      return { error: 'Fetch limit reached (3 times only) for this strategy' };
    }

    this.fetchCounts.set(strategyId, count + 1);

    return this.prisma.objective.findMany({
      where: { strategy_id: strategyId },
      orderBy: { id: 'asc' },
    });
  }
}
