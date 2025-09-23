import { Injectable } from '@nestjs/common'
import { PrismaService } from '../lib/prisma/prisma.service'

interface TeamMemberRole {
  id: number
  userId: string
  teamId: number
  role: string
  joinedAt: Date
}

@Injectable()
export class TeamMemberRoleService {
  constructor(private prisma: PrismaService) {}

  async assignRoles(
    teamId: number,
    users: { userId: string; role: string }[],
  ): Promise<TeamMemberRole[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    await this.prisma.teamMember.deleteMany({
      where: { joinedAt: { lt: oneDayAgo } },
    })

    await this.prisma.teamMember.deleteMany({
      where: { teamId },
    })

    const createdRoles: TeamMemberRole[] = []
    for (const user of users) {
      const roleEntry = await this.prisma.teamMember.create({
        data: {
          teamId,
          userId: user.userId,
          role: user.role,
          joinedAt: new Date(),
        },
      })
      createdRoles.push(roleEntry)
    }

    return createdRoles
  }

  async getTeamRoles(teamId: number): Promise<any[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    await this.prisma.teamMember.deleteMany({
      where: { joinedAt: { lt: oneDayAgo } },
    })

    const roles = await this.prisma.teamMember.findMany({
      where: { teamId },
    })

    const userIds = roles.map(r => r.userId)

    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true },
    })

    return roles.map(role => {
      const user = users.find(u => u.id === role.userId)

      return {
        id: role.id,
        teamId: role.teamId,
        userId: role.userId,
        username: user ? user.name : null,
        role: role.role,
        joinedAt: role.joinedAt,
      }
    })
  }
}
