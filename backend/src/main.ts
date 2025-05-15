import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Phục vụ tĩnh thư mục uploads (đúng path)
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  console.log('Static uploads path:', join(process.cwd(), 'uploads'));

  app.enableCors({
    origin:  `${process.env.FRONTEND_URL || 'http://localhost:3000'}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(30);
}
bootstrap();
