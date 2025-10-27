  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import * as dotenv from 'dotenv';

  dotenv.config();

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      credentials: true,
    });
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    await app.listen(process.env.PORT || 3000);
  }
  bootstrap();