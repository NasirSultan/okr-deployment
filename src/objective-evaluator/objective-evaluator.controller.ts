import { Controller, Post, Body } from '@nestjs/common';
import { ObjectiveEvaluatorService } from './objective-evaluator.service';

@Controller('ai/objective')
export class ObjectiveEvaluatorController {
  constructor(private readonly evaluatorService: ObjectiveEvaluatorService) {}

  @Post('evaluate')
  async evaluate(@Body() body: { objective: string; strategy: string; role: string; industry: string }) {
    const { objective, strategy, role, industry } = body;
    return await this.evaluatorService.evaluateObjective(objective, strategy, role, industry);
  }
}
