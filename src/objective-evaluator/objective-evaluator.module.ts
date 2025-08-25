import { Module } from '@nestjs/common';
import { ObjectiveEvaluatorService } from './objective-evaluator.service';
import { ObjectiveEvaluatorController } from './objective-evaluator.controller';

@Module({
  controllers: [ObjectiveEvaluatorController],
  providers: [ObjectiveEvaluatorService],
})
export class ObjectiveEvaluatorModule {}
