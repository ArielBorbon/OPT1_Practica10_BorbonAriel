import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DominioExceptionFilter } from './comun/filtros/dominio-excepcion.filter';
import { SobreInterceptor } from './comun/interceptores/sobre.interceptor';
import { LoggingInterceptor } from './comun/interceptores/logging.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  app.enableCors({
    origin: ['http://localhost:5173'],
    exposedHeaders: ['Location', 'X-Request-Id'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));


  app.useGlobalFilters(new DominioExceptionFilter());

  app.useGlobalInterceptors(new LoggingInterceptor(), new SobreInterceptor());






  const config = new DocumentBuilder()
    .setTitle('API del Gimnasio')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documento);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
