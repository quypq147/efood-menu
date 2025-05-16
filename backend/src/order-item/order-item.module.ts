import { Module } from '@nestjs/common';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { PrismaModule } from '../prisma.module'; // Nếu bạn có PrismaModule

@Module({
  imports: [PrismaModule], // Thêm dòng này
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
