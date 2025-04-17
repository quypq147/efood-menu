// src/permission/permission.module.ts
import { Module } from '@nestjs/common';
import { PermissionController } from './permissons.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PermissionController],
  providers: [PrismaService],
})
export class PermissionModule {}

