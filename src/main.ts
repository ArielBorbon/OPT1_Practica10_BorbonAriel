import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";
import { ValidationPipe } from '@nestjs/common';
import { DominioExcepcionFilter } from './comun/filtros/dominio-excepcion.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  app.enableCors({
    origin: ['http://localhost:3000', 'https://mipaginaweb.com'],
    exposedHeaders: ['Location', 'X-Request-Id'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  app.useGlobalFilters(new DominioExcepcionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
