import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
const { signTeamToken, verifyTeamToken } = require('../lib/jwt/jwt');

type UserJoinedCallback = (teamId: number, userId: number) => void;

@Injectable()
export class TeamService {
  private userJoinedCallbacks: UserJoinedCallback[] = [];
  private endedTeams: Set<number> = new Set();
  constructor(private prisma: PrismaService) {}

  onUserJoinedTeam(callback: UserJoinedCallback) {
    this.userJoinedCallbacks.push(callback);
  }

  private notifyUserJoined(teamId: number, userId: number) {
    this.userJoinedCallbacks.forEach(cb => cb(teamId, userId));
  }

  async createTeam(title: string, mission: string, createdBy: number, userId: number) {
    const team = await this.prisma.team.create({
      data: { title, mission, createdBy: userId },
    });

    const member = await this.prisma.teamMember.create({
      data: { teamId: team.id, userId, role: 'ADMIN' },
    });

    this.notifyUserJoined(team.id, userId); // Auto add admin to chat

    const token = signTeamToken(team.id);
    return { team, token };
  }

 async joinTeam(token: string, userId: number) {
  const decoded = verifyTeamToken(token);


  const currentMembers = await this.prisma.teamMember.count({
    where: { teamId: decoded.teamId },
  });

  if (currentMembers >= 5) {
    throw new Error('Team member limit reached. Maximum 5 members allowed.');
  }

  const member = await this.prisma.teamMember.create({
    data: { teamId: decoded.teamId, userId, role: 'PLAYER' },
  });

  this.notifyUserJoined(decoded.teamId, userId); 
  return member;
}


  async getTeamMembers(teamId: number) {
    return this.prisma.teamMember.findMany({
      where: { teamId },
      select: { id: true, teamId: true, userId: true, role: true, joinedAt: true },
    });
  }

 async addMember(teamId: number, adminId: number, userId: number, role: string = 'PLAYER') {
  const isAdmin = await this.prisma.teamMember.findFirst({
    where: { teamId, userId: adminId, role: 'ADMIN' },
  });

  if (!isAdmin) throw new Error('Only Admin can add members to this team');


  const currentMembers = await this.prisma.teamMember.count({
    where: { teamId },
  });

  if (currentMembers >= 5) {
    throw new Error('Team member limit reached. Maximum 5 members allowed.');
  }

  const member = await this.prisma.teamMember.create({
    data: { teamId, userId, role },
  });

  this.notifyUserJoined(teamId, userId); 
  return member;
}


async autoAddUsersToTeam(teamId: number, adminId: number) {

  const isAdmin = await this.prisma.teamMember.findFirst({
    where: { teamId, userId: adminId, role: 'ADMIN' },
  });
  if (!isAdmin) throw new Error('Only Admin can auto-add members');


  const usersToAdd = await this.prisma.userAutoJoin.findMany({
    where: { allowed: true },
    select: { userId: true },
  });


  let currentMembers = await this.prisma.teamMember.count({ where: { teamId } });

  const MAX_MEMBERS = 5;


  const addedMembers: {
    id: number;
    userId: number;
    role: string;
    joinedAt: Date;
    teamId: number;
  }[] = [];

  for (const user of usersToAdd) {
    if (currentMembers >= MAX_MEMBERS) break; 


    const existing = await this.prisma.teamMember.findFirst({
      where: { teamId, userId: user.userId },
    });
    if (existing) continue;

    const member = await this.prisma.teamMember.create({
      data: { teamId, userId: user.userId, role: 'PLAYER' },
    });

    this.notifyUserJoined(teamId, user.userId);
    addedMembers.push(member);

    currentMembers++; 
  }

  return addedMembers;
}


async endTeamSession(teamId: number, adminId: number) {

  const admin = await this.prisma.teamMember.findFirst({
    where: { teamId, userId: adminId, role: 'ADMIN' },
  });

  if (!admin) {
    throw new Error('Only Admin can end the team session');
  }


await this.prisma.session.deleteMany({
  where: { teamId },
});


  return { message: 'Team session ended successfully' };
}


}
