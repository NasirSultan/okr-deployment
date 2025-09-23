// final-certification-evaluation.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { FinalCertificationEvaluationService } from './final-certification-evaluation.service';
import { GenerateScenarioDto } from './dto/generate-scenario.dto';

@Controller('campaign/certification/final-evaluation')
export class FinalCertificationEvaluationController {
  constructor(
    private readonly finalEvaluationService: FinalCertificationEvaluationService,
  ) {}

  @Post()
  async evaluate(@Body() dto: GenerateScenarioDto) {
    return this.finalEvaluationService.evaluate(dto);
  }
}
