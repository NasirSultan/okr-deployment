import { Controller, Post, Body, Param, Get, ParseIntPipe } from '@nestjs/common'
import { TeamMemberRoleService } from './team-member-role.service'

@Controller('team-member-role')
export class TeamMemberRoleController {
  constructor(private readonly service: TeamMemberRoleService) {}

@Post(':teamId/assign')
async assignRoles(
  @Param('teamId', ParseIntPipe) teamId: number,
  @Body('users') users: { userId: string; role: string }[],
): Promise<any[]> {
  return this.service.assignRoles(teamId, users)
}


  @Get(':teamId')
  async getTeamRoles(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.service.getTeamRoles(teamId)
  }
}
