import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SoloScoreService, CreateSoloScoreDto } from './solo-score.service';

@Controller('solo-score')
export class SoloScoreController {
  constructor(private readonly soloScoreService: SoloScoreService) {}

  @Post()
  create(@Body() data: CreateSoloScoreDto) {
    return this.soloScoreService.create(data);
  }

  @Get()
  findAll() {
    return this.soloScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soloScoreService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateSoloScoreDto>) {
    return this.soloScoreService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soloScoreService.remove(Number(id));
  }
}
