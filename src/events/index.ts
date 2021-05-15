import { Telegraf } from "telegraf";
import { MyContext } from "../middlewares";
import startEvent, { checkPassword, ENTER_PASS, setNewPassword, SET_NEW_PASS } from "./_start.event";
import statsEvent from "./_stats.event";
import getAllUsers from "./_users.event";

export const routes = (bot: Telegraf<MyContext>) => {
  addEvents(bot);
  addReplies(bot);
};

function addEvents(bot: Telegraf<MyContext>) {
  startEvent(bot);
  statsEvent(bot);
  getAllUsers(bot);
}

function addReplies(bot: Telegraf<MyContext>) {
  bot.on("text", (ctx) => {
    const repliedMessageText: string = (ctx as any).message.reply_to_message.text;
    // TODO : check if repliedMessageText belongs to bot
    switch (repliedMessageText) {
      case ENTER_PASS:
        checkPassword(ctx);
        break;
      case SET_NEW_PASS:
        setNewPassword(ctx);
        break;
      default:
        ctx.reply("nothing to reply here");
        break;
    }
  });
}
