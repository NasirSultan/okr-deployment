import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  providers: [SessionService, PrismaService],
  exports: [SessionService],
})
export class SessionModule {}
