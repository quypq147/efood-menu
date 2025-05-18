import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  // backend/src/invoice/invoice.service.ts
  async createInvoice(
    orderId: number,
    total: number,
    customerName?: string,
    customerPhone?: string,
    paymentType?: string,
  ) {
    return this.prisma.invoice.create({
      data: {
        orderId,
        total,
        customerName,
        customerPhone,
        paymentType,
        status: 'PAID',
      },
    });
  }
}
