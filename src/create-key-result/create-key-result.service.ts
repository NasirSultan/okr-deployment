

import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { krPrompt } from '../lib/prompt/createKeyResult';


export interface KeyResultBatch {
  strategy: string;
  objective: string;
  role: string;
  keyResults: string[];
}

@Injectable()
export class CreateKeyResultService {

  private async generateKRsForObjective(strategy: string, objective: string, role: string): Promise<string[]> {
    const prompt = krPrompt(strategy, objective, role);
    const messages = [{ role: 'user', content: prompt }];

    const response = await llm.call(messages);
    const text = 'text' in response ? response.text : response;

   
    const cleanedText = text.replace(/```json|```/g, '').trim();

    try {
      const parsed = JSON.parse(cleanedText);
      return parsed.keyResults || [];
    } catch (err) {
      console.error('Failed to parse Key Results JSON:', cleanedText);
      return [];
    }
  }

 
  public async generateKRsForObjectives(
    strategy: string,
    objectives: string[],
    role: string
  ): Promise<KeyResultBatch[]> {
    const results: KeyResultBatch[] = [];

    for (const objective of objectives) {
      const keyResults = await this.generateKRsForObjective(strategy, objective, role);
      results.push({
        strategy,
        objective,
        role,
        keyResults
      });
    }

    return results;
  }


  
}
