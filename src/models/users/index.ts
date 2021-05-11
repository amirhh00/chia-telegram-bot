const QUERY = `CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY, uname nvarchar(50));`;

export const createTable = async () => {
  try {
    await global.db.exec(QUERY);
  } catch (error) {
    console.log("❌ err: ", error);
  }
};

export interface IUsersModel {
  id: number;
  uname: string;
}
