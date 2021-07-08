import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpError } from './constant/http-error.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errs = {};
        errors.forEach((error) => {
          const constraints = {};
          for (const key in error?.constraints) {
            try {
              constraints[key] = JSON.parse(error?.constraints[key]);
            } catch (e) {
              constraints[key] = { key: error?.constraints[key] };
            }
          }
          errs[error.property] = constraints;
        });
        throw new BadRequestException({
          message: { key: 'exceptions.bad_request' },
          errors: errs,
          error: HttpError.BAD_REQUEST,
        });
      },
    }),
  );
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
