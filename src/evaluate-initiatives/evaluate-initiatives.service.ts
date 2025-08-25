import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { evaluateInitiativesPrompt } from '../lib/prompt/evaluateInitiatives';

@Injectable()
export class EvaluateInitiativesService {
  async evaluate(strategy: string, objective: string, keyResult: string, initiatives: string) {
    const prompt = evaluateInitiativesPrompt(strategy, objective, keyResult, initiatives);

    const response = await llm.call([
      {
        role: 'user',
        content: prompt,
      },
    ]);

    // Safely extract text content
    let raw = '';
    if (typeof response.content === 'string') {
      raw = response.content;
    } else if (Array.isArray(response.content)) {
      raw =
        response.content
          .filter((c) => c.type === 'text')
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
