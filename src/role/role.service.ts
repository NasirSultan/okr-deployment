import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async addRole(data: { title: string; description: string; exampleText: string }) {
    const { title, description, exampleText } = data;

    if (!title || !description || !exampleText) {
      throw new BadRequestException('All fields are required');
    }

    return this.prisma.role.create({
      data: { title, description, exampleText },
    });
  }

  async listRoles() {
    return this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
