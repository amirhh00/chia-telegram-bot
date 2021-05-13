import { Telegraf } from "telegraf";
import { MyContext } from "../middlewares";
import startEvent from "./_start.event";
import statsEvent from "./_statsEvent";

export const botEvents = (bot: Telegraf<MyContext>) => {
  startEvent(bot);
  statsEvent(bot);
};
