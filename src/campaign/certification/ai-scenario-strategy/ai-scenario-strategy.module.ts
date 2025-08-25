// src/campaign/certification/ai-scenario-strategy/ai-scenario-strategy.module.ts
import { Module } from '@nestjs/common';
import { AiScenarioStrategyService } from './ai-scenario-strategy.service';
import { AiScenarioStrategyController } from './ai-scenario-strategy.controller';
import { llm } from '../../../lib/llm/llm';

@Module({
  controllers: [AiScenarioStrategyController],
  providers: [
    AiScenarioStrategyService,
    {
      provide: 'LLM', // token for injection
      useValue: llm,  // inject the instance
    },
  ],
})
export class AiScenarioStrategyModule {}
