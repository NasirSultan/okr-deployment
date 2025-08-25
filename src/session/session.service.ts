import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async getSessionByToken(token: string) {
    return this.prisma.session.findUnique({ where: { token } });
  }
}
