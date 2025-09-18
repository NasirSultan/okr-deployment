import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { krPrompt } from '../lib/prompt/createKeyResult';

export interface KeyResultItem {
  id: number;
  title: string;
  description: string;
}

export interface KeyResultBatch {
  strategy: string;
  objective: string;
  role: string;
  keyResults: KeyResultItem[];
}

@Injectable()
export class CreateKeyResultService {
  private async generateKRsForObjective(
    strategy: string,
    objective: string,
    role: string
  ): Promise<KeyResultItem[]> {
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

    let idCounter = 1;

    for (const objective of objectives) {
      const keyResults = await this.generateKRsForObjective(
        strategy,
        objective,
        role
      );

      // assign sequential IDs if missing
      keyResults.forEach(kr => {
        if (!kr.id) {
          kr.id = idCounter++;
        } else {
          idCounter = kr.id + 1;
        }
      });

      results.push({
        strategy,
        objective,
        role,
        keyResults,
      });
    }

    return results;
  }
}
