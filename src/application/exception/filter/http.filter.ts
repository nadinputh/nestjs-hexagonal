import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { statusToError } from 'src/constant/http-error.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const res = exception.getResponse() as any;

    let message = res.message as {
      key: string;
      args: Record<string, any>;
    };

    try {
      message = await this.i18n.translate(message.key, {
        lang: ctx.getRequest().i18nLang,
        args: message.args,
      });
    } catch (error) {}

    response.status(exception.getStatus()).json({
      status: exception.getStatus(),
      error: statusToError(exception.getStatus()),
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
