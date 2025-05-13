import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Post()
  async addCategory(@Body() body: { name: string }) {
    return this.categoryService.addCategory(body.name);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() body: { name: string }) {
    return this.categoryService.updateCategory(Number(id), body.name);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(Number(id));
  }

  // Endpoint để tạo danh mục mặc định
  @Post('default')
  async createDefaultCategories() {
    await this.categoryService.createDefaultCategories();
    return { message: 'Default categories created successfully' };
  }
}
