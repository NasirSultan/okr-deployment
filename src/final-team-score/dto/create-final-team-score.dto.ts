// src/final-team-score/dto/create-final-team-score.dto.ts
export class CreateFinalTeamScoreDto {
  userId: number;
  teamId: number;
  teamName: string;

  score: number;
  scor?: number;
  percentage: number;
  alignmentStrategy: number;
  objectiveClarity: number;
  keyResultQuality: number;
  initiativeRelevance: number;
  challengeAdoption: number;

  badge?: string;
  trophy?: string;
}
