import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async updateNote(id: number, note: string) {
    return this.prisma.orderItem.update({
      where: { id },
      data: { note },
    });
  }
}
