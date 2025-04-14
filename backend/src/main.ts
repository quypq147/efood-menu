import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // 👈 BẮT BUỘC để đọc token từ cookie

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // 👈 Cho phép gửi cookie từ FE
  });

  await app.listen(30);
}
bootstrap();

