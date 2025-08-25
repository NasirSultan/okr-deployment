import { Module } from '@nestjs/common';
import { SuggestionEvaluatorService } from './suggestion-evaluator.service';
import { SuggestionEvaluatorController } from './suggestion-evaluator.controller';

@Module({
  providers: [SuggestionEvaluatorService],
  controllers: [SuggestionEvaluatorController],
})
export class SuggestionEvaluatorModule {}
