// src/final-team-score/final-team-score.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../lib/prisma/prisma.service'
import { CreateFinalTeamScoreDto } from './dto/create-final-team-score.dto'

@Injectable()
export class FinalTeamScoreService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFinalTeamScoreDto) {
    const { badge, trophy } = this.assignRewards(dto.score)

    const totalScore =
      dto.alignmentStrategy +
      dto.objectiveClarity +
      dto.keyResultQuality +
      dto.initiativeRelevance +
      dto.challengeAdoption

    const avgPercentage = (totalScore / 100) * 100

    const saved = await this.prisma.finalTeamScore.create({
      data: {
        ...dto,
        badge,
        trophy,
        avgPercentage,
      },
    })

    // only keep allowed fields in response
    const { alignmentStrategy, objectiveClarity, keyResultQuality, initiativeRelevance, challengeAdoption, ...safe } =
      saved

    return {
      ...safe,
      alignmentPoints: this.assignPoints(dto.alignmentStrategy, 15),
      objectivePoints: this.assignPoints(dto.objectiveClarity, 15),
      keyResultPoints: this.assignPoints(dto.keyResultQuality, 30),
      initiativePoints: this.assignPoints(dto.initiativeRelevance, 30),
      challengePoints: this.assignPoints(dto.challengeAdoption, 10),
      totalPoints: this.calculateTotalPoints(dto),
    }
  }

  private assignRewards(score: number) {
    if (score === 100) return { badge: 'Platinum Star', trophy: 'Gold Trophy' }
    if (score >= 90) return { badge: 'Gold Star', trophy: 'Silver Trophy' }
    if (score >= 80) return { badge: 'Silver Star', trophy: '' }
    if (score >= 70) return { badge: 'Bronze Star', trophy: '' }
    return { badge: 'Participant', trophy: '' }
  }

  private assignPoints(value: number, max: number) {
    if (value === max) return 2
    if (value >= max / 2) return 1
    return 0
  }

  private calculateTotalPoints(dto: CreateFinalTeamScoreDto) {
    return (
      this.assignPoints(dto.alignmentStrategy, 15) +
      this.assignPoints(dto.objectiveClarity, 15) +
      this.assignPoints(dto.keyResultQuality, 30) +
      this.assignPoints(dto.initiativeRelevance, 30) +
      this.assignPoints(dto.challengeAdoption, 10)
    )
  }
}
