import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';

@Injectable()
export class CampaignAwardService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper function to assign rewards based on score
  private assignRewards(
    scores: { userId: number; totalScore: number | null }[],
  ) {
    return scores.map((member) => {
      const score = member.totalScore || 0;
      let title = '';
      let badge = '';
      let trophy = '';

      if (score === 100) {
        title = 'Perfect Performer';
        badge = 'Platinum Star';
        trophy = 'Gold Trophy';
      } else if (score >= 90) {
        title = 'Top Performer';
        badge = 'Gold Star';
        trophy = 'Silver Trophy';
      } else if (score >= 80) {
        title = 'High Achiever';
        badge = 'Silver Star';
      } else if (score >= 70) {
        title = 'Rising Star';
        badge = 'Bronze Star';
      } else {
        title = 'Participant';
      }

      return { memberId: member.userId.toString(), title, badge, trophy };
    });
  }

  // Fetch rewards by campaign (all users)
  async assignRewardsByCampaign(campaignId: number) {
    const scores = await this.prisma.campaignModeScore.findMany({
      where: { campaignId },
      select: { userId: true, totalScore: true },
    });

    return this.assignRewards(scores);
  }

  // Fetch rewards by user (all campaigns)
  async getRewardByUser(userId: number) {
    const scores = await this.prisma.campaignModeScore.findMany({
      where: { userId },
      select: { userId: true, totalScore: true },
    });

    return this.assignRewards(scores);
  }

  // Fetch reward for a specific user in a specific campaign
  async getRewardByCampaignAndUser(campaignId: number, userId: number) {
    const scores = await this.prisma.campaignModeScore.findMany({
      where: { campaignId, userId },
      select: { userId: true, totalScore: true },
    });

    return this.assignRewards(scores);
  }
}
