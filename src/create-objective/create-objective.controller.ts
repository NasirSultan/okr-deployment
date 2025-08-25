import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateObjectiveService } from './create-objective.service';

@Controller('objectives')
export class CreateObjectiveController {
  constructor(private readonly createObjectiveService: CreateObjectiveService) {}

  @Post('generate')
  async generateObjectives(@Body() body: { strategyId: number; strategy: string; role: string; industry: string }) {
    const { strategyId, strategy, role, industry } = body;
    return this.createObjectiveService.generateAndSaveObjectives(strategyId, strategy, role, industry);
  }

  @Get()
  async fetchObjectives(@Query('strategyId') strategyId?: string) {
    const id = strategyId ? parseInt(strategyId, 10) : undefined;
    return this.createObjectiveService.getObjectives(id);
  }
}
