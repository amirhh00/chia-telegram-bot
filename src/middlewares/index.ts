import { Context, Middleware } from "telegraf";

export interface MyContext extends Context {
  myProp?: string;
  fName?: string;
  lName?: string;
  uName?: string;
}

export const middleware1: Middleware<MyContext> = async (ctx, next) => {
  ctx.fName = (ctx.chat as any).first_name;
  ctx.lName = (ctx.chat as any).last_name;
  ctx.uName = (ctx.chat as any).username;
  await next(); // runs next middleware
  // runs after next middleware finishes
};
