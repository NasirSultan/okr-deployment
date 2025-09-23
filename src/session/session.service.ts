import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

 async getSessionByToken(token: string) {
  const session = await this.prisma.session.findUnique({ where: { token } })
  if (!session) return null
  return {
    ...session,
    isStarted: !!session.startedAt 
  }
}

}
