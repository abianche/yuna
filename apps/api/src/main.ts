import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for http://localhost:5173/ with credentials
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const port = Number(process.env.API_PORT ?? 8080);
  await app.listen(port, '0.0.0.0');

  console.log(`API listening on http://0.0.0.0:${port}`);
}

bootstrap();
