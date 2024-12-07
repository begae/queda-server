import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable } from 'rxjs';
import * as Sentry from '@sentry/nestjs';
import { IncomingWebhook } from '@slack/webhook';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const { url } = request;
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
        webhook.send({
          attachments: [
            {
              text: 'better board error occurred',
              fields: [
                {
                  title: `Error message: ${error.response?.message} || ${error.message}`,
                  value: `URL: ${url}\n${error.stack}`,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(),
            },
          ],
        });
        throw error;
      }),
    );
  }
}
