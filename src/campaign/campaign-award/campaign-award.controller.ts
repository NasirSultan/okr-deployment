// campaign-award.controller.ts
import { Controller, Get, Query ,Param} from '@nestjs/common';
import { CampaignAwardService } from './campaign-award.service';

@Controller('campaign-award')
export class CampaignAwardController {
  constructor(private readonly service: CampaignAwardService) {}

  @Get('by-campaign')
  assignRewards(@Query('campaignId') campaignId: string) {
    return this.service.assignRewardsByCampaign(Number(campaignId));
  }

  // 1. Reward by userId
  @Get('by-user/:userId')
  getRewardByUser(@Param('userId') userId: string) {
    return this.service.getRewardByUser(Number(userId));
  }

  // 2. Reward by campaignId and userId
  @Get('by-campaign-user')
  getRewardByCampaignAndUser(
    @Query('campaignId') campaignId: string,
    @Query('userId') userId: string,
  ) {
    return this.service.getRewardByCampaignAndUser(
      Number(campaignId),
      Number(userId),
    );
  }


}
