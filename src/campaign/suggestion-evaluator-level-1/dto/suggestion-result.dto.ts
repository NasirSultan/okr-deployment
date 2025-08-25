export class SuggestionResultDto {
  title: string; 
  feedback: string;
  breakdown: {
    strategyAlignment: string; 
    objectiveAlignment: string;
    keyResultQuality: string; 
  };
  gamification?: {
    badgeHint: string[];
    visualFeedback: string[];
  };
}
