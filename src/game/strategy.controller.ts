import { Controller, Post, Get, UploadedFile, ParseIntPipe,UseInterceptors,BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StrategyService } from './strategy.service';

@Controller('game')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

 @Post('add-strategy')
  @UseInterceptors(FileInterceptor('file'))
  async addStrategy(
    @Body('title') title: string,
    @Body('cardId') cardId: string,
    @UploadedFile() file: Express.Multer.File | undefined
  ) {
    if (!title) throw new BadRequestException('Title is required');

    const cardIdNumber = Number(cardId?.toString().trim());
    if (isNaN(cardIdNumber)) throw new BadRequestException('cardId must be a number');

    return this.strategyService.addStrategy(title, file, cardIdNumber);
  }

  @Get('random-strategy')
  async getRandomStrategy() {
    return this.strategyService.getRandomStrategy();
  }



@Post('team-strategy')
async startOrGetStrategy(
  @Body('teamId', ParseIntPipe) teamId: number,
  @Body('role') role: string
) {
  return this.strategyService.startOrGetStrategy(teamId, role)
}



}
