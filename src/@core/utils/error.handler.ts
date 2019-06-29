import { HttpException } from '@nestjs/common';

export const throwServerError = (error: any) => {
  const status = error ? error.status || 500 : 500;
  throw new HttpException(error.message || 'SERVER_ERROR', status);
};
