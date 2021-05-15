import { Telegraf, Markup } from "telegraf";
import type { Message } from "typegram";
import runShell from "../helpers/shell";
import { MyContext } from "../middlewares";
import { IUsersModel } from "../models/users";

export const ENTER_PASS = "welcome, please reply this message and enter password";
export const SET_NEW_PASS = "welcome, please reply this message and set a new password";

const startEvent = (bot: Telegraf<MyContext>) => {
  bot.start(async (ctx) => {
    try {
      const result: IUsersModel | undefined = await global.db.get(`SELECT * FROM 'USERS' WHERE id LIKE ${ctx.chat.id}`);
      if (!result) {
        const isPasswordExists = await global.db.get(`SELECT * FROM 'PASSWORDS'`);
        const isAnyUsersExist = await global.db.get(`SELECT * FROM 'USERS'`);
        if (!isPasswordExists) {
          if (!isAnyUsersExist) {
            await runShell("chia -h", ctx);
          }
          return ctx.reply(SET_NEW_PASS, Markup.forceReply());
        }
        return ctx.reply(ENTER_PASS, Markup.forceReply());
      }
      return ctx.reply(await runShell("chia show -s", ctx));
    } catch (error) {
      console.log("err : ", error);
    }
  });
};

export const setNewPassword = async (ctx: MyContext) => {
  await global.db.run(`DELETE FROM 'PASSWORDS'`);
  const query = `
  INSERT INTO 'PASSWORDS' (password)
  VALUES("${(ctx.message as Message.TextMessage).text}")
  `;
  await global.db.run(query);
  createNewUser(ctx);
  return ctx.reply("new password set");
};

export const checkPassword = async (ctx: MyContext) => {
  try {
    const isPasswordCorrect = await global.db.get(`SELECT * FROM PASSWORDS WHERE password LIKE '${(ctx.message as Message.TextMessage).text}'`);
    if (isPasswordCorrect) {
      createNewUser(ctx);
      return ctx.reply("welcome, use commands to interact with bot");
    }
    return ctx.reply(ENTER_PASS, Markup.forceReply());
  } catch (error) {
    return ctx.reply(ENTER_PASS, Markup.forceReply());
  }
};

export const createNewUser = async (ctx: MyContext) => {
  const query = `
  INSERT INTO 'USERS' (id,uname)
  VALUES(${ctx.chat.id},"${ctx.fName || ctx.lName || ctx.uName || "undefined"}")
  `;
  await global.db.run(query);
};

export default startEvent;
