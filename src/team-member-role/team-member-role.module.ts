import { Module } from '@nestjs/common';
import { TeamMemberRoleService } from './team-member-role.service';
import { TeamMemberRoleController } from './team-member-role.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [TeamMemberRoleController],
  providers: [TeamMemberRoleService, PrismaService],
})
export class TeamMemberRoleModule {}
