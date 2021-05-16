import { Telegraf } from 'telegraf';
import { MyContext } from '~src/middlewares';
import statsEvent from './_stats.event';
import getAllUsers from './_users.event';

export const routes = (bot: Telegraf<MyContext>) => {
  addEvents(bot);
};

function addEvents(bot: Telegraf<MyContext>) {
  statsEvent(bot);
  getAllUsers(bot);
}
