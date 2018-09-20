import * as Customer from './CustomerController';
import Router from 'koa-router';
import { Context } from 'koa';

import { RESPONSE_TYPES } from '../middlewares/index';

const router = new Router({ prefix: 'Customer'});

router.get('/', async (ctx: Context, next: Function) => {
  const companies = await Customer.getAll(ctx.request.query);
  ctx.state.respose = {
    type: RESPONSE_TYPES.LOADED,
    payload: companies,
  };
  await next();
});

router.post('/', async (ctx: Context, next: Function) => {
  const Customer = await Customer.create(ctx.request.body);
  ctx.body = {
    type: RESPONSE_TYPES.CREATED,
    payload: Customer
  };
  await next();
});

router.get('/:id', async (ctx: Context, next: Function) => {
  const Customer = await Customer.getOne(ctx.params.id);
  ctx.body = {
    type: RESPONSE_TYPES.LOADED,
    payload: Customer
  };
  await next();
});

router.put('/:id', async (ctx: Context, next: Function) => {
  const Customer = await Customer.update(ctx.params.id, ctx.request.body);
  ctx.body = {
    type: RESPONSE_TYPES.UPDATED,
    payload: Customer
  };
  await next();
});

router.delete('/:id', async (ctx: Context, next: Function) => {
  const Customer = await Customer.remove(ctx.params.id);
  ctx.body = {
    type: RESPONSE_TYPES.DELETED,
    payload: Customer
  };
  await next();
});

export default router
