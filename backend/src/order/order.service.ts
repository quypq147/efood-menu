import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: any) {
    return this.prisma.order.create({
      data: {
        orderNumber: data.orderNumber,
        userId: data.userId ?? null, // <-- Có thể null
        total: data.total,
        serverType: data.serverType,
        status: data.status || 'PENDING',
        items: {
          create: data.items.map((item) => ({
            foodId: item.foodId,
            quantity: item.quantity,
            price: item.price,
            note: item.note,
          })),
        },
      },
      include: { items: true },
    });
  }

  async getOrders() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            food: true, // Lấy thông tin món ăn cho từng item
          },
        },
        user: true, // nếu muốn lấy thông tin user
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  async updateStatus(id: number, status: string) {
  return this.prisma.order.update({
    where: { id },
    data: { status: status as OrderStatus }, // Ép kiểu về enum
  });
}

  async getOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            food: true,
          },
        },
        user: true,
      },
    });
  }
}
