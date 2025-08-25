import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { KeywordBaseInnovativeService } from './keywordbase-innovative.service';
import { CreateKeywordBaseInnovativeDto } from './dto/create-keywordbase-innovative.dto';
import { UpdateKeywordBaseInnovativeDto } from './dto/update-keywordbase-innovative.dto';

@Controller('keywordbase-innovative')
export class KeywordBaseInnovativeController {
  constructor(private readonly service: KeywordBaseInnovativeService) {}

  @Post()
  create(@Body() dto: CreateKeywordBaseInnovativeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

@Get(':id')
findOne(@Param('id') id: string) {
  return this.service.findOne(Number(id));
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateKeywordBaseInnovativeDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
