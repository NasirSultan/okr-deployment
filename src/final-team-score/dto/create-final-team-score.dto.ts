// src/final-team-score/dto/create-final-team-score.dto.ts
export class CreateFinalTeamScoreDto {
  userId: string
  teamId: number
  score: number
  title?: string
  alignmentStrategy: number
  objectiveClarity: number
  keyResultQuality: number
  initiativeRelevance: number
  challengeAdoption: number
  time?: string
}
