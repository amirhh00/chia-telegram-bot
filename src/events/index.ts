import { Telegraf } from "telegraf";
import { MyContext } from "../middlewares";
import startEvent from "./_start.event";

export const botEvents = (bot: Telegraf<MyContext>) => {
  startEvent(bot);
};
