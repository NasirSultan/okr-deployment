import { Module } from '@nestjs/common';
import { EvaluateInitiativesService } from './evaluate-initiatives.service';
import { EvaluateInitiativesController } from './evaluate-initiatives.controller';

@Module({
  providers: [EvaluateInitiativesService],
  controllers: [EvaluateInitiativesController],
})
export class EvaluateInitiativesModule {}
