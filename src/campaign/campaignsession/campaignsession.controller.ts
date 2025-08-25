import { Controller, Post, Body,Get,Param } from '@nestjs/common';
import { CampaignSessionService } from './campaignsession.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AddStrategyDto } from './dto/add-strategy.dto';
import { CompleteLevelDto } from './dto/complete-level.dto';

@Controller('campaignsession')
export class CampaignSessionController {
  constructor(private readonly service: CampaignSessionService) {}

  @Post('start-session')
  createSession(@Body() dto: CreateSessionDto) {
    return this.service.createSession(dto);
  }

  @Post(':id/add-strategy')
  addStrategy(@Param('id') id: string, @Body() dto: AddStrategyDto) {
    return this.service.addStrategy(id, dto);
  }

  @Post(':id/complete-level/:level')
  completeLevel(
    @Param('id') id: string,
    @Param('level') level: string,
    @Body() dto: CompleteLevelDto
  ) {
    return this.service.completeLevel(id, parseInt(level), dto);
  }

 @Get(':playerId/:sessionId')
  getSession(@Param('playerId') playerId: string, @Param('sessionId') sessionId: string) {
    return this.service.getSession(playerId, sessionId);
  }
@Post(':id/unlock-next-level')
unlockNextLevel(@Param('id') id: string) {
  return this.service.unlockNextLevel(id);
}


}
