// controller/ai-scenario-strategy.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AiScenarioStrategyService } from './ai-scenario-strategy.service';
import { GenerateScenarioDto } from './dto/generate-scenario.dto';

@Controller('campaign/certification/ai-scenario-strategy')
export class AiScenarioStrategyController {
  constructor(private readonly service: AiScenarioStrategyService) {}

  @Post('generate')
  async generateScenario(@Body() dto: GenerateScenarioDto) {
    return this.service.generateScenario(dto)
  }
}
