import * as Customer from './CustomerController';
import Router from 'koa-router';
import { Context } from 'koa';

import { RESPONSE_TYPES } from '../middlewares/index';

const router = new Router({ prefix: 'customer'});

router.get('/', async (ctx: Context, next: Function) => {
  const customers = await Customer.getAll(ctx.request.query);
  ctx.state.response = {
    type: `${RESPONSE_TYPES.LOADED}:CUSTOMER`,
    payload: customers,
  };
  await next();
});

router.post('/', async (ctx: Context, next: Function) => {
  const customer = await Customer.create(ctx.request.body);
  ctx.state.response = {
    type: `${RESPONSE_TYPES.CREATED}:CUSTOMER`,
    payload: customer
  };
  await next();
});

router.get('/:id', async (ctx: Context, next: Function) => {
  console.log(ctx.params.id);
  const customer = await Customer.getOne(ctx.params.id);
  ctx.state.response = {
    type: `${RESPONSE_TYPES.LOADED}:CUSTOMER`,
    payload: customer
  };
  await next();
});

router.put('/:id', async (ctx: Context, next: Function) => {
  const customer = await Customer.update(ctx.params.id, ctx.request.body);
  ctx.state.response = {
    type: `${RESPONSE_TYPES.UPDATED}:CUSTOMER`,
    payload: customer
  };
  await next();
});

router.delete('/:id', async (ctx: Context, next: Function) => {
  const customer = await Customer.remove(ctx.params.id);
  ctx.state.response = {
    type: `${RESPONSE_TYPES.DELETED}:CUSTOMER`,
    payload: customer
  };
  await next();
});

export default router
