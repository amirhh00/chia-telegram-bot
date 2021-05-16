import { Markup } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MyContext } from '~src/middlewares';
import { IUsersModel } from '~src/models/users';

export const ENTER_PASS = 'welcome, please reply this message and enter password';
export const SET_NEW_PASS = 'welcome, please reply this message and set a new password';
export const ENTER_PASS_ERROR = 'user must enter the password';
export const SET_NEW_PASS_ERROR = 'no password exists';

export const checkAuthentication = async (ctx: MyContext) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: IUsersModel | undefined = await global.db.get(`SELECT * FROM USERS WHERE id LIKE ${ctx.chat.id}`);
      if (result) {
        resolve(true);
      } else {
        const result2 = await checkReplies(ctx);
        if (result2 === null) {
          const isPasswordExists = await global.db.get(`SELECT * FROM PASSWORDS`);
          if (!isPasswordExists) {
            ctx.reply(SET_NEW_PASS, Markup.forceReply());
            await new Promise((r) => setTimeout(() => r(true), 50));
            reject(SET_NEW_PASS_ERROR);
          }
          reject(ENTER_PASS_ERROR);
          await new Promise((r) => setTimeout(() => r(true), 50));
          ctx.reply(ENTER_PASS, Markup.forceReply());
        }
      }
    } catch (error) {
      console.log('err : ', error);
    }
  });
};

export const setNewPassword = async (ctx: MyContext) => {
  try {
    await global.db.run(`DELETE FROM 'PASSWORDS'`);
    const query = `
  INSERT INTO 'PASSWORDS' (password)
  VALUES("${(ctx.message as Message.TextMessage).text}")
  `;
    await global.db.run(query);
    createNewUser(ctx);
    return ctx.reply('new password set');
  } catch (error) {
    return null;
  }
};

export const checkPassword = async (ctx: MyContext) => {
  try {
    const isPasswordCorrect = await global.db.get(
      `SELECT * FROM PASSWORDS WHERE password LIKE '${(ctx.message as Message.TextMessage).text}'`
    );
    if (isPasswordCorrect) {
      createNewUser(ctx);
      return ctx.reply('welcome, use commands to interact with bot');
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const createNewUser = async (ctx: MyContext) => {
  const query = `
  INSERT INTO 'USERS' (id,uname)
  VALUES(${ctx.chat.id},"${ctx.fName || ctx.lName || ctx.uName || 'undefined'}")
  `;
  await global.db.run(query);
};

export const checkReplies = (ctx: MyContext) => {
  const repliedMessageText: string = (ctx as any)?.message?.reply_to_message?.text;
  const isUserRepliedToBot = (ctx as any)?.message?.reply_to_message?.from?.is_bot;
  if (repliedMessageText && isUserRepliedToBot) {
    // TODO : check if repliedMessageText belongs to bot
    switch (repliedMessageText) {
      case ENTER_PASS:
        return checkPassword(ctx);

      case SET_NEW_PASS:
        return setNewPassword(ctx);

      default:
        return null;
    }
  } else {
    return null;
  }
};
