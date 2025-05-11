import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async addFood(data: { name: string; description: string; price: number; quantity: number; image: string }) {
    return this.prisma.food.create({
      data,
    });
  }
}