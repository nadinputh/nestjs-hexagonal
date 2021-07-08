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
    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.log(
            `Remote Address [${request.protocol}]: ${request.ip}`,
          );
          this.logger.log(`X-Request-ID: ${request.headers['X-Request-ID']}`);
        },
        error: (err) => {
          const msg = `${request.method} ${request.path} ${err.status} - ${
            Date.now() - now
          }ms`;
          if (err.status >= 500) this.logger.error(msg);
          this.logger.log(
            `Remote Address [${request.protocol}]: ${request.ip}`,
          );
          this.logger.log(`X-Request-ID: ${request.headers['X-Request-ID']}`);
          this.logger.warn(msg);
        },
        complete: () => {
          const msg = `${request.method} ${request.path} ${
            response.statusCode
          } - ${Date.now() - now}ms`;
          this.logger.log(msg);
        },
      }),
    );
  }
}
