import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Better Board')
    .setDescription('NestJS project API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerCustomization: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerCustomization);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(parseInt(process.env.PORT));
  console.info(`STAGE=${process.env.STAGE}`);
  console.info(`Listening on port ${process.env.PORT}`);
}
bootstrap();
