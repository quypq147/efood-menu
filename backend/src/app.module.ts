import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { PermissionController } from './permissons/permissons.controller';
import { PermissonsService } from './permissons/permissons.service';
import { PermissionModule } from './permissons/permissons.module';
import { RolePermissionsController } from './role-permissions/role-permissions.controller';
import { FoodModule } from './food/food.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CategoryModule } from './category/category.module';
import { UploadController } from './uploads/uploads.controller';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';
import { InvoiceModule } from './invoice/invoice.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    RoleModule,
    AuthModule,
    UserModule,
    MailModule,
    PermissionModule,
    FoodModule,
    OrderModule,
    OrderItemModule,
    CategoryModule,
    InvoiceModule,
    AdminModule, // ✅ Import module, không cần re-provide
  ],
  controllers: [AppController, PermissionController, RolePermissionsController, UploadController, InvoiceController, AdminController],
  providers: [AppService, PermissonsService , PrismaService, InvoiceService], 
})
export class AppModule {}

