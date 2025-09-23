import { Controller, Get, Query, Param } from '@nestjs/common';
import { CampaignAwardService } from './campaign-award.service';

@Controller('campaign-award')
export class CampaignAwardController {
  constructor(private readonly service: CampaignAwardService) {}

  // Reward for all users in a campaign
  @Get('by-campaign')
  assignRewards(@Query('campaignId') campaignId: string) {
    return this.service.assignRewardsByCampaign(Number(campaignId))
  }

  // Reward for a specific user
  @Get('by-user/:userId')
  getRewardByUser(@Param('userId') userId: string) {
    return this.service.getRewardByUser(userId)
  }

  // Reward for a specific user in a specific campaign
  @Get('by-campaign-user')
  getRewardByCampaignAndUser(
    @Query('campaignId') campaignId: string,
    @Query('userId') userId: string,
  ) {
    return this.service.getRewardByCampaignAndUser(
      Number(campaignId),
      userId,
    )
  }

  // Latest result with reward for a user
  @Get('latest/:userId')
  getLatestResult(@Param('userId') userId: string) {
    return this.service.getLatestResultByUser(userId)
  }

  // Summary of certifications for a user
  @Get('summary-total-certification/:userId')
  getUserSummary(@Param('userId') userId: string) {
    return this.service.getUserSummary(userId)
  }
  @Get('certific-info/:userId')
  async getUserCertifications(@Param('userId') userId: string) {
    return this.service.getUserCertifications(userId)
  }
  @Get('certific-detail/:userId/:certId')
  async getCertificationById(
    @Param('userId') userId: string,
    @Param('certId') certId: string,
  ) {
    return this.service.getCertificationById(userId, Number(certId))
  }


}
