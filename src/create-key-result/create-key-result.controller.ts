import { Controller, Post, Body } from '@nestjs/common';
import { CreateKeyResultService } from './create-key-result.service';

@Controller('key-result')
export class CreateKeyResultController {
  constructor(private readonly krService: CreateKeyResultService) {}

  @Post('/batch')
  async createBatch(@Body() body: { strategy: string; objectives: string[]; role: string }) {
    const { strategy, objectives, role } = body;

    if (!objectives || objectives.length !== 8) {
      return {
        error: 'You must provide exactly 8 objectives'
      };
    }

    return await this.krService.generateKRsForObjectives(strategy, objectives, role);
  }
}
