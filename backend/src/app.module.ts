import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    RoleModule,
    AuthModule,
    UserModule,
    MailModule, // ✅ Import module, không cần re-provide
  ],
  controllers: [AppController],
  providers: [AppService], // ✅ AppService cần thiết để AppController hoạt động
})
export class AppModule {}

