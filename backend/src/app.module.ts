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

@Module({
  imports: [
    RoleModule,
    AuthModule,
    UserModule,
    MailModule,
    PermissionModule, // ✅ Import module, không cần re-provide
  ],
  controllers: [AppController, PermissionController, RolePermissionsController],
  providers: [AppService, PermissonsService , PrismaService], 
})
export class AppModule {}

