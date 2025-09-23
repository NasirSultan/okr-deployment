import { Injectable } from '@nestjs/common'
import { PrismaService } from '../lib/prisma/prisma.service'
import { llm } from '../lib/llm/llm'
import { okrPrompt } from '../lib/prompt/createObjective'

@Injectable()
export class CreateObjectiveService {

  private fetchCounts: Map<number, number> = new Map()

  constructor(private prisma: PrismaService) {}

// service
async generateAndSaveObjectives(
  strategyId: number,
  strategy: string,
  role: string,
  industry: string,
  language: string,
) {
  let attempt = 0
  let objectivesData: Array<{ title: string; description?: string; difficulty?: number }> = []

  while (attempt < 3 && objectivesData.length === 0) {
    attempt++
    const prompt = okrPrompt(strategy, role, industry, language)

    const response = await llm.call([{ role: 'user', content: prompt }])
    let text = response.text

    text = text.replace(/```json/g, '').replace(/```/g, '').trim()

    try {
      const data = JSON.parse(text)

      if (Array.isArray(data.okrs)) {
        objectivesData = data.okrs.map((o: any) => ({
          title: o.title ?? '',
          description: o.description ?? null,
          difficulty: o.difficulty ?? 1,
        }))
      }
    } catch (err) {
      console.error('JSON parse error in LLM response:', err)
    }
  }

  if (objectivesData.length === 0) {
    return { error: 'Failed to generate OKRs after 3 attempts' }
  }

  await this.prisma.objective.deleteMany({
    where: { strategyId },
  })

  await this.prisma.objective.createMany({
    data: objectivesData.map((obj) => ({
      strategyId,
      title: obj.title,
      description: obj.description,
      difficulty: obj.difficulty,
    })),
  })

  const savedObjectives = await this.prisma.objective.findMany({
    where: { strategyId },
    orderBy: { id: 'asc' },
  })

  return { message: 'Objectives saved', objectives: savedObjectives }
}




async getObjectives(strategyId?: number) {
  if (!strategyId) {
    return this.prisma.objective.findMany({
      orderBy: { id: 'asc' },
    })
  }

  const count = this.fetchCounts.get(strategyId) || 0
  const maxAttempts = 3
  const remaining = Math.max(0, maxAttempts - count)

  if (count >= maxAttempts) {
    return { error: 'Fetch limit reached (3 times only) for this strategy', remainingAttempts: 0 }
  }

  this.fetchCounts.set(strategyId, count + 1)

  const objectives = await this.prisma.objective.findMany({
    where: { strategyId },
    orderBy: { id: 'asc' },
  })

  return { objectives, remainingAttempts: remaining - 1 }
}

async getObjectivesWithoutLimit(strategyId: number) {
  return this.prisma.objective.findMany({
    where: { strategyId },
    orderBy: { id: 'asc' },
  })
}





}
