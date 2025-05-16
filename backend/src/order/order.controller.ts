import { Controller, Patch, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: any) {
    return this.orderService.createOrder(data);
  }

  @Get()
  async findAll() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.getOrderById(Number(id));
  }
  @Get()
  async getAllOrders() {
    return this.orderService.getOrders();
  }
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatus(Number(id), status);
  }
}
