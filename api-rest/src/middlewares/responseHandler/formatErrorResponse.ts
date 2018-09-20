import RESPONSE_TYPES from './types';
import { Context } from 'koa';

export default (ctx: Context, error: Error) => {
  const { type = '' } = ctx.state.response ? ctx.state.response : {};
  const [ result = '', resource = '' ] = (type || '').split(':');
  switch (result) {
    case (RESPONSE_TYPES.NOT_FOUND): {
      ctx.status = 404;
      ctx.body = {
        message: `Not found ${resource}`,
      };
      return;
    }
    default: {
      ctx.status = 500;
      ctx.body = {
        message: 'Unexpected Error',
        error: error,
      }
    }
  }
}
