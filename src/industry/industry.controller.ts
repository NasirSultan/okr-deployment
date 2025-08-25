import { Controller, Post, Get, Body } from '@nestjs/common';
import { IndustryService } from './industry.service';

@Controller('industry')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Post('add')
  async addIndustry(@Body() body: { title: string; description: string }) {
    return this.industryService.addIndustry(body);
  }

  @Get('list')
  async listIndustries() {
    return this.industryService.listIndustries();
  }
}
