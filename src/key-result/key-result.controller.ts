import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { KeyResultService } from './key-result.service';

@Controller('key-result')
export class KeyResultController {
  constructor(private readonly service: KeyResultService) {}

  @Post()
  async create(@Body() data: { objectiveId: number; strategyId?: number; text: string }) {
    return this.service.create(data);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

@Get('objective/:id')
async findByObjective(@Param('id') objectiveId: string) {
  return this.service.findByObjective(Number(objectiveId));
}


  @Delete('strategy/:id')
  async deleteByStrategy(@Param('id') strategyId: number) {
    return this.service.deleteByStrategy(Number(strategyId));
  }
}
