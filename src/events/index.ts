import { Telegraf } from "telegraf";
import { MyContext } from "../middlewares";
import startEvent from "./_start.event";
import statsEvent from "./_stats.event";
import getAllUsers from "./_users.event";

export const botEvents = (bot: Telegraf<MyContext>) => {
  startEvent(bot);
  statsEvent(bot);
  getAllUsers(bot);
};
