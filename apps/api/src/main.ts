import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend with credentials
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  const port = Number(process.env.API_PORT ?? 8080);
  await app.listen(port, '0.0.0.0');

  console.log(`API listening on http://0.0.0.0:${port}`);
}

bootstrap(); // NOSONAR
