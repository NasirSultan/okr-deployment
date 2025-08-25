import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { finalOkrEvaluationPrompt } from '../lib/prompt/finalOkrEvaluation';

@Injectable()
export class FinalOkrEvaluationService {
  async evaluate(
    strategy: string,
    objective: string,
    keyResult: string,
    challenge: string,
    proposal: string
  ) {
    const prompt = finalOkrEvaluationPrompt(strategy, objective, keyResult, challenge, proposal);

    const response = await llm.call([
      { role: 'user', content: prompt }
    ]);

    let raw = '';
    if (typeof response.content === 'string') {
      raw = response.content;
    } else if (Array.isArray(response.content)) {
      raw = response.content
        .filter((c: any) => c.type === 'text')
        .map((c: any) => c.text)
        .join(' ')
        .trim();
    }

    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in LLM response');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      throw new Error(`Failed to parse LLM response: ${error.message}`);
    }
  }
}
