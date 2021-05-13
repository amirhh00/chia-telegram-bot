import { Telegraf } from "telegraf";
import runShell from "../helpers/shell";
import { MyContext } from "../middlewares";
import { IUsersModel } from "../models/users";

const startEvent = (bot: Telegraf<MyContext>) => {
  bot.start(async (ctx) => {
    const result: IUsersModel | undefined = await global.db.get(`SELECT * FROM 'USERS' WHERE id LIKE ${ctx.chat.id}`);
    if (!result) {
      await global.db.run(` INSERT INTO 'USERS' (id,uname)
      VALUES(${ctx.chat.id},"${ctx.fName || ctx.lName || ctx.uName || "undefined"}")
      `);
    }
    const chia = await runShell("chia -h", ctx);
    ctx.reply(chia);
  });
};

export default startEvent;
