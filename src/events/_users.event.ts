import { Telegraf } from 'telegraf';
import { MyContext } from '~src/middlewares';

const getAllUsers = (bot: Telegraf<MyContext>) => {
  bot.command('users', async (ctx) => {
    const result = await global.db.all(`SELECT * FROM 'USERS'`);
    ctx.reply(JSON.stringify(result));
  });
};

export default getAllUsers;
