import { IsString } from 'class-validator';

export class GenerateScenarioDto {
  @IsString()
  scenarioContext: string;

  @IsString()
  selectedStrategy: string;

  @IsString()
  userObjective: string;

  @IsString()
  userKeyResult1: string;

  @IsString()
  userKeyResult2: string;

  @IsString()
  userInitiative1KR1: string;

  @IsString()
  userInitiative2KR1: string;

  @IsString()
  userInitiative1KR2: string;

  @IsString()
  userInitiative2KR2: string;
}
