import { readFileSync } from "fs";

export const createTable = async () => {
  await global.db.exec(readFileSync(__dirname + "/users.sql").toString());
};

export interface IUsersModel {
  id: number;
  uname: string;
}
