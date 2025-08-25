import { Module } from '@nestjs/common';
import { CreateKeyResultService } from './create-key-result.service';
import { CreateKeyResultController } from './create-key-result.controller';

@Module({
  providers: [CreateKeyResultService],
  controllers: [CreateKeyResultController],
})
export class CreateKeyResultModule {}
