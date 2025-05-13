import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async addCategory(name: string) {
    return this.prisma.category.create({
      data: { name },
    });
  }

  async updateCategory(id: number, name: string) {
    return this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  // Thêm danh mục mặc định
  async createDefaultCategories() {
    const defaultCategories = [
      'Món nóng',
      'Món lạnh',
      'Súp',
      'Nướng',
      'Khai vị',
      'Tráng miệng',
    ];

    for (const name of defaultCategories) {
      const existingCategory = await this.prisma.category.findUnique({
        where: { name }, 
      });

      if (!existingCategory) {
        await this.prisma.category.create({
          data: { name },
        });
      }
    }
  }
}
