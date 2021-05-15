import { Telegraf } from "telegraf";
import { SocksProxyAgent } from "socks-proxy-agent";
import { middleware1, MyContext } from "./middlewares";
import { routes } from "./events";

export const start = async () => {
  try {
    require("dotenv").config();
    await import("./config/db");
    const agent = new SocksProxyAgent(`socks://${process.env.NODE_ENV === "production" ? "tor" : "127.0.0.1"}:9150`);

    const telegraf = new Telegraf<MyContext>(process.env.TOKEN, {
      telegram: { agent },
    });

    const bot = (global.bot = telegraf.use(middleware1));
    routes(bot);

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
