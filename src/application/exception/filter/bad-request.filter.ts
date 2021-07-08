import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { I18nService } from 'nestjs-i18n';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  async catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = ctx.getRequest().i18nLang;
    const status = exception.getStatus();
    const errors = exception.getResponse() as any;

    const errs = {};
    for (const field in errors?.errors) {
      const constraints = {};
      for (const constraint in errors?.errors[field]) {
        const error = errors?.errors[field][constraint] as {
          key: string;
          args: Record<string, any>;
        };
        const message = await this.i18n.translate(error.key, {
          args: error.args,
          lang,
        });
        constraints[constraint] = message;
      }
      errs[field] = constraints;
    }

    let message = errors.message as {
      key: string;
      args: Record<string, any>;
    };

    message = await this.i18n.translate(message.key, {
      lang: ctx.getRequest().i18nLang,
    });

    response.status(status).json({
      status,
      ...errors,
      message,
      errors: errs,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
