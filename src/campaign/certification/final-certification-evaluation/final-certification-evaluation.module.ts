import { Module } from '@nestjs/common';
import { FinalCertificationEvaluationService } from './final-certification-evaluation.service';
import { FinalCertificationEvaluationController } from './final-certification-evaluation.controller';


@Module({
  controllers: [FinalCertificationEvaluationController],
  providers: [FinalCertificationEvaluationService],
})
export class FinalCertificationEvaluationModule {}
