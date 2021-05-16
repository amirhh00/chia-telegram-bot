import { Context, Middleware } from 'telegraf';
import { checkAuthentication } from '~src/helpers';

export interface MyContext extends Context {
  myProp?: string;
  fName?: string;
  lName?: string;
  uName?: string;
}

export const middleware1: Middleware<MyContext> = async (ctx, next) => {
  ctx.fName = (ctx.chat as any)?.first_name;
  ctx.lName = (ctx.chat as any)?.last_name;
  ctx.uName = (ctx.chat as any)?.username;
  try {
    await checkAuthentication(ctx);
    await next(); // runs next middleware
  } catch (error) {
    console.log('err : ', error);
    ctx.reply(JSON.stringify(error));
  }
};
