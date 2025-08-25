import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { challengePrompt } from '../lib/prompt/createChallenge';

export interface ChallengeInput {
  strategy: string;
  objective: string;
  keyResult: string;
  previousAttempts?: number;
}

export interface Challenge {
  title: string;
  text: string;
}

@Injectable()
export class CreateChallengeService {
  private previousChallenges: Challenge[] = [];

  async generateChallenge(input: ChallengeInput): Promise<Challenge> {

    const messages = challengePrompt(
      input.strategy,
      input.objective,
      input.keyResult,
      input.previousAttempts || 0
    );


    const response = await llm.call(messages);

    let challenge: Challenge;

    try {

      const text = typeof response === 'string' ? response : JSON.stringify(response);
      const cleaned = text.replace(/```json|```/g, '').trim();

      challenge = JSON.parse(cleaned);
    } catch (err) {
      console.error('Failed to parse Challenge JSON:', response);
      challenge = {
        title: 'Challenge',
        text: typeof response === 'string' ? response : JSON.stringify(response)
      };
    }


























   
    this.previousChallenges.push(challenge);

    return challenge;
  }
}
