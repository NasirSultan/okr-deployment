// src/final-team-score/final-team-score.service.ts
import { Injectable,NotFoundException  } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { CreateFinalTeamScoreDto } from './dto/create-final-team-score.dto';
import { assignTeamRewards } from './utils/reward.util';


@Injectable()
export class FinalTeamScoreService {
  constructor(private prisma: PrismaService) {}


  async create(dto: CreateFinalTeamScoreDto) {
    return this.prisma.finalTeamScore.create({
      data: {
        ...dto,
      },
    });
  }


  async getByTeam(teamId: number) {
    return this.prisma.finalTeamScore.findMany({
      where: { teamId },
      include: { team: true },
    });
  }


  async getByUser(userId: number) {
    return this.prisma.finalTeamScore.findMany({
      where: { userId },
      include: { team: true },
    });
  }

 async getUserScoreByTeam(userId: number, teamId: number) {
    const score = await this.prisma.finalTeamScore.findFirst({
      where: {
        userId,
        teamId,
      },
      include: {
        team: true, 
      },
    });

    if (!score) {
      throw new NotFoundException(
        `No score found for user ${userId} in team ${teamId}`,
      );
    }

    return score;
  }


async getAverageScoreByTeam(teamId: number) {

    const scores = await this.prisma.finalTeamScore.findMany({
      where: { teamId },
      select: {
        score: true, 
        alignmentStrategy: true,
        objectiveClarity: true,
        keyResultQuality: true,
        initiativeRelevance: true,
        challengeAdoption: true,
      },
    });

    if (scores.length === 0) {
      throw new NotFoundException(`No scores found for team ${teamId}`);
    }

    const total = {
      alignmentStrategy: 0,
      objectiveClarity: 0,
      keyResultQuality: 0,
      initiativeRelevance: 0,
      challengeAdoption: 0,
      score: 0, 
    };

    scores.forEach((s) => {
      total.alignmentStrategy += s.alignmentStrategy;
      total.objectiveClarity += s.objectiveClarity;
      total.keyResultQuality += s.keyResultQuality;
      total.initiativeRelevance += s.initiativeRelevance;
      total.challengeAdoption += s.challengeAdoption;
      total.score += s.score;
    });

    const count = scores.length;


    const averages = {
      alignmentStrategy: total.alignmentStrategy / count,
      objectiveClarity: total.objectiveClarity / count,
      keyResultQuality: total.keyResultQuality / count,
      initiativeRelevance: total.initiativeRelevance / count,
      challengeAdoption: total.challengeAdoption / count,
    };

    const overallAverage =
      (averages.alignmentStrategy +
        averages.objectiveClarity +
        averages.keyResultQuality +
        averages.initiativeRelevance +
        averages.challengeAdoption) /
      5;


    const Averageofallmembers = total.score / count;

    return {
      teamId,
      totalMembers: count,
      averages,
    
     Averageofallmembers,
    };
  }


 async getTeamMembersWithScores(teamId: number) {

    const teamMembers = await this.prisma.teamMember.findMany({
      where: { teamId },
      include: { team: true },
    });

    if (teamMembers.length === 0) {
      throw new NotFoundException(`No members found for team ${teamId}`);
    }


    const scores = await this.prisma.finalTeamScore.findMany({
      where: { teamId },
    });


    const result = teamMembers.map((member) => {
      const memberScore = scores.find((s) => s.userId === member.userId);

      return {
        ...member, 
        scoreData: memberScore ? memberScore : { status: "waiting" },
      };
    });

    return {
      teamId,
      totalMembers: teamMembers.length,
      members: result,
    };
  }

  
  async assignAwardsToTeam(teamId: number) {
    // Get scores for this team
    const teamScores = await this.prisma.finalTeamScore.findMany({
      where: { teamId },
      select: { userId: true, score: true },
    });

    if (teamScores.length === 0) {
      throw new NotFoundException(`No scores found for team ${teamId}`);
    }

    // Get average scores of all teams to compare
    const allTeams = await this.prisma.finalTeamScore.groupBy({
      by: ['teamId'],
      _avg: { score: true },
    });

    const allTeamsScores = allTeams.map((t) => t._avg.score || 0);

    // Use helper
    const rewards = assignTeamRewards(
      teamScores.map((s) => ({
        memberId: s.userId.toString(),
        score: s.score,
      })),
      allTeamsScores,
    );

    return { teamId, ...rewards };
  }

  // 2. Assign award to a single member
  async assignAwardToMember(userId: number, teamId: number) {
    const memberScore = await this.prisma.finalTeamScore.findFirst({
      where: { userId, teamId },
      select: { userId: true, score: true },
    });

    if (!memberScore) {
      throw new NotFoundException(
        `No score found for user ${userId} in team ${teamId}`,
      );
    }

    // Get scores for this team
    const teamScores = await this.prisma.finalTeamScore.findMany({
      where: { teamId },
      select: { userId: true, score: true },
    });

    // Get average scores of all teams
    const allTeams = await this.prisma.finalTeamScore.groupBy({
      by: ['teamId'],
      _avg: { score: true },
    });

    const allTeamsScores = allTeams.map((t) => t._avg.score || 0);

    // Get rewards for all members
    const rewards = assignTeamRewards(
      teamScores.map((s) => ({
        memberId: s.userId.toString(),
        score: s.score,
      })),
      allTeamsScores,
    );

    // Return only this member reward
    const memberReward = rewards.memberRewards.find(
      (m) => m.memberId === memberScore.userId.toString(),
    );

    return { userId, teamId, ...memberReward };
  }



}





