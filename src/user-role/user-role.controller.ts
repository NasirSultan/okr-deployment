import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserRoleService } from './user-role.service';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post('assign')
  async assignRole(@Body() body: { user_id: string; role_id: number; industry_id: number }) {
    return this.userRoleService.assignRole(body);
  }

  @Get('list')
  async listAssignments() {
    return this.userRoleService.listAssignments();
  }
    @Get(':user_id')
  async getAssignmentsByUser(@Param('user_id') user_id: string) {
    return this.userRoleService.getAssignmentsByUser(user_id);
  }
}
