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


  async assignRoles(
    teamId: number,
    users: { userId: number; role: string }[],
  ): Promise<TeamMemberRole[]> {

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await this.prisma.teamMemberRole.deleteMany({
      where: {
        joinedAt: { lt: oneDayAgo },
      },
    });


    await this.prisma.teamMemberRole.deleteMany({
      where: { teamId },
    });

    const createdRoles: TeamMemberRole[] = [];

    for (const user of users) {
      const roleEntry = await this.prisma.teamMemberRole.create({
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


async getTeamRoles(teamId: number): Promise<any[]> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);


  await this.prisma.teamMemberRole.deleteMany({
    where: {
      joinedAt: { lt: oneDayAgo },
    },
  });


  const roles = await this.prisma.teamMemberRole.findMany({
    where: { teamId },
  });


const userIds = roles.map(r => r.userId.toString());

const users = await this.prisma.user.findMany({
  where: { id: { in: userIds } }, 
  select: { id: true, name: true },
});



const rolesWithUsername = roles.map(role => {
  const user = users.find(u => u.id === role.userId.toString()); // convert number to string
  return {
    id: role.id,
    teamId: role.teamId,
    userId: role.userId,
    username: user ? user.name : null,
    role: role.role,
    joinedAt: role.joinedAt,
  };
});


  return rolesWithUsername;
}

}
