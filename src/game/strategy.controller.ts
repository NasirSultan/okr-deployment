import { Controller, Post, Get, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StrategyService } from './strategy.service';

@Controller('game')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Post('add-strategy')
  @UseInterceptors(FileInterceptor('file'))
  async addStrategy(@Body('title') title: string, @UploadedFile() file: Express.Multer.File) {
    return this.strategyService.addStrategy(title, file);
  }

  @Get('random-strategy')
  async getRandomStrategy() {
    return this.strategyService.getRandomStrategy();
  }



  @Post('team-strategy')
  async startOrGetStrategy(@Body() body: { teamId: number; role: string }) {
    const { teamId, role } = body;
    return this.strategyService.startOrGetStrategy(teamId, role);
  }

}
