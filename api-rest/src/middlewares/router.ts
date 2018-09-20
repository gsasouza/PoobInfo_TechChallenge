import Router from 'koa-router';
import CompanyRouter from '../company/CompanyRouter';
import CustomerRouter from '../customer/CustomerRouter';

const rootRouter = new Router({ prefix: '/api' });

rootRouter.use('/', CompanyRouter.routes(), CompanyRouter.allowedMethods());
rootRouter.use('/', CustomerRouter.routes(), CustomerRouter.allowedMethods());

export default rootRouter;

