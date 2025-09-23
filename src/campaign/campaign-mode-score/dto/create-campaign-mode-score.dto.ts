// dto/create-campaign-mode-score.dto.ts
export class CreateCampaignModeScoreDto {
  userId: string;
  campaignId?: number;
  level: number;
  sector?: string;
  role?: string;

  strategyScore?: number;
  objectiveScore?: number;
  keyResultScore?: number;
  initiativeScore?: number;
  challengeScore?: number;
  strengths?: string;     // new
  improvement?: string;   // new
  totalScore?: number;
}
