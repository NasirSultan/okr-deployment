import { Controller, Post, Get, Body } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  async addRole(@Body() body: { title: string; description: string; exampleText: string }) {
    return this.roleService.addRole(body);
  }

  @Get('list')
  async listRoles() {
    return this.roleService.listRoles();
  }
}
