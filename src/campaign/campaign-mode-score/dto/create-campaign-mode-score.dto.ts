export class CreateCampaignModeScoreDto {
  userId: number;
  campaignId: number;
  level: number;
  sector?: string;
  role?: string;

  strategyScore?: number;
  objectiveScore?: number;
  keyResultScore?: number;
  initiativeScore?: number;
  challengeScore?: number;
  totalScore?: number;
}
