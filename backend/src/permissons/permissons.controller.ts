// src/permission/permission.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllPermissions() {
    return this.prisma.permission.findMany();
  }
}

