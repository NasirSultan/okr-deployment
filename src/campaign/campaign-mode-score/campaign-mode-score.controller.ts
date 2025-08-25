import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CampaignModeScoreService } from './campaign-mode-score.service';
import { CreateCampaignModeScoreDto } from './dto/create-campaign-mode-score.dto';
import { UpdateCampaignModeScoreDto } from './dto/update-campaign-mode-score.dto';

@Controller('campaign-mode-score')
export class CampaignModeScoreController {
  constructor(private readonly service: CampaignModeScoreService) {}

  @Post()
  create(@Body() dto: CreateCampaignModeScoreDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('by-user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUserId(Number(userId));
  }

  @Get('by-session')
  findBySession(@Query('campaignId') campaignId: string, @Query('userId') userId?: string) {
    return this.service.findBySession(Number(campaignId), userId ? Number(userId) : undefined);
  }
}
