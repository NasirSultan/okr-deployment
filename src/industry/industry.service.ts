import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class IndustryService {
  constructor(private prisma: PrismaService) {}

  async addIndustry(data: { title: string; description: string }) {
    const { title, description } = data;

    if (!title || !description) {
      throw new BadRequestException('All fields are required');
    }

    return this.prisma.industry.create({
      data: { title, description },
    });
  }

  async listIndustries() {
    return this.prisma.industry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
