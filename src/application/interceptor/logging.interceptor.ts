import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    this.logger.log(`X-Request-ID: ${request.headers['X-Request-ID']}`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const msg = `${request.method} ${request.url} ${
          response.statusCode
        } - ${Date.now() - now}ms`;
        if (response.statusCode >= 500) this.logger.error(msg);
        this.logger.log(msg);
      }),
    );
  }
}
