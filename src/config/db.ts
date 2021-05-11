import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

export default ((): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await open<sqlite3.Database, sqlite3.Statement>({
        filename: process.env.DB_PATH || "./CHIA.db",
        driver: sqlite3.Database,
      });
      console.log("🟢 sucessfully connected to sqlite");
      global.db = db;
      await import("~src/models");
      resolve(db);
    } catch (err) {
      console.log(`🔴 ${err} : Could not Connect to the Database Exiting Now...`);
      reject(err);
      process.exit(0);
    }
  });
})();
