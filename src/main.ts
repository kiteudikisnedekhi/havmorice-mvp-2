import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();  // Load .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://havmorice-mvp-frontend-2-production.up.railway.app',  // Allow frontend origin
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();