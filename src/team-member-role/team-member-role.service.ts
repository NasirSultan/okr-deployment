import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

interface TeamMemberRole {
  id: number;
  userId: number;
  teamId: number;
  role: string;
  joinedAt: Date;
}

@Injectable()
export class TeamMemberRoleService {
  constructor(private prisma: PrismaService) {}

  // Assign roles to users in a team
  async assignRoles(
    teamId: number,
    users: { userId: number; role: string }[],
  ): Promise<TeamMemberRole[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete expired team members
    await this.prisma.teamMember.deleteMany({
      where: {
        joinedAt: { lt: oneDayAgo },
      },
    });

    // Delete existing team members of this team
    await this.prisma.teamMember.deleteMany({
      where: { teamId },
    });

    // Add new roles
    const createdRoles: TeamMemberRole[] = [];
    for (const user of users) {
      const roleEntry = await this.prisma.teamMember.create({
        data: {
          teamId,
          userId: user.userId,
          role: user.role,
          joinedAt: new Date(),
        },
      });
      createdRoles.push(roleEntry);
    }

    return createdRoles;
  }

  // Get roles for a specific team
  async getTeamRoles(teamId: number): Promise<any[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Clean expired team members
    await this.prisma.teamMember.deleteMany({
      where: {
        joinedAt: { lt: oneDayAgo },
      },
    });

    // Fetch all team members
    const roles = await this.prisma.teamMember.findMany({
      where: { teamId },
    });
const userIds = roles.map(r => r.userId.toString()); // userId: string[]

const users = await this.prisma.user.findMany({
  where: { id: { in: userIds } },
  select: { id: true, name: true },
});


    // Map roles with usernames
    return roles.map(role => {
     const user = users.find(u => u.id === role.userId.toString());

      return {
        id: role.id,
        teamId: role.teamId,
        userId: role.userId,
        username: user ? user.name : null,
        role: role.role,
        joinedAt: role.joinedAt,
      };
    });
  }
}
