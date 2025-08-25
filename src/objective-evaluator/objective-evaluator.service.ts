import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { predictObjectiveScorePrompt } from '../lib/prompt/predictObjectiveScorePrompt';

@Injectable()
export class ObjectiveEvaluatorService {
  async evaluateObjective(
    objective: string,
    strategy: string,
    role: string,
    industry: string
  ) {
    if (!objective || !strategy || !role || !industry) {
      throw new Error('Objective, strategy, role, and industry are required');
    }

    const prompt = predictObjectiveScorePrompt(objective, strategy, role, industry);
    const response = await llm.invoke(prompt);

    // Convert response.content to string safely
    let raw: string;
    if (typeof response.content === 'string') {
      raw = response.content;
    } else if (Array.isArray(response.content)) {
      // Flatten array of objects to a single string
      raw = response.content.map(item => ('text' in item ? item.text : JSON.stringify(item))).join(' ');
    } else {
      raw = JSON.stringify(response.content);
    }

    // Extract JSON block
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI output');
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      throw new Error('Failed to parse AI JSON output');
    }
  }
}
