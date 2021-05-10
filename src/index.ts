import { Telegraf } from "telegraf";
import { SocksProxyAgent } from "socks-proxy-agent";
import sqlite3, { Database, Statement } from "sqlite3";
import { open } from "sqlite";

require("dotenv").config();

const agent = new SocksProxyAgent("socks://127.0.0.1:9150");

(async () => {
  // open the database
  const db = await open<Database, Statement>({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
})();

const bot = new Telegraf(process.env.TOKEN, {
  telegram: { agent: agent },
});

bot.on("text", (ctx) => ctx.reply("Hello World"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
