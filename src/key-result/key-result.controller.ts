import { Controller, Get, Post, Body, Param, Delete,Query } from '@nestjs/common';
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

 @Get('by-strategy')
  async getByStrategy(@Query('strategyId') strategyId: string) {
    if (!strategyId) return { error: 'strategyId is required' }
    const id = parseInt(strategyId, 10)
    return this.service.findByStrategy(id)
  }


}
