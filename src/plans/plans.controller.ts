import { Controller, Get, Param } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  // Get all plans
  @Get()
  getPlans() {
    return this.plansService.getAllPlans();
  }

  // Get plan by id
  @Get(':id')
  getPlan(@Param('id') id: string) {
    const planId = Number(id);
    const plan = this.plansService.getPlanById(planId);
    if (!plan) return { message: 'Plan not found' };
    return plan;
  }
}
