import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  getAllRoles() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: { permission: true },
        },
        users: true,
      },
    });
  }

  createRole(data: { name: string }) {
    return this.prisma.role.create({ data });
  }

  async updateRole(id: number, dto: { name?: string; permissionIds?: number[] }) {
    const role = await this.prisma.role.update({
      where: { id },
      data: {
        name: dto.name,
        permissions: dto.permissionIds
          ? {
              deleteMany: {},
              create: dto.permissionIds.map((pid) => ({
                permissionId: pid,
              })),
            }
          : undefined,
      },
    });
    return role;
  }

  deleteRole(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}


