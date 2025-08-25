import { Controller, Post, Body, Get, Param ,ParseIntPipe } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('create')
  async createTeam(@Body() body: { title: string; mission: string; createdBy: number ,userId: number}) {

    const result = await this.teamService.createTeam(body.title, body.mission, body.createdBy, body.userId);
    return result; 
  }

  @Post('join')
  async joinTeam(@Body() body: { token: string; userId: number }) {
    return this.teamService.joinTeam(body.token, body.userId);
  }


  @Get(':teamId/members')
  async getTeamMembers(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.getTeamMembers(teamId);
  }


  @Post(':teamId/add-member')
async addMember(
  @Param('teamId', ParseIntPipe) teamId: number,
  @Body() body: { adminId: number; userId: number; role?: string }
) {

  return this.teamService.addMember(teamId, body.adminId, body.userId, body.role);
}


 @Post('auto-add-users')
  async autoAddUsers(
    @Body('teamId') teamId: number,
    @Body('adminId') adminId: number
  ) {
    try {
      const addedMembers = await this.teamService.autoAddUsersToTeam(teamId, adminId);
      if (addedMembers.length === 0) {
        return { message: 'No users were added. Either all users are already in team or team is full.' };
      }
      return { message: 'Users added successfully', members: addedMembers };
    } catch (error) {
      return { message: error.message };
    }



    
  }


  @Post('end-session')
  async endSession(
    @Body('teamId') teamId: number,
    @Body('adminId') adminId: number,
  ) {
    return this.teamService.endTeamSession(teamId, adminId);
  }


}
