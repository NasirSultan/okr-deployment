import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService, PrismaService],
})
export class UserRoleModule {}
