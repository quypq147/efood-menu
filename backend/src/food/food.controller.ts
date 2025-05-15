import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

@Post()
async addFood(@Body() data: any) {
  try {
    console.log('Dữ liệu nhận từ frontend:', data); // Log dữ liệu để kiểm tra
    return await this.foodService.addFood(data);
  } catch (error) {
    console.error('Lỗi khi thêm món ăn:', error.message);
    throw new BadRequestException(error.message || 'Lỗi khi thêm món ăn.');
  }
}
  @Get()
  async getAllFoods() {
    return this.foodService.getAllFoods(); // Gọi phương thức từ FoodService
  }
}
  