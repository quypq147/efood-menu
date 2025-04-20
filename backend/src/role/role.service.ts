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

  async updateRole(
    id: number,
    dto: {
      name?: string;
      description?: string;
      permissionIds?: number[];
      userIds?: number[];
    },
  ) {
    const { name, description, permissionIds = [], userIds = [] } = dto;
  
    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        permissions: {
          deleteMany: {}, // clear old permissions
          createMany: {
            data: permissionIds.map((permissionId) => ({
              permissionId,
            })),
          },
        },
        users: {
          set: userIds.map((id) => ({ id })), // override users of role
        },
      },
      include: {
        permissions: { include: { permission: true } },
        users: true,
      },
    });
  
    return updatedRole;
  }
  
  

  async deleteRole(id: number) {
    // Xóa các quyền liên kết với vai trò trước
    await this.prisma.rolePermission.deleteMany({
      where: { roleId: id },
    });
  
    // Sau đó mới xóa vai trò
    return this.prisma.role.delete({
      where: { id },
    });
  }
  
}


