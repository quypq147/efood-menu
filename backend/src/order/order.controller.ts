import {
  Controller,
  Patch,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import PDFDocument from 'pdfkit';
import { Req } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  mailService: any;
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
  @Post(':id/invoice')
  async sendInvoice(@Param('id') id: string, @Req() req) {
    const order = await this.orderService.getOrderById(Number(id));
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
    if (order.user?.email) {
      await this.mailService.sendInvoiceEmail(order.user.email, order);
      return { message: 'Đã gửi hóa đơn qua email' };
    }
    // Nếu không có email, trả về hóa đơn dạng JSON
    return { invoice: order };
  }
  @Get(':id/invoice-pdf')
  async downloadInvoicePdf(@Param('id') id: string, @Req() res: Response) {
    const order = await this.orderService.getOrderById(Number(id));
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice_${order.orderNumber}.pdf`,
    );
    doc.pipe(res);

    doc.fontSize(20).text(`HÓA ĐƠN #${order.orderNumber}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('Danh sách món ăn:');
    order.items.forEach((item) => {
      doc.text(`- ${item.food?.name}: ${item.quantity}`);
    });
    doc.moveDown();
    doc.text(`Tổng tiền: ${order.total?.toLocaleString('vi-VN')}₫`);
    doc.end();
  }
}
