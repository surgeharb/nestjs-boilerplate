import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ERR = 'Oops, something bad happened :(';

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (response.headersSent) { return; }

    let status = 500;
    if (exception.getStatus) {
      status = exception.getStatus();
    } else if (exception.status) {
      status = exception.status;
    }

    const message = exception.message || ERR;
    const isDev = (process.env.NODE_ENV === 'development');

    if (status < 500) {
      response.locals.message = message;
    } else {
      response.locals.message = isDev ? message : ERR;
    }

    if (!status || status === 500) {
      console.error(exception);
    }

    return response.status(status || 500).json({
      message: response.locals.message,
    });
  }
}
