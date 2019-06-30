import { createParamDecorator } from '@nestjs/common';

export const Lang = createParamDecorator((data, request) => {
  return (request.headers['accept-language'] || 'en').substring(0, 2);
});
