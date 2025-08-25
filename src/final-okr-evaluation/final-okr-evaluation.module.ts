import { Module } from '@nestjs/common';
import { FinalOkrEvaluationService } from './final-okr-evaluation.service';
import { FinalOkrEvaluationController } from './final-okr-evaluation.controller';

@Module({
  providers: [FinalOkrEvaluationService],
  controllers: [FinalOkrEvaluationController],
})
export class FinalOkrEvaluationModule {}
