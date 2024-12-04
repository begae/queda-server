import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator for parsing 'user: UserAfterAuth' parameter from request
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface UserAfterAuth {
  id: string;
}
