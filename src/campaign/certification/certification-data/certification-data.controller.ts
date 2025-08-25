import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CertificationDataService } from './certification-data.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { AddObjectiveDto } from './dto/add-objective.dto';
import { AddKeyResultsDto } from './dto/add-keyresults.dto';
import { AddInnovativesDto } from './dto/add-innovatives.dto';

@Controller('certification-data')
export class CertificationDataController {
  constructor(private service: CertificationDataService) {}

  @Post('challenge')
  createChallenge(@Body() dto: CreateChallengeDto) {
    return this.service.createChallenge(dto);
  }

  @Post('objective')
  addObjective(@Body() dto: AddObjectiveDto) {
    return this.service.addObjective(dto);
  }

  @Post('keyresults')
  addKeyResults(@Body() dto: AddKeyResultsDto) {
    return this.service.addKeyResults(dto);
  }

  @Post('innovatives')
  addInnovatives(@Body() dto: AddInnovativesDto) {
    return this.service.addInnovatives(dto);
  }

  @Get('challenge-record/:id')
  getChallenge(@Param('id') id: string) {
    return this.service.getChallengeResult(Number(id));
  }
}
