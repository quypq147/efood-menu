import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { PrismaModule } from '../prisma.module'; // Import PrismaModule

@Module({
  imports: [PrismaModule], // Import PrismaModule
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
