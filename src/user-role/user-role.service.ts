import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async assignRole(data: { user_id: string; role_id: number; industry_id: number }) {
    const { user_id, role_id, industry_id } = data;

 
    await this.prisma.user_role.deleteMany({ where: { user_id } });


    return this.prisma.user_role.create({
      data: { user_id, role_id, industry_id },
    });



  
  }

  async listAssignments() {
    const now = new Date();

    const assignments = await this.prisma.user_role.findMany({
      where: { expiresAt: { gt: now } },
    });

    // Manual "populate"
    return Promise.all(
      assignments.map(async (a) => {
        const user = await this.prisma.user.findUnique({ where: { id: a.user_id } });
        const role = await this.prisma.role.findUnique({ where: { id: a.role_id } });
        const industry = await this.prisma.industry.findUnique({ where: { id: a.industry_id } });

        return {
          id: a.id,
          user,
          role,
          industry,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
          expiresAt: a.expiresAt,
        };
      }),
    );
  }



   async getAssignmentsByUser(user_id: string) {
    const now = new Date();

    const assignments = await this.prisma.user_role.findMany({
      where: { user_id, expiresAt: { gt: now } },
    });

    return Promise.all(
      assignments.map(async (a) => {
        const user = await this.prisma.user.findUnique({ where: { id: a.user_id } });
        const role = await this.prisma.role.findUnique({ where: { id: a.role_id } });
        const industry = await this.prisma.industry.findUnique({ where: { id: a.industry_id } });

        return {
          id: a.id,
          user,
          role,
          industry,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
          expiresAt: a.expiresAt,
        };
      }),
    );
  }
}
