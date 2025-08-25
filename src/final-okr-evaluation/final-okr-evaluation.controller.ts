import { Controller, Post, Body } from '@nestjs/common';
import { FinalOkrEvaluationService } from './final-okr-evaluation.service';

@Controller('final-okr-evaluation')
export class FinalOkrEvaluationController {
  constructor(private readonly finalOkrService: FinalOkrEvaluationService) {}

  @Post()
  async evaluate(@Body() body: {
    strategy: string;
    objective: string;
    keyResult: string;
    challenge: string;
    proposal: string;
  }) {
    const { strategy, objective, keyResult, challenge, proposal } = body;
    return await this.finalOkrService.evaluate(strategy, objective, keyResult, challenge, proposal);
  }
}
