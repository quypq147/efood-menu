import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Put,
  Param,
  Patch,
} from '@nestjs/common';
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
  @Put(':id')
  async updateFoodPut(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.foodService.updateFood(Number(id), data);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Lỗi khi cập nhật món ăn.',
      );
    }
  }

  @Patch(':id')
  async updateFoodPatch(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.foodService.updateFood(Number(id), data);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Lỗi khi cập nhật món ăn.',
      );
    }
  }
}
