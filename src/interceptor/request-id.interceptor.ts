import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  private readonly X_REQUEST_ID = 'X-Request-ID';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let id = request.get(this.X_REQUEST_ID);

    if (!id) {
      id = uuidv4();
    }

    request.headers[this.X_REQUEST_ID] = id;
    response.setHeader(this.X_REQUEST_ID, id);

    return next.handle();
  }
}
