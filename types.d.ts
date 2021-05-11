declare namespace NodeJS {
  interface Global {
    // app?: import("./src/App").default;
    db: import("sqlite").Database<import("sqlite3").Database, import("sqlite3").Statement>;
    bot: import("telegraf").Telegraf<import("telegraf").Context<import("telegraf/typings/core/types/typegram").Update>>;
    [key: string]: any;
  }
}

declare namespace NodeJS {
  interface Process {
    event: import("events").EventEmitter;
    [key: string]: any;
  }
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test";
    [key: string]: string | undefined;
  }
}

declare module "*.sql" {
  const value: string; // Add better type definitions here if desired.
  export default value;
}
