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
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';
import { SentryInterceptor } from './common/interceptor/sentry.interceptor';
import * as Sentry from '@sentry/nestjs';

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

  const configService = app.get(ConfigService);
  const stage = configService.get('STAGE');
  const port = parseInt(configService.get('PORT'));

  const SWAGGER_ENVS = ['local', 'dev'];
  if (SWAGGER_ENVS.includes(stage)) {
    app.use(
      ['/docs', 'docs-json'],
      basicAuth({
        challenge: true,
        users: {
          [configService.get('swagger.user')]:
            configService.get('swagger.password'),
        },
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('Better Board')
      .setDescription('NestJS project API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const custom: SwaggerCustomOptions = {
      swaggerOptions: { persistAuthorization: true },
    };
    const swaggerDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, swaggerDocument, custom);
  }

  Sentry.init({ dsn: configService.get('sentry.dsn') });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new SentryInterceptor(),
  );

  await app.listen(port);
  Logger.log(`STAGE=${stage}`);
  Logger.log(`Listening on port ${port}`);
}
bootstrap();
