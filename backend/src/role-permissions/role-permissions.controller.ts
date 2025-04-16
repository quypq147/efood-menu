// src/role-permissions/role-permissions.controller.ts
import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll() {
    return this.prisma.rolePermission.findMany({
      select: {
        roleId: true,
        permissionId: true,
      },
    });
  }

  @Post()
  async create(@Body() body: { roleId: number; permissionId: number }) {
    return this.prisma.rolePermission.create({
      data: {
        roleId: body.roleId,
        permissionId: body.permissionId,
      },
    });
  }

  @Delete()
  async delete(@Body() body: { roleId: number; permissionId: number }) {
    return this.prisma.rolePermission.deleteMany({
      where: {
        roleId: body.roleId,
        permissionId: body.permissionId,
      },
    });
  }
}

