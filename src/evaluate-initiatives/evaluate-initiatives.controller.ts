import { Controller, Post, Body } from '@nestjs/common';
import { EvaluateInitiativesService } from './evaluate-initiatives.service';

@Controller('evaluate-initiatives')
export class EvaluateInitiativesController {
  constructor(private readonly evaluateService: EvaluateInitiativesService) {}

  @Post()
  async evaluate(@Body() body: { strategy: string; objective: string; keyResult: string; initiatives: string }) {
    const { strategy, objective, keyResult, initiatives } = body;
    return await this.evaluateService.evaluate(strategy, objective, keyResult, initiatives);
  }
}
