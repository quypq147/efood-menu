import { Controller, Patch, Param, Body } from '@nestjs/common';
import { OrderItemService } from './order-item.service';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Patch(':id/note')
  async updateNote(@Param('id') id: string, @Body('note') note: string) {
    return this.orderItemService.updateNote(Number(id), note);
  }
}
