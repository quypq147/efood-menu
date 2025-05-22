import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('stats')
  async getStats() {
    const [users, roles, foods, orders] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.role.count(),
      this.prisma.food.count(),
      this.prisma.order.count(),
    ]);
    return { users, roles, foods, orders };
  }
}
