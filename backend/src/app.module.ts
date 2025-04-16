import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { PermissonsController } from './permissons/permissons.controller';
import { PermissonsService } from './permissons/permissons.service';
import { PermissonsModule } from './permissons/permissons.module';
import { RolePermissionsController } from './role-permissions/role-permissions.controller';

@Module({
  imports: [
    RoleModule,
    AuthModule,
    UserModule,
    MailModule,
    PermissonsModule, // ✅ Import module, không cần re-provide
  ],
  controllers: [AppController, PermissonsController, RolePermissionsController],
  providers: [AppService, PermissonsService], 
})
export class AppModule {}

