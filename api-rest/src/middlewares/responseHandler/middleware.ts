import { Context } from 'koa';
import formatSuccessResponse from './formatSuccessResponse';
import formatErrorResponse from './formatErrorResponse';

export default async (ctx: Context, next: Function) => {
  try {
    await next();
    return formatSuccessResponse(ctx);
  } catch(error) {
    return formatErrorResponse(ctx, error)
  }
}
