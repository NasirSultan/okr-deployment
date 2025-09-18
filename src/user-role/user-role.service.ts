import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  // Assign a role to a user
  async assignRole(data: { userId: string; roleId: number; industryId: number }) {
    const { userId, roleId, industryId } = data;

    // Remove old roles for this user
    await this.prisma.userRole.deleteMany({ where: { userId } });

    // Assign new role
    return this.prisma.userRole.create({
      data: { userId, roleId, industryId },
    });
  }

  // List all active assignments
  async listAssignments() {
    const now = new Date();

    const assignments = await this.prisma.userRole.findMany({
      where: { expiresAt: { gt: now } },
    });

    // Manually populate user, role, industry
    return Promise.all(
      assignments.map(async (a) => {
        const user = await this.prisma.user.findUnique({ where: { id: a.userId } });
        const role = await this.prisma.role.findUnique({ where: { id: a.roleId } });
        const industry = await this.prisma.industry.findUnique({ where: { id: a.industryId } });

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

  // Get assignments for a specific user
  async getAssignmentsByUser(userId: string) {
    const now = new Date();

    const assignments = await this.prisma.userRole.findMany({
      where: { userId, expiresAt: { gt: now } },
    });

    return Promise.all(
      assignments.map(async (a) => {
        const user = await this.prisma.user.findUnique({ where: { id: a.userId } });
        const role = await this.prisma.role.findUnique({ where: { id: a.roleId } });
        const industry = await this.prisma.industry.findUnique({ where: { id: a.industryId } });

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
