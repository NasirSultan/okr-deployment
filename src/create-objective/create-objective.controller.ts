import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateObjectiveService } from './create-objective.service';

@Controller('objectives')
export class CreateObjectiveController {
  constructor(private readonly createObjectiveService: CreateObjectiveService) {}

// controller
@Post('generate')
async generateObjectives(
  @Body()
  body: {
    strategyId: number
    strategy: string
    role: string
    industry: string
    language: string // new field
  },
) {
  const { strategyId, strategy, role, industry, language } = body
  return this.createObjectiveService.generateAndSaveObjectives(
    strategyId,
    strategy,
    role,
    industry,
    language,
  )
}



  @Get('fetch-strategy-id-baesed')
  async fetchObjectives(@Query('strategyId') strategyId?: string) {
    const id = strategyId ? parseInt(strategyId, 10) : undefined;
    return this.createObjectiveService.getObjectives(id);
  }


@Get('fetch-objective-for-challege')
async fetchObjectivesWithoutLimit(@Query('strategyId') strategyId: string) {
  if (!strategyId) return { error: 'strategyId is required' }

  const id = parseInt(strategyId, 10)
  return this.createObjectiveService.getObjectivesWithoutLimit(id)
}

}
