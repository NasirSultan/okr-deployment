import { Module } from '@nestjs/common';
import { CreateChallengeService } from './create-challenge.service';
import { CreateChallengeController } from './create-challenge.controller';

@Module({
  providers: [CreateChallengeService],
  controllers: [CreateChallengeController],
})
export class CreateChallengeModule {}
