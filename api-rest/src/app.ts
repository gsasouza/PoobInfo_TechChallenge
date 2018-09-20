import Koa from 'koa';
import koaBody from 'koa-body';

import { routerMiddleware, responseMiddleware } from './middlewares';

const app = new Koa();

app.use(koaBody());
app.use(responseMiddleware);
app.use(routerMiddleware.routes());
app.use(routerMiddleware.allowedMethods());

export default app;
