import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async addFood(@Body() data: any) {
    try {
      return await this.foodService.addFood(data);
    } catch (error) {
      throw new BadRequestException(error.message || 'Lỗi khi thêm món ăn.');
    }
  }
  @Get()
  async getAllFoods() {
    return this.foodService.getAllFoods(); // Gọi phương thức từ FoodService
  }
}
