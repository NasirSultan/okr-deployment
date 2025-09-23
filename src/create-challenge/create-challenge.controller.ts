import { Controller, Post, Body } from '@nestjs/common'
import { CreateChallengeService } from './create-challenge.service'
import type { ChallengeInput } from './create-challenge.service'

@Controller('challenge')
export class CreateChallengeController {
  constructor(private readonly challengeService: CreateChallengeService) {}

  @Post()
  async create(@Body() body: ChallengeInput) {
    return await this.challengeService.generateChallenge(body)
  }
}
