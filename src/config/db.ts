import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import path from "path";

export default ((): Promise<Database<sqlite3.Database, sqlite3.Statement>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbPath = process.env.DB_PATH || path.resolve(__dirname, "CHIA.db");
      const db = await open<sqlite3.Database, sqlite3.Statement>({
        filename: dbPath,
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
