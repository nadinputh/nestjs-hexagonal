import { HttpStatus } from '@nestjs/common';

export enum HttpError {
  BAD_REQUEST = 'Bad Request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  METHOD_NOT_ALLOWED = 'Method Not Allowed',
  NOT_ACCEPTABLE = 'Not Acceptance',
  TOO_MANY_REQUESTS = 'Too Many Requests',
  INTERNAL_SERVER = 'Internal Server Error',
}

export const statusToError = (status: number) => {
  if (status === HttpStatus.BAD_REQUEST) return HttpError.BAD_REQUEST;
  if (status === HttpStatus.UNAUTHORIZED) return HttpError.UNAUTHORIZED;
  if (status === HttpStatus.FORBIDDEN) return HttpError.FORBIDDEN;
  if (status === HttpStatus.NOT_FOUND) return HttpError.NOT_FOUND;
  if (status === HttpStatus.METHOD_NOT_ALLOWED)
    return HttpError.METHOD_NOT_ALLOWED;
  if (status === HttpStatus.NOT_ACCEPTABLE) return HttpError.NOT_ACCEPTABLE;
  if (status === HttpStatus.TOO_MANY_REQUESTS)
    return HttpError.TOO_MANY_REQUESTS;
  return HttpError.INTERNAL_SERVER;
};
