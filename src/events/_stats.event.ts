import { Telegraf } from 'telegraf';
import { MyContext } from '../middlewares';
import runShell from '../helpers/shell';

const statsEvent = (bot: Telegraf<MyContext>) => {
  bot.command('stats', async (ctx) => {
    const chia = await runShell('chia show -s');
    ctx.reply(chia);
  });
};

export default statsEvent;
