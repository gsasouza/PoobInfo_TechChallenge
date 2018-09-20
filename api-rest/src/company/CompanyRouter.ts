import * as Company from './CompanyController';
import Router from 'koa-router';
import { Context } from 'koa';

import { RESPONSE_TYPES } from '../middlewares/index';

const router = new Router({ prefix: 'company'});

router.get('/', async (ctx: Context, next: Function) => {
  const companies = await Company.getAll(ctx.request.query);
  ctx.state.respose = {
    type: RESPONSE_TYPES.LOADED,
    payload: companies,
  };
  await next();
});

router.post('/', async (ctx: Context, next: Function) => {
  const company = await Company.create(ctx.request.body);
  ctx.body = {
    type: RESPONSE_TYPES.CREATED,
    payload: company
  };
  await next();
});

router.get('/:id', async (ctx: Context, next: Function) => {
  const company = await Company.getOne(ctx.params.id);
  ctx.body = {
    type: RESPONSE_TYPES.LOADED,
    payload: company
  };
  await next();
});

router.put('/:id', async (ctx: Context, next: Function) => {
  const company = await Company.update(ctx.params.id, ctx.request.body);
  ctx.body = {
    type: RESPONSE_TYPES.UPDATED,
    payload: company
  };
  await next();
});

router.delete('/:id', async (ctx: Context, next: Function) => {
  const company = await Company.remove(ctx.params.id);
  ctx.body = {
    type: RESPONSE_TYPES.DELETED,
    payload: company
  };
  await next();
});

export default router
