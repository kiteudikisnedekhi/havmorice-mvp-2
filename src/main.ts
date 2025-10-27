  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { Request, Response, NextFunction } from 'express';  // Add this import
  import * as dotenv from 'dotenv';

  dotenv.config();

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Define your CORS options
    const corsOptions = {
      origin: 'https://havmorice-mvp-frontend-2-production.up.railway.app', // Replace with your Next.js project URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    };

    // Enable CORS with your options
    app.enableCors(corsOptions);
    // app.enableCors({
    //   origin: '*',
    //   credentials: true,
    // });
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    await app.listen(process.env.PORT || 3000);
  }
  bootstrap();