import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  async getAllFoods() {
    return this.prisma.food.findMany(); // Truy vấn tất cả món ăn từ database
  }
  
  async getFoodById(id: number | string) {
    const foodId = Number(id);
  if (isNaN(foodId)) throw new Error('Invalid food id');
    return this.prisma.food.findUnique({
      where: { id: foodId },
    });
  }
  async addFood(data: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    categoryId: number;
  }) {
    const categoryExists = await this.prisma.category.findUnique({
    where: { id: data.categoryId },
  });
  if (!categoryExists) {
    throw new Error('Danh mục không tồn tại.');
  }
    return this.prisma.food.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity ?? 0,
        image: data.image,
        category: {
          connect: { id: data.categoryId },
        },
      },
    });
  }
  async updateFood(id: number, data: {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;
  categoryId?: number;
}) {
  if (data.categoryId) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!categoryExists) {
      throw new Error('Danh mục không tồn tại.');
    }
  }
  return this.prisma.food.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      image: data.image,
      categoryId: data.categoryId,
    },
  });
}
}
