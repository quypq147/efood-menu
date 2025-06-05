import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderStatus } from '@prisma/client';

function generateOrderNumber() {
  // Ví dụ: số ngẫu nhiên 5 chữ số, hoặc bạn có thể dùng nanoid, uuid, hoặc timestamp
  return Math.floor(10000 + Math.random() * 90000).toString();
}
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: any) {
    for (const item of data.items) {
      const foodId = item.foodId ?? item.id;
      if (!foodId) throw new Error('Thiếu foodId hoặc id trong item!');
      const food = await this.prisma.food.findUnique({
        where: { id: foodId },
      });
      if (!food) throw new Error(`Món ăn không tồn tại`);
      if (food.quantity < item.quantity) {
        throw new Error(
          `Món "${food.name}" không đủ số lượng (${food.quantity} còn lại)`,
        );
      }
    }
    for (const item of data.items) {
      const foodId = item.foodId ?? item.id;
      await this.prisma.food.update({
        where: { id: foodId },
        data: { quantity: { decrement: item.quantity } },
      });
    }
    return this.prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: data.userId ?? null,
        total: data.total ?? 0,
        serverType: data.serveType ?? data.serverType ?? 'dine-in',
        status: data.status || 'PENDING',
        items: {
          create: data.items.map((item) => ({
            foodId: item.foodId ?? item.id,
            quantity: item.quantity,
            price: item.price ?? 0,
            note: item.note ?? '',
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
