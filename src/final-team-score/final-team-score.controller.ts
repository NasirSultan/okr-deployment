// src/final-team-score/final-team-score.controller.ts
import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { FinalTeamScoreService } from './final-team-score.service';
import { CreateFinalTeamScoreDto } from './dto/create-final-team-score.dto';

@Controller('final-team-score')
export class FinalTeamScoreController {
  constructor(private readonly finalTeamScoreService: FinalTeamScoreService) {}


  @Post()
  async create(@Body() dto: CreateFinalTeamScoreDto) {
    return this.finalTeamScoreService.create(dto);
  }


  @Get('team/:teamId')
  async getByTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.finalTeamScoreService.getByTeam(teamId);
  }

  // GET /final-team-score/user/:userId
  @Get('user/:userId')
  async getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.finalTeamScoreService.getByUser(userId);
  }


  @Get('user/:userId/team/:teamId')
  async getUserScoreByTeam(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.finalTeamScoreService.getUserScoreByTeam(userId, teamId);
  }

@Get('team/:teamId/average')
async getAverageScoreByTeam(@Param('teamId', ParseIntPipe) teamId: number) {
  return this.finalTeamScoreService.getAverageScoreByTeam(teamId);
}


 @Get('team/:teamId/members')
  async getTeamMembersWithScores(
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.finalTeamScoreService.getTeamMembersWithScores(teamId);
  }


 @Get('team/:teamId/rewards')
  async getTeamRewards(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.finalTeamScoreService.assignAwardsToTeam(teamId);
  }

  // API 2: Get single member reward
  @Get('team/:teamId/member/:userId/reward')
  async getMemberReward(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.finalTeamScoreService.assignAwardToMember(userId, teamId);
  }




}
