import { Injectable } from '@nestjs/common'
import { llm } from '../lib/llm/llm'
import { challengePrompt } from '../lib/prompt/createChallenge'

export interface ChallengeInput {
  strategy: string
  objective: string
  keyResult: string
  previousAttempts?: number
  language?: string // optional new field
}

export interface Challenge {
  title: string
  text: string
}

@Injectable()
export class CreateChallengeService {
  private previousChallenges: Challenge[] = []

  async generateChallenge(input: ChallengeInput): Promise<Challenge> {
    const messages = challengePrompt(
      input.strategy,
      input.objective,
      input.keyResult,
      input.previousAttempts || 0,
      input.language || 'English', // default to English
    )

    const response = await llm.call(messages)

    let raw = ''
    if (typeof response === 'string') {
      raw = response
    } else if (response?.content) {
      raw =
        typeof response.content === 'string'
          ? response.content
          : JSON.stringify(response.content)
    } else {
      raw = JSON.stringify(response)
    }

    const cleaned = raw.replace(/```json|```/g, '').trim()

    let challenge: Challenge
    try {
      challenge = JSON.parse(cleaned)
    } catch (err) {
      console.error('Failed to parse Challenge JSON:', cleaned)
      challenge = {
        title: 'Challenge',
        text: cleaned,
      }
    }

    this.previousChallenges.push(challenge)

    return challenge
  }
}
