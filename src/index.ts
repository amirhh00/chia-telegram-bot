import { Telegraf } from "telegraf";
import { SocksProxyAgent } from "socks-proxy-agent";
import { middleware1, MyContext } from "./middlewares";
import { botEvents } from "./events";

export const start = async () => {
  try {
    require("dotenv").config();
    await import("./config/db");
    const agent = new SocksProxyAgent("socks://tor:9150");

    const telegraf = new Telegraf<MyContext>(process.env.TOKEN, {
      telegram: { agent },
    });

    const bot = (global.bot = telegraf.use(middleware1));
    botEvents(bot);

    bot.launch();
    // Enable graceful stop
    process.once("SIGINT", () => telegraf.stop("SIGINT"));
    process.once("SIGTERM", () => telegraf.stop("SIGTERM"));
  } catch (error) {
    console.log("❌ error : ", error);
  }
};

start();

export default start;
