import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, request) => {
  return data ? request.user[data] : request.user;
});
