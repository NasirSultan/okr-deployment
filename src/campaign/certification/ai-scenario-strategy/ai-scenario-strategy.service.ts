import { Injectable, Inject } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { generateScenarioPrompt } from '../../../lib/prompt/scenario-strategy.prompt';
import { GenerateScenarioDto } from './dto/generate-scenario.dto';

@Injectable()
export class AiScenarioStrategyService {
  constructor(
    @Inject('LLM') private readonly llm: ChatOpenAI,
  ) {}

  async generateScenario(data: GenerateScenarioDto) {
    const prompt = generateScenarioPrompt(data.sector, data.role);
    const messages = [new HumanMessage(prompt)];
    const response = await this.llm.call(messages);

    // Extract text safely
    let text: string;
    if (Array.isArray(response.content)) {
      text = response.content.map((c: any) => c.text ?? '').join('');
    } else {
      text = String(response.content);
    }

    // Try parsing JSON
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error(`Failed to parse scenario generation result. Raw response: ${text}`);
      }
    }

    // Shuffle strategies
    const strategies = parsed.strategies;
    const correctId = parsed.correct_strategy_id;

    // Find correct strategy object
    const correctStrategy = strategies.find((s: any) => s.id === correctId);

    // Shuffle array
    const shuffled = [...strategies].sort(() => Math.random() - 0.5);

    // Reassign IDs 1..n
    shuffled.forEach((s, i) => (s.id = i + 1));

    // Find new index of correct strategy
    const newCorrectId = shuffled.find((s) => s.text === correctStrategy.text)?.id;

    return {
      scenario: parsed.scenario,
      strategies: shuffled,
      correct_strategy_id: newCorrectId,
    };
  }
}
