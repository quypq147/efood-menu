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
import { Req, Res } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';

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
  async downloadInvoicePdf(@Param('id') id: string, @Res() res: Response) {
    const order = await this.orderService.getOrderById(Number(id));
    if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');

    // Đọc template HTML
    const templatePath = path.join(
      process.env.NODE_ENV === 'production'
        ? path.join(__dirname, 'templates', 'invoice-template.html')
        : path.join(process.cwd(), 'templates', 'invoice-template.html'),
    );
    const html = fs.readFileSync(templatePath, 'utf-8');

    // Compile template với Handlebars
    Handlebars.registerHelper('multiply', (a, b) => a * b);
    const template = Handlebars.compile(html);
    const htmlContent = template({
      orderNumber: order.orderNumber,
      createdAt: new Date(order.createdAt).toLocaleString('vi-VN'),
      items: order.items,
      total: order.total?.toLocaleString('vi-VN'),
    });

    // Render PDF bằng Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice_${order.orderNumber}.pdf`,
    );
    res.end(pdfBuffer);
  }
}
