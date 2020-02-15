import { Middleware } from 'koa';
import koaBody from 'koa-bodyparser';
import compose from 'koa-compose';

import handleErrors from './error';

export default (): Middleware => {
  return compose([handleErrors(), koaBody()]);
};
