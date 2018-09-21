import { Context } from 'koa';

import RESPONSE_TYPES from './types';

export default (ctx: Context) => {

  if (!ctx.state && !ctx.state.response) {
    ctx.status = 500;
    ctx.body = {
      message: 'Unexpected Error',
    }
  }

  const { type, payload } = ctx.state.response;
  const [ result = '', resource = '' ] = type.split(':');
  switch (result) {
    case RESPONSE_TYPES.LOADED: {
      ctx.status = 200;
      ctx.body = {
        message: `${resource} successfully loaded`,
        data: payload,
      };
      return;
    }
    case RESPONSE_TYPES.UPDATED: {
      ctx.status = 200;
      ctx.body = {
        message: `${resource} successfully updated`,
        data: payload,
      };
      return;
    }
    case RESPONSE_TYPES.CREATED: {
      ctx.status = 201;
      ctx.body = {
        message: `${resource} successfully created`,
        data: payload,
      };
      return;
    }
    case RESPONSE_TYPES.DELETED: {
      ctx.status = 200;
      ctx.body = {
        message: `${resource} successfully deleted`,
        data: payload,
      };
      return;
    }
    default: {
      ctx.status = 200;
      ctx.body = {
        message: 'success',
        data: payload
      }

    }

  }
}
