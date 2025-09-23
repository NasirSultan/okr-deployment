// src/final-team-score/final-team-score.controller.ts
import { Body, Controller, Post } from '@nestjs/common'
import { FinalTeamScoreService } from './final-team-score.service'
import { CreateFinalTeamScoreDto } from './dto/create-final-team-score.dto'

@Controller('final-team-score')
export class FinalTeamScoreController {
  constructor(private readonly finalTeamScoreService: FinalTeamScoreService) {}

  @Post()
  create(@Body() dto: CreateFinalTeamScoreDto) {
    return this.finalTeamScoreService.create(dto)
  }
}
