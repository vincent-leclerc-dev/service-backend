import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { toKebabCase } from 'js-convert-case';

interface HttpExceptionResponse {
  statusCode: number,
  message: string | string[],
  error: string
  code?: string,
}

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  static formatErrorCode(errorName: string = ''): string {
    return toKebabCase(errorName.replace(/exception$/i, ''));
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const error = <Error>exception;
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage;
    let errorCode;

    if (exception instanceof HttpException) {
      const response = <HttpExceptionResponse>exception.getResponse();
      httpStatus = exception.getStatus();

      errorMessage = response.message instanceof Array
        ? response.message.join(', ')
        : response.message;

      errorCode = response.code;
    }

    if (!errorMessage) {
      errorMessage = error.message || 'unknown error';
    }

    if (!errorCode) {
      errorCode = AllExceptionsFilter.formatErrorCode(error.name);
    }

    const responseBody = {
      code: errorCode,
      message: errorMessage,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
