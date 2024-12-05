import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
            winston.format.ms(),
            utilities.format.nestLike('BetterBoard', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
      ],
    }),
  });

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
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(parseInt(process.env.PORT));
  Logger.log(`STAGE=${process.env.STAGE}`);
  Logger.log(`Listening on port ${process.env.PORT}`);
}
bootstrap();
